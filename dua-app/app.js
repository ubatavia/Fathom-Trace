// ── State ──────────────────────────────────────────────────────────
let allDuas     = [];
let allSections = [];
let pool        = [];       // current filtered set
let idx         = 0;        // index within pool
let favIds      = new Set(JSON.parse(localStorage.getItem('dua-favs') || '[]'));
let activeSection = 'all';
let showFavsOnly  = false;
let searchQuery   = '';
let hintDone      = false;

// ── DOM refs ───────────────────────────────────────────────────────
const cardFront   = document.getElementById('cardFront');
const cardDepth1  = document.getElementById('cardDepth1');
const cardDepth2  = document.getElementById('cardDepth2');
const cardCat     = document.getElementById('cardCat');
const cardText    = document.getElementById('cardText');
const cardNum     = document.getElementById('cardNum');
const btnHeart    = document.getElementById('btnHeart');
const btnShare    = document.getElementById('btnShare');
const btnCopy     = document.getElementById('btnCopy');
const btnSearch   = document.getElementById('btnSearch');
const btnCloseSearch = document.getElementById('btnCloseSearch');
const btnFavFilter   = document.getElementById('btnFavFilter');
const btnInspire     = document.getElementById('btnInspire');
const searchBar      = document.getElementById('searchBar');
const searchInput    = document.getElementById('searchInput');
const chipsTrack     = document.getElementById('chipsTrack');
const swipeHint      = document.getElementById('swipeHint');
const swipePrev      = document.getElementById('swipeIndicatorPrev');
const swipeNext      = document.getElementById('swipeIndicatorNext');
const toast          = document.getElementById('toast');

// ── Boot ───────────────────────────────────────────────────────────
async function init() {
  cardText.classList.add('is-loading');
  try {
    const [duasRes, sectionsRes] = await Promise.all([
      fetch('./data/duas.json'),
      fetch('./data/sections.json'),
    ]);
    allDuas     = await duasRes.json();
    allSections = await sectionsRes.json();
  } catch {
    allDuas     = FALLBACK_DUAS;
    allSections = FALLBACK_SECTIONS;
  }
  cardText.classList.remove('is-loading');
  buildChips();
  applyFilter();
}

// ── Filter & Render ────────────────────────────────────────────────
function applyFilter() {
  let src = allDuas;

  if (showFavsOnly) {
    src = src.filter(d => favIds.has(d.id));
  } else if (activeSection !== 'all') {
    src = src.filter(d => d.sectionId === activeSection);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    src = src.filter(d => d.text.toLowerCase().includes(q));
  }

  pool = src;
  idx  = 0;
  render();
}

function render() {
  resetDepthCards();

  if (!pool.length) {
    cardCat.textContent  = '';
    cardText.textContent = showFavsOnly
      ? 'No saved duas yet. Tap ♡ on a card to save.'
      : 'No duas found.';
    cardNum.textContent  = '';
    updateHeartBtn();
    return;
  }

  const dua  = pool[idx];
  const next = pool[idx + 1];
  const nn   = pool[idx + 2];

  cardCat.textContent  = dua.sectionTitle;
  cardText.textContent = dua.text;
  cardNum.textContent  = `${idx + 1} / ${pool.length}`;

  cardDepth1.style.visibility = next ? 'visible' : 'hidden';
  cardDepth2.style.visibility = nn   ? 'visible' : 'hidden';

  updateHeartBtn();
}

function resetDepthCards() {
  cardDepth1.style.transform = '';
  cardDepth2.style.transform = '';
}

function updateHeartBtn() {
  if (!pool.length) { btnHeart.classList.remove('is-fav'); return; }
  const isFav = favIds.has(pool[idx].id);
  btnHeart.classList.toggle('is-fav', isFav);
}

// ── Card Entrance Animation ────────────────────────────────────────
function animateIn() {
  cardFront.classList.remove('snap-in');
  void cardFront.offsetWidth;
  cardFront.classList.add('snap-in');
  cardFront.addEventListener('animationend', () => cardFront.classList.remove('snap-in'), { once: true });
}

// ── Category Chips ─────────────────────────────────────────────────
function buildChips() {
  chipsTrack.innerHTML = '';

  const specs = [
    { label: 'All',     section: 'all',  fav: false },
    { label: '♡ Saved', section: 'favs', fav: true  },
  ];

  // Sort sections: large (≥25 duas) first, then the rest
  const sorted = [...allSections].sort((a, b) => b.count - a.count);
  sorted.forEach(s => specs.push({ label: s.title, section: s.id, fav: false }));

  specs.forEach(spec => {
    const btn = document.createElement('button');
    btn.className   = 'chip';
    btn.textContent = spec.label;
    btn.dataset.section = spec.section;
    if (spec.fav) btn.dataset.fav = 'true';
    btn.setAttribute('role', 'listitem');
    btn.addEventListener('click', () => onChipClick(btn, spec.section, spec.fav));
    chipsTrack.appendChild(btn);
  });

  setActiveChip('all');
}

function setActiveChip(sectionId) {
  chipsTrack.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('is-active', c.dataset.section === sectionId);
  });
}

function onChipClick(btn, sectionId, isFavChip) {
  chipsTrack.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
  btn.classList.add('is-active');

  if (isFavChip) {
    showFavsOnly  = true;
    activeSection = 'all';
    btnFavFilter.classList.add('is-active');
  } else {
    showFavsOnly  = false;
    activeSection = sectionId;
    btnFavFilter.classList.toggle('is-active', false);
  }

  searchQuery     = '';
  searchInput.value = '';

  applyFilter();
  animateIn();
}

// ── Swipe Gesture ──────────────────────────────────────────────────
let dragStartX = 0;
let dragDeltaX = 0;
let dragging   = false;
const THRESHOLD    = 72;
const ROTATE_K     = 0.07;
const DEPTH1_BASE  = { y: 9,  s: 0.94 };
const DEPTH2_BASE  = { y: 18, s: 0.87 };

function onPointerDown(clientX) {
  dragStartX = clientX;
  dragDeltaX = 0;
  dragging   = true;
  cardFront.classList.add('is-dragging');
}

function onPointerMove(clientX) {
  if (!dragging) return;
  dragDeltaX = clientX - dragStartX;
  const rot  = dragDeltaX * ROTATE_K;

  cardFront.style.transform = `translateX(${dragDeltaX}px) rotate(${rot}deg)`;

  // Depth cards animate toward their "risen" state as swipe progresses
  const p = Math.min(Math.abs(dragDeltaX) / THRESHOLD, 1);
  cardDepth1.style.transform = `translateY(${DEPTH1_BASE.y * (1 - p)}px) scale(${DEPTH1_BASE.s + (1 - DEPTH1_BASE.s) * p})`;
  cardDepth2.style.transform = `translateY(${DEPTH2_BASE.y * (1 - p)}px) scale(${DEPTH2_BASE.s + (1 - DEPTH2_BASE.s) * p})`;

  // Directional labels
  const abs = Math.abs(dragDeltaX);
  const fade = Math.min(abs / 90, 0.85);
  swipePrev.style.opacity = dragDeltaX > 8  ? fade : 0;
  swipeNext.style.opacity = dragDeltaX < -8 ? fade : 0;
}

function onPointerUp() {
  if (!dragging) return;
  dragging = false;
  cardFront.classList.remove('is-dragging');
  swipePrev.style.opacity = 0;
  swipeNext.style.opacity = 0;

  if (dragDeltaX < -THRESHOLD) {
    goNext();
  } else if (dragDeltaX > THRESHOLD) {
    goPrev();
  } else {
    snapBack();
  }
}

function snapBack() {
  cardFront.style.transform = '';
  resetDepthCards();
}

function goNext() {
  if (!pool.length) return;
  dismissHint();
  cardFront.classList.add('fly-left');
  cardFront.style.transform = '';
  setTimeout(() => {
    cardFront.classList.remove('fly-left');
    idx = (idx + 1) % pool.length;
    render();
    animateIn();
  }, 300);
}

function goPrev() {
  if (!pool.length) return;
  dismissHint();
  cardFront.classList.add('fly-right');
  cardFront.style.transform = '';
  setTimeout(() => {
    cardFront.classList.remove('fly-right');
    idx = (idx - 1 + pool.length) % pool.length;
    render();
    animateIn();
  }, 300);
}

function dismissHint() {
  if (!hintDone) {
    hintDone = true;
    swipeHint.classList.add('hidden');
  }
}

// ── Touch Events ───────────────────────────────────────────────────
cardFront.addEventListener('touchstart', e => {
  onPointerDown(e.touches[0].clientX);
}, { passive: true });

cardFront.addEventListener('touchmove', e => {
  onPointerMove(e.touches[0].clientX);
}, { passive: true });

cardFront.addEventListener('touchend',   onPointerUp);
cardFront.addEventListener('touchcancel', onPointerUp);

// ── Mouse Events ───────────────────────────────────────────────────
cardFront.addEventListener('mousedown', e => {
  onPointerDown(e.clientX);
  e.preventDefault();
});

window.addEventListener('mousemove', e => {
  if (dragging) onPointerMove(e.clientX);
});

window.addEventListener('mouseup', onPointerUp);

// ── Copy (tap on card body) ────────────────────────────────────────
cardFront.addEventListener('click', e => {
  if (Math.abs(dragDeltaX) > 6) return; // was a drag
  if (e.target.closest('.btn-card, .btn-card-text')) return;
  if (!pool.length) return;
  copyDua(pool[idx].text);
});

btnCopy.addEventListener('click', e => {
  e.stopPropagation();
  if (!pool.length) return;
  copyDua(pool[idx].text);
});

function copyDua(text) {
  navigator.clipboard?.writeText(text)
    .then(() => showToast('Copied ✓'))
    .catch(()  => showToast('Long-press to copy'));
}

// ── Heart / Favorites ──────────────────────────────────────────────
btnHeart.addEventListener('click', e => {
  e.stopPropagation();
  if (!pool.length) return;
  const id = pool[idx].id;
  if (favIds.has(id)) {
    favIds.delete(id);
    showToast('Removed from saved');
  } else {
    favIds.add(id);
    showToast('Saved ♡');
  }
  localStorage.setItem('dua-favs', JSON.stringify([...favIds]));
  updateHeartBtn();
});

// ── Share ──────────────────────────────────────────────────────────
btnShare.addEventListener('click', async e => {
  e.stopPropagation();
  if (!pool.length) return;
  const dua = pool[idx];
  const text = `${dua.text}\n\n— ${dua.sectionTitle} | 1000 Duas`;
  if (navigator.share) {
    try { await navigator.share({ text }); } catch {}
  } else {
    navigator.clipboard?.writeText(text).then(() => showToast('Copied to share ✓'));
  }
});

// ── Search ─────────────────────────────────────────────────────────
btnSearch.addEventListener('click', () => {
  searchBar.classList.add('open');
  requestAnimationFrame(() => searchInput.focus());
});

btnCloseSearch.addEventListener('click', closeSearch);

function closeSearch() {
  searchBar.classList.remove('open');
  searchInput.blur();
  if (searchQuery) {
    searchQuery = '';
    applyFilter();
    animateIn();
  }
}

let searchTimer = 0;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchQuery = searchInput.value.trim();
    applyFilter();
    if (pool.length) animateIn();
  }, 260);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
});

// ── Fav-filter header button ───────────────────────────────────────
btnFavFilter.addEventListener('click', () => {
  const wasFavs = showFavsOnly;
  showFavsOnly  = !wasFavs;
  activeSection = 'all';
  searchQuery   = '';
  searchInput.value = '';

  btnFavFilter.classList.toggle('is-active', showFavsOnly);

  if (showFavsOnly) {
    chipsTrack.querySelectorAll('.chip').forEach(c =>
      c.classList.toggle('is-active', c.dataset.fav === 'true'));
  } else {
    setActiveChip('all');
  }

  applyFilter();
  animateIn();
});

// ── Inspire Me ─────────────────────────────────────────────────────
btnInspire.addEventListener('click', () => {
  // Pick random section then a random dua within it
  const sec      = allSections[Math.floor(Math.random() * allSections.length)];
  const secDuas  = allDuas.filter(d => d.sectionId === sec.id);
  const pick     = secDuas[Math.floor(Math.random() * secDuas.length)];

  showFavsOnly  = false;
  activeSection = sec.id;
  searchQuery   = '';
  searchInput.value = '';
  searchBar.classList.remove('open');
  btnFavFilter.classList.remove('is-active');

  pool = secDuas;
  idx  = secDuas.findIndex(d => d.id === pick.id);

  setActiveChip(sec.id);

  // Scroll active chip into view
  const activeChip = chipsTrack.querySelector('.chip.is-active');
  activeChip?.scrollIntoView({ inline: 'center', behavior: 'smooth' });

  render();
  animateIn();
  showToast(`✦ ${sec.title}`);
});

// ── Keyboard Navigation ────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (document.activeElement === searchInput) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { goNext(); return; }
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { goPrev(); return; }
  if (e.key === '/')  { btnSearch.click(); e.preventDefault(); }
  if (e.key === 'Enter') copyDua(pool[idx]?.text ?? '');
});

// ── Toast ──────────────────────────────────────────────────────────
let toastTimer = 0;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── Fallback data (used if fetch fails) ───────────────────────────
const FALLBACK_DUAS = [
  { id:1,   text: "O Allah, increase me in Imaan and make it firm in my heart.",        sectionId:"imaan-worship",    sectionTitle:"Faith & Worship"      },
  { id:2,   text: "O Allah, make me love what You love and hate what You hate.",         sectionId:"imaan-worship",    sectionTitle:"Faith & Worship"      },
  { id:3,   text: "O Allah, let me taste the sweetness of faith.",                       sectionId:"imaan-worship",    sectionTitle:"Faith & Worship"      },
  { id:4,   text: "O Allah, keep my heart attached to You always.",                      sectionId:"imaan-worship",    sectionTitle:"Faith & Worship"      },
  { id:51,  text: "O Allah, forgive me for what I have done openly and in secret.",      sectionId:"forgiveness-mercy",sectionTitle:"Forgiveness & Mercy"  },
  { id:52,  text: "O Allah, You are Al-Ghafoor — forgive all my sins.",                  sectionId:"forgiveness-mercy",sectionTitle:"Forgiveness & Mercy"  },
  { id:101, text: "O Allah, grant me good health and protect me from illness.",          sectionId:"health-strength",  sectionTitle:"Health & Vitality"    },
  { id:201, text: "O Allah, bless my family and fill our home with love and mercy.",     sectionId:"family-children",  sectionTitle:"Family & Children"    },
  { id:401, text: "O Allah, grant me peace of mind and tranquility of heart.",          sectionId:"emotional-wellbeing",sectionTitle:"Inner Peace"        },
  { id:451, text: "O Allah, grant me knowledge that benefits and protect me from that which does not.", sectionId:"knowledge-hifdh", sectionTitle:"Knowledge & Scholarship" },
];

const FALLBACK_SECTIONS = [
  { id:"imaan-worship",      title:"Faith & Worship",       count:4, order:1  },
  { id:"forgiveness-mercy",  title:"Forgiveness & Mercy",   count:2, order:2  },
  { id:"health-strength",    title:"Health & Vitality",     count:1, order:3  },
  { id:"family-children",    title:"Family & Children",     count:1, order:5  },
  { id:"emotional-wellbeing",title:"Inner Peace",           count:1, order:10 },
  { id:"knowledge-hifdh",    title:"Knowledge & Scholarship",count:1,order:11 },
];

// ── Start ──────────────────────────────────────────────────────────
init();

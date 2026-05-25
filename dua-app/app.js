// ── Guide Data ────────────────────────────────────────────────────
const ARAFAH_GUIDE = [
  {
    badge: "Before You Begin", stepLabel: "Intro",
    title: "Your problem is not too complicated for Allah",
    body: "Yunus escaped the darkness. Ayyub was healed. Yusuf left prison and entered leadership. Maryam received provision without worldly explanation.\n\nCome to Arafah knowing: impossible outcomes are His specialty. The best day of the year. The most accepted dua of the year. Use every minute from Dhuhr to Maghrib.",
    dua: null,
    translation: null,
    tip: "The Prophet \uﷺ said: 'The best of dua is the dua of the Day of Arafah, and the best that I and the Prophets before me have said is: La ilaha illallah wahdahu la sharika lah, lahul mulku walahul hamdu wahuwa ala kulli shay'in qadeer.' (Tirmidhi)",
    names: []
  },
  {
    badge: "Step 1 · Opening", stepLabel: "1 / 8",
    title: "Begin with Praise & Salawat",
    body: "Every dua is 'sandwiched' between praise of Allah and salawat on the Prophet \uﷺ — this is what makes it fly. Before you ask for anything, praise Him.\n\nFace the Qibla. Raise both hands to shoulder level. Let your heart arrive before your tongue.",
    dua: "Alhamdulillahi rabbil 'aalameen, was-salatu was-salamu 'ala ashrafil ambiyaa' wal mursaleen, sayyidina Muhammadin wa 'ala aalihi wa sahbihi ajma'een.",
    translation: "All praise is for Allah, Lord of all the worlds. Peace and blessings upon the most noble of Prophets, our master Muhammad, his family and all his companions.",
    tip: "The Prophet \uﷺ never began dua without praising Allah first. Repeat salawat 3 times. The gate of dua is opened by praise.",
    names: ["Ar-Rahman", "Al-Hameed"]
  },
  {
    badge: "Step 2 · Clear the Slate", stepLabel: "2 / 8",
    title: "Istighfar First — Remove What Blocks You",
    body: "Before asking for anything, seek forgiveness. Sins can block duas from being answered. Clear the path first.\n\nCall on Al-Ghaffaar — the Perpetual Forgiver. Don't just say the words. Think of what you are asking Him to wipe away. Feel the weight of it lifting.",
    dua: "Astaghfirullahal-'Adheema alladhee laa ilaaha illaa Huwal-Hayyul-Qayyoomu wa atoobu ilayh.",
    translation: "I seek forgiveness from Allah the Mighty, there is no god but Him, the Ever-Living, the Sustainer of all, and I turn to Him in repentance.",
    tip: "Say this 3 times. Then pause. Then say it again. The Prophet \uﷺ sought forgiveness over 100 times a day — imagine what Arafah calls for.",
    names: ["Al-Ghaffaar", "At-Tawwaab", "Al-‘Afuww"]
  },
  {
    badge: "Step 3 · Peak One", stepLabel: "3 / 8",
    title: "Deen & Akhirah — The Foundation",
    body: "Ask for what matters most. No matter how much dunya you ask for, never leave Arafah without securing this first: firm faith, a good ending, and Jannah.\n\nAsk for thabat — steadfastness on the deen. Ask for husnul khatimah — a beautiful ending. Ask to die as a Muslim.",
    dua: "Ya Allah, let me die as a Muslim. Give me the best ending. Grant me Jannatul Firdaws Al-A'la without reckoning. Protect me from the Fire and every path that leads to it. Keep my heart firm on Your deen until I meet You.",
    translation: null,
    tip: "This is the ask that outlasts everything else. A house ends. A career ends. Your deen carries you into eternity.",
    names: ["Al-Haady", "Al-Mu’min", "Al-Muhaymin"]
  },
  {
    badge: "Step 4 · Peak Two", stepLabel: "4 / 8",
    title: "Earthly Expansion — Don't Be Embarrassed",
    body: "Muslims need to stop feeling embarrassed to ask Allah for dunya.\n\nThe prophets asked for worldly things constantly: wealth, kingdoms, spouses, homes, children, protection, victory. Dunya is not evil. A dunya that distracts you from Allah is evil.\n\nAsk specifically. Allah loves when you ask for the details.",
    dua: "Ya Allah, expand my provision from what is halal. Open doors in my career and business. Grant me a home full of peace and barakah. Give me everything I need to worship You freely and serve Your deen without financial worry.",
    translation: null,
    tip: "Name the specific thing. Don't be vague. 'The house in [city]. The salary of [amount]. The spouse with these qualities.' He knows already — but specificity is a sign of trust.",
    names: ["Ar-Razzaq", "Al-Fattah", "Al-Wahhaab", "Al-Mughni"]
  },
  {
    badge: "Step 5 · Peak Three", stepLabel: "5 / 8",
    title: "Family & Loved Ones — Say Their Names",
    body: "Now bring the people you love before Allah. Say their names out loud. Ask for them individually.\n\nParents — living or deceased. Your spouse. Your children. Friends who have passed. The people whose lives you want Allah to change.\n\nThe dua for your brother in their absence is answered immediately — with an angel saying 'And for you the same.'",
    dua: "Ya Allah, guide my family. Protect them. Grant my parents Your mercy and forgiveness. Make my children among the righteous. Keep my loved ones close to You in this life and unite us in Jannatul Firdaws.",
    translation: null,
    tip: "If you have a list of people you're making dua for — this is the moment. Go through them one by one. Don't rush this step.",
    names: ["Ar-Rabb", "Al-Waliyy", "Al-Barr", "Ar-Rafeeq"]
  },
  {
    badge: "Step 6 · Peak Four", stepLabel: "6 / 8",
    title: "The Impossible Peak — Bring It Back",
    body: "This is the section most people avoid.\n\nThe buried dream. The impossible situation. The thing you stopped praying for years ago. The wound you emotionally buried because hoping hurts too much.\n\nExcavate it. Put it back on the table before Allah.\n\nHe specializes in this.",
    dua: "Ya Allah, You know what I buried because I thought it was too much to ask for. I'm bringing it back today. Nothing is too big for You. If it is good for my deen and dunya, give it to me. If it is not, give me something better and heal what I cannot see.",
    translation: null,
    tip: "The Qur'an is filled with impossible outcomes: seas split, the dead raised, the barren given children. Your impossible is His ordinary.",
    names: ["Al-Qadir", "Al-Muqtadir", "Al-Fattah", "Al-Wahhaab"]
  },
  {
    badge: "Step 7 · For the Ummah", stepLabel: "7 / 8",
    title: "Ask for What You Cannot See",
    body: "You are at the greatest gathering on earth. Make dua for those who could not be here. For Muslims around the world who are suffering. For every oppressed community. For future generations who will inherit what we leave.\n\nExpand your dua beyond yourself. The heart that asks for others is a heart Allah loves.",
    dua: "Ya Allah, relieve the suffering of every oppressed Muslim. Protect the people of Gaza and every land under oppression. Grant victory and dignity to this Ummah. Let us see Islam honored in our lifetime and bless the generations that come after us.",
    translation: null,
    tip: "Raise your voice here. Let Him feel the urgency. You are standing in the most powerful place on earth during the most powerful hours of the year.",
    names: ["An-Naseer", "Al-‘Adl", "Al-Mawla", "Al-Qahhaar"]
  },
  {
    badge: "Step 8 · Close", stepLabel: "8 / 8",
    title: "End as You Began",
    body: "Close your dua as you opened it — with praise of Allah and salawat on the Prophet \uﷺ.\n\nThe dua sandwiched between praise does not fail to reach Him.\n\nThen sit in silence. You don't always need more words. Sometimes the most powerful thing is to just stay present with Him. Let the tears fall if they come.",
    dua: "Rabbana taqabbal minna innaka antas-Samee'ul-'Aleem. Was-salamu 'ala sayyidina Muhammadin wa 'ala aalihi wa sahbihi ajma'een. Walhamdulillaahi rabbil 'aalameen.",
    translation: "Our Lord, accept from us. Indeed You are the All-Hearing, the All-Knowing. And peace be upon our master Muhammad, his family and all companions. All praise is for Allah, Lord of all the worlds.",
    tip: "Say Ameen. Then sit. Your hands dropping is not the end of dua — your stillness, your longing, your tears — that IS dua.",
    names: ["As-Samee’", "Al-‘Aleem", "Al-Mujeeb"]
  }
];

const MUZDALIFAH_GUIDE = [
  {
    badge: "You've Arrived", stepLabel: "1 / 6",
    title: "Muzdalifah: Between Two Sacred Moments",
    body: "You leave Arafah after sunset, walking toward Muzdalifah — a 9km journey where every step is worship. Keep saying the Talbiyah the entire way.\n\nMuzdalifah is where Hajj shifts from the intensity of Arafah to the quiet of the night. From pouring out to being still. From asking to resting in what you asked.",
    dua: "Labbaykallahumma labbayk. Labbayka laa shareeka laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk. Laa shareeka lak.",
    translation: "Here I am O Allah, here I am. You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner.",
    tip: "You stop saying the Talbiyah when you throw the first pebble at Jamarat Al-Aqabah on the 10th. Until then: keep saying it.",
    names: []
  },
  {
    badge: "On Arrival", stepLabel: "2 / 6",
    title: "Combine Your Prayers",
    body: "When you arrive at Muzdalifah, pray Maghrib and Isha combined immediately — even if it is late at night. Pray Maghrib (3 rak'ah) then Isha (2 rak'ah) with one adhan and two iqamahs. No sunnah prayers between them.\n\nThis is not negligence. It is following the exact Sunnah of the Prophet \uﷺ at Hajj.",
    dua: "Subhaanal-Malikil-Quddoos. (3x)\nSubhaanal-Malikil-Quddoos, Rabbil-malaa'ikati war-rooh.",
    translation: "Glory be to the Sovereign, the Most Holy. Glory be to the Sovereign, the Most Holy — Lord of the angels and the Spirit.",
    tip: "Pray in congregation if possible. After prayers, rest. You'll need energy. But use any wakefulness for dhikr.",
    names: ["Al-Malik", "Al-Quddoos"]
  },
  {
    badge: "Tonight's Task", stepLabel: "3 / 6",
    title: "Collect Your Pebbles",
    body: "Collect 49 pebbles tonight (70 to be safe) — each the size of a chickpea. You will use:\n· 7 at Jamarat Al-Aqabah on the 10th\n· 21 pebbles per day on the 11th and 12th\n\nAs you pick up each pebble, remember what it represents: striking at the symbols of Shaytan. Each one is an act of defiance.",
    dua: "Allahu Akbar — say this as you throw each pebble at Jamarat.",
    translation: null,
    tip: "Do not collect pebbles near the Jamarat area. Collect them at Muzdalifah or on the path. Make sure they are clean and not too large.",
    names: []
  },
  {
    badge: "The Night Dhikr", stepLabel: "4 / 6",
    title: "Under the Open Sky",
    body: "Muzdalifah is an open plain under the stars. No roof. No tent. Just you, millions of pilgrims, and the night sky of this sacred land.\n\nThis is one of the most spiritually unique settings in the world. Do not sleep through all of it.\n\nFill the night with dhikr. Let the words become rhythm.",
    dua: "Subhanallahi wa bihamdihi. (100x)\nSubhanallahil-'Adheem.",
    translation: "Glory be to Allah and praise be to Him. (100x) Glory be to Allah, the Magnificent.",
    tip: "The Prophet \uﷺ said: 'Whoever says Subhanallahi wa bihamdihi 100 times in a day, his sins will be wiped out even if they were like the foam of the sea.' (Bukhari) — You are at Muzdalifah. Say it 1000 times.",
    names: ["Al-‘Adheem", "Al-Hameed"]
  },
  {
    badge: "Pre-Fajr Surge", stepLabel: "5 / 6",
    title: "The Last Push Before Dawn",
    body: "Wake before Fajr. This is the last tahajjud window of Hajj. In the final third of the night at Muzdalifah, Allah descends to the lowest heaven and asks: 'Who is calling Me that I may answer them?'\n\nMake these minutes count. Whisper everything left unsaid. Cry if you can. Beg if you must.",
    dua: "Ya Hayy, Ya Qayyum, bi-rahmatika astaghees. Aslih lee sha'nee kullahu wa laa takilnee ilaa nafsee tarfata 'ayn.",
    translation: "O Ever-Living, O Sustainer of all, by Your mercy I seek help. Rectify all my affairs and do not leave me to myself even for the blink of an eye.",
    tip: "If you cannot cry, make the face of crying and press your chest with longing. The yearning itself is dua. He sees what your eyes cannot express.",
    names: ["Al-Hayy", "Al-Qayyum", "Al-Mujeeb"]
  },
  {
    badge: "After Fajr", stepLabel: "6 / 6",
    title: "Stay Until the Sky Brightens, Then Move",
    body: "After Fajr, stay at the Mash'ar Al-Haram and make dhikr until the sky brightens before sunrise. The Prophet \uﷺ made dua here until just before sunrise, then departed for Mina.\n\nWhen you leave: say Allahu Akbar continuously on the way to Jamarat. Your Hajj is almost at its peak.",
    dua: "Allahu Akbar, Allahu Akbar, Allahu Akbar — say this walking toward the Jamarat. You are heading to defy Shaytan in the same steps Ibrahim \uﷺ walked.",
    translation: null,
    tip: "The elderly and weak may leave Muzdalifah after midnight. Otherwise, stay until after Fajr. The barakah of this place is in staying.",
    names: ["Al-Awwal", "Al-Aakhir"]
  }
];

const ALLAH_NAMES_DATA = [
  {
    badge: "When You Need His Mercy",
    names: [
      { arabic: "ٱلرَّحْمُٰن", trans: "Ar-Rahman", meaning: "The Entirely Merciful" },
      { arabic: "الرَّحِيم", trans: "Ar-Raheem", meaning: "The Especially Merciful" },
      { arabic: "الرَّؤوف", trans: "Ar-Ra'uf", meaning: "The Tenderly Merciful" }
    ],
    dua: "Ya Rahman, from Your Throne, You wrote mercy upon Yourself. Embrace every part of me with that mercy: my past with its scars, my present with its needs, my future with its uncertainties.\n\nYa Raheem, reward me with the mercy I have yet to know, and raise me to the highest place in Paradise despite my lows.\n\nYa Ra'uf, cover me from storms I don't see coming, mend me before I break, spare me from trials of every kind."
  },
  {
    badge: "When You Need to Center Yourself",
    names: [
      { arabic: "ٱلْإِلَٰه", trans: "Al-Ilaah", meaning: "The Worshiped God" },
      { arabic: "ٱلْوَاحِد", trans: "Al-Waahid", meaning: "The Singular in His Being" },
      { arabic: "ٱلْأَحَد", trans: "Al-Ahad", meaning: "The Singular in His Attributes" },
      { arabic: "ٱلْوِتْر", trans: "Al-Witr", meaning: "The Uniquely One" }
    ],
    dua: "Ya Ilaahi, the One my heart was created to seek — pull me away from every false worship, from anything that divides my devotion, until nothing fills my longing but You.\n\nYa Ahad, open my heart to see that nothing compares to You, so I'm never overly impressed by anyone but You.\n\nYa Witr, when I stand alone at the close of the night, let my solitude remind me of Your singular majesty."
  },
  {
    badge: "When You're Searching for Meaning",
    names: [
      { arabic: "ٱلْهَادِي", trans: "Al-Haady", meaning: "The Guide" },
      { arabic: "الرَّشِيد", trans: "Ar-Rasheed", meaning: "The Director" },
      { arabic: "النُّور", trans: "An-Nur", meaning: "The Light" },
      { arabic: "ٱلْمُبِين", trans: "Al-Mubeen", meaning: "The Evident" }
    ],
    dua: "Ya Haady, guide me when my heart forgets the way. Pull me back from every turn that leads me astray. Let Your guidance feel closer than the doubts in my chest.\n\nYa Rasheed, teach me to see truth instinctively. Make faith beloved to me. Make righteousness feel natural.\n\nYa Nur, light every darkness I carry within, let Your light pour into my heart until everything I see reminds me of You."
  },
  {
    badge: "When You Need a Friend",
    names: [
      { arabic: "ٱلْوَلِيّ", trans: "Al-Waliyy", meaning: "The Protective Friend" },
      { arabic: "ٱلْبَرّ", trans: "Al-Barr", meaning: "The Source of All Good" },
      { arabic: "الرَّفِيق", trans: "Ar-Rafeeq", meaning: "The Gentle Friend" }
    ],
    dua: "Ya Waliyy, be my closest friend when the world drifts away. Guard me with the grip that never slips. Guide me gently through what I don't understand.\n\nYa Barr, make my faith steady when my heart trembles. Let me love what brings me to Your stability.\n\nYa Rafeeq, be tender with my soul as You unfold Your plan. When I am lonely, fill that space with Your company."
  },
  {
    badge: "When You Need Your Master",
    names: [
      { arabic: "الرَّبّ", trans: "Ar-Rabb", meaning: "The Lord" },
      { arabic: "ٱلْمَوْلَى", trans: "Al-Mawla", meaning: "The Protecting Master" },
      { arabic: "النَّصِير", trans: "An-Naseer", meaning: "The Helper" },
      { arabic: "السَّيِّد", trans: "As-Sayyid", meaning: "The Master of Masters" }
    ],
    dua: "Ya Rabb, raise me the way You raise every seed from the soil. Shape my growth with all You continue to give.\n\nYa Mawla, be my protector when I have no one else. Take charge of my affairs when I lose control of them.\n\nYa Naseer, help me in every battle I cannot see. Grant me triumph without arrogance, victory only in ways that bring me closer to You."
  },
  {
    badge: "When You Need to Remember Who's in Control",
    names: [
      { arabic: "ٱلْمَلِك", trans: "Al-Malik", meaning: "The King" },
      { arabic: "ٱلْمَالِك", trans: "Al-Maalik", meaning: "The Possessor" },
      { arabic: "ٱلْجَلِيل", trans: "Al-Jaleel", meaning: "The Majestic" }
    ],
    dua: "Ya Malik, You are the King of everything I know and hold. Remind me that nothing I hold is truly mine, and that every rise and fall belongs to Your decree.\n\nYa Maalik, the Owner of the Day when debts are paid — teach me to settle my dues before I meet You.\n\nYa Jaleel, let me approach You with the awe You deserve, and never grow so comfortable that I forget Your magnitude."
  },
  {
    badge: "When You Need Superhuman Strength",
    names: [
      { arabic: "ٱلْقَوِيّ", trans: "Al-Qawiyy", meaning: "The All-Strong" },
      { arabic: "ٱلْمَتِين", trans: "Al-Mateen", meaning: "The Firm" },
      { arabic: "ٱلْعَزِيز", trans: "Al-'Azeez", meaning: "The Almighty" }
    ],
    dua: "Ya Qawiyy, strengthen me where I am weak and make me firm where I bent too easily. Lift me so I can lift others without ever believing I lifted myself.\n\nYa Mateen, make me steady when everything else shakes. Root me in conviction that does not sway with opinion or fear.\n\nYa 'Azeez, grant me the honor that comes only from You. Let my dignity rest in humility before You."
  },
  {
    badge: "When You're Trying to Heal",
    names: [
      { arabic: "الشَّافِي", trans: "Ash-Shaafy", meaning: "The Absolute Healer" },
      { arabic: "الطَّيِّب", trans: "At-Tayyib", meaning: "The Pure" },
      { arabic: "ٱلْمُعْطِي", trans: "Al-Mu'ty", meaning: "The Giver" }
    ],
    dua: "Ya Shaafy, heal me in ways that medicine can't fix. Remove whatever sickness has touched my body and expel along with it any sin that poisons my soul. Let every ache remind me of Your mercy and every cure draw me closer to You.\n\nYa Tayyib, purify my wealth, my worship, my food, and every way that I seek You.\n\nYa Mu'ty, let every gift from You find me as a grateful recipient and servant."
  },
  {
    badge: "When You're Running Out of Patience",
    names: [
      { arabic: "ٱلْحَلِيم", trans: "Al-Haleem", meaning: "The Forbearing" },
      { arabic: "الصَّبُور", trans: "As-Saboor", meaning: "The All-Patient" },
      { arabic: "ٱلْعَلِيّ", trans: "Al-'Aliyy", meaning: "The Exalted" }
    ],
    dua: "Ya Haleem, You see my mistakes and still give me time. Make me forbearing with those around me and quick to forgiveness.\n\nYa Saboor, teach me the patience that doesn't expire. Grant me patience over my desires, through my trials, and upon the deeds that protect me from the Fire.\n\nYa 'Aliyy, raise my heart above resentment and smallness. Lift my gaze toward the higher ways that reach You."
  },
  {
    badge: "When You're Overwhelmed",
    names: [
      { arabic: "ٱلْكَبِير", trans: "Al-Kabeer", meaning: "The Greatest" },
      { arabic: "ٱلْعَظِيم", trans: "Al-'Adheem", meaning: "The Magnificent" },
      { arabic: "ٱلْمَجِيد", trans: "Al-Majeed", meaning: "The Glorious" },
      { arabic: "ٱلْأَعْلَى", trans: "Al-A'laa", meaning: "The Most High" }
    ],
    dua: "Ya Kabeer, how small I am before You. Let humility settle where arrogance once lived. Remind me that greatness belongs only to You.\n\nYa 'Adheem, let my reverence for You be heavier than any fear of creation.\n\nYa A'laa, You are higher than every desire I taste. Lift me from the illusions of this world and make my ambitions a path toward Your nearness."
  },
  {
    badge: "When You Need Grace",
    names: [
      { arabic: "ٱلْجَوَاد", trans: "Al-Jawaad", meaning: "The Generous" },
      { arabic: "ٱلْمَنَّان", trans: "Al-Mannaan", meaning: "The Bestower of Immense Favors" },
      { arabic: "ٱلْوَهَّاب", trans: "Al-Wahhaab", meaning: "The Bestower of Pure Gifts" }
    ],
    dua: "Ya Jawaad, Your generosity reaches me before I even raise my hands. You give before I ask and more than I deserve. Let me never mistake Your gifts for my earning.\n\nYa Mannaan, every blessing I have is a favor You began. Let me recognize Your favors not as entitlement but as invitation.\n\nYa Wahhaab, gift me faith that doesn't falter when I fall and hope that keeps finding You even when I can't see the way."
  },
  {
    badge: "For Laylatul Qadr — and Every Great Night",
    names: [
      { arabic: "ٱلْعَفُوّ", trans: "Al-'Afuww", meaning: "The Pardoner" }
    ],
    dua: "Ya 'Afuww, erase what I've done in the mercy that only You can grant. Wipe away the traces of every sin that follows me, until I stand before You as if I've never fallen.\n\nYou love to pardon, so pardon me completely. Forgive what I remember and what I've forgotten, what I've confessed and what I've concealed.\n\nLet me walk out of this night free of what once chained me, hopeful in what awaits me, humbled by the Lord who forgives simply because He loves me."
  },
  {
    badge: "When He Brings It All Together",
    names: [
      { arabic: "ٱلْجَامِع", trans: "Al-Jaami'", meaning: "The Gatherer" },
      { arabic: "ٱلْوَارِث", trans: "Al-Waarith", meaning: "The Inheritor" },
      { arabic: "ٱلْحَيِيّ", trans: "Al-Hayiyy", meaning: "The Modest" }
    ],
    dua: "Ya Jaami', gather the pieces of my heart that this world has broken. Unite what distance and time have separated. Bring together my past, my loved ones, and the reward You promised.\n\nYa Waarith, preserve my legacy when I'm forgotten, so long as it's not by You. Inherit my soul with Your pleasure.\n\nYa Hayiyy, You are too shy to turn away raised hands. I ask for a droplet of Your mercy despite my mountains of fault."
  },
  {
    badge: "When Time Is Escaping You",
    names: [
      { arabic: "ٱلْأَوَّل", trans: "Al-Awwal", meaning: "The First" },
      { arabic: "ٱلْآخِر", trans: "Al-Aakhir", meaning: "The Last" },
      { arabic: "ٱلظَّاهِر", trans: "Al-Dhaahir", meaning: "The Manifest" },
      { arabic: "ٱلْبَاطِن", trans: "Al-Baatin", meaning: "The Hidden" }
    ],
    dua: "Ya Awwal, before my first breath, You already knew my name. Let my first step in anything always be toward You.\n\nYa Aakhir, when every name is forgotten, Yours endures. Let my last breath be in Your remembrance.\n\nYa Baatin, You are nearer than my thoughts, closer than my pulse. You know the things I can't say and forgive the things I can't hide."
  },
  {
    badge: "When You Don't Know What to Call Him",
    names: [
      { arabic: "ٱللَّه", trans: "Allah", meaning: "The Greatest Name" },
      { arabic: "ٱلْحَيّ", trans: "Al-Hayy", meaning: "The Ever-Living" },
      { arabic: "ٱلْقَيُّوم", trans: "Al-Qayyum", meaning: "The Ever-Sustaining" }
    ],
    dua: "Ya Allah, when I forget even myself, let Your name always remain on my tongue. When I call You by this name, I am calling every mercy, every promise, every door that leads home.\n\nYa Hayy, put life into my worship when it starts to fade, and life into my purpose when I feel lost.\n\nYa Qayyum, do not leave me to myself, even for the blink of an eye. Hold me together when I fall apart."
  },
  {
    badge: "When You Need Provision",
    names: [
      { arabic: "الرَزَّاق", trans: "Ar-Razzaq", meaning: "The Provider" },
      { arabic: "ٱلْغَنِيّ", trans: "Al-Ghani", meaning: "The Self-Sufficient" },
      { arabic: "ٱلْمُغْنِي", trans: "Al-Mughni", meaning: "The Enricher" }
    ],
    dua: "Ya Razzaq, expand my provision in ways I cannot plan and from sources I cannot see. You provide the bird in its nest and the whale in the deep — do not leave my needs unmet.\n\nYa Ghani, You have no need and yet You give. Enrich my heart with gratitude so I see all that You've already given.\n\nYa Mughni, free me from the anxiety of scarcity and replace it with the certainty of Your sufficiency."
  },
  {
    badge: "When You Need Protection",
    names: [
      { arabic: "ٱلْحَفِيظ", trans: "Al-Hafeedh", meaning: "The Preserver" },
      { arabic: "ٱلْمُهَيْمِن", trans: "Al-Muhaimin", meaning: "The Guardian" },
      { arabic: "ٱلْمُؤْمِن", trans: "Al-Mu'min", meaning: "The Giver of Security" }
    ],
    dua: "Ya Hafeedh, preserve me from the unseen harms, from the evil I see and the evil I do not see. Guard what I love and protect what I have built.\n\nYa Muhaimin, oversee my affairs. Watch over me when I sleep, when I travel, when I am vulnerable.\n\nYa Mu'min, grant me the security that comes only from knowing You are in control."
  },
  {
    badge: "When You Need Justice",
    names: [
      { arabic: "ٱلْعَدْل", trans: "Al-'Adl", meaning: "The Just" },
      { arabic: "ٱلْحَكَم", trans: "Al-Hakam", meaning: "The Judge" },
      { arabic: "ٱلْحَسِيب", trans: "Al-Haseeb", meaning: "The Reckoner" }
    ],
    dua: "Ya 'Adl, You are the only perfectly just — when the scales of this world tip against me, remind me that the scales of the Akhirah will not. Restore what was taken from me or grant me better in return.\n\nYa Hakam, judge between me and those who wronged me. I give my case to You.\n\nYa Haseeb, be my Reckoner — deal with me through Your mercy, not my deeds."
  },
  {
    badge: "When You Need Forgiveness",
    names: [
      { arabic: "ٱلْغَفَّار", trans: "Al-Ghaffaar", meaning: "The Perpetual Forgiver" },
      { arabic: "ٱلْغَفُور", trans: "Al-Ghafoor", meaning: "The Oft-Forgiving" },
      { arabic: "التَّوَّاب", trans: "At-Tawwaab", meaning: "The Ever-Accepting of Repentance" }
    ],
    dua: "Ya Ghaffaar, You are the One who forgives again and again. I have returned to sin more times than I can count, and You have covered me more times than I deserve. Do not stop covering me.\n\nYa Ghafoor, forgive the depth of it — not just the surface, but the roots.\n\nYa Tawwaab, accept my return even when it is the hundredth time. Your door of tawbah is the one door I know will never close."
  },
  {
    badge: "When You Need His Knowledge & Wisdom",
    names: [
      { arabic: "ٱلْعَلِيم", trans: "Al-'Aleem", meaning: "The All-Knowing" },
      { arabic: "ٱلْخَبِير", trans: "Al-Khabeer", meaning: "The All-Aware" },
      { arabic: "ٱلْحَكِيم", trans: "Al-Hakeem", meaning: "The Perfectly Wise" }
    ],
    dua: "Ya 'Aleem, You know what I do not. You see the end of every road I'm afraid to take. Make me brave with the knowledge that You already know the outcome.\n\nYa Khabeer, You know what is in my heart better than I do. Fix what is broken in me that I cannot see.\n\nYa Hakeem, in every trial, every delay, every door that closed — make me certain there is wisdom. Let me trust the plan even when I cannot read it."
  },
  {
    badge: "When You Need His Power",
    names: [
      { arabic: "ٱلْقَادِر", trans: "Al-Qadir", meaning: "The All-Capable" },
      { arabic: "ٱلْمُقْتَدِر", trans: "Al-Muqtadir", meaning: "The Powerful" },
      { arabic: "ٱلْجَبَّار", trans: "Al-Jabbaar", meaning: "The Compeller" }
    ],
    dua: "Ya Qadir, nothing is beyond Your ability. The thing I think is impossible — it is not impossible for You. Do with my situation what only You can do.\n\nYa Muqtadir, I submit my affairs to Your power. Do not leave them in my hands alone.\n\nYa Jabbaar, set right what has been broken — in me, in my life, in what I love — in the way only the Compeller of the heavens can."
  },
  {
    badge: "When You Need His Nearness",
    names: [
      { arabic: "ٱلْقَرِيب", trans: "Al-Qareeb", meaning: "The Near" },
      { arabic: "ٱلْمُجِيب", trans: "Al-Mujeeb", meaning: "The Responsive" },
      { arabic: "السَّمِيع", trans: "As-Samee'", meaning: "The All-Hearing" },
      { arabic: "ٱلْبَصِير", trans: "Al-Baseer", meaning: "The All-Seeing" }
    ],
    dua: "Ya Qareeb, nearer to me than my jugular vein — remind me of Your nearness when loneliness sits heaviest on my chest.\n\nYa Mujeeb, You respond. Not sometimes. Always. Even when I cannot see the answer, You responded. Let me trust the forms Your response takes.\n\nYa Samee', You heard this dua before I shaped it into words."
  },
  {
    badge: "When You Need His Love",
    names: [
      { arabic: "ٱلْوَدُود", trans: "Al-Wadood", meaning: "The Most Loving" }
    ],
    dua: "Ya Wadood, the Most Loving — love me. Not for what I've done, but for what I still might become in Your hands.\n\nFill my heart with love for You until it has no room for what distracts me from You. Make me beloved to You in the way that the righteous are beloved — through their sincerity, their striving, and their longing.\n\nAnd through Your love for me, make me gentle with the people around me."
  },
  {
    badge: "When You Need His Opening",
    names: [
      { arabic: "ٱلْفَتَّاح", trans: "Al-Fattah", meaning: "The Opener" },
      { arabic: "ٱلْوَاسِع", trans: "Al-Waasi'", meaning: "The All-Encompassing" },
      { arabic: "ٱلْبَاسِط", trans: "Al-Baasit", meaning: "The Expander" }
    ],
    dua: "Ya Fattah, open what has been closed in my life. Open the doors I have been knocking on for years. Open my heart to receiving what You have already prepared for me.\n\nYa Waasi', Your mercy and provision encompass everything — let some of that encompassing reach what I am trying to build.\n\nYa Baasit, expand my chest, expand my provision, expand my time, expand my capacity for what You are asking of me."
  },
  {
    badge: "When You Need Creation and New Beginnings",
    names: [
      { arabic: "ٱلْخَالِق", trans: "Al-Khaliq", meaning: "The Creator" },
      { arabic: "ٱلْبَارِئ", trans: "Al-Baari'", meaning: "The Originator" },
      { arabic: "ٱلْمُصَوِّر", trans: "Al-Musawwir", meaning: "The Fashioner" }
    ],
    dua: "Ya Khaliq, You created me from nothing — You can recreate me. Create in me a clean heart. Create the circumstances I need from what seems like nothing.\n\nYa Baari', originate something new in my life. I am ready.\n\nYa Musawwir, You fashioned me exactly as You intended. Let me trust the form You gave me — my face, my nature, my story — and work within what You designed."
  },
  {
    badge: "When You Need His Honor",
    names: [
      { arabic: "ٱلْمُعِزّ", trans: "Al-Mu'izz", meaning: "The Bestower of Honor" },
      { arabic: "ٱلْكَرِيم", trans: "Al-Kareem", meaning: "The Most Generous" },
      { arabic: "ذُو الْجَلَالِ", trans: "Dhul Jalaal", meaning: "The Possessor of Majesty" }
    ],
    dua: "Ya Mu'izz, honor me through my obedience to You and not through my status among people. Let the honor You give me be permanent, not borrowed.\n\nYa Kareem, Your generosity has no limit and no condition. Pour it over me without measuring what I deserve.\n\nYa Dhul Jalaal wal-Ikraam — O Possessor of Majesty and Honor — treat me with the generosity that befits Your Majesty."
  },
  {
    badge: "When You Need Peace",
    names: [
      { arabic: "السَّلَام", trans: "As-Salaam", meaning: "The Source of Peace" },
      { arabic: "ٱلْمُؤْمِن", trans: "Al-Mu'min", meaning: "The Giver of Security" },
      { arabic: "اللَّطِيف", trans: "Al-Lateef", meaning: "The Subtle and Kind" }
    ],
    dua: "Ya Salaam, You are the source of all peace — pour it into my chest. Calm the anxiety I carry. Settle the restlessness. Let me rest in the certainty of Your control.\n\nYa Mu'min, grant me the security that the world cannot give and cannot take away.\n\nYa Lateef, reach me in the subtle ways, the gentle nudges, the quiet provision I almost missed — and let me always recognize Your hand."
  },
  {
    badge: "When You Need His Hearing",
    names: [
      { arabic: "السَّمِيع", trans: "As-Samee'", meaning: "The All-Hearing" },
      { arabic: "ٱلْمُجِيب", trans: "Al-Mujeeb", meaning: "The Responsive" }
    ],
    dua: "Ya Samee', nothing I whisper escapes You. The dua I was too ashamed to say aloud — You heard it. The tear that fell silently — You saw it.\n\nYa Mujeeb, Your response is guaranteed. I may not see it yet, but You responded. Strengthen my trust in the timing of Your answer.\n\nLet me never stop asking, knowing that You never stop hearing."
  },
  {
    badge: "When You Need His Sufficiency",
    names: [
      { arabic: "ٱلْكَافِي", trans: "Al-Kaafi", meaning: "The Sufficient" },
      { arabic: "ٱلْوَكِيل", trans: "Al-Wakeel", meaning: "The Trustee" },
      { arabic: "حَسْبِي اللَّه", trans: "Hasbiyallah", meaning: "Allah is Sufficient for Me" }
    ],
    dua: "Ya Kaafi, You are enough. When I have run out of strategies and plans and backup plans — You remain. Be sufficient for me in what has overwhelmed me.\n\nYa Wakeel, I delegate this matter entirely to You. I do my part, but the outcome is Yours.\n\nHasbiyallahu wa ni'mal wakeel — Allah is sufficient for me and what an excellent Trustee He is. Let this be the last resort I reach, and the first I should have turned to."
  },
  {
    badge: "When You Need His Beauty",
    names: [
      { arabic: "ٱلْجَمِيل", trans: "Al-Jameel", meaning: "The Beautiful" },
      { arabic: "اللَّطِيف", trans: "Al-Lateef", meaning: "The Subtle and Kind" },
      { arabic: "ٱلنُّور", trans: "An-Nur", meaning: "The Light" }
    ],
    dua: "Ya Jameel, You are beautiful and You love beauty. Make my character beautiful. Make my worship beautiful. Make my words to others beautiful.\n\nYa Lateef, weave beauty into the details of my life in ways I will only recognize when I look back.\n\nYa Nur, make me a source of light. Let the light of Your guidance shine through my actions before my words."
  },
  {
    badge: "When You Come to the End",
    names: [
      { arabic: "ٱلتَّوَّاب", trans: "At-Tawwaab", meaning: "The Ever-Accepting of Repentance" },
      { arabic: "ٱلْرَحِيم", trans: "Ar-Raheem", meaning: "The Especially Merciful" },
      { arabic: "ٱلْحَيّ", trans: "Al-Hayy", meaning: "The Ever-Living" }
    ],
    dua: "Ya Tawwaab, as I reach the end of this collection, let it be a beginning. Turn my heart back to You today, and every day that follows.\n\nYa Raheem, wrap every dua I made in these pages in Your special mercy — the mercy kept for those who return.\n\nYa Hayy, the Ever-Living — let my connection to You outlive every circumstance, every season, every version of me. Let it be the one thing that stays."
  }
];

// ── Storage helper ────────────────────────────────────────────────
function safeStorage(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}

// ── Mode State ────────────────────────────────────────────────────
let currentMode = 'guide'; // 'guide' | 'duas' | 'names'
let guideSub    = 'arafah'; // 'arafah' | 'muzdalifah'

// ── Duas State ────────────────────────────────────────────────────
let allDuas       = [];
let allSections   = [];
let pool          = [];
let idx           = 0;
let favIds        = new Set(safeStorage('dua-favs'));
let activeSection = 'all';
let showFavsOnly  = false;
let searchQuery   = '';
let hintDone      = false;

// ── DOM refs ──────────────────────────────────────────────────────
const cardFront      = document.getElementById('cardFront');
const cardInner      = document.getElementById('cardInner');
const cardDepth1     = document.getElementById('cardDepth1');
const cardDepth2     = document.getElementById('cardDepth2');
const btnSearch      = document.getElementById('btnSearch');
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
const guideSubtabs   = document.getElementById('guideSubtabs');
const duasBottomSection   = document.getElementById('duasBottomSection');
const namesFooterSection  = document.getElementById('namesFooterSection');
const namesProgress       = document.getElementById('namesProgress');
const headerActions       = document.getElementById('headerActions');

// ── Mode Switching ────────────────────────────────────────────────
function switchMode(mode) {
  currentMode = mode;
  idx = 0;

  // Update mode tab styles
  document.getElementById('modeGuide').classList.toggle('is-active', mode === 'guide');
  document.getElementById('modeDuas').classList.toggle('is-active',  mode === 'duas');
  document.getElementById('modeNames').classList.toggle('is-active', mode === 'names');

  // Show/hide sub-sections
  guideSubtabs.style.display        = mode === 'guide' ? 'flex'  : 'none';
  duasBottomSection.style.display   = mode === 'duas'  ? 'block' : 'none';
  namesFooterSection.style.display  = mode === 'names' ? 'flex'  : 'none';

  // Show/hide header search/fav (duas only)
  headerActions.style.display = mode === 'duas' ? 'flex' : 'none';

  // Close search if leaving duas mode
  if (mode !== 'duas') {
    searchBar.classList.remove('open');
    searchQuery = '';
    searchInput.value = '';
  }

  if (mode === 'duas') {
    applyFilter();
  } else {
    render();
  }
}

function switchGuideSub(sub) {
  guideSub = sub;
  idx = 0;
  document.getElementById('tabArafah').classList.toggle('is-active',    sub === 'arafah');
  document.getElementById('tabMuzdalifah').classList.toggle('is-active', sub === 'muzdalifah');
  render();
  animateIn();
}

// ── Pool Helper ───────────────────────────────────────────────────
function getCurrentPool() {
  if (currentMode === 'guide') return guideSub === 'arafah' ? ARAFAH_GUIDE : MUZDALIFAH_GUIDE;
  if (currentMode === 'names') return ALLAH_NAMES_DATA;
  return pool;
}

// ── Render Dispatch ───────────────────────────────────────────────
function render() {
  resetDepthCards();
  const p = getCurrentPool();

  if (!p.length) {
    cardInner.className = 'card-inner';
    cardInner.innerHTML = `<div class="empty-card"><div class="empty-icon">🤲</div><p>${showFavsOnly ? 'No saved duas yet. Tap ♡ on a card to save.' : 'No duas found.'}</p></div>`;
    cardDepth1.style.visibility = 'hidden';
    cardDepth2.style.visibility = 'hidden';
    return;
  }

  const next = p[idx + 1];
  const nn   = p[idx + 2];
  cardDepth1.style.visibility = next ? 'visible' : 'hidden';
  cardDepth2.style.visibility = nn   ? 'visible' : 'hidden';

  if (currentMode === 'guide') {
    renderGuideCard(p[idx], idx, p.length);
  } else if (currentMode === 'names') {
    renderNameCard(p[idx], idx, p.length);
    namesProgress.textContent = `Name ${idx + 1} of ${p.length}`;
  } else {
    renderDuaCard(p[idx], idx, p.length);
  }
}

// ── Guide Card Renderer ───────────────────────────────────────────
function renderGuideCard(card, i, total) {
  const hasNames = card.names && card.names.length > 0;
  const namePills = hasNames
    ? card.names.map(n => `<span class="name-pill">${escHtml(n)}</span>`).join('')
    : '';

  cardInner.className = 'card-inner guide-card';
  cardInner.innerHTML = `
    <div class="card-header-row">
      <span class="card-category-badge">${escHtml(card.badge)}</span>
      <span class="card-num">${escHtml(card.stepLabel || (i+1)+'/'+total)}</span>
    </div>
    <div class="guide-title">${escHtml(card.title)}</div>
    <div class="guide-body">${escHtml(card.body)}</div>
    ${card.dua ? `<div class="dua-box">
      <p class="dua-text">${escHtml(card.dua)}</p>
      ${card.translation ? `<p class="dua-translation">${escHtml(card.translation)}</p>` : ''}
    </div>` : ''}
    ${card.tip ? `<div class="tip-box"><span>💡</span><span>${escHtml(card.tip)}</span></div>` : ''}
    ${hasNames ? `<div class="names-row">${namePills}</div>` : ''}
    <div class="card-footer-row" style="margin-top:auto">
      <button class="btn-card btn-share-guide" onclick="shareGuideCard()" aria-label="Share">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      </button>
      <span class="card-num">${i + 1} / ${total}</span>
      <button class="btn-card-text btn-copy-guide" onclick="copyGuideCard()" aria-label="Copy">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copy
      </button>
    </div>
  `;
}

// ── Names Card Renderer ───────────────────────────────────────────
function renderNameCard(card, i, total) {
  const namesHTML = card.names.slice(0, 3).map(n => `
    <div class="name-entry">
      <span class="name-arabic" dir="rtl">${n.arabic}</span>
      <span class="name-latin">${escHtml(n.trans)} — ${escHtml(n.meaning)}</span>
    </div>
  `).join('');

  const duaPreview = card.dua.length > 220 ? card.dua.substring(0, 220) + '…' : card.dua;

  cardInner.className = 'card-inner names-card';
  cardInner.innerHTML = `
    <div class="card-header-row">
      <span class="card-category-badge">${escHtml(card.badge)}</span>
      <span class="card-num">${i + 1} / ${total}</span>
    </div>
    <div class="names-arabic-group">${namesHTML}</div>
    <div class="dua-box names-dua">
      <p class="dua-text">${escHtml(duaPreview)}</p>
    </div>
    <div class="card-footer-row" style="margin-top:auto">
      <button class="btn-card btn-share-guide" onclick="shareGuideCard()" aria-label="Share">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      </button>
      <span class="card-num">${i + 1} / ${total}</span>
      <button class="btn-card-text btn-copy-guide" onclick="copyGuideCard()" aria-label="Copy">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copy
      </button>
    </div>
  `;
}

// ── Dua Card Renderer ─────────────────────────────────────────────
function renderDuaCard(dua, i, total) {
  const isFav = favIds.has(dua.id);
  cardInner.className = 'card-inner dua-card';
  cardInner.innerHTML = `
    <div class="card-header-row">
      <span class="card-category-badge">${escHtml(dua.sectionTitle)}</span>
      <span class="card-num">${i + 1} / ${total}</span>
    </div>
    <div class="card-body"><p class="card-text">${escHtml(dua.text)}</p></div>
    <div class="card-footer-row">
      <button class="btn-card btn-share-dua" onclick="shareDua()" aria-label="Share">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      </button>
      <button class="btn-card-text btn-copy-dua" onclick="copyCurrentDua()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Copy
      </button>
      <button class="btn-card btn-heart-dua ${isFav ? 'is-fav' : ''}" onclick="toggleFav()" aria-label="Save">
        <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
  `;
}

// ── HTML Escape ───────────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Depth Cards Reset ─────────────────────────────────────────────
function resetDepthCards() {
  cardDepth1.style.transform = '';
  cardDepth2.style.transform = '';
}

// ── Card Entrance Animation ───────────────────────────────────────
function animateIn() {
  cardFront.classList.remove('snap-in');
  void cardFront.offsetWidth;
  cardFront.classList.add('snap-in');
  cardFront.addEventListener('animationend', () => cardFront.classList.remove('snap-in'), { once: true });
}

// ── Duas: Filter & Render ─────────────────────────────────────────
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

// ── Duas: Category Chips ──────────────────────────────────────────
function buildChips() {
  chipsTrack.innerHTML = '';

  const specs = [
    { label: 'All',     section: 'all',  fav: false },
    { label: '♥ Saved', section: 'favs', fav: true  },
  ];

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
    btnFavFilter.classList.remove('is-active');
  }

  searchQuery       = '';
  searchInput.value = '';
  applyFilter();
  animateIn();
}

// ── Guide / Names Card Actions ────────────────────────────────────
function shareGuideCard() {
  const p = getCurrentPool();
  if (!p.length) return;
  const card = p[idx];
  let text = '';
  if (currentMode === 'guide') {
    text = card.title + '\n\n' + card.body;
    if (card.dua) text += '\n\n' + card.dua;
  } else if (currentMode === 'names') {
    text = card.badge + '\n\n';
    text += card.names.map(n => n.trans + ' — ' + n.meaning).join('\n');
    text += '\n\n' + card.dua;
  }
  if (navigator.share) {
    navigator.share({ text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => showToast('Copied to share ✓'));
  }
}

function copyGuideCard() {
  const p = getCurrentPool();
  if (!p.length) return;
  const card = p[idx];
  let text = '';
  if (currentMode === 'guide') {
    text = card.title + '\n\n' + card.body;
    if (card.dua) text += '\n\n' + card.dua;
    if (card.translation) text += '\n' + card.translation;
  } else if (currentMode === 'names') {
    text = card.badge + '\n\n';
    text += card.names.map(n => n.arabic + ' — ' + n.trans + ' (' + n.meaning + ')').join('\n');
    text += '\n\n' + card.dua;
  }
  navigator.clipboard?.writeText(text)
    .then(() => showToast('Copied ✓'))
    .catch(() => showToast('Long-press to copy'));
}

// ── Duas Card Actions ─────────────────────────────────────────────
function shareDua() {
  if (!pool.length) return;
  const dua = pool[idx];
  const text = `${dua.text}\n\n— ${dua.sectionTitle} | Arafah Guide & Duas`;
  if (navigator.share) {
    navigator.share({ text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => showToast('Copied to share ✓'));
  }
}

function copyCurrentDua() {
  if (!pool.length) return;
  navigator.clipboard?.writeText(pool[idx].text)
    .then(() => showToast('Copied ✓'))
    .catch(() => showToast('Long-press to copy'));
}

function toggleFav() {
  if (!pool.length) return;
  const id = pool[idx].id;
  if (favIds.has(id)) {
    favIds.delete(id);
    showToast('Removed from saved');
  } else {
    favIds.add(id);
    showToast('Saved ♥');
  }
  try { localStorage.setItem('dua-favs', JSON.stringify([...favIds])); } catch {}
  render();
}

// ── Swipe Gesture ─────────────────────────────────────────────────
let dragStartX = 0;
let dragDeltaX = 0;
let dragging   = false;
const THRESHOLD   = 72;
const ROTATE_K    = 0.07;
const DEPTH1_BASE = { y: 9,  s: 0.94 };
const DEPTH2_BASE = { y: 18, s: 0.87 };

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

  const p = Math.min(Math.abs(dragDeltaX) / THRESHOLD, 1);
  cardDepth1.style.transform = `translateY(${DEPTH1_BASE.y * (1 - p)}px) scale(${DEPTH1_BASE.s + (1 - DEPTH1_BASE.s) * p})`;
  cardDepth2.style.transform = `translateY(${DEPTH2_BASE.y * (1 - p)}px) scale(${DEPTH2_BASE.s + (1 - DEPTH2_BASE.s) * p})`;

  const abs  = Math.abs(dragDeltaX);
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
  const p = getCurrentPool();
  if (!p.length) return;
  dismissHint();
  cardFront.classList.add('fly-left');
  cardFront.style.transform = '';
  setTimeout(() => {
    cardFront.classList.remove('fly-left');
    idx = (idx + 1) % p.length;
    render();
    animateIn();
  }, 300);
}

function goPrev() {
  const p = getCurrentPool();
  if (!p.length) return;
  dismissHint();
  cardFront.classList.add('fly-right');
  cardFront.style.transform = '';
  setTimeout(() => {
    cardFront.classList.remove('fly-right');
    idx = (idx - 1 + p.length) % p.length;
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

// ── Touch Events ──────────────────────────────────────────────────
cardFront.addEventListener('touchstart', e => {
  onPointerDown(e.touches[0].clientX);
}, { passive: true });

cardFront.addEventListener('touchmove', e => {
  onPointerMove(e.touches[0].clientX);
}, { passive: true });

cardFront.addEventListener('touchend',    onPointerUp);
cardFront.addEventListener('touchcancel', onPointerUp);

// ── Mouse Events ──────────────────────────────────────────────────
cardFront.addEventListener('mousedown', e => {
  onPointerDown(e.clientX);
  e.preventDefault();
});

window.addEventListener('mousemove', e => {
  if (dragging) onPointerMove(e.clientX);
});

window.addEventListener('mouseup', onPointerUp);

// ── Card click (tap = copy in duas mode) ─────────────────────────
cardFront.addEventListener('click', e => {
  if (Math.abs(dragDeltaX) > 6) return;
  if (e.target.closest('.btn-card, .btn-card-text')) return;
  if (currentMode === 'duas' && pool.length) {
    copyCurrentDua();
  }
});

// ── Search ────────────────────────────────────────────────────────
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

// ── Fav-filter header button ──────────────────────────────────────
btnFavFilter.addEventListener('click', () => {
  showFavsOnly  = !showFavsOnly;
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

// ── Inspire Me ────────────────────────────────────────────────────
btnInspire.addEventListener('click', () => {
  const sec     = allSections[Math.floor(Math.random() * allSections.length)];
  const secDuas = allDuas.filter(d => d.sectionId === sec.id);
  const pick    = secDuas[Math.floor(Math.random() * secDuas.length)];

  showFavsOnly  = false;
  activeSection = sec.id;
  searchQuery   = '';
  searchInput.value   = '';
  searchBar.classList.remove('open');
  btnFavFilter.classList.remove('is-active');

  pool = secDuas;
  idx  = secDuas.findIndex(d => d.id === pick.id);

  setActiveChip(sec.id);

  const activeChip = chipsTrack.querySelector('.chip.is-active');
  activeChip?.scrollIntoView({ inline: 'center', behavior: 'smooth' });

  render();
  animateIn();
  showToast(`✶ ${sec.title}`);
});

// ── Keyboard Navigation ───────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (document.activeElement === searchInput) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { goNext(); return; }
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { goPrev(); return; }
  if (e.key === '/' && currentMode === 'duas') { btnSearch.click(); e.preventDefault(); }
  if (e.key === 'Enter' && currentMode === 'duas') copyCurrentDua();
});

// ── Toast ─────────────────────────────────────────────────────────
let toastTimer = 0;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── Fallback data ─────────────────────────────────────────────────
const FALLBACK_DUAS = [
  { id:1,   text: "O Allah, increase me in Imaan and make it firm in my heart.",        sectionId:"imaan-worship",    sectionTitle:"Faith & Worship"      },
  { id:2,   text: "O Allah, make me love what You love and hate what You hate.",         sectionId:"imaan-worship",    sectionTitle:"Faith & Worship"      },
  { id:3,   text: "O Allah, let me taste the sweetness of faith.",                       sectionId:"imaan-worship",    sectionTitle:"Faith & Worship"      },
  { id:4,   text: "O Allah, keep my heart attached to You always.",                      sectionId:"imaan-worship",    sectionTitle:"Faith & Worship"      },
  { id:51,  text: "O Allah, forgive me for what I have done openly and in secret.",      sectionId:"forgiveness-mercy",sectionTitle:"Forgiveness & Mercy"  },
  { id:52,  text: "O Allah, You are Al-Ghafoor — forgive all my sins.",             sectionId:"forgiveness-mercy",sectionTitle:"Forgiveness & Mercy"  },
  { id:101, text: "O Allah, grant me good health and protect me from illness.",          sectionId:"health-strength",  sectionTitle:"Health & Vitality"    },
  { id:201, text: "O Allah, bless my family and fill our home with love and mercy.",     sectionId:"family-children",  sectionTitle:"Family & Children"    },
  { id:401, text: "O Allah, grant me peace of mind and tranquility of heart.",           sectionId:"emotional-wellbeing",sectionTitle:"Inner Peace"        },
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

// ── Boot ──────────────────────────────────────────────────────────
async function init() {
  // Start in guide mode — show initial cards immediately
  // Load duas data in background for when user switches to Duas mode
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

  buildChips();

  // Apply initial mode UI state
  guideSubtabs.style.display       = 'flex';
  duasBottomSection.style.display  = 'none';
  namesFooterSection.style.display = 'none';
  headerActions.style.display      = 'none';

  // Render first guide card
  render();
  animateIn();
}

init();

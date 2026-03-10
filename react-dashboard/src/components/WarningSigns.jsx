import { useState } from 'react';

const DUNE = '#32302F';
const SECONDARY = '#9C9C9C';
const BRICK = '#8B3A3A';
const BRICK_BG = '#FDF0F0';

// ── Sparkline shapes ────────────────────────────────────────────────────────

function SparklineLine({ points, color }) {
  const pts = points.map(([x, y]) => `${x},${y}`).join(' ');
  return (
    <svg width="100%" height="44" viewBox="0 0 120 44" preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparklineBars({ heights, color }) {
  const barW = 10;
  const gap = 4;
  const total = heights.length;
  const maxH = 36;
  return (
    <svg width="100%" height="44" viewBox={`0 0 ${total * (barW + gap)} 44`} preserveAspectRatio="none" style={{ display: 'block' }}>
      {heights.map((h, i) => {
        const barH = (h / 100) * maxH;
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={44 - barH}
            width={barW}
            height={barH}
            fill={color}
            rx={2}
          />
        );
      })}
    </svg>
  );
}

function StarRating({ rating, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: 18,
            color: i < rating ? '#8C6A2A' : '#E8E6E0',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Sparkline configs per signal type
const SPARKLINES = {
  'line-up': { type: 'line', points: [[0,38],[15,35],[30,32],[45,28],[60,22],[75,14],[90,8],[105,4],[120,2]], color: BRICK },
  'line-down': { type: 'line', points: [[0,4],[20,6],[40,10],[60,18],[75,28],[90,36],[105,40],[120,42]], color: BRICK },
  'line-flat': { type: 'line', points: [[0,20],[30,21],[60,19],[90,20],[120,20]], color: SECONDARY },
  'line-flat-down': { type: 'line', points: [[0,16],[30,17],[60,20],[90,22],[120,22]], color: SECONDARY },
  'bars-up': { type: 'bars', heights: [15, 18, 20, 25, 32, 42, 55, 72, 90], color: BRICK },
  'bars-up-high': { type: 'bars', heights: [10, 12, 15, 18, 30, 55, 80, 95, 100], color: BRICK },
  'social-down': { type: 'line', points: [[0,8],[20,12],[40,18],[60,24],[80,30],[100,34],[120,38]], color: BRICK },
};

function Sparkline({ type: key, signal }) {
  const cfg = SPARKLINES[key];
  if (!cfg) return null;
  if (signal.type === 'app_review') {
    return <StarRating rating={signal.star_rating} />;
  }
  if (cfg.type === 'line') {
    return <SparklineLine points={cfg.points} color={cfg.color} />;
  }
  if (cfg.type === 'bars') {
    return <SparklineBars heights={cfg.heights} color={cfg.color} />;
  }
  return null;
}

// ── Icons ───────────────────────────────────────────────────────────────────

function SignalIcon({ type }) {
  const style = { color: SECONDARY };
  const icons = {
    error_rate: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16" style={style}>
        <path strokeLinecap="round" d="M8 3v5M8 11v1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 1.5h3l4 12H2.5l4-12z" />
      </svg>
    ),
    support_contacts: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16" style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9l-3 3v-3H4a2 2 0 0 1-2-2V5z" />
      </svg>
    ),
    app_review: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16" style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 1l2 4.5H15l-4 3 1.5 4.5L8 10.5 3.5 13 5 8.5 1 5.5h5L8 1z" />
      </svg>
    ),
    completion_rate: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16" style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 8.5l4 4 7-9" />
      </svg>
    ),
    social_trust: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16" style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v3l3-3h3a2 2 0 0 0 2-2V5z" />
      </svg>
    ),
  };
  return icons[type] || null;
}

// ── Single signal card ───────────────────────────────────────────────────────

function SignalCard({ signal }) {
  const [expanded, setExpanded] = useState(false);
  const isSocial = signal.type === 'social_trust';
  const isOverThreshold = signal.over_threshold;

  const deltaText = isOverThreshold
    ? `${signal.display} \u2191`
    : signal.type === 'completion_rate' && signal.delta_pct < 0
    ? `${signal.display} \u2193`
    : signal.display;

  const deltaColor = isOverThreshold ? BRICK : SECONDARY;

  return (
    <div
      onClick={isSocial ? () => setExpanded((v) => !v) : undefined}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        background: isSocial ? '#F5F3FF' : '#F7F6F3',
        border: isOverThreshold ? `1px solid ${BRICK}30` : '1px solid #E8E6E0',
        borderRadius: 10,
        padding: '14px 16px',
        cursor: isSocial ? 'pointer' : 'default',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Icon + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <SignalIcon type={signal.type} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: SECONDARY,
            letterSpacing: '0.02em',
          }}
        >
          {signal.label}
        </span>
      </div>

      {/* Sparkline / stars */}
      {signal.type === 'social_trust' ? (
        <div style={{ marginBottom: 6 }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: DUNE,
              marginBottom: 2,
            }}
          >
            {signal.social_direction}
          </div>
          <div style={{ height: 36, overflow: 'hidden' }}>
            <Sparkline type={signal.sparkline} signal={signal} />
          </div>
        </div>
      ) : (
        <div style={{ height: 44, marginBottom: 6 }}>
          <Sparkline type={signal.sparkline} signal={signal} />
        </div>
      )}

      {/* Social Trust extra info */}
      {isSocial && (
        <>
          <div style={{ fontSize: 10, color: SECONDARY, fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>
            {signal.social_source}
          </div>
          <div style={{ fontSize: 10, color: SECONDARY, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>
            Avg authenticity: {Math.round(signal.authenticity * 100)}%
          </div>
        </>
      )}

      {/* Delta / status text */}
      {signal.type !== 'social_trust' && (
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: deltaColor,
          }}
        >
          {deltaText}
        </div>
      )}

      {isSocial && (
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: isOverThreshold ? BRICK : SECONDARY,
          }}
        >
          {signal.social_status}
        </div>
      )}

      {/* Social snippets (expanded) */}
      {isSocial && expanded && (
        <div style={{ marginTop: 12, borderTop: '1px solid #E8E6E0', paddingTop: 10 }}>
          {signal.snippets.map((s, i) => (
            <div
              key={i}
              style={{
                marginBottom: 8,
                paddingLeft: 8,
                borderLeft: '2px solid #D1D5DB',
              }}
            >
              <div style={{ fontSize: 10, color: SECONDARY, fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>
                {s.source} &middot; Within release window
              </div>
              <div style={{ fontSize: 11, color: DUNE, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>
                &ldquo;{s.text}&rdquo;
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Warning Signs row ────────────────────────────────────────────────────────

export default function WarningSigns({ signals }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: SECONDARY,
          marginBottom: 12,
        }}
      >
        Warning Signs
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {signals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>
    </div>
  );
}

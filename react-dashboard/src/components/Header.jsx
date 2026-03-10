const DUNE = '#32302F';
const SECONDARY = '#9C9C9C';
const BORDER = '1px solid #E8E6E0';

function formatTime(date) {
  return date.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' });
}

export default function Header({ scenarios, activeKey, onScenarioChange, lastUpdated, onRefresh }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#FFFFFF',
        borderBottom: BORDER,
        padding: '0 32px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}
    >
      {/* Wordmark */}
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 22,
          fontWeight: 600,
          color: DUNE,
          letterSpacing: '-0.01em',
          flexShrink: 0,
        }}
      >
        Fathom Trace
      </span>

      {/* Scenario tabs */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          background: '#F7F6F3',
          borderRadius: 8,
          padding: 3,
          border: '1px solid #E8E6E0',
        }}
      >
        {Object.values(scenarios).map((s) => {
          const active = s.key === activeKey;
          return (
            <button
              key={s.key}
              onClick={() => onScenarioChange(s.key)}
              style={{
                background: active ? DUNE : 'transparent',
                color: active ? '#F7F6F3' : SECONDARY,
                border: 'none',
                borderRadius: 6,
                padding: '5px 14px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {s.tab.label} &mdash; {s.tab.version}
            </button>
          );
        })}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Last updated + refresh */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: SECONDARY,
          }}
        >
          Last updated: {formatTime(lastUpdated)}
        </span>
        <button
          onClick={onRefresh}
          title="Refresh"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: SECONDARY,
            padding: 4,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
          }}
        >
          <RefreshIcon />
        </button>
      </div>
    </header>
  );
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 8A6.5 6.5 0 1 0 4 3.5" />
      <path d="M1.5 2v2.5h2.5" />
    </svg>
  );
}

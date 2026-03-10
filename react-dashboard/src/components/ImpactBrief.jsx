import { useState } from 'react';

const DUNE = '#32302F';
const SECONDARY = '#9C9C9C';
const BRICK = '#8B3A3A';
const BRICK_BG = '#FDF0F0';
const OCHRE = '#8C6A2A';

function formatDecisionLabel(action) {
  const labels = {
    acknowledge: 'Acknowledged',
    escalate: 'Escalated',
    rollback: 'Rollback initiated',
    expected_behavior: 'Expected behavior confirmed',
  };
  return labels[action] || action;
}

function formatTime(date) {
  return date.toLocaleString('en-CA', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ── Accordion ────────────────────────────────────────────────────────────────

function Accordion({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid #E8E6E0' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: DUNE,
          textAlign: 'left',
        }}
      >
        {label}
        <svg
          width="16" height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke={SECONDARY}
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }}
        >
          <path d="M3 6l5 5 5-5" />
        </svg>
      </button>
      {open && (
        <div style={{ paddingBottom: 16 }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Low Confidence Banner ────────────────────────────────────────────────────

function LowConfidenceBanner({ anomaly_type }) {
  const messages = {
    'Intentional Restriction':
      'This pattern may reflect intentional design — phased rollout, invite-only access, or eligibility gate — rather than a system failure. Human review required to confirm intended behavior before any action.',
    'New Baseline':
      'No historical baseline exists for this product area. Fathom Trace cannot classify confidently. Human must confirm expected behavior to seed the baseline.',
  };
  const text = messages[anomaly_type] || 'Signal pattern is insufficient for a high-confidence diagnosis. Human review recommended before action.';

  return (
    <div
      style={{
        background: '#FFFBEB',
        border: '1px solid #F59E0B',
        borderRadius: 8,
        padding: '12px 16px',
        display: 'flex',
        gap: 12,
        marginBottom: 20,
      }}
    >
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>&#9888;</span>
      <div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: '#92400E',
            marginBottom: 4,
          }}
        >
          Low Confidence Flag
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: '#78350F',
            lineHeight: 1.5,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

// ── Decision Buttons ─────────────────────────────────────────────────────────

const BUTTON_STYLES = {
  acknowledge: {
    border: `1px solid ${DUNE}`,
    color: DUNE,
    background: 'transparent',
    label: 'Acknowledge',
    hover: '#F7F6F3',
  },
  escalate: {
    border: `1px solid ${OCHRE}`,
    color: OCHRE,
    background: 'transparent',
    label: 'Escalate',
    hover: '#FDF6EC',
  },
  rollback: {
    border: `1px solid ${BRICK}`,
    color: BRICK,
    background: BRICK_BG,
    label: 'Roll back',
    hover: '#FAE0E0',
  },
  expected_behavior: {
    border: '1px solid #0D9488',
    color: '#FFFFFF',
    background: '#0D9488',
    label: 'Mark as Expected Behavior',
    hover: '#0B7A72',
  },
};

function DecisionButton({ action, onClick }) {
  const [hovered, setHovered] = useState(false);
  const style = BUTTON_STYLES[action];
  if (!style) return null;

  return (
    <button
      onClick={() => onClick(action)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 18px',
        border: style.border,
        borderRadius: 6,
        background: hovered ? style.hover : style.background,
        color: style.color,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background 0.15s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {style.label}
    </button>
  );
}

// ── Main ImpactBrief ─────────────────────────────────────────────────────────

export default function ImpactBrief({ brief, decision, onDecisionClick, decisionButtons }) {
  const [showDetails, setShowDetails] = useState(true);

  const clientCount = brief.estimated_affected_users?.toLocaleString('en-CA', { maximumFractionDigits: 0 });
  const prefix = brief.confidence_score >= 80 ? '' : '~';

  return (
    <div
      style={{
        background: '#F7F6F3',
        border: '1px solid #E8E6E0',
        borderRadius: 12,
        marginBottom: 24,
        overflow: 'hidden',
      }}
    >
      {/* Alert header */}
      <div style={{ padding: '20px 28px', borderBottom: showDetails ? '1px solid #E8E6E0' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                background: BRICK_BG,
                color: BRICK,
                borderRadius: 6,
                padding: '6px 8px',
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              &#9888;
            </span>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: BRICK,
                  marginBottom: 3,
                }}
              >
                Potential Client Impact Alert
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 28,
                  fontWeight: 600,
                  color: BRICK,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {prefix}{clientCount}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowDetails((v) => !v)}
            style={{
              background: 'none',
              border: '1px solid #E8E6E0',
              borderRadius: 6,
              padding: '6px 12px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: SECONDARY,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {showDetails ? 'Hide details \u2191' : 'Show details \u2193'}
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {showDetails && (
        <div style={{ padding: '24px 28px' }}>
          {/* Low confidence banner */}
          {brief.low_confidence_flag && (
            <LowConfidenceBanner anomaly_type={brief.anomaly_type} />
          )}

          {/* Narrative text */}
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.7,
              color: DUNE,
              whiteSpace: 'pre-line',
              marginBottom: 24,
            }}
          >
            {brief.narrative}
          </div>

          {/* Accordions */}
          <Accordion label="What triggered this">
            <ul style={{ paddingLeft: 20, marginTop: 4 }}>
              {brief.signal_summary.map((s, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: DUNE,
                    lineHeight: 1.6,
                    marginBottom: 6,
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion label="We've seen this before">
            <div
              style={{
                display: 'inline-block',
                background: '#F3F4F6',
                color: SECONDARY,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                padding: '2px 8px',
                borderRadius: 4,
                marginBottom: 10,
                letterSpacing: '0.04em',
              }}
            >
              {brief.pattern_match_id}
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: DUNE,
                lineHeight: 1.65,
              }}
            >
              {brief.pattern_match_summary}
            </p>
          </Accordion>

          <Accordion label="View full summary">
            <pre
              style={{
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: 12,
                color: DUNE,
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                background: '#FFFFFF',
                border: '1px solid #E8E6E0',
                borderRadius: 6,
                padding: '14px 16px',
                overflowX: 'auto',
              }}
            >
              {brief.full_brief_text}
            </pre>
          </Accordion>

          {/* Your Decision section */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #E8E6E0' }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: SECONDARY,
                marginBottom: 6,
              }}
            >
              Your Decision
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: SECONDARY,
                marginBottom: 18,
              }}
            >
              Fathom Trace does not act automatically &mdash; your decision is required.
            </div>

            {decision ? (
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: SECONDARY,
                }}
              >
                {formatDecisionLabel(decision.action)} at {formatTime(decision.timestamp)}.
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {decisionButtons.map((action) => (
                  <DecisionButton key={action} action={action} onClick={onDecisionClick} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

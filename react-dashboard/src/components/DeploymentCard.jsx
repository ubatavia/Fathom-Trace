import { formatReleaseDate } from '../data';

const DUNE = '#32302F';
const SECONDARY = '#9C9C9C';
const BRICK = '#8B3A3A';
const BRICK_BG = '#FDF0F0';

const STATUS_MAP = {
  brief_generated: { label: 'Needs review', bg: BRICK_BG, color: BRICK },
  anomaly_detected: { label: 'Something looks off', bg: '#FDF6EC', color: '#8C6A2A' },
  monitoring:       { label: 'Watching', bg: '#F3F4F6', color: SECONDARY },
  resolved:         { label: 'Resolved', bg: '#F0F7F2', color: '#3A6B4A' },
  acknowledged:     { label: 'Acknowledged', bg: '#F0F7F2', color: '#3A6B4A' },
};

export default function DeploymentCard({ scenario }) {
  const { deployment } = scenario;
  const status = STATUS_MAP[deployment.status] || STATUS_MAP.monitoring;
  const isAlert = deployment.status === 'brief_generated' || deployment.status === 'anomaly_detected';

  return (
    <div
      style={{
        background: '#F7F6F3',
        border: isAlert ? `1px solid ${BRICK}` : '1px solid #E8E6E0',
        borderRadius: 12,
        padding: '24px 28px',
      }}
    >
      {/* Top row: status badge + Wealthsimple wordmark */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: status.bg,
            color: status.color,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            padding: '4px 10px',
            borderRadius: 20,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: status.color, display: 'inline-block' }} />
          {status.label}
          {isAlert && (
            <span style={{ fontSize: 10, marginLeft: 2 }}>&#9651;</span>
          )}
        </span>

        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 16,
            fontStyle: 'italic',
            color: SECONDARY,
            letterSpacing: '0.02em',
          }}
        >
          Wealthsimple
        </span>
      </div>

      {/* Product name */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 22,
          fontWeight: 600,
          color: DUNE,
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        {deployment.product_name}
      </div>

      {/* Version number */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 32,
          fontWeight: 600,
          color: DUNE,
          letterSpacing: '-0.02em',
          marginBottom: 6,
        }}
      >
        {deployment.release_version.toUpperCase()}
      </div>

      {/* Release datetime */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: SECONDARY,
          marginBottom: 16,
        }}
      >
        Released {formatReleaseDate(deployment.release_datetime)}
      </div>

      {/* Previous version tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: SECONDARY,
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: SECONDARY, display: 'inline-block' }} />
        {deployment.previous_version}
      </div>
    </div>
  );
}

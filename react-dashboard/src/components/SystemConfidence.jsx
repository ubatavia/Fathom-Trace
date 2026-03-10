import { ANOMALY_BADGE, CONFIDENCE_BAND_BADGE } from '../data';

const SECONDARY = '#9C9C9C';

function donutColor(score) {
  if (score >= 80) return '#8B3A3A'; // muted brick — high confidence alert
  if (score >= 60) return '#8C6A2A'; // ochre — medium
  return '#9C9C9C'; // grey — low/uncertain
}

function DonutChart({ score, color }) {
  const r = 48;
  const cx = 64;
  const cy = 64;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;

  return (
    <svg width={128} height={128} viewBox="0 0 128 128">
      {/* Track */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="#E8E6E0"
        strokeWidth={10}
      />
      {/* Fill — starts from 12 o'clock via rotate(-90) */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ - filled}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* Score text */}
      <text
        x={cx} y={cy - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="600"
        fontSize="22"
        fill="#32302F"
      >
        {score}%
      </text>
    </svg>
  );
}

export default function SystemConfidence({ scenario }) {
  const { score, band, label, anomaly_type } = scenario.confidence;
  const color = donutColor(score);
  const anomalyStyle = ANOMALY_BADGE[anomaly_type] || ANOMALY_BADGE['Unknown'];
  const bandStyle = CONFIDENCE_BAND_BADGE[band] || CONFIDENCE_BAND_BADGE['Low'];

  return (
    <div
      style={{
        background: '#F7F6F3',
        border: '1px solid #E8E6E0',
        borderRadius: 12,
        padding: '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* Card label */}
      <div
        style={{
          alignSelf: 'flex-start',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: SECONDARY,
        }}
      >
        System Confidence
      </div>

      {/* Donut */}
      <DonutChart score={score} color={color} />

      {/* Confidence label */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: color,
          textAlign: 'center',
        }}
      >
        {label}
      </div>

      {/* Badge pair: [Anomaly Type] · [Confidence Band] */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span
          style={{
            background: anomalyStyle.bg,
            color: anomalyStyle.text,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            padding: '3px 10px',
            borderRadius: 20,
          }}
        >
          {anomaly_type}
        </span>
        <span style={{ color: SECONDARY, fontSize: 11 }}>·</span>
        <span
          style={{
            background: bandStyle.bg,
            color: bandStyle.text,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            padding: '3px 10px',
            borderRadius: 20,
          }}
        >
          {score}% {band}
        </span>
      </div>
    </div>
  );
}

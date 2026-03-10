import { ANOMALY_BADGE } from '../data';

const DUNE = '#32302F';
const SECONDARY = '#9C9C9C';
const TEAL = '#0D9488';

function formatMonth(yyyyMM) {
  const [year, month] = yyyyMM.split('-');
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString('en-CA', { month: 'short', year: 'numeric' });
}

function AnomalyBadge({ type }) {
  const s = ANOMALY_BADGE[type] || ANOMALY_BADGE['Unknown'];
  return (
    <span
      style={{
        display: 'inline-block',
        background: s.bg,
        color: s.text,
        fontSize: 10,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        padding: '2px 8px',
        borderRadius: 20,
        letterSpacing: '0.02em',
      }}
    >
      {type}
    </span>
  );
}

function IncidentCard({ incident }) {
  const isTeal = incident.teal;

  return (
    <div
      style={{
        background: isTeal ? '#F9FFFE' : '#F7F6F3',
        border: '1px solid #E8E6E0',
        borderLeft: isTeal ? `3px solid ${TEAL}` : '1px solid #E8E6E0',
        borderRadius: 8,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      {/* Incident ID + date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            color: SECONDARY,
            letterSpacing: '0.06em',
          }}
        >
          {incident.incident_id}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            color: SECONDARY,
          }}
        >
          {formatMonth(incident.date)}
        </span>
      </div>

      {/* Product area */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: DUNE,
          lineHeight: 1.3,
        }}
      >
        {incident.product_area}
      </div>

      {/* Note (for teal/Intentional Restriction) */}
      {incident.note && (
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: TEAL,
            fontStyle: 'italic',
          }}
        >
          {incident.note}
        </div>
      )}

      {/* Affected segment */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: SECONDARY,
          lineHeight: 1.4,
        }}
      >
        {incident.affected_segment}
      </div>

      {/* Footer: anomaly badge + resolution time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <AnomalyBadge type={incident.anomaly_type} />
        {incident.outcome ? (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              color: TEAL,
              background: '#CCFBF1',
              padding: '2px 8px',
              borderRadius: 20,
            }}
          >
            {incident.outcome}
          </span>
        ) : incident.resolution_time_hours != null ? (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              color: SECONDARY,
            }}
          >
            {incident.resolution_time_hours}h to resolve
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function PastIncidents({ incidents }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: SECONDARY,
          marginBottom: 14,
        }}
      >
        Past Incidents
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
        }}
      >
        {incidents.map((incident) => (
          <IncidentCard key={incident.incident_id} incident={incident} />
        ))}
      </div>
    </div>
  );
}

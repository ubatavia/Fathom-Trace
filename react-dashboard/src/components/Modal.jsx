import { useState } from 'react';

const DUNE = '#32302F';
const SECONDARY = '#9C9C9C';
const BRICK = '#8B3A3A';

const ACTION_LABELS = {
  acknowledge: 'Acknowledge',
  escalate: 'Escalate',
  rollback: 'Roll back this release',
  expected_behavior: 'Mark as Expected Behavior',
};

export default function Modal({ action, onConfirm, onCancel }) {
  const [notes, setNotes] = useState('');
  const label = ACTION_LABELS[action] || action;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8E6E0',
          borderRadius: 12,
          padding: '28px 32px',
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 8px 32px rgba(50,48,47,0.12)',
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 20,
            fontWeight: 600,
            color: DUNE,
            marginBottom: 20,
          }}
        >
          Confirm: {label}
        </div>

        <textarea
          placeholder="Add a note (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: DUNE,
            background: '#F7F6F3',
            border: '1px solid #E8E6E0',
            borderRadius: 6,
            resize: 'vertical',
            outline: 'none',
            marginBottom: 20,
          }}
        />

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '9px 18px',
              border: '1px solid #E8E6E0',
              borderRadius: 6,
              background: 'transparent',
              color: SECONDARY,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(notes)}
            style={{
              padding: '9px 18px',
              border: `1px solid ${DUNE}`,
              borderRadius: 6,
              background: DUNE,
              color: '#F7F6F3',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

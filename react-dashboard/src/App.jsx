import { useState, useCallback } from 'react';
import { SCENARIOS, PAST_INCIDENTS } from './data';
import Header from './components/Header';
import DeploymentCard from './components/DeploymentCard';
import SystemConfidence from './components/SystemConfidence';
import WarningSigns from './components/WarningSigns';
import ImpactBrief from './components/ImpactBrief';
import PastIncidents from './components/PastIncidents';
import Modal from './components/Modal';
import Toast from './components/Toast';

const WEBHOOK_URL = import.meta.env.VITE_W4_WEBHOOK || null;

export default function App() {
  const [activeKey, setActiveKey] = useState('RRSP');
  const [decisions, setDecisions] = useState({});
  const [modal, setModal] = useState(null); // { action, briefId, deploymentId }
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const scenario = SCENARIOS[activeKey];

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  }, []);

  const handleDecisionClick = useCallback((action) => {
    setModal({ action, briefId: scenario.brief.brief_id, deploymentId: scenario.brief.deployment_id });
  }, [scenario]);

  const handleConfirm = useCallback(async (notes) => {
    const { action, briefId, deploymentId } = modal;
    const payload = {
      brief_id: briefId,
      deployment_id: deploymentId,
      decision: action,
      decided_by: 'Demo User',
      decided_at: new Date().toISOString(),
      notes: notes || '',
    };

    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Best effort — show success regardless for demo
      }
    }

    setDecisions((prev) => ({
      ...prev,
      [briefId]: { action, timestamp: new Date() },
    }));
    setModal(null);
    showToast('Decision saved.');
  }, [modal, showToast]);

  const handleRefresh = useCallback(() => {
    setLastUpdated(new Date());
    showToast('Data refreshed.');
  }, [showToast]);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Header
        scenarios={SCENARIOS}
        activeKey={activeKey}
        onScenarioChange={setActiveKey}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
      />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 64px' }}>
        {/* Top row: Deployment card + System Confidence */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 55%', minWidth: 0 }}>
            <DeploymentCard scenario={scenario} />
          </div>
          <div style={{ flex: '1 1 40%', minWidth: 0 }}>
            <SystemConfidence scenario={scenario} />
          </div>
        </div>

        {/* Warning Signs */}
        <WarningSigns signals={scenario.signals} />

        {/* Impact Brief */}
        <ImpactBrief
          brief={scenario.brief}
          decision={decisions[scenario.brief.brief_id]}
          onDecisionClick={handleDecisionClick}
          decisionButtons={scenario.decision_buttons}
        />

        {/* Past Incidents */}
        <PastIncidents incidents={PAST_INCIDENTS} />
      </main>

      {/* Confirmation Modal */}
      {modal && (
        <Modal
          action={modal.action}
          onConfirm={handleConfirm}
          onCancel={() => setModal(null)}
        />
      )}

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

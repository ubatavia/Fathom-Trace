const BASE = 'https://api.airtable.com';
const KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

const fullBriefText = `IMPACT ALERT — Low Confidence (52%)
Anomaly Type: Intentional Restriction
Deployment: v23.9 | Released: Jan 13, 2026 10:00 AM
Affected Flow: Credit Card Application Flow
Affected Segment: Waitlist-eligible clients
Estimated Clients: ~85,000

SIGNALS:
• Support Contacts: +633% above baseline — clients unable to access credit card feature
• Social Trust: Declining — 3 posts about access rejection, avg authenticity 61%
• Error Rate: Within normal range — no system failure detected
• App Reviews: Stable — no negative review spike
• Journey Completions: Normal — no significant drop-off

PATTERN MATCH:
No strong historical match found. Signal pattern is consistent with a phased or invite-only product launch — access restriction by design rather than a system failure. Confidence is low. The absence of error rate and journey completion anomalies is the key indicator: clients are being blocked intentionally, not by a broken system.

RECOMMENDED ACTION: Verify with Credit Products team whether access restriction reflects phased rollout design. Confirm intended behavior before any action.

HUMAN DECISION: Expected Behavior — confirmed Jan 13, 2026 12:30 PM`;

(async () => {
  const r = await fetch(`${BASE}/v0/${BASE_ID}/impact_briefs?filterByFormula=${encodeURIComponent("{brief_id}='BRF-002'")}`, {
    headers: { Authorization: `Bearer ${KEY}` }
  });
  const j = await r.json();
  const recordId = j.records[0].id;
  console.log('Found BRF-002 record:', recordId);

  const patch = await fetch(`${BASE}/v0/${BASE_ID}/impact_briefs/${recordId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { full_brief_text: fullBriefText } })
  });
  const pj = await patch.json();
  if (!patch.ok) throw new Error(JSON.stringify(pj));
  console.log('BRF-002 patched with full_brief_text');
})().catch(console.error);

const BASE = 'https://api.airtable.com';
const KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

// Correct signal_summary for BRF-002 (Credit Card / Intentional Restriction)
const signalSummary = JSON.stringify({
  support_contacts: "Support calls up 633% — clients unable to access Credit Card Application Flow",
  social_trust: "Social trust declining — 3 posts about access rejection, avg authenticity 61%",
  error_rate: "Error rate within normal range — no system failure detected",
  app_review: "App reviews stable — no negative spike",
  completion_rate: "Journey completions normal — no significant drop-off"
});

(async () => {
  const r = await fetch(`${BASE}/v0/${BASE_ID}/impact_briefs?filterByFormula=${encodeURIComponent("{brief_id}='BRF-002'")}`, {
    headers: { Authorization: `Bearer ${KEY}` }
  });
  const j = await r.json();
  if (!j.records || j.records.length === 0) throw new Error('BRF-002 not found');
  const recordId = j.records[0].id;
  console.log('Found BRF-002:', recordId);

  const patch = await fetch(`${BASE}/v0/${BASE_ID}/impact_briefs/${recordId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        signal_summary: signalSummary,
        estimated_affected_users: '85000'
      }
    })
  });
  const pj = await patch.json();
  if (!patch.ok) throw new Error(JSON.stringify(pj));
  console.log('BRF-002 signal_summary + estimated_affected_users patched');
  console.log('Updated fields:', pj.fields.signal_summary ? 'signal_summary OK' : 'signal_summary missing');
})().catch(console.error);

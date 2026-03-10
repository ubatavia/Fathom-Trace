const KEY = process.env.AIRTABLE_API_KEY;

fetch('https://api.airtable.com/v0/app5MsHEVyYJdJD09/impact_briefs', {
  headers: { Authorization: `Bearer ${KEY}` }
}).then(r => r.json()).then(j => {
  if (!j.records) { console.log('Error:', JSON.stringify(j)); return; }
  j.records.forEach(r => {
    console.log('---');
    console.log('record_id:', r.id);
    console.log('brief_id:', r.fields.brief_id);
    console.log('deployment_id:', r.fields.deployment_id);
    console.log('estimated_affected_users:', r.fields.estimated_affected_users);
    console.log('anomaly_type:', r.fields.anomaly_type);
    console.log('signal_summary (first 120):', r.fields.signal_summary ? r.fields.signal_summary.slice(0, 120) : 'MISSING');
  });
}).catch(console.error);

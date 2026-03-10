const KEY = process.env.AIRTABLE_API_KEY;

fetch('https://api.airtable.com/v0/app5MsHEVyYJdJD09/impact_briefs/reckWiOAAs9Tspr0z', {
  headers: { Authorization: `Bearer ${KEY}` }
}).then(r => r.json()).then(j => {
  console.log('brief_id:', j.fields.brief_id);
  console.log('status:', j.fields.status);
  console.log('human_decision:', j.fields.human_decision);
  console.log('decision_timestamp:', j.fields.decision_timestamp);
}).catch(console.error);

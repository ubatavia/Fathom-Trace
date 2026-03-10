#!/usr/bin/env node
/**
 * Fathom Trace — Demo Reset Script
 *
 * Run this immediately before every recording attempt.
 * Clears Scenario A impact_briefs (BRF-001) and all decisions.
 * Preserves Scenario B data (BRF-002, DEP-002) — historical, never cleared.
 * Does NOT touch past_incidents or signal_feeds (stable demo data).
 *
 * Usage:
 *   AIRTABLE_API_KEY=pat... AIRTABLE_BASE_ID=app... node reset-demo.js
 */

const CONFIG = {
  apiKey: process.env.AIRTABLE_API_KEY || 'PASTE_YOUR_PERSONAL_ACCESS_TOKEN_HERE',
  baseId: process.env.AIRTABLE_BASE_ID || 'PASTE_YOUR_BASE_ID_HERE',
};

const BASE_URL = 'https://api.airtable.com';

async function request(method, path, body = null) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${CONFIG.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`[${response.status}] ${path}\n${text}`);
  return JSON.parse(text);
}

async function getRecordIds(tableName, filterFormula = null) {
  const filter = filterFormula
    ? `?filterByFormula=${encodeURIComponent(filterFormula)}&fields%5B%5D=deployment_id`
    : `?fields%5B%5D=deployment_id`;
  const result = await request('GET', `/v0/${CONFIG.baseId}/${encodeURIComponent(tableName)}${filter}`);
  return result.records.map((r) => r.id);
}

async function deleteRecords(tableName, ids) {
  if (ids.length === 0) {
    console.log(`  → '${tableName}' already empty.`);
    return;
  }
  // Airtable allows deleting up to 10 records per request
  for (let i = 0; i < ids.length; i += 10) {
    const chunk = ids.slice(i, i + 10);
    const params = chunk.map((id) => `records[]=${id}`).join('&');
    await request('DELETE', `/v0/${CONFIG.baseId}/${encodeURIComponent(tableName)}?${params}`);
  }
  console.log(`  ✓ Cleared ${ids.length} record(s) from '${tableName}'`);
}

async function clearScenarioABriefs() {
  // Only delete briefs for DEP-001 (Scenario A). BRF-002 (Scenario B) is preserved.
  console.log("  Clearing Scenario A impact_briefs (deployment_id = 'deploy-v24.4-20260224')...");
  const ids = await getRecordIds('impact_briefs', "{deployment_id}='deploy-v24.4-20260224'");
  await deleteRecords('impact_briefs', ids);
}

async function clearAllDecisions() {
  console.log("  Clearing all decisions...");
  const ids = await getRecordIds('decisions');
  await deleteRecords('decisions', ids);
}

async function resetDeploymentStatus() {
  console.log("  Resetting deployment 'deploy-v24.4-20260224' status to 'monitoring'...");

  // Find the deployment record
  const result = await request(
    'GET',
    `/v0/${CONFIG.baseId}/deployments?filterByFormula=${encodeURIComponent("{deployment_id}='deploy-v24.4-20260224'")}`
  );

  if (result.records.length === 0) {
    console.log('  → Deployment record not found. Run setup-airtable.js first.');
    return;
  }

  const recordId = result.records[0].id;
  await request('PATCH', `/v0/${CONFIG.baseId}/deployments/${recordId}`, {
    fields: { status: 'monitoring' },
  });
  console.log("  ✓ Deployment status reset to 'monitoring'");
}

async function main() {
  console.log('\n=== Fathom Trace — Demo Reset ===\n');

  if (CONFIG.apiKey.startsWith('PASTE') || CONFIG.baseId.startsWith('PASTE')) {
    console.error('ERROR: Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID before running.');
    process.exit(1);
  }

  await clearScenarioABriefs();
  await clearAllDecisions();
  await resetDeploymentStatus();

  console.log('\n=== Reset complete ===');
  console.log('Dashboard is clean. Deployment is in monitoring state.');
  console.log('Next: Manually trigger Workflow 3 in n8n, then start recording.\n');
}

main().catch((err) => {
  console.error('\nReset failed:', err.message);
  process.exit(1);
});

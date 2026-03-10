#!/usr/bin/env node
/**
 * Fathom Trace — Airtable Setup Script
 *
 * Creates all 5 tables and seeds demo data.
 * Run once after creating the Airtable base.
 *
 * Prerequisites:
 *   - Node.js 18+ (uses built-in fetch)
 *   - Airtable personal access token with scopes:
 *       schema.bases:read, schema.bases:write
 *       data.records:read, data.records:write
 *
 * Usage:
 *   AIRTABLE_API_KEY=pat... AIRTABLE_BASE_ID=app... node setup-airtable.js
 *
 * Or create a .env file (never commit it) and run:
 *   node -e "require('fs').readFileSync('.env','utf8').split('\n').forEach(l=>{const[k,v]=l.split('=');if(k&&v)process.env[k.trim()]=v.trim()})" && node setup-airtable.js
 */

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Paste your values here OR set as environment variables above
const CONFIG = {
  apiKey: process.env.AIRTABLE_API_KEY || 'PASTE_YOUR_PERSONAL_ACCESS_TOKEN_HERE',
  baseId: process.env.AIRTABLE_BASE_ID || 'PASTE_YOUR_BASE_ID_HERE',
};
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://api.airtable.com';

// ─── API HELPERS ──────────────────────────────────────────────────────────────

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
  if (!response.ok) {
    throw new Error(`[${response.status}] ${path}\n${text}`);
  }
  return JSON.parse(text);
}

async function createTable(tableSchema) {
  console.log(`  Creating table: ${tableSchema.name}...`);
  try {
    const result = await request('POST', `/v0/meta/bases/${CONFIG.baseId}/tables`, tableSchema);
    console.log(`  ✓ Created table: ${tableSchema.name} (id: ${result.id})`);
    return result;
  } catch (err) {
    if (err.message.includes('already exists') || err.message.includes('DUPLICATE')) {
      console.log(`  → Table '${tableSchema.name}' already exists, skipping creation.`);
      return null;
    }
    throw err;
  }
}

async function seedRecords(tableName, records) {
  console.log(`  Seeding ${records.length} record(s) into '${tableName}'...`);
  // Airtable allows max 10 records per request
  const chunks = [];
  for (let i = 0; i < records.length; i += 10) {
    chunks.push(records.slice(i, i + 10));
  }

  for (const chunk of chunks) {
    await request('POST', `/v0/${CONFIG.baseId}/${encodeURIComponent(tableName)}`, {
      records: chunk.map((fields) => ({ fields })),
    });
  }
  console.log(`  ✓ Seeded '${tableName}'`);
}

// ─── TABLE SCHEMAS ────────────────────────────────────────────────────────────

const TABLE_SCHEMAS = [
  {
    name: 'deployments',
    fields: [
      { name: 'deployment_id', type: 'singleLineText' },
      { name: 'release_version', type: 'singleLineText' },
      {
        name: 'release_datetime',
        type: 'dateTime',
        options: {
          dateFormat: { name: 'iso' },
          timeFormat: { name: '24hour' },
          timeZone: 'utc',
        },
      },
      { name: 'changed_services', type: 'multilineText' },
      { name: 'affected_account_types', type: 'multilineText' },
      { name: 'affected_user_segment', type: 'singleLineText' },
      { name: 'feature_flags_flipped', type: 'multilineText' },
      { name: 'pr_references', type: 'multilineText' },
      { name: 'deploying_team', type: 'singleLineText' },
      {
        name: 'status',
        type: 'singleSelect',
        options: {
          choices: [
            { name: 'monitoring' },
            { name: 'anomaly_detected' },
            { name: 'brief_generated' },
            { name: 'resolved' },
          ],
        },
      },
    ],
  },
  {
    name: 'signal_feeds',
    fields: [
      { name: 'feed_id', type: 'singleLineText' },
      { name: 'deployment_id', type: 'singleLineText' },
      {
        name: 'signal_type',
        type: 'singleSelect',
        options: {
          choices: [
            { name: 'support_contacts' },
            { name: 'error_rate' },
            { name: 'completion_rate' },
            { name: 'app_review' },
          ],
        },
      },
      {
        name: 'timestamp',
        type: 'dateTime',
        options: {
          dateFormat: { name: 'iso' },
          timeFormat: { name: '24hour' },
          timeZone: 'utc',
        },
      },
      { name: 'value', type: 'number', options: { precision: 2 } },
      { name: 'baseline_value', type: 'number', options: { precision: 2 } },
      { name: 'delta_pct', type: 'number', options: { precision: 2 } },
      { name: 'account_type_filter', type: 'singleLineText' },
      { name: 'version_filter', type: 'singleLineText' },
      { name: 'notes', type: 'multilineText' },
    ],
  },
  {
    name: 'past_incidents',
    fields: [
      { name: 'incident_id', type: 'singleLineText' },
      { name: 'date', type: 'date', options: { dateFormat: { name: 'iso' } } },
      { name: 'product_area', type: 'singleLineText' },
      { name: 'affected_segment', type: 'singleLineText' },
      { name: 'signal_pattern', type: 'multilineText' },
      { name: 'root_cause', type: 'multilineText' },
      { name: 'resolution', type: 'multilineText' },
      { name: 'resolution_time_hours', type: 'number', options: { precision: 0 } },
      { name: 'pr_reference', type: 'singleLineText' },
    ],
  },
  {
    name: 'impact_briefs',
    fields: [
      { name: 'brief_id', type: 'singleLineText' },
      { name: 'deployment_id', type: 'singleLineText' },
      {
        name: 'generated_at',
        type: 'dateTime',
        options: {
          dateFormat: { name: 'iso' },
          timeFormat: { name: '24hour' },
          timeZone: 'utc',
        },
      },
      { name: 'confidence_score', type: 'number', options: { precision: 0 } },
      { name: 'affected_flow', type: 'singleLineText' },
      { name: 'affected_segment', type: 'singleLineText' },
      { name: 'estimated_affected_users', type: 'singleLineText' },
      { name: 'signal_summary', type: 'multilineText' },
      { name: 'pattern_match_id', type: 'singleLineText' },
      { name: 'pattern_match_summary', type: 'multilineText' },
      { name: 'recommended_action', type: 'multilineText' },
      { name: 'full_brief_text', type: 'multilineText' },
      {
        name: 'status',
        type: 'singleSelect',
        options: {
          choices: [
            { name: 'pending_review' },
            { name: 'acknowledged' },
            { name: 'escalated' },
            { name: 'rollback_initiated' },
          ],
        },
      },
    ],
  },
  {
    name: 'decisions',
    fields: [
      { name: 'decision_id', type: 'singleLineText' },
      { name: 'brief_id', type: 'singleLineText' },
      { name: 'deployment_id', type: 'singleLineText' },
      {
        name: 'decision',
        type: 'singleSelect',
        options: {
          choices: [
            { name: 'acknowledge' },
            { name: 'escalate' },
            { name: 'rollback' },
          ],
        },
      },
      { name: 'decided_by', type: 'singleLineText' },
      {
        name: 'decided_at',
        type: 'dateTime',
        options: {
          dateFormat: { name: 'iso' },
          timeFormat: { name: '24hour' },
          timeZone: 'utc',
        },
      },
      { name: 'notes', type: 'multilineText' },
    ],
  },
];

// ─── SEED DATA ────────────────────────────────────────────────────────────────

const SEED_PAST_INCIDENTS = [
  {
    incident_id: 'INC-2024-003',
    date: '2024-03-12',
    product_area: 'Registered Accounts — RRSP Contribution',
    affected_segment: 'Clients with RRSP + TFSA',
    signal_pattern: JSON.stringify({
      support_contacts_delta: '+280%',
      completion_rate_delta: '-22%',
      error_rate_delta: '+1.8x',
      app_reviews_mentions: 2,
    }),
    root_cause:
      'Contribution limit validation was applied sequentially across accounts instead of independently. When a client held both RRSP and TFSA, the system validated RRSP room then re-validated against total registered limit, incorrectly blocking valid contributions.',
    resolution:
      'Hotfix to contribution validation service — changed sequential calls to single independent validation per account type. PR #3847.',
    resolution_time_hours: 6,
    pr_reference: 'PR #3847',
  },
  {
    incident_id: 'INC-2024-006',
    date: '2024-06-18',
    product_area: 'Crypto — Withdrawal Flow',
    affected_segment: 'High-volume crypto account holders (>$50K balance)',
    signal_pattern: JSON.stringify({
      support_contacts_delta: '+190%',
      completion_rate_delta: '-35%',
      error_rate_delta: '+4.2x',
      app_reviews_mentions: 5,
    }),
    root_cause:
      'Withdrawal request timeout was set to 10s. High-volume accounts triggered a compliance check that added ~12s processing time. Timeout fired before compliance check returned, causing silent failure.',
    resolution:
      'Extended timeout to 30s for accounts above balance threshold. Added retry logic with user-visible progress indicator.',
    resolution_time_hours: 4,
    pr_reference: 'PR #4102',
  },
  {
    incident_id: 'INC-2024-009',
    date: '2024-09-03',
    product_area: 'Registered Accounts — TFSA',
    affected_segment: 'Clients who opened FHSA in 2024 and held existing TFSA',
    signal_pattern: JSON.stringify({
      support_contacts_delta: '+140%',
      completion_rate_delta: '-8%',
      error_rate_delta: '+0.9x',
      app_reviews_mentions: 1,
    }),
    root_cause:
      'After FHSA launch, total registered contribution room calculation included FHSA limit in TFSA over-contribution warning logic. Clients with correct TFSA contributions were seeing false over-contribution warnings.',
    resolution:
      'Separated FHSA contribution room from TFSA calculation. Updated warning logic to use account-type-specific limits only.',
    resolution_time_hours: 3,
    pr_reference: 'PR #4334',
  },
  {
    incident_id: 'INC-2024-011',
    date: '2024-11-07',
    product_area: 'Investing — Margin Accounts',
    affected_segment: 'Margin account holders post Bank of Canada rate change',
    signal_pattern: JSON.stringify({
      support_contacts_delta: '+95%',
      completion_rate_delta: '-2%',
      error_rate_delta: '+0.3x',
      app_reviews_mentions: 0,
    }),
    root_cause:
      'Margin account balance display was caching interest rate data. After rate change, displayed balances were stale for ~4 hours, showing incorrect available margin to clients.',
    resolution:
      'Invalidated interest rate cache on rate change event. Added TTL of 15 minutes for margin balance cache regardless.',
    resolution_time_hours: 5,
    pr_reference: 'PR #4589',
  },
  {
    incident_id: 'INC-2025-001',
    date: '2025-01-22',
    product_area: 'Tax — Spousal RRSP',
    affected_segment: 'Clients with spousal RRSP accounts — tax slip generation',
    signal_pattern: JSON.stringify({
      support_contacts_delta: '+210%',
      completion_rate_delta: 'N/A',
      error_rate_delta: '+3.1x',
      app_reviews_mentions: 4,
    }),
    root_cause:
      'Tax slip generation for spousal RRSP was querying account holder ID instead of contributor ID. Slips generated with wrong name or failed entirely when contributor and holder were different CRM entities.',
    resolution:
      'Fixed entity lookup to use contributor_id for spousal RRSP tax documents. Reprocessed affected slips.',
    resolution_time_hours: 8,
    pr_reference: 'PR #4712',
  },
  {
    incident_id: 'INC-2025-004',
    date: '2025-04-15',
    product_area: 'Banking — Chequing Interac Transfers',
    affected_segment: 'All chequing account holders during peak transfer period',
    signal_pattern: JSON.stringify({
      support_contacts_delta: '+420%',
      completion_rate_delta: '-41%',
      error_rate_delta: '+5.8x',
      app_reviews_mentions: 11,
    }),
    root_cause:
      'Interac API integration was not handling connection pool exhaustion under load. During Friday afternoon peak, connection pool saturated and transfers were queued silently without user notification.',
    resolution:
      'Increased connection pool size. Added queue depth monitoring. Added user-facing status message when transfer is queued.',
    resolution_time_hours: 2,
    pr_reference: 'PR #4891',
  },
];

const SEED_DEPLOYMENTS = [
  {
    deployment_id: 'deploy-v24.4-20260224',
    release_version: 'v24.4',
    release_datetime: '2026-02-24T09:14:00.000Z',
    changed_services: JSON.stringify(['rrsp-contribution-api', 'account-validation-service']),
    affected_account_types: JSON.stringify(['RRSP', 'TFSA']),
    affected_user_segment: 'Clients holding both RRSP and TFSA accounts',
    feature_flags_flipped: JSON.stringify(['contribution-validation-v2']),
    pr_references: 'PR #4821, PR #4819',
    deploying_team: 'Registered Accounts',
    status: 'monitoring',
  },
];

const SEED_SIGNAL_FEEDS = [
  {
    feed_id: 'sig-001',
    deployment_id: 'deploy-v24.4-20260224',
    signal_type: 'support_contacts',
    timestamp: '2026-02-24T13:14:00.000Z',
    value: 17,
    baseline_value: 4,
    delta_pct: 325,
    account_type_filter: 'RRSP',
    version_filter: 'v24.4',
    notes: 'Monday morning baseline is 4/hr. Current is 17/hr.',
  },
  {
    feed_id: 'sig-002',
    deployment_id: 'deploy-v24.4-20260224',
    signal_type: 'completion_rate',
    timestamp: '2026-02-24T13:14:00.000Z',
    value: 72,
    baseline_value: 100,
    delta_pct: -28,
    account_type_filter: 'RRSP+TFSA',
    version_filter: 'v24.4',
    notes: '28% drop in RRSP contribution flow completion for dual-account holders.',
  },
  {
    feed_id: 'sig-003',
    deployment_id: 'deploy-v24.4-20260224',
    signal_type: 'error_rate',
    timestamp: '2026-02-24T13:14:00.000Z',
    value: 210,
    baseline_value: 100,
    delta_pct: 110,
    account_type_filter: 'RRSP+TFSA',
    version_filter: 'v24.4',
    notes: '2.1x error rate on contribution validation endpoint.',
  },
  {
    feed_id: 'sig-004',
    deployment_id: 'deploy-v24.4-20260224',
    signal_type: 'app_review',
    timestamp: '2026-02-24T13:14:00.000Z',
    value: 3,
    baseline_value: 0,
    delta_pct: 300,
    account_type_filter: 'all',
    version_filter: 'v24.4',
    notes: '3 app store reviews mentioning RRSP contribution failure in past 2 hours.',
  },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== Fathom Trace — Airtable Setup ===\n');

  // Validate config
  if (
    CONFIG.apiKey.startsWith('PASTE') ||
    CONFIG.baseId.startsWith('PASTE')
  ) {
    console.error(
      'ERROR: Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID before running.\n' +
      'Either set as environment variables or edit the CONFIG object at the top of this script.'
    );
    process.exit(1);
  }

  // Step 1: Create tables
  console.log('Step 1: Creating tables...');
  for (const schema of TABLE_SCHEMAS) {
    await createTable(schema);
    // Brief pause to avoid rate limiting
    await new Promise((r) => setTimeout(r, 500));
  }

  // Step 2: Seed data
  console.log('\nStep 2: Seeding data...');
  await seedRecords('past_incidents', SEED_PAST_INCIDENTS);
  await seedRecords('deployments', SEED_DEPLOYMENTS);
  await seedRecords('signal_feeds', SEED_SIGNAL_FEEDS);

  console.log('\n=== Setup complete ===');
  console.log('Tables created and demo data seeded.');
  console.log('Next: Set up n8n workflows using the JSONs in /n8n/');
  console.log('\nYour Airtable base is ready at:');
  console.log(`https://airtable.com/${CONFIG.baseId}\n`);
}

main().catch((err) => {
  console.error('\nSetup failed:', err.message);
  process.exit(1);
});

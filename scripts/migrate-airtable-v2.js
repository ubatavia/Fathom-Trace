#!/usr/bin/env node
/**
 * Fathom Trace — Airtable Migration v2.1
 *
 * Migrates existing base from v1.3 schema to v2.1 schema.
 * Safe to run multiple times — skips fields that already exist.
 *
 * What this does:
 *   1. Adds new fields to: deployments, signal_feeds, past_incidents, impact_briefs, decisions
 *   2. Extends signal_feeds.signal_type and decisions.decision singleSelect choices
 *   3. Patches existing past_incidents with anomaly_type, confidence_at_detection, outcome
 *   4. Seeds new records: DEP-002, SIG-005, SIG-010, SIG-011, INC-007, INC-008, BRF-002
 *   5. Updates DEP-001 with product_area field
 *
 * Requires Airtable token with scopes:
 *   schema.bases:read, schema.bases:write, data.records:read, data.records:write
 *
 * Usage:
 *   AIRTABLE_API_KEY=pat... AIRTABLE_BASE_ID=app... node migrate-airtable-v2.js
 */

const CONFIG = {
  apiKey: process.env.AIRTABLE_API_KEY || 'PASTE_YOUR_PERSONAL_ACCESS_TOKEN_HERE',
  baseId: process.env.AIRTABLE_BASE_ID || 'PASTE_YOUR_BASE_ID_HERE',
};

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
  if (!response.ok) throw new Error(`[${response.status}] ${method} ${path}\n${text}`);
  return JSON.parse(text);
}

async function getSchema() {
  const result = await request('GET', `/v0/meta/bases/${CONFIG.baseId}/tables`);
  return result.tables;
}

async function addField(tableId, tableName, fieldDef) {
  try {
    await request('POST', `/v0/meta/bases/${CONFIG.baseId}/tables/${tableId}/fields`, fieldDef);
    console.log(`  ✓ Added field '${fieldDef.name}' to '${tableName}'`);
  } catch (err) {
    if (err.message.includes('already exists') || err.message.includes('DUPLICATE')) {
      console.log(`  → Field '${fieldDef.name}' already exists in '${tableName}', skipping`);
    } else {
      throw err;
    }
  }
}

async function patchField(tableId, fieldId, tableName, fieldName, body) {
  await request('PATCH', `/v0/meta/bases/${CONFIG.baseId}/tables/${tableId}/fields/${fieldId}`, body);
  console.log(`  ✓ Updated field '${fieldName}' choices in '${tableName}'`);
}

async function getRecords(tableName, filterFormula = null) {
  const filter = filterFormula ? `&filterByFormula=${encodeURIComponent(filterFormula)}` : '';
  const result = await request('GET', `/v0/${CONFIG.baseId}/${encodeURIComponent(tableName)}?${filter}`);
  return result.records;
}

async function patchRecord(tableName, recordId, fields) {
  await request('PATCH', `/v0/${CONFIG.baseId}/${encodeURIComponent(tableName)}/${recordId}`, { fields });
}

async function seedRecord(tableName, fields) {
  await request('POST', `/v0/${CONFIG.baseId}/${encodeURIComponent(tableName)}`, {
    records: [{ fields }],
  });
  console.log(`  ✓ Seeded record into '${tableName}'`);
}

// ─── STEP 1: ADD NEW FIELDS ───────────────────────────────────────────────────

async function addDeploymentFields(tables) {
  const table = tables.find(t => t.name === 'deployments');
  if (!table) throw new Error("Table 'deployments' not found");

  await addField(table.id, 'deployments', {
    name: 'product_area',
    type: 'singleLineText',
  });

  await addField(table.id, 'deployments', {
    name: 'monitoring_status',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'Monitoring' },
        { name: 'Anomaly Detected' },
        { name: 'Brief Generated' },
        { name: 'Escalated' },
        { name: 'Resolved' },
        { name: 'Expected Behavior' },
      ],
    },
  });
}

async function addSignalFeedFields(tables) {
  const table = tables.find(t => t.name === 'signal_feeds');
  if (!table) throw new Error("Table 'signal_feeds' not found");

  // Add social_trust to signal_type singleSelect via Metadata API.
  const signalTypeField = table.fields.find(f => f.name === 'signal_type');
  if (signalTypeField) {
    const hasSocialTrust = signalTypeField.options.choices.some(c => c.name === 'social_trust');
    if (hasSocialTrust) {
      console.log(`  → 'social_trust' already exists in signal_type, skipping`);
    } else {
      try {
        const existingChoices = signalTypeField.options.choices.map(c => ({ id: c.id, name: c.name }));
        await request('PATCH', `/v0/meta/bases/${CONFIG.baseId}/tables/${table.id}/fields/${signalTypeField.id}`, {
          name: 'signal_type',
          options: { choices: [...existingChoices, { name: 'social_trust' }] },
        });
        console.log(`  ✓ Added 'social_trust' choice to signal_feeds.signal_type`);
      } catch (err) {
        console.log(`  ⚠ Could not add 'social_trust' via API — manual step needed (see end of output)`);
        global.SOCIAL_TRUST_MANUAL = true;
      }
    }
  }

  await addField(table.id, 'signal_feeds', {
    name: 'source',
    type: 'singleSelect',
    options: { choices: [{ name: 'internal' }, { name: 'external' }] },
  });

  await addField(table.id, 'signal_feeds', {
    name: 'social_post_snippets',
    type: 'multilineText',
  });

  await addField(table.id, 'signal_feeds', {
    name: 'post_authenticity_weight',
    type: 'number',
    options: { precision: 2 },
  });
}

async function addPastIncidentFields(tables) {
  const table = tables.find(t => t.name === 'past_incidents');
  if (!table) throw new Error("Table 'past_incidents' not found");

  await addField(table.id, 'past_incidents', {
    name: 'anomaly_type',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'Bug' },
        { name: 'Degradation' },
        { name: 'Intentional Restriction' },
        { name: 'New Baseline' },
        { name: 'Unknown' },
      ],
    },
  });

  await addField(table.id, 'past_incidents', {
    name: 'confidence_at_detection',
    type: 'number',
    options: { precision: 0 },
  });

  await addField(table.id, 'past_incidents', {
    name: 'outcome',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'Bug Confirmed' },
        { name: 'Expected Behavior' },
        { name: 'Ongoing' },
        { name: 'No Action' },
      ],
    },
  });
}

async function addImpactBriefFields(tables) {
  const table = tables.find(t => t.name === 'impact_briefs');
  if (!table) throw new Error("Table 'impact_briefs' not found");

  await addField(table.id, 'impact_briefs', {
    name: 'anomaly_type',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'Bug' },
        { name: 'Degradation' },
        { name: 'Intentional Restriction' },
        { name: 'New Baseline' },
        { name: 'Unknown' },
      ],
    },
  });

  await addField(table.id, 'impact_briefs', {
    name: 'confidence_band',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'Low' },
        { name: 'Medium' },
        { name: 'High' },
        { name: 'Critical' },
      ],
    },
  });

  await addField(table.id, 'impact_briefs', {
    name: 'pr_to_review',
    type: 'singleLineText',
  });

  await addField(table.id, 'impact_briefs', {
    name: 'human_decision',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'Pending' },
        { name: 'Acknowledged' },
        { name: 'Escalated' },
        { name: 'Rollback Initiated' },
        { name: 'Expected Behavior' },
      ],
    },
  });

  await addField(table.id, 'impact_briefs', {
    name: 'decision_timestamp',
    type: 'dateTime',
    options: {
      dateFormat: { name: 'iso' },
      timeFormat: { name: '24hour' },
      timeZone: 'utc',
    },
  });

  await addField(table.id, 'impact_briefs', {
    name: 'low_confidence_flag',
    type: 'checkbox',
    options: { icon: 'check', color: 'yellowBright' },
  });
}

async function addDecisionChoice(tables) {
  const table = tables.find(t => t.name === 'decisions');
  if (!table) throw new Error("Table 'decisions' not found");

  const decisionField = table.fields.find(f => f.name === 'decision');
  if (decisionField) {
    const hasExpected = decisionField.options.choices.some(c => c.name === 'expected_behavior');
    if (hasExpected) {
      console.log(`  → 'expected_behavior' already exists in decisions.decision, skipping`);
    } else {
      try {
        const existingChoices = decisionField.options.choices.map(c => ({ id: c.id, name: c.name }));
        await request('PATCH', `/v0/meta/bases/${CONFIG.baseId}/tables/${table.id}/fields/${decisionField.id}`, {
          name: 'decision',
          options: { choices: [...existingChoices, { name: 'expected_behavior' }] },
        });
        console.log(`  ✓ Added 'expected_behavior' choice to decisions.decision`);
      } catch (err) {
        console.log(`  ⚠ Could not add 'expected_behavior' via API — manual step needed (see end of output)`);
        global.DECISION_MANUAL = true;
      }
    }
  }
}

// ─── STEP 2: PATCH EXISTING PAST INCIDENTS ───────────────────────────────────

const INCIDENT_PATCHES = {
  // Map by incident_id → new field values
  'INC-2024-003': { anomaly_type: 'Bug', confidence_at_detection: 84, outcome: 'Bug Confirmed' },
  'INC-2024-006': { anomaly_type: 'Bug', confidence_at_detection: 78, outcome: 'Bug Confirmed' },
  'INC-2024-009': { anomaly_type: 'Bug', confidence_at_detection: 71, outcome: 'Bug Confirmed' },
  'INC-2024-011': { anomaly_type: 'Bug', confidence_at_detection: 66, outcome: 'Bug Confirmed' },
  'INC-2025-001': { anomaly_type: 'Bug', confidence_at_detection: 74, outcome: 'Bug Confirmed' },
  'INC-2025-004': { anomaly_type: 'Degradation', confidence_at_detection: 68, outcome: 'Bug Confirmed' },
};

async function patchPastIncidents() {
  const records = await getRecords('past_incidents');
  let patched = 0;
  for (const record of records) {
    const incidentId = record.fields.incident_id;
    const patch = INCIDENT_PATCHES[incidentId];
    if (patch) {
      await patchRecord('past_incidents', record.id, patch);
      console.log(`  ✓ Patched past_incident: ${incidentId}`);
      patched++;
    }
  }
  if (patched === 0) console.log('  → All past_incidents already patched or not found');
}

// ─── STEP 3: SEED NEW RECORDS ─────────────────────────────────────────────────

async function seedNewRecords() {
  // DEP-001: patch product_area onto existing deployment
  const deps = await getRecords('deployments', "{deployment_id}='deploy-v24.4-20260224'");
  if (deps.length > 0) {
    await patchRecord('deployments', deps[0].id, {
      product_area: 'RRSP and TFSA Accounts',
      monitoring_status: 'Escalated',
    });
    console.log('  ✓ Patched DEP-001 with product_area + monitoring_status');
  }

  // DEP-002: Scenario B — Credit Card
  const dep002exists = await getRecords('deployments', "{deployment_id}='DEP-002'");
  if (dep002exists.length === 0) {
    await seedRecord('deployments', {
      deployment_id: 'DEP-002',
      release_version: 'v23.9',
      release_datetime: '2026-01-13T10:00:00.000Z',
      product_area: 'Credit Card Feature',
      changed_services: 'credit-card-eligibility-service',
      affected_account_types: 'Credit Card',
      affected_user_segment: 'waitlist-eligible clients',
      pr_references: 'PR #4102',
      deploying_team: 'Credit Products',
      monitoring_status: 'Expected Behavior',
    });
  } else {
    console.log('  → DEP-002 already exists, skipping');
  }

  // SIG-005: social_trust for DEP-001
  const sig005exists = await getRecords('signal_feeds', "{feed_id}='SIG-005'");
  if (global.SOCIAL_TRUST_MANUAL) {
    console.log('  → SIG-005 skipped (social_trust choice not yet in field — add manually first, then rerun)');
  } else if (sig005exists.length === 0) {
    await seedRecord('signal_feeds', {
      feed_id: 'SIG-005',
      deployment_id: 'deploy-v24.4-20260224',
      signal_type: 'social_trust',
      timestamp: '2026-02-24T10:30:00.000Z',
      value: 2,
      baseline_value: 1,
      delta_pct: 100,
      account_type_filter: 'all',
      version_filter: 'v24.4',
      source: 'external',
      post_authenticity_weight: 0.78,
      social_post_snippets: JSON.stringify([
        'Anyone else getting an error trying to contribute to their RRSP this morning? App keeps failing at the last step.',
        "Wealthsimple app won't let me contribute to my RRSP — says contribution limit exceeded but I have room. Anyone?",
        'Getting a weird validation error on RRSP contribution. Has anyone else seen this today?',
      ]),
      notes: 'Social trust declining. 3 posts from r/PersonalFinanceCanada within 2hrs of release. Avg authenticity: 0.78.',
    });
  } else {
    console.log('  → SIG-005 already exists, skipping');
  }

  // SIG-010: support_contacts for DEP-002
  const sig010exists = await getRecords('signal_feeds', "{feed_id}='SIG-010'");
  if (sig010exists.length === 0) {
    await seedRecord('signal_feeds', {
      feed_id: 'SIG-010',
      deployment_id: 'DEP-002',
      signal_type: 'support_contacts',
      timestamp: '2026-01-13T10:00:00.000Z',
      value: 22,
      baseline_value: 3,
      delta_pct: 633,
      account_type_filter: 'Credit Card',
      version_filter: 'v23.9',
      source: 'internal',
      notes: 'Support spike — clients unable to access credit card feature.',
    });
  } else {
    console.log('  → SIG-010 already exists, skipping');
  }

  // SIG-011: social_trust for DEP-002
  const sig011exists = await getRecords('signal_feeds', "{feed_id}='SIG-011'");
  if (global.SOCIAL_TRUST_MANUAL) {
    console.log('  → SIG-011 skipped (social_trust choice not yet in field — add manually first, then rerun)');
  } else if (sig011exists.length === 0) {
    await seedRecord('signal_feeds', {
      feed_id: 'SIG-011',
      deployment_id: 'DEP-002',
      signal_type: 'social_trust',
      timestamp: '2026-01-13T11:15:00.000Z',
      value: 2,
      baseline_value: 1,
      delta_pct: 100,
      account_type_filter: 'all',
      version_filter: 'v23.9',
      source: 'external',
      post_authenticity_weight: 0.61,
      social_post_snippets: JSON.stringify([
        "Applied for the Wealthsimple credit card but got rejected — anyone else?",
        "Can't seem to get access to the new credit card feature",
        "Tried applying for WS credit card, says I'm not eligible but I meet all criteria",
      ]),
      notes: 'Social trust declining. 3 posts about credit card access. Avg authenticity: 0.61 — lower weight for Scenario B.',
    });
  } else {
    console.log('  → SIG-011 already exists, skipping');
  }

  // INC-007: Scenario B — Credit Card, Intentional Restriction
  const inc007exists = await getRecords('past_incidents', "{incident_id}='INC-007'");
  if (inc007exists.length === 0) {
    await seedRecord('past_incidents', {
      incident_id: 'INC-007',
      date: '2026-01-13',
      product_area: 'Credit Card — Access Flow',
      affected_segment: 'Waitlist-eligible clients — invite-only launch',
      signal_pattern: JSON.stringify({
        support_contacts_delta: '+633%',
        social_trust: 'Declining',
        post_authenticity_weight: 0.61,
      }),
      root_cause: 'N/A — phased rollout by design. Access restriction is intentional for invite-only launch.',
      resolution: 'Human confirmed expected behavior. No engineering action required.',
      resolution_time_hours: 1,
      pr_reference: 'PR #4102',
      anomaly_type: 'Intentional Restriction',
      confidence_at_detection: 52,
      outcome: 'Expected Behavior',
    });
  } else {
    console.log('  → INC-007 already exists, skipping');
  }

  // INC-008: Current incident (Scenario A — RRSP Bug, Feb 2026)
  const inc008exists = await getRecords('past_incidents', "{incident_id}='INC-008'");
  if (inc008exists.length === 0) {
    await seedRecord('past_incidents', {
      incident_id: 'INC-008',
      date: '2026-02-24',
      product_area: 'Registered Accounts — RRSP Contribution',
      affected_segment: 'Clients with RRSP + TFSA dual accounts',
      signal_pattern: JSON.stringify({
        support_contacts_delta: '+325%',
        error_rate_delta: '+110%',
        completion_rate_delta: '-28%',
        app_reviews: 3,
        social_trust: 'Declining',
      }),
      root_cause: 'Sequential validation in PR #4821 — contribution limit validation applied across accounts instead of independently.',
      resolution: 'Hotfix in progress',
      resolution_time_hours: 0,
      pr_reference: 'PR #4821',
      anomaly_type: 'Bug',
      confidence_at_detection: 84,
      outcome: 'Bug Confirmed',
    });
  } else {
    console.log('  → INC-008 already exists, skipping');
  }

  // BRF-002: Scenario B impact brief (historical — not cleared by reset-demo)
  const brf002exists = await getRecords('impact_briefs', "{brief_id}='BRF-002'");
  if (brf002exists.length === 0) {
    await seedRecord('impact_briefs', {
      brief_id: 'BRF-002',
      deployment_id: 'DEP-002',
      generated_at: '2026-01-13T11:30:00.000Z',
      anomaly_type: 'Intentional Restriction',
      confidence_score: 52,
      confidence_band: 'Low',
      affected_flow: 'Credit Card Application Flow',
      affected_segment: 'Waitlist-eligible clients',
      estimated_affected_users: '85000',
      signal_summary: JSON.stringify([
        { signal_type: 'support_contacts', direction: 'up', magnitude: '+633%', note: 'High support volume — clients unable to access feature' },
        { signal_type: 'social_trust', direction: 'declining', magnitude: 'value=2', note: '3 posts about access rejection. Avg authenticity: 61%' },
      ]),
      pattern_match_id: '',
      pattern_match_summary: 'No strong historical match found. Signal pattern is consistent with a phased or invite-only product launch — access restriction by design rather than a system failure. Confidence is low. Human review required to confirm intended behavior.',
      pr_to_review: 'PR #4102',
      recommended_action: 'Verify with Credit Products team whether access restriction reflects phased rollout design. Confirm intended behavior before any action.',
      status: 'acknowledged',
      human_decision: 'Expected Behavior',
      decision_timestamp: '2026-01-13T12:30:00.000Z',
      low_confidence_flag: true,
    });
  } else {
    console.log('  → BRF-002 already exists, skipping');
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== Fathom Trace — Airtable Migration v2.1 ===\n');

  if (CONFIG.apiKey.startsWith('PASTE') || CONFIG.baseId.startsWith('PASTE')) {
    console.error('ERROR: Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID before running.');
    process.exit(1);
  }

  console.log('Step 1: Fetching current schema...');
  const tables = await getSchema();
  console.log(`  ✓ Found ${tables.length} tables\n`);

  console.log('Step 2: Adding new fields...');
  await addDeploymentFields(tables);
  await addSignalFeedFields(tables);
  await addPastIncidentFields(tables);
  await addImpactBriefFields(tables);
  await addDecisionChoice(tables);
  console.log('');

  console.log('Step 3: Patching existing past_incidents with anomaly metadata...');
  await patchPastIncidents();
  console.log('');

  console.log('Step 4: Seeding new records...');
  await seedNewRecords();
  console.log('');

  console.log('=== Migration complete ===');

  if (global.SOCIAL_TRUST_MANUAL || global.DECISION_MANUAL) {
    console.log('\n⚠ MANUAL STEPS REQUIRED IN AIRTABLE UI:');
    if (global.SOCIAL_TRUST_MANUAL) {
      console.log('  1. Open Airtable → signal_feeds table → click "signal_type" column header → Edit field');
      console.log('     → Add choice: "social_trust" → Save');
      console.log('     Then rerun this script to seed SIG-005 and SIG-011.');
    }
    if (global.DECISION_MANUAL) {
      console.log('  2. Open Airtable → decisions table → click "decision" column header → Edit field');
      console.log('     → Add choice: "expected_behavior" → Save');
    }
    console.log('');
  }

  console.log('Next:');
  console.log('  1. Complete any manual Airtable steps above');
  console.log('  2. Update W3 system prompts in n8n (see architecture/n8n-w3-prompts-v2.md)');
  console.log('  3. Paste Lovable follow-up prompt (see architecture/lovable-followup-v2.md)');
  console.log('  4. Run reset-demo.js before recording\n');
}

main().catch((err) => {
  console.error('\nMigration failed:', err.message);
  process.exit(1);
});

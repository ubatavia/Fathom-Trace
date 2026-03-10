# n8n Setup Guide — Fathom Trace

## Import Order

Import workflows in this order (each is in this folder):

1. `workflow-1-deployment-trigger.json`
2. `workflow-2-signal-monitor.json`
3. `workflow-3-ai-analysis-chain.json`  ← This is the core
4. `workflow-4-decision-logger.json`

---

## How to Import

1. In n8n Cloud, click **Add Workflow**
2. Click the three-dot menu → **Import from file**
3. Select the JSON file
4. Repeat for all 4 workflows

---

## Step 1 — Hardcode Credentials in Each Workflow's Set Config Node

**Note:** n8n Variables (`$vars`) is a Pro/Enterprise feature — not available on the free trial. Instead, enter credentials directly in the Set Config node of each workflow.

After importing each workflow, open it and click the **Set Config** node. Add the following fields manually (click **Add field** for each):

**Workflow 3 — Set Config fields:**

| Name | Type | Value |
|---|---|---|
| `deployment_id` | String | `deploy-v24.4-20260224` |
| `airtable_base_id` | String | your `appXXXXXX` base ID |
| `airtable_api_key` | String | your `pat...` token |
| `anthropic_api_key` | String | your `sk-ant-...` key |

Workflows 2 and 4 have their own Set Config nodes — enter `airtable_base_id` and `airtable_api_key` in each. Field names must match exactly.

**Workflow 1** uses an Airtable Trigger node (not a Set Config node). Click the trigger node and enter your base ID directly in the `application` field, then select your Airtable credential from the dropdown.

---

## Step 2 — Set Up Airtable Credential in n8n

Workflow 1 uses n8n's native Airtable Trigger node, which requires a saved credential:

1. Go to **Credentials** → **Add Credential** → Search "Airtable Token API"
2. Paste your Airtable personal access token
3. Save it as "Airtable Token"
4. Open Workflow 1 → click the Airtable Trigger node → select "Airtable Token" from the credential dropdown
5. Replace the `application` field value with your actual `appXXXXXX` base ID (the `$vars` reference won't work on free trial)

Workflows 2, 3, and 4 use plain HTTP Request nodes — no saved credential needed, the API key is passed in headers via the Set Config node values from Step 1.

---

## Step 3 — Test Workflow 3 First

Workflow 3 is the one that actually matters. Test it before activating anything else.

1. Open **Workflow 3: AI Analysis Chain**
2. Click **Test Workflow** (the manual trigger at the start)
3. Watch the execution — each node should turn green
4. After ~10-15 seconds, check Airtable: a new record should appear in `impact_briefs`
5. The deployment record in `deployments` should update to `status: brief_generated`

If any node turns red, click it to see the error. Common issues:
- **Airtable read returns empty**: Check that setup-airtable.js ran successfully
- **Claude API 401**: Check `ANTHROPIC_API_KEY` variable is set correctly
- **JSON parse error**: The Claude response contained extra text — check the Code node logs

---

## Step 4 — Workflow 4 Setup (Webhook Trigger)

The imported Workflow 4 uses an Airtable Trigger node which is unreliable on the free trial. Replace it with a Webhook:

1. Open **Workflow 4**
2. Delete the **Airtable Trigger** node
3. Click **+** → search **Webhook** → add it
4. Set method to **POST**
5. Connect **Webhook** → **Extract Decision** node
6. Fix the **Extract Decision** code node — replace `$vars` references with hardcoded values:
   ```javascript
   airtable_base_id: 'appXXXXXX',
   airtable_api_key: 'pat...',
   ```
7. **Copy the webhook URL** — you will need it when building the Lovable dashboard (decision buttons POST to this URL)
8. Activate Workflow 4

---

## Step 5 — Activate Workflows for Demo

Activate in this order:

1. Activate **Workflow 4** (webhook is now live once activated)
2. Activate **Workflow 2** (signal monitor — runs every 2 min)
3. **Workflow 1** and **Workflow 3** stay inactive (triggered manually for demo)

---

## Demo Trigger Sequence

Before recording:
1. Run `node scripts/reset-demo.js` to clear impact_briefs and reset status
2. Open n8n Cloud → Workflow 3
3. Click **Test Workflow** to trigger the AI chain
4. Wait for all nodes to complete (~10-15 sec)
5. Verify impact brief appears in Airtable
6. Open Lovable dashboard — brief should be visible
7. Start recording

---

## Workflow Summary

| Workflow | Trigger | What It Does |
|---|---|---|
| W1 — Deployment Trigger | New Airtable record in `deployments` | Detects new deployments |
| W2 — Signal Monitor | Every 2 minutes | Checks signal deviations vs thresholds |
| W3 — AI Analysis Chain | Manual (demo) | Runs 3 Claude API calls, writes brief |
| W4 — Decision Logger | Webhook POST from Lovable | Logs human decision, updates deployment status |

---

## Node Count in Workflow 3

```
Manual Trigger
  → Set Config (hardcoded credentials)
  → Read Deployment Record (Airtable GET)
  → Read Signal Feeds (Airtable GET)
  → Prepare Call 1 Input (Code)
  → Claude Call 1 — Anomaly Classification (HTTP POST)
  → Parse Call 1 (Code)
  → Read Past Incidents (Airtable GET)
  → Prepare Call 2 Input (Code)
  → Claude Call 2 — Pattern Matching (HTTP POST)
  → Parse Call 2 + Prepare Call 3 (Code)
  → Claude Call 3 — Impact Brief (HTTP POST)
  → Parse Call 3 (Code)
  → Write Impact Brief to Airtable (HTTP POST)
  → Prepare Status Update (Code)
  → Get Deployment Record ID (Airtable GET)
  → Extract Record ID (Code)
  → Update Deployment Status (HTTP PATCH)
```

Total: 18 nodes. Expected runtime: 10-20 seconds.

# Fathom Trace — Build Checklist
## Deadline: March 2, 2026
## Last updated: 2026-03-01 (Session 12)

Legend: [x] done | [~] partial/known issue | [ ] not started

---

## Account Setup

- [x] **Anthropic API key** — confirmed from console.anthropic.com
- [x] **Airtable** — free account created, base ID: app5MsHEVyYJdJD09
- [x] **n8n Cloud** — free trial active
- [x] **Lovable** — paid account ready

---

## Step 1 — Airtable Base Setup

- [x] Create new base: "Fathom Trace"
- [x] Create table: `deployments`
- [x] Create table: `signal_feeds`
- [x] Create table: `past_incidents`
- [x] Create table: `impact_briefs`
- [x] Create table: `decisions`
- [x] Get Airtable API key + Base ID
- [x] Seed `past_incidents` with all 6 historical records
- [x] Seed `deployments` with demo record (deploy-v24.4-20260224)
- [x] Seed `signal_feeds` with 4 demo signals (sig-001 through sig-004)
- [x] API key rotated after accidental exposure in chat (2026-02-28)

---

## Step 2 — n8n Workflows

- [x] n8n Cloud free trial started
- [x] Import Workflow 1: Deployment trigger
- [x] Import Workflow 2: Signal monitor
- [x] Import Workflow 3: AI Analysis Chain
- [x] Import Workflow 4: Decision logger
- [x] W3 Set Config node — credentials hardcoded (deployment_id, airtable_base_id, airtable_api_key, anthropic_api_key)
- [x] W3 tested once — brief generated and written to impact_briefs
- [x] W3 second clean test run — confirmed working. All nodes green, brief in Airtable.
- [x] W2 Set Thresholds node — credentials and thresholds hardcoded
- [x] W4 webhook setup — Airtable Trigger replaced with Webhook node, webhook URL copied
- [x] W4 Extract Decision code node — airtable credentials hardcoded
- [x] W2 activated | W4 activated
- [ ] Confirm full chain W1 → W2 → W3 → W4 (post-Lovable)

**Known issues / workarounds:**
- n8n Variables ($vars) not available on free trial — credentials hardcoded in Set Config nodes
- Node.js not on PATH in Codespace terminal — run scripts via Claude Code Bash tool instead
- W2 Set Thresholds imported empty — not blocking demo (W3 triggered manually)

---

## Step 3 — Claude API Prompts

- [x] Call 1 system prompt in W3 HTTP node (anomaly classification)
- [x] Call 2 system prompt in W3 HTTP node (pattern matching)
- [x] Call 3 system prompt in W3 HTTP node (impact brief)
- [x] All 3 calls return JSON — confirmed on first test run
- [x] Demo scenario generates ~84% confidence brief

---

## Step 4 — Lovable Dashboard

- [x] Write Lovable prompt (architecture/lovable-prompt.md) — card-based layout, Wealthsimple aesthetic, humanized labels, follow-up prompts
- [x] Create new project in Lovable + connect GitHub (`lovable-dashboard` branch)
- [x] Build dashboard from Lovable prompt (v1 complete — Version A light)
- [x] Deployment card functional ("Needs review" badge, v24.4, RRSP headline)
- [x] System Confidence donut (keep format — fix number from 89% → 84%)
- [x] Warning Signs: 4 signal cards with sparklines + delta labels
- [x] Impact Brief: narrative text + collapsible accordions (keep collapsed)
- [x] Decision buttons: Acknowledge / Escalate / Roll back — correct layout
- [x] Past Incidents grid: 6 cards seeded
- [x] Run migrate-airtable-v2.js (new fields + seed records) — all records seeded including SIG-005, SIG-011 after manual Airtable steps
- [x] Manual Airtable steps: added "social_trust" to signal_feeds.signal_type, "expected_behavior" to decisions.decision
- [x] Update W3 prompts in n8n (Calls 1, 2, 3 updated with v2.1 system prompts)
- [x] Parse Call 3 code updated: 5 new fields (anomaly_type, confidence_band, pr_to_review, low_confidence_flag, human_decision)
- [x] W3 v2.1 full run confirmed: anomaly_type=Bug, confidence_score=93, confidence_band=High, low_confidence_flag=false
- [x] workflow-3-ai-analysis-chain.json updated with all v2.1 changes (importable, system prompts in Code nodes)
- [~] estimated_affected_users: removed from W3 Airtable write (field type mismatch — seed data covers demo, revisit post-recording)
- [x] W2 paused to conserve executions (887/1000 at time of pause — ~113 remaining)
- [x] Paste Lovable Prompt A (architecture/lovable-followup-v2.md) — targeted changes:
  - [x] Change 1: Confidence donut reads from Airtable + anomaly type badge pair [Bug] · [84% High]
  - [x] Change 2: Low confidence flag banner (confirmed working — shows for Credit Card, hidden for RRSP)
  - [x] Change 3: Mark as Expected Behavior 4th button (confirmed showing in IMG_0024)
  - [x] Change 4: Past incidents anomaly badges + INC-007 card — confirmed in IMG_0027
  - [x] Change 5: Social Trust 5th signal card (confirmed — all 5 cards showing both scenarios)
  - [x] Change 6: DROPPED — Raw Signal View toggle removed. Replaced by demo/before-fathom-trace.html
- [x] Deployment scenario switcher added — tabs switch between RRSP (DEP-001) and Credit Card (DEP-002)
- [x] Scenario B (Credit Card, DEP-002) functional: 52% confidence, Intentional Restriction badge, Low Confidence badge, 5 signal cards
- [x] before-fathom-trace.html created — 5 siloed team tool cards, used as browser-tab contrast moment in demo
- [x] BRF-002 patched: full_brief_text, signal_summary, estimated_affected_users (85000), status=acknowledged, human_decision=Expected Behavior
- [x] SIG-012/013/014 seeded (3 normal signals for DEP-002 — explains low confidence narrative)
- [x] Lovable fixes — confirmed in IMG_0026/0027:
  - [x] Fix deployment card not updating to Credit Card info — confirmed: "Credit Card Feature / V23.9" showing (IMG_0027)
  - [x] Fix RRSP bullet points bleeding into Credit Card brief — confirmed: Credit Card brief shows correct content (IMG_0027)
  - [x] Fix decision buttons showing for BRF-002 — confirmed: shows "Expected Behavior recorded at Jan 12, 2026 12:30 PM" (IMG_0027)
  - [x] Fix Acknowledge button style — confirmed fixed
  - [x] Fix client count display — metric block with brick left border, ~285,000 / ~85,000, calm label
- [x] Decision buttons POST to W4 webhook with confirmation modal — confirmed working
- [x] W4 fires on button click → deployment status updates in Airtable → badge updates in Lovable
- [x] Full loop test: reset-demo → trigger W3 → brief loads → click decision → W4 fires

---

## Emergency Redundancy — React Fallback Dashboard

> **Precaution taken 2026-03-01 (Session 13):** In the event Lovable is unavailable, unresponsive, or the live Airtable connection fails during recording, a fully self-contained React dashboard has been built and verified as a hot swap.

- [x] React fallback dashboard built — `react-dashboard/` (Vite + React 18, `npm run dev`, port 5173)
- [x] Build verified: `vite build` succeeds clean — 40 modules, 0 errors
- [x] Fully hardcoded data — zero Airtable/n8n dependency. Both RRSP and Credit Card scenarios fully seeded.
- [x] Feature parity confirmed:
  - [x] Scenario switcher (RRSP v24.4 / Credit Card v23.9)
  - [x] Deployment card, System Confidence donut (84%/52%), badge pairs
  - [x] 5 Warning Signs signal cards — SVG sparklines, bar charts, star ratings, Social Trust expandable
  - [x] Impact Brief: narrative, 3 accordions, decision buttons (3 RRSP / 4 Credit Card)
  - [x] Low Confidence Flag banner (Credit Card only)
  - [x] Confirmation modal + toast + decision recorded state
  - [x] 7 Past Incidents cards including INC-007 (teal border, Expected Behavior)
- [x] Optional live mode: set `VITE_W4_WEBHOOK=<url>` in `.env` → POSTs real decisions to n8n W4
- [x] **To activate fallback:** `cd "Wealthsimple Task/react-dashboard" && npm run dev` → open http://localhost:5173

**Why this matters for the submission narrative:**
The system is designed so that no single external dependency can derail a demo or, in production, a human decision. Lovable can fail. Airtable can rate-limit. The AI chain can be slow. Each layer has a documented fallback. This is the same design principle as Fathom Trace itself — the human decision never waits on a single point of failure.

---

## Step 5 — Demo Rehearsal

- [ ] Run full scenario from scratch (reset → trigger W3 → brief appears → human decides)
- [ ] Time under 3:00
- [ ] Narration practiced 3x
- [ ] Final video recorded
- [ ] Video reviewed — no dead air, clean pacing
- [ ] Exported at 1080p minimum

---

## Step 6 — Submission

- [ ] Video file ready
- [ ] 500-word written explanation finalised (base draft in PRD Section 8)
- [ ] Submit to Wealthsimple AI Builder program
- [ ] Confirm receipt

---

## Emergency Fallbacks

| Problem | Fallback |
|---|---|
| Lovable output not polished enough | [x] Build React dashboard in Claude Code — DONE (`react-dashboard/`, `npm run dev`, port 5173) |
| n8n Cloud trial expired | Run n8n locally via Docker |
| Claude API latency too slow for live demo | Brief pre-generated, reveal during recording |
| Airtable API rate limiting | Use local JSON as data store |
| Node not on PATH in terminal | Run scripts via Claude Code Bash tool |

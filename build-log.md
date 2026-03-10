# Fathom Trace — Build Log
## Running record of all build decisions, completions, and issues

This file is updated as each step is completed. It is the source of truth for build state.

---

## 2026-02-28 — Session 1: Planning + Architecture

**Completed:**
- PRD reviewed in full. All 9 open decisions resolved.
- Project folder structure created:
  - architecture/ (system-flow.md, data-schema.md, account-setup.md)
  - prompts/ (3 Claude API call contracts with expected outputs)
  - scripts/ (setup-airtable.js, reset-demo.js)
  - n8n/ (4 workflow JSONs + README)
  - demo/ (script.md with timecodes, checklist.md)

**Decisions locked:**
- One incident only: RRSP contribution flow (v24.4)
- n8n Cloud free trial
- Lovable paid for dashboard
- Pre-trigger AI calls before recording; cut to brief already generated
- Card-based UI for impact brief with confidence score bar
- Airtable free tier (base ID: app5MsHEVyYJdJD09)
- Claude API key confirmed from console.anthropic.com

**Key design decisions:**
- n8n Variables ($vars) not available on free trial → credentials hardcoded in Set Config nodes
- W4 decision logger uses Webhook trigger (not Airtable trigger) — webhook URL needed for Lovable
- Reset script (reset-demo.js) clears impact_briefs + decisions, resets deployment to 'monitoring'
- Scripts run via Claude Code Bash tool (node not on PATH in Codespace terminal)

---

## 2026-02-28 — Session 2: Airtable + n8n Setup

**Completed:**
- Airtable free account created
- Base "Fathom Trace" created, base ID: app5MsHEVyYJdJD09
- All 5 tables created via setup-airtable.js script:
  - deployments, signal_feeds, past_incidents, impact_briefs, decisions
- Seeded:
  - past_incidents: 6 historical records (INC-2024-003 through INC-2025-004)
  - deployments: 1 demo record (deploy-v24.4-20260224, status: monitoring)
  - signal_feeds: 4 demo signals (sig-001 through sig-004)
- n8n Cloud free trial started
- All 4 workflows imported from JSON files
- W3 Set Config node configured with all 4 credentials:
  - deployment_id: deploy-v24.4-20260224
  - airtable_base_id: app5MsHEVyYJdJD09
  - airtable_api_key: (rotated — see security note)
  - anthropic_api_key: (from console.anthropic.com)
- W3 tested once — all 18 nodes green, brief written to impact_briefs
- Reset run (via Claude Code Bash tool) — impact_briefs cleared, deployment reset to monitoring
- W3 second test run — in progress at end of session

**Security incident:**
- Airtable API key accidentally posted in chat (2026-02-28)
- Key immediately rotated at airtable.com/create/tokens
- New key entered in W3 Set Config node
- W2 Set Thresholds and W4 Extract Decision also need updating with new key before activation

**Known issues / open items:**
- W2 Set Thresholds node imported empty — needs these fields added manually before activating W2:
  - deployment_id: deploy-v24.4-20260224
  - airtable_base_id: app5MsHEVyYJdJD09
  - airtable_api_key: (new key)
  - support_contacts_threshold: 50
  - error_rate_threshold: 30
  - completion_rate_threshold: -15
  - app_review_threshold: 2
- W4 not yet configured — needs webhook trigger + credential update
- W4 webhook URL not yet copied (needed for Lovable decision buttons)

---

## 2026-02-28 — Session 3: W3 Confirmed + PRD Update

**Completed:**
- W3 second clean test run: successful. All 18 nodes green. Brief written to impact_briefs.
- W3 is production-ready for demo.
- PRD updated to v1.3 — merged PRD (1).md. Added Sections 12 (narration script), 13 (confidence score definition), 14 (contingency plan), 15 (Raw Signal View tab spec), 16 (500-word personal opening). Changelog added.
- Decision #1 (demo data realism) reopened: one incident for the build, to re-evaluate post-Lovable whether to add a second "happy path" scenario showing a dismissed false positive.
- PRD (1).md deleted (content fully merged into PRD.md).
- Chat compacted. All state preserved in this log + checklist + MEMORY.md.

**Current state entering next session:**
- Airtable: clean (impact_briefs cleared, deployment at monitoring)
- n8n W3: confirmed working x2
- W4: not yet configured (webhook trigger needed)
- Lovable: not started

---

## 2026-02-28 — Session 4: Lovable Prompt Written (initial)

**Completed:**
- Lovable prompt created at `architecture/lovable-prompt.md`
- Initial version: 4-panel layout, Airtable API config, field mappings, thresholds, W4 webhook POST payload, follow-up prompts
- Initial style: dark theme — subsequently revised in Session 5

---

## 2026-02-28 — Session 5: Lovable Prompt Refined + Verified

**Completed:**
- Layout changed from rigid 4-panel grid to card-based flow — matches Wealthsimple aesthetic
- All visible UI labels humanized:
  - "Active Deployments" → "Recent releases"
  - "Signal Feed" → "Warning signs"
  - "Impact Brief" → "What happened"
  - "Incident History" → "What we've seen before"
  - Badge labels: "Needs your review", "Something looks off", "Watching", "Resolved"
  - Signal deltas: "Up 340% from normal" not "+340%"
  - Action buttons: "Roll back this release" not "Rollback"
- Visual style grounded in Wealthsimple's confirmed design system (Dune + White only):
  - Version A (paste first): Light mode, Dune (#32302F) primary, warm off-white cards, Cormorant Garamond for tool name + main card headline only, DM Sans for everything else. No orange. No accent colour. Muted status pills (text-only colour). Outlined action buttons differentiated by border/text colour.
  - Version B (fresh project, compare): Warm dark mode extrapolated from Dune — card surface IS Dune (#32302F), background darker, warm off-white text, no saturated accents. Same fonts.
- Two file corruption issues caught and fixed (scrambled opening paragraph, stale badge labels in Version A style spec)
- Follow-up prompts revised: fonts clarification (Cormorant scope), added orange removal prompt, updated colour refs to match final palette
- Error States and Do Not Build sections updated to card language
- Lovable GitHub integration guide documented (connect → link to `ubatavia/Ipad-claude-environment` → branch `lovable-dashboard` → push manually after each significant iteration)
- Sync strategy confirmed: Lovable owns UI code; Claude Code owns everything else; update checklist + build-log after each Lovable session; push to GitHub branch as code backup

**Placeholders to fill before pasting into Lovable:**
- `[REPLACE_WITH_AIRTABLE_API_KEY]` — replace including brackets with `pat...` token
- `[REPLACE_WITH_W4_WEBHOOK_URL]` — replace including brackets with n8n W4 webhook URL

**Next steps:**
1. Open lovable.dev → new project → connect GitHub → link to `lovable-dashboard` branch
2. Fill the two placeholders in lovable-prompt.md
3. Paste everything between `## PROMPT` and `## Follow-Up Prompts` into Lovable
4. Iterate using follow-up prompts as needed; push to GitHub before major prompt changes
5. Test action buttons → confirm W4 fires → decision appears in Airtable decisions table
6. Run full loop: reset-demo → trigger W3 → brief in Lovable → click decision → W4 fires

---

## 2026-02-28 — Session 6: Lovable Prompt Corrected (PRD v1.3 compliance)

**Completed:**
- Fixed confidence thresholds in lovable-prompt.md — corrected to match PRD Section 13 exactly:
  - Previous: 85-100 sage / 70-84 ochre / 50-69 amber / below 50 grey
  - Corrected: below 60 grey / 60-79 ochre / 80-94 brick alert / 95+ brick pulsing
  - At 84%, demo scenario now correctly hits the 80-94 "High Confidence" (brick) tier, not ochre
- Added Raw Signal View tab spec (PRD Section 15 requirement) — was missing from prompt:
  - Second tab with 4 raw charts (one per signal_type), no baseline, no interpretation
  - Used at 0:50 mark of demo for 8 seconds as before-state contrast
- Removed "No charts or graphs" from Do Not Build (conflicted with Raw Signal View requirement)
- Added follow-up prompt: "If Raw Signal View tab is missing or wrong"
- Updated confidence bar follow-up prompts to reference corrected 80-94 brick tier at 84%

**Current state:**
- Lovable prompt is now fully PRD v1.3 compliant
- W4 webhook setup still pending (n8n UI step — needed before Lovable button wiring)
- Lovable build: ready to start once W4 webhook URL is in hand

---

## 2026-03-01 — Session 7: PRD v2.1 + Migration Prep

**Completed:**
- PRD updated to v2.1 (consolidated from PRD_v2.1.md — old file deleted)
- v2.1 key additions: Lovable v1 audit (keep-as-is list), 6 targeted changes, Scenario B (credit card, Intentional Restriction, 52%), anomaly_type classification table, updated Airtable schema, updated n8n W3 prompts, updated demo narration script
- Airtable migration script created: `scripts/migrate-airtable-v2.js`
  - Adds new fields: product_area + monitoring_status to deployments; social_trust choice + source + social_post_snippets + post_authenticity_weight to signal_feeds; anomaly_type + confidence_at_detection + outcome to past_incidents; anomaly_type + confidence_band + pr_to_review + human_decision + decision_timestamp + low_confidence_flag to impact_briefs; expected_behavior choice to decisions
  - Patches existing 6 past_incidents with anomaly metadata
  - Seeds new records: DEP-002, SIG-005, SIG-010, SIG-011, INC-007, INC-008, BRF-002
- reset-demo.js updated: now preserves BRF-002 (Scenario B brief) — only clears Scenario A briefs for DEP-001
- n8n W3 prompt updates written: `architecture/n8n-w3-prompts-v2.md` — exact prompts for Calls 1, 2, 3 with anomaly_type and low_confidence_flag
- Lovable follow-up prompts written: `architecture/lovable-followup-v2.md`
  - Prompt A: 6 targeted changes (confidence fix to 84%, badge pair, low confidence banner, expected behavior button, past incidents INC-007 card, social trust 5th card, raw signal toggle)
  - Prompt B: Version B warm-dark color scheme (separate follow-up after A confirmed)

**Design decisions confirmed this session:**
- Confidence donut: keep format, fix number to 84%
- Warning signs: keep as signal cards with sparklines (not horizontal bars)
- Brief accordions: keep collapsed (user preference)
- Layout divergence from original spec: keep (user approved)
- One Lovable version only — Version B colors applied as follow-up to same project

**Execution order:**
1. Run migration script (adds schema + seeds new records)
2. Update W3 prompts in n8n manually (reference: n8n-w3-prompts-v2.md)
3. Paste Lovable Prompt A
4. Confirm all 6 changes functional
5. Paste Lovable Prompt B (Version B colors)
6. Run reset-demo.js + trigger W3 + full loop test

---

## 2026-03-01 — Session 8: Airtable Migration Complete + W3 v2.1 Live

**Completed:**
- Manual Airtable steps done: "social_trust" added to signal_feeds.signal_type, "expected_behavior" added to decisions.decision
- Migration script rerun: SIG-005 and SIG-011 seeded successfully. All migration records complete.
- W3 updated in n8n with v2.1 system prompts:
  - Call 1: anomaly_type classification (Bug/Degradation/Intentional Restriction/New Baseline/Unknown) + warrants_pattern_matching
  - Call 2: match_confidence formula + anomaly_type_confirmed field
  - Call 3: confidence_band, low_confidence_flag, pr_to_review, signal_summary as objects, full_brief_text structure; max_tokens bumped to 4096
  - Parse Call 3 code: 5 new fields added to airtable_record; field name fixes (affected_users_est, brief.signal_summary, brief.full_brief_text)
- W3 v2.1 full run confirmed working: anomaly_type=Bug, confidence_score=93, confidence_band=High, low_confidence_flag=false
- workflow-3-ai-analysis-chain.json rebuilt with correct architecture: system prompts stored in Code nodes (Prepare Call 1/2/3), referenced via JSON.stringify in HTTP Request bodies — eliminates all JSON escaping issues on future imports
- W2 paused: 887/1000 executions used (~113 remaining, sufficient for demo)

**Issues resolved:**
- Call 1 JSON body failing: switched to Raw body with JSON.stringify expression
- Call 2/3 same fix applied
- Parse Call 3 truncated paste: caused SyntaxError — pasted full corrected code
- estimated_affected_users INVALID_VALUE_FOR_COLUMN: field removed from W3 write. Seed data covers demo value (285,000). Not blocking.
- Confidence score 93% vs target 84%: acceptable variance, High band correct. For recording: edit cell to 84 before hitting record, or use pre-seeded BRF-001.

**Decisions this session:**
- W3 JSON file architecture: system prompts in Code nodes, not embedded in HTTP Request JSON bodies
- estimated_affected_users: skipped in W3 write for now, revisit post-recording if needed
- W2 stays paused until demo recording to conserve executions

**Next:**
1. Lovable Prompt A — 6 targeted changes (lovable-followup-v2.md)
2. Lovable Prompt B — Version B warm-dark colors (after A confirmed)
3. Full loop test: reset-demo → trigger W3 → brief in Lovable → click decision → W4 fires
4. Demo rehearsal + recording

---

## 2026-03-01 — Session 9: Lovable Scenario B Debugging + Fixes

**Completed:**
- Reviewed IMG_0022 (Credit Card) and IMG_0023 (RRSP) — Scenario A clean; Scenario B partially working
- Reviewed IMG_0024 (Credit Card with decision buttons) — identified 5 issues
- Confirmed BRF-002 Airtable data: `estimated_affected_users=85000` (positive), `human_decision=Expected Behavior`, `status=acknowledged`, `decision_timestamp=2026-01-13T12:30:00Z`
- Identified source of "-85,000" red display: Lovable display bug (value is positive in Airtable)
- Identified RRSP bullet points in Credit Card view: Lovable pulling wrong data / fallback content
- Identified decision buttons appearing for BRF-002: Lovable not reading `human_decision` field on load
- Updated Prompt B in lovable-followup-v2.md: removed Raw Signal View toggle styling, added deployment switcher dark-mode styling
- Created scripts/patch-brf002-signals.js (corrects signal_summary for BRF-002 — not yet run, BRF-002 signal_summary already correct)
- Created scripts/list-briefs.js + scripts/inspect-brf002.js (diagnostic scripts)

**Lovable prompts ready to paste (in order):**
1. Deployment card fix (Credit Card info not switching) — already written
2. Fix bundle: client count display + RRSP content bleed + Acknowledge button + decision buttons for decided briefs

**Issues resolved (Airtable data):**
- BRF-002 signal_summary: already contains correct Credit Card content (support_contacts +633%, social_trust declining)
- BRF-002 estimated_affected_users: 85000 (correct, positive)
- No Airtable data changes needed — issues are all Lovable display bugs

**Next:**
1. Send deployment card fix prompt to Lovable → confirm Credit Card card updates
2. Send fix bundle prompt → confirm client count, content, button style, decided-brief state
3. Paste Prompt B (warm-dark colors)
4. Full loop test: reset-demo → trigger W3 → brief loads → click decision → W4 fires
5. Demo rehearsal + recording (deadline March 2, 2026)

---

## 2026-03-01 — Session 10: IMG_0026/0027 Final Pass + Client Count Redesign

**Confirmed working (from IMG_0026 — RRSP and IMG_0027 — Credit Card):**
- Deployment card updating correctly for Credit Card (shows "Credit Card Feature / V23.9") ✓
- Decision buttons replaced with "Expected Behavior recorded at Jan 12, 2026 12:30 PM" for BRF-002 ✓
- Credit Card brief content no longer showing RRSP bullet points ✓
- Both scenarios: 5 signal cards, correct confidence % and badge pairs ✓
- RRSP: 84%, Bug · High Confidence; Credit Card: 52%, Intentional Restriction · Low Confidence ✓

**Remaining issue:**
- Client count still displaying as "-85,000" with red "POTENTIAL CLIENT IMPACT ALERT" label — affects both scenarios

**Design decision — client count:**
- Changed from plain grey text to a metric block: 3px muted brick left border, ~285,000 / ~85,000 in 24px Dune, "clients may be affected" label in secondary grey
- Fallback values hardcoded per deployment_id (DEP-001: 285,000 / DEP-002: 85,000) since W3 does not write estimated_affected_users
- Prompt written, not yet sent to Lovable

**Next:**
1. Send client count metric block prompt to Lovable
2. Confirm display in both scenarios (no minus sign, correct value, brick border)
3. Paste Prompt B (warm-dark colors)
4. Full loop test: reset-demo → trigger W3 → brief loads → click decision → W4 fires
5. Demo rehearsal + recording (deadline March 2, 2026)

---

## 2026-03-01 — Session 11: All Lovable Fixes Confirmed

**Completed:**
- All remaining Lovable display fixes confirmed by user:
  - Client count: metric block with brick left border, correct values (~285,000 RRSP / ~85,000 Credit Card), no minus sign, no red alert
  - Acknowledge button: outlined style confirmed
- Dashboard is now functionally complete for both scenarios

**Next:**
1. Paste Prompt B (warm-dark colors) → confirm styling
2. Full loop test: reset-demo → trigger W3 → brief loads → click decision → W4 fires
3. Demo rehearsal + recording (deadline March 2, 2026)

---

## 2026-03-01 — Session 12: W4 Fixed + Decision Loop Confirmed

**Completed:**
- W4 Extract Decision node: fixed `$input.item.json` → `$input.first().json`
- W4 Map Decision to Status node: fixed `$('Extract Decision').item.json` → `$('Extract Decision').first().json`
- Root cause of W4 crash: workflow changes not published in n8n (user oversight — fixed)
- deployment_id undefined: resolved by hardcoding `deploy-v24.4-20260224` in Lovable button POST body
- Full decision loop confirmed end-to-end: button click → W4 webhook → Airtable deployment status updated → Lovable badge updated
- Cosmetic changes ongoing in Lovable (user-driven)

**Issues resolved:**
- W4 "Deployment record not found: undefined" — caused by unpublished n8n changes + `.item` syntax
- Lovable not sending deployment_id in POST body — hardcoded for demo

**Decisions this session:**
- deployment_id hardcoded in Lovable (only one deployment in demo — acceptable)
- decisions table write not needed for demo — deployment status change is the visible outcome

**Next:**
1. Demo rehearsal + recording (deadline March 2, 2026)

---

## 2026-03-01 — Session 13: React Fallback Dashboard Built

**Completed:**
- Emergency fallback React dashboard built in `react-dashboard/` (checklist row: "Build React dashboard in Claude Code")
- Vite + React 18 app. Build confirmed: `vite build` succeeds clean, 40 modules, no errors.
- All data hardcoded — no Airtable dependency. Both scenarios fully seeded.
- W4 webhook optional: set `VITE_W4_WEBHOOK=<url>` in `.env` to POST real decisions; falls back to mock success.

**What's implemented:**
- Header with Fathom Trace wordmark + scenario switcher tabs (RRSP v24.4 / Credit Card v23.9) + last updated + refresh
- DeploymentCard: Needs review badge, Wealthsimple serif, product name, version, release datetime, previous version tag
- SystemConfidence: SVG donut chart (84%/52%), confidence label, [Anomaly Type] · [Band] badge pair
- WarningSigns: 5 signal mini-cards — SVG sparklines (line up/down/flat, bar chart), star ratings, Social Trust card with expandable post snippets
- ImpactBrief: alert header, client count, show/hide toggle, narrative, 3 collapsible accordions (what triggered / seen before / full summary), decision buttons
- Decision buttons: 3 for RRSP (Acknowledge/Escalate/Roll back), 4 for Credit Card (+ Mark as Expected Behavior)
- Low Confidence Flag banner: conditional, shown only for Credit Card scenario (Intentional Restriction)
- Confirmation modal with optional notes field
- Toast notification on decision save
- PastIncidents: 7-card grid including INC-007 with teal left border and "Expected Behavior" outcome
- Scenario switch resets decision state for that brief

**Run command (via Claude Code Bash tool):**
```
cd "Wealthsimple Task/react-dashboard" && npm run dev
```
Then open: http://localhost:5173

**File location:** `Wealthsimple Task/react-dashboard/`

---

## File Index

| File | Purpose |
|---|---|
| PRD.md | Full project brief — source of truth for what to build |
| build-log.md | THIS FILE — running build state log |
| demo/checklist.md | Itemised build checklist with completion status |
| demo/script.md | Narrated demo script with timecodes |
| architecture/system-flow.md | System diagram, n8n workflow structure, dashboard wireframe |
| architecture/data-schema.md | All 5 Airtable table schemas + seed data |
| architecture/account-setup.md | Account setup instructions |
| prompts/call-1-anomaly-classification.md | Claude API Call 1 system prompt + expected output |
| prompts/call-2-pattern-matching.md | Claude API Call 2 system prompt + expected output |
| prompts/call-3-impact-brief.md | Claude API Call 3 system prompt + expected output |
| scripts/setup-airtable.js | Creates all 5 tables + seeds demo data (run once) |
| scripts/reset-demo.js | Clears demo state for clean test runs (run before recording) |
| n8n/workflow-1-deployment-trigger.json | n8n W1 — importable JSON |
| n8n/workflow-2-signal-monitor.json | n8n W2 — importable JSON |
| n8n/workflow-3-ai-analysis-chain.json | n8n W3 — importable JSON (core) |
| n8n/workflow-4-decision-logger.json | n8n W4 — importable JSON |
| n8n/README.md | n8n import + configuration guide (updated for free trial) |

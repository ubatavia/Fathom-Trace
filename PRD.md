# PRD: Fathom Trace
## Wealthsimple AI Builder Application — Submission Build

**Author:** Usama Batavia, Sr. Product Manager
**Version:** 2.1 — Reconciled Against Actual Lovable Build
**Status:** Build in Progress — Lovable v1 Complete, Targeted Updates Required
**Deadline:** March 2, 2026

**How to read this document:**
- **Lovable:** Read Section 9 only. All UI changes are listed as exact instructions against what's already built. Do not rebuild — update.
- **Claude Code:** Read Sections 7 and 8. Backend specs are unchanged. Pay attention to new `anomaly_type` and `social_trust` field requirements.
- **n8n:** Section 8 only. Three workflows, fully specified.
- **Airtable:** Section 7. Schema and seed data fully specified.

---

## 1. What's Already Built — Lovable v1 Audit

Based on the current build, Lovable has produced the following. **Do not change these — they work and look good.**

### ✅ Keep As-Is

**Main Dashboard:**
- Fathom Trace wordmark top-left with timestamp + refresh
- Deployment card with red border, "Needs review" badge, Wealthsimple logo, product area name, version, release datetime
- System Confidence donut chart (showing 89%, "This is a real issue") — top right
- Warning Signs section with 4 signal cards: Errors, Support calls, App reviews, Journey completions
- Each signal card has sparkline chart, percentage delta, directional label ("from normal")
- Red/amber/grey color coding on signal cards

**Impact Brief:**
- "POTENTIAL CLIENT IMPACT ALERT" header with affected user count (285,000)
- Full AI-generated narrative paragraph (INC cross-reference, four signals correlated, root cause hypothesis, confidence statement)
- Collapsible sections: "What triggered this", "We've seen this before", "View full summary"
- "Your Decision" section header

**Decision + History:**
- Three decision buttons: Acknowledge (black), Escalate (amber), Roll back (red) — correct layout
- Past Incidents grid: 6 cards, date + title + affected segment + time to resolution
- MEDIUM badge on all past incidents

---

## 2. What Needs to Change — Targeted Update List

Six specific changes. Ordered by priority for the demo. Each one is a targeted update, not a rebuild.

**Priority 1 — Anomaly Type Badge (new element, high demo value)**
**Priority 2 — Mark as Expected Behavior button (required for Scenario B)**
**Priority 3 — Low Confidence Flag banner (required for Scenario B)**
**Priority 4 — Past Incidents: Scenario B card (credit card, Intentional Restriction)**
**Priority 5 — Social Trust signal card (fifth signal in Warning Signs)**
**Priority 6 — Raw Signal View toggle (demo contrast moment)**

Details for each in Section 9.

---

## 3. The Problem Being Solved

Wealthsimple ships weekly across a product surface touching 3 million clients, multiple account types, registered financial products with regulatory obligations, and a growing number of complex financial instruments. Every deployment changes something for real people.

The signal that tells you whether a deployment harmed clients — elevated error rates, unexpected support contacts, anomalous transaction patterns, user drop-off — is scattered across monitoring tools, support queues, app store reviews, and internal analytics. By the time a pattern is visible enough to act on, the damage is already done at scale.

**The specific gap:** The people closest to the deployment don't have visibility into client impact. The people who see client impact don't have context on what changed. These two groups are disconnected, and the connection only gets made manually, slowly, and after the fact.

---

## 4. The System — What It Does

### Name: Fathom Trace

**One-liner:** Every deployment leaves a mark on 3 million clients. Fathom Trace finds it — connecting code changes to real human consequences in minutes, not days, before the damage compounds beyond recovery.

### AI Responsibilities
1. Deployment context ingestion
2. Post-release signal monitoring (5 signal types — see Section 7)
3. Cross-system correlation (core cognitive work)
4. Baseline deviation detection
5. Impact brief generation with anomaly type classification

### Human Role
Decision-maker at previously impossible scale. Reviews diagnosis, validates intent vs. anomaly, makes rollback/escalate/accept/expected-behavior call.

### The One Decision That Stays Human
**Rollback or escalation.** Two reasons:
- Regulatory: rollback on registered accounts (RRSP, TFSA, FHSA) may trigger CIRO reporting and affects in-flight transactions
- Contextual: Fathom Trace knows what's anomalous. The human knows what's intentional. A phased rollout looks identical to an access failure in the signal data. Only a human with product context can distinguish them.

### Anomaly Type Classification
Every flagged anomaly is classified into one of five types. Type and confidence score are always shown as a pair.

| Type | Meaning | Expected Confidence |
|---|---|---|
| Bug | Unintended system failure, historical match likely | High (80–95%) |
| Degradation | Gradual performance decline, subtle pattern | Medium (60–79%) |
| Intentional Restriction | Access limitations that may be by design — phased rollout, invite-only, eligibility gate | Low (<60%) |
| New Baseline | No historical precedent, cannot classify | Low (<60%) |
| Unknown | Signals elevated but unclassifiable | Variable |

**Why type matters:** A Bug at 84% and an Intentional Restriction at 52% require completely different human responses. Confidence = how certain. Type = what to be certain about.

---

## 5. The Two Dashboard Scenarios

The dashboard shows Fathom Trace as an ongoing operational system with history — not a one-trick demo.

### Scenario A — Primary Demo (Active Incident)
- **Deployment:** v24.4, RRSP and TFSA Accounts
- **Anomaly Type:** Bug
- **Confidence:** 84% High *(note: Lovable currently shows 89% — update to 84% to match PRD)*
- **Affected Users:** 285,000
- **Status:** Escalated → Hotfix Initiated
- **Demo walkthrough:** This is the incident shown live

### Scenario B — False Positive (Resolved, Visible in History)
- **Deployment:** v23.9, Credit Card Feature
- **Anomaly Type:** Intentional Restriction
- **Confidence:** 52% Low
- **Affected Users:** 85,000
- **Status:** Expected Behavior — Phased Rollout by Design
- **Demo role:** Visible in Past Incidents panel as a resolved row with Intentional Restriction badge. Panel members who know the WS credit card launch will recognize this immediately. Mentioned in narration at the 2:15 mark.

---

## 6. Confidence Score — Definition

**[CLAUDE CODE]** Implement this as the scoring logic, not an estimate.

**Signal Strength — 40%**
Number of independent signals elevated + magnitude of deviation. Social Trust Score contributes at half weight of internal signals.

**Segment Specificity — 30%**
How precisely is the anomaly localized? Broad spike = low. Specific version + account combo + flow step = high.

**Historical Match Quality — 30%**
How closely does the pattern match a past incident? Signal type match only = low. Signal + segment + flow + resolution pattern = high.

**Thresholds:**

| Score | Band | UI Treatment |
|---|---|---|
| <60% | Low | Amber banner. Brief generated but flagged. |
| 60–79% | Medium | Brief generated, labeled medium. |
| 80–94% | High | Brief surfaced immediately. Decision SLA starts. |
| 95%+ | Critical | Escalation ping. Immediate human required. |

---

## 7. Airtable Schema — Complete Specification

**[AIRTABLE]** All tables and seed data. Build exactly as specified.

### Table 1: `deployments`

| Field | Type | Notes |
|---|---|---|
| deployment_id | Text | DEP-001, DEP-002 |
| release_version | Text | e.g. v24.4 |
| release_datetime | DateTime | ISO format — used for social trust window anchoring |
| product_area | Text | e.g. RRSP and TFSA Accounts |
| changed_services | Long Text | Comma-separated |
| affected_account_types | Long Text | e.g. RRSP, TFSA |
| affected_user_segment | Text | e.g. dual-account holders |
| pr_references | Long Text | e.g. PR #4821 |
| deploying_team | Text | e.g. Registered Products |
| monitoring_status | Single Select | Monitoring / Anomaly Detected / Brief Generated / Escalated / Resolved / Expected Behavior |

**Seed records:**

**DEP-001:** v24.4, Feb 24 2026 02:14 AM, product_area: RRSP and TFSA Accounts, changed_services: contribution-validation-service, affected_account_types: RRSP + TFSA, affected_user_segment: dual-account holders v24.4, pr_references: PR #4821, deploying_team: Registered Products, monitoring_status: Escalated

**DEP-002:** v23.9, Jan 13 2026 10:00 AM, product_area: Credit Card Feature, changed_services: credit-card-eligibility-service, affected_account_types: Credit Card, affected_user_segment: waitlist-eligible clients, pr_references: PR #4102, deploying_team: Credit Products, monitoring_status: Expected Behavior

---

### Table 2: `signal_feeds`

| Field | Type | Notes |
|---|---|---|
| feed_id | Text | SIG-001 etc. |
| deployment_id | Text | Links to deployments |
| signal_type | Single Select | support_contacts / error_rate / completion_rate / app_review / social_trust |
| timestamp | DateTime | |
| value | Number | Current value. social_trust: 1=Stable, 2=Declining, 3=Falling Fast |
| baseline_value | Number | Expected normal |
| delta_pct | Number | % deviation. Negative = drop |
| account_type_filter | Text | e.g. RRSP+TFSA. Blank = all |
| version_filter | Text | e.g. v24.4. Blank = all |
| source | Single Select | internal / external |
| social_post_snippets | Long Text | JSON array of 3–5 post texts. Only for social_trust records |
| post_authenticity_weight | Number | 0.0–1.0. Only for social_trust records |

**Seed records — DEP-001 (Scenario A, RRSP Bug):**

SIG-001: support_contacts, Feb 24 09:14, value=17, baseline=4, delta=+325%, RRSP+TFSA, v24.4, internal
SIG-002: error_rate, Feb 24 09:14, value=2.1, baseline=1.0, delta=+110%, RRSP+TFSA, v24.4, internal
SIG-003: completion_rate, Feb 24 09:14, value=0.72, baseline=1.0, delta=-28%, RRSP+TFSA, v24.4, internal
SIG-004: app_review, Feb 24 10:00, value=2, baseline=4.2, delta=-52%, all, all, internal *(3 negative reviews)*
SIG-005: social_trust, Feb 24 10:30, value=2 (Declining), baseline=1, delta=+1, external, post_authenticity_weight: 0.78, social_post_snippets: ["Anyone else getting an error trying to contribute to their RRSP this morning? App keeps failing at the last step.", "Wealthsimple app won't let me contribute to my RRSP — says contribution limit exceeded but I have room. Anyone?", "Getting a weird validation error on RRSP contribution. Has anyone else seen this today?"]

**Seed records — DEP-002 (Scenario B, Credit Card):**

SIG-010: support_contacts, Jan 13 10:00, value=22, baseline=3, delta=+633%, Credit Card, v23.9, internal
SIG-011: social_trust, Jan 13 11:15, value=2 (Declining), baseline=1, delta=+1, external, post_authenticity_weight: 0.61, social_post_snippets: ["Applied for the Wealthsimple credit card but got rejected — anyone else?", "Can't seem to get access to the new credit card feature", "Tried applying for WS credit card, says I'm not eligible but I meet all criteria"]

---

### Table 3: `past_incidents`

| Field | Type | Notes |
|---|---|---|
| incident_id | Text | INC-001 etc. |
| date | Date | |
| product_area | Text | Display format: "Category — Subcategory" e.g. "Registered Accounts — RRSP Contribution" |
| affected_segment | Text | Short description |
| signal_pattern | Long Text | JSON |
| root_cause | Long Text | |
| resolution | Long Text | |
| resolution_time_hours | Number | |
| pr_reference | Text | |
| anomaly_type | Single Select | Bug / Degradation / Intentional Restriction / New Baseline / Unknown |
| confidence_at_detection | Number | Score at time of detection |
| outcome | Single Select | Bug Confirmed / Expected Behavior / Ongoing / No Action |

**Seed records — 8 incidents:**

**INC-001:** Mar 2024, "Registered Accounts — RRSP Contribution", Clients with RRSP + TFSA, root_cause: sequential contribution limit validation, resolution: single-call validation hotfix PR #3847, resolution_time: 6h, anomaly_type: Bug, confidence: 84, outcome: Bug Confirmed *(historical match for Scenario A)*

**INC-002:** Jun 2024, "Crypto — Withdrawal Flow", High-volume crypto account holders (>$50K balance), root_cause: timeout threshold too low for large batches, resolution: timeout config update, resolution_time: 4h, anomaly_type: Bug, confidence: 78, outcome: Bug Confirmed

**INC-003:** Sep 2024, "Registered Accounts — TFSA", Clients who opened FHSA in 2024 and held existing TFSA, root_cause: contribution room calculation not accounting for FHSA room, resolution: calculation logic patch, resolution_time: 3h, anomaly_type: Bug, confidence: 71, outcome: Bug Confirmed

**INC-004:** Nov 2024, "Investing — Margin Accounts", Margin account holders post Bank of Canada rate change, root_cause: display rounding error on float precision, resolution: display layer fix, resolution_time: 5h, anomaly_type: Bug, confidence: 66, outcome: Bug Confirmed

**INC-005:** Jan 2025, "Tax — Spousal RRSP", Clients with spousal RRSP accounts — tax slip generation, root_cause: spousal RRSP excluded from slip generation batch, resolution: batch inclusion fix, resolution_time: 8h, anomaly_type: Bug, confidence: 74, outcome: Bug Confirmed

**INC-006:** Apr 2025, "Banking — Chequing Interac Transfers", All chequing account holders during peak transfer period, root_cause: downstream Interac API rate limit under load, resolution: retry logic + rate limit buffer, resolution_time: 2h, anomaly_type: Degradation, confidence: 68, outcome: Bug Confirmed

**INC-007:** Jan 2026, "Credit Card — Access Flow", Waitlist-eligible clients — invite-only launch, root_cause: N/A — phased rollout by design, resolution: human confirmed expected behavior, resolution_time: 1h, anomaly_type: Intentional Restriction, confidence: 52, outcome: Expected Behavior *(Scenario B)*

**INC-008:** Feb 2026, "Registered Accounts — RRSP Contribution", Clients with RRSP + TFSA dual accounts, root_cause: sequential validation in PR #4821, resolution: hotfix in progress, resolution_time: ongoing, anomaly_type: Bug, confidence: 84, outcome: Bug Confirmed *(Scenario A — current incident)*

---

### Table 4: `impact_briefs`

| Field | Type | Notes |
|---|---|---|
| brief_id | Text | |
| deployment_id | Text | Links to deployments |
| generated_at | DateTime | |
| anomaly_type | Single Select | Bug / Degradation / Intentional Restriction / New Baseline / Unknown |
| confidence_score | Number | 0–100 |
| confidence_band | Single Select | Low / Medium / High / Critical |
| affected_flow | Text | |
| affected_segment | Text | |
| affected_users_est | Number | |
| signal_summary | Long Text | JSON array |
| pattern_match_id | Text | Links to past_incidents |
| pattern_match_summary | Long Text | Human-readable summary for "We've seen this before" section |
| pr_to_review | Text | |
| recommended_action | Text | |
| human_decision | Single Select | Pending / Acknowledged / Escalated / Rollback Initiated / Expected Behavior |
| decision_timestamp | DateTime | |
| low_confidence_flag | Checkbox | True when confidence <60 OR anomaly_type is Intentional Restriction or New Baseline |

**Seed records:**

**BRF-001:** DEP-001, anomaly_type: Bug, confidence: 84, band: High, affected_flow: RRSP Contribution Step 3 (Validation), affected_segment: RRSP+TFSA dual-account holders on v24.4, affected_users_est: 285000, pattern_match_id: INC-001, pattern_match_summary: "INC-2024-003 is a near-structural twin of this anomaly across all four signal dimensions: same product area, same affected segment, same primary failure signal, same error rate range, same rapid support escalation pattern. Root cause in INC-2024-003 was a validation logic error that incorrectly coupled RRSP and TFSA account handling.", pr_to_review: PR #4821, recommended_action: Engineering review of contribution validation logic in latest release, human_decision: Escalated, low_confidence_flag: false

**BRF-002:** DEP-002, anomaly_type: Intentional Restriction, confidence: 52, band: Low, affected_flow: Credit Card Application Flow, affected_segment: waitlist-eligible clients, affected_users_est: 85000, pattern_match_id: null, pattern_match_summary: "No strong historical match found. Signal pattern is consistent with a phased or invite-only product launch — access restriction by design rather than a system failure. Confidence is low. Human review required to confirm intended behavior.", pr_to_review: PR #4102, recommended_action: Verify with Credit Products team whether access restriction reflects phased rollout design. Confirm intended behavior before any action., human_decision: Expected Behavior, low_confidence_flag: true

---

## 8. n8n Workflow Specification

**[N8N]** Three workflows. Deploy to n8n cloud before recording.

### Workflow 1 — Deployment Trigger
Trigger: New record created in `deployments` Airtable table
Steps:
1. Read deployment record
2. Set monitoring_status = "Monitoring"
3. Initiate Workflow 2

### Workflow 2 — Signal Polling
Trigger: Scheduled every 5 minutes OR called by Workflow 1
Steps:
1. Pull signal_feeds records for active deployment_ids
2. Calculate delta_pct against baseline_value per record
3. Apply social trust authenticity weighting to social_trust type records
4. If any threshold exceeded (support_contacts >150%, error_rate >80%, completion_rate <-20%, social_trust reaches value 2 or 3): trigger Workflow 3
5. Update monitoring_status = "Anomaly Detected"

### Workflow 3 — AI Analysis Chain
Trigger: Called by Workflow 2

**Call 1 — Anomaly Classification**
System prompt: *"You are a client impact analyst at a fintech company. You receive post-deployment signal data showing deviations from baseline. Classify the anomaly across four dimensions: (1) affected_flow, (2) affected_segment, (3) signal_severity — one of: low, medium, high, critical, (4) anomaly_type — one of: Bug, Degradation, Intentional Restriction, New Baseline, Unknown. Use 'Intentional Restriction' when signals suggest access limitations that may be by design — phased rollouts, invite-only launches, eligibility gates. Use 'New Baseline' when the product area has no historical precedent. Use 'Unknown' when classification is not possible. Also return: warrants_pattern_matching (boolean). Return valid JSON only."*
Output fields: affected_flow, affected_segment, signal_severity, anomaly_type, warrants_pattern_matching

**Call 2 — Historical Pattern Matching**
System prompt: *"You are a pattern-matching system with access to a database of past incidents. Given an anomaly classification, identify the closest historical match. Calculate match_confidence (0–100) using signal type overlap (40%), affected segment overlap (30%), affected flow overlap (30%). Return: match_id, match_confidence, matching_signals (array), probable_root_cause, historical_resolution, anomaly_type_confirmed. If anomaly_type is Intentional Restriction or New Baseline and no strong match exists, confirm that type and set match_confidence below 60. Return valid JSON only."*
Output fields: match_id, match_confidence, matching_signals, probable_root_cause, historical_resolution, anomaly_type_confirmed

**Call 3 — Impact Brief Generation**
System prompt: *"You are generating an impact brief for an engineering and product team at a fintech company. Be specific, actionable, and concise. Do not speculate beyond the evidence. State confidence level and anomaly type explicitly. The human makes the final rollback/escalate/accept decision — make that decision as informed as possible. Return structured JSON with: confidence_score (int 0–100), confidence_band (Low/Medium/High/Critical), anomaly_type, affected_flow, affected_segment, affected_users_est (int), signal_summary (array: {signal_type, direction, magnitude, note}), pattern_match_summary (string), pr_to_review (string or null), recommended_action (string), low_confidence_flag (boolean — true if confidence <60 or anomaly_type is Intentional Restriction or New Baseline)."*
Output: full brief record → write to impact_briefs Airtable table

Post-chain: Update deployments monitoring_status = "Brief Generated"

---

## 9. Lovable — Targeted Update Instructions

**[LOVABLE]** Six changes only. Everything else already built stays as-is.

---

### Change 1 — Anomaly Type + Confidence Badge Pair
**Location:** The System Confidence card (top right of main dashboard, currently shows donut + "This is a real issue")
**What to add:** Below the confidence percentage and label, add a badge pair: `[Anomaly Type] · [Confidence% Band]`

Visual spec:
- Both badges same height, displayed inline, separated by a faint dot divider
- Anomaly Type badge colors:
  - Bug → red tint background (#FEE2E2), dark red text (#991B1B)
  - Degradation → amber tint (#FEF3C7), dark amber text (#92400E)
  - Intentional Restriction → teal tint (#CCFBF1), dark teal text (#0F766E)
  - New Baseline → purple tint (#EDE9FE), dark purple text (#5B21B6)
  - Unknown → grey (#F3F4F6), dark grey text (#374151)
- Confidence band badge colors:
  - Low → grey background, grey text
  - Medium → amber tint, amber text
  - High → red tint, dark red text
  - Critical → deep red background, white text

For Scenario A: shows `[Bug] · [84% High]`
For Scenario B: shows `[Intentional Restriction] · [52% Low]`

---

### Change 2 — Low Confidence Flag Banner
**Location:** Inside the Impact Brief content area, between the narrative text and the "What triggered this" accordion. Only renders when `low_confidence_flag = true`.

Visual spec:
- Amber/yellow background (#FFFBEB), amber border (#F59E0B), 8px border radius
- ⚠️ icon left-aligned, text to the right
- Bold heading: "Low Confidence Flag"
- Body text varies by anomaly_type:
  - Intentional Restriction: *"This pattern may reflect intentional design — phased rollout, invite-only access, or eligibility gate — rather than a system failure. Human review required to confirm intended behavior before any action."*
  - New Baseline: *"No historical baseline exists for this product area. Fathom Trace cannot classify confidently. Human must confirm expected behavior to seed the baseline."*
  - Low confidence generic: *"Signal pattern is insufficient for a high-confidence diagnosis. Human review recommended before action."*

Hidden entirely for Scenario A (Bug, 84% — no flag needed).
Visible for Scenario B (Intentional Restriction, 52%).

---

### Change 3 — Mark as Expected Behavior Button
**Location:** "Your Decision" section, alongside the existing Acknowledge / Escalate / Roll back buttons.
**Condition:** Only renders when `anomaly_type = "Intentional Restriction"` or `anomaly_type = "New Baseline"`.

Visual spec:
- Teal background (#00C2B2 or similar), white text, same size/shape as the other decision buttons
- Label: "Mark as Expected Behavior"
- On click: writes `human_decision = "Expected Behavior"` + `decision_timestamp` to Airtable impact_briefs record
- After click: buttons replaced by confirmation row showing decision label + timestamp (same pattern as other decisions)

Add a one-line label above all decision buttons (if not already present):
*"Fathom Trace does not act automatically — your decision is required."*

For Scenario A (Bug): three buttons — Acknowledge, Escalate, Roll back
For Scenario B (Intentional Restriction): four buttons — Acknowledge, Escalate, Roll back, Mark as Expected Behavior

---

### Change 4 — Past Incidents: Add Scenario B Card + Anomaly Type Badge
**Location:** Past Incidents grid (currently shows 6 MEDIUM-badged cards)

**4a — Replace MEDIUM badge with Anomaly Type badge**
The existing MEDIUM badge on all incident cards should be replaced with (or show alongside) an anomaly_type badge using the same color system as Change 1.
- Bug → red tint
- Degradation → amber tint
- Intentional Restriction → teal tint
*(MEDIUM was severity — anomaly_type is more meaningful for the panel. If you want to keep severity, show anomaly_type badge first, then severity as smaller secondary text.)*

**4b — Add INC-007 card (Scenario B — Credit Card)**
Add a 7th card to the Past Incidents grid:

```
Jan 2026                         [Intentional Restriction]
Credit Card — Access Flow
Waitlist-eligible clients — invite-only launch

Outcome: Expected Behavior ✓          ⏱ 1h review
```

This card should be visually distinct from Bug-type cards:
- Teal left border or teal badge (vs. red for Bug)
- Outcome badge: teal "Expected Behavior" (vs. red "Bug Confirmed")
- Small note below the title or in a tooltip: *"Phased rollout by design — no system failure"*

This card is the most important addition for the submission panel. Anyone familiar with the WS credit card launch will stop on it.

---

### Change 5 — Social Trust Signal Card
**Location:** Warning Signs section, add as a fifth signal card after the existing four.

Visual spec (match existing card style):
- Card background: light purple/lavender tint (differentiates it as an external signal)
- Icon: speech bubble or social/network icon
- Label: "Social Trust"
- Primary value: directional indicator — "Declining ↘" or "Stable ↔" or "Falling Fast ↓↓"
- Secondary line: "External — Reddit, Twitter, App Store"
- Small authenticity note: "Avg authenticity: 78%" (from post_authenticity_weight)

Below the main card, when expanded or on click, show the 3 post quote snippets:
- Each as a small quote block with post text (truncated to 1 line), source badge, authenticity label (High/Medium/Low)
- Posts inside the 48hr release window: normal opacity
- Posts outside: greyed out with label "Outside release window"

For Scenario A: Social Trust = Declining ↘, 3 Reddit posts about RRSP errors
For Scenario B: Social Trust = Declining ↘, 3 posts about credit card access

---

### Change 6 — Raw Signal View Toggle
**Location:** Warning Signs section header row, right-aligned toggle.

Visual spec:
- Pill-style toggle: "Fathom Trace View" | "Raw Signal View"
- Active state: dark navy fill (#1B2B4B), white text
- Inactive: transparent, grey text
- Default: Fathom Trace View

When "Raw Signal View" is active:
- Remove baseline reference lines from all sparkline charts
- Remove delta percentage badges (Up 110%, Down 28% etc.)
- Remove color coding — all cards revert to neutral grey background
- Social Trust card shows a plain number line, no directional indicator, no post snippets
- Section header changes from "Warning Signs" to "Signal Feeds — Uninterpreted"

When switching back to Fathom Trace View: restore all interpretation layers.

This is the demo contrast moment at the 0:50 mark. 15 seconds on Raw view, then toggle back.

---

## 10. Confidence Score — Correction
**[LOVABLE + CLAUDE CODE]** The current build shows 89% confidence. The PRD specifies 84% for Scenario A. Update the seed data and any hardcoded values to 84%.

The "This is a real issue" label at 89% is good language — keep it but trigger it at 80%+ confidence band ("High"). Update to: show "This is a real issue" for High/Critical band, "Needs further review" for Medium, "Low confidence — verify intent" for Low.

---

## 11. Demo Scenario — Dashboard State at Recording Time

At the moment recording starts, the dashboard should show:

- **DEP-001 selected** (v24.4 RRSP and TFSA Accounts) — active, status: Escalated
- **Impact Brief loaded** for BRF-001 — Bug, 84% High, 285K users, PR #4821 visible
- **Decision already made:** Escalate button in confirmed state (logged, timestamp visible) — OR keep it in pending state if you want to show the click live
- **Warning Signs:** all 5 signal cards visible including Social Trust = Declining
- **Past Incidents grid:** all 7 cards visible, INC-007 (credit card, Intentional Restriction, Expected Behavior) visible at a glance
- **Fathom Trace View** active (not Raw) at start — toggle to Raw mid-demo at 0:50 mark

---

## 12. Demo Narration Script

Written to be spoken. Short sentences. Deliberate pauses.

---

**[0:00–0:20] The Problem**

*"Wealthsimple ships every week. Something in every release touches a real person's money. And right now, the only way to know whether it harmed them — is to wait until enough of them complain."*

*(pause)*

*"Fathom Trace fixes that."*

---

**[0:20–0:50] The Deployment**

*(Screen: Main dashboard — DEP-001 card, "Needs review", v24.4, RRSP and TFSA Accounts)*

*"It's Monday morning. Version 24.4 just shipped — a change to how RRSP contribution room is validated when a client holds multiple registered accounts. Fathom Trace ingests the deployment and starts watching."*

---

**[0:50–1:10] The Before State**

*(Screen: Toggle to Raw Signal View)*

*"This is what the data looks like without Fathom Trace. Four feeds. No baseline. No connection. Nobody watching all of them at once."*

*(Toggle back to Fathom Trace View)*

*"Here's what Fathom Trace sees."*

---

**[1:10–1:35] The Signals**

*(Screen: Warning Signs — all 5 signal cards visible)*

*"Errors up 110%. Support contacts up 325% — but only for dual-account holders on v24.4. Journey completions down 28%. And externally: three Reddit posts from r/PersonalFinanceCanada describing the same RRSP error, posted within two hours of the release. Social trust: declining."*

*"No single signal is loud enough on its own. Together, they tell a story."*

---

**[1:35–2:00] The Connection**

*(Screen: Scroll to Impact Brief — narrative text visible, INC reference, 285K users)*

*"Fathom Trace cross-references this against every past incident. It finds a near-structural twin — March 2024. Same product area. Same segment. Same failure signal. Root cause then: contribution limit validation applied sequentially instead of independently."*

*"Anomaly type: Bug. Confidence: 84 percent."*

*(Screen: Badge pair [Bug] · [84% High] visible)*

---

**[2:00–2:20] The Human Makes the Call**

*(Screen: Your Decision section — three buttons)*

*"The brief gives the PM everything needed. Scope, signals, the historical match, the PR to check. Fathom Trace does not make this call."*

*(pause)*

*"A rollback on a registered account affects active transactions. It may trigger CIRO reporting. That requires an accountable human."*

*(Screen: Scroll down — Past Incidents grid, INC-007 credit card card visible)*

*"Six weeks ago, Fathom Trace flagged the credit card launch at 52 percent — Intentional Restriction. Low confidence. A human confirmed phased rollout by design. No action. System learned."*

*(Screen: Scroll back up — click Escalate)*

*"This one is different. PR 4821 is pulled. Hotfix initiated."*

---

**[2:20–3:00] Scale**

*"Without Fathom Trace: support notices six hours later. 40,000 clients have failed to contribute to their RRSP by Wednesday. Some missed a deadline. The fix is identical. The damage is not."*

*(pause)*

*"Fathom Trace doesn't replace the human who makes the call. It makes sure that human has everything they need — in minutes, not days, across every deployment running simultaneously."*

*(Screen: Fathom Trace wordmark)*

*"That's the system."*

---

## 13. Decisions — All Locked

1. **Demo scenario** ✓ — Scenario A (RRSP bug) is the primary walkthrough. Scenario B (credit card) is visible in Past Incidents, mentioned in narration.
2. **n8n hosting** ✓ — Cloud. Not local.
3. **UI approach** ✓ — Lovable. Targeted updates only, no rebuild.
4. **API calls** ✓ — Pre-triggered. Brief generated before recording starts.
5. **Brief format** ✓ — Anomaly type + confidence score always shown as a pair.
6. **Confidence score** ✓ — 84% for Scenario A. Update any hardcoded 89% to 84%.

---

## 14. Contingency Plan

Dry-run with recording software 24 hours before submission.

- **n8n doesn't trigger:** Pre-run. Start recording with brief already in Airtable.
- **Claude API slow:** Trigger 60s before recording. Fallback: pre-generated BRF-001 already in table.
- **Lovable doesn't render:** Full-screen screenshot fallback. Narrate over it.
- **Airtable empty:** Lock records before recording day. Don't edit on recording day.
- **Recording crashes:** Record in segments, edit together.

---

## 15. The 500-Word Written Explanation

*"I've spent my career at the boundary between financial products and the clients they affect — and the pattern I keep seeing is the same: by the time anyone realizes a change caused harm, the harm is already done at scale. Fathom Trace is built to close that gap."*

**What the human can now do that they couldn't before**

One person can monitor the full client impact of every deployment across every product line, every account type, and every user segment — simultaneously, in real time. Previously this required a team of analysts working across disconnected tools with a lag measured in hours or days. Fathom Trace compresses that lag to minutes and extends one person's observational capacity to a scale that was previously impossible.

**What AI is responsible for**

Fathom Trace ingests every deployment record and monitors the signals that follow it: support contact rates, error rates on affected flows, transaction completion rates, and external social sentiment scored for authenticity and release-window relevance. It establishes what normal looks like for each release type, flags meaningful deviations, searches the historical incident database for matching patterns, classifies the anomaly type, calculates a confidence score, and generates a structured impact brief. It does this across every active deployment simultaneously.

**Where AI must stop**

The rollback, hotfix initiation, or escalation decision. A rollback at Wealthsimple is a regulated financial event affecting active transactions on registered accounts — it requires accountable human judgment. And Fathom Trace knows what's anomalous relative to history. The human knows what's intentional about the present. A phased product launch looks identical to an access failure in the signal data. Only a human with product context can make that distinction. These two perspectives must meet before any action is taken.

**What would break first at scale**

The baseline model. When Wealthsimple enters genuinely new territory, anomaly detection degrades and requires human-seeded baseline data to recalibrate. The system is honest about this — low-confidence flags are labeled explicitly, anomaly type surfaces the system's best classification of why it's uncertain. Over time, as the incident database grows, confidence improves. Fathom Trace gets more accurate as the organization accumulates history.

---

## 16. Key Phrases

- *"Fathom Trace never calls the rollback. It prepares the human who does."*
- *"Fathom Trace knows what's anomalous. The human knows what's intentional. Both are required."*
- *"Fathom Trace compresses a lag measured in hours to a signal measured in minutes — across every deployment, simultaneously."*
- *"The system gets more accurate as the organization accumulates history."*
- *"What breaks first at scale is the baseline model — and Fathom Trace is honest about that."*

---

## Changelog

| Version | Summary |
|---|---|
| v1.0 | Initial build brief |
| v1.1 | Name locked: Fathom Trace |
| v1.2 | Demo narration, confidence score, contingency, before-state visual, personal opening |
| v1.3 | All decisions locked |
| v1.4 | Social Trust Score + Anomaly Type Classification added |
| v2.0 | Full consolidated rewrite. All additions integrated. Complete Airtable schema, n8n workflows, Lovable UI spec. |
| v2.1 | Reconciled against actual Lovable build. Section 9 rewritten as targeted change list only — what exists is preserved, what's new is specified precisely. Confidence corrected to 84%. Scenario B (credit card INC-007) seeded into past_incidents and impact_briefs. Social Trust added as 5th signal card. Raw Signal View toggle added. |

---

*v2.1 — Pass Section 9 to Lovable for targeted updates. Pass Sections 7 and 8 to Claude Code for backend. All decisions locked.*

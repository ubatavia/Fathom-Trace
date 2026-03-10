# Fathom Trace — System Flow & Architecture

## Overview

Fathom Trace connects deployment records to client impact signals through a 3-call AI analysis chain,
surfacing a structured impact brief for a human decision-maker within minutes of anomaly detection.

---

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     TRIGGER LAYER                               │
│                                                                 │
│  Engineer adds deployment record → Airtable [deployments]       │
│         ↓ (n8n watches for new records)                         │
│  n8n Webhook / Scheduled Trigger fires                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SIGNAL MONITORING LAYER                       │
│                                                                 │
│  n8n polls Airtable [signal_feeds] every 2 min                 │
│  ├── Support contact rate (delta vs. baseline)                  │
│  ├── Error rate on affected endpoint (delta vs. baseline)       │
│  ├── Transaction completion rate (delta vs. baseline)           │
│  └── App store review sentiment (new mentions)                  │
│                                                                 │
│  IF any signal exceeds deviation threshold → trigger AI chain   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AI ANALYSIS CHAIN                            │
│                                                                 │
│  CALL 1 — Anomaly Classification                                │
│  Input:  deployment record + signal deviation data              │
│  Output: {affected_flow, segment, severity, warrants_match}     │
│          (JSON only)                                            │
│          ↓                                                      │
│  CALL 2 — Historical Pattern Matching                           │
│  Input:  anomaly JSON + full past_incidents table               │
│  Output: {match_id, confidence, matching_signals,               │
│           probable_root_cause, historical_resolution}           │
│          (JSON only)                                            │
│          ↓                                                      │
│  CALL 3 — Impact Brief Generation                               │
│  Input:  anomaly JSON + pattern match JSON + deployment record  │
│  Output: formatted impact brief (card-ready structured text)    │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATA PERSISTENCE                            │
│                                                                 │
│  n8n writes impact brief → Airtable [impact_briefs]            │
│  Lovable dashboard polls [impact_briefs] → renders brief        │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    HUMAN DECISION LAYER                         │
│                                                                 │
│  PM reviews brief in Lovable dashboard                          │
│  Clicks: [Acknowledge] [Escalate] [Rollback]                    │
│         ↓ (writes to Airtable [decisions])                      │
│  n8n logs decision + outcome → updates deployment status        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Map

| Component | Tool | Role |
|---|---|---|
| Data store | Airtable (free) | 4 tables: deployments, signal_feeds, past_incidents, impact_briefs |
| Orchestration | n8n Cloud (free trial) | Trigger, polling, API calls, write-back |
| AI reasoning | Claude API claude-sonnet-4-6 | 3-call analysis chain |
| Dashboard | Lovable (paid) | React UI with 4 panels |
| Dev environment | Claude Code | Seed scripts, prompt engineering, debug |

---

## Airtable Tables

### 1. `deployments`
New record here = trigger for entire system.

### 2. `signal_feeds`
Time-series signals pre-loaded for demo scenario.
n8n polls this table and calculates deviation from baseline.

### 3. `past_incidents`
The institutional memory. 6 historical incidents seeded.
Fed entirely into Claude Call 2 as context.

### 4. `impact_briefs`
Written by n8n after Call 3 completes.
Read by Lovable dashboard in real time.

### 5. `decisions` (lightweight)
Written by Lovable when human clicks action button.
Triggers n8n logging workflow.

---

## n8n Workflow Structure

### Workflow 1: Deployment Trigger
```
Airtable Trigger (new record in [deployments])
  → Set variables (deployment_id, version, affected_segment)
  → Start signal monitoring
```

### Workflow 2: Signal Monitor (scheduled, every 2 min)
```
Airtable Read ([signal_feeds] for deployment_id)
  → Calculate delta_pct vs. baseline_value for each signal
  → IF any delta exceeds threshold → trigger Workflow 3
```

### Workflow 3: AI Analysis Chain
```
HTTP Request → Claude API (Call 1: Anomaly Classification)
  → Parse JSON response
  → Airtable Read (all [past_incidents])
  → HTTP Request → Claude API (Call 2: Pattern Matching)
  → Parse JSON response
  → HTTP Request → Claude API (Call 3: Brief Generation)
  → Airtable Write → [impact_briefs]
```

### Workflow 4: Decision Logger
```
Airtable Trigger (new record in [decisions])
  → Update [deployments] status field
  → (Optional) log to notification channel
```

---

## Dashboard Panels (Lovable)

```
┌──────────────────────────────────────────────────────────────┐
│  FATHOM TRACE                              🔴 ALERT ACTIVE   │
├──────────────────────┬───────────────────────────────────────┤
│  ACTIVE DEPLOYMENTS  │  SIGNAL FEED                          │
│                      │                                       │
│  v24.4  🔴 ALERT    │  Support Contacts  ████████ +340%     │
│  v24.3  ✅ Clear    │  Completion Rate   ██░░░░░░ -28%      │
│  v24.2  ✅ Clear    │  Error Rate        ██████░░ +2.1x     │
│                      │  App Store         ⚠️ 3 mentions     │
├──────────────────────┴───────────────────────────────────────┤
│  IMPACT BRIEF                                                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ IMPACT ALERT          ████████████░░░░ 84% confidence│   │
│  │ v24.4 | RRSP Contribution Flow | Step 3 Validation   │   │
│  │ Affected: ~340K clients (RRSP + TFSA holders)        │   │
│  │                                                      │   │
│  │ SIGNALS          PATTERN MATCH                       │   │
│  │ ↑340% contacts   March 2024 (PR #3847)               │   │
│  │ ↓28% completion  Sequential validation bug           │   │
│  │ ↑2.1x errors     Review PR #4821                     │   │
│  │                                                      │   │
│  │ [Acknowledge]  [Escalate]  [Rollback]                │   │
│  └──────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────┤
│  INCIDENT HISTORY                                            │
│  Mar 2024 | RRSP contribution validation | 6h resolved      │
│  Jun 2024 | Crypto withdrawal timeout     | 4h resolved      │
│  Sep 2024 | TFSA over-contribution false  | 3h resolved      │
└──────────────────────────────────────────────────────────────┘
```

---

## Demo Trigger Sequence (for video)

The demo is pre-staged. Workflow runs before recording starts.

```
T-5min: Run reset-demo script
         → Clear impact_briefs table
         → Reset deployment status to "monitoring"

T-3min: Manually trigger Workflow 3 directly in n8n
         (skip polling wait, go straight to AI chain)

T-0:    Start recording
         → Show Airtable deployment record (already seeded)
         → Show signals spiking in dashboard (already loaded)
         → Show brief appearing (already generated, just reveal it)
         → Human reviews and clicks decision
         → Close with scale statement
```

---

## What's Real vs. Simulated

| Data | Status |
|---|---|
| Deployment record | Real — manually seeded in Airtable |
| Signal time-series | Simulated — pre-loaded realistic data |
| Historical incidents | Synthetic-real — 6 incidents with accurate patterns |
| App store snippets | Simulated — 3 pre-written entries |
| AI reasoning (3 calls) | **Real** — live Claude API |
| Impact brief output | **Real** — live Claude generation |
| Human decision | **Real** — human clicks live in dashboard |

---

## Known Failure Mode (honest)

The baseline model degrades when Wealthsimple enters new product territory
with no historical baseline. Fathom Trace labels these as low-confidence flags.
Requires human-seeded baseline data to recalibrate.
This is documented in the 500-word explanation.

# Fathom Trace — Project Context for Claude Code

**Project:** Fathom Trace — post-deployment client impact monitoring system
**Submission:** Wealthsimple AI Builder Program
**Deadline:** March 2, 2026
**Status:** Lovable v2 building (Prompt A in progress). Next: Prompt B → full loop test → recording.

---

## Critical IDs (do not change)

| Key | Value |
|---|---|
| Airtable Base ID | app5MsHEVyYJdJD09 |
| Demo Deployment ID | deploy-v24.4-20260224 |
| Scenario A Incident | INC-2024-003 through INC-2025-004 (RRSP, Bug) |
| Scenario B Incident | INC-007 (Credit Card, Intentional Restriction) |
| n8n Execution count | ~113 remaining (887/1000 used) — W2 is paused |

## API Keys (current)

- Airtable: `YOUR_AIRTABLE_API_KEY` (from airtable.com → Account → API)
- Anthropic: from console.anthropic.com (in n8n W3 Set Config node)

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Data | Airtable free (5 tables) | base ID above |
| Orchestration | n8n Cloud free trial | 4 workflows, W2 paused |
| AI | Claude API claude-sonnet-4-6 | 3-call chain in W3 |
| Dashboard | Lovable paid | lovable-dashboard branch |
| Dev | Claude Code | scripts via Bash tool only |

---

## How to Run Scripts

Node is NOT on PATH in Codespace terminal. Always use Claude Code Bash tool:

```bash
AIRTABLE_API_KEY=YOUR_AIRTABLE_API_KEY AIRTABLE_BASE_ID=YOUR_AIRTABLE_BASE_ID node "scripts/reset-demo.js"
```

```bash
AIRTABLE_API_KEY=YOUR_AIRTABLE_API_KEY AIRTABLE_BASE_ID=YOUR_AIRTABLE_BASE_ID node "scripts/migrate-airtable-v2.js"
```

---

## n8n Workflow State

| Workflow | Status | Notes |
|---|---|---|
| W1 — Deployment Trigger | Imported, inactive | not needed for demo |
| W2 — Signal Monitor | **PAUSED** | runs every 2 min — drains executions |
| W3 — AI Analysis Chain | Active, v2.1 | manual trigger for demo |
| W4 — Decision Logger | Active | webhook trigger, fires on Lovable button click |

**W3 architecture:** System prompts stored in Code nodes (Prepare Call 1/2/3), referenced via `JSON.stringify` in HTTP Request bodies. Do not embed prompts directly in JSON bodies.

**W3 known issue:** `estimated_affected_users` not written by W3 (field type mismatch). Seed data covers demo value (285,000). Not blocking.

---

## Airtable Schema — Key Fields Added in v2.1

**impact_briefs:** `anomaly_type`, `confidence_band`, `pr_to_review`, `low_confidence_flag`, `human_decision`
**past_incidents:** `anomaly_type`, `confidence_at_detection`, `outcome`
**signal_feeds:** `source`, `social_post_snippets`, `post_authenticity_weight`
**deployments:** `product_area`, `monitoring_status`

---

## Demo Scenario

**Scenario A (primary — RRSP, Bug):**
- Deployment: v24.4, 2026-02-24
- 4 internal signals + 1 social trust signal elevated
- W3 output: anomaly_type=Bug, confidence_score=~84-93%, confidence_band=High, low_confidence_flag=false
- Target confidence for recording: 84% — edit Airtable cell if W3 returns higher

**Scenario B (secondary — Credit Card, Intentional Restriction):**
- Historical reference only (BRF-002 pre-seeded, INC-007 in past_incidents)
- low_confidence_flag=true, confidence=52%, teal UI treatment

---

## Decisions Locked — Do Not Revisit

- One Lovable project, Version B warm-dark colors applied as follow-up
- Confidence donut: keep format
- Brief accordions: keep collapsed
- Signal cards: keep sparklines format
- Layout divergence from original spec: approved
- BRF-002 (Scenario B brief): never cleared by reset-demo.js
- W2 stays paused until demo recording

---

## Before Every Demo / Test Run

1. Run `reset-demo.js` via Claude Code Bash tool
2. Verify Airtable: impact_briefs cleared for DEP-001, deployment status = monitoring
3. Trigger W3 manually in n8n
4. Confirm new impact_briefs record: anomaly_type=Bug, confidence_band=High
5. If confidence_score ≠ 84, edit cell in Airtable before recording
6. Open Lovable dashboard — confirm brief loads

---

## Key Files

| File | Purpose |
|---|---|
| PRD.md | Source of truth — v2.1 |
| build-log.md | Running session log — update after each session |
| demo/checklist.md | Task completion tracker — update as work progresses |
| demo/script.md | Narrated demo script with timecodes |
| architecture/lovable-followup-v2.md | Lovable Prompt A (6 changes) + Prompt B (colors) |
| architecture/n8n-w3-prompts-v2.md | W3 system prompts reference |
| scripts/reset-demo.js | Clears Scenario A state — run before every test/recording |
| scripts/migrate-airtable-v2.js | v2.1 migration — already run, do not rerun |
| n8n/workflow-3-ai-analysis-chain.json | W3 importable JSON — v2.1, system prompts in Code nodes |

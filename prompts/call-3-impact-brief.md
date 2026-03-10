# Claude API Call 3 — Impact Brief Generation

## Purpose
Takes Call 1 + Call 2 outputs and the original deployment record.
Generates the structured impact brief for the human decision-maker.

## Model
`claude-sonnet-4-6`

---

## System Prompt

```
You are a senior technical writer generating an impact brief for an engineering and product team at a fintech company. Your audience is a Senior Product Manager or Engineering Lead who needs to make a rollback, escalate, or accept-and-monitor decision in the next 15 minutes.

Rules:
- Be specific. Name the flow, the segment, the evidence numbers. Do not generalize.
- Do not speculate beyond the evidence. Only state what the signals show.
- State confidence level explicitly and what it means.
- The human makes the final rollback/escalate/accept decision. Your job is to make that decision as informed as possible.
- Do not recommend rollback directly. Recommend the action the engineering team should take to investigate. The human decides what comes next.
- Format: structured sections as specified. No prose paragraphs in the signal or pattern sections.

Output format — return this exact structure as a JSON object with a "brief" key containing the formatted text:

{
  "brief_id": string (generate as "brief-{deployment_id}-{timestamp}"),
  "deployment_id": string,
  "confidence_score": number,
  "affected_flow": string,
  "affected_segment": string,
  "estimated_affected_users": string,
  "brief": "IMPACT ALERT — {Severity} Confidence ({score}%)\nDeployment: {version} | Released: {datetime}\nAffected Flow: {flow}\nAffected Segment: {segment} (est. {users} users)\n\nSIGNALS:\n{signal bullets}\n\nPATTERN MATCH:\n{match summary}\nRoot cause then: {historical root cause}\nResolved with: {historical resolution}\nReview: {pr reference}\n\nRECOMMENDED ACTION: {specific action}\nHuman decision required: rollback / hotfix / accept-and-monitor"
}
```

---

## User Message Template

```
Deployment Record:
{deployment_record_json}

Anomaly Classification (Call 1 output):
{anomaly_classification_json}

Historical Pattern Match (Call 2 output):
{pattern_match_json}

Generate the impact brief. Return JSON only.
```

---

## Expected Output (Demo Scenario)

```json
{
  "brief_id": "brief-deploy-v24.4-20260224-1314",
  "deployment_id": "deploy-v24.4-20260224",
  "confidence_score": 84,
  "affected_flow": "RRSP Contribution — Step 3 (Contribution Limit Validation)",
  "affected_segment": "Clients holding both RRSP and TFSA",
  "estimated_affected_users": "~285,000",
  "brief": "IMPACT ALERT — High Confidence (84%)\nDeployment: v24.4 | Released: Monday 09:14 AM\nAffected Flow: RRSP Contribution — Step 3 (Validation)\nAffected Segment: Clients with RRSP + TFSA (est. 285K users)\n\nSIGNALS:\n• Support contacts ↑ 340% (baseline: 4/hr → current: 17/hr)\n• Transaction completion ↓ 28% on affected flow\n• Error rate ↑ 2.1x on contribution validation endpoint\n• App store: 3 mentions of RRSP failure in past 2 hours\n\nPATTERN MATCH:\nSimilar to March 2024 incident (INC-2024-003, PR #3847).\nRoot cause then: sequential contribution limit validation across accounts — RRSP and TFSA limits checked in sequence instead of independently, blocking valid contributions from dual-account holders.\nResolved with: single-call independent validation per account type. 6 hours to hotfix.\nReview PR #4821 contribution validation logic against PR #3847 approach.\n\nRECOMMENDED ACTION: Engineering review of contribution limit validation logic in v24.4 release. Specifically: how contribution room is checked when client holds both RRSP and TFSA. Compare against pre-v24.4 validation flow.\nHuman decision required: rollback / hotfix / accept-and-monitor"
}
```

---

## Notes on Confidence Score Display

Thresholds (match PRD Section 13 exactly — these are fixed):
- 95–100: Brick bar, label "Critical — Escalate Now"
- 80–94: Brick bar, label "High Confidence" ← demo scenario (84%) hits here
- 60–79: Ochre bar, label "Low Confidence"
- Below 60: Grey bar, label "Still watching"

The demo scenario returns 84% = High Confidence (brick bar).

## Note on estimated_affected_users

For the RRSP+TFSA demo scenario, always output `"~285,000"`.

Derivation (if asked): Wealthsimple 3M clients × ~35% with RRSP (~1.05M) × ~55% of those also holding TFSA (~577K) × ~50% active on contribution flow in late February (RRSP season) = ~289K, rounded to 285,000.

Do not have Claude re-derive this number each run — it will drift. The system prompt in n8n W3's Call 3 HTTP node should include the line:
`For estimated_affected_users, use "~285,000" for any anomaly affecting the RRSP+TFSA dual-account segment.`

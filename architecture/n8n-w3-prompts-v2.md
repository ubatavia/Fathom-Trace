# Fathom Trace — n8n W3 System Prompts v2.1

**Where to update:** n8n Cloud → Workflow 3 (AI Analysis Chain)
**When:** Before running the post-migration test. Update all three HTTP Request nodes.
**How:** Open each node → edit the System prompt field → paste the prompt below → save → test.

---

## n8n Changes Summary

**No structural workflow changes.** W1, W2, W4 are unchanged.

W3 has three updated system prompts only:
- Call 1 now returns `anomaly_type` (new field)
- Call 2 now confirms `anomaly_type_confirmed` (new field)
- Call 3 now returns `anomaly_type`, `confidence_band`, `low_confidence_flag` (new fields written to Airtable)

The W3 Airtable write node also needs two new field mappings added — see Call 3 note below.

---

## Call 1 — Anomaly Classification

**Node name in W3:** HTTP Request (Claude Call 1) or similar

**Replace system prompt with:**

```
You are a client impact analyst at a fintech company. You receive post-deployment signal data showing deviations from baseline across multiple signal types.

Classify the anomaly across four dimensions:

1. affected_flow — the specific product flow or feature where the failure is occurring (e.g. "RRSP Contribution Step 3 — Validation")
2. affected_segment — the specific client segment impacted (e.g. "RRSP+TFSA dual-account holders on v24.4")
3. signal_severity — one of: low, medium, high, critical
4. anomaly_type — one of: Bug, Degradation, Intentional Restriction, New Baseline, Unknown

Anomaly type guidance:
- Use "Bug" when signals suggest an unintended system failure with historical precedent likely
- Use "Degradation" when signals suggest gradual performance decline rather than a sudden break
- Use "Intentional Restriction" when signals suggest access limitations that may be by design — phased rollouts, invite-only launches, eligibility gates. Key indicator: support contacts spike but error_rate is low or absent; affected segment is narrow and new
- Use "New Baseline" when the product area has no historical precedent and you cannot classify confidently
- Use "Unknown" when classification is not possible from available signals

Also return: warrants_pattern_matching (boolean) — true if anomaly_type is Bug or Degradation and signal_severity is medium or above.

Return valid JSON only. No explanation text outside the JSON.

Output format:
{
  "affected_flow": "string",
  "affected_segment": "string",
  "signal_severity": "low|medium|high|critical",
  "anomaly_type": "Bug|Degradation|Intentional Restriction|New Baseline|Unknown",
  "warrants_pattern_matching": true|false,
  "classification_notes": "one sentence on the primary classification signal"
}
```

---

## Call 2 — Historical Pattern Matching

**Node name in W3:** HTTP Request (Claude Call 2) or similar

**Replace system prompt with:**

```
You are a pattern-matching system for a fintech engineering team. You have access to a database of past incidents. Given an anomaly classification from a post-deployment signal analysis, identify the closest historical match.

Calculate match_confidence (0–100) using:
- Signal type overlap: 40% weight — how many of the same signal types are elevated?
- Affected segment overlap: 30% weight — same account type, same user segment?
- Affected flow overlap: 30% weight — same product area and flow step?

Rules:
- If anomaly_type is "Intentional Restriction" or "New Baseline" and no strong match exists, confirm that type and set match_confidence below 60
- If anomaly_type is "Bug" or "Degradation", find the best match even if imperfect
- A match on all three dimensions (signal type + segment + flow) should produce match_confidence 75+
- A near-structural twin (same everything) should produce match_confidence 85+

Return valid JSON only. No explanation text outside the JSON.

Output format:
{
  "match_id": "incident_id string or null if no match",
  "match_confidence": 0-100,
  "matching_signals": ["signal_type_1", "signal_type_2"],
  "probable_root_cause": "string — specific technical hypothesis based on historical match",
  "historical_resolution": "string — what was done to fix it previously",
  "anomaly_type_confirmed": "Bug|Degradation|Intentional Restriction|New Baseline|Unknown"
}
```

---

## Call 3 — Impact Brief Generation

**Node name in W3:** HTTP Request (Claude Call 3) or similar

**Replace system prompt with:**

```
You are generating an impact brief for an engineering and product team at a fintech company. The brief will be reviewed by a human who must make a rollback, escalation, or accept decision.

Be specific and actionable. Do not speculate beyond the evidence. State confidence level and anomaly type explicitly. The human makes the final decision — make that decision as informed as possible.

Confidence score calculation (weighted composite):
- Signal Strength (40%): number of independent signals elevated + magnitude. Social trust contributes at half weight of internal signals.
- Segment Specificity (30%): how precisely is the anomaly localized? Broad spike = low score. Specific version + account combo + flow step = high score.
- Historical Match Quality (30%): how closely does the current pattern match a past incident? Signal type match only = low. Signal + segment + flow + resolution pattern = high.

Confidence bands:
- 95–100: Critical
- 80–94: High
- 60–79: Medium
- below 60: Low

Set low_confidence_flag to true if: confidence_score < 60 OR anomaly_type is "Intentional Restriction" OR anomaly_type is "New Baseline".

Return valid JSON only. No explanation text outside the JSON.

Output format:
{
  "confidence_score": integer 0-100,
  "confidence_band": "Low|Medium|High|Critical",
  "anomaly_type": "Bug|Degradation|Intentional Restriction|New Baseline|Unknown",
  "affected_flow": "string",
  "affected_segment": "string",
  "affected_users_est": integer,
  "signal_summary": [
    { "signal_type": "string", "direction": "up|down|declining|stable", "magnitude": "string", "note": "string" }
  ],
  "pattern_match_summary": "2–4 sentence plain-language summary of the historical match and what it implies for root cause. If no match, explain why and state confidence is low.",
  "pr_to_review": "PR number string or null",
  "recommended_action": "string — specific, actionable, one sentence",
  "low_confidence_flag": true|false,
  "full_brief_text": "Complete formatted brief text. Use this structure:\n\nIMPACT ALERT — {confidence_band} Confidence ({confidence_score}%)\nAnomaly Type: {anomaly_type}\nDeployment: {release_version} | Released: {release_datetime}\nAffected Flow: {affected_flow}\nAffected Segment: {affected_segment}\nEstimated Clients: ~{affected_users_est}\n\nSIGNALS:\n• [bullet per signal]\n\nPATTERN MATCH:\n{pattern_match_summary}\n\nRECOMMENDED ACTION: {recommended_action}"
}
```

**After updating Call 3 prompt — also add these field mappings in the Airtable write node:**

In the W3 node that writes to `impact_briefs`, add mappings for these new fields:
- `anomaly_type` → from Call 3 output: `anomaly_type`
- `confidence_band` → from Call 3 output: `confidence_band`
- `pr_to_review` → from Call 3 output: `pr_to_review`
- `low_confidence_flag` → from Call 3 output: `low_confidence_flag`
- `human_decision` → hardcode: `Pending`

The existing field mappings (`confidence_score`, `affected_flow`, `affected_segment`, `estimated_affected_users`, `signal_summary`, `pattern_match_id`, `pattern_match_summary`, `recommended_action`, `full_brief_text`, `status`) remain unchanged.

---

## Test After Updating

1. Save all three updated nodes in W3
2. Manually trigger W3 in n8n
3. Confirm in Airtable `impact_briefs` that the new record has:
   - `anomaly_type` = Bug
   - `confidence_band` = High
   - `confidence_score` = 84 (approximately — AI may vary ±3%)
   - `low_confidence_flag` = false (unchecked)
   - `pr_to_review` = PR #4821 (or similar)
4. If confidence comes back as 89% rather than 84%, that is acceptable — the seed data BRF-001 is hardcoded to 84% for the demo

---

*v2.1 — Updated 2026-03-01 | W1, W2, W4 unchanged | Only W3 prompts updated*

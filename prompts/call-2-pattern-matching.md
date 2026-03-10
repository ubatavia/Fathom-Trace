# Claude API Call 2 — Historical Pattern Matching

## Purpose
Takes the anomaly classification from Call 1 and the full incident history.
Returns the closest historical match with confidence score.

## Model
`claude-sonnet-4-6`

---

## System Prompt

```
You are a pattern-matching system for a fintech company's operational incident database. You have access to the company's full history of past post-deployment client impact incidents.

Given a current anomaly classification, your job is to identify the closest historical match from the provided incident records. You are looking for structural similarity — same product area, same signal pattern shape, same type of affected segment — not just surface keyword similarity.

Rules:
- Return structured JSON only. No prose, no explanation.
- Confidence score is 0-100. Score above 70 means strong structural match. Score 40-70 means partial match worth noting. Score below 40 means no meaningful match.
- If no meaningful match exists, return match_id: null and confidence: 0.
- Do not hallucinate incidents. Only reference incidents present in the provided database.
- matching_signals should specifically name which signal fields match, not just say "similar pattern."

Output schema:
{
  "match_id": string | null,
  "match_confidence": number,
  "matched_incident_date": string | null,
  "matched_product_area": string | null,
  "matching_signals": [string],
  "key_difference": string | null,
  "probable_root_cause": string,
  "historical_resolution": string,
  "historical_resolution_time_hours": number | null,
  "historical_pr_reference": string | null,
  "match_reasoning": string
}
```

---

## User Message Template

```
Current Anomaly Classification:
{anomaly_classification_json}

Historical Incident Database (full):
{past_incidents_json}

Find the closest historical match. Return JSON only.
```

---

## Expected Output (Demo Scenario)

```json
{
  "match_id": "INC-2024-003",
  "match_confidence": 84,
  "matched_incident_date": "2024-03-12",
  "matched_product_area": "Registered Accounts — RRSP Contribution",
  "matching_signals": [
    "Both incidents: support_contacts elevated 250-350% above Monday baseline",
    "Both incidents: completion_rate drop in range -20% to -30% on RRSP contribution flow",
    "Both incidents: error_rate elevation at contribution validation endpoint specifically",
    "Both incidents: affected segment is dual-account holders (RRSP + TFSA)",
    "Both incidents: signal spike appears within 4 hours of release"
  ],
  "key_difference": "Current incident shows slightly higher support contact spike (325% vs 280%). App store signal is present in current incident; was absent in March 2024 match.",
  "probable_root_cause": "Contribution limit validation logic is being applied sequentially or incorrectly across account types. When a client holds both RRSP and TFSA, the validation is likely checking combined registered limits instead of per-account limits, blocking valid contributions.",
  "historical_resolution": "Hotfix to contribution validation service — changed sequential calls to single independent validation per account type.",
  "historical_resolution_time_hours": 6,
  "historical_pr_reference": "PR #3847",
  "match_reasoning": "Structural match is strong: same product area (RRSP contribution), same affected segment (dual registered account holders), same signal triad (support spike + completion drop + endpoint error), same timing (within-day post-release). The March 2024 incident is the only incident in the database with this combination. Confidence reduced from 90+ to 84 due to the current incident's slightly higher severity and presence of app store signal not seen in the 2024 match."
}
```

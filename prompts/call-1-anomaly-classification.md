# Claude API Call 1 — Anomaly Classification

## Purpose
Receives the deployment record and current signal deviations.
Classifies the anomaly and decides if historical pattern matching is warranted.

## Model
`claude-sonnet-4-6`

---

## System Prompt

```
You are a client impact analyst at a fintech company that serves 3 million retail clients across registered financial products (TFSA, RRSP, FHSA, RRIF), investing accounts, crypto, and banking.

You receive post-deployment signal data showing deviations from baseline for a recent release. Your job is to classify the anomaly precisely and determine whether it warrants historical pattern matching.

Rules:
- Return structured JSON only. No prose, no explanation.
- Be specific about the affected flow and segment — do not generalize.
- Severity scale: low (minor, watch), medium (investigate), high (urgent), critical (immediate action required).
- Set warrants_historical_match to true if severity is medium, high, or critical.
- If signals are ambiguous or delta is borderline, set severity to low and warrants_historical_match to false.

Output schema:
{
  "deployment_id": string,
  "release_version": string,
  "affected_flow": string,
  "affected_segment": string,
  "primary_signal": string,
  "severity": "low" | "medium" | "high" | "critical",
  "signal_evidence": [
    {
      "signal_type": string,
      "value": number,
      "baseline": number,
      "delta_pct": number,
      "interpretation": string
    }
  ],
  "warrants_historical_match": boolean,
  "analyst_note": string
}
```

---

## User Message Template

```
Deployment Record:
{deployment_record_json}

Signal Deviations (measured 4 hours post-release):
{signal_feeds_json}

Classify the anomaly. Return JSON only.
```

---

## Expected Output (Demo Scenario)

```json
{
  "deployment_id": "deploy-v24.4-20260224",
  "release_version": "v24.4",
  "affected_flow": "RRSP Contribution — Step 3 (Contribution Limit Validation)",
  "affected_segment": "Clients holding both RRSP and TFSA accounts",
  "primary_signal": "support_contacts",
  "severity": "high",
  "signal_evidence": [
    {
      "signal_type": "support_contacts",
      "value": 17,
      "baseline": 4,
      "delta_pct": 325,
      "interpretation": "Support contact rate is 4.25x above Monday morning baseline, concentrated on RRSP contribution errors"
    },
    {
      "signal_type": "completion_rate",
      "value": 72,
      "baseline": 100,
      "delta_pct": -28,
      "interpretation": "28% of clients who initiated RRSP contributions on v24.4 did not complete — significant friction introduced"
    },
    {
      "signal_type": "error_rate",
      "value": 210,
      "baseline": 100,
      "delta_pct": 110,
      "interpretation": "Contribution validation endpoint error rate is 2.1x baseline, isolated to dual-account holders on v24.4"
    },
    {
      "signal_type": "app_review",
      "value": 3,
      "baseline": 0,
      "delta_pct": 300,
      "interpretation": "3 app store reviews in past 2 hours specifically mentioning RRSP contribution failure — early public signal"
    }
  ],
  "warrants_historical_match": true,
  "analyst_note": "Signals are coherent and point to a validation logic failure in the RRSP contribution flow affecting dual-account holders. The combination of support spike, completion drop, and endpoint errors within 4 hours of release indicates a regression, not a new behaviour pattern."
}
```

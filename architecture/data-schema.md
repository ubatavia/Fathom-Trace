# Fathom Trace — Airtable Data Schema

All tables live in a single Airtable base: **Fathom Trace**

---

## Table 1: `deployments`

Trigger table. One new record here kicks off the entire system via n8n webhook.

| Field | Type | Example |
|---|---|---|
| deployment_id | Text (primary) | `deploy-v24.4-20260224` |
| release_version | Text | `v24.4` |
| release_datetime | DateTime | `2026-02-24T09:14:00Z` |
| changed_services | Long text (JSON array) | `["rrsp-contribution-api", "account-validation-service"]` |
| affected_account_types | Long text (JSON array) | `["RRSP", "TFSA"]` |
| affected_user_segment | Text | `"Clients holding both RRSP and TFSA"` |
| feature_flags_flipped | Long text (JSON array) | `["contribution-validation-v2"]` |
| pr_references | Long text | `"PR #4821, PR #4819"` |
| deploying_team | Text | `"Registered Accounts"` |
| status | Single select | `monitoring` / `anomaly_detected` / `brief_generated` / `resolved` |

**Demo record (pre-seeded):**
```json
{
  "deployment_id": "deploy-v24.4-20260224",
  "release_version": "v24.4",
  "release_datetime": "2026-02-24T09:14:00Z",
  "changed_services": ["rrsp-contribution-api", "account-validation-service"],
  "affected_account_types": ["RRSP", "TFSA"],
  "affected_user_segment": "Clients holding both RRSP and TFSA",
  "feature_flags_flipped": ["contribution-validation-v2"],
  "pr_references": "PR #4821, PR #4819",
  "deploying_team": "Registered Accounts",
  "status": "monitoring"
}
```

---

## Table 2: `signal_feeds`

Time-series signals. Pre-loaded for the demo scenario.
n8n reads this table and calculates deviation from baseline.

| Field | Type | Example |
|---|---|---|
| feed_id | Text (primary) | `sig-001` |
| deployment_id | Text | `deploy-v24.4-20260224` |
| signal_type | Single select | `support_contacts` / `error_rate` / `completion_rate` / `app_review` |
| timestamp | DateTime | `2026-02-24T13:14:00Z` (4hr post-release) |
| value | Number | `17` |
| baseline_value | Number | `4` |
| delta_pct | Number | `325` |
| account_type_filter | Text | `RRSP+TFSA` |
| version_filter | Text | `v24.4` |
| notes | Long text | `"Peak observation 4 hours post-release"` |

**Demo signals (pre-seeded — the RRSP incident pattern):**
```json
[
  {
    "feed_id": "sig-001",
    "deployment_id": "deploy-v24.4-20260224",
    "signal_type": "support_contacts",
    "timestamp": "2026-02-24T13:14:00Z",
    "value": 17,
    "baseline_value": 4,
    "delta_pct": 325,
    "account_type_filter": "RRSP",
    "version_filter": "v24.4",
    "notes": "Monday morning baseline is 4/hr. Current is 17/hr."
  },
  {
    "feed_id": "sig-002",
    "deployment_id": "deploy-v24.4-20260224",
    "signal_type": "completion_rate",
    "timestamp": "2026-02-24T13:14:00Z",
    "value": 72,
    "baseline_value": 100,
    "delta_pct": -28,
    "account_type_filter": "RRSP+TFSA",
    "version_filter": "v24.4",
    "notes": "28% drop in RRSP contribution flow completion for dual-account holders"
  },
  {
    "feed_id": "sig-003",
    "deployment_id": "deploy-v24.4-20260224",
    "signal_type": "error_rate",
    "timestamp": "2026-02-24T13:14:00Z",
    "value": 210,
    "baseline_value": 100,
    "delta_pct": 110,
    "account_type_filter": "RRSP+TFSA",
    "version_filter": "v24.4",
    "notes": "2.1x error rate on contribution validation endpoint"
  },
  {
    "feed_id": "sig-004",
    "deployment_id": "deploy-v24.4-20260224",
    "signal_type": "app_review",
    "timestamp": "2026-02-24T13:14:00Z",
    "value": 3,
    "baseline_value": 0,
    "delta_pct": 300,
    "account_type_filter": "all",
    "version_filter": "v24.4",
    "notes": "3 app store reviews mentioning RRSP contribution failure in past 2 hours"
  }
]
```

---

## Table 3: `past_incidents`

The institutional memory. Fed entirely to Claude Call 2 as context.
6 incidents seeded — covering the range of Wealthsimple product areas.

| Field | Type |
|---|---|
| incident_id | Text (primary) |
| date | Date |
| product_area | Text |
| affected_segment | Text |
| signal_pattern | Long text (JSON) |
| root_cause | Long text |
| resolution | Long text |
| resolution_time_hours | Number |
| pr_reference | Text |

**6 incidents to seed:**

```json
[
  {
    "incident_id": "INC-2024-003",
    "date": "2024-03-12",
    "product_area": "Registered Accounts — RRSP Contribution",
    "affected_segment": "Clients with RRSP + TFSA",
    "signal_pattern": {
      "support_contacts_delta": "+280%",
      "completion_rate_delta": "-22%",
      "error_rate_delta": "+1.8x",
      "app_reviews_mentions": 2
    },
    "root_cause": "Contribution limit validation was applied sequentially across accounts instead of independently. When a client held both RRSP and TFSA, the system would validate RRSP room, then re-validate against total registered limit, incorrectly blocking valid contributions.",
    "resolution": "Hotfix to contribution validation service — changed sequential calls to single independent validation per account type. PR #3847.",
    "resolution_time_hours": 6,
    "pr_reference": "PR #3847"
  },
  {
    "incident_id": "INC-2024-006",
    "date": "2024-06-18",
    "product_area": "Crypto — Withdrawal Flow",
    "affected_segment": "High-volume crypto account holders (>$50K balance)",
    "signal_pattern": {
      "support_contacts_delta": "+190%",
      "completion_rate_delta": "-35%",
      "error_rate_delta": "+4.2x",
      "app_reviews_mentions": 5
    },
    "root_cause": "Withdrawal request timeout was set to 10s. High-volume accounts triggered a compliance check that added ~12s processing time. Timeout fired before compliance check returned, causing silent failure.",
    "resolution": "Extended timeout to 30s for accounts above balance threshold. Added retry logic with user-visible progress indicator.",
    "resolution_time_hours": 4,
    "pr_reference": "PR #4102"
  },
  {
    "incident_id": "INC-2024-009",
    "date": "2024-09-03",
    "product_area": "Registered Accounts — TFSA",
    "affected_segment": "Clients who opened FHSA in 2024 and held existing TFSA",
    "signal_pattern": {
      "support_contacts_delta": "+140%",
      "completion_rate_delta": "-8%",
      "error_rate_delta": "+0.9x",
      "app_reviews_mentions": 1
    },
    "root_cause": "After FHSA launch, total registered contribution room calculation included FHSA limit in TFSA over-contribution warning logic. Clients with correct TFSA contributions were seeing false over-contribution warnings.",
    "resolution": "Separated FHSA contribution room from TFSA calculation. Updated warning logic to use account-type-specific limits only.",
    "resolution_time_hours": 3,
    "pr_reference": "PR #4334"
  },
  {
    "incident_id": "INC-2024-011",
    "date": "2024-11-07",
    "product_area": "Investing — Margin Accounts",
    "affected_segment": "Margin account holders post Bank of Canada rate change",
    "signal_pattern": {
      "support_contacts_delta": "+95%",
      "completion_rate_delta": "-2%",
      "error_rate_delta": "+0.3x",
      "app_reviews_mentions": 0
    },
    "root_cause": "Margin account balance display was caching interest rate data. After rate change, displayed balances were stale for ~4 hours, showing incorrect available margin to clients.",
    "resolution": "Invalidated interest rate cache on rate change event. Added TTL of 15 minutes for margin balance cache regardless.",
    "resolution_time_hours": 5,
    "pr_reference": "PR #4589"
  },
  {
    "incident_id": "INC-2025-001",
    "date": "2025-01-22",
    "product_area": "Tax — Spousal RRSP",
    "affected_segment": "Clients with spousal RRSP accounts — tax slip generation",
    "signal_pattern": {
      "support_contacts_delta": "+210%",
      "completion_rate_delta": "N/A",
      "error_rate_delta": "+3.1x",
      "app_reviews_mentions": 4
    },
    "root_cause": "Tax slip generation for spousal RRSP was querying account holder ID instead of contributor ID. Slips generated with wrong name or failed entirely when contributor and holder were different CRM entities.",
    "resolution": "Fixed entity lookup to use contributor_id for spousal RRSP tax documents. Reprocessed affected slips.",
    "resolution_time_hours": 8,
    "pr_reference": "PR #4712"
  },
  {
    "incident_id": "INC-2025-004",
    "date": "2025-04-15",
    "product_area": "Banking — Chequing Interac Transfers",
    "affected_segment": "All chequing account holders during peak transfer period",
    "signal_pattern": {
      "support_contacts_delta": "+420%",
      "completion_rate_delta": "-41%",
      "error_rate_delta": "+5.8x",
      "app_reviews_mentions": 11
    },
    "root_cause": "Interac API integration was not handling connection pool exhaustion under load. During Friday afternoon peak, connection pool saturated and transfers were queued silently without user notification.",
    "resolution": "Increased connection pool size. Added queue depth monitoring. Added user-facing status message when transfer is queued.",
    "resolution_time_hours": 2,
    "pr_reference": "PR #4891"
  }
]
```

---

## Table 4: `impact_briefs`

Written by n8n after AI chain completes. Read by Lovable dashboard.

| Field | Type |
|---|---|
| brief_id | Text (primary) |
| deployment_id | Text |
| generated_at | DateTime |
| confidence_score | Number (0-100) |
| affected_flow | Text |
| affected_segment | Text |
| estimated_affected_users | Number |
| signal_summary | Long text (JSON) |
| pattern_match_id | Text |
| pattern_match_summary | Long text |
| recommended_action | Long text |
| full_brief_text | Long text |
| status | Single select: `pending_review` / `acknowledged` / `escalated` / `rollback_initiated` |

---

## Table 5: `decisions`

Written by Lovable when human clicks action button.

| Field | Type |
|---|---|
| decision_id | Text (primary) |
| brief_id | Text |
| deployment_id | Text |
| decision | Single select: `acknowledge` / `escalate` / `rollback` |
| decided_by | Text |
| decided_at | DateTime |
| notes | Long text |

---

## Deviation Thresholds (used in n8n Workflow 2)

```
support_contacts delta_pct > 50%    → trigger AI chain
error_rate delta_pct > 30%          → trigger AI chain
completion_rate delta_pct < -15%    → trigger AI chain
app_review value > 2 mentions       → trigger AI chain

ANY single threshold breach = trigger
```

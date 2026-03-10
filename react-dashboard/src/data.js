// Fathom Trace — hardcoded demo data for React fallback dashboard
// Matches Airtable base app5MsHEVyYJdJD09 seeded state

export const SCENARIOS = {
  RRSP: {
    key: 'RRSP',
    tab: { label: 'RRSP Contribution', version: 'v24.4' },
    deployment: {
      deployment_id: 'deploy-v24.4-20260224',
      release_version: 'v24.4',
      release_datetime: '2026-02-24T02:14:00Z',
      deploying_team: 'Registered Accounts',
      product_name: 'RRSP and TFSA Accounts',
      status: 'brief_generated',
      previous_version: 'v23.9',
    },
    confidence: {
      score: 84,
      band: 'High',
      label: 'This is a real issue',
      anomaly_type: 'Bug',
      low_confidence_flag: false,
    },
    signals: [
      {
        id: 'sig-003',
        type: 'error_rate',
        label: 'Errors',
        delta_pct: 110,
        over_threshold: true,
        display: 'Up 110%',
        sparkline: 'line-up',
      },
      {
        id: 'sig-001',
        type: 'support_contacts',
        label: 'Support calls',
        delta_pct: 325,
        over_threshold: true,
        display: 'Up 325%',
        sparkline: 'bars-up',
      },
      {
        id: 'sig-004',
        type: 'app_review',
        label: 'App reviews',
        value: 3,
        delta_pct: 300,
        over_threshold: true,
        display: '3 negative reviews',
        sparkline: 'stars',
        star_rating: 2,
      },
      {
        id: 'sig-002',
        type: 'completion_rate',
        label: 'Journey completions',
        delta_pct: -48,
        over_threshold: true,
        display: 'Down 48%',
        sparkline: 'line-down',
      },
      {
        id: 'sig-005',
        type: 'social_trust',
        label: 'Social Trust',
        value: 2,
        over_threshold: true,
        social_direction: 'Declining \u2198',
        social_source: 'External \u2014 Reddit, App Store',
        authenticity: 0.78,
        social_status: 'Signal is declining',
        sparkline: 'social-down',
        snippets: [
          { text: 'Anyone else getting an error trying to contribute to their RRSP this morning? App keeps failing at the last step.', source: 'Reddit' },
          { text: 'Wealthsimple won\u2019t let me contribute to my RRSP \u2014 says limit exceeded but I have room. Anyone?', source: 'Reddit' },
          { text: 'Getting a weird validation error on RRSP contribution. Has anyone else seen this today?', source: 'Reddit' },
        ],
      },
    ],
    brief: {
      brief_id: 'BRF-001',
      deployment_id: 'deploy-v24.4-20260224',
      affected_flow: 'RRSP Contribution Validation',
      affected_segment: 'Clients holding both RRSP and TFSA accounts',
      estimated_affected_users: 285000,
      confidence_score: 84,
      anomaly_type: 'Bug',
      confidence_band: 'High',
      low_confidence_flag: false,
      pattern_match_id: 'INC-2024-003',
      pattern_match_summary:
        'March 2024 \u2014 identical signal pattern: support up 280%, completion rate down 22%, error rate 1.8x. Root cause was sequential cross-account validation applying RRSP contribution limits against total registered room, incorrectly blocking valid contributions from dual-account holders. Resolved via PR #3847 in 6 hours.',
      signal_summary: [
        'Error rate up 110% from baseline (210 errors/min vs 100 baseline)',
        'Support contacts up 325% from normal (17/hr vs 4/hr baseline)',
        'RRSP contribution completion rate down 48% from normal',
        '3 negative App Store reviews mentioning RRSP contribution failure in the past 2 hours',
        'Reddit mentions declining \u2014 authenticity-weighted signal score at 78%',
      ],
      narrative:
        'Fathom Trace is detecting elevated RRSP contribution validation flow issues for Clients holding both RRSP and TFSA accounts, 4 hours after v24.4 shipped Monday morning.\n\nCurrent incident matches INC-2024-003 at 84% confidence. Pattern is consistent with sequential cross-account contribution validation logic \u2014 the contribution-validation-v2 feature flag, flipped in PR #4821, re-introduces sequential validation across account types rather than independent per-account validation (reference PR #3847). This is the most probable trigger based on the established traffic pattern.\n\nThe system is 84% confident this is a real issue \u2014 this warrants immediate review \u2014 based on 5 correlated signals across support volume, error rates, and completion rates.\n\nClients holding both RRSP and TFSA accounts in the contribution-eligible segment may experience:\n\u2022 Contribution blocked at validation step with incorrect \u201climit exceeded\u201d error\n\u2022 Completion rate dropping for dual-account holders specifically\n\u2022 Support contacts spiking on RRSP contribution tag\n\u2022 App Store reviews mentioning contribution failure',
      full_brief_text:
        'FATHOM TRACE \u2014 IMPACT BRIEF\nGenerated: 2026-02-24T13:18:00Z\nDeployment: deploy-v24.4-20260224 (v24.4)\nBrief ID: BRF-001\n\n\u2500\u2500 ANOMALY SUMMARY \u2500\u2500\nType: Bug\nConfidence: 84% (High)\nAffected flow: RRSP Contribution Validation\nAffected segment: Clients holding both RRSP and TFSA accounts\nEstimated affected clients: ~285,000\n\n\u2500\u2500 SIGNAL PATTERN \u2500\u2500\n\u2022 Error rate: 210/min (baseline 100/min) \u2014 +110%\n\u2022 Support contacts: 17/hr (baseline 4/hr) \u2014 +325%\n\u2022 Completion rate: 52% (baseline 100%) \u2014 \u221248%\n\u2022 App reviews: 3 new 1\u20132 star reviews (RRSP keyword match)\n\u2022 Social trust: Declining \u2014 Reddit mentions, 78% avg authenticity\n\n\u2500\u2500 PATTERN MATCH \u2500\u2500\nClosest match: INC-2024-003 (March 2024)\nMatch confidence: 84%\n\nINC-2024-003 profile:\n  Signal pattern: support +280%, completion \u221222%, errors +1.8x\n  Root cause: Sequential cross-account validation applying RRSP limits\n  against total registered room, blocking valid dual-account contributions\n  Resolution: PR #3847 \u2014 independent per-account-type validation\n  Resolution time: 6 hours\n\nCurrent deployment (v24.4) flipped contribution-validation-v2 via PR #4821.\nThis flag change is consistent with re-introduction of sequential validation.\n\n\u2500\u2500 RECOMMENDED ACTION \u2500\u2500\nImmediate: Review PR #4821 against PR #3847 validation logic\nIf confirmed: Rollback contribution-validation-v2 flag or issue hotfix\nTimeline: <2 hours to prevent further client impact at this volume',
      status: 'pending_review',
      human_decision: null,
    },
    decision_buttons: ['acknowledge', 'escalate', 'rollback'],
  },

  CREDIT_CARD: {
    key: 'CREDIT_CARD',
    tab: { label: 'Credit Card', version: 'v23.9' },
    deployment: {
      deployment_id: 'deploy-v23.9-20260112',
      release_version: 'v23.9',
      release_datetime: '2026-01-12T08:00:00Z',
      deploying_team: 'Credit Card',
      product_name: 'Credit Card Feature',
      status: 'brief_generated',
      previous_version: 'v23.1',
    },
    confidence: {
      score: 52,
      band: 'Low',
      label: 'Low confidence \u2014 verify intent',
      anomaly_type: 'Intentional Restriction',
      low_confidence_flag: true,
    },
    signals: [
      {
        id: 'sig-010',
        type: 'error_rate',
        label: 'Errors',
        delta_pct: -2,
        over_threshold: false,
        display: 'Down 2%',
        sparkline: 'line-flat',
      },
      {
        id: 'sig-011',
        type: 'support_contacts',
        label: 'Support calls',
        delta_pct: 633,
        over_threshold: true,
        display: 'Up 633%',
        sparkline: 'bars-up-high',
      },
      {
        id: 'sig-013',
        type: 'app_review',
        label: 'App reviews',
        value: 4,
        delta_pct: 0,
        over_threshold: false,
        display: '4 \u2605 App Store rating',
        sparkline: 'stars',
        star_rating: 4,
      },
      {
        id: 'sig-012',
        type: 'completion_rate',
        label: 'Journey completions',
        delta_pct: -2,
        over_threshold: false,
        display: 'Down 2%',
        sparkline: 'line-flat-down',
      },
      {
        id: 'sig-014',
        type: 'social_trust',
        label: 'Social Trust',
        value: 2,
        over_threshold: true,
        social_direction: 'Declining \u2198',
        social_source: 'External \u2014 Reddit, App Store',
        authenticity: 0.61,
        social_status: 'Signal is declining',
        sparkline: 'social-down',
        snippets: [
          { text: 'Anyone else unable to apply for the new WS credit card? Just shows a waitlist screen.', source: 'Reddit' },
          { text: 'Credit card application shows a waitlist page now \u2014 was working last week?', source: 'Reddit' },
          { text: 'Anyone know if the WS credit card is limited availability? Can\u2019t get through the apply flow.', source: 'Reddit' },
        ],
      },
    ],
    brief: {
      brief_id: 'BRF-002',
      deployment_id: 'deploy-v23.9-20260112',
      affected_flow: 'Credit Card Application Flow',
      affected_segment: 'Waitlist-eligible clients',
      estimated_affected_users: 85000,
      confidence_score: 52,
      anomaly_type: 'Intentional Restriction',
      confidence_band: 'Low',
      low_confidence_flag: true,
      pattern_match_id: 'INC-007',
      pattern_match_summary:
        'January 2026 \u2014 Credit Card access restriction during phased rollout. No strong historical match found in past incidents. Signal pattern is consistent with a deliberate invite-only launch gating eligible clients to a waitlist flow \u2014 no system failure detected. Outcome: Expected behavior confirmed, no rollback required.',
      signal_summary: [
        'Support contacts up 633% from normal \u2014 clients reporting inability to apply for credit card',
        'Error rate normal (\u22122% from baseline) \u2014 no technical failures detected in the flow',
        'Completion rate normal (\u22122% from baseline) \u2014 flow completing as expected for approved users',
        'App Store rating 4\u2605 \u2014 no significant negative change',
        'Reddit mentions referencing waitlist specifically \u2014 authenticity 61%',
      ],
      narrative:
        'Fathom Trace is detecting elevated Credit Card Application Flow issues for Waitlist-eligible clients, 1125 hours after v23.9 shipped Monday morning.\n\nNo strong historical match found. Signal pattern is consistent with a phased or invite-only product launch \u2014 access restriction by design rather than a system failure. Confidence is low. Human review required to confirm intended behavior before any action.\n\nThe system is 52% confident this is a real issue \u2014 still watching \u2014 based on 5 correlated signals across support volume, error rates, and completion rates.\n\nClients in the Waitlist-eligible segment may experience:\n\u2022 Credit Card application landing on waitlist screen rather than application flow\n\u2022 Unable to progress past eligibility gate\n\u2022 Support contacts referencing \u201cwaitlist\u201d and \u201caccess\u201d specifically, not technical errors',
      full_brief_text:
        'FATHOM TRACE \u2014 IMPACT BRIEF\nGenerated: 2026-01-12T16:22:00Z\nDeployment: deploy-v23.9-20260112 (v23.9)\nBrief ID: BRF-002\n\n\u2500\u2500 ANOMALY SUMMARY \u2500\u2500\nType: Intentional Restriction\nConfidence: 52% (Low)\nAffected flow: Credit Card Application Flow\nAffected segment: Waitlist-eligible clients\nEstimated affected clients: ~85,000\n\n\u2500\u2500 SIGNAL PATTERN \u2500\u2500\n\u2022 Error rate: 98/min (baseline 100/min) \u2014 \u22122% (within normal range)\n\u2022 Support contacts: 77/hr (baseline 11/hr) \u2014 +633%\n\u2022 Completion rate: 98% (baseline 100%) \u2014 \u22122% (within normal range)\n\u2022 App reviews: 4.0 rating (no significant negative change)\n\u2022 Social trust: Declining \u2014 Reddit waitlist mentions, 61% avg authenticity\n\n\u2500\u2500 PATTERN MATCH \u2500\u2500\nNo strong historical match found. Closest signal proximity: INC-007 (Jan 2026)\n\nPattern notes:\n  Support spike without corresponding error rate or completion rate anomaly\n  is characteristic of intentional access restriction (phased rollout,\n  invite-only launch, or eligibility gating) rather than a system failure.\n  Social mentions reference \u201cwaitlist\u201d specifically \u2014 not errors or bugs.\n  Error rate and completion rate are both within 2% of baseline.\n\n\u2500\u2500 RECOMMENDED ACTION \u2500\u2500\nHuman review required: Confirm whether v23.9 intentionally restricts\ncredit card application access to a waitlist-only flow for this segment.\nIf confirmed intentional: Mark as Expected Behavior to seed the baseline.\nIf unintentional: Investigate access control logic in v23.9 deployment.',
      status: 'pending_review',
      human_decision: null,
    },
    decision_buttons: ['acknowledge', 'escalate', 'rollback', 'expected_behavior'],
  },
};

export const PAST_INCIDENTS = [
  {
    incident_id: 'INC-007',
    date: '2026-01',
    product_area: 'Credit Card \u2014 Access Flow',
    affected_segment: 'Waitlist-eligible clients',
    resolution_time_hours: null,
    anomaly_type: 'Intentional Restriction',
    outcome: 'Expected Behavior',
    note: 'Phased rollout by design \u2014 no system failure',
    teal: true,
  },
  {
    incident_id: 'INC-2025-004',
    date: '2025-04',
    product_area: 'Banking \u2014 Chequing Interac Transfers',
    affected_segment: 'All chequing account holders',
    resolution_time_hours: 2,
    anomaly_type: 'Bug',
  },
  {
    incident_id: 'INC-2025-001',
    date: '2025-01',
    product_area: 'Tax \u2014 Spousal RRSP',
    affected_segment: 'Clients with spousal RRSP accounts',
    resolution_time_hours: 8,
    anomaly_type: 'Bug',
  },
  {
    incident_id: 'INC-2024-011',
    date: '2024-11',
    product_area: 'Investing \u2014 Margin Accounts',
    affected_segment: 'Margin account holders',
    resolution_time_hours: 5,
    anomaly_type: 'Degradation',
  },
  {
    incident_id: 'INC-2024-009',
    date: '2024-09',
    product_area: 'Registered Accounts \u2014 TFSA',
    affected_segment: 'Clients with FHSA + existing TFSA',
    resolution_time_hours: 3,
    anomaly_type: 'Bug',
  },
  {
    incident_id: 'INC-2024-006',
    date: '2024-06',
    product_area: 'Crypto \u2014 Withdrawal Flow',
    affected_segment: 'High-volume crypto accounts (>$50K)',
    resolution_time_hours: 4,
    anomaly_type: 'Bug',
  },
  {
    incident_id: 'INC-2024-003',
    date: '2024-03',
    product_area: 'Registered Accounts \u2014 RRSP Contribution',
    affected_segment: 'Clients with RRSP + TFSA',
    resolution_time_hours: 6,
    anomaly_type: 'Bug',
  },
];

export const ANOMALY_BADGE = {
  Bug:                    { bg: '#FEE2E2', text: '#991B1B' },
  Degradation:            { bg: '#FEF3C7', text: '#92400E' },
  'Intentional Restriction': { bg: '#CCFBF1', text: '#0F766E' },
  'New Baseline':         { bg: '#EDE9FE', text: '#5B21B6' },
  Unknown:                { bg: '#F3F4F6', text: '#374151' },
};

export const CONFIDENCE_BAND_BADGE = {
  Critical: { bg: '#991B1B', text: '#FFFFFF' },
  High:     { bg: '#FEE2E2', text: '#991B1B' },
  Medium:   { bg: '#FEF3C7', text: '#92400E' },
  Low:      { bg: '#F3F4F6', text: '#9C9C9C' },
};

export function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-CA', { month: 'short', year: 'numeric' });
}

export function formatDateTime(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatReleaseDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

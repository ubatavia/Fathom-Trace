# Fathom Trace — Lovable Follow-Up Prompt v2.1

## How to Use This File

Two prompts in order:
1. **PROMPT A** — Six targeted functional changes. Paste this first.
2. **PROMPT B** — Version B warm-dark color scheme. Paste this second, after A is confirmed.

Do not rebuild — these are updates to the existing build only.

---

## PROMPT A — Six Targeted Changes

Paste this as a follow-up message in Lovable. Do not start a new project.

---

The following six changes are targeted updates to the existing build. Do not rebuild or restructure anything. Every element described in the original prompt that still exists should stay exactly as-is.

---

**Change 1 — Fix confidence score to 84% and add Anomaly Type badge pair**

The System Confidence card (top right) currently shows 89%. Read `confidence_score` from the `impact_briefs` Airtable record. For Scenario A this is 84, not 89. Update the donut to display the actual field value.

Also update the confidence label logic:
- 80%+ (High/Critical band): "This is a real issue"
- 60–79% (Medium): "Needs further review"
- Below 60% (Low): "Low confidence — verify intent"

Below the confidence percentage and label, add a badge pair displayed inline:

`[Anomaly Type]  ·  [Confidence% Band]`

Read `anomaly_type` and `confidence_band` from the `impact_briefs` record.

Badge colors — Anomaly Type:
- Bug → background #FEE2E2, text #991B1B
- Degradation → background #FEF3C7, text #92400E
- Intentional Restriction → background #CCFBF1, text #0F766E
- New Baseline → background #EDE9FE, text #5B21B6
- Unknown → background #F3F4F6, text #374151

Badge colors — Confidence Band:
- Low → grey background, grey text
- Medium → amber tint, amber text
- High → #FEE2E2 background, #991B1B text (matches Bug — high confidence is alert-level)
- Critical → deep red background, white text

For the current demo state: shows `[Bug]  ·  [84% High]`

---

**Change 2 — Low Confidence Flag banner**

Inside the Impact Brief content area, between the narrative paragraph and the first accordion ("What triggered this"), add a conditional banner.

Show this banner ONLY when `low_confidence_flag = true` in the `impact_briefs` record.

Visual:
- Background #FFFBEB, border 1px solid #F59E0B, border-radius 8px, padding 12px 16px
- Warning icon (⚠ or similar) left-aligned
- Bold heading: "Low Confidence Flag"
- Body text — choose based on `anomaly_type`:
  - Intentional Restriction: "This pattern may reflect intentional design — phased rollout, invite-only access, or eligibility gate — rather than a system failure. Human review required to confirm intended behavior before any action."
  - New Baseline: "No historical baseline exists for this product area. Fathom Trace cannot classify confidently. Human must confirm expected behavior to seed the baseline."
  - All other low confidence: "Signal pattern is insufficient for a high-confidence diagnosis. Human review recommended before action."

Hidden entirely for Scenario A (Bug, 84%, low_confidence_flag = false).
Visible for Scenario B (Intentional Restriction, 52%, low_confidence_flag = true).

---

**Change 3 — Mark as Expected Behavior button**

In the "Your Decision" section, add a fourth button conditionally:

Show "Mark as Expected Behavior" ONLY when `anomaly_type` is "Intentional Restriction" or "New Baseline".

Visual:
- Background #0D9488 (teal), text white, same size and border-radius as other decision buttons
- Label: "Mark as Expected Behavior"

On click: open the same confirmation modal as other decisions. On confirm:
- POST to the W4 webhook with `"decision": "expected_behavior"` (same payload structure as the other buttons)
- After successful POST: replace buttons with a single line "Expected behavior confirmed at {time}." in secondary grey

Also add a one-line label ABOVE all decision buttons if not already present:
"Fathom Trace does not act automatically — your decision is required."

For Scenario A (Bug): three buttons — Acknowledge, Escalate, Roll back
For Scenario B (Intentional Restriction): four buttons — Acknowledge, Escalate, Roll back, Mark as Expected Behavior

---

**Change 4 — Past Incidents: replace MEDIUM badge + add Scenario B card**

**4a — Replace MEDIUM badge with Anomaly Type badge**

On every Past Incidents card, replace the existing MEDIUM badge with an Anomaly Type badge using the same color system as Change 1. Read `anomaly_type` from Airtable `past_incidents` records.

- Bug → background #FEE2E2, text #991B1B
- Degradation → background #FEF3C7, text #92400E
- Intentional Restriction → background #CCFBF1, text #0F766E

**4b — Add INC-007 card (Scenario B — Credit Card)**

Read from Airtable `past_incidents` — the record with `incident_id = 'INC-007'` is now seeded. It should appear in the Past Incidents grid.

Render it with:
- Teal left border (2px solid #0D9488) to visually distinguish it from Bug-type cards
- Anomaly Type badge: "Intentional Restriction" in teal colors
- A small secondary line below the product area: "Phased rollout by design — no system failure"
- Outcome badge: "Expected Behavior" in teal (#0D9488) rather than "Bug Confirmed" in red

This card should be immediately legible as different from the other six — the teal border and teal badge make it stand out.

---

**Change 5 — Social Trust signal card (fifth card)**

Add a fifth card to the Warning Signs section. Read from Airtable `signal_feeds` where `signal_type = 'social_trust'` and `deployment_id` matches the active deployment.

Card visual (match existing card style but with a distinguishing background):
- Card background: very light lavender tint (#F5F3FF) to mark it as an external signal
- Icon: speech bubble or social/network icon
- Label: "Social Trust"
- Primary value — map `value` field to directional text:
  - 1 → "Stable ↔"
  - 2 → "Declining ↘"
  - 3 → "Falling Fast ↓↓"
- Secondary line: "External — Reddit, App Store"
- Small authenticity note below: "Avg authenticity: {post_authenticity_weight * 100}%" (e.g. "Avg authenticity: 78%")
- Delta/status label: "Signal is declining" in muted brick colour when value ≥ 2

When expanded (on click):
- Show the 3 post snippets from `social_post_snippets` (parse as JSON array)
- Each snippet: truncated to 1 line, with a "Reddit" or "External" source badge, and an authenticity label based on post_authenticity_weight (≥0.75 = High, 0.5–0.74 = Medium, <0.5 = Low)
- All 3 posts for Scenario A are within the 48hr release window — show at full opacity with label "Within release window"

For Scenario A: value=2 (Declining ↘), 3 RRSP posts, authenticity 78%
For Scenario B: value=2 (Declining ↘), 3 credit card posts, authenticity 61%

---

**Change 6 — Raw Signal View toggle**

In the Warning Signs section header row, right-aligned, add a pill-style toggle:

`[ Fathom Trace View ]  [ Raw Signal View ]`

Toggle style:
- Active state: background #1B2B4B (dark navy), text white
- Inactive state: transparent background, grey text
- Default on load: Fathom Trace View active

When "Raw Signal View" is active:
- Remove delta percentage badges from all signal cards (the "Up 110%" labels)
- Remove color coding — all signal cards revert to a neutral light grey background
- Remove the directional indicator and post snippets from the Social Trust card — show only a plain number
- Change the section heading from "Warning Signs" to "Signal Feeds — Uninterpreted"

When toggling back to Fathom Trace View: restore all interpretation layers.

This toggle replaces any "Raw Signal View" second tab that may have been built. The toggle is the correct implementation — no separate tab needed.

---

## PROMPT B — Version B Warm-Dark Color Scheme

Paste this as a separate follow-up message AFTER Prompt A is confirmed and working.

---

Restyle the entire dashboard to a warm dark theme. Wealthsimple's design system is built on their Dune brown (#32302F) and white. This version extends Dune into dark mode — no saturated accents. Hierarchy comes from typography weight and very subtle warm tints only.

**Page and card surfaces:**
- Page background: #1E1C1A
- Card surface: #32302F (Dune — the card itself becomes the brand colour)
- Card border: 1px solid #3E3C3A
- Secondary surface (modals, expanded sections): #2A2826
- Dividers: 1px solid #3E3C3A

**Text:**
- Primary text: #F0ECE6 (warm off-white — not stark white)
- Secondary / label text: #908884
- Tertiary / disabled: #605C5A
- Interactive accent (hover states, active indicators only — not decorative fills): #C4AE90

**Status badges — same badge pair from Change 1, but dark-mode tinted:**
- Bug → background #201616, text #8B3A3A
- Degradation → background #201A10, text #7A5A20
- Intentional Restriction → background #0D1F1E, text #0F766E
- New Baseline → background #1A1625, text #5B21B6
- Unknown → background #2A2826, text #605C5A

Confidence band badges:
- Low → #2A2826 background, #605C5A text
- Medium → #201A10 background, #7A5A20 text
- High → #201616 background, #8B3A3A text
- Critical → #3A0000 background, #F0ECE6 text

**Signal card color coding (Warning Signs):**
- Over-threshold: #8B3A3A card accent or border (muted brick)
- Under-threshold: #3E3C3A (same as card border — barely visible)
- Social Trust card background: #1E1A2E (very dark lavender tint)

**Confidence donut:**
- Track colour: #3E3C3A
- Fill at 84% (High): #8B3A3A (muted brick)
- Fill at 52% (Low): #605C5A (warm grey)

**Low Confidence Flag banner:**
- Background: #201A10, border: 1px solid #7A5A20
- Heading: #C4AE90, body text: #908884

**Action buttons — same outlined style, dark-mode adapted:**
- Acknowledge: border 1px solid #605C5A, text #C4AE90, background transparent
- Escalate: border 1px solid #7A5A20, text #7A5A20, background #201A10
- Roll back: border 1px solid #8B3A3A, text #8B3A3A, background #201616
- Mark as Expected Behavior: border 1px solid #0F766E, text #0F766E, background #0D1F1E

**Deployment scenario switcher:**
- Container background: #2A2826
- Border: 1px solid #3E3C3A, border-radius: 8px
- Active scenario pill: background #3E3C3A, text #F0ECE6 (warm off-white)
- Inactive scenario pill: transparent background, text #605C5A
- On hover (inactive): background #3E3C3A, text #908884
- Label text above switcher (if any): DM Sans 11px, #605C5A

**INC-007 Past Incidents card (Intentional Restriction):**
- Left border: 2px solid #0F766E
- Background: slightly lighter than surrounding cards — #3A3836

**Header:**
- Background: #1E1C1A, bottom border: 1px solid #3E3C3A
- "Fathom Trace" wordmark: #F0ECE6 in Cormorant Garamond
- Last updated: #605C5A in DM Sans
- Refresh icon: #908884

**Typography:** Same as Version A — Cormorant Garamond for wordmark and main affected_flow headline only. DM Sans for everything else.

**Design principle:** If something is drawing your eye, it should be because it requires attention — not for decoration. Everything routine should be visually quiet. The only colours that should register are the brick red (active alert) and warm sand (interactive hover).

---

*v2.1 — Prompt A: six targeted changes. Prompt B: Version B warm-dark. Paste in order.*

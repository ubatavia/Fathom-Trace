# Fathom Trace — Lovable Dashboard Prompt

## How to Use This File

1. Go to lovable.dev and create a new project
2. Copy the prompt in the **PROMPT** section below and paste it as your first message
3. Before pasting: replace the two placeholders marked `[REPLACE_WITH_...]`
4. After Lovable generates the first version, use the follow-up prompts at the bottom to refine

---

## Placeholders to Replace Before Pasting

| Placeholder | Replace With |
|---|---|
| `[REPLACE_WITH_AIRTABLE_API_KEY]` | Your current Airtable personal access token (`pat...`) |
| `[REPLACE_WITH_W4_WEBHOOK_URL]` | The webhook URL copied from n8n Workflow 4 |

---

## PROMPT

---

Build a React app called **Fathom Trace**. This is an internal tool for a fintech team. After a release goes out, it watches for signs that clients are being affected — and when something looks wrong, it surfaces a summary for a human to review and decide what to do. The design should feel calm and considered, not like an alert system. Think: clean cards with breathing room, editorial typography, no visual noise.

---

### Data Source: Airtable

All data comes from Airtable REST API. Base ID: `app5MsHEVyYJdJD09`

Airtable API key: `[REPLACE_WITH_AIRTABLE_API_KEY]`

All requests use:
```
Authorization: Bearer [REPLACE_WITH_AIRTABLE_API_KEY]
Content-Type: application/json
```

Base URL for all reads: `https://api.airtable.com/v0/app5MsHEVyYJdJD09/{tableName}`

Poll all tables every 15 seconds. Show a small "Last updated: {timestamp}" in the top right corner. Also provide a manual refresh button.

---

### Layout

Card-based layout. Not a dashboard of panels — a clean vertical flow of cards with generous whitespace between them. Each card is its own self-contained unit with a white or warm off-white background, clean border, and internal padding of at least 24px.

Page structure, top to bottom:

1. **Header** — tool name left, last-updated right. Sticky or static at top.
2. **Top row** — two cards side by side. Left: recent releases (compact). Right: warning signs (wider). These are supporting context cards.
3. **Main card** — the alert / impact summary. This is the centrepiece of the page. It gets the most space and visual weight.
4. **Bottom card** — past incidents. A clean, compact reference table.

Do not use a rigid grid with fixed percentage widths. Let the cards breathe. The top two cards can be roughly 1/3 and 2/3 width, but do not hardcode pixel values — use a flexible two-column layout that collapses gracefully.

---

### Card 1: Recent Releases

Reads from Airtable table `deployments`.

Card heading label: **"Recent releases"**

Display one row per record:
- `release_version` — bold, left. This is the version number (e.g. "v24.4").
- `deploying_team` — small, secondary grey, beneath version. Prefix with "Released by". Example: "Released by Registered Accounts"
- Status badge — right-aligned pill:
  - `monitoring` → label "Watching"
  - `anomaly_detected` → label "Something looks off"
  - `brief_generated` → label "Needs your review"
  - `resolved` → label "Resolved"

Sort: `brief_generated` first, then `anomaly_detected`, then `monitoring`, then `resolved`.

When the demo runs, `deploy-v24.4-20260224` will have status `brief_generated` — it appears at the top with the alert badge.

---

### Card 2: Warning Signs

Reads from Airtable table `signal_feeds`. Filter to records where `deployment_id` matches the most recent deployment that is not `resolved`.

Card heading label: **"Warning signs"**

Display one row per record. Each row has:
- A human-readable signal label (left)
- A horizontal bar showing deviation severity, capped at full width (middle)
- A plain-language delta value (right)

Signal label mapping (use these exact labels, not the field values):
- `support_contacts` → "Support calls"
- `completion_rate` → "Completions"
- `error_rate` → "Errors"
- `app_review` → "App reviews"

Delta value display — write it in plain language, not raw numbers:
- `support_contacts` over threshold (delta_pct > 50): show `Up {delta_pct}% from normal` in muted brick colour
- `error_rate` over threshold (delta_pct > 30): show `Up {delta_pct}% from normal` in muted brick colour
- `completion_rate` below threshold (delta_pct < -15): show `Down {abs(delta_pct)}% from normal` in muted brick colour
- `app_review` over threshold (value > 2): show `{value} new reviews` in muted ochre colour
- Signals within normal range: show `Within normal range` in secondary grey

Horizontal bar fill: use `delta_pct` as fill percentage, capped at 100%. Over-threshold bars use the muted brick fill colour from the style spec. Under-threshold bars use the neutral border colour.

---

### Card 3: What Happened (Impact Summary)

This is the main card. It is the centrepiece of the page.

Reads from Airtable table `impact_briefs`. Show the most recent record where `status` is `pending_review`.

If no record exists: show a quiet empty state — "Nothing to review right now. The system is watching." centred in the card, in secondary grey text. No icons, no animations.

When a brief exists, render the card with these sections:

**Top of card — alert header**
- Small label in secondary grey, small caps: "Impact alert"
- Below that, in large Cormorant Garamond: `{affected_flow}` — this is the name of the affected feature or flow. This is the headline of the card.
- Below that in secondary grey: `{release_version}  ·  {affected_segment}`

**Confidence line**
- Plain text: "The system is {confidence_score}% confident this is a real issue."
- Followed by a horizontal confidence bar. Width = confidence_score out of 100.

Thresholds (fixed — match PRD Section 13 exactly):
  - 95–100: muted brick bar — add: "Very high confidence. Escalate immediately."
  - 80–94: muted brick bar (demo scenario hits here at 84%) — alert tier, "High Confidence"
  - 60–79: muted ochre bar — add: "Low confidence — use your own judgment here."
  - below 60: grey bar — add: "Still watching. Not enough signal yet."

**Clients affected**
- One line: "About {estimated_affected_users} clients may be affected."
- Use secondary grey. No amber colouring — keep it calm.

**What triggered this** (replaces "SIGNALS" label)
- Section label in small caps, secondary grey: "What triggered this"
- Render `signal_summary` field — it is a JSON object. Parse it and display as a simple bullet list.
- Write each bullet in plain language. Example: instead of `support_contacts_delta: +340%`, write `• Support calls are up 340% from normal`
- Use the same plain-language format as Card 2

**We've seen this before** (replaces "PATTERN MATCH" label)
- Section label in small caps, secondary grey: "We've seen this before"
- `pattern_match_id` — display as a subdued reference tag (e.g. "INC-2024-003")
- `pattern_match_summary` — render as paragraph text

**Full summary**
- Section label in small caps, secondary grey: "Full summary"
- Render `full_brief_text` with `white-space: pre-wrap` — preserve all line breaks and bullet characters. Do not truncate.
- Use the monospace font at 13px.

**Your decision** (replaces "Action Buttons")
- Section label in small caps, secondary grey: "Your decision"
- Three buttons, displayed left to right:

```
[ Acknowledge ]     [ Escalate ]     [ Roll back this release ]
```

On click, open a confirmation card or modal:
- Heading: "Confirm: {action}"
- Optional text field with placeholder: "Add a note (optional)"
- Two buttons: "Confirm" and "Cancel"

On Confirm, POST to the webhook:

```
POST [REPLACE_WITH_W4_WEBHOOK_URL]
Content-Type: application/json

{
  "brief_id": "{brief_id from record}",
  "deployment_id": "{deployment_id from record}",
  "decision": "{acknowledge | escalate | rollback}",
  "decided_by": "Demo User",
  "decided_at": "{ISO 8601 timestamp of click}",
  "notes": "{text from notes field, empty string if blank}"
}
```

After successful POST:
- Show a brief toast: "Decision saved."
- Replace the three buttons with a single quiet line: "{Action} recorded at {time}." in secondary grey.
- Keep the full card visible — do not collapse or hide it.

If POST fails: show toast: "Couldn't save your decision. Try again." Do not expose internal system details in the error message.

---

### Card 4: Past Incidents

Reads from Airtable table `past_incidents`. Show all records as a clean, minimal table.

Card heading label: **"What we've seen before"**

Table columns — use these exact column headings (not the field names):
- "When" — from `date`, formatted as "Mar 2024"
- "What happened" — from `product_area`
- "Who was affected" — from `affected_segment`
- "Time to fix" — from `resolution_time_hours`, formatted as "{n} hours"

Sort by `date` descending. Show all 6 rows. No pagination.

This card is read-only — no interaction.

---

### Visual Style

Two versions are provided below. Build **Version A** first. If you want to compare a warm-dark alternative, use **Version B** as a follow-up prompt after the first build.

---

#### VERSION A — Wealthsimple Light (use this first)

Wealthsimple's actual design language: light mode, editorial serif headings, their Dune primary colour, generous whitespace. Source: fabric.wealthsimple.com.

**Colours:**
- Page background: `#FFFFFF`
- Panel / card background: `#F7F6F3` (warm off-white)
- Card border: `1px solid #E8E6E0`
- Primary text: `#32302F` (Wealthsimple Dune)
- Secondary / label text: `#9C9C9C`
- Dividers between panels: `1px solid #E8E6E0`
- No accent colour. Dune is the only action colour. Do not introduce orange or any other accent.

**Status badge style — pill, not a full background fill:**
- `brief_generated` / alert active: `#8B3A3A` text on `#FDF0F0` background, label "Needs your review"
- `anomaly_detected` / warning: `#8C6A2A` text on `#FDF6EC` background, label "Something looks off"
- `monitoring` / clear: `#9C9C9C` text on `#F3F4F6` background, label "Watching"
- `resolved` / resolved: `#3A6B4A` text on `#F0F7F2` background, label "Resolved"

All pill backgrounds are very pale tints — barely noticeable. The colour lives in the text, not the fill.

**Confidence bar colours — muted, no saturated tones:**
- 85–100: `#3A6B4A` (muted sage green)
- 70–84: `#8C6A2A` (warm ochre — demo scenario hits here at 84%)
- 50–69: `#8C5A2A` (muted amber-brown)
- below 50: `#9C9C9C` (grey)

**Signal bar colours:**
- Over-threshold: `#8B3A3A` bar fill (muted brick — matches alert badge text)
- Under-threshold: `#E8E6E0` bar fill (same as card border — neutral, unobtrusive)

**Typography:**
- Headings (panel titles, card header): `'Cormorant Garamond'`, weight 600, loaded from Google Fonts. Closest Google Fonts equivalent to Wealthsimple's Caslon editorial serif.
- Body / data text: `'DM Sans'`, weight 400/500, loaded from Google Fonts. Geometric sans, Futura-adjacent.
- Monospace (full_brief_text block): `'JetBrains Mono'` or system monospace, 13px

**Layout:**
- No shadows. Clean flat borders only.
- Generous vertical padding inside cards — at least 24px.
- Panel headings: small caps, `#9C9C9C`, `'DM Sans'` 11px letter-spaced — not Cormorant.

**Action buttons — outlined style, no filled backgrounds except Rollback:**
All three buttons use a 1px border, 4px border-radius, transparent background at rest. They are differentiated by border and text colour only — not by fill.
- Acknowledge: border `1px solid #32302F`, text `#32302F`. On hover: background `#F7F6F3`. This is the default/neutral action.
- Escalate: border `1px solid #8C6A2A`, text `#8C6A2A`. On hover: background `#FDF6EC`. Elevated urgency signalled by colour shift only.
- Rollback: border `1px solid #8B3A3A`, text `#8B3A3A`, background `#FDF0F0` (very pale red tint at rest — the only button with a persistent background fill, signalling it is destructive). On hover: background `#FAE0E0`.

**Header:**
- Left: `Fathom Trace` in Cormorant Garamond, 22px, weight 600, colour `#32302F`
- Right: `Last updated: {time}` in DM Sans 12px `#9C9C9C` + small refresh icon button in `#9C9C9C`
- Header background: `#FFFFFF`, bottom border `1px solid #E8E6E0`

**Card headings:**
- Each card has a heading label. Use DM Sans, 11px, small caps, letter-spaced, `#9C9C9C`. These are the quiet labels above each card's content: "Recent releases", "Warning signs", "What happened", "What we've seen before".
- The main card (What happened) has a large Cormorant Garamond headline below the card heading: the `affected_flow` value. This is the most prominent text on the page.

---

#### VERSION B — Wealthsimple Warm-Dark (compare after Version A)

Wealthsimple's confirmed design system is exactly two colours: Dune (`#32302F`) and White. Their orange is a marketing/CTA colour — not a UI system colour. This dark version builds the entire palette by extending Dune downward into dark surfaces and upward into warm text. **No orange. No saturated accents.** Hierarchy comes from typography weight and very subtle warm tints, not colour blocks. This is how an internal tool should read inside Wealthsimple's design language.

Paste this as a follow-up message in Lovable on a fresh project to compare:

> Rebuild this dashboard using a warm dark theme. Wealthsimple's design system is built entirely on their Dune brown (#32302F) and white. This version extends Dune into dark mode with no saturated accents — hierarchy comes from type weight and subtle warm tints only.
>
> **Colours:**
> - Page background: `#1E1C1A` (Dune pushed darker)
> - Panel / card surface: `#32302F` (exactly Wealthsimple Dune — the card itself becomes the brand colour)
> - Card border: `1px solid #3E3C3A` (barely-there warm divider)
> - Secondary surface (modals, dropdowns): `#2A2826`
> - Primary text: `#F0ECE6` (warm off-white — not stark white)
> - Secondary / label text: `#908884` (warm mid-grey)
> - Tertiary / disabled text: `#605C5A`
> - Interactive accent: `#C4AE90` (warm sand — used only for hover states and active indicators, not as a general fill colour)
> - Dividers between panels: `1px solid #3E3C3A`
>
> **Status badges — pill style, very muted. Colour is in the text only, not the background fill:**
> - `brief_generated` / Alert: `#8B3A3A` text on `#201616` background — dark brick, barely-there red tint
> - `anomaly_detected` / Warning: `#7A5A20` text on `#201A10` background — dark ochre, barely-there amber tint
> - `monitoring` / Monitoring: `#605C5A` text on `#2A2826` background — barely differentiated from surface
> - `resolved` / Resolved: `#3A5E42` text on `#141E16` background — muted sage, barely-there green tint
>
> **Confidence bar colours — muted, no bright colours:**
> - 85–100: `#3A5E42` (muted sage green)
> - 70–84: `#7A5A20` (muted dark ochre — demo scenario hits here at 84%)
> - 50–69: `#7A4A20` (muted dark amber-brown)
> - below 50: `#605C5A` (warm grey — same as tertiary text)
>
> **Signal bars:**
> - Over-threshold fill: `#8B3A3A` (muted brick — same as alert badge text)
> - Under-threshold fill: `#3E3C3A` (same as border — almost invisible until triggered)
>
> **Action buttons — text-weight hierarchy, not filled colour blocks:**
> - Acknowledge: border `1px solid #605C5A`, text `#C4AE90` (warm sand), background transparent. This is the least urgent action and should look it.
> - Escalate: border `1px solid #7A5A20`, text `#7A5A20` (ochre), background `#201A10` (barely-there amber tint)
> - Rollback: border `1px solid #8B3A3A`, text `#8B3A3A` (brick), background `#201616` (barely-there red tint). Most alarming but still muted — the border and text do the work, not a saturated fill.
>
> **Typography:** Same as Version A — Cormorant Garamond for all headings and the tool name, DM Sans for body, labels, and data rows.
>
> **Header:** Background `#1E1C1A`, bottom border `1px solid #3E3C3A`. Title `Fathom Trace` in Cormorant Garamond, `#F0ECE6`. Last updated in DM Sans `#605C5A`. Refresh icon in `#908884`.
>
> **Design principle for this version:** If a colour is drawing your eye, it should be drawing your eye because something genuinely needs attention — not for decoration. Everything that is routine should be visually quiet.

---

### Error States

- If Airtable request fails: show a small inline error next to the relevant card heading: "Could not load — retrying…"
- Do not crash the whole dashboard on a single card error
- Continue polling even after errors

---

### Raw Signal View — Second Tab

Add a second tab to the dashboard labeled **"Raw Signal View"**.

This tab is used at the 0:50 mark of the demo for exactly 8 seconds, then the presenter switches back to the main tab. Its purpose is to show what the data looks like *without* Fathom Trace — four disconnected charts, no interpretation, no baseline context. The contrast between this tab and the main tab is the core demo persuasion moment.

**Data source:** Same `signal_feeds` records as the Warning Signs card, filtered to the active deployment.

**Layout:** Four separate line charts or bar charts in a 2×2 grid. One per `signal_type`.

Each chart shows:
- Signal label (e.g., "Support Calls", "Errors", "Completions", "App Reviews")
- Raw `value` on the y-axis
- `timestamp` on the x-axis
- No baseline line
- No delta badge or colour-coding for good/bad
- No anomaly flag or threshold marker
- No AI interpretation text whatsoever

**Style:** Deliberately sparse and unconnected. No red/amber status colours. No delta values. Just numbers moving with no context. If the main tab is connected and diagnostic, this tab should feel like looking at raw telemetry from four separate systems that don't know each other exist.

---

### Do Not Build

- No login or authentication — this is a demo tool
- No multi-deployment history navigation — show current deployment only
- No mobile layout — desktop only

---

## Follow-Up Prompts (Use After First Generation)

Use these as follow-up messages in Lovable if the first pass needs adjustments:

**If the layout feels like a dashboard panel grid rather than cards:**
> The layout should feel like a clean vertical flow of cards — not a rigid panel grid. Each card should have its own white or warm off-white background, internal padding of at least 24px, and clear space between cards. The top two cards (Recent Releases and Warning Signs) sit side by side in a flexible two-column layout. The main card (What Happened) is full width and gets the most visual weight. The bottom card (What We've Seen Before) is also full width. Remove any fixed percentage widths or px constraints between sections.

**If labels or headings use technical/engineering language:**
> Replace all technical field names with plain human language wherever they appear as visible UI text. Use these exact replacements: "Active Deployments" → "Recent releases". "Signal Feed" → "Warning signs". "Impact Brief" → "What happened". "Incident History" → "What we've seen before". "SIGNALS" → "What triggered this". "PATTERN MATCH" → "We've seen this before". "Anomaly Detected" badge → "Something looks off". "Brief Ready" badge → "Needs your review". "Monitoring" badge → "Watching". Status values like `brief_generated` or `pending_review` should never appear as visible text.

**If confidence bar is missing or wrong (Version A):**
> The confidence bar in the "What Happened" card should be a horizontal progress bar from 0 to 100. For the demo scenario, confidence_score is 84, which falls in the 80–94 range (High Confidence tier) — colour the bar #8B3A3A (muted brick, same as alert badge text). Bar width should be 84% of the full card width. Do not use ochre at 84% — that is the 60-79 range. The line above it should read: "The system is 84% confident this is a real issue."

**If confidence bar is missing or wrong (Version B):**
> The confidence bar in the "What Happened" card should be a horizontal progress bar from 0 to 100. For the demo scenario, confidence_score is 84, which falls in the 80–94 range (High Confidence tier) — colour the bar #8B3A3A (muted brick). Bar width 84% of card width. Do not use dark ochre at 84% — that is the 60-79 range. The line above it should read: "The system is 84% confident this is a real issue."

**If the Raw Signal View tab is missing or wrong:**
> Add a second tab labeled "Raw Signal View". It shows the same signal_feeds data as the Warning Signs card, but as four separate charts (one per signal_type) in a 2×2 grid. Each chart shows only the raw value over time — no baseline line, no delta badge, no colour-coding, no interpretation text. The style should be deliberately sparse: just numbers moving with no context. This is the before-state used at the 0:50 mark of the demo for 8 seconds before switching back to the main tab.

**If action buttons need fixing:**
> The three decision buttons (Acknowledge, Escalate, Roll back this release) should each open a confirmation modal before sending any data. The modal heading should be "Confirm: {action}". It should have an optional text field with placeholder "Add a note (optional)". Only POST when the user clicks Confirm — not on the initial button click.

**If warning signs bars are not rendering (Version A):**
> The Warning Signs card should show one row per Airtable record from signal_feeds. Use the delta_pct field as the bar fill percentage, capped at 100%. Over-threshold bars use fill colour #8B3A3A (muted brick). Under-threshold bars use #E8E6E0 (neutral, same as card border). The text label next to each bar should be written in plain language: "Up 340% from normal" not "+340%".

**If warning signs bars are not rendering (Version B):**
> The Warning Signs card should show one row per Airtable record from signal_feeds. Use delta_pct as bar fill, capped at 100%. Over-threshold fill: #8B3A3A. Under-threshold fill: #3E3C3A. Plain language label: "Up 340% from normal" not "+340%".

**If fonts are not loading:**
> Add Google Fonts imports for 'Cormorant Garamond' (weights 400, 600) and 'DM Sans' (weights 400, 500) to the index.html head. Cormorant Garamond is used in exactly two places: the "Fathom Trace" tool name in the header, and the large `affected_flow` headline inside the main "What happened" card. Everything else — card labels, body text, table rows, badges, buttons, secondary text — uses DM Sans.

**If orange or any bright accent colour appears:**
> Remove all orange, yellow, or other accent colours from the UI. This tool uses only two colours for structure: Dune (#32302F) for primary text and interactive borders, and white/warm off-white for backgrounds. The only colours permitted beyond these are the muted status tints (very pale brick, ochre, sage, grey) used in badges and the confidence bar. If Lovable added orange buttons, orange hover states, or any bright interactive colour — replace them with Dune (#32302F) borders and text on a transparent or warm off-white background.

**If the full summary text is truncating:**
> The full_brief_text field contains newlines and bullet characters. Render it with white-space: pre-wrap so all line breaks are preserved. Do not truncate or collapse it.

**If polling is not working:**
> Fetch all four Airtable tables on a 15-second interval using setInterval inside a useEffect. Plain fetch calls only — no library. The API key goes in the Authorization header as a Bearer token.

---

## Airtable Field Reference (Quick Copy)

### `deployments` fields used:
`release_version`, `deploying_team`, `release_datetime`, `status`

### `signal_feeds` fields used:
`signal_type`, `value`, `baseline_value`, `delta_pct`, `deployment_id`, `notes`

### `impact_briefs` fields used:
`brief_id`, `deployment_id`, `confidence_score`, `affected_flow`, `affected_segment`,
`estimated_affected_users`, `signal_summary`, `pattern_match_id`, `pattern_match_summary`,
`full_brief_text`, `status`

### `past_incidents` fields used:
`incident_id`, `date`, `product_area`, `affected_segment`, `resolution_time_hours`

---

*File created: 2026-02-28 | Fathom Trace build — Wealthsimple AI Builder submission*

# Fathom Trace — Demo Recording Guide
## Target runtime: 2:30–2:45 | Hard limit: 3:00
## Last updated: 2026-03-01 (v3 — tight script, corrected W3 timing)

---

## What the submission is looking for

Every section of this demo must satisfy at least one of these criteria. They are called out inline below.

| Criterion | Where it lands |
|---|---|
| What AI is responsible for | The Signals + The Connection — shown live |
| Where AI must stop | The Human Decision — "does not make this call" |
| Human's role clearly defined | The Human Decision — "judgment, not investigation" |
| One critical decision that remains human — and why | Escalate: CIRO compliance + can't distinguish intent from anomaly |
| System handles positive and negative cases | Credit Card tab — same system, different judgment |
| What the human can now do that they couldn't before | The Close — hours to minutes, every deployment, simultaneously |

---

## 1. Loom Setup

Do this before anything else.

- Open Loom → **Window** recording mode → select Browser Window A only
- Set resolution to **1080p** — confirm in Loom settings
- Do a 15-second test record: confirm Browser Window B (second monitor) does NOT appear
- **Do Not Disturb on**
- Hide bookmarks bar: `Ctrl + Shift + B` (Windows)
- Do not start recording yet

---

## 2. Browser Setup

**Browser Window A** (Loom records this):

| Tab | What |
|---|---|
| Tab 1 | Lovable dashboard — RRSP Contribution tab active |
| Tab 2 | `before-fathom-trace.html` — 5 siloed team tool cards |

**Browser Window B** (second monitor — never recorded):

| Tab | What |
|---|---|
| Tab 1 | n8n — W3 workflow open, execute button visible |
| Tab 2 | Airtable — `impact_briefs` table open |

---

## 3. Pre-Recording Run

**Important:** After reset, the dashboard is in "monitoring" state — calm, no brief, signals quiet. This is your opening screen. W3 is triggered during recording (see W3 timing below) so the dashboard activates live.

Run in Claude Code terminal:

```bash
AIRTABLE_API_KEY=pat... AIRTABLE_BASE_ID=app5MsHEVyYJdJD09 node "Fathom Trace/scripts/reset-demo.js"
```

Then confirm:

1. **Lovable dashboard (Tab 1):** deployment card shows monitoring badge, Warning Signs quiet, no brief visible
2. **before-fathom-trace.html (Tab 2):** 5 siloed team tool cards visible
3. **n8n (Window B, Tab 1):** W3 workflow open, execute button visible and ready
4. **Airtable (Window B, Tab 2):** `impact_briefs` table open, ready for manual update

Everything confirmed? Start Loom now.

---

## W3 Trigger Timing (critical)

| Time | Action |
|---|---|
| 0:28 | Glance to Window B → hit W3 execute → back to Window A. Takes 3 seconds. |
| 0:28–0:55 | W3 runs in background (~30–60s). Dashboard still in monitoring state. |
| 0:55 | Switch to Tab 2 (before-fathom-trace.html) |
| 0:55–1:10 | **While on Tab 2:** Alt+Tab to Window B → Airtable → open new impact_briefs record → set `estimated_affected_users` to `285000` → save → Alt+Tab back |
| ~1:10 | Switch back to Tab 1 — dashboard now shows "Needs review", brief visible |

**Why 0:28:** Disaster story (0:00–0:30) is voice only with no screen shown. W3 triggered at 0:28 has maximum run time before the switch back at 1:10.

---

## 4. The Recording

---

### [0:00–0:30] The Disaster Story
*~45 words. Screen: nothing — blank or face cam only. Voice only. At 0:28 trigger W3 on Window B.*

> "It's Thursday. VP walks over.
>
> 'Can we ship the RRSP validation update before Monday? Leadership wants shipping velocity.'
>
> Friday — shipped. Weekend — quiet.
>
> Monday, someone pings you on Slack. 'Why are RRSP support tickets through the roof?'
>
> [beat]
>
> You have no idea. By the time anyone connects the dots — it's Wednesday.
>
> The fix took six hours. The damage took two days.
>
> Same Monday. Let's run it back — with Fathom Trace."

---

### [0:30–0:55] The Deployment
*~35 words. Screen: reveal the dashboard — monitoring state. Point to deployment card and monitoring badge.*

**→ Show dashboard.** Deployment card visible — v24.4, RRSP and TFSA Accounts, monitoring badge.

> "Version 24.4 ships Monday morning — a change to RRSP contribution limit validation for clients holding multiple registered accounts.
>
> Fathom Trace ingests the deployment. Four hours later — it flags this."

**→ Point cursor at the deployment badge.**

---

### [0:55–1:25] The Signals
*~65 words. Switch tabs at 0:55 — keep talking through the switch. No pause, no narrating the switch.*

**→ Switch to Tab 2** (`before-fathom-trace.html`). Hold 8 seconds. While talking here, Alt+Tab to Window B and do the Airtable manual update.

> "This is the before. Five systems, five teams. Nobody watching all five at once.
>
> That's not a process failure — there's just no system that does that."

**→ Switch back to Tab 1.** Warning Signs shows all 5 signal cards active.

> "Here's what Fathom Trace sees.
>
> Support contacts tagged RRSP contribution error — up 340%.
>
> [pause]
>
> Transaction completion on the RRSP flow — down 28%, but only for v24.4 clients who also hold a TFSA. Error rate elevated. App reviews declining. Social sentiment down.
>
> [pause]
>
> No single signal is loud enough. Together, they tell a story.
>
> Fathom Trace sees all five. Simultaneously."

*[SUBMISSION: AI responsibility — cross-system signal correlation across 5 independent sources simultaneously. This is the core cognitive work.]*

---

### [1:25–1:50] The Connection
*~50 words. Scroll to Impact Brief. The confidence score (84%) is in the brief body text — reference it there, not as a separate visual.*

**→ Scroll to Impact Brief section.**

> "Fathom Trace cross-references every signal against institutional memory. Match found — March 2024. Same flow, same segment, same shape.
>
> Root cause: contribution limit validation running sequentially instead of independently. Fixed in six hours.
>
> Confidence: 84%.
>
> [pause]
>
> At 84 — someone needs to look at this right now. Not in six hours."

**→ Point to the "84% confident" line in the brief text.**

*[SUBMISSION: AI responsibility — pattern matching against institutional memory, confidence scoring. Shows AI doing diagnosis work that no human could do at this speed.]*

---

### [1:50–2:20] The Human Decision
*~65 words. Cursor to decision buttons. Say the KEY lines flat — do not rush them.*

**→ Scroll to "Your Decision" section.** Three buttons visible: Acknowledge / Escalate / Roll back.

> "The brief has everything. The PM's job: judgment, not investigation.
>
> Fathom Trace does not make this call.
>
> [beat — silence, do not fill it]
>
> A rollback on registered accounts may trigger CIRO compliance reporting. That requires a human.
>
> And here's the other reason."

**→ Click Credit Card tab** (deployment switcher, top of page).

> "Same week, different deployment. 52% confidence. The PM called it intentional product behavior. Case closed. No escalation.
>
> Fathom Trace doesn't know the difference between a bug and a deliberate product decision."

**→ Switch back to RRSP tab.**

> "Fathom Trace knows what's anomalous. The human knows what's intentional. Both are required."

**→ Click "Escalate"** → confirmation modal → click **Confirm** → "Decision recorded" bar replaces buttons.

*[SUBMISSION: Where AI stops — explicit. Human role defined — judgment not investigation. One decision that stays human — regulatory + contextual. Both positive and negative cases shown — RRSP (bug) and Credit Card (expected behavior).]*

---

### [2:20–2:40] The Close
*~30 words. Scroll to top. Short and confident.*

**→ Scroll to top.** Full dashboard visible. RRSP tab active.

> "The fix is identical to 2024. The difference is when.
>
> *(pause)*
>
> **Fathom Trace compresses a lag measured in hours to a signal measured in minutes — across every deployment, simultaneously.**
>
> *(beat)*
>
> That's the system."

**→ Hold on dashboard — 3 seconds — stop Loom.**

*[SUBMISSION: What the human can now do that they couldn't before — hours to minutes, across every deployment, simultaneously. The "simultaneously" matters — this is scale, not just speed.]*

---

## 5. Delivery Rules

| Moment | Rule |
|---|---|
| "You have no idea." | Flat delivery. No inflection. That's the punchline. |
| Tab switch at 0:55 | Keep talking through it. Never narrate the switch. |
| Return from Tab 2 | Don't pause to describe the signals — say them. |
| "340%... 28%..." | Pause after every number. Don't chain them. |
| "Fathom Trace does not make this call." | Flat and firm. Then hold the silence — it lands. |
| Credit Card tab switch | Matter-of-fact. One breath. Don't linger on it. |
| Decision click | **Escalate only** — never Rollback. Rollback reads as alarming. |

---

## 6. After Recording

1. Watch it back immediately
2. Check: pacing on numbers, dead air on tab switches, beat after "does not make this call"
3. **If over 3:00:** Drop "The fix took six hours. The damage took two days." from the opening. Saves ~5 seconds.
4. Export at 1080p from Loom
5. Mark Step 5 items done in checklist.md

---

## 7. If Something Breaks

| Problem | What to do |
|---|---|
| Brief not in Lovable when you start | Wait 15s — Lovable polls every 15s. Still missing: refresh manually. |
| estimated_affected_users showing wrong | You forgot the manual Airtable step. Pause, fix it, restart. |
| Dashboard blank | Open Airtable `impact_briefs` directly — show raw record, narrate from it. |
| Brief truncated or wrong | Pre-generate a complete brief, paste into Airtable `full_brief_text` before recording. |
| Recording crashes mid-take | Record in segments: (1) Story + Deployment, (2) Signals + Connection, (3) Decision + Close. Cut in iMovie. |
| W4 POST fails on camera | Click button, skip the modal, keep talking. The argument is more important than the confirmation visual. |
| Credit Card tab not loading | Skip the tab switch. Say verbally: "Same week — different deployment. PM looked at it. Called it intentional. Case closed." |

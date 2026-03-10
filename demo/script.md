# Fathom Trace — Demo Script
## Target runtime: 2:45–2:55 | Hard limit: 3:00
## Last updated: 2026-03-01

---

## Pre-Recording Checklist

Run these in order before starting screen capture.

- [ ] `reset-demo.js` run — impact_briefs cleared, deployment status back to `monitoring`
- [ ] n8n W3 triggered manually — wait for all nodes green
- [ ] Airtable → `impact_briefs` → new record → set `estimated_affected_users` to `285000`
- [ ] Wait 2 polling cycles (30 seconds) for Lovable to pick up the brief
- [ ] Lovable dashboard open — RRSP tab active, "What happened" card shows 84% confidence brief
- [ ] `before-fathom-trace.html` open in second browser tab (adjacent, ready to switch to)
- [ ] Bookmarks bar hidden, all other tabs closed
- [ ] Do Not Disturb on
- [ ] Mic tested — quiet room
- [ ] Recording app ready but not started

---

## How to Read This Script

```
SPOKEN WORDS appear like this — read these aloud.

[SCREEN: directions appear like this] — what to show or click.
[pause] — deliberate silence, 1–2 seconds.
... — natural breath break within a sentence.
(beat) — slightly longer pause, let it land.
```

Key phrases marked **[KEY]** must be said verbatim — stress-tested language.

---

## Script

---

### [0:00–0:30] The Disaster Story

*~85 words. Voice only or show a static, clean screen. This is the hook — dry, knowing, PM-to-PM.*

---

"It's Thursday afternoon. The VP walks over.

'Can we get that RRSP validation update out before Monday? Earnings call. Leadership wants to see shipping velocity.'

[pause]

You ship Friday morning. Weekend's quiet.

Monday, you're three slides into earnings prep... and someone pings you on Slack.

'Hey — why are RRSP support tickets through the roof?'

(beat)

You have no idea. Support has no idea what changed. Engineering is in standup.

By the time anyone connects those dots — it's Wednesday.

[pause]

The fix took six hours. The damage took two days.

(beat)

Same Monday. Let's run it back — with Fathom Trace."

---

### [0:30–0:55] The Deployment

*~55 words. Show the dashboard — "Recent releases" card, RRSP v24.4 at top with "Watching" badge.*

---

[SCREEN: Dashboard — "Recent releases" card, v24.4 at top with "Watching" badge, Warning Signs shows "Watching for changes."]

"Same scenario. Monday morning. Version 24.4 goes out — a change to how RRSP contribution limits are validated when a client holds multiple registered accounts.

Fathom Trace ingests the deployment record. What changed. Which services. Which clients are in scope.

[SCREEN: Point to the "Watching" badge and the calm Warning Signs state]

Status: watching. The system starts doing what no one else has time to do."

---

### [0:55–1:35] The Signals

*~100 words. Switch to second browser tab at 0:55 — 8 seconds max, then switch back. Keep talking through the switch — no hesitation.*

---

[SCREEN: Switch to second browser tab — before-fathom-trace.html — five separate team tool cards visible — hold for 8 seconds]

"This is the before. Five signals, five systems, five different teams. Each one watching their own number.

Nobody is watching all five simultaneously. That's not a process failure — there's just no system that does that."

[SCREEN: Switch back to Lovable tab — Warning Signs card now showing five activated signal bars]

"Here's what Fathom Trace sees.

Four hours post-release, something shifts. Support contacts tagged 'RRSP contribution error' — up 340% from baseline. Transaction completion on the RRSP flow — down 28%... but only for clients on v24.4 who also hold a TFSA. Error rate on the validation endpoint — elevated. App store reviews: can't contribute to their RRSP. Social sentiment — declining.

[pause]

No single signal is loud enough to trigger a human response. Together, they tell a story.

[pause]

Fathom Trace sees all five. Simultaneously."

---

### [1:35–2:00] The Connection

*~80 words. Scroll to "What happened" card. This is the precision moment — slow down here.*

---

[SCREEN: Scroll to "What happened" card — brief fully rendered, confidence bar visible]

"Here's where it gets precise.

Fathom Trace cross-references every signal against our institutional memory. It finds a match — March 2024. Same flow. Same segment. Same shape.

Root cause then: contribution limit validation running sequentially across accounts instead of independently. Fixed in six hours.

[SCREEN: Point to confidence bar — 84% brick bar]

Confidence: 84%.

[pause]

Weighted across signal strength, segment specificity, and historical match quality.

At 84 — we're not certain. But we're certain enough that someone needs to look at this right now.

Not in six hours. Right now."

---

### [2:00–2:35] The Human Decision

*~105 words. Move cursor to decision buttons. This is where the AI/human line gets drawn. Say it clean and slow. Switch to Credit Card tab briefly after the key lines — then back to RRSP to click.*

---

[SCREEN: Cursor moves to "Your decision" section — three buttons visible]

"The brief has everything. Scope. Signals. The historical match. The PR to check.

The PM's job here is judgment — not investigation. Fathom Trace has done the investigation.

**[KEY]** Fathom Trace does not make this call.

(beat — let it sit)

A rollback at Wealthsimple touches active transactions on registered accounts. It may trigger CIRO compliance reporting. That requires an accountable human.

And here's the other reason.

[SCREEN: Switch to Credit Card tab in the deployment switcher]

Same week. Different deployment. Similar signals — but lower confidence. 52%. The PM who shipped that one looked at it and called it intentional product behavior. Expected. Case closed. No escalation.

[SCREEN: Point to "Expected Behavior recorded" line where decision buttons were]

Fathom Trace doesn't know the difference between a bug and a deliberate product decision.

[SCREEN: Switch back to RRSP tab]

**[KEY]** Fathom Trace knows what's anomalous. The human knows what's intentional. Both are required."

[SCREEN: Click "Escalate" → confirmation modal → Confirm → "Decision recorded" bar replaces buttons]

---

### [2:35–2:55] The Close

*~45 words. Pull back to full dashboard. Short, confident finish — timing is tight here.*

---

[SCREEN: Scroll to top — full dashboard visible, RRSP tab active]

"The fix is identical to 2024. The difference is when.

[pause]

**[KEY]** Fathom Trace compresses a lag measured in hours to a signal measured in minutes — across every deployment, simultaneously.

(beat)

That's the system."

[SCREEN: Hold on dashboard — 3 seconds — stop recording]

---

## Timing Guide

| Section | Words | At 145 wpm | At 130 wpm |
|---|---|---|---|
| The Disaster Story | ~85 | 0:35 | 0:39 |
| The Deployment | ~55 | 0:23 | 0:25 |
| The Signals | ~100 | 0:41 | 0:46 |
| The Connection | ~80 | 0:33 | 0:37 |
| The Human Decision | ~105 | 0:43 | 0:48 |
| The Close | ~45 | 0:19 | 0:21 |
| **Total** | **~470** | **~2:54** | **~3:16** |

Aim for 145 wpm. Tab switches add ~5 seconds of dead time — budget for it. If you're hitting 3:05+ in practice, see "What to Cut" below.

---

## Delivery Notes

- **The opening is dry, not sad.** PM who has been through this — telling it like it is, not venting. Slight smirk on "shipping velocity."
- **"You have no idea."** — flat delivery. That's the punchline. Don't over-sell it.
- **"Let's run it back — with Fathom Trace."** — pause before it. Let the disaster land first.
- **Tab switch at 0:55** — switch to before-fathom-trace.html and keep talking. No narrating the switch.
- **Switch back to Lovable immediately after "there's just no system that does that."** Don't linger on the before-state.
- **Tab switch to Credit Card** — brief, matter-of-fact. One breath. Then switch back.
- **Pause after every number.** "340%." [pause] "28%." [pause] Numbers land when you give them air.
- **"Fathom Trace does not make this call."** — flat and firm. The (beat) after it is deliberate silence. Don't fill it.
- **Escalate, not Rollback** — clicking Rollback reads as alarming out of context.
- Practice 3x minimum. First run finds the stumbles. Second fixes the pacing. Third is your baseline take.

---

## What to Cut If Running Long

Cut in this order — each saves roughly 10 seconds:

1. **Open story — trim the Slack ping detail.** Replace everything from "Monday, you're three slides..." to "Engineering is in standup." with: *"Monday morning, someone pings you. 'Why are RRSP support tickets through the roof?' You have no idea."*
2. **Signals — drop app store and social lines.** Go from error rate directly to "No single signal is loud enough."
3. **Close — it's already trimmed. If still long: cut "The fix is identical to 2024." and start directly with the [KEY] line.**

---

## Submission Criteria Checklist

| Criterion | Where it lands in the video |
|---|---|
| What the human can now do that they couldn't before | The Close — "hours to minutes, every deployment, simultaneously" |
| What AI is responsible for | The Signals + The Connection — shown live |
| Where AI must stop | The Human Decision — "does not make this call" + two reasons |
| Human's role clearly defined | The Human Decision — "judgment, not investigation" |
| One critical decision that must remain human — and why | Escalate/Rollback: CIRO compliance + intentional vs anomalous judgment |
| System handles both positive and negative cases | Credit Card tab — same system, different judgment, expected behavior |

---

## Fallback Scenarios

| What breaks | What to do |
|---|---|
| Brief not in Lovable when you start | Wait 15s — Lovable polls every 15s. Still missing: refresh browser manually. |
| Lovable dashboard blank | Open Airtable `impact_briefs` table directly — show the raw record and narrate from it |
| Brief truncated or incomplete | Pre-generate a complete brief and paste into Airtable `full_brief_text` field before recording |
| Recording crashes mid-take | Record in segments: Story + Deployment as Take 1. Signals + Connection as Take 2. Decision + Close as Take 3. Cut in iMovie. |
| Decision POST to W4 fails on camera | Click the button, skip the modal confirmation, keep talking. The decision visual is secondary to the argument. |
| Credit Card tab not loading | Skip the tab switch, say the Credit Card line verbally only: "Same week — a different deployment. PM looked at it. Called it intentional. Case closed." |

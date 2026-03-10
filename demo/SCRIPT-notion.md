# Fathom Trace — Demo Script

**Target: under 3:00 | Speak at normal conversation pace**

---

## The Disaster Story
*[0:00 — Voice only. No screen. Trigger W3 at 0:28.]*

It's Thursday. VP walks over.

*"Can we ship the RRSP validation update before Monday? Leadership wants shipping velocity."*

Friday — shipped. Weekend — quiet.

Monday, someone pings you on Slack. *"Why are RRSP support tickets through the roof?"*

**... silence ...**

You have no idea. By the time anyone connects the dots — it's Wednesday.

The fix took six hours. The damage took two days.

Same Monday. Let's run it back — with Fathom Trace.

---

## The Deployment
*[0:30 — Show dashboard. Point to deployment card.]*

Version 24.4 ships Monday morning — a change to RRSP contribution limit validation for clients holding multiple registered accounts.

Fathom Trace ingests the deployment. Four hours later — it flags this.

---

## The Signals
*[0:55 — Switch to Tab 2. Keep talking.]*

This is the before. Five systems, five teams. Nobody watching all five at once.

That's not a process failure — there's just no system that does that.

*[Switch back to Tab 1.]*

Here's what Fathom Trace sees.

Support contacts tagged RRSP contribution error — up 340%.

**... pause ...**

Transaction completion on the RRSP flow — down 28%, but only for v24.4 clients who also hold a TFSA. Error rate elevated. App reviews declining. Social sentiment down.

**... pause ...**

No single signal is loud enough. Together, they tell a story.

Fathom Trace sees all five. Simultaneously.

---

## The Connection
*[1:25 — Scroll to Impact Brief.]*

Fathom Trace cross-references every signal against institutional memory. Match found — March 2024. Same flow, same segment, same shape.

Root cause: contribution limit validation running sequentially instead of independently. Fixed in six hours.

Confidence: 84%.

**... pause ...**

At 84 — someone needs to look at this right now. Not in six hours.

---

## The Human Decision
*[1:50 — Scroll to Your Decision. Cursor on buttons.]*

The brief has everything. The PM's job: judgment, not investigation.

**Fathom Trace does not make this call.**

**.......... silence — do not fill it ..........**

A rollback on registered accounts may trigger CIRO compliance reporting. That requires a human.

And here's the other reason.

*[Click Credit Card tab.]*

Same week, different deployment. 52% confidence. The PM called it intentional product behavior. Case closed. No escalation.

Fathom Trace doesn't know the difference between a bug and a deliberate product decision.

*[Switch back to RRSP tab.]*

Fathom Trace knows what's anomalous. The human knows what's intentional. Both are required.

*[Click Escalate → Confirm.]*

---

## The Close
*[2:20 — Scroll to top.]*

The fix is identical to 2024. The difference is when.

**... pause ...**

Fathom Trace compresses a lag measured in hours to a signal measured in minutes — across every deployment, simultaneously.

**... beat ...**

That's the system.

*[Hold 3 seconds — stop recording.]*

# Fathom Trace — Submission Writeup
## Wealthsimple AI Builder Application
## Last updated: 2026-03-01 (Session 14)

---

## 1. Notion Page Structure

**Page title:** Fathom Trace — Wealthsimple AI Builder Submission

**Layout order:**
1. Callout block (grey) — Loom link + one-line context
2. Divider
3. 500-word written explanation (headings + body text blocks)
4. Divider
5. "A note on system design" — redundancy blurb (not counted in 500 words)

**Before submitting:** Share → Anyone with the link → Can view → copy URL

---

## 2. Notion Callout Block (top of page)

```
Demo video — 2:45. Written explanation below.

https://youtu.be/Z7UOOXQwASc
```

---

## 3. The 500-Word Written Explanation

*Word count: 481. Paste section by section into Notion as Heading 2 + body text blocks.*

---

Fathom Trace

Every week at a company like Wealthsimple, deployment signals scatter across five
teams: platform monitoring, support ops, app store reviews, internal analytics,
and external social channels. Nobody watches all five simultaneously. The connection
between a code change and its client impact gets made manually — hours or days later,
after the damage has already compounded.

Fathom Trace closes that gap. It ingests every deployment, monitors the signals that
follow it, and delivers a structured impact brief to a human decision-maker in minutes.

---

What AI is responsible for

Fathom Trace runs a three-call Claude API chain on every flagged anomaly. The structure
is deliberate. Call 1 classifies the anomaly type and severity. Call 2 runs pattern matching against an
institutional incident database, scoring match confidence across signal type, affected
segment, and flow. Call 3 generates the impact brief: confidence score, anomaly type,
affected user estimate, matched historical incident, and recommended next step.

Three calls instead of one prompt because each step needs to be auditable independently.
If the classification is wrong, it's visible before pattern matching runs. If the match
is weak, it surfaces before the brief is generated. Each failure mode has a clear address.

The system applies authenticity weighting to external social signals — posts within the
deployment window carry more weight than posts outside it — filtering noise before it
reaches the brief.

---

What the human can now do

One PM monitors the client impact of every simultaneous deployment — across every product
line, account type, and user segment — in real time. The lag from release to actionable
brief compresses from hours to minutes; the team of analysts it once required becomes
optional. They receive a brief naming the anomaly type, confidence level, the closest
historical match, and the specific PR to review — not just a signal that something is
wrong, but a diagnosis ready for a decision. They also see resolved history alongside
active incidents. The system learns from both outcomes.

---

Where AI must stop

Two reasons the rollback or escalation decision stays human. First, a rollback on RRSP
or TFSA accounts is a regulated financial event that may trigger CIRO reporting
obligations — automated execution is not acceptable. Second, Fathom Trace cannot
distinguish anomalous from intentional. A phased rollout and an access failure look
identical in signal data. Only a human with product context can make that distinction.

---

Stack and production delta

This build: Airtable for signal and incident memory, n8n for orchestration,
claude-sonnet-4-6 for the three-call chain, Lovable for the PM-facing dashboard.
Production would add a direct deployment pipeline webhook, live feed integrations,
and confidence-threshold alerting. The architecture doesn't change. The trigger does.

---

Background

Eight years in product management. One year of hands-on AI development: Maven AI PM
certification, plus independent builds — Hajj savings tracker, personal budgeting
system, Substack pipeline, meeting cost calculator, and this submission — using
Claude API, n8n, Airtable, Lovable, Claude Code, ChatGPT, OpenAI Playground, Cursor,
and Bolt. Fathom Trace was conceived in conversation with Claude and built end-to-end
in Claude Code. Salary expectation: CA$185,000–$192,000 base.

---

## 4. Notion Redundancy Blurb

*Add after a divider below the 500-word piece. Not part of the word count.*
*Use a grey callout block or small body text.*

---

A note on system design

Fathom Trace was conceived in conversation with Claude — problem framing, system
architecture, data schema, and prompt chain — then handed to Claude Code for the
build: Airtable base creation, n8n workflow scripting, Lovable prompt engineering,
and iterative testing. Every layer of the system was built AI-first.

The project was organized as a spec-first file hierarchy inside Claude Code. PRD.md
governed every decision — schema, AI prompt design, UI specification, demo scenario.
architecture/ defined the system before anything was built. prompts/ held each Claude
API call as a standalone document before embedding into n8n nodes. scripts/ handled
reproducible state: setup-airtable.js seeded the base once; reset-demo.js restores
clean state before every recording. demo/ held the live operational layer: narration
script, build checklist, Q&A preparation, the before/after contrast page, and this
document. Claude Code's persistent memory file (MEMORY.md) tracked build state and
decisions across sessions — no context lost between working sessions. Every file has
a single owner and a single responsibility. The system is navigable by anyone.

That same principle extends to the demo itself. Every external dependency has a
documented fallback: if n8n fails, the AI chain can be triggered directly; if Claude
API is slow, the brief is pre-generated; if Lovable's live Airtable connection drops,
a fully self-contained React dashboard — both scenarios hardcoded, zero external
dependencies, identical feature set — serves as an immediate hot swap.

No single point of failure can block the human decision. That's not a demo precaution.
It's the right way to build systems that operate at scale.

---

## 5. Application Form Fields

### "Why Wealthsimple?" (required field)

I've been a Wealthsimple client for years. Not passively — I follow the product
closely, read the Reddit threads on r/PersonalFinanceCanada, and notice when something
changes. I wrote a Substack post arguing Wealthsimple should build a native budgeting
tool — not because it's an obvious feature request, but because the data is already
there and the gap between what clients see and what they could understand about their
own money is significant. That's the version of Wealthsimple I find compelling: one
that keeps closing the distance between people and their financial lives.

That's also why this role matters to me. The AI Builder framing — rebuilding processes
from scratch rather than layering AI onto old workflows — is exactly the right way to
think about it. Most fintech AI is cosmetic. The interesting work is operational:
where does the system take on real cognitive responsibility, and where does the human
need to stay in the loop? At Wealthsimple's scale, with registered accounts, regulatory
obligations, and 3 million clients, those decisions have real consequences.

Fathom Trace is my answer to one version of that question. There are many more worth
building.

---

### "What is the one critical decision in your system that must remain human?" (required field)

Rollback or escalation on a registered account deployment. A rollback affecting RRSP
or TFSA accounts is a regulated financial event that may trigger CIRO reporting
obligations — it cannot be automated. And Fathom Trace knows what's anomalous relative
to history; the human knows what's intentional about the present. A phased rollout
looks identical to an access failure in the signal data. Both perspectives are required
before any action is taken.

---

### "Add link to your submission" field

[Paste Notion page URL here — make page public first]

---

## 6. Pre-Submit Checklist

- [x] Video recorded (OBS) and uploaded to YouTube unlisted — https://youtu.be/Z7UOOXQwASc
- [x] Video link pasted into Notion callout block (Section 2 above)
- [ ] Notion page built — all sections pasted in order
- [ ] Notion page set to public (Anyone with link → Can view)
- [ ] Notion URL copied into "Add link to your submission"
- [ ] "Why Wealthsimple?" pasted into form field
- [ ] Critical decision field filled
- [ ] Salary entered: CA$187,500
- [ ] Submit before March 2, 11:59pm EST
- [ ] Confirm receipt email

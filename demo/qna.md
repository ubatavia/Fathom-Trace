# Fathom Trace — Panel Q&A Prep
## Anticipated questions and rehearsed answers
## Last updated: 2026-02-28

Use these answers verbatim or close to it. Each answer is written to be spoken, not read — short sentences, direct, no hedging.

---

## The System

**Q: Where does the data come from? Is this real data?**

The deployment record and signal feeds are seeded simulation data — realistic patterns based on how Wealthsimple's release cycles and support volumes actually behave. The historical incident database is synthetic but modeled on real incident archetypes in fintech. The AI reasoning is entirely real — live Claude API calls against that data, running in real time.

This is the appropriate scope for a prototype. The point is to demonstrate the reasoning chain, not to connect to production systems I don't have access to.

---

**Q: How did you get the 285,000 affected clients number?**

That's derived, not guessed. Wealthsimple has 3 million clients. Roughly 35% hold an RRSP — that's about 1.05 million. Of those, approximately 55% also hold a TFSA, which gives us about 577,000 dual-account holders. The anomaly is specifically hitting clients who are actively trying to contribute — and the demo scenario is set five days before the RRSP contribution deadline, which is the highest-volume contribution period of the year. At 50% active, that's about 285,000 clients in the direct impact window.

If anything, 285,000 is conservative for that week.

---

**Q: Why 84% confidence? How is that calculated?**

Confidence is a weighted composite of three factors: signal strength accounts for 40% — how many independent signals are elevated and by how much. Segment specificity accounts for 30% — how precisely the anomaly is localized to a specific version, account type, and flow step. Historical match quality accounts for the remaining 30% — how closely the current pattern aligns with a past incident across signal type, affected segment, and resolution pattern.

In this scenario: four signals simultaneously elevated, two above 3x baseline — strong signal strength. The anomaly is isolated to v24.4 clients holding both RRSP and TFSA — high specificity. The March 2024 match aligns on all three dimensions. 84% is the composite output.

At 84, we're not certain. But we're certain enough that a human needs to look at this right now — not in six hours.

---

**Q: What happens if the confidence score is wrong? What if it's a false positive?**

That's exactly what the human is for. Fathom Trace generates the brief and surfaces the evidence — it doesn't act on it. The PM reviewing the brief has product context the system doesn't: they know whether the anomalous behavior is a bug or expected behavior for something genuinely new. A new feature type might generate signals the system has never seen. The human catches that. The boundary between AI analysis and human judgment is the point of the system, not a limitation of it.

---

**Q: What if there's no historical match?**

The system still generates a brief — it just labels the confidence as lower. Without a historical match, the confidence score drops because the 30% historical match quality component scores near zero. The brief says: here are the signals, here is the affected segment, here is the severity — but we don't have a precedent for this pattern. That's still useful. It tells the PM: this is new territory, use your judgment, and when you resolve it, feed the outcome back so the system learns.

---

## The Human Boundary

**Q: Why can't the AI just make the rollback call at 95% confidence?**

Two reasons, and both matter.

First, a rollback at Wealthsimple is a regulated financial event. It affects active transactions on registered accounts — TFSA, RRSP, FHSA, RRIF. It may trigger CIRO compliance reporting obligations. The decision requires an accountable human, not because the AI can't recognize the problem, but because the consequences of acting on that recognition require human accountability.

Second, Fathom Trace knows what's anomalous relative to history. It cannot know whether anomalous behavior is a bug or intentional new behavior. The PM who just shipped a new feature knows the product context the AI doesn't have. Both perspectives are required before any action is taken. The boundary holds at every confidence level — including 95.

---

**Q: Couldn't a PM just ignore the brief and not act?**

Yes. That's the point. Fathom Trace prepares the human — it doesn't replace them. The system ensures that if a PM chooses to ignore a brief, they're making an active, informed decision with evidence in front of them, not a passive one because the signal never surfaced. The responsibility stays human. The information gap closes.

---

## Scale and Limitations

**Q: What would break first if this were actually deployed at Wealthsimple?**

The baseline model. Fathom Trace's confidence depends on knowing what normal looks like for each release type, product area, and user segment. When Wealthsimple enters genuinely new territory — a new product type, a new account structure, a new user segment — the system has no historical baseline to compare against. It will either over-alert or under-alert.

The fix is human-seeded baselines whenever the team enters new territory. The PM tells the system: this is a new product type, here is what normal looks like for it, calibrate from here. Fathom Trace is honest about this — low-confidence flags are labeled as low-confidence, not hidden. The system tells you where it doesn't know. That's the right failure mode.

---

**Q: How would you handle Wealthsimple's actual data volume? This is simulated.**

The architecture scales — n8n handles workflow orchestration, Airtable or any database handles data storage, Claude handles the reasoning. The simulation is appropriate for a prototype submission. The constraint isn't the architecture — it's the API access to production signal feeds. That's a deployment question, not a design question. The reasoning chain is real and it works against real data structures.

---

**Q: How is this different from what Datadog or PagerDuty already does?**

Datadog surfaces error rates. PagerDuty fires alerts. Neither connects a specific deployment to a specific client segment to a specific historical pattern and generates a brief for a PM to act on. Fathom Trace isn't a monitoring tool — it's a connection layer between deployment context and client impact. The cognitive work it does — cross-system correlation, historical pattern matching, impact brief generation — that doesn't exist in their current tooling. This is what sits between the deployment and the support queue.

---

**Q: Why build this as a submission rather than pitching it as a real project?**

Because the submission requirement is to show a working system, and building it is the fastest way to answer every question about whether it's feasible. It's also how I work — I'm more useful demonstrating something real than proposing something theoretical. If Wealthsimple wanted to take this further, the architecture is already there.

---

*File created: 2026-02-28 | Fathom Trace — Wealthsimple AI Builder submission*
*Add new Q&A entries here as they come up during rehearsal.*

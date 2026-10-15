import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  SectionHead,
  SpecTable,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "Engagements",
  description:
    "Process audit, first automation and scale-up: how an AIgenica engagement is shaped, what each stage delivers, and what it asks of your team.",
};

export default function Engagements() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <h1 className="t-display rise mt-8 max-w-[20ch] text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
            Three stages, and you can stop after any of them.
          </h1>
          <p className="t-lede rise d1 measure mt-7 text-body">
            Every stage produces something you keep and can act on without us.
            That is deliberate: an agency whose first deliverable is a
            dependency on the agency has misunderstood the job.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-16 sm:py-24">
          <SpecTable
            rows={[
              {
                term: "Process audit: about two weeks",
                detail:
                  "We sit with the people who do the work, map the processes that take their time, and measure them: how often they run, how long they take, where errors happen. You receive a written audit ranking which processes are worth automating, in what order, and what each would save.",
                note: "Fixed scope, fixed fee. Yours to act on with or without us.",
              },
              {
                term: "First automation: typically four to eight weeks",
                detail:
                  "One process, end to end, in production. We connect your systems, set the rules and the review steps with your team, and run real work through it while we are still there to fix what breaks.",
                note: "Ends with the same measurements taken again, so the saving is a number rather than a claim.",
              },
              {
                term: "Scale-up: scoped after the first",
                detail:
                  "The next processes on the list, built on what the first one put in place. We work alongside someone on your side from the first day, because running the automations is theirs once we step back.",
                note: "Scoped only once the first automation has produced numbers worth extending.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead heading="What we need from you." />
              <ul className="mt-10 grid gap-px">
                {[
                  [
                    "Someone who owns the process",
                    "A person who can say how the work should be done and decide when the automation has it right. Without them the engagement becomes a document.",
                  ],
                  [
                    "Access, early",
                    "Access to the systems the process touches in the first week. We will work to your IT and data protection review; we cannot work around it.",
                  ],
                  [
                    "A real process",
                    "An automation tested on made-up examples proves nothing. It needs real volume, real documents and the real strange cases.",
                  ],
                  [
                    "Permission to measure",
                    "The baseline is taken before anything changes. Without it, every claim afterwards, ours included, is a story.",
                  ],
                ].map(([h, b]) => (
                  <li key={h} className="row reveal border-b border-hair py-6 first:border-t">
                    <h3 className="t-h3 row-term text-[1.0625rem]">{h}</h3>
                    <p className="t-body mt-2 text-[0.9375rem] text-body">{b}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHead heading="When we will tell you not to." />
              <ul className="mt-10 grid gap-px">
                {[
                  [
                    "The volume is too low",
                    "A task that runs a few times a month rarely repays an automation. A checklist or a template is cheaper, and we will say so.",
                  ],
                  [
                    "Nobody agrees how the process works",
                    "Automating a process that changes every time it runs makes the confusion faster. Agree the process first; we can help with that, and it may be all you need.",
                  ],
                  [
                    "An off-the-shelf tool already does it",
                    "If a product you can subscribe to this week covers the job, buy it. We build where the work is specific to your business.",
                  ],
                  [
                    "You want a demo for the board",
                    "We do not build showcases. If the deadline is a board meeting rather than a real process, an automation will look impressive and change nothing.",
                  ],
                ].map(([h, b]) => (
                  <li key={h} className="row reveal border-b border-hair py-6 first:border-t">
                    <h3 className="t-h3 row-term text-[1.0625rem]">{h}</h3>
                    <p className="t-body mt-2 text-[0.9375rem] text-body">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Start with the audit."
        lede="About two weeks, fixed fee, and a written answer about which of your processes are worth automating, useful whether or not you ever hire us again."
        action="Book an automation call"
      />
    </>
  );
}

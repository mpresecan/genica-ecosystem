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
    "Assessment, pilot line and rollout, how an Aigenica engagement is shaped, what each stage delivers, and what it asks of your team.",
};

export default function Engagements() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <h1 className="t-display mt-8 max-w-[20ch] text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
            Three stages, and you can stop after any of them.
          </h1>
          <p className="t-lede measure mt-7 text-body">
            Every stage produces something you keep and can act on without us.
            That is deliberate: a consultancy whose first deliverable is a
            dependency on the consultancy has misunderstood the job.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-16 sm:py-24">
          <SpecTable
            rows={[
              {
                term: "Assessment: two weeks",
                detail:
                  "We read your repositories, your tracker and your CI, and interview the engineers who actually ship. You receive a written assessment: where work enters, where it stalls, which of the six components exist, and the measured baseline for cycle time, rework, review latency and escaped defects.",
                note: "Fixed scope, fixed fee. Yours to act on with or without us.",
              },
              {
                term: "Pilot line: six to eight weeks",
                detail:
                  "One team, one repository, end to end. We install the control plane, write the contracts with your engineers, scope the agents, put the gates in CI and wire the record. Your team runs real work through it while we are still there to fix what breaks.",
                note: "Ends with the baseline re-measured against the same four numbers.",
              },
              {
                term: "Rollout: scoped after the pilot",
                detail:
                  "The pattern extended to further teams and repositories, which is mostly a question of how much your repositories disagree with each other. We work alongside an internal owner from the first day, because the rollout is theirs to finish.",
                note: "Scoped only once the pilot has produced numbers worth extending.",
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
                    "An engineer who can say yes",
                    "Someone with authority over CI, credentials and branch protection. Without them the engagement becomes a document.",
                  ],
                  [
                    "Access, early",
                    "Read access to the repositories and the tracker in week one. We will work to your security review; we cannot work around it.",
                  ],
                  [
                    "One real team",
                    "A pilot on a toy repository proves nothing. It needs a team shipping real work to real users, with real deadlines.",
                  ],
                  [
                    "Permission to measure",
                    "The baseline is taken before anything changes. Without it, every claim afterwards, ours included, is a story.",
                  ],
                ].map(([h, b]) => (
                  <li key={h} className="border-b border-hair py-6 first:border-t">
                    <h3 className="t-h3 text-[1.0625rem]">{h}</h3>
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
                    "Your delivery problem is not agentic",
                    "If work stalls in product decisions, unclear ownership or an approval chain with four names on it, agents will make the queue longer, not shorter. Fix the queue first.",
                  ],
                  [
                    "Nobody owns CI",
                    "A pipeline is enforced in CI or it is advice. Where no one has authority to change the build, the engagement cannot deliver what it promises.",
                  ],
                  [
                    "The mandate is headcount reduction",
                    "Organisations that install this to cut engineers get neither the cut nor the pipeline. The gates need engineers with judgment, and judgment does not survive being told it is being automated away.",
                  ],
                  [
                    "You want a demo for the board",
                    "We do not build showcases. If the deadline is a board meeting rather than a delivery problem, a pilot will look impressive and change nothing.",
                  ],
                ].map(([h, b]) => (
                  <li key={h} className="border-b border-hair py-6 first:border-t">
                    <h3 className="t-h3 text-[1.0625rem]">{h}</h3>
                    <p className="t-body mt-2 text-[0.9375rem] text-body">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Start with the assessment."
        lede="Two weeks, fixed fee, and a written answer about your own delivery pipeline that is useful whether or not you ever hire us again."
        action="Book a technical call"
      />
    </>
  );
}

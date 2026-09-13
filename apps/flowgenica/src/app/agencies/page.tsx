import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  RouteSteps,
  SectionHead,
  SpecTable,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "For agencies",
  description:
    "The consulting engagement: we map how your agency actually delivers, write it down as a workflow, and show you where delivery leaks time.",
};

const ROUTE = [
  {
    name: "Interview",
    body: "We talk to the people who deliver (project leads, designers, engineers, the account manager who absorbs every slip) not only the partners who wrote the handbook.",
    deliverable: "An honest account of how work actually moves through your agency.",
  },
  {
    name: "Map",
    body: "Stages, owners, real durations taken from projects that already happened, dependencies, and the exit criteria everyone assumed were obvious and nobody agreed on.",
    deliverable: "Your delivery process on one page, with the disagreements marked.",
  },
  {
    name: "Diagnose",
    body: "Where time leaks: the stage that always overruns, the approval with no owner, the handover that depends on one person, the client behaviour you have never priced in.",
    deliverable: "A short, ranked list of what is costing you most.",
  },
  {
    name: "Hand over",
    body: "The workflow written up so you can run it next Monday, in whatever tooling you already use, and a session with your team so it survives contact with a live project.",
    deliverable: "A workflow document your agency owns and can run immediately.",
  },
];

export default function Agencies() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <h1 className="t-display mt-8 max-w-[22ch] text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
            Write down how you deliver, before you buy software to run it.
          </h1>
          <p className="t-lede measure mt-7 text-body">
            Two to three weeks, fixed fee. We map your delivery process as it
            actually runs, tell you where it leaks time, and hand you a
            workflow you can put to work the week it lands, in any tool,
            including the ones you already pay for.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <SectionHead heading="The engagement." />
          <RouteSteps stops={ROUTE} className="mt-14" />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="Symptoms we hear on the first call."
            lede="If three or more of these are familiar, the problem is the missing layer rather than the people working in it."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "“Every project is different.”",
                detail:
                  "Usually four or five recognisable shapes, never written down, so the shared 80% is re-decided on every project and the genuinely different 20% gets no attention.",
              },
              {
                term: "“The client went quiet and we lost two weeks.”",
                detail:
                  "No stage owns waiting on the client, so the delay has no owner, no visible cost and no effect on the promised date until it is far too late.",
              },
              {
                term: "“Only Ana knows how handover works.”",
                detail:
                  "A stage that exists as expertise rather than as a process. It works until the week Ana is away, and then it does not work at all.",
              },
              {
                term: "“We were profitable on that one, I think.”",
                detail:
                  "Nothing records where the hours went by stage, so the projects quietly losing money look exactly like the ones that are not.",
              },
              {
                term: "“Status updates take a morning.”",
                detail:
                  "The client has no way to look, so a person becomes the interface, every week, for every client, forever.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead heading="What you keep." />
              <ul className="mt-10 grid gap-px">
                {[
                  "The workflow document, yours outright",
                  "Real stage durations drawn from your own finished projects",
                  "A ranked list of where delivery leaks time",
                  "A session with your team so it survives a live project",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex gap-4 border-b border-hair py-4 text-[0.9375rem] text-ink first:border-t"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] block size-[9px] shrink-0 rounded-full border-[3px] border-accent"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-10">
              <SectionHead heading="And no obligation after it." />
              <div className="t-body measure mt-7 grid gap-4 text-[1.0625rem] text-body">
                <p>
                  The engagement ends with a document you own. Some agencies
                  run it in the tools they already have and never speak to us
                  again, which is a perfectly good outcome and the one we
                  design for.
                </p>
                <p>
                  Others become design partners for the product, because a
                  workflow written on paper still has to be kept alive across
                  eleven simultaneous engagements, and that is the part paper
                  cannot do.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Two to three weeks to know your own process."
        lede="Book a call and describe how a project moves through your agency. The gaps usually show up in the first fifteen minutes."
        action="Book a call"
      />
    </>
  );
}

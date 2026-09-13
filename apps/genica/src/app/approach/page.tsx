import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  Quote,
  RouteSteps,
  SectionHead,
  SpecTable,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Four stops from specification to a product people love, what happens at each, what you are holding when it ends, and how engagements are shaped.",
};

const STOPS = [
  {
    name: "Specify the product",
    body: "We interrogate the idea until the parameters hold still: who it is for, what it must do, what it must never do, and which dependencies decide the timeline. Nothing is built yet.",
    deliverable: "A written specification, a dependency map and a sequenced estimate.",
  },
  {
    name: "Build the proof",
    body: "We build the parts most likely to be wrong (the API structures, the core workflow, the mechanic the whole thing rests on) at high fidelity and nothing else.",
    deliverable: "A running prototype and an estimate revised by what it proved.",
  },
  {
    name: "Build the MVP",
    body: "The core product, in production, in front of early adopters. Deployment, observability, backups and access control are part of the first release, not a later project.",
    deliverable: "A deployed product, real usage data, and every account in your name.",
  },
  {
    name: "Scale to MLP",
    body: "Usage tells us which details matter. We refine them, harden what is now load-bearing, and keep going until the product is one people choose rather than tolerate.",
    deliverable: "A product your team can run, or that we keep running for you.",
  },
];

export default function Approach() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h1 className="t-display mt-8 text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
                Capital is spent on decisions, not on keystrokes.
              </h1>
            </div>
            <div className="lg:pt-16">
              <p className="t-lede measure text-body">
                Most software money is lost before anyone writes bad code. It
                goes on building the wrong thing carefully, discovering it
                late, and rebuilding under time pressure. Our sequence exists
                to make that discovery happen on paper, in week one, where it
                costs days.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <SectionHead heading="The four stops, in detail." />
          <RouteSteps stops={STOPS} className="mt-14" />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="How engagements are shaped."
            lede="Three shapes cover almost everything founders ask for. We will tell you on the call which one fits, including when the honest answer is none of them."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "Specification sprint",
                detail:
                  "One to two weeks, fixed scope, fixed fee. You leave with the specification, the dependency map and a sequenced estimate, yours to build with anyone, including an in-house team or another studio.",
                note: "The most common way founders start with us, and the cheapest way to find out whether we are right for you.",
              },
              {
                term: "Build engagement",
                detail:
                  "Proof of concept through MVP to MLP, run as a continuous engagement against the signed specification. Scope changes are re-estimated in the open rather than absorbed quietly and paid for in the deadline.",
                note: "Founder-led, with senior engineers brought in when the work calls for it.",
              },
              {
                term: "Technical direction",
                detail:
                  "Fractional CTO work for teams that have engineers but no one setting direction: architecture decisions, hiring input, code and vendor review, and the technical due diligence that gets done to you when you raise.",
                note: "Usually a fixed number of days per month.",
              },
            ]}
          />

          <div className="measure mt-14 border-t border-hair pt-7">
            <h2 className="t-h3 text-[1.2rem]">On pricing</h2>
            <p className="t-body mt-3 text-[0.9688rem] text-body">
              We price an engagement after the scoping call, against a written
              scope, and we do not quote before we understand what is being
              asked. Rates are day-rate based, invoiced monthly from an
              EU-registered company, with reverse-charge VAT for EU business
              clients. We take no equity, and we do not ask for it later.
            </p>
          </div>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead heading="What we will talk you out of." />
              <ul className="mt-10 grid gap-px">
                {[
                  [
                    "Building before the specification holds",
                    "If the parameters are still moving, more code makes the problem more expensive, not clearer.",
                  ],
                  [
                    "A bespoke platform where a stack exists",
                    "We maintain the Payload App Stack in the open precisely so your budget goes to the part only you can build.",
                  ],
                  [
                    "Scaling infrastructure for load you do not have",
                    "Boring infrastructure, sized for the traffic that exists, moved when the traffic arrives.",
                  ],
                  [
                    "Hiring a team to start a product",
                    "A team is the right answer once the product is proven. Before that it is a payroll with an unresolved specification attached.",
                  ],
                ].map(([h, b]) => (
                  <li key={h} className="border-b border-hair py-6 first:border-t">
                    <h3 className="t-h3 text-[1.0625rem]">{h}</h3>
                    <p className="t-body mt-2 text-[0.9375rem] text-body">
                      {b}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pt-10">
              <Quote
                size="lead"
                by={{
                  name: "Tim-Julian Hartmann",
                  role: "",
                  org: "Peakside Projects",
                }}
              >
                “Layron moves a deal from sourcing to shareable brief in one
                single session. What took us hours before is now a matter of
                minutes.”
              </Quote>
              <p className="t-body measure mt-10 border-t border-hair pt-7 text-[0.9375rem] text-body">
                That result did not come from a clever sprint. It came from
                deciding, on paper and early, that the product’s job was to end
                at a shareable brief, and then refusing to build anything that
                did not serve that ending.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Start with the specification."
        lede="One call, 45 minutes. If a specification sprint is the right first step, we will scope it on the call. If it is not, we will say what is."
        action="Book a scoping call"
      />
    </>
  );
}

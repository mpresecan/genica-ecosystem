import type { Metadata } from "next";
import {
  Band,
  BOOKING_URL,
  Button,
  Container,
  CtaBand,
  Eyebrow,
  Faq,
  Figure,
  NetworkMap,
  Quote,
  Roster,
  RouteSteps,
  SectionHead,
  Stat,
} from "@genica/ui";
import { FAQ } from "../content/faq";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const STOPS = [
  {
    name: "Specify the product",
    body: "We define the parameters, map the dependencies and write the specification before a line of code is initiated. Scope is argued here, where changing your mind is free.",
    deliverable: "A written specification, a dependency map, a sequenced estimate.",
  },
  {
    name: "Build the proof",
    body: "A high-fidelity draft that puts the risky parts first: the API structures, the core workflows, the mechanics that could break the plan.",
    deliverable: "A running prototype, and an estimate revised by what it proved.",
  },
  {
    name: "Build the MVP",
    body: "A robust core product in front of early adopters, with production reliability from the first release rather than from the first incident.",
    deliverable: "A deployed product, real usage data, every account in your name.",
  },
  {
    name: "Scale to MLP",
    body: "Usage tells us which details matter. We refine them, harden what is now load-bearing, and keep going until the product is one people choose rather than tolerate.",
    deliverable: "A product your team can run, or that we keep running for you.",
  },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero: eyebrow, headline, one subtext, one action. Nothing else. */}
      <Band tone="paper">
        <Container className="grid items-start gap-12 pt-20 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pt-24 lg:pb-28">
          <div>
            <Eyebrow className="rise">Software studio</Eyebrow>
            <h1 className="t-display rise d1 mt-7">Ship the SaaS you specified.</h1>
          </div>

          <div className="lg:pt-4">
            <p className="t-lede rise d1 max-w-[38ch]">
              Not the one that emerged. Technical direction, product engineering
              and long-term ownership, in one engagement.
            </p>
            <div className="rise d2 mt-9">
              <Button asChild size="lg">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Book a call
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Band>

      {/* 2. Trust row, below the hero where it belongs. */}
      <Band tone="paper" className="border-t border-hair">
        <Container className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-mono">In production with</p>
          <Roster names={["Layer Finance", "Layron", "Peakside Projects"]} />
        </Container>
      </Band>

      {/* 3. The route, as a ruled list. */}
      <Band tone="paper" className="border-t border-hair">
        <Container className="py-24">
          <SectionHead
            heading="Every engagement runs the same four stops."
            lede="We de-risk your capital by refusing to write code before the parameters are clear. The sequence is the same whether you arrive with a sketch or a half-built product."
          />

          <Figure
            className="mt-14"
            kind="stops"
            alt="The work at each of the four stops: scope argued into ordered lines of specification, then a sparse structure with the risky joins between its parts drawn in, then the same product built solid, then the same product again with two columns and a row removed and three parts marked."
            labels={[
              { x: 0.151, y: 0.9, text: "Specify", align: "center", only: "wide", index: 0 },
              { x: 0.384, y: 0.9, text: "Prove", align: "center", only: "wide", index: 1 },
              { x: 0.616, y: 0.9, text: "Build", align: "center", only: "wide", index: 2 },
              { x: 0.849, y: 0.9, text: "Scale", align: "center", only: "wide", index: 3 },
              { x: 0.268, y: 0.88, text: "Specify", align: "center", only: "narrow", index: 0 },
              { x: 0.733, y: 0.88, text: "Prove", align: "center", only: "narrow", index: 1 },
              { x: 0.268, y: 0.425, text: "Build", align: "center", only: "narrow", index: 2 },
              { x: 0.733, y: 0.425, text: "Scale", align: "center", only: "narrow", index: 3 },
            ]}
            details={[
              "Loose scope, argued into ordered lines. Changing your mind is still free here.",
              "The risky joins drawn first, and almost nothing else built around them.",
              "The product, solid, in front of people who are using it.",
              "The same product with what usage did not justify taken out, and the few parts that mattered marked.",
            ]}
            caption="Scope argued into a specification, the risky joins proved before the rest exists, the product built, then everything usage did not justify taken back out."
          />
          <RouteSteps stops={STOPS} className="mt-20 border-t border-hair" />
          <p className="reveal mt-12 max-w-[46rem] text-[1rem] leading-[1.6] text-muted">
            Built on the Payload App Stack, which we own and maintain in the open
            at{" "}
            <a href="https://payload.solutions" className="link font-medium text-ink">
              payload.solutions
            </a>
            , so the foundation under your product is proven before your first
            release, and inspectable by anyone you ask to review it.
          </p>
        </Container>
      </Band>

      {/* 4. Proof, on the dark band. One per page. */}
      <Band tone="dark">
        <Container className="py-24">
          <Eyebrow className="text-on-dark-muted">Selected work</Eyebrow>
          <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div>
              <h2 className="t-h2 reveal text-on-dark">
                Sourcing to shareable brief, in one session.
              </h2>
              <p className="t-body reveal mt-6 text-on-dark-body">
                Layer Finance underwrites real-estate deals. Onboarding one meant
                hours of reading, extracting and re-typing before anyone could
                form a view. We built{" "}
                <strong className="font-medium text-on-dark">Layron</strong>, an
                AI deal workspace that carries a deal from sourcing to a brief
                the team can circulate, without leaving the screen.
              </p>
              <dl className="reveal mt-12 flex flex-wrap items-baseline gap-x-14 gap-y-6">
                <div>
                  <dt className="t-mono text-on-dark-muted">Time saved in onboarding</dt>
                  <dd className="mt-2 text-[2.75rem] leading-none font-semibold tracking-[-0.04em] text-accent-dark">
                    <Stat value={80} suffix="%" />
                  </dd>
                </div>
                <div>
                  <dt className="t-mono text-on-dark-muted">Measured by</dt>
                  <dd className="mt-2 text-[1.125rem] font-medium text-on-dark">
                    Layer Finance
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid content-start gap-12 lg:pt-2">
              <Quote
                onDark
                size="lead"
                by={{ name: "Tim-Julian Hartmann", role: "", org: "Peakside Projects" }}
              >
                “Layron moves a deal from sourcing to shareable brief in one
                single session. What took us hours before is now a matter of
                minutes.”
              </Quote>
              <Quote onDark by={{ name: "Kurt Praszl", role: "", org: "Layer Finance" }}>
                “We measured 80% time saved during deal onboarding. This is a
                game changer for us.”
              </Quote>
            </div>
          </div>
        </Container>
      </Band>

      {/* 5. The network, as a divided field. */}
      <Band tone="paper">
        <Container className="py-24">
          <SectionHead
            heading="Four lines. One studio behind them."
            lede="Genica builds the product. The rest of the network covers what founders and agencies ask us for next: the agentic pipeline, the education platform, the delivery workflow."
          />
          <NetworkMap current="genica" className="mt-14" />
        </Container>
      </Band>

      {/* 6. Questions. */}
      <Band tone="sunk" className="border-t border-hair">
        <Container className="py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <h2 className="t-h2 reveal max-w-[16ch]">Questions we are asked before the first call.</h2>
            <Faq items={FAQ} />
          </div>
        </Container>
      </Band>

      {/* 7. Close. */}
      <CtaBand
        heading="Tell us what you're building."
        lede="Bring the idea, the deadline, or the half-built thing. We will tell you what it takes, in what order, and what it costs."
        action="Book a call"
        detail="45 minutes. You leave with a scope, a sequence and a number, whether or not you hire us. Founder-led, with a senior team brought in when the work calls for it."
      />
    </>
  );
}

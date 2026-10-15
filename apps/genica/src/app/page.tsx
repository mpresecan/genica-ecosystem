import type { Metadata } from "next";
import {
  Arrow,
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
  RevealText,
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
      {/* 1. Hero: the headline at full strength, one subtext, one action with
          the promise it makes beside it, and the cube: left alone it keeps
          turning, under the pointer it squares up. */}
      <Band tone="paper">
        <Container className="grid items-center gap-12 pt-20 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-24 lg:pb-28">
          <div>
            <h1 className="t-display rise max-w-[11ch] text-[clamp(2.75rem,1.1rem+5.6vw,5.5rem)]">
              Ship the SaaS you specified.
            </h1>
            <p className="t-lede rise d1 mt-10 max-w-[38ch]">
              Not the one that emerged. Technical direction, product engineering
              and long-term ownership, in one engagement.
            </p>
            <div className="rise d2 mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button asChild size="lg">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Book a call
                </a>
              </Button>
              <p className="t-mono w-full max-w-[36ch] leading-[1.7] text-body sm:w-auto">
                45 minutes. You leave with a scope, a sequence and a number,
                whether or not you hire us.
              </p>
            </div>
          </div>

          <Figure
            kind="cube"
            bare
            className="w-full"
            boxClassName="h-[280px] sm:h-[360px] lg:h-[460px]"
            alt="A cube of twenty-seven smaller cubes, drawn in outline on the page. Left alone, one layer after another turns and the cube drifts out of square; under the pointer every piece returns to its place and the cube is square again."
          />
        </Container>
      </Band>

      {/* 2. What a buyer checks first, below the hero where it belongs: who
          it is in production with, who owns the work, who is behind it. A
          divided field, one hairline between cells. */}
      <Band tone="paper" className="border-t border-hair">
        <Container>
          <dl className="grid sm:grid-cols-[1.25fr_1fr_1fr]">
            <div className="row reveal py-7 sm:pr-8">
              <dt className="t-mono">In production with</dt>
              <dd className="mt-3">
                <Roster names={["Layer Finance", "Layron", "Peakside Projects"]} />
              </dd>
            </div>
            <div className="row reveal border-t border-hair py-7 sm:border-t-0 sm:border-l sm:pl-8 sm:pr-8">
              <dt className="t-mono">Ownership</dt>
              <dd className="mt-3 text-[1rem] font-medium tracking-[-0.02em] text-ink">
                <span className="block">Yours from the first commit.</span>
                <span className="block">No equity, ever.</span>
              </dd>
            </div>
            <div className="row reveal border-t border-hair py-7 sm:border-t-0 sm:border-l sm:pl-8">
              <dt className="t-mono">Operator</dt>
              <dd className="mt-3 text-[1rem] font-medium tracking-[-0.02em] text-ink">
                Fortbit d.o.o., EU-registered, founder-led.
              </dd>
            </div>
          </dl>
        </Container>
      </Band>

      {/* 3. Proof, on the dark band, before the process: the page states what
          it has done before it explains how. One dark band per page. */}
      <Band tone="dark" className="border-t border-hair">
        <Container className="py-24 lg:py-28">
          <Eyebrow className="text-on-dark-muted">Selected work</Eyebrow>
          <RevealText
            as="h2"
            className="t-display mt-8 max-w-[16ch] text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)] text-on-dark"
          >
            Sourcing to shareable brief, in one session.
          </RevealText>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div>
              <p className="t-body reveal-under text-on-dark-body">
                Layer Finance underwrites real-estate deals. Onboarding one meant
                hours of reading, extracting and re-typing before anyone could
                form a view. We built{" "}
                <strong className="font-medium text-on-dark">Layron</strong>, an
                AI deal workspace that carries a deal from sourcing to a brief
                the team can circulate, without leaving the screen.
              </p>
              <div className="reveal mt-14 border-t border-hair-dark pt-8">
                <p className="text-[clamp(4.5rem,3rem+5vw,6rem)] leading-[0.9] font-semibold tracking-[-0.04em] text-accent-dark">
                  <Stat value={80} suffix="%" />
                </p>
                <p className="mt-5 max-w-[26rem] text-[1rem] leading-[1.5] text-on-dark-body">
                  Time saved in deal onboarding.{" "}
                  <span className="text-on-dark">Measured and stated by Layer Finance.</span>
                </p>
              </div>
              <p className="reveal mt-10">
                <a href="/work" className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-on-dark">
                  <span className="link">How Layron was built</span>
                  <Arrow />
                </a>
              </p>
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

      {/* 4. The route, as a ruled list. */}
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

      {/* 5. The network, as a divided field. */}
      <Band tone="paper">
        <Container className="py-24">
          <SectionHead
            heading="Four lines. One studio behind them."
            lede="Genica builds the product. The rest of the network covers what founders and agencies ask us for next: AI automation, the education platform, the delivery workflow."
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

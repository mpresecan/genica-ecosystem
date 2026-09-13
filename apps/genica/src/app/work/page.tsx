import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  Quote,
  SectionHead,
  SpecTable,
  Eyebrow,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Layron, the AI deal workspace built for Layer Finance, what it does, what it replaced, and the 80% measured saving in deal onboarding.",
};

export default function Work() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <h1 className="t-display mt-8 max-w-[20ch] text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
            Layron, for Layer Finance.
          </h1>
          <p className="t-lede measure mt-7 text-body">
            An AI deal workspace that carries a real-estate deal from sourcing
            to a brief the team can circulate, without anyone leaving the
            screen to re-type what they just read.
          </p>

          <dl className="mt-14 grid gap-px border-t border-hair sm:grid-cols-3">
            {[
              ["Client", "Layer Finance"],
              ["Scope", "Product specification, build, production operation"],
              ["Result", "80% time saved in deal onboarding, measured by the client"],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-hair py-5 sm:pr-8">
                <dt>
                  <Eyebrow className="text-muted">{k}</Eyebrow>
                </dt>
                <dd className="t-h3 mt-3 text-[1.0625rem] text-ink">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Band>

      <Band tone="paper" className="border-b border-hair">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHead heading="The problem was the re-typing." />
              <div className="t-body measure mt-7 grid gap-4 text-[1.0625rem] text-body">
                <p>
                  Layer Finance underwrites real-estate deals. A new deal
                  arrived as a pile of documents in no fixed shape. Someone
                  read it, pulled the numbers out, put them somewhere
                  structured, and only then could anyone form a view, and by
                  then hours were gone and the analyst had made judgment calls
                  no one else could see.
                </p>
                <p>
                  The bottleneck was never the analysis. It was the distance
                  between the documents and a shape the team could argue with.
                </p>
              </div>
            </div>

            <div>
              <SectionHead heading="What we built." />
              <div className="t-body measure mt-7 grid gap-4 text-[1.0625rem] text-body">
                <p>
                  One workspace that takes a deal in as it arrives, extracts
                  the structure, keeps every extracted figure traceable back to
                  the document it came from, and ends at a brief the team can
                  share. The analyst’s judgment stays in the loop, it is
                  simply no longer spent on transcription.
                </p>
                <p>
                  Because every figure carries its source, the brief survives
                  the question that kills most AI output in finance: where did
                  this number come from?
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <SectionHead heading="What it changed." />
              <dl className="mt-10 border-t border-hair">
                {[
                  ["Time saved during deal onboarding", "80%"],
                  ["Sourcing to shareable brief", "One session"],
                  ["Measured by", "Layer Finance"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-6 border-b border-hair py-4"
                  >
                    <dt className="text-[0.9375rem] text-body">{k}</dt>
                    <dd className="t-h3 text-[1.35rem] text-accent">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid content-start gap-12">
              <Quote
                size="lead"
                by={{ name: "Kurt Praszl", role: "", org: "Layer Finance" }}
              >
                “We measured 80% time saved during deal onboarding. This is a
                game changer for us.”
              </Quote>
              <Quote
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
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="sunk" className="border-t border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="Work you can read the source of."
            lede="Client products are mostly private. The foundation under them is not, we build and maintain it in the open, which is the fastest way for you to judge how we write software before you hire us."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "Payload App Stack",
                detail:
                  "The SaaS boilerplate our client products start from: authentication, organisations, subscription billing and an admin dashboard, wired together and used in production.",
                note: "payload.solutions, MIT licensed.",
              },
              {
                term: "Payload Clock",
                detail:
                  "A serverless job queue and scheduler for Payload CMS, for the recurring work every real product accumulates.",
              },
              {
                term: "Plugins",
                detail:
                  "Consent management, transactional email building, deployment integration and action scheduling, the parts every product needs and nobody wants to write twice.",
              },
            ]}
          />
        </Container>
      </Band>

      <CtaBand
        heading="Your product, in this much detail."
        lede="Tell us what the bottleneck actually is. We will tell you whether software is the answer, and what it would take."
        action="Book a scoping call"
      />
    </>
  );
}

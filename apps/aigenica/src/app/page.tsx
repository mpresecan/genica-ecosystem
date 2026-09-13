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
  SectionHead,
  SpecTable,
} from "@genica/ui";
import { FAQ, PIPELINE } from "../content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Band tone="paper">
        <Container className="grid items-start gap-12 pt-20 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pt-24 lg:pb-28">
          <div>
            <Eyebrow className="rise">Agentic delivery</Eyebrow>
            <h1 className="t-display rise d1 mt-7">Who approved what your agents ship?</h1>
          </div>

          <div className="lg:pt-4">
            <p className="t-lede rise d1 max-w-[38ch]">
              We install the pipeline that puts specification, approval and traceability around agentic work.
            </p>
            <div className="rise d2 mt-9">
              <Button asChild size="lg">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Book a technical call
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="sunk" className="border-b border-hair">
        <Container className="flex flex-wrap items-center gap-x-10 gap-y-4 py-6">
          <Eyebrow className="text-muted">Built and run by</Eyebrow>
          <p className="t-h3 text-[1.0625rem] text-body">
            the studio behind Layron, an AI deal workspace in daily production
            use at Layer Finance.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHead heading="The pilot worked. The rollout is where it dies." />
            <div className="t-body measure grid gap-4 text-[1.0625rem] text-body">
              <p>
                Almost every organisation has now proved that an agent can
                write a useful change. Very few can answer the questions that
                follow: which issue was this for, who approved the approach,
                what did the agent have access to, and what evidence exists
                that it is correct.
              </p>
              <p>
                Without answers, the sensible response is to slow agents down:
                more review, more caution, more meetings, until they cost more
                than they save. The answer is not more caution. It is a
                pipeline that produces the answers automatically.
              </p>
              <p>
                That pipeline is a control problem, not a model problem. It is
                the same problem every serious delivery organisation solved for
                human engineers, restated for a contributor that works faster,
                remembers nothing, and never pushes back.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="What we install."
            lede="Six components. None of them is a product you rent from us. Each is configuration, written contracts and automation inside systems you already own."
          />

          <Figure
            className="mt-14"
            kind="gate"
            alt="Work leaves a queue, passes a scoped agent that writes the change, and meets a gate. Most changes pass; the ones requiring a named approval wait at the gate and are marked. Everything that passes writes a line into a record below."
            labels={[
              { x: 0.05, y: 0.86, text: "Queue" },
              { x: 0.4, y: 0.86, text: "Scoped agent", align: "center", only: "wide" },
              { x: 0.4, y: 0.9, text: "Agent", align: "center", only: "narrow" },
              { x: 0.66, y: 0.92, text: "Gate", align: "center", only: "wide" },
              { x: 0.68, y: 0.14, text: "Gate", align: "center", only: "narrow" },
              { x: 0.05, y: 0.09, text: "The delivery record", only: "wide" },
              { x: 0.05, y: 0.05, text: "The record", only: "narrow" },
            ]}
            toggle={{ key: "enforced", on: "Gate enforced", off: "Gate off", initial: true }}
            caption="Switch the gate off and the work still ships. Nothing is written down."
          />
          <SpecTable
            className="mt-20"
            rows={[
              {
                term: "A control plane",
                detail:
                  "Your issue tracker becomes the single queue for agentic and human work alike. States and labels drive the automation, so the board is the truth rather than a reflection of it.",
              },
              {
                term: "Contracts in the repository",
                detail:
                  "The written artefacts agents read before acting: the architecture, the decisions and their rationale, and a map of the system. Versioned with the code, reviewed like code.",
              },
              {
                term: "Scoped agents",
                detail:
                  "Narrow roles with narrow mandates instead of one general assistant with broad credentials. A mandate small enough to review is the whole point.",
              },
              {
                term: "Gates",
                detail:
                  "What must pass before a change advances, and which changes require a named human approval. Explicit, enforced in CI, and impossible to skip quietly.",
              },
              {
                term: "The delivery record",
                detail:
                  "Issue, plan, change, approval, deployment: linked, queryable, and produced as a by-product of the work rather than assembled afterwards for an audit.",
              },
              {
                term: "Handover",
                detail:
                  "Documentation and working sessions for the engineers who will run it after we step back. An engagement that leaves you dependent on us has failed on its own terms.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHead heading="Asked on every first call." />
            <Faq items={FAQ} />
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Bring the repository. We will bring the questions."
        lede="A technical call, not a discovery call. By the end you will know which of the six components you already have, which you are missing, and what the first one costs."
        action="Book a technical call"
        detail="You will be talking to the engineer who would run the work, not to a salesperson with an engineer on standby."
      />
    </>
  );
}

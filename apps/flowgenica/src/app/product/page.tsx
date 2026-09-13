import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  RouteSteps,
  SectionHead,
  SpecTable,
} from "@genica/ui";
import { CAPABILITIES } from "../../content";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How Flowgenica models agency delivery: a workflow template, engagements that run on it, dates that move with reality, and a client view worth sending.",
};

const MODEL = [
  {
    name: "The template",
    body: "Your delivery process, written once: stages in order, who owns each, how long each usually takes, what has to be true before it can close, and which stages depend on which.",
    deliverable: "One definition of how your agency delivers.",
  },
  {
    name: "The engagement",
    body: "Each client runs on a copy of the template with real dates, calculated from the start date and your working calendar. Divergence from the template is visible rather than quietly normal.",
    deliverable: "Every client on the same shape, with their own dates.",
  },
  {
    name: "The movement",
    body: "When a stage slips, the dates after it move through the dependencies. Nobody has to notice and nobody has to re-plan, the plan already says what the slip cost.",
    deliverable: "A delivery date that is true today rather than true at kickoff.",
  },
  {
    name: "The view",
    body: "One link for the client showing where their engagement stands, what is waiting on them, and what is next. Internal notes, margins and other clients stay on your side of it.",
    deliverable: "A status your client checks instead of asking for.",
  },
];

export default function Product() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h1 className="t-display mt-8 text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
                A project tool holds one project. This holds how you work.
              </h1>
            </div>
            <div className="lg:pt-16">
              <p className="t-lede measure text-body">
                Flowgenica sits one layer above tasks, on the shape of the
                engagement and the commitments made to the client, the layer
                most agencies keep in a spreadsheet and a partner’s memory.
              </p>
              <p className="mt-6 inline-flex items-center gap-3 border border-hair-2 px-4 py-2 text-[0.8125rem] text-body">
                <span aria-hidden className="block h-[3px] w-6 bg-line" />
                In build, design partners are shaping it now
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <SectionHead heading="Four ideas, and that is the whole model." />
          <RouteSteps stops={MODEL} className="mt-14" />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead heading="What it will do." />
          <SpecTable
            className="mt-14"
            rows={CAPABILITIES}
          />
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead heading="What it deliberately will not do." />
              <ul className="mt-10 grid gap-px">
                {[
                  [
                    "Replace your task tracker",
                    "Your team keeps working where it works. Flowgenica is not trying to own the checklist inside a stage.",
                  ],
                  [
                    "Time-tracking surveillance",
                    "Duration is a property of a stage, learned from how long stages actually take. It is not an instrument for watching people.",
                  ],
                  [
                    "Invoicing and payroll",
                    "Two well-solved problems we have no intention of solving again, badly.",
                  ],
                  [
                    "Chat",
                    "You have chat. What you do not have is a shared answer to where this engagement stands.",
                  ],
                ].map(([h, b]) => (
                  <li key={h} className="border-b border-hair py-6 first:border-t">
                    <h3 className="t-h3 text-[1.0625rem]">{h}</h3>
                    <p className="t-body mt-2 text-[0.9375rem] text-body">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-10">
              <SectionHead heading="Where it is." />
              <div className="t-body measure mt-7 grid gap-4 text-[1.0625rem] text-body">
                <p>
                  The product is being built with a small group of agencies
                  running real engagements on it. We publish no launch date,
                  because a date announced before the model is right is a
                  promise made with someone else’s calendar.
                </p>
                <p>
                  If your delivery problem is urgent, the consulting engagement
                  solves the part that software was never going to solve
                  anyway: knowing what your process actually is.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Shape it around your agency."
        lede="Design partners get early access, direct influence over the model and preferential pricing. It costs about an hour a month and one real engagement."
        action="Book a call"
      />
    </>
  );
}

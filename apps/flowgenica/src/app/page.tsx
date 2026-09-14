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
import { CAPABILITIES, FAQ } from "../content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Band tone="paper">
        <Container className="grid items-start gap-12 pt-20 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pt-24 lg:pb-28">
          <div>
            <Eyebrow className="rise">Delivery workflow</Eyebrow>
            <h1 className="t-display rise d1 mt-7">Your process lives in three heads.</h1>
          </div>

          <div className="lg:pt-4">
            <p className="t-lede rise d1 max-w-[38ch]">
              FlowGenica turns the way you deliver into a workflow every client engagement runs on.
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

      <Band tone="sunk" className="border-b border-hair">
        <Container className="flex flex-wrap items-center gap-x-10 gap-y-4 py-6">
          <Eyebrow className="text-muted">For</Eyebrow>
          <ul className="roster flex flex-wrap items-center gap-x-8 gap-y-2">
            {[
              "Software studios",
              "Design agencies",
              "Marketing agencies",
              "Consultancies",
            ].map((n) => (
              <li key={n} className="t-h3 text-[1.0625rem]">
                {n}
              </li>
            ))}
          </ul>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHead heading="Clients ask for status because there is no other way to get it." />
            <div className="t-body measure reveal grid gap-4 text-[1.0625rem] text-body">
              <p>
                Every agency past about eight people hits the same wall. The
                delivery process is real, and it works, but it exists in the
                founders’ heads, in a spreadsheet nobody else edits, and in a
                project tool that describes tasks rather than commitments.
              </p>
              <p>
                So the same things go wrong at the same places. A stage that
                always overruns is discovered again on every project. A client
                sits three days on feedback and nobody notices the delivery
                date has moved. The one person who knows how handover works is
                on holiday. And the status update everybody dreads exists only
                because there is no honest way for a client to look.
              </p>
              <p>
                None of that is a discipline problem. It is a missing layer:
                the shape of the engagement itself, held somewhere other than
                in someone’s memory.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="Define it once. Run every client on it."
            lede="Six capabilities, all pointing at the same outcome: the way your best project ran becomes the way every project runs."
          />

          <Figure
            className="mt-14"
            kind="schedule"
            alt="One template row of five stages, and six client rows running the same five stages against their own start dates. Partway through, one client's stage stretches and every stage after it on that row moves, marked; the other rows are unaffected."
            labels={[
              { x: 0.02, y: 0.93, text: "The template", only: "wide" },
              { x: 0.02, y: 0.52, text: "Every engagement", only: "wide" },
              { x: 0.02, y: 0.96, text: "The template", only: "narrow" },
              { x: 0.02, y: 0.78, text: "Every engagement", only: "narrow" },
            ]}
            caption="One client returns feedback late. The stage stretches, the stages after it move, and the delivery date everyone can see moves with them. Only that engagement changes."
          />
          <SpecTable
            className="mt-20"
            rows={CAPABILITIES}
          />
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead heading="Before the software, the process." />
              <div className="t-body measure reveal mt-7 grid gap-4 text-[1.0625rem] text-body">
                <p>
                  Most agencies do not need a tool first. They need the
                  workflow written down, the real one, with the stage everyone
                  skips and the approval that always takes a week.
                </p>
                <p>
                  That is a consulting engagement, and it runs today. We
                  interview the people who deliver, map what actually happens,
                  and hand you a workflow with stages, owners, durations and
                  exit criteria. It is yours to run in whatever tool you like , 
                  including the one you already pay for.
                </p>
              </div>
              <ul className="mt-8 grid gap-px">
                {[
                  "Two to three weeks, fixed scope and fee",
                  "Interviews with the people who deliver, not only the partners",
                  "A written workflow you can run the week it lands",
                  "A short list of where your delivery currently leaks time",
                ].map((b) => (
                  <li
                    key={b}
                    className="tick-row reveal flex gap-4 border-b border-hair py-3 text-[0.9375rem] text-ink first:border-t"
                  >
                    <span
                      aria-hidden
                      className="tick mt-[0.55em] block size-[9px] shrink-0 rounded-full border-[3px] border-accent"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHead heading="Design partners." />
              <div className="t-body measure reveal mt-7 grid gap-4 text-[1.0625rem] text-body">
                <p>
                  The product is being built now, with a small number of
                  agencies running real engagements on it and telling us where
                  the model is wrong. We would rather ship something shaped by
                  eleven real engagements than something shaped by a roadmap.
                </p>
                <p>
                  A design partner commits to about an hour a month of honest
                  feedback and one real engagement on early software. In return
                  you shape the workflow model around how your agency actually
                  works, and you do not pay list price afterwards.
                </p>
              </div>
              <ul className="mt-8 grid gap-px">
                {[
                  "Early access as each capability lands",
                  "Direct influence over the workflow model",
                  "Preferential pricing at launch",
                  "No obligation to keep using it",
                ].map((b) => (
                  <li
                    key={b}
                    className="tick-row reveal flex gap-4 border-b border-hair py-3 text-[0.9375rem] text-ink first:border-t"
                  >
                    <span
                      aria-hidden
                      className="tick mt-[0.55em] block size-[9px] shrink-0 rounded-full border-[3px] border-accent"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="sunk" className="border-t border-hair">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHead heading="Fair questions." />
            <Faq items={FAQ} />
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Show us how you deliver."
        lede="One call. We will map your delivery as it actually runs and tell you where it leaks, whether you end up a consulting client, a design partner, or neither."
        action="Book a call"
        detail="FlowGenica is part of Genica, an EU software studio. The consulting engagement runs today; the product is in build."
      />
    </>
  );
}

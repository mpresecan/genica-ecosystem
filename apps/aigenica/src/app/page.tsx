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
  Arrow,
  RevealText,
} from "@genica/ui";
import { FAQ } from "../content";
import { PartnerBadge } from "../components/partner-badge";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Band tone="paper">
        <Container className="grid items-start gap-12 pt-20 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pt-24 lg:pb-28">
          <div>
            <Eyebrow className="rise">AI automation across Europe</Eyebrow>
            <h1 className="t-display rise d1 mt-7">Hand the repetitive work to AI. Keep the decisions.</h1>
          </div>

          <div className="lg:pt-4">
            <p className="t-lede rise d1 max-w-[38ch]">
              We find the processes that eat your team’s week, automate them
              inside the tools you already use, and keep a person in the loop
              wherever a mistake would cost you.
            </p>
            <div className="rise d2 mt-9">
              <Button asChild size="lg">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Book an automation call
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
            the studio behind Layron, the AI deal workspace at Layer Finance,
            where the client measured 80% time saved during deal onboarding.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHead heading="Most AI projects stop at the demo." />
            <div className="t-body measure reveal grid gap-4 text-[1.0625rem] text-body">
              <p>
                Everyone has now seen an AI read a document or draft a reply.
                Far fewer companies have an automation that does it every day,
                on real invoices, real emails and real customer files, without
                someone watching over it.
              </p>
              <p>
                The gap is rarely the model. It is everything around it: where
                the data comes from, what the automation is allowed to touch,
                who checks its work, what happens on the strange case, and how
                you find out later what it did.
              </p>
              <p>
                That is what we build. The AI is one component, chosen last and
                replaceable. The process around it is the part that makes the
                saving real, and the part you keep.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="What we automate."
            lede="Work that follows a pattern your team could explain to a new hire in an afternoon. These are the processes we are asked about most."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "Documents in, data out",
                detail:
                  "Invoices, contracts, applications, delivery notes and forms read, checked against your rules, and entered into the system they belong in.",
              },
              {
                term: "Inboxes and requests",
                detail:
                  "Incoming email and tickets sorted, routed to the right person, and answered in draft for someone to approve, in the language the customer wrote in.",
              },
              {
                term: "Onboarding and intake",
                detail:
                  "Customer, supplier and deal onboarding: information gathered, validated, filed and chased automatically. This is the work Layron does at Layer Finance.",
              },
              {
                term: "Reports",
                detail:
                  "The weekly or monthly report someone assembles by hand from four systems, produced on schedule and checked before it goes out.",
              },
              {
                term: "Answers from your own knowledge",
                detail:
                  "Agents that answer customers on your website, WhatsApp and Telegram, or staff internally, from your own documents and policies, with the source shown, and a handover to a person when they do not know.",
              },
              {
                term: "The glue between systems",
                detail:
                  "CRM, ERP, accounting and spreadsheets kept in step without anyone re-typing a record from one into another.",
              },
            ]}
          />
        </Container>
      </Band>

      {/* The one dark band on the page: the agents line, built on SuperCognit,
          with the partner badge as the proof. */}
      <Band tone="dark" className="border-t border-hair">
        <Container className="py-24 lg:py-28">
          <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-10">
            <div className="max-w-[40rem]">
              <p className="t-eyebrow text-on-dark-muted">AI agents, built on SuperCognit</p>
              <RevealText
                as="h2"
                className="t-display mt-8 max-w-[18ch] text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)] text-on-dark"
              >
                An agent for your customers, live in a month.
              </RevealText>
              <p className="t-body reveal-under mt-7 text-on-dark-body">
                Not every job is back-office. For the questions customers ask
                all day, we build agents on SuperCognit that answer from your
                own content on your website, WhatsApp and Telegram, take the
                booking or the lead, and hand over to your team when a person
                is needed.
              </p>
            </div>
            <div className="reveal">
              <PartnerBadge tone="dark" />
            </div>
          </div>

          <SpecTable
            onDark
            className="mt-16"
            rows={[
              {
                term: "Clinics and practices",
                detail:
                  "Services, prices and preparation answered; appointment requests reach the front desk complete. Anything clinical goes to your team.",
              },
              {
                term: "Professional services",
                detail:
                  "Intake that gathers the matter before anyone picks up, and a copilot over your own precedents and checklists.",
              },
              {
                term: "Shops, hotels and restaurants",
                detail:
                  "Product advice, order status, availability and bookings, in the customer's language, at the hour they ask.",
              },
            ]}
          />

          <p className="reveal mt-12">
            <a href="/agents" className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-on-dark">
              <span className="link">What we build on SuperCognit</span>
              <Arrow />
            </a>
          </p>
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="What every automation ships with."
            lede="For automations built in your systems, none of it is a product you rent from us. It is configuration, code and documentation inside accounts you own."
          />

          <Figure
            className="mt-14"
            kind="gate"
            alt="Work arrives in a queue, passes an automation that prepares it, and meets a review step. Most items pass; the ones that need a person wait at the review and are marked. Everything that passes writes a line into a log below."
            labels={[
              { x: 0.05, y: 0.86, text: "Incoming" },
              { x: 0.4, y: 0.86, text: "Automation", align: "center", only: "wide" },
              { x: 0.4, y: 0.9, text: "AI", align: "center", only: "narrow" },
              { x: 0.66, y: 0.92, text: "Review", align: "center", only: "wide" },
              { x: 0.68, y: 0.14, text: "Review", align: "center", only: "narrow" },
              { x: 0.05, y: 0.09, text: "The log", only: "wide" },
              { x: 0.05, y: 0.05, text: "The log", only: "narrow" },
            ]}
            toggle={{ key: "enforced", on: "Review on", off: "Review off", initial: true }}
            caption="Switch the review off and the work still goes out. Nothing is checked and nothing is written down."
          />
          <SpecTable
            className="mt-20"
            rows={[
              {
                term: "A defined scope",
                detail:
                  "What the automation does, what it never does, and what counts as done, written down and agreed before anything is built.",
              },
              {
                term: "Your systems",
                detail:
                  "Built into the email, CRM, ERP, accounting and storage you already run, with access limited to exactly what the process needs.",
              },
              {
                term: "Human review",
                detail:
                  "Explicit rules for what runs on its own and what waits for a named person. Decided by rule, not by whoever happens to notice.",
              },
              {
                term: "Exception handling",
                detail:
                  "When the input is unusual, incomplete or uncertain, the automation hands it to a person instead of guessing.",
              },
              {
                term: "A log",
                detail:
                  "Every item it handled, what it did, and who approved it, so you can answer a customer, an auditor or yourself six months later.",
              },
              {
                term: "Handover",
                detail:
                  "Documentation and working sessions for the people who will run it after we step back. An automation that leaves you dependent on us has failed on its own terms.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="paper" className="border-b border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="Built for European companies."
            lede="We are an EU company working with clients across Europe, and the rules your business runs under are part of the design, not an afterthought."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "GDPR from the first sketch",
                detail:
                  "Personal data mapped before the build, kept to what the process needs, and covered by a data processing agreement as standard.",
              },
              {
                term: "Data where it has to be",
                detail:
                  "EU-hosted models and infrastructure where your data requires it, and a plain statement of which step sends what, where.",
              },
              {
                term: "Decisions you can explain",
                detail:
                  "Each automation documents what it decides on its own and where a person decides instead, so the answer is ready when a customer or regulator asks.",
              },
              {
                term: "Contracting",
                detail:
                  "Fortbit d.o.o., registered in Croatia and operating from Poland. EU invoicing, reverse-charge VAT for EU businesses, and work in English on Central European time.",
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
        heading="Bring one process. We will bring the questions."
        lede="A working call, not a sales pitch. By the end you will know whether that process is worth automating, what it would involve, and what the first step costs."
        action="Book an automation call"
        detail="You will be talking to the engineer who would build it, not to a salesperson with an engineer on standby."
      />
    </>
  );
}

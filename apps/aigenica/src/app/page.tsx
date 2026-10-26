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
  RevealText,
  SectionHead,
  SpecTable,
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
            <Eyebrow className="rise">AI agents, built on SuperCognit</Eyebrow>
            <h1 className="t-display rise d1 mt-7">
              Answer every customer, in their language, at any hour.
            </h1>
          </div>

          <div className="lg:pt-4">
            <p className="t-lede rise d1 max-w-[38ch]">
              Agents for your website, WhatsApp and Telegram that answer from
              your own content, take the booking or the lead, and pass the
              conversation to your team the moment it needs a person.
            </p>
            <div className="rise d2 mt-9">
              <Button asChild size="lg">
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Book an agent call
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="sunk" className="border-y border-hair">
        <Container className="grid items-center gap-8 py-10 sm:grid-cols-[auto_1fr] sm:gap-14">
          <PartnerBadge tone="light" />
          <p className="t-body measure text-[1rem] text-body">
            AIgenica is a certified partner of{" "}
            <a href="https://supercognit.com" target="_blank" rel="noreferrer" className="link">
              SuperCognit
            </a>
            , the EU platform for AI agents and MCP servers. SuperCognit runs
            the infrastructure: hosting, models, domains, metering. We design,
            build, connect and look after your agent, and you deal with one
            company and receive one invoice. Built by the studio behind Layron,
            the AI deal workspace at Layer Finance.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHead heading="The questions arrive when you are closed." />
            <div className="t-body measure reveal grid gap-4 text-[1.0625rem] text-body">
              <p>
                What does it cost, are you open on Saturday, do you have a
                free slot this week, can I pay by card, what should I bring.
                Most of what customers ask has been answered a hundred times,
                and most of it arrives in the evening, on WhatsApp, in a
                language somebody on your team may not speak.
              </p>
              <p>
                A website chatbot that guesses is worse than none. What works
                is an agent that answers only from what you have approved,
                shows where the answer came from, does the next step itself
                when it is allowed to, and hands everything else to a person
                with the conversation attached.
              </p>
              <p>
                That is what we build on SuperCognit. The platform carries the
                hosting, the models and the channels. We carry what your agent
                knows, what it may do, and where it must stop.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="What we build on it."
            lede="Each of these is one agent, or one part of one. The first two are where to start; the rest are worth adding once the conversations show where they would pay."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "A website agent, open all night",
                detail:
                  "Answers questions about your services, prices, opening hours and policies from your own website and documents, and shows the source it answered from. Added to your site with one line of code, or on its own address.",
              },
              {
                term: "WhatsApp and Telegram",
                detail:
                  "The same agent, with the same knowledge, on the channels your customers already message you on. Change a price once and every channel answers with the new one.",
              },
              {
                term: "Bookings and intake",
                detail:
                  "Asks what your team would ask (which service, how urgent, which day suits) and creates the request in your booking system, with the details attached, so nobody has to call back to find out.",
              },
              {
                term: "Leads into your CRM",
                detail:
                  "Qualifies the enquiry in the conversation, collects contact details with consent, and puts the lead into Pipedrive, HubSpot or your inbox with the whole conversation behind it.",
              },
              {
                term: "Payment in the conversation",
                detail:
                  "A deposit, a consultation fee or an order paid through a Stripe checkout link the agent raises itself, confirmed in the same thread when it clears.",
              },
              {
                term: "Your team's own assistant",
                detail:
                  "Procedures, policies, price rules and product details answered for staff, with the source shown. It also works inside Claude, Cursor and other AI assistants your team uses, as a private MCP server.",
              },
              {
                term: "Work in systems with no API",
                detail:
                  "Supplier portals and older systems driven by a managed browser: the lookup, the form, the booking. Passwords are kept in an encrypted vault and never appear in the conversation.",
              },
              {
                term: "An MCP server for your product",
                detail:
                  "For software companies and consultancies: your API or your method packaged as tools any AI assistant can call, sold per seat with subscriptions and invoicing handled.",
              },
            ]}
          />
        </Container>
      </Band>

      {/* The one dark band on the page: the industries, with the partner
          badge as the proof that the platform underneath is SuperCognit's. */}
      <Band tone="dark" className="border-t border-hair">
        <Container className="py-24 lg:py-28">
          <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-10">
            <div className="max-w-[40rem]">
              <p className="t-eyebrow text-on-dark-muted">By industry</p>
              <RevealText
                as="h2"
                className="t-display mt-8 max-w-[18ch] text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)] text-on-dark"
              >
                Same platform. Different boundaries.
              </RevealText>
              <p className="t-body reveal-under mt-7 text-on-dark-body">
                What changes from one business to the next is what the agent
                knows, what it is allowed to do, and what it must always hand
                to a person.
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
                term: "Clinics and dental practices",
                detail:
                  "Services, prices and preparation answered; appointment requests reach the front desk complete. Anything clinical goes to your team.",
              },
              {
                term: "Law, tax and accounting",
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
            <a href="/industries" className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-on-dark">
              <span className="link">Every industry we build for</span>
              <Arrow />
            </a>
          </p>
        </Container>
      </Band>

      <Band tone="paper" className="border-b border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="What every agent ships with."
            lede="The difference between an agent and a chatbot on a website is everything around the answer."
          />

          <Figure
            className="mt-14"
            kind="gate"
            alt="Questions arrive in a queue and pass the agent. Most are answered and go through; the ones outside the agent's boundaries stop and wait for the team, and are marked. Every conversation that passes writes a line into the inbox below."
            labels={[
              { x: 0.05, y: 0.86, text: "Questions" },
              { x: 0.4, y: 0.86, text: "Agent", align: "center", only: "wide" },
              { x: 0.4, y: 0.9, text: "Agent", align: "center", only: "narrow" },
              { x: 0.66, y: 0.92, text: "Boundary", align: "center", only: "wide" },
              { x: 0.68, y: 0.14, text: "Boundary", align: "center", only: "narrow" },
              { x: 0.05, y: 0.09, text: "The inbox", only: "wide" },
              { x: 0.05, y: 0.05, text: "The inbox", only: "narrow" },
            ]}
            toggle={{ key: "enforced", on: "Boundaries on", off: "Boundaries off", initial: true }}
            caption="Switch the boundaries off and the agent still answers everything, including what belonged to your team. Nothing waits for a person and nothing is written down. That is a chatbot."
          />
          <SpecTable
            className="mt-20"
            rows={[
              {
                term: "Approved knowledge",
                detail:
                  "Your website, price lists, policies and documents, re-synced on a schedule, so the agent answers with today's prices rather than last year's. Every answer shows its source.",
              },
              {
                term: "Written boundaries",
                detail:
                  "What it answers, what it never answers, and the moment it hands over, in plain language you can read and change. Agreed before launch.",
              },
              {
                term: "Handover to your team",
                detail:
                  "When it reaches a boundary or the customer asks for a person, the conversation goes to your team with the whole thread attached. Nobody starts from zero.",
              },
              {
                term: "A shared inbox",
                detail:
                  "Every conversation your agent has, readable by your team, with the option to step in at any point. The record exists without anyone assembling it.",
              },
              {
                term: "Cost caps",
                detail:
                  "Usage is metered and capped per agent, so a busy week or a burst of spam cannot turn into a surprise bill.",
              },
              {
                term: "Looked after",
                detail:
                  "Knowledge refreshed when your business changes, the conversations it struggled with reviewed every month, and the agent corrected where it fell short.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="paper" className="border-b border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="Built for European businesses."
            lede="We are an EU company working with clients across Europe, on an EU platform, and the rules your business runs under are part of the design."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "GDPR from the first sketch",
                detail:
                  "Before launch we write down what the agent may ask for, why, and where it goes. Contact details are collected only with consent, and only what the next step needs.",
              },
              {
                term: "One workspace per client",
                detail:
                  "Your knowledge, conversations and contacts are kept in a workspace of your own, separate from every other client's.",
              },
              {
                term: "Your customers' languages",
                detail:
                  "One agent answers in the language each customer writes in, so you do not run a separate one for every market.",
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
        heading="Bring the ten questions you answer most."
        lede="On the call we go through which of them an agent can answer from your own content, which belong with your team, and what the first month would look like."
        action="Book an agent call"
        detail="You will be talking to the engineer who would build it, not to a salesperson with an engineer on standby."
      />
    </>
  );
}

import type { Metadata } from "next";
import {
  Band,
  BOOKING_URL,
  Button,
  Container,
  CtaBand,
  Eyebrow,
  Faq,
  RouteSteps,
  SectionHead,
  SpecTable,
} from "@genica/ui";
import { PartnerBadge } from "../../components/partner-badge";
import { AGENT_FAQ } from "../../content";

export const metadata: Metadata = {
  title: "AI agents",
  description:
    "AI agents for your website, WhatsApp and Telegram that answer from your own content, take bookings and leads, and hand over to your team. Built by AIgenica, a certified SuperCognit partner.",
  alternates: { canonical: "/agents" },
};

const LAUNCH = [
  {
    name: "Week 1: Scope and knowledge",
    body: "We agree what the agent answers, what it never answers, and the moment it hands a conversation to your team. Your website, price lists, policies and documents become its knowledge, and the boundaries are written in plain language you can read and change.",
    deliverable: "A working draft, answering from your own content, with sources shown.",
  },
  {
    name: "Weeks 2 and 3: Connect and test",
    body: "We connect it to the systems the conversation should end in: your booking system, CRM, shop or inbox. Your team puts real questions to it, the ones customers actually ask, and we correct everything it gets wrong.",
    deliverable: "The connections to your systems live, tested on real conversations.",
  },
  {
    name: "Week 4: Launch and review",
    body: "Live on your website and the channels you chose. At the end of the month we go through the conversations together: what it answered, what it handed over, what it missed, and what that means for the next month.",
    deliverable: "A launch review with the numbers and the next step.",
  },
  {
    name: "After launch: looked after",
    body: "Knowledge refreshed when your prices, hours or services change, the conversations it struggled with reviewed every month, and new connections added as you find uses for them.",
    deliverable: "One monthly invoice, and an agent that gets better rather than older.",
  },
];

export default function Agents() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="grid items-start gap-12 pt-16 pb-16 sm:pt-24 sm:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Eyebrow className="rise">AI agents, built on SuperCognit</Eyebrow>
            <h1 className="t-display rise d1 mt-7 text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
              Answer every customer, in their language, at any hour.
            </h1>
          </div>
          <div className="lg:pt-14">
            <p className="t-lede rise d1 max-w-[38ch] text-body">
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

      <Band tone="sunk" className="border-b border-hair">
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
            company and receive one invoice.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
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

      <Band tone="paper" className="border-t border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="What it does in your industry."
            lede="The platform is the same everywhere. What changes is what the agent knows, what it is allowed to do, and what it must always hand to a person."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "Clinics and dental practices",
                detail:
                  "Services, prices, preparation, what to bring and how to get there, answered in the patient's language. Appointment requests reach the front desk complete.",
                note: "Anything clinical is routed to your team, never answered by the agent.",
              },
              {
                term: "Law, tax and accounting firms",
                detail:
                  "Intake that gathers the matter, the urgency and the background before anyone picks up. Process and fee questions answered from approved text, and a copilot over your own precedents and checklists, kept separate per practice area.",
                note: "Advice is routed to a professional. The agent explains process, not law.",
              },
              {
                term: "Online shops",
                detail:
                  "A pre-sale advisor that knows the catalogue, live order status from your shop, shipping, returns and sizing from your own pages, and care and setup questions answered from the manuals.",
              },
              {
                term: "Hotels, restaurants and travel",
                detail:
                  "Availability, bookings and the hundred small questions guests ask, on the website and on WhatsApp, in the guest's language and at the hour they ask them.",
              },
              {
                term: "Education and training",
                detail:
                  "Course, enrolment and schedule questions answered, places reserved and paid for, and paid access to an expert agent for the people who want more than the brochure.",
              },
              {
                term: "Fitness and wellness",
                detail:
                  "Memberships, timetables, trial sessions and class bookings, handled at the moment someone decides to come in.",
              },
              {
                term: "Software companies",
                detail:
                  "Onboarding and support answered from your documentation, and your API offered as an MCP server so customers can use your product from their own AI assistant.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="Live in a month."
            lede="Four weeks from the first call to an agent answering your customers, with your team testing it on real questions before anyone outside sees it."
          />
          <RouteSteps stops={LAUNCH} className="mt-14" />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="Before you buy."
            lede="The things worth knowing on the first call, said up front."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "What it costs",
                detail:
                  "A one-off fee to build and launch, then a monthly fee per agent covering the platform, the AI usage and our looking after it. Usage is capped, so a busy week cannot become a surprise bill. You can cancel any month.",
              },
              {
                term: "Who runs what",
                detail:
                  "SuperCognit runs the platform. We build, connect and maintain your agent. Your team reads every conversation in a shared inbox and can take one over at any point.",
              },
              {
                term: "Your content stays yours",
                detail:
                  "The agent's knowledge is your own website and documents, in a workspace of your own, separate from every other client's.",
              },
              {
                term: "Personal data",
                detail:
                  "Before launch we write down what the agent may ask for, why, and where it goes. It collects contact details only with consent, and only what the next step needs.",
              },
              {
                term: "When an agent is the wrong answer",
                detail:
                  "When most questions need a professional's judgment, when you receive a handful a week, or when the real problem is a back-office process. That is the automation work on the rest of this site, and we will say which one you need.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHead heading="Asked about agents." />
            <Faq items={AGENT_FAQ} />
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

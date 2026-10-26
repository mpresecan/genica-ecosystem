import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  RouteSteps,
  SectionHead,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "What an AIgenica agent built on SuperCognit answers, does and hands over in clinics, law and accounting firms, online shops, hospitality, education, fitness and software companies.",
  alternates: { canonical: "/industries" },
};

/* Each industry as answers / does / never. The "never" line is the part a
   buyer in that industry is actually checking for, so it is the deliverable
   line, set in mono where the eye lands last. */
const INDUSTRIES = [
  {
    name: "Clinics and dental practices",
    body: "Answers which treatment or specialist fits, what it costs, how to prepare, what to bring and how to get there, in the patient's language. Collects what the front desk needs and creates the appointment request in your scheduling system, so nobody calls back to ask again.",
    deliverable: "Never: anything clinical. Symptoms, diagnoses and medication go to your team.",
  },
  {
    name: "Law, tax and accounting firms",
    body: "Intake that gathers the matter type, the urgency and the background before anyone picks up, then creates the enquiry in your practice system. Process, document and fee questions answered from approved text. Inside the firm, a copilot over your own precedents, checklists and procedures, kept separate per practice area.",
    deliverable: "Never: advice. The agent explains process; a professional gives the opinion.",
  },
  {
    name: "Online shops",
    body: "A pre-sale advisor that knows your catalogue and recommends what fits. Live order status from your shop's API, shipping, returns, warranty and sizing answered from your own pages, and setup and care questions answered from the manuals before they become tickets.",
    deliverable: "Never: refunds or exceptions to policy. Those go to a person with the order attached.",
  },
  {
    name: "Hotels, restaurants and travel",
    body: "Availability, bookings, menus, directions, parking, check-in times and the hundred small questions guests ask, on the website and on WhatsApp, in the guest's language and at the hour they ask them. Deposits taken in the conversation where you want them.",
    deliverable: "Never: complaints or special arrangements. Those reach your staff, not a script.",
  },
  {
    name: "Education and training",
    body: "Course, schedule, entry requirement and enrolment questions answered from your programme, places reserved and paid for in the conversation, and, for experts, paid access to an agent that answers from your own material.",
    deliverable: "Never: grades, exceptions or anything a tutor should decide.",
  },
  {
    name: "Fitness and wellness",
    body: "Memberships, prices, timetables, trial sessions and class bookings, handled at the moment someone decides to come in rather than the next morning.",
    deliverable: "Never: medical or injury advice. That goes to a qualified person.",
  },
  {
    name: "Software companies",
    body: "Onboarding and support answered from your documentation, with the source linked. Your API packaged as an MCP server, so customers can use your product from Claude, Cursor or any other AI assistant, sold per seat if you want it to be.",
    deliverable: "Never: account changes or billing disputes without a person.",
  },
];

export default function Industries() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <h1 className="t-display rise mt-8 max-w-[20ch] text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
            What the agent knows, does, and never touches.
          </h1>
          <p className="t-lede rise d1 measure mt-7 text-body">
            SuperCognit is the same platform in every business. What we set
            differently is the knowledge, the actions it may take, and the
            line it must never cross, because in your industry that line is
            the part you are actually buying.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-16 sm:py-24">
          <RouteSteps stops={INDUSTRIES} />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="Not on the list?"
            lede="These are the businesses SuperCognit is built around, not a limit. If your customers ask the same questions every day and your team answers them by hand, the shape is the same, and the first call is where we find out."
          />
        </Container>
      </Band>

      <CtaBand
        heading="Bring the ten questions you answer most."
        lede="We will go through which of them an agent can answer from your own content, and which belong with your team."
        action="Book an agent call"
      />
    </>
  );
}

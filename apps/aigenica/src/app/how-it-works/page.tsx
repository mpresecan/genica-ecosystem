import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  Figure,
  RouteSteps,
  SectionHead,
  SpecTable,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How an AIgenica agent on SuperCognit handles a conversation: understand, look up, act, confirm. Where it hands over to your team, and the controls that hold at each step.",
};

const STAGES = [
  {
    name: "Understand",
    body: "A customer writes on your website, WhatsApp or Telegram, in whatever language they think in. The agent works out what they are asking and whether it is inside what it is allowed to handle.",
    deliverable: "Outside the boundaries: handed to your team, here, before anything else happens.",
  },
  {
    name: "Look up",
    body: "It answers from the knowledge you approved: your website, price lists, policies and documents, kept in sync on a schedule. Where it needs live data, an order, a free slot, a record, it asks your system through a connection scoped to that one question.",
    deliverable: "An answer with its source, or a plain “I don’t know” and a handover.",
  },
  {
    name: "Act",
    body: "Where you have allowed it, it does the next step itself: the appointment request, the lead in your CRM, the checkout link, the form on a supplier portal. Each action is one you agreed in advance, and nothing else is in reach.",
    deliverable: "The booking made, the lead filed, the payment raised.",
  },
  {
    name: "Confirm",
    body: "The customer gets a confirmation in the same conversation, and the whole thread, with what the agent looked up and what it did, lands in the shared inbox where your team can read it or take over.",
    deliverable: "A conversation your team can pick up without asking the customer to repeat anything.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h1 className="t-display rise mt-8 text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
                Hand over before it acts, not after.
              </h1>
            </div>
            <div className="lg:pt-16">
              <p className="t-lede rise d1 measure text-body">
                The decision that separates a useful agent from an
                embarrassing one is where it stops and passes the
                conversation to a person. Stop it after it has booked the
                wrong slot and your team spends its day undoing things. Stop
                it before it acts, and a correction costs one sentence.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <SectionHead heading="Four steps, and an inbox of all of them." />

          <Figure
            className="mt-14"
            kind="stages"
            alt="Conversations moving through understand, look up, act and confirm. A handover stands after one of them; conversations outside the agent's boundaries leave there and accumulate below as work someone has to undo. Moving the handover later increases the pile."
            labels={[
              { x: 0.156, y: 0.94, text: "Understand", align: "center", index: 0 },
              { x: 0.387, y: 0.94, text: "Look up", align: "center", index: 1 },
              { x: 0.619, y: 0.94, text: "Act", align: "center", index: 2 },
              { x: 0.85, y: 0.94, text: "Confirm", align: "center", index: 3 },
              { x: 0.04, y: 0.05, text: "To undo" },
            ]}
            choices={{
              key: "gate",
              label: "Handover after",
              options: ["Understand", "Look up", "Act", "Confirm"],
              initial: 1,
            }}
            caption="The same share of conversations outside the agent's boundaries at each position. The handover belongs before the agent acts, because that is where catching it costs the least, and the pile below is the difference."
          />

          <RouteSteps stops={STAGES} className="mt-20" />
          <p className="measure mt-16 border-t border-hair pt-7 text-[0.9375rem] leading-[1.6] text-body">
            The inbox is not an extra step. Every conversation is written to
            it as it happens, so the record of what the agent said and did
            exists without anyone assembling it afterwards.
          </p>
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="The controls, stated plainly."
            lede="These are the questions we expect your data protection officer, your IT lead or your practice manager to ask, and the answers every agent is built to give."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "What can it say?",
                detail:
                  "Only what the approved knowledge supports, with the source shown. Where the knowledge is silent, it says so and hands over rather than filling the gap.",
              },
              {
                term: "What can it do?",
                detail:
                  "Only the actions you agreed: each connection to your systems is scoped to one job, and passwords for portals are held in an encrypted vault, never in the conversation or in the agent's context.",
              },
              {
                term: "Where does our data go?",
                detail:
                  "Into your own workspace on SuperCognit, separate from every other client's. Before launch we list what the agent collects, why, and which of your systems it is passed to.",
              },
              {
                term: "Who can see the conversations?",
                detail:
                  "Your team, in the shared inbox, with roles you control. Every thread can be read in full, and any of them can be taken over by a person mid-conversation.",
              },
              {
                term: "What stops costs running away?",
                detail:
                  "Every call is metered, with caps per agent and per workspace. When a cap is reached, the agent stops spending rather than sending you the bill.",
              },
              {
                term: "What happens when the AI model changes?",
                detail:
                  "SuperCognit runs the models. Your knowledge, your boundaries and your connections stay as they are, and we check the agent's answers after any change that touches them.",
              },
            ]}
          />
        </Container>
      </Band>

      <CtaBand
        heading="Where does your agent hand over?"
        lede="If you have not decided, that is the conversation. Book a call and we will walk your most common customer questions through these four steps."
        action="Book an agent call"
      />
    </>
  );
}

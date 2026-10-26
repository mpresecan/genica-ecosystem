import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  SectionHead,
  SpecTable,
} from "@genica/ui";
import { PartnerBadge } from "../../components/partner-badge";

export const metadata: Metadata = {
  title: "Engagements",
  description:
    "How an AIgenica agent engagement runs: a month to launch on SuperCognit, then looked after monthly. What each stage delivers, what it costs in shape, and what it asks of your team.",
};

export default function Engagements() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <h1 className="t-display rise mt-8 max-w-[20ch] text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
            A month to launch. Then it is looked after.
          </h1>
          <p className="t-lede rise d1 measure mt-7 text-body">
            Four weeks from the first call to an agent answering your
            customers, with your team testing it on real questions before
            anyone outside sees it. After that, a monthly fee and an agent
            that gets better rather than older.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-16 sm:py-24">
          <SpecTable
            rows={[
              {
                term: "Week 1: Scope and knowledge",
                detail:
                  "We agree what the agent answers, what it never answers, and the moment it hands a conversation to your team. Your website, price lists, policies and documents become its knowledge, and the boundaries are written in plain language you can read and change.",
                note: "Ends with a working draft, answering from your own content, sources shown.",
              },
              {
                term: "Weeks 2 and 3: Connect and test",
                detail:
                  "We connect it to the systems the conversation should end in: your booking system, CRM, shop or inbox, and the channels you chose. Your team puts real questions to it, the ones customers actually ask, and we correct everything it gets wrong.",
                note: "Ends with the connections live and tested on real conversations.",
              },
              {
                term: "Week 4: Launch and review",
                detail:
                  "Live on your website, WhatsApp or Telegram. At the end of the month we go through the conversations together: what it answered, what it handed over, what it missed.",
                note: "Ends with a launch review: the numbers and the next step.",
              },
              {
                term: "Every month after: Looked after",
                detail:
                  "Knowledge refreshed when your prices, hours or services change, the conversations it struggled with reviewed, new connections or channels added as you find uses for them.",
                note: "One monthly invoice from us. Cancel any month.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="sunk" className="border-t border-b border-hair">
        <Container className="grid items-start gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_auto] lg:gap-20">
          <SectionHead
            heading="Who does what."
            lede="SuperCognit runs the platform: hosting, models, channels, domains, metering. We are a certified partner, and we design, build, connect and maintain your agent. Your team owns the answers and reads the inbox. You deal with one company, and receive one invoice."
          />
          <div className="reveal lg:pt-2">
            <PartnerBadge tone="light" />
          </div>
        </Container>
      </Band>

      <Band tone="paper" className="border-b border-hair">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead heading="What we need from you." />
              <ul className="mt-10 grid gap-px">
                {[
                  [
                    "Someone who owns the answers",
                    "A person who can say what the right answer is and decide when the agent has it right. Without them, the agent answers with nobody's authority.",
                  ],
                  [
                    "Your most-asked questions",
                    "The real ones, from your inbox, your phone and your WhatsApp, including the awkward ones. An agent tested on made-up questions proves nothing.",
                  ],
                  [
                    "Access, early",
                    "To your booking system, CRM or shop in the first week, if the agent is to act in them. We work to your IT and data protection review, not around it.",
                  ],
                  [
                    "Permission to read the conversations",
                    "The monthly review is how the agent improves. It needs someone on your side to look at what it missed.",
                  ],
                ].map(([h, b]) => (
                  <li key={h} className="row reveal border-b border-hair py-6 first:border-t">
                    <h3 className="t-h3 row-term text-[1.0625rem]">{h}</h3>
                    <p className="t-body mt-2 text-[0.9375rem] text-body">{b}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHead heading="When we will tell you not to." />
              <ul className="mt-10 grid gap-px">
                {[
                  [
                    "The volume is too low",
                    "A handful of questions a week rarely repays an agent. A clear page on your website is cheaper, and we will say so.",
                  ],
                  [
                    "Every question needs a professional",
                    "If nearly everything customers ask needs a doctor's, lawyer's or engineer's judgment, an agent can only take messages. A good contact form does that for less.",
                  ],
                  [
                    "Nobody agrees on the answers",
                    "An agent repeats your answers faster and more often. If your team gives different ones, agree them first; that may be all you need.",
                  ],
                  [
                    "You want a demo for the board",
                    "We do not build showcases. An agent nobody's customers talk to will look impressive and change nothing.",
                  ],
                ].map(([h, b]) => (
                  <li key={h} className="row reveal border-b border-hair py-6 first:border-t">
                    <h3 className="t-h3 row-term text-[1.0625rem]">{h}</h3>
                    <p className="t-body mt-2 text-[0.9375rem] text-body">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Start with your ten most-asked questions."
        lede="On the call we go through which an agent can answer from your own content, which belong with your team, and what the first month would cost."
        action="Book an agent call"
      />
    </>
  );
}

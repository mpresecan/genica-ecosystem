import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  RouteSteps,
  SectionHead,
  SpecTable,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From scoping call to first sale: what happens at each stage, what we need from you, and how an Edugenica engagement is priced.",
};

const ROUTE = [
  {
    name: "Scope the format",
    body: "One call, then a written scope. What you teach, who buys it, how it is priced, who may see what, and the date you want to sell on. Decisions here cost minutes; the same decisions after the build cost weeks.",
    deliverable: "A written scope, a launch date and a fixed price.",
  },
  {
    name: "Build the platform",
    body: "Design and build against the scope, on the studio’s own production stack. You see it working early and often, not as screenshots, but as a platform you can log into and put real material in.",
    deliverable: "A staging platform with your brand, your checkout and your content model.",
  },
  {
    name: "Launch",
    body: "We load the first event or cohort with you, rehearse the live path end to end (buy a ticket, get the email, join, watch, get the replay) and stay on hand through the first real sales.",
    deliverable: "A live platform taking money, rehearsed before an audience saw it.",
  },
  {
    name: "Run it",
    body: "Everything after the first event is yours to publish without us. Where you want a technical hand kept on it, that runs as a retainer you can end at any point.",
    deliverable: "Code, database, domain and audience list, all in your name.",
  },
];

export default function Process() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h1 className="t-display rise mt-8 text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
                Four to six weeks from scope to first sale.
              </h1>
            </div>
            <div className="lg:pt-16">
              <p className="t-lede rise d1 measure text-body">
                That is a single-format launch, one webinar series or one
                course, with a signed scope and your material ready. A
                multi-track conference takes longer, and you will get the real
                number after the call rather than a comfortable one before it.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <SectionHead heading="The route." />
          <RouteSteps stops={ROUTE} className="mt-14" />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead heading="What we need from you." />
              <ul className="mt-10 grid gap-px">
                {[
                  [
                    "The material, or a date it will exist",
                    "We can build ahead of your content, but not launch ahead of it. Most delays are a curriculum that was going to be finished last week.",
                  ],
                  [
                    "One decision-maker",
                    "Someone who can settle pricing, access rules and the brand without a committee. The scope is short because the decisions are made once.",
                  ],
                  [
                    "Your payment account",
                    "The money goes to you from the first sale, which means the account is yours and set up in your name before launch.",
                  ],
                  [
                    "A realistic first date",
                    "Pick a date you can market to. A platform with nothing scheduled on it teaches you nothing, and the first event is what shapes the second.",
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
              <SectionHead heading="How it is priced." />
              <SpecTable
                className="mt-10"
                rows={[
                  {
                    term: "Fixed price for the build",
                    detail:
                      "Quoted against the written scope after the call, invoiced in stages. No hourly surprise, and no percentage of what you sell, ever.",
                  },
                  {
                    term: "Running costs are yours, directly",
                    detail:
                      "Hosting, streaming and payment processing are billed to your accounts by those providers. We do not resell infrastructure at a markup.",
                  },
                  {
                    term: "Retainer, only if you want one",
                    detail:
                      "Ongoing technical support and new formats run as a monthly retainer. It is never a condition of the build, and platforms we hand over are documented to be handed over.",
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Pick a date and work backwards."
        lede="Bring the format you have in mind and the date you would like to sell on. We will tell you whether it is reachable, and what it costs to reach it."
        action="Book a call"
      />
    </>
  );
}

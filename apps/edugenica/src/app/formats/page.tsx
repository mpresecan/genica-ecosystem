import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  SectionHead,
  SpecTable,
  Eyebrow,
} from "@genica/ui";
import { INCLUDED } from "../../content";

export const metadata: Metadata = {
  title: "Formats",
  description:
    "Webinars, courses, masterclasses, conferences and streamed events, what each format asks of the platform, and who each one suits.",
};

const DETAIL = [
  {
    name: "Webinars",
    suits:
      "Consultants and trainers with an audience already listening, who want a paid session running this month rather than a course finished next quarter.",
    body: "A webinar is a deadline with an audience attached, which is why it is the fastest thing to launch and the fastest to teach you what your audience will pay for. The platform handles registration, the reminder sequence that decides your attendance rate, the live room, and the replay, because the replay is where most of the revenue arrives.",
    build: [
      "Registration pages with tiered or free/paid entry",
      "Reminder sequence at booking, day-before and hour-before",
      "Live room or embedded stream with access checks",
      "Replay library that keeps selling after the date",
    ],
  },
  {
    name: "Courses",
    suits:
      "Experts with a curriculum that does not change every month, who want income that does not require them to be in a room.",
    body: "A course earns while you are doing something else, but only if enrolment, sequencing and progress work without you. We build the release schedule you designed once (drip, cohort or fully self-paced) with certificates at the end and a progress view that tells you where people stop.",
    build: [
      "Enrolment, modules and lesson sequencing",
      "Drip, cohort or self-paced release",
      "Progress tracking, completion and certificates",
      "Drop-off reporting by lesson, so you can fix the one that loses people",
    ],
  },
  {
    name: "Masterclasses",
    suits:
      "Practitioners selling access to themselves at a price a course page cannot justify.",
    body: "The economics of a masterclass rest on scarcity and on who is in the room, which means the platform has to support applications and rejection, not just a checkout button. Limited seats, an application step, and a framing that makes the price obvious before anyone reaches the payment page.",
    build: [
      "Application forms with review and approval",
      "Hard seat limits and waiting lists",
      "Deposit or full payment on acceptance",
      "Private cohort space for the group",
    ],
  },
  {
    name: "Conferences",
    suits:
      "Organisers running a programme with speakers, sponsors and more than one thing happening at a time.",
    body: "A conference is the format where everything arrives at once: the ticket rush, the schedule change, the sponsor who needs their logo live today, and four hundred people checking in within twenty minutes. The platform is built for that day rather than for the average one.",
    build: [
      "Multi-track schedule with speakers and sessions",
      "Tiered, group and early-bird ticketing with codes",
      "Sponsor placements managed without a developer",
      "Check-in and attendee communication on the day",
    ],
  },
  {
    name: "Streamed events",
    suits:
      "Anyone charging for a live broadcast who needs the access control to actually hold.",
    body: "Paid streaming fails in one of two ways: the stream buckles under the audience, or the link travels. We put the video on a provider sized for your scale and keep the access decision in the platform, tied to the ticket, the person and the device count you chose.",
    build: [
      "Ticket-bound stream access with device limits",
      "Streaming provider selected and load-tested for your scale",
      "Pay-per-view, season pass or bundled-with-membership pricing",
      "Recording released to the same audience afterwards",
    ],
  },
];

export default function Formats() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <h1 className="t-display mt-8 max-w-[20ch] text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
            Five formats, one platform underneath.
          </h1>
          <p className="t-lede measure mt-7 text-body">
            Start with the one that earns soonest. The platform is built so the
            next four do not require starting again, the same audience, the
            same checkout, the same brand.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-10 sm:py-14">
          {DETAIL.map((f) => (
            <section
              key={f.name}
              className="grid gap-8 border-t border-hair py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20"
            >
              <div>
                <h2 className="t-h3 text-[clamp(1.6rem,1.3rem+1vw,2.25rem)]">
                  {f.name}
                </h2>
                <p className="t-body mt-4 text-[0.9375rem] text-muted">
                  <Eyebrow as="span" className="mr-2 text-ink">Suits</Eyebrow>
                  {f.suits}
                </p>
              </div>
              <div>
                <p className="t-body measure text-[1.0625rem] text-body">
                  {f.body}
                </p>
                <ul className="mt-7 grid gap-px">
                  {f.build.map((b) => (
                    <li
                      key={b}
                      className="flex gap-4 border-b border-hair py-3 text-[0.9375rem] text-ink first:border-t"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.55em] block size-[9px] shrink-0 rounded-full border-[3px] border-accent"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="Whichever format you pick, this is underneath it."
            lede="The parts that have to exist before you can sell a seat and sleep afterwards."
          />
          <SpecTable className="mt-14" rows={INCLUDED} />
        </Container>
      </Band>

      <CtaBand
        heading="Not sure which format fits?"
        lede="Describe what you teach and who listens. We will tell you which of the five earns soonest for you, and what it takes to launch it."
        action="Book a call"
      />
    </>
  );
}

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
  RouteSteps,
  SectionHead,
  SpecTable,
} from "@genica/ui";
import { FAQ, FORMATS, INCLUDED } from "../content";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const ROUTE = [
  {
    name: "Scope the format",
    body: "What you teach decides the platform, not the other way round. We settle the format, the pricing rules, the access rules and the launch date before anything is designed.",
    deliverable: "A written scope, a launch date and a fixed price.",
  },
  {
    name: "Build the platform",
    body: "Your brand, your domain, your checkout. Built on the studio’s own production stack rather than assembled from plugins that will disagree with each other in a year.",
    deliverable: "A platform you can log into and load your material in.",
  },
  {
    name: "Launch",
    body: "We load the first cohort or event with you, rehearse the live path end to end, and watch the first sales come through together rather than reading about them afterwards.",
    deliverable: "A live platform taking money, with you on the inside of it.",
  },
  {
    name: "Run it",
    body: "Every event after the first is yours to publish. We stay on retainer if you want a hand on the technical side, and step back entirely if you do not.",
    deliverable: "The code, the database and the audience list, in your name.",
  },
];

export default function Home() {
  return (
    <>
      <Band tone="paper">
        <Container className="grid items-start gap-12 pt-20 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pt-24 lg:pb-28">
          <div>
            <Eyebrow className="rise">Education platforms</Eyebrow>
            <h1 className="t-display rise d1 mt-7">Your knowledge. Your platform.</h1>
          </div>

          <div className="lg:pt-4">
            <p className="t-lede rise d1 max-w-[38ch]">
              Courses, masterclasses, conferences and streamed events, under your brand and owned by you.
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
          <Eyebrow className="text-muted">Formats</Eyebrow>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {["Webinars", "Courses", "Masterclasses", "Conferences", "Streamed events"].map(
              (n) => (
                <li key={n} className="t-h3 text-[1.0625rem] text-body">
                  {n}
                </li>
              )
            )}
          </ul>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHead heading="Your audience is spread across four rented tools." />
            <div className="t-body measure grid gap-4 text-[1.0625rem] text-body">
              <p>
                The course lives on one platform, the webinars on another, the
                tickets on a third and the mailing list on a fourth. Each takes
                a cut or a monthly fee, each holds a piece of your audience,
                and none of them looks like you.
              </p>
              <p>
                The cost is not really the subscriptions. It is that nobody can
                answer simple questions, who bought the course and then came
                to the conference, which session sold the masterclass, what a
                returning attendee is worth, because no single system has ever
                seen the whole person.
              </p>
              <p>
                A platform of your own is not a vanity project. It is the only
                arrangement in which the answers exist, and the only one where
                the audience you spent years building belongs to you.
              </p>
            </div>
          </div>

          <Figure
            className="mt-16"
            kind="sources"
            alt="Four boxes, one per rented tool, each holding part of the audience. The records move down into a single database and sort into one list; the records that existed in more than one tool merge and are marked."
            labels={[
              { x: 0.155, y: 0.89, text: "Course platform", align: "center", only: "wide", index: 0 },
              { x: 0.385, y: 0.89, text: "Webinar tool", align: "center", only: "wide", index: 1 },
              { x: 0.615, y: 0.89, text: "Ticketing", align: "center", only: "wide", index: 2 },
              { x: 0.845, y: 0.89, text: "Mailing list", align: "center", only: "wide", index: 3 },
              { x: 0.17, y: 0.47, text: "Your database", only: "wide" },
              { x: 0.06, y: 0.35, text: "Your database", only: "narrow" },
            ]}
            caption="The marked records are the people who were in more than one tool: the buyer who also came to the conference, the attendee who bought the masterclass. Until the lists are one list, nobody can see them."
          />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="One platform, five ways to sell."
            lede="Most clients start with one format and add the next once the first is paying for itself. The platform is built to take them all from the beginning."
          />
          <SpecTable className="mt-14" rows={FORMATS} />
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <SectionHead
            heading="What every platform includes."
            lede="Not a feature list to compare. These are the parts that have to exist before you can sell a seat and sleep afterwards."
          />
          <SpecTable className="mt-14" rows={INCLUDED} />
        </Container>
      </Band>

      <Band tone="sunk" className="border-t border-hair">
        <Container className="py-20 sm:py-28">
          <SectionHead heading="How it goes." />
          <RouteSteps stops={ROUTE} className="mt-14" />
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHead heading="Before you book." />
            <Faq items={FAQ} />
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="Tell us what you teach."
        lede="We will tell you which format earns fastest, what the platform needs to do, and what it costs. If an off-the-shelf tool would serve you better, we will say that instead."
        action="Book a call"
        detail="Edugenica is the education practice of Genica, an EU software studio. Previously published as sellknow.com."
      />
    </>
  );
}

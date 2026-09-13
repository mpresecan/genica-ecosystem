import type { QA } from "@genica/ui";

export const FORMATS = [
  {
    term: "Webinars",
    detail:
      "One-off or recurring sessions with registration, reminders, live delivery and a replay that keeps selling after the room has emptied.",
    note: "The fastest format to launch, and the one most people start with.",
  },
  {
    term: "Courses",
    detail:
      "Self-paced programmes that run without you: enrolment, sequencing, progress tracking, certificates, and the release schedule you designed once and never touch again.",
    note: "Built to keep earning on the weeks you are not working.",
  },
  {
    term: "Masterclasses",
    detail:
      "Small, high-price cohorts with applications, limited seats, and the personal framing that justifies the price, rather than a course page with a bigger number on it.",
  },
  {
    term: "Conferences",
    detail:
      "Multi-track programmes with speakers, schedules, tiered and group tickets, sponsors, and an attendee experience that holds up on the one day everyone arrives at once.",
  },
  {
    term: "Streamed events",
    detail:
      "Live broadcast to a paying audience, with access control that actually holds, not a link that stays private because everyone remembered not to share it.",
  },
];

export const INCLUDED = [
  {
    term: "Your brand, your domain",
    detail:
      "The platform carries your name, not ours and not a marketplace’s. Attendees never leave your world to pay, to watch, or to come back.",
  },
  {
    term: "Ticketing and checkout",
    detail:
      "Card payments, tiered pricing, discount and group codes, invoices, and EU VAT handled correctly rather than approximately.",
  },
  {
    term: "Access control",
    detail:
      "Who may watch what, for how long, on how many devices, enforced by the platform instead of by everyone’s good manners.",
  },
  {
    term: "Participants",
    detail:
      "Registrations, attendance, cohorts and communication in one place, so the answer to “who is actually coming” takes a second rather than a spreadsheet.",
  },
  {
    term: "Email that belongs to the event",
    detail:
      "Confirmations, reminders, replays and follow-ups, written once and sent by the platform at the moment each participant reaches it.",
  },
  {
    term: "Your audience list",
    detail:
      "In your database, exportable, and yours when the engagement ends. This is the asset most rented platforms quietly keep.",
  },
];

export const FAQ: QA[] = [
  {
    q: "Why not just use an existing course platform?",
    a: "If an off-the-shelf platform fits what you do, use it, it will be cheaper than us, and we will tell you so on the call. People come to us when the format does not fit the tool: applications before enrolment, a conference and a course sharing one audience, pricing rules a template cannot express, or a brand that cannot look like everyone else’s.",
  },
  {
    q: "Do you take a percentage of sales?",
    a: "No. You pay for the build, and the payment processor takes its fee. We never sit between you and your revenue, and we never hold your audience list.",
  },
  {
    q: "Who owns the platform afterwards?",
    a: "You do, the code, the domain, the database and the accounts. If you want us to keep running it, that is a separate retainer you can end.",
  },
  {
    q: "How long until I can sell tickets?",
    a: "A single-format launch (one webinar series or one course) is typically four to six weeks from a signed scope. A multi-track conference with sponsors and tiered ticketing takes longer, and the honest estimate arrives after the scoping call rather than before it.",
  },
  {
    q: "Can it handle a live audience arriving at once?",
    a: "Yes. Ticketing, access checks and the pages around the stream are built to absorb the spike; the video itself runs on a streaming provider chosen for your scale. We load-test before your first live date, not after it.",
  },
  {
    q: "I already have a website. Does this replace it?",
    a: "Usually not. The platform can live on a subdomain and share your brand, or absorb the site entirely if the site is the thing holding you back. We look at what you have before recommending either.",
  },
  {
    q: "Can you migrate my existing courses and customers?",
    a: "In most cases, yes, content, enrolments and purchase history, with existing customers keeping their access. Migration is scoped separately once we have seen what the current system will let us export.",
  },
  {
    q: "Who is behind this?",
    a: "Edugenica is the education practice of Genica, an EU software studio. This work was previously published as sellknow.com; it now runs on the studio’s own product stack rather than on a third-party platform that is no longer maintained.",
  },
];

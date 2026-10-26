# Genica — product truth

<!-- impeccable:product-schema 1 -->

Four commercial properties operated by one studio. Every site's job is the
same: get a qualified person onto a call.

## Platform

web

## The operator

Fortbit d.o.o., a Croatian-registered software studio operating from Poland.
Founder-led (Michael Presecan), senior people brought in per engagement. EU
invoicing, reverse-charge VAT for EU business clients. No equity taken, ever.
Works in English, across EU and US time zones.

## The four lines

| Line | Domain | Sells | To |
|---|---|---|---|
| Genica | genica.org | SaaS product engineering, MVP→MLP, fractional technical direction | Founders, pre-seed to Series A; operators building outside the roadmap |
| AIgenica | aigenica.com | AI agents built on SuperCognit (certified partner): website, WhatsApp and Telegram agents, bookings, leads, internal assistants, MCP servers, across Europe | European businesses that answer the same customer questions every day |
| EduGenica | edugenica.com | Branded course / conference / event platforms | Consultants, trainers, experts, event organisers |
| FlowGenica | flowgenica.com | Agency delivery workflow — consulting now, SaaS in build | Agency and studio owners past ~8 people |

Genica is the studio; the other three are its practices and say so on their
own sites ("part of Genica, an EU software studio"). EduGenica is the
continuation of work previously published as sellknow.com, now on the studio's
own stack.

## Users

The visitor is a buyer, not an end user: a founder, engineering leader,
expert, or agency owner at a laptop mid-morning with several vendor tabs open,
deciding whether to book a call and about to forward one link to a co-founder
or partner. Their job on the site is to check the facts a buyer checks first
(scope, ownership, basis, who is behind it) and decide whether the call is
worth 45 minutes.

Per line:

- **Genica:** founders and small teams building SaaS, pre-seed to Series A;
  operators inside larger companies who need something built outside the
  roadmap queue. Often arriving with a sketch or a half-built product.
- **AIgenica:** owners and managers of small and medium businesses across
  Europe (clinics and dental practices, law/tax/accounting firms, online
  shops, hotels and restaurants, education, fitness, software companies)
  whose staff answer the same customer questions every day, often after
  hours, in several languages, on WhatsApp. Repositioned from agentic
  delivery pipelines on 15 Oct 2026, then on 26 Oct 2026 to focus solely on
  agents built on SuperCognit, after Michael became a certified partner.
- **EduGenica:** consultants, trainers, experts and event organisers whose
  format no longer fits a rented platform (applications before enrolment, a
  conference and a course sharing one audience, pricing rules a template
  cannot express, a brand that cannot look like everyone else's).
- **FlowGenica:** agency and studio owners past roughly eight people, where
  the way the agency delivers lives in a spreadsheet and a partner's memory.

## Product Purpose

Each site exists to earn one action, a booked call, from a qualified visitor.
Success is a call booked by someone the copy was written for. There is no
second conversion, no lead capture, no content funnel.

## Positioning

Confirmed as the network's shared claim: **the studio decides before it
builds, and is paid for the work rather than for a stake in it.** Each line
carries its own mechanism under that claim:

- Genica writes a specification before it writes code; most of the value
  arrives before the code, in the sequence and the decisions about what not
  to build. If a client only needs hands against a spec they already trust,
  an agency is cheaper, and the site says so.
- AIgenica builds AI agents on SuperCognit, as a certified partner: answers
  from approved, cited knowledge; written boundaries; actions in the client's
  systems only where agreed (bookings, CRM leads, Stripe checkout, browser
  tasks); handover to a person before the agent acts; every conversation in
  a shared inbox; cost caps. GDPR is part of the design. The platform is a
  monthly service, so AIgenica is the exception to "no component the client
  keeps paying for": the knowledge and conversations are the client's, the
  platform is rented, and the site says so.
- EduGenica builds the platform on the client's brand, domain and database,
  so the audience list is the client's asset rather than the platform's.
- FlowGenica holds the way an agency delivers, defined once and applied to
  every client engagement at once, one layer above the task tools the team
  keeps using.

What no line does: take equity, take a percentage of sales, hold the client's
audience or data, or keep a component the client has to keep paying for. The
client owns the code, repositories, cloud accounts, domain, database and IP
from the first commit. Ongoing maintenance is a separate retainer that is
never a condition of the build.

## Operating Context

- **The call.** One booking link for all four properties (`BOOKING_URL`,
  calendly.com/mpresecan). The Genica promise is "45 minutes; you leave with a scope, a
  sequence and a number, whether or not you hire us." AIgenica's is a
  working call about the ten questions the business answers most: which an
  agent can answer from its own content, which belong with the team, and
  what the first month would look like. EduGenica
  and FlowGenica each promise a plain answer, including "use an off-the-shelf
  tool instead" or "neither" when that is the honest one.
- **Genica's engagement shape.** Four stops: specification, proof of the
  risky joins, the product built, then refined with what usage did not
  justify taken out. Includes technical direction, product engineering,
  infrastructure, and technical due diligence when a client raises. Works
  alongside existing engineers and leaves conventions documented for
  handover.
- **Genica's stack, stated on the site:** TypeScript end to end, Next.js,
  Payload CMS, Postgres, and the Payload App Stack maintained in the open.
  Boring infrastructure chosen deliberately.
- **AIgenica's engagement shape.** Four weeks to launch (week 1 scope and
  knowledge, weeks 2-3 connect and test on real questions, week 4 launch and
  review), then looked after monthly. Commercial shape stated on the site:
  one-off build fee plus a monthly fee per agent, usage capped, cancel any
  month (to be confirmed by Michael). SuperCognit runs the platform; AIgenica
  designs, builds, connects and maintains; one invoice from AIgenica.
- **EduGenica's formats:** webinars, courses, masterclasses, conferences,
  streamed events. Included in every build: the client's brand and domain,
  ticketing and checkout with EU VAT, access control, participant management,
  event email, and the audience list in the client's database. Load-tested
  before the first live date. Migration of existing courses and customers is
  scoped separately.
- **FlowGenica today:** the consulting engagement (mapping how the agency
  actually delivers into a workflow with stages, owners, durations and exit
  criteria, delivered as a document usable with any tooling) is available
  now. The software is in build; a small number of design partners get early
  access, influence over the workflow model, and preferential launch pricing
  in exchange for feedback and running at least one real engagement on early
  software.
- **Timelines are not product facts.** Confirmed 21 Sep 2026: every project
  is different, and the number for a given scope is given on the call. The
  FAQs currently carry indicative ranges (specification one to two weeks, MVP
  eight to fourteen, AIgenica four weeks to launch an agent,
  EduGenica single-format launch four to six); treat these as revisable copy,
  never as commitments to keep consistent or to build features around.

## Capabilities and Constraints

- Four Next.js apps in a Turborepo, one shared `packages/ui`. No CMS; content
  is TypeScript in each app. Sites are English only (`lang="en"`).
- One action across all four sites: book a call. Email is a quiet fallback,
  never a competing button. No contact forms, no newsletter, no gated PDFs.
- Every call promise is specific and keepable.
- AIgenica names SuperCognit openly and shows the certified-partner badge
  (SuperCognit's own SVGs, linked to supercognit.com/partners). This
  replaces the earlier vendor-neutral rule (changed 26 Oct 2026). Never
  publish SuperCognit's prices or wholesale terms.
- No invented prices, clients, metrics, launch dates or testimonials.
- FlowGenica states in the first viewport that the software is in build.
- **Undecided / pending before launch:** the imprint values marked
  `TO CONFIRM` in `packages/ui/src/components/legal.tsx` (OIB, MBS, share
  capital, registered address in Croatia, operating address in Poland). Still
  pending as of 21 Sep 2026. They are rendered as `TO CONFIRM` rather than
  invented.

## Brand Commitments

- Names and domains as in the table above; the network is presented as one
  system, each line identified by one accent (indigo, rust, pine, bronze)
  defined in `packages/ui/src/brand/index.ts`.
- Voice: plain, declarative, specific; says when a cheaper option would serve
  the visitor better; states what it will not do (equity, revenue share, held
  data) as often as what it will.
- Craft bar named by the client: Linear, Stripe, Vercel. Reference site for
  the incumbent system: the previous genica.org. These are recorded here as
  binding references; the visual system itself lives in DESIGN.md.

## Evidence on Hand

Claimable, and the complete list:

- Layron, an AI deal workspace built for **Layer Finance**, in production.
- **80% time saved during deal onboarding**, measured and stated by the
  client.
- Quotes from Kurt Praszl (Layer Finance) and Tim-Julian Hartmann (Peakside
  Projects), verbatim from the previous genica.org.
- `payload.solutions` (https://payload.solutions): the studio's open-source
  Payload CMS work, the Payload App Stack, Payload Clock, and five plugins.
  MIT licensed, publicly readable.
- EduGenica's lineage as sellknow.com.

Absences future work must not fill: AIgenica and EduGenica have no named
clients. FlowGenica has no launch date, no pricing, and no named design
partners. No line has published prices. Reconfirmed unchanged on 21 Sep 2026.

## Product Principles

1. **Decide before building, and show it.** Every line's mechanism is a
   decision that precedes the work (a specification, a gate, a format, a
   template), and the sites are held to the same discipline.
2. **One action, one honest promise.** A single booked call per property, with
   a promise specific enough to be falsifiable and kept whether or not the
   visitor hires the studio.
3. **The client owns everything.** Code, accounts, data, audience, IP, from
   the first commit; nothing rented back, no stake taken.
4. **Say when we are the wrong choice.** Each line names the cheaper
   alternative and when it is the better one.
5. **Only claim what is on the list.** Proof is the evidence above and
   nothing more; timelines and prices belong to the call, not the page.

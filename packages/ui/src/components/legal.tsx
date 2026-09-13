import * as React from "react"
import { CONTACT_EMAIL, LEGAL, PROPERTIES, type LineId } from "../brand"
import { Band, Container } from "./primitives"

/* Values Michael must confirm before launch are marked TO CONFIRM in the
   rendered text rather than silently invented. */
const REGISTRY = {
  court: "Commercial Court in Zagreb",
  oib: "TO CONFIRM, OIB",
  mbs: "TO CONFIRM, MBS",
  capital: "TO CONFIRM, share capital, paid in full",
  director: "Michael Presecan",
  address: "TO CONFIRM, registered address, Croatia",
  operating: "TO CONFIRM, operating address, Poland",
} as const

function Article({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-hair py-9">
      <h2 className="t-h3 text-[1.3rem]">{title}</h2>
      <div className="t-body measure mt-4 grid gap-4 text-[0.9688rem] text-body [&_a]:font-[600] [&_a]:text-line [&_a]:underline [&_a]:decoration-hair-2 [&_a]:decoration-2 [&_a]:underline-offset-4 [&_li]:pl-1 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  )
}

export function LegalPage({
  line,
  kind,
}: {
  line: LineId
  kind: "privacy" | "imprint"
}) {
  const site = PROPERTIES[line]
  const updated = "12 September 2026"

  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-14 sm:py-20">
          <h1 className="t-display mt-8 text-[clamp(2.1rem,1.5rem+2.4vw,3.2rem)]">
            {kind === "privacy" ? "Privacy notice" : "Imprint"}
          </h1>
          <p className="t-lede measure mt-5 text-body">
            {kind === "privacy"
              ? `How ${LEGAL.entity} handles personal data collected through ${site.domain}.`
              : `Who is responsible for ${site.domain}, and how to reach them.`}
          </p>
          <p className="mt-6 text-[0.8125rem] text-muted">
            Last updated {updated}
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-6 pb-24 sm:pb-28">
          {kind === "imprint" ? (
            <>
              <Article title="Operator">
                <p>
                  {LEGAL.entity}, a limited liability company registered in
                  Croatia and operating from Poland, publishes and operates{" "}
                  {site.domain} and the other sites in the Genica network.
                </p>
                <ul>
                  <li>Registered office: {REGISTRY.address}</li>
                  <li>Operating address: {REGISTRY.operating}</li>
                  <li>Register: {REGISTRY.court}</li>
                  <li>Registration number (MBS): {REGISTRY.mbs}</li>
                  <li>VAT / personal identification number (OIB): {REGISTRY.oib}</li>
                  <li>Share capital: {REGISTRY.capital}</li>
                  <li>Board member authorised to represent: {REGISTRY.director}</li>
                </ul>
              </Article>

              <Article title="Contact">
                <p>
                  Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  Written correspondence should be addressed to the registered
                  office above. We answer commercial enquiries in English,
                  Croatian and Polish.
                </p>
              </Article>

              <Article title="Responsibility for content">
                <p>
                  {REGISTRY.director} is responsible for the editorial content
                  of this site. We take care that the information published
                  here is accurate and current, but nothing on this site is an
                  offer, a warranty, or professional advice on which you should
                  act without speaking to us first.
                </p>
              </Article>

              <Article title="External links">
                <p>
                  This site links to sites operated by others. We check a link
                  when we place it; we do not monitor the linked site
                  afterwards and are not responsible for its content.
                </p>
              </Article>

              <Article title="Intellectual property">
                <p>
                  The text, layout, graphics and source of this site belong to{" "}
                  {LEGAL.entity} unless marked otherwise. Our open-source work
                  is published separately under its own licences at{" "}
                  <a href="https://payload.solutions">payload.solutions</a> and
                  is governed by those licences, not by this notice.
                </p>
              </Article>

              <Article title="Dispute resolution">
                <p>
                  The European Commission provides a platform for online
                  dispute resolution at{" "}
                  <a href="https://ec.europa.eu/consumers/odr">
                    ec.europa.eu/consumers/odr
                  </a>
                  . We are neither obliged nor willing to participate in
                  dispute resolution proceedings before a consumer arbitration
                  board.
                </p>
              </Article>
            </>
          ) : (
            <>
              <Article title="Who is responsible">
                <p>
                  {LEGAL.entity} is the controller for personal data collected
                  through {site.domain}, within the meaning of Article 4(7)
                  GDPR. You can reach us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or at
                  the address given in our <a href="/imprint">imprint</a>. We
                  have not appointed a data protection officer, as we are not
                  required to.
                </p>
              </Article>

              <Article title="What we collect, and why">
                <ul>
                  <li>
                    <strong>When you write to us or book a call.</strong> Your
                    name, email address, and whatever you choose to tell us
                    about your project. We use it to answer you and to prepare
                    for the call. The legal basis is Article 6(1)(b) GDPR , 
                    steps taken at your request before entering a contract.
                  </li>
                  <li>
                    <strong>When you visit the site.</strong> Our hosting
                    provider processes your IP address, the page requested, the
                    referring page and your user agent in order to serve the
                    page and to keep the service secure. The legal basis is
                    Article 6(1)(f) GDPR, our legitimate interest in a working,
                    secure website.
                  </li>
                  <li>
                    <strong>If you become a client.</strong> Contract and
                    billing data, retained for as long as Croatian and EU
                    accounting law requires. The legal bases are Article
                    6(1)(b) and 6(1)(c) GDPR.
                  </li>
                </ul>
                <p>
                  We do not use advertising cookies, tracking pixels, or
                  cross-site profiling on this site, and we do not sell or rent
                  personal data to anyone.
                </p>
              </Article>

              <Article title="Processors we rely on">
                <p>
                  We use a small number of service providers who process data
                  on our behalf under Article 28 GDPR: our website host, our
                  email provider, and the scheduling service behind the “Book a
                  call” link. Where a provider processes data outside the EEA,
                  the transfer is covered by the European Commission’s standard
                  contractual clauses. We will name the current providers on
                  request.
                </p>
              </Article>

              <Article title="How long we keep it">
                <p>
                  Enquiries that do not lead to work are deleted within twelve
                  months. Server logs are retained for a short period for
                  security purposes. Contract and accounting records are kept
                  for the statutory retention period, after which they are
                  deleted.
                </p>
              </Article>

              <Article title="Your rights">
                <p>
                  Under the GDPR you have the right to access your data, to
                  have it corrected or erased, to restrict or object to its
                  processing, and to receive it in a portable format. Where
                  processing rests on consent, you may withdraw that consent at
                  any time without affecting what was done before. Write to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
                  we will answer within one month.
                </p>
                <p>
                  You also have the right to complain to a supervisory
                  authority, in our case the Croatian Personal Data Protection
                  Agency (AZOP), or the authority where you live or work.
                </p>
              </Article>

              <Article title="Changes">
                <p>
                  When this notice changes we update the date at the top of the
                  page. Material changes affecting people we already hold data
                  for are communicated directly.
                </p>
              </Article>
            </>
          )}
        </Container>
      </Band>
    </>
  )
}

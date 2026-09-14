import * as React from "react"
import { NETWORK, OPEN_SOURCE, LEGAL, CONTACT_EMAIL, type LineId } from "../brand"
import { Container } from "./primitives"
import { Arrow } from "./ui/button"
import { Signature } from "./signature"

/**
 * The footer is the network's index, so every line in it that leads somewhere
 * says so under the pointer: the name takes the ink, the address underneath
 * it steps up a tone, and the arrow moves.
 */
export function SiteFooter({
  line,
  columns = [],
}: {
  line: LineId
  columns?: { title: string; links: { label: string; href: string }[] }[]
}) {
  return (
    <footer className="border-t border-hair bg-paper-2">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <h2 className="t-eyebrow">The Genica network</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {NETWORK.map((p) => {
                const active = p.id === line
                return (
                  <li key={p.id}>
                    <a href={active ? "/" : p.url} className="group block">
                      <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                        <span className="cell-name inline-block">{p.name}</span>
                        {!active ? <Arrow className="text-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100" /> : null}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] text-muted transition-colors duration-200 group-hover:text-body">
                        {p.service}
                        {active ? " (you are here)" : ""}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <p className="mt-8 text-[0.875rem] text-muted">
              <a href={OPEN_SOURCE.url} className="link">{OPEN_SOURCE.name}</a>, our
              open-source Payload CMS work.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {columns.map((col) => (
              <nav key={col.title}>
                <h2 className="t-eyebrow">{col.title}</h2>
                <ul className="mt-6 grid gap-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-2 text-[0.9375rem] text-body transition-colors hover:text-ink"
                      >
                        <span className="cell-name inline-block">{l.label}</span>
                        <Arrow className="text-hair opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="t-eyebrow">Contact</h2>
              <ul className="mt-6 grid gap-3 text-[0.9375rem]">
                <li><a href={`mailto:${CONTACT_EMAIL}`} className="link">{CONTACT_EMAIL}</a></li>
                <li className="text-muted">EU, Croatia and Poland</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hair pt-7 text-[0.8125rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {LEGAL.year} {LEGAL.entity}, {LEGAL.descriptor}.</p>
          <ul className="flex gap-6">
            <li><a href="/privacy" className="transition-colors hover:text-body">Privacy</a></li>
            <li><a href="/imprint" className="transition-colors hover:text-body">Imprint</a></li>
          </ul>
        </div>

        {/* The signature. Last thing on the page, and the only thing on it
            that is there for no reason but to be signed. */}
        <Signature line={line} className="mt-14 sm:mt-20" />
      </Container>
    </footer>
  )
}

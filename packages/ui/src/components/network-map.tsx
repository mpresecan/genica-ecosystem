import * as React from "react"
import { cn } from "../lib/utils"
import { NETWORK, type LineId } from "../brand"

/**
 * Four properties in a 2x2 field divided by hairlines. No cards, no dots.
 *
 * A cell under the pointer takes the tinted surface across its whole quarter
 * of the field rather than only under the text, because the whole quarter is
 * what the click covers. The name moves with it and the arrow moves further,
 * which is the only thing on the page that says where the click goes.
 */
export function NetworkMap({
  current,
  className,
}: {
  current?: LineId
  className?: string
}) {
  return (
    <ul className={cn("grid border-t border-hair sm:grid-cols-2", className)}>
      {NETWORK.map((p, i) => {
        const active = p.id === current
        const Row = active ? "div" : "a"
        return (
          <li
            key={p.id}
            className={cn(
              "reveal border-b border-hair",
              i % 2 === 0 && "sm:border-r sm:border-hair",
              !active && "cell hover:bg-paper-2"
            )}
          >
            <Row
              {...(active ? {} : { href: p.url })}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex h-full flex-col py-9 sm:pr-12",
                i % 2 === 1 && "sm:pl-12"
              )}
            >
              <h3 className="cell-name text-[1.375rem] leading-tight font-semibold tracking-[-0.03em] text-ink">
                {p.name}
              </h3>
              <p className="t-mono cell-domain mt-1.5">
                {active ? "You are here" : p.domain}
              </p>
              <p className="t-body mt-4 flex-1 text-[1rem]">{p.summary}</p>
              {!active ? (
                <span className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink">
                  <span className="link">Visit {p.domain}</span>
                  <span aria-hidden className="arrow">
                    →
                  </span>
                </span>
              ) : null}
            </Row>
          </li>
        )
      })}
    </ul>
  )
}

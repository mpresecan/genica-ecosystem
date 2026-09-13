import * as React from "react"
import { cn } from "../lib/utils"
import { NETWORK, type LineId } from "../brand"

/** Four properties in a 2x2 field divided by hairlines. No cards, no dots. */
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
              "border-b border-hair",
              i % 2 === 0 && "sm:border-r sm:border-hair"
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
              <h3 className="text-[1.375rem] leading-tight font-semibold tracking-[-0.03em] text-ink">
                {p.name}
              </h3>
              <p className="t-mono mt-1.5">{active ? "You are here" : p.domain}</p>
              <p className="t-body mt-4 flex-1 text-[1rem]">{p.summary}</p>
              {!active ? (
                <span className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink">
                  <span className="link">Visit {p.domain}</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
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

import * as React from "react"
import { cn } from "../lib/utils"
import { NETWORK, type LineId } from "../brand"

/**
 * The switcher: the rest of the network, right-aligned so it never sits above
 * the wordmark. The property you are on is not listed, because a switcher
 * offers the places you can go. The footer carries the full network.
 */
export function NetworkRail({
  current,
  className,
}: {
  current: LineId
  className?: string
}) {
  const others = NETWORK.filter((p) => p.id !== current)

  return (
    <nav
      aria-label="Other Genica sites"
      className={cn("h-[var(--rail-h)] border-b border-hair-soft bg-paper", className)}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8">
        <ul
          className="flex h-full items-center justify-end gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage: "linear-gradient(to left, black calc(100% - 1.5rem), transparent)",
            WebkitMaskImage: "linear-gradient(to left, black calc(100% - 1.5rem), transparent)",
          }}
        >
          {others.map((p) => (
            <li key={p.id} className="shrink-0">
              <a
                href={p.url}
                className="text-[0.75rem] leading-none text-faint transition-colors hover:text-ink"
              >
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

import * as React from "react"
import { cn } from "../lib/utils"
import { NETWORK, type LineId } from "../brand"

/**
 * The switcher: the rest of the network, right-aligned so it never sits above
 * the wordmark. The property you are on is not listed, because a switcher
 * offers the places you can go. The footer carries the full network.
 *
 * It is the one dark band above the fold, and that is the whole point of it:
 * the strip is not this site's navigation, it is the network the site belongs
 * to, so it is drawn on the network's surface rather than on the page's. It
 * scrolls away on the first movement and the white bar pins in its place.
 *
 * The label that says so is the one piece of colour above the fold, in the
 * property's own light accent. It is the only thing on the page that names
 * the network, so it is the only thing that earns the accent at rest.
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
      data-tone="dark"
      className={cn("network-rail h-[var(--rail-h)] bg-dark", className)}
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center px-6 sm:px-8">
        <p className="rail-label mr-8 hidden shrink-0 text-[0.8125rem] leading-none sm:block">
          The Genica network
        </p>
        {/* Full width, right-aligned, so the fade at its leading edge sits in
            the empty gap until the names actually overflow it. */}
        <ul
          className="flex h-full w-full items-center justify-end gap-7 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maskImage: "linear-gradient(to left, black calc(100% - 1.5rem), transparent)",
            WebkitMaskImage: "linear-gradient(to left, black calc(100% - 1.5rem), transparent)",
          }}
        >
          {others.map((p) => (
            <li key={p.id} className="shrink-0">
              <a href={p.url} className="rail-link text-[0.8125rem] leading-none">
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

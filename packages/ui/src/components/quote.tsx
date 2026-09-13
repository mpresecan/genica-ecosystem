import * as React from "react"
import { cn } from "../lib/utils"

export type Attribution = { name: string; role: string; org: string }

export function Quote({
  children,
  by,
  className,
  size = "default",
  onDark = false,
}: {
  children: React.ReactNode
  by: Attribution
  className?: string
  size?: "default" | "lead"
  onDark?: boolean
}) {
  return (
    <figure className={className}>
      <blockquote
        className={cn(
          "text-balance font-normal tracking-[-0.025em]",
          onDark ? "text-on-dark" : "text-ink",
          size === "lead"
            ? "text-[clamp(1.375rem,1.1rem+1.2vw,1.875rem)] leading-[1.3]"
            : "text-[clamp(1.125rem,1.05rem+0.4vw,1.3125rem)] leading-[1.45]"
        )}
      >
        {children}
      </blockquote>
      <figcaption
        className={cn(
          "mt-6 text-[0.875rem]",
          onDark ? "text-on-dark-body" : "text-body"
        )}
      >
        <span className={cn("font-medium", onDark ? "text-on-dark" : "text-ink")}>
          {by.name}
        </span>
        {by.role ? <span>, {by.role}</span> : null}
        <span className={cn("mt-0.5 block t-mono", onDark && "text-on-dark-muted")}>
          {by.org}
        </span>
      </figcaption>
    </figure>
  )
}

import * as React from "react"
import { cn } from "../lib/utils"

export type RouteStop = { name: string; body: string; deliverable?: string }

/**
 * Stages as a ruled vertical list. Not four equal cards, and not "Step 01":
 * the stage name is the label, and reading order carries the sequence.
 *
 * Each stage arrives as it reaches the scrollport, so the sequence is read in
 * order whether or not anyone is counting, and the stage under the pointer
 * takes the tint and the leading hairline the rest of the system's rows take.
 */
export function RouteSteps({
  stops,
  className,
}: {
  stops: RouteStop[]
  className?: string
}) {
  return (
    <ol className={cn("grid", className)}>
      {stops.map((s, i) => (
        <li
          key={s.name}
          className={cn(
            "row reveal grid grid-cols-1 gap-x-16 gap-y-4 py-9 md:grid-cols-[minmax(0,20rem)_1fr]",
            i > 0 && "border-t border-hair"
          )}
        >
          <h3 className="row-term text-[1.5rem] leading-[1.15] font-semibold tracking-[-0.03em] text-ink">
            {s.name}
          </h3>
          <div>
            <p className="t-body measure">{s.body}</p>
            {s.deliverable ? (
              <p className="t-mono row-note mt-4">{s.deliverable}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

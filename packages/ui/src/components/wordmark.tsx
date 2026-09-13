import * as React from "react"
import { cn } from "../lib/utils"
import { PROPERTIES, type LineId } from "../brand"

/** The name, set tight. No mark, no dot, no swatch. */
export function Wordmark({ line, className }: { line: LineId; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block text-[1.25rem] leading-none font-semibold tracking-[-0.04em] text-ink",
        className
      )}
    >
      {PROPERTIES[line].name}
    </span>
  )
}

import * as React from "react"
import { cn } from "../lib/utils"
import { PROPERTIES, type LineId } from "../brand"

/**
 * The signature: the property's name set once, at the foot of every page, the
 * width of the container.
 *
 * It is not a second wordmark. The letterforms carry no ink of their own, they
 * are a window onto the paper's own grain, and the only thing that lights them
 * is where your pointer is. So it reads as an impression pressed into the
 * page rather than as a logo printed on it, which is what a signature is.
 *
 * The fit constants below are the name's advance width in ems, measured in
 * Inter at 600 with the tracking this sets. Font size is then `100 / width`
 * container-query widths, which lands every name on the container's edges
 * whatever the viewport. They are measured, not guessed: change the face, the
 * weight or the tracking and they have to be measured again.
 */
const FIT: Record<LineId, number> = {
  genica: 34.67,
  aigenica: 27.93,
  edugenica: 22.26,
  flowgenica: 20.66,
}

export function Signature({ line, className }: { line: LineId; className?: string }) {
  return (
    <div aria-hidden className={cn("signature", className)}>
      <span
        data-signature
        className="signature-word"
        style={{ "--fit": FIT[line] } as React.CSSProperties}
      >
        {PROPERTIES[line].name}
      </span>
    </div>
  )
}

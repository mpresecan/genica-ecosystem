import * as React from "react"
import { cn } from "../lib/utils"

/**
 * A heading that arrives a word at a time.
 *
 * The words are split at render, on the server, so there is no script, no
 * measurement and nothing to hydrate: each word is an inline-block carrying
 * its own index, and the stylesheet turns that index into a shift of the
 * word's own scroll range. The line therefore comes together left to right
 * because that is the order it is read in, and comes apart in the same order
 * on the way back up.
 *
 * Anything that is not a plain string falls back to the single `.reveal` the
 * system had before, because a fragment cannot be split without guessing.
 */
export function RevealText({
  children,
  className,
  as: As = "span",
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  if (typeof children !== "string") {
    return <As className={cn("reveal", className)}>{children}</As>
  }

  const words = children.split(" ")

  return (
    <As className={cn("reveal-text", className)}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </As>
  )
}

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Slot } from "radix-ui"

/**
 * Shape lock: interactive controls are full pills, everything else on the
 * page is square. Taken from the reference site and applied everywhere.
 *
 * Under the pointer a pill rises by a single pixel and carries a light that
 * follows the cursor across it; pressed, it drops back and takes the press.
 * The light is drawn in motion.css, behind the label, and is switched on by
 * `data-sheen`. The lift is one pixel because the system has no shadow to
 * justify more.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
    "whitespace-nowrap select-none font-medium",
    "transition-[background-color,color,border-color,translate,scale] duration-150 ease-out",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-ink/88",
        outline: "border border-hair bg-transparent text-ink hover:border-ink/40 hover:bg-paper-2",
        onDark: "bg-paper text-ink hover:bg-paper/88",
        ghost: "text-body hover:bg-paper-2 hover:text-ink",
        link: "link h-auto rounded-none px-0",
      },
      size: {
        default: "h-10 px-6 text-[0.8125rem]",
        sm: "h-9 px-5 text-[0.8125rem]",
        lg: "h-[3.0625rem] px-8 text-[0.9375rem]",
        icon: "size-10",
        "icon-sm": "size-9",
      },
      /** The link variant is text: it neither lifts nor clips. */
      lift: {
        true: "hover:-translate-y-px active:translate-y-0 active:scale-[0.985]",
        false: "",
      },
    },
    defaultVariants: { variant: "default", size: "default", lift: true },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  Omit<VariantProps<typeof buttonVariants>, "lift"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  const plain = variant === "link"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...(plain ? {} : { "data-sheen": "" })}
      className={cn(buttonVariants({ variant, size, lift: !plain, className }))}
      {...props}
    />
  )
}

/** The glyph that means the control leaves the page. It moves on hover. */
function Arrow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("arrow", className)}>
      →
    </span>
  )
}

export { Button, Arrow, buttonVariants }

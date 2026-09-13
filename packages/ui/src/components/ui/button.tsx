import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Slot } from "radix-ui"

/**
 * Shape lock: interactive controls are full pills, everything else on the
 * page is square. Taken from the reference site and applied everywhere.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
    "whitespace-nowrap select-none font-medium",
    "transition-[background-color,color,border-color,transform] duration-150 ease-out",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-40",
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
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

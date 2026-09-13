import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

export type QA = { q: string; a: React.ReactNode }

export function Faq({ items }: { items: QA[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`q-${i}`} className="border-b border-hair last:border-b-0">
          <AccordionTrigger className="items-center gap-8 py-6 text-left text-[1.0625rem] font-medium tracking-[-0.015em] text-ink hover:no-underline [&>svg]:size-4 [&>svg]:text-faint">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-7">
            <div className="t-body measure text-[1rem]">{item.a}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

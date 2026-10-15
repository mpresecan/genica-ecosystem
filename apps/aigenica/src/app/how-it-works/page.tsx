import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  Figure,
  RouteSteps,
  SectionHead,
  SpecTable,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How an AIgenica automation is built: intake, preparation, action and reporting, where a person checks the work, and the controls that hold at each step.",
};

const STAGES = [
  {
    name: "Intake",
    body: "Work arrives the way it does today: an email, an uploaded document, a form, a new record in your CRM. The automation picks it up from there, so nobody has to change how they send it.",
    deliverable: "Every item captured in one queue, with nothing lost in an inbox.",
  },
  {
    name: "Prepare",
    body: "The AI reads, extracts, checks against your rules and prepares the action: the entry, the reply, the routing, the report. Nothing has touched a customer or a system yet.",
    deliverable: "A prepared action, with the reasoning and the source attached.",
  },
  {
    name: "Act",
    body: "Approved work is carried out in your systems with access limited to what the process needs. Items that pass your rules go through on their own; the rest wait for a person.",
    deliverable: "The record updated, the reply sent, the file in the right place.",
  },
  {
    name: "Report",
    body: "Every item, every decision and every approval is written to a log, and the numbers that matter (volume, time saved, exceptions) are reported back to you.",
    deliverable: "A log you can query, and a saving you can measure.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h1 className="t-display rise mt-8 text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
                Check the work before it acts, not after.
              </h1>
            </div>
            <div className="lg:pt-16">
              <p className="t-lede rise d1 measure text-body">
                The decision that separates a useful automation from an
                expensive one is where a person checks it. Check after it has
                acted and your team spends its days undoing mistakes. Check
                the prepared action, before it reaches a customer or a system,
                and a correction costs seconds.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <SectionHead heading="Four steps, and a log of all of them." />

          <Figure
            className="mt-14"
            kind="stages"
            alt="Work moving through intake, preparation, action and reporting. A review step stands after one of them; items that fail it drop out and accumulate as wasted work below. Moving the review later increases the pile."
            labels={[
              { x: 0.156, y: 0.94, text: "Intake", align: "center", index: 0 },
              { x: 0.387, y: 0.94, text: "Prepare", align: "center", index: 1 },
              { x: 0.619, y: 0.94, text: "Act", align: "center", index: 2 },
              { x: 0.85, y: 0.94, text: "Report", align: "center", index: 3 },
              { x: 0.04, y: 0.05, text: "Wasted" },
            ]}
            choices={{
              key: "gate",
              label: "Human review after",
              options: ["Intake", "Prepare", "Act", "Report"],
              initial: 1,
            }}
            caption="The same error rate at each position. The review belongs after preparation, before the action, because that is where catching a mistake costs the least, and the pile below is the difference."
          />

          <RouteSteps stops={STAGES} className="mt-20" />
          <p className="measure mt-16 border-t border-hair pt-7 text-[0.9375rem] leading-[1.6] text-body">
            The log is not an extra step. Each of the four writes to it as it
            runs, so the record of what the automation did, and who approved
            it, exists without anyone assembling it afterwards.
          </p>
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="The controls, stated plainly."
            lede="These are the questions we expect your data protection officer, your IT lead or your auditor to ask, and the answers every automation is built to give."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "What can the automation reach?",
                detail:
                  "Only what the process needs: specific mailboxes, specific records, specific folders. No shared admin account, and no access kept beyond the job in front of it.",
              },
              {
                term: "Where does our data go?",
                detail:
                  "Every step that sends data outside your systems is listed, with where it goes and why. Where your data has to stay in the EU, it stays in the EU.",
              },
              {
                term: "Who decided this was right?",
                detail:
                  "Either a rule you agreed in advance, or a named person who approved it. Both are recorded against the item, and approval is never a shared account acting on someone’s behalf.",
              },
              {
                term: "Can we reconstruct what happened six months later?",
                detail:
                  "Yes, from the action back to the approval, the prepared output and the original input, without depending on anyone’s memory or a vendor’s retention policy.",
              },
              {
                term: "What happens when the AI model changes?",
                detail:
                  "Nothing structural. The model is the last-chosen, most replaceable component. The rules, the reviews and the log are yours, in your own systems.",
              },
            ]}
          />
        </Container>
      </Band>

      <CtaBand
        heading="Where does a person check the work today?"
        lede="If the honest answer is “after it has gone out”, that is the conversation. Book a call and we will walk one of your processes through these four steps."
        action="Book an automation call"
      />
    </>
  );
}

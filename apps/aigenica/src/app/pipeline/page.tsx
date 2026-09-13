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
  title: "The pipeline",
  description:
    "The anatomy of an agentic delivery pipeline: intent, plan, execution, review and record, and the controls that hold at each stage.",
};

const STAGES = [
  {
    name: "Intent",
    body: "A specified issue is the only way work enters. It names the outcome, the constraints and the acceptance evidence, the same discipline you would demand of a contractor.",
    deliverable: "A queue where every item is reviewable before any work begins.",
  },
  {
    name: "Plan",
    body: "The agent reads the repository’s contracts and proposes an approach. The human gate sits here, on the approach, where changing direction is still cheap.",
    deliverable: "An approved plan, attached to the issue, that the change is later judged against.",
  },
  {
    name: "Execute",
    body: "Work happens in an isolated environment with least-privilege credentials, under a mandate narrow enough that a reviewer can hold it in their head.",
    deliverable: "A change set scoped to one approved plan, and nothing else.",
  },
  {
    name: "Review",
    body: "Machine checks run first and unconditionally. Human review is reserved for changes that warrant judgment, decided by rule rather than by whoever is online.",
    deliverable: "A pass or a rejection with the reason attached to the record.",
  },
];

export default function Pipeline() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h1 className="t-display rise mt-8 text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
                Approve the approach, not the diff.
              </h1>
            </div>
            <div className="lg:pt-16">
              <p className="t-lede rise d1 measure text-body">
                The single decision that separates a working agentic pipeline
                from an expensive one is where the human gate sits. Put it on
                the output and your engineers become reviewers of volume they
                cannot keep up with. Put it on the plan and they stay engineers.
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <SectionHead heading="Four stages, then the record." />

          <Figure
            className="mt-14"
            kind="stages"
            alt="Work moving through intent, plan, execution and review. A gate stands after one of them; changes that fail it drop out and accumulate as discarded work below. Moving the gate later increases the pile."
            labels={[
              { x: 0.156, y: 0.94, text: "Intent", align: "center", index: 0 },
              { x: 0.387, y: 0.94, text: "Plan", align: "center", index: 1 },
              { x: 0.619, y: 0.94, text: "Execute", align: "center", index: 2 },
              { x: 0.85, y: 0.94, text: "Review", align: "center", index: 3 },
              { x: 0.04, y: 0.05, text: "Discarded" },
            ]}
            choices={{
              key: "gate",
              label: "Human gate after",
              options: ["Intent", "Plan", "Execute", "Review"],
              initial: 1,
            }}
            caption="The same rejection rate at each position. The gate belongs on the plan because that is where a rejection costs the least, and the pile below is the difference."
          />

          <RouteSteps stops={STAGES} className="mt-20" />
          <p className="measure mt-16 border-t border-hair pt-7 text-[0.9375rem] leading-[1.6] text-body">
            The fifth stage is not an activity. The record (issue, plan,
            change, approval, deployment) is produced by the first four
            because each of them writes to it. An audit trail that has to be
            assembled afterwards is a document; one that falls out of the
            process is a control.
          </p>
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="The controls, stated plainly."
            lede="These are the questions we expect a security or compliance reviewer to ask, and the answers the pipeline is built to give."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "What could this agent reach?",
                detail:
                  "A scoped credential per role, issued per run, expiring after it. No shared long-lived token, and no agent holding access it does not need for the mandate in front of it.",
              },
              {
                term: "Who decided this was a good idea?",
                detail:
                  "A named human approval on the plan, recorded against the issue before execution starts. Approval is a person, never a bot account acting on a person’s behalf.",
              },
              {
                term: "What evidence exists that it works?",
                detail:
                  "Acceptance evidence is specified in the issue and produced by the run: tests, types, policy checks and, where it matters, a reproducible artefact a reviewer can inspect.",
              },
              {
                term: "Can we reconstruct a change six months later?",
                detail:
                  "Yes, from the deployment back to the approval, the plan, and the issue that asked for it, without depending on anyone’s memory or on a vendor’s retention policy.",
              },
              {
                term: "What happens when the model changes?",
                detail:
                  "Nothing structural. The runtime is the last-chosen, most replaceable component, and the contracts, gates and record are yours in your own systems.",
              },
            ]}
          />
        </Container>
      </Band>

      <CtaBand
        heading="Where does your human gate sit today?"
        lede="If the honest answer is “on the pull request”, that is the conversation. Book a call and we will map your current pipeline against these five stages."
        action="Book a technical call"
      />
    </>
  );
}

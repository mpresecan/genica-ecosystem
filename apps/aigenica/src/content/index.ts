import type { QA } from "@genica/ui";

export const PIPELINE = [
  {
    name: "Intent",
    detail:
      "Work enters as a specified issue, never as a prompt in someone’s terminal. Your tracker becomes the single queue.",
  },
  {
    name: "Plan",
    detail:
      "An agent proposes an approach against the written contracts in the repository. A human approves the plan, not the diff.",
  },
  {
    name: "Execute",
    detail:
      "Scoped agents work in isolated environments with least-privilege credentials and a mandate narrow enough to review.",
  },
  {
    name: "Review",
    detail:
      "Machine checks first: tests, types, policy. Then a human gate that cannot be skipped, on the changes that warrant one.",
  },
  {
    name: "Record",
    detail:
      "Every change carries its issue, its plan, its approvals and its evidence. The delivery record is a by-product, not a chore.",
  },
];

export const FAQ: QA[] = [
  {
    q: "Which tools do you use?",
    a: "Yours, wherever possible. The pipeline is deliberately not tied to one vendor: the control plane is the issue tracker you already run, the contracts live in your repositories, and the agent runtime is chosen last, so it can be replaced later without re-architecting anything around it.",
  },
  {
    q: "Do we have to replace our stack?",
    a: "No. If you are replacing your stack to adopt agents, someone has sold you a platform rather than a pipeline. We install controls around what you already run, and we say plainly when an existing tool genuinely cannot carry the job.",
  },
  {
    q: "What happens to our engineers?",
    a: "Their day moves upstream. The work that disappears is transcription, boilerplate and the third round of review comments. The work that grows is specification, architecture and judging output, which is the work you were underinvesting in before.",
  },
  {
    q: "How do we know it worked?",
    a: "We measure before the pilot so that after means something: cycle time from specified issue to production, rework rate, review latency, and escaped defects. Those four are agreed with you in the assessment, and reported against for the life of the engagement.",
  },
  {
    q: "What stops an agent shipping something wrong?",
    a: "Gates. Nothing advances because an agent believes it is finished. It advances because the machine checks pass and, where the change warrants it, a named human approved it. The interesting engineering is in deciding which changes warrant one.",
  },
  {
    q: "Is this auditable enough for a regulated environment?",
    a: "The pipeline is designed so that every production change traces back through approval, plan and originating issue, with evidence attached. Whether that satisfies your particular regulator is a judgment for your compliance function, we give them the evidence model early, so the answer arrives before the build, not after it.",
  },
  {
    q: "How long does it take?",
    a: "An assessment runs two weeks. A pilot line (one team, one repository, end to end) runs six to eight. Rollout beyond that depends on how many teams and how much your repositories disagree with each other.",
  },
  {
    q: "Who owns it when you leave?",
    a: "You do, entirely. The contracts are files in your repositories, the automation is configuration in your systems, and the handover is documented for the engineers who will run it. We do not hold a component you have to keep paying for.",
  },
];

import type { QA } from "@genica/ui";

export const CAPABILITIES = [
  {
    term: "Workflow templates",
    detail:
      "Define how your agency delivers once, stages, owners, durations, dependencies and what has to be true before a stage can close. Every new engagement starts from it instead of from memory.",
  },
  {
    term: "Engagements on the template",
    detail:
      "Each client runs on a copy of the template, with real dates calculated from the start date and the working calendar. Change the template and you decide what happens to work already in flight.",
  },
  {
    term: "Owners and load",
    detail:
      "Who is responsible for each stage, across every engagement at once, so the week somebody is carrying four handovers is visible before it happens rather than after.",
  },
  {
    term: "Deadlines that mean something",
    detail:
      "Dates move forward through dependencies. When a client returns feedback three days late, the delivery date moves and everyone sees it move, instead of the slack being absorbed silently by whoever is last in the chain.",
  },
  {
    term: "A client view worth sending",
    detail:
      "One link showing your client exactly where their engagement stands, what is waiting on them, and what comes next. No login for them to lose, nothing internal exposed.",
  },
  {
    term: "What actually happened",
    detail:
      "Which stages always overrun, which clients are always late, which engagements were profitable, measured from the record of the work rather than from the story told at the retrospective.",
  },
];

export const FAQ: QA[] = [
  {
    q: "Is FlowGenica available today?",
    a: "The product is in build and we are taking a small number of design partners, agencies that get early access, direct influence over the workflow model, and preferential pricing when it launches. The consulting engagement is available now, and it is the more useful starting point for most agencies anyway.",
  },
  {
    q: "How is this different from our project management tool?",
    a: "A project tool holds tasks for one project. FlowGenica holds the way your agency delivers, and applies it to every client engagement at once. The question it answers is not “what is left on this project” but “does the way we work still hold when eleven engagements are running”.",
  },
  {
    q: "Do we have to stop using our current tools?",
    a: "No. Your team keeps working where it works. FlowGenica sits above the task level, on the shape of the engagement and the commitments to the client, which is exactly the layer most tools leave to a spreadsheet and a partner’s memory.",
  },
  {
    q: "What does the consulting engagement involve?",
    a: "We map how your agency actually delivers (not how the handbook says it does) and turn it into a workflow with stages, owners, durations and exit criteria. You get that as a document you can run immediately, whatever tooling you use afterwards.",
  },
  {
    q: "Who is behind it?",
    a: "FlowGenica is part of Genica, an EU software studio that has run client delivery for long enough to have made every mistake this product exists to prevent.",
  },
  {
    q: "What does a design partner commit to?",
    a: "Roughly an hour a month of honest feedback and a willingness to run at least one real engagement on early software. In exchange you shape the workflow model around how your agency actually works, and you are not paying list price later.",
  },
];

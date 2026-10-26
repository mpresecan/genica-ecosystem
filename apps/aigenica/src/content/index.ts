import type { QA } from "@genica/ui";

export const FAQ: QA[] = [
  {
    q: "What kind of companies do you work with?",
    a: "Companies across Europe where a team spends hours every week on work that follows a pattern: reading documents, re-typing data between systems, answering the same requests, assembling the same report. Size matters less than having one process repetitive enough to describe to a new hire in an afternoon.",
  },
  {
    q: "Which tools do you use?",
    a: "For back-office automation, yours, wherever possible: we build inside the email, CRM, ERP, accounting and storage you already run, and the AI model is chosen last and can be replaced later. For agents your customers talk to, on your website, WhatsApp or Telegram, we build on SuperCognit, an EU platform we are a certified partner of, because hosting a chat agent well is not something you should be paying to have rebuilt.",
  },
  {
    q: "Do we have to replace our systems?",
    a: "No. If someone asks you to move onto a new platform before they can automate anything, they are selling the platform. We connect to what you have, and we say plainly when an existing system genuinely cannot carry the job.",
  },
  {
    q: "What about GDPR and where our data goes?",
    a: "We map what personal data each automation touches before we build it, keep it to what the process actually needs, and tell you which step sends what, where. Where your data has to stay in the EU, we use EU-hosted models and infrastructure. We sign a data processing agreement as standard.",
  },
  {
    q: "What happens when the AI gets it wrong?",
    a: "It is caught before it matters. Each automation has explicit rules for what it may do on its own and what goes to a person first, and anything unusual is routed to someone rather than guessed at. Errors are designed for, not hoped away.",
  },
  {
    q: "What happens to the people doing this work now?",
    a: "Their week changes. The copying, checking and chasing goes; the exceptions, the judgment calls and the customer conversations stay with them. Automations work best with the people who know the process reviewing them, so we build with that team, not around it.",
  },
  {
    q: "How long does it take?",
    a: "A process audit takes about two weeks. A first automation running in production typically takes four to eight weeks, depending on how many systems it has to touch. The number for your process is given on the call.",
  },
  {
    q: "When is automation not worth it?",
    a: "When the process runs a few times a month, when it changes every time it runs, or when nobody can agree how it should work. In those cases a checklist or an off-the-shelf tool is cheaper, and we will tell you so on the first call.",
  },
  {
    q: "Who owns it when you leave?",
    a: "For automations built in your systems, you do, entirely: they run in your accounts, the configuration and code live in your systems, and the handover is documented for the people who will run it. Agents on SuperCognit are different by design and we say so up front: the platform is a monthly service, while the knowledge it answers from and the conversations it has are yours, and you can cancel any month.",
  },
];

export const AGENT_FAQ: QA[] = [
  {
    q: "What is SuperCognit, and why build on it?",
    a: "An EU platform for AI agents and MCP servers: knowledge with cited answers, a website widget, WhatsApp and Telegram, a shared inbox, connections to your systems, and cost caps. We are a certified partner. Building on it means your money goes into what your agent knows and does, not into hosting and maintaining chat infrastructure.",
  },
  {
    q: "Will it make things up?",
    a: "It answers from the knowledge you approve and shows the source it used. Where that knowledge does not cover the question, it says so and hands the conversation to your team instead of guessing. The boundaries are written in plain language, and you can read every one.",
  },
  {
    q: "Which languages does it speak?",
    a: "It answers in the language the customer writes in, so a clinic in Białystok, a hotel in Split and a shop selling across Europe can run one agent rather than one per language. We check the languages that matter to you before launch.",
  },
  {
    q: "What happens when a customer needs a person?",
    a: "Every conversation appears in a shared inbox. The agent hands over when it reaches a boundary you set, or when the customer asks for a person, and your team picks it up with the whole thread in front of them.",
  },
  {
    q: "Can it work with our booking system or CRM?",
    a: "Usually, yes. Anything with an API can be connected, and Pipedrive, HubSpot and Stripe are supported directly. Systems with no API can often be driven through a managed browser. We confirm what your systems allow before we quote.",
  },
  {
    q: "What does it cost?",
    a: "A one-off fee to build and launch, then a monthly fee per agent that covers the platform, the AI usage and our maintenance. Usage is capped so it cannot run away with your budget. The figures for your case are given on the call.",
  },
];

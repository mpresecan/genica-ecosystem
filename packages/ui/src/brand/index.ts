/**
 * The network. Four lines, one system.
 * Every outbound action in the ecosystem resolves to a single booking URL.
 */

export const BOOKING_URL = "https://cal.com/genica/intro";

export const CONTACT_EMAIL = "hello@genica.org";

export const LEGAL = {
  entity: "Fortbit d.o.o.",
  descriptor: "Croatian-registered software studio operating from Poland",
  year: new Date().getFullYear(),
} as const;

export type LineId = "genica" | "aigenica" | "edugenica" | "flowgenica";

export type Property = {
  id: LineId;
  /** Wordmark as set on the plate. */
  name: string;
  domain: string;
  url: string;
  /** What this line carries, in one line, on a sign. */
  service: string;
  /** The offer, plainly, for the network map. */
  summary: string;
  /** Hex mirror of the OKLCH token: swatches, rules, theme-color. Never text. */
  hex: string;
  /** The same line, dark enough to set small text on paper at AA. */
  hexInk: string;
  /** True when the line's field takes dark lettering rather than light. */
  darkOnField?: boolean;
};

export const PROPERTIES: Record<LineId, Property> = {
  genica: {
    id: "genica",
    name: "Genica",
    domain: "genica.org",
    url: "https://genica.org",
    service: "SaaS product engineering",
    summary:
      "The studio. Technical direction and product engineering for founders taking a SaaS product from first specification to a product people love.",
    hex: "#2f4bc4",
    hexInk: "#2b41a8",
  },
  aigenica: {
    id: "aigenica",
    name: "Aigenica",
    domain: "aigenica.com",
    url: "https://aigenica.com",
    service: "Agentic delivery pipelines",
    summary:
      "The consultancy. We install the pipeline that lets your engineering organisation ship with agents under real controls, specification, review gates, traceability.",
    hex: "#d1452a",
    hexInk: "#b0341c",
  },
  edugenica: {
    id: "edugenica",
    name: "Edugenica",
    domain: "edugenica.com",
    url: "https://edugenica.com",
    service: "Education & event platforms",
    summary:
      "The platform practice. Branded homes for courses, masterclasses, conferences and streamed events, marketing, ticketing, access and analytics in one place.",
    hex: "#0f8266",
    hexInk: "#0b6852",
  },
  flowgenica: {
    id: "flowgenica",
    name: "Flowgenica",
    domain: "flowgenica.com",
    url: "https://flowgenica.com",
    service: "Client delivery workflow",
    summary:
      "The product. Agencies define the workflow once, then every client engagement runs on it, stages, owners, dates and the status the client can see.",
    hex: "#e0a12a",
    hexInk: "#7a5410",
    darkOnField: true,
  },
};

export const NETWORK: Property[] = [
  PROPERTIES.genica,
  PROPERTIES.aigenica,
  PROPERTIES.edugenica,
  PROPERTIES.flowgenica,
];

/** Open-source work, published under the Payload practice. Not part of the network. */
export const OPEN_SOURCE = {
  name: "payload.solutions",
  url: "https://payload.solutions",
  blurb:
    "The SaaS layer for Payload CMS, boilerplate, plugins and a job scheduler, MIT-licensed and used in production.",
} as const;

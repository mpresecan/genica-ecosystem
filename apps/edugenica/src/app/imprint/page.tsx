import type { Metadata } from "next";
import { LegalPage } from "@genica/ui";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal identity, registration details and contact for the operator of this site.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage line="edugenica" kind="imprint" />;
}

import type { Metadata } from "next";
import { LegalPage } from "@genica/ui";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Fortbit d.o.o. handles personal data collected through this site.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage line="genica" kind="privacy" />;
}

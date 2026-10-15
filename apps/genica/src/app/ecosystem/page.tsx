import type { Metadata } from "next";
import {
  Band,
  Container,
  CtaBand,
  NetworkMap,
  OPEN_SOURCE,
  SectionHead,
  SpecTable,
} from "@genica/ui";

export const metadata: Metadata = {
  title: "The network",
  description:
    "Genica, AIgenica, EduGenica and FlowGenica, four lines, one studio, and how to tell which one you need.",
};

export default function Ecosystem() {
  return (
    <>
      <Band tone="paper" className="border-b border-hair">
        <Container className="py-16 sm:py-24">
          <h1 className="t-display rise mt-8 max-w-[18ch] text-[clamp(2.35rem,1.45rem+3.5vw,3.9rem)]">
            Four lines. One studio behind them.
          </h1>
          <p className="t-lede rise d1 measure mt-7 text-body">
            The network grew out of what clients asked for after the first
            engagement ended. Each line is a separate offer with its own site,
            its own contract and its own audience, run by the same people, to
            the same standard.
          </p>
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-16 sm:py-20">
          <NetworkMap current="genica" />
        </Container>
      </Band>

      <Band tone="paper" className="border-t border-b border-hair">
        <Container className="py-20 sm:py-24">
          <SectionHead
            heading="Which line do you need?"
            lede="Most people arrive at the wrong one, which is fine, we will point you at the right one on the call, including when the right one is somebody else."
          />
          <SpecTable
            className="mt-14"
            rows={[
              {
                term: "Genica",
                detail:
                  "You have a SaaS product to build, or a half-built one that has stopped moving, and you need someone to own the technical outcome rather than rent you hands.",
              },
              {
                term: "AIgenica",
                detail:
                  "Your team spends hours every week reading documents, re-typing data between systems or answering the same requests. You want that work automated inside the tools you already use, with a person checking what matters.",
              },
              {
                term: "EduGenica",
                detail:
                  "You teach, train, or run events, and you are tired of splitting your audience across a course tool, a ticketing tool, a webinar tool and a mailing list, none of which carry your brand.",
              },
              {
                term: "FlowGenica",
                detail:
                  "You run an agency or a studio, your delivery process lives in three people’s heads, and clients ask for status because they have no other way to get it.",
              },
            ]}
          />
        </Container>
      </Band>

      <Band tone="paper">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHead heading="And the work that is not for sale." />
            <div className="t-body measure reveal grid gap-4 text-[1.0625rem] text-body">
              <p>
                {OPEN_SOURCE.blurb} It sits outside the network on purpose: it
                is free, MIT-licensed, and used by people who will never hire
                us.
              </p>
              <p>
                We maintain it because the products we build for clients stand
                on it, and because the fastest way to judge a studio is to read
                what it publishes when nobody is paying.
              </p>
              <p className="pt-2">
                <a
                  href={OPEN_SOURCE.url}
                  className="t-h3 text-[1.0625rem] text-line underline decoration-hair-2 decoration-2 underline-offset-4 transition-colors hover:decoration-current"
                >
                  {OPEN_SOURCE.name} ↗
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Band>

      <CtaBand
        heading="One call covers the whole network."
        lede="You do not need to work out which line you are on before you talk to us. Book the call, describe the problem, and we will route it."
        action="Book a call"
      />
    </>
  );
}

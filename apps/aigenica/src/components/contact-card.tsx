"use client";

import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { XIcon } from "lucide-react";

/* Conference contact card. Opens at aigenica.com/#card (or ?card) and shows a
   QR code that starts a WhatsApp chat. Deliberately not linked from the page:
   the site's one action is still the booked call. To change the number,
   update WHATSAPP and regenerate QR_PATH for the new wa.me link. */

const WHATSAPP = {
  display: "+385 98 964 1238",
  url: "https://wa.me/385989641238",
};

/* QR (error correction M, no margin) for https://wa.me/385989641238. */
const QR_VIEWBOX = "0 0 25 25";
const QR_PATH = "M0 0.5h7m2 0h4m1 0h1m1 0h1m1 0h7M0 1.5h1m5 0h1m2 0h1m1 0h4m1 0h1m1 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h2m2 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h3m2 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m1 0h3m2 0h1m1 0h1m2 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h1m3 0h1m3 0h1m1 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M8 7.5h2m1 0h1m3 0h1M0 8.5h1m1 0h5m3 0h3m2 0h2m1 0h5M0 9.5h1m2 0h1m8 0h1m1 0h1m4 0h1m3 0h1M1 10.5h1m2 0h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h1m2 0h4m1 0h2M0 11.5h6m2 0h2m3 0h3m1 0h3m4 0h1M0 12.5h4m1 0h5m2 0h2m1 0h2m1 0h3m1 0h3M0 13.5h1m2 0h1m1 0h1m2 0h1m1 0h1m2 0h3m3 0h1m1 0h1m1 0h1M0 14.5h1m2 0h1m2 0h1m2 0h4m2 0h3m1 0h3m1 0h2M0 15.5h1m3 0h1m2 0h2m2 0h1m4 0h1m2 0h2m3 0h1M0 16.5h1m1 0h3m1 0h3m2 0h1m4 0h5m1 0h1M8 17.5h2m2 0h2m1 0h2m3 0h2M0 18.5h7m3 0h1m2 0h2m1 0h1m1 0h1m1 0h1m1 0h3M0 19.5h1m5 0h1m1 0h1m1 0h1m1 0h2m1 0h2m3 0h2M0 20.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h7m1 0h2M0 21.5h1m1 0h3m1 0h1m1 0h2m7 0h2m1 0h3m1 0h1M0 22.5h1m1 0h3m1 0h1m1 0h5m8 0h2m1 0h1M0 23.5h1m5 0h1m4 0h1m2 0h4m1 0h3m2 0h1M0 24.5h7m1 0h1m2 0h1m5 0h8";

function wantsCard() {
  if (typeof window === "undefined") return false;
  return window.location.hash === "#card" || new URLSearchParams(window.location.search).has("card");
}

export function ContactCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(wantsCard());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next && wantsCard()) {
      const url = new URL(window.location.href);
      url.hash = "";
      url.searchParams.delete("card");
      window.history.replaceState(null, "", url.pathname + url.search);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-ink/60 backdrop-blur-[2px]" />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed top-1/2 left-1/2 z-[91] w-[calc(100vw-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 border border-hair bg-paper p-7 text-ink shadow-2xl focus:outline-none"
        >
          <Dialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 p-1 text-muted transition-colors hover:text-ink"
          >
            <XIcon className="size-5" />
          </Dialog.Close>

          <p className="text-[0.75rem] font-medium tracking-[0.08em] text-accent uppercase">AIgenica</p>
          <Dialog.Title className="t-h3 mt-3 text-[1.5rem] leading-tight">Michael Presecan</Dialog.Title>
          <Dialog.Description className="t-body mt-1 text-[0.9375rem] text-body">
            AI automation across Europe
          </Dialog.Description>

          <a
            href={WHATSAPP.url}
            target="_blank"
            rel="noreferrer"
            className="mt-7 block bg-white p-4"
            aria-label={`Message on WhatsApp, ${WHATSAPP.display}`}
          >
            <svg
              viewBox={QR_VIEWBOX}
              role="img"
              aria-hidden="true"
              shapeRendering="crispEdges"
              className="block h-auto w-full"
            >
              <path d={QR_PATH} stroke="#000" fill="none" />
            </svg>
          </a>

          <p className="t-body mt-5 text-center text-[0.9375rem] text-body">
            Scan to message me on WhatsApp
          </p>
          <a
            href={WHATSAPP.url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-center font-mono text-[1rem] text-ink underline-offset-4 hover:underline"
          >
            {WHATSAPP.display}
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

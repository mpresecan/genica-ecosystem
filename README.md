# Genica Ecosystem

Four marketing sites, one near-monochrome system. The direction round, the
locked contract and the finish conditions live in `.impeccable/surface-briefs/`.

| App | Domain | Line |
|---|---|---|
| `apps/genica` | genica.org | Indigo — the studio |
| `apps/aigenica` | aigenica.com | Rust — agentic delivery pipelines |
| `apps/edugenica` | edugenica.com | Pine — education & event platforms |
| `apps/flowgenica` | flowgenica.com | Bronze — client delivery workflow |

`packages/ui` holds the design system: tokens, lettering, the shared
components, and the shadcn/ui primitives they are built on. Every app consumes
it; none of them owns a component another one needs.

## Run

```bash
pnpm install
pnpm dev            # all four: 3000 / 3001 / 3002 / 3003
pnpm build
pnpm typecheck
```

## Before launch

Two things are deliberately unfinished, and both are one-line changes:

1. `BOOKING_URL` in `packages/ui/src/brand/index.ts` — every CTA on all four
   sites resolves to it.
2. The values marked `TO CONFIRM` in `packages/ui/src/components/legal.tsx` —
   registered address, OIB, MBS and share capital for the imprint.

## Impeccable

`DESIGN.md` and `PRODUCT.md` are already in the shape the Impeccable skill
expects. Its CDN is not reachable from the sandbox this repo was built in, so
install it yourself once:

```bash
npx impeccable install
```

Then `/impeccable audit`, `/impeccable critique` and the design hook work
against the system documented here.

## Design

`DESIGN.md` records the visual system. `PRODUCT.md` records what each property
sells and to whom. Read both before adding a page; the world is committed, and
a page that reaches for a card grid or an eyebrow label has left it.

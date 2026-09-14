# Genica, design system

## Where this came from

The tokens are read off the live genica.org, which the client named as the
reference with more taste than anything generated here, and reconciled with
taste-skill (`design-taste-frontend`), which the client also named. Where the
two disagree, taste-skill wins, and each of those calls is noted below.

Craft bar, set by the client: Linear, Stripe, Vercel.

## Palette

Monochrome page, one dark band, one accent per property at very low dosage.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#ffffff` | The page |
| `--paper-2` | `#fafafa` | One tinted band |
| `--dark` | `#0a0a0a` | The proof band, once per page |
| `--ink` | `#0a0a0a` | Headings, buttons, emphasis |
| `--body` | `#52525b` | Body copy |
| `--muted` | `#5f5f66` | Long-form body, secondary |
| `--faint` | `#71717a` | Mono metadata, legal |
| `--hair` | `#e5e5e5` | Structure |
| `--hair-soft` | `#f4f4f5` | The lightest divider |
| `--on-dark-muted` | `#8b8b94` | Metadata on the dark band |

The reference site's `#71717a` and `#a1a1aa` small text measure 2.4:1 to 4.1:1
and fail AA. `--muted`, `--faint` and `--on-dark-muted` are the darkened values
that pass; everything on all 14 pages is measured (410 combinations).

Accents, one per property, used only on link hover, focus, selection, and the
single figure in the dark band. Never a fill, never a dot:
`#2b41a8` genica, `#b0341c` aigenica, `#0b6852` edugenica, `#7a5410` flowgenica.

## Type

**Inter** (self-hosted variable, roman and italic) with **JetBrains Mono** for
the rationed label. taste-skill discourages Inter as a default; the documented
override applies twice over, since the reference site uses it and the client
named Linear as the bar.

| Class | Spec |
|---|---|
| `.t-display` | 600, clamp to 80px, tracking −0.04em, line-height 0.92 |
| `.t-h2` | 600, clamp to 36px, tracking −0.025em |
| `.t-h3` | 600, 18px |
| `.t-lede` | **italic**, 400, clamp to 22px, `--body` |
| `.t-body` | 300, 18px, `--muted` |
| `.t-eyebrow` | JetBrains Mono 500, 11px, tracking 0.25em, uppercase |
| `.t-mono` | JetBrains Mono 400, 12px, tabular |

The italic standfirst is the system's one flourish, and it is always the same
family. Emphasis inside a headline is italic or weight, never a second face.

## Shape and structure

Shape lock: **everything is square except interactive controls, which are full
pills.** No radius on anything else, no shadows, no cards.

- Container 1200px, sections 96px, hero top padding capped at 96px.
- `RuledList` and `RouteSteps` put one hairline *between* rows, never a border
  above and below each row.
- `NetworkMap` is a 2x2 field divided by hairlines, not four cards.
- One dark band per page, carrying the proof. The switcher rail is the
  exception and the reason is the same one: it is not this site's
  navigation, it is the network the site belongs to, so it is drawn on the
  network's surface rather than on the page's. It scrolls away on the first
  movement and the white bar pins in its place.

## Rules this system enforces

From taste-skill, and they are the reason several things were removed:

- **Zero em-dashes.** Not in headlines, labels, body, quotes or captions. The
  whole corpus was rewritten to commas, colons, parentheses and full stops.
- **Eyebrows are rationed to one per three sections.** Every page is counted.
- **No decorative status dots**, no colour swatches before names or nav items.
  The switcher rail's label is the one coloured piece of text at rest, and it
  is coloured because it names the network, not to mark or decorate anything.
- **No section numbering** (`STEP 01`, `01 / 4`), no locale or version strips,
  no scroll cues, no middle-dot as a general separator.
- **Hero holds four text elements at most**: eyebrow, headline, one subtext
  under 20 words, one action. The trust row sits below the hero, never in it.
- **Headlines run two lines at desktop.** Three lines is a font-size or
  copy-length error, and is fixed by cutting copy.
- **No equal-column feature card rows.** Parallel content is a ruled list or a
  divided field.
- One accent per page, locked, under 80% saturation.

## The figures

The client asked for something as interesting as Stripe's. The first answer,
moving fields behind every band, was decoration: it was on every page, it was
the same on every page, and it said nothing. It was removed.

What replaced it is eight figures, two per property, each placed inside the
section whose claim it makes and nowhere else. A page with no argument to draw
does not get one.

| Property | Section | The figure | What using it does |
|---|---|---|---|
| genica.org | "Every engagement runs the same four stops" | The work at each stop: scope argued into lines of specification, the risky joins proved with nothing else built, the product solid, then refined with what usage did not justify taken out | Point at a stop and the other three recede |
| genica.org/work | "What we built" | Four documents arriving with a deal, and the few lines in each that reach the brief | Point at a document and its lines in the brief light up, which is the traceability claim |
| aigenica.com | "What we install" | The pipeline: a queue, a scoped agent, a gate, and the record each passing change writes | Switch the gate off. Work still ships and the record stops |
| aigenica.com/pipeline | "Four stages, then the record" | Work moving through four stages, with a gate after one of them and the discarded work piling up below | Move the gate. The same rejection rate costs six times as much on the right |
| edugenica.com | "Your audience is spread across four rented tools" | Four boxes emptying into one database, with the people who were in more than one merging as they land | Point at a tool and its share of the list stands out, merged records included |
| edugenica.com/formats | "Whichever format you pick, this is underneath it" | The chosen format's shape above a line, the platform below it | Change the format and watch what does not move |
| flowgenica.com | "Define it once. Run every client on it." | A template and its engagements, until a stage runs long and every date after it moves | Click a stage to delay it, or the template to change it for everyone |
| flowgenica.com/product | "What it will do" | One engagement, shown to your team and shown to your client | Switch the view. No stage moves and no date changes |

Rules these keep:

- **A figure is made of a square and a hairline, and nothing else.** That is
  the vocabulary the components already use, so a figure sits beside a ruled
  list without announcing that it came from a different toolbox.
- **The accent marks the one thing the section is about.** The changes waiting
  on a named approval. The people who were in two lists. The dates that moved.
  The work a late gate throws away. If the accent is not carrying the argument,
  it is not used.
- **Interaction has to prove something.** Every figure answers a question the
  copy can only assert. Nothing lights up merely because a cursor is near it.
- **State that matters is a real control.** Where a figure is set or switched
  rather than explored, the control is a pill button under the drawing:
  reachable with a keyboard, announced to a screen reader, and legible at every
  width, which a tab drawn inside a canvas is not. Clicking the drawing is a
  shortcut to the same state, never the only way to reach it.
- **Whatever a figure reveals also appears as text**, in the line under it, and
  that line's height is reserved so nothing below it moves.
- **Labels are real text**, sharing the drawing's coordinate box, x and y from
  0 to 1 with y up, so a label stays on the part it names at every width. Each
  belongs to the wide or the stacked arrangement, chosen on the figure's
  measured proportions rather than on a viewport breakpoint that would disagree
  with it.
- **Every figure has an `alt`** describing what it shows, not naming it.
- **Scroll-driven figures finish while still in view.** The gate and the
  pipeline run on their own clock instead: a pipeline that stopped when you
  stopped reading would be making the wrong point.

Infrastructure is `packages/ui/src/webgl`. `Stage` imports three.js only when a
figure is about to enter the viewport, stops the loop when it leaves or the tab
is hidden, caps pixel ratio, thins scenes on phones, survives context loss, and
under `prefers-reduced-motion` renders one still frame at the figure's finished
state while keeping interaction working, repainting on demand. `figures/lib.ts`
holds the square and the hairline; each figure is one file that says what it
draws and why.

Adding one is a decision about the section, not about the page: if you cannot
say in one sentence what the drawing proves that the copy asserts, do not add
it.

## The signature

Every page ends with the property's name set once, the width of the container,
the treatment Michael already runs across his Payload sites.

The letterforms carry no ink of their own. Clipped to the text sit three
things: the paper's own tone, a grain over it, and one soft light in the
property's accent that follows the pointer across the word. So it reads as an
impression pressed into the page rather than a second wordmark printed on it,
which is what a signature is, and it is the only place in the system where the
accent appears at this size, because it appears there only under the pointer.

It is cut by the bottom of the page. The footer clips, the block is pulled
back through the footer's closing space, and the lettering is then driven a
fifth of its own em past that edge, so the page takes the foot of every
letter. The cut is in ems rather than pixels, which is what keeps it the same
fraction of the letter at 390 as at 1600.

Three things about it are fixed:

- **The grain is the system's only texture**, it exists nowhere else, and the
  moment a second surface takes it, it stops being the signature's and becomes
  a background. It is `feTurbulence` in a data URI rather than an asset, so it
  costs no request in four apps and cannot be reused by accident.
- **Size is measured, not guessed.** `FIT` in `components/signature.tsx` is
  each name's advance width in ems, in Inter at 600 with this tracking. Font
  size is `100 / that` container-query widths, which lands Genica and
  FlowGenica on the same two edges. Change the face, the weight or the
  tracking and the four numbers have to be measured again.
- **The cut is a fifth of an em**, `--sig-cut`. It is set once, and it is
  deep enough that a descender is gone entirely rather than half-present,
  which is the difference between a crop and a mistake.
- **It is `aria-hidden`.** The footer above it already names the property; a
  screen reader does not need the name a second time as a stray word.

## Motion

The client's note was that premium is in the small details. The answer is not
more movement: it is that every state the interface already has should be
reported, in the vocabulary the static system already owns. Nothing here adds
a shape, a colour or a face. `packages/ui/src/styles/motion.css` holds the
whole layer, and it is imported after `globals.css` so it can redefine what it
supersedes.

Three rules, and they are the reason several tempting things are absent:

1. **Motion reports position or state.** Nothing moves to be noticed. There is
   no parallax, no reveal-on-scroll for its own sake, no hover that only makes
   a thing bigger.
2. **Entrances run on the scrollport, not on a clock.** `.reveal` uses
   `animation-timeline: view()`, so a list staggers because it arrives
   staggered rather than because four delays were written by hand, and an
   element already on screen is simply already there. Where the browser has no
   scroll-driven animation, the same class degrades to the single opening
   animation the system had before. `.rise` is kept for the hero, which is
   above the fold and therefore has no arrival to run on.

   Every entrance comes out of focus as well as out of nothing: the blur
   comes off as the opacity comes up, four pixels on a block, three on the
   line under a heading, five on a heading's own words, six on the signature.
   Larger type needs less blur to read as soft, and text that resolves into
   legibility settles rather than slides.

   The timeline takes a sixth off the bottom of the scrollport
   (`view(block auto 16%)`). Measured against the real bottom edge an
   entrance both starts and finishes at the real bottom edge, which is the one
   place nobody is looking: the gesture was correct and invisible. Held back
   by a sixth it plays a little way up the page, where it is read. Nothing
   about the document changes, only where in the scroll the arrival is
   measured from. The word stagger in `.reveal-text` is a shift of each word's
   own range rather than a delay, capped at six words, so a heading comes
   apart on the way back up in the order it went together.
3. **Everything survives `prefers-reduced-motion`**, and what a gesture
   reveals is readable with the gesture removed. The override is an
   `!important` in an earlier layer, because a scroll-driven animation ignores
   duration: shortening it would leave the element stuck at nothing, so it has
   to be switched off outright.

What the layer adds, and what each one is for:

| Gesture | Where | What it reports |
|---|---|---|
| `.reveal` | Every section-level component | Where the page is under you, arriving out of focus and resolving |
| `.reveal-text` | Section and closing headings | The line arriving a word at a time, left to right, each word resolving out of a blur, because that is the order it is read |
| `.reveal-under` | The line beneath a heading | That it belongs to the heading: it starts after it and travels half as far |
| `.link` | Every prose link | A hairline underline wiping to the accent |
| `.nav-link` | Header nav | An underline growing from the side it is read from |
| `[data-sheen]` | Every pill | A light that follows the pointer across it, and a one-pixel lift |
| `.arrow` | Anything that leads away | Which way it goes |
| `.site-header` | Header | The rail scrolls away and the bar pins, by sticking one rail above the viewport, so the document's height never changes and nothing under it jumps |
| `.site-progress` | Header | How far through the page, as the one accent hairline |
| `.rail-label` | The switcher rail | What the dark strip is, in the property's light accent: the one accent spent at rest rather than on a hover |
| `.rail-link` | The switcher rail | The same underline wipe as a prose link, in the light accent, because the rail is the one dark surface above the fold |
| `Signature` | The foot of every page | Where the pointer is across the name, as the only light that reaches it |
| `.row` | Every ruled row | The tinted surface out to the gutter, a hairline down the leading edge, the term moved by that hairline's width |
| `.roster` | Client names | One name at a time: the rest step back |
| `.tick` | Lists of inclusions | The ring fills, so a list reads as being checked off |
| `.plus` | Disclosure | A plus of two hairlines rotating into a minus, rather than a chevron, which would have been a third shape |
| `.cell` | The network field | The whole quarter tints, because the whole quarter is what the click covers |
| `Stat` | A measured number | Counts once, the first time it is read, then stays |
| `@view-transition` | Between pages | The header and footer are named and hold still; the page between them cross-fades |

Two things are deliberately gated. The pinned bar goes translucent only inside
`@supports (backdrop-filter)`, because where the blur cannot be drawn,
bleed-through stops being a hint and becomes legible text behind the wordmark.
And `Stat` renders its value in the markup before any script runs, so a
crawler, a reader mode and a screen reader get the number rather than a zero.

The only JavaScript is `components/motion.tsx`, mounted once per layout: one
passive pointer listener and one passive scroll listener, folded into a single
animation frame, writing custom properties and re-rendering nothing. With the
script absent the pill has no light and the bar simply stays as it is.

Adding a gesture is the same decision as adding a figure: if you cannot say in
one sentence what state it reports, it is decoration, and this system does not
take decoration.

## Adding a page

Read this file, `PRODUCT.md`, and the taste-skill SKILL.md. Install it with
`npx skills add Leonxlnx/taste-skill`; it could not be written into `.claude/`
from the remote session that built this.

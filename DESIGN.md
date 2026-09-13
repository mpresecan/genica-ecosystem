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
- One dark band per page, carrying the proof.

## Rules this system enforces

From taste-skill, and they are the reason several things were removed:

- **Zero em-dashes.** Not in headlines, labels, body, quotes or captions. The
  whole corpus was rewritten to commas, colons, parentheses and full stops.
- **Eyebrows are rationed to one per three sections.** Every page is counted.
- **No decorative status dots**, no colour swatches before names or nav items.
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

What replaced it is four figures, one per property, each placed inside the
section whose claim it makes, and nowhere else. A page that has no argument to
draw does not get one.

| Property | Section | The figure |
|---|---|---|
| genica.org | "Every engagement runs the same four stops" | The work at each stop: scope argued into lines of specification, the risky joins proved with nothing else built, the product solid, then the product refined with what usage did not justify taken out |
| aigenica.com | "What we install" | The pipeline: a queue, a scoped agent, a gate that every change passes through, and the record each passing change writes |
| edugenica.com | "Your audience is spread across four rented tools" | Four boxes emptying into one database, with the people who were in more than one box merging as they land |
| flowgenica.com | "Define it once. Run every client on it." | A template and its engagements, until one client returns feedback late and every date after it moves, on that row only |

Rules these keep:

- **A figure is made of a square and a hairline, and nothing else.** That is
  the vocabulary the components already use, so a figure sits beside a ruled
  list without announcing that it came from a different toolbox.
- **The accent marks the one thing the section is about.** The changes waiting
  on a named approval. The people who were in two lists. The dates that moved.
  If the accent is not carrying the argument, it is not used.
- **Labels are real text, not drawn into the canvas.** The drawing and the
  labels share one coordinate box, x and y from 0 to 1 with y up, so a label
  stays on the part it names at every width. A figure switches to a stacked
  arrangement below a measured proportion, and each label belongs to one
  arrangement or the other.
- **Every figure has an `alt`**, describing what it shows rather than naming it.
- **Three are driven by scroll and finish while still in view.** The gate runs
  on its own clock instead: a pipeline that stopped when you stopped reading
  would be making the wrong point.

Infrastructure is `packages/ui/src/webgl`. `Stage` imports three.js only when a
figure is about to enter the viewport, stops the loop when it leaves or the tab
is hidden, caps pixel ratio, thins scenes on phones, survives context loss, and
under `prefers-reduced-motion` renders one still frame at the figure's finished
state. `figures/lib.ts` holds the square and the hairline; each figure is one
file that says what it draws and why.

Adding one is a decision about the section, not about the page: if you cannot
say in one sentence what the drawing proves that the copy asserts, do not add
it.

## Adding a page

Read this file, `PRODUCT.md`, and the taste-skill SKILL.md. Install it with
`npx skills add Leonxlnx/taste-skill`; it could not be written into `.claude/`
from the remote session that built this.

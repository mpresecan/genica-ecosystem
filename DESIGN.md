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

## Adding a page

Read this file, `PRODUCT.md`, and the taste-skill SKILL.md. Install it with
`npx skills add Leonxlnx/taste-skill`; it could not be written into `.claude/`
from the remote session that built this.

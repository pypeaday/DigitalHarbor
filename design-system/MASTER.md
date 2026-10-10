# Digital Harbor — Design System

Evolved maritime. "The harbor at night": deep water, brass lantern light,
channel markers. Portfolio-first web studio. Restraint over gimmick — one
beam of light, not a sea of particles.

## Color

| Token | Hex | Use |
|---|---|---|
| abyss | `#050C15` | page background |
| harbor | `#0A1420` | raised surface |
| dock | `#0F1D2C` | cards |
| ink | `#E6EEF7` | primary text |
| ink-mute | `#93A7BD` | secondary text |
| ink-faint | `#5E748C` | captions, labels |
| brass | `#E0A458` | primary accent / CTA (lantern) |
| brass-hi | `#EFB871` | accent hover |
| signal | `#4FD1A5` | live / success (starboard green) |
| buoy | `#E07856` | warn / attention (channel marker) |
| water | `#3BA7B8` | links, subtle tech accent |
| hairline | `rgba(148,180,210,.10)` | borders |

Status mapping: live → signal (pulsing), building → brass (pulsing),
paused → ink-faint, planned → dashed outline.

## Typography

- Display: **Fraunces** (optical serif) — headlines, hero, section titles.
  Weight 400–600, tight leading, occasional italic for emphasis words.
- Body/UI: **Inter** — paragraphs, nav, buttons.
- Data/labels: **JetBrains Mono** — kickers, status readouts, coordinates,
  stack chips, ops data. Uppercase, `tracking-widest`, `text-[11px]`.

Hierarchy: mono kicker → Fraunces display → Inter body. Never skip.

## Motifs

- Depth-contour lines (slow-drift SVG) in hero only; elsewhere flat abyss.
- One radial brass "lantern" glow behind hero headline; seafoam glow on
  live-status elements.
- Mono annotations like `41.25°N — FOX CITIES, WI` as section kickers.
- Hairline dividers, generous spacing (`py-24+`), `max-w-6xl` content.
- Cards: `bg-dock`, 1px hairline border, radius `rounded-xl`, hover =
  border-brighten + `translateY(-2px)` + faint brass edge glow.
- Portfolio cards lead with a 40:21 homepage screenshot
  (`public/images/shots/{slug}.jpg`, recapture via `npm run shots`) —
  dimmed/desaturated at rest, full color + slight zoom on hover.
- Status dots: 8px, `animate-pulse` only for live/building.

## Rules

- No emojis as icons — Lucide only.
- `cursor-pointer` on all clickables; focus-visible rings in brass.
- 150–250ms transitions; `prefers-reduced-motion` kills pulses/drift.
- Contrast: body text ≥ 4.5:1 on backgrounds (ink-mute is the floor for body).
- Breakpoints to check: 375 / 768 / 1024 / 1440.
- Public pages never render ops data — ops requires `?key=` AND env `OPS_KEY`.

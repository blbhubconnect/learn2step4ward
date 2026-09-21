# Learn2Step4ward — Phase 5 Core Shell

Static educational website foundation for Year 4 pupils.

## Current implemented foundation

- Global responsive header/navigation
- Mobile menu with accessible toggle
- BM/ENG interface localization using JSON + localStorage
- Light/dark theme controls (theme persistence intentionally not enabled yet)
- Shared footer
- Home
- Start Here
- Subject Selection
- Subject landing shells for Bahasa Melayu, English, Matematik and Sains
- Practice shell
- Global Resources shell
- Teacher Dashboard foundation
- Parent Dashboard foundation
- About
- Shared responsive design system CSS

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- JSON locale files
- No backend, database, framework, build step or external UI dependency

## Locale path strategy

`assets/js/language.js` derives the site root from its own script URL, then loads `locales/bm.json` or `locales/en.json`. This keeps locale loading independent of the current page depth.

## Academic content rule

Phase 5 does not invent lesson content, question banks, worksheets or curriculum claims. Missing academic/resource content is shown as an explicit placeholder.

## Theme note

The theme switcher works in-page. Theme persistence is intentionally not stored because persistence/default behaviour has not yet been approved as a project requirement.

## Next phase

Phase 6 — Subject System: reusable subject landing and lesson templates, hints, feedback, error classification and retry components using actual approved content only.

## UX typography update

Phase 5 mobile UX revision uses a two-role system-font approach without external font dependencies:
- Display/UI headings: rounded system-friendly stack for a warm learner-facing tone.
- Body/reading text: neutral system sans-serif stack for sustained readability by pupils and adults.

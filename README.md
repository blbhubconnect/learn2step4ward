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


## UX v4 — Hero + Typography consistency

- Mobile and desktop now use the same flat hero language (no desktop-only hero card).
- Display and body font stacks now begin with Trebuchet MS to reduce cross-device font mismatch.
- Hero title, tagline, description widths and CTA proportions use one responsive scale across breakpoints.
- Hero identity remains centered; the description remains justified as approved.
- Mobile CTAs stay stacked/full-width; tablet/desktop CTAs become inline while keeping the same hierarchy.

## UX v5 — Mobile header/navigation correction

- Mobile closed header now shows only the Learn2Step4ward brand and a compact menu button.
- BM/ENG and Light/Dark controls have moved into the top of the opened mobile menu.
- Mobile navigation opens as a full-height, scrollable panel below the 60px sticky header.
- Menu supports close icon state, Escape-to-close, link-to-close, and body scroll locking while open.
- Desktop keeps language/theme controls visible and retains the full navigation row.

## Home UX V6

Home page redesigned using the supplied colourful children's learning-site reference as layout inspiration, while keeping original Learn2Step4ward branding and content. The revision adds a playful subject shortcut strip, an original CSS learning-landscape hero, activity boards, brighter subject stations, and a responsive mobile/desktop layout. No third-party characters or graphics from the reference are copied.


## UX v7 — Home typography & subject-card refinement

- Home now uses one sans-serif typeface stack only: `Arial, Helvetica, sans-serif`.
- The same typeface is used for Home headings, body text, navigation labels and buttons.
- Decorative type effects are avoided; text remains unobstructed and high-contrast.
- Home subject cards are simplified to exactly three content elements: subject image/icon, short subject description, and subject CTA.
- Topic lists and extra copy were removed from Home subject cards.
- Subject cards were shortened and rebalanced for mobile, tablet and desktop.
- Full topic lists remain on the respective Subject Landing pages.

- Subject CTA colours use darker accessible accents so white button text has stronger contrast.

# Design — the UI source of truth

Designed by Claude Opus 5.5. **The building agent does not make design decisions.** Rebuild these
screens as React + Tailwind components so they look the same: colours, spacing, sizes, radii,
font weights, copy. If something is not shown here, use the closest existing pattern and the tokens.

## How to view
These are plain HTML files that render in any browser (they load Inter / Source Serif 4 /
Hind Siliguri from Google Fonts and Lucide icons from unpkg).
```
python -m http.server 4321 --directory .agent/design
```
Then open http://localhost:4321/ for the gallery (light / dark switch at the top), or open any
screen directly. `?theme=dark` or `?theme=light` forces a theme on a single screen.

## Files
| File | What it is |
|---|---|
| `tokens.css` | **All design tokens** (colours light + dark, fonts, type scale, radii, shadows, layout widths). Copy into `src/app/globals.css` and expose them in Tailwind v4's `@theme`. |
| `ui.css` | Reference styles for every component (measurements are the spec). Do not ship this file; rebuild with Tailwind using the tokens. |
| `index.html` | Gallery of all screens. |
| `states.html` | Components and states: buttons, Save states, chips, banners, skeleton, toast, empty states, shortcuts dialog. |
| `mock.js` | Mockup helper only (theme param + icons). Not app code. |

| Screen | Desktop (1440) | Mobile (390) |
|---|---|---|
| Login | `desktop/01-login.html` | `mobile/01-login.html` (shows the error state) |
| Learn — conversation (new word, follow-up reply) | `desktop/02-learn.html` | `mobile/02-learn.html` (repeat lookup + saved card) |
| Learn — empty | `desktop/03-learn-empty.html` | (same content, stacked) |
| Words | `desktop/04-words.html` (list + detail panes) | `mobile/03-words.html` (list), `mobile/04-word-detail.html` |
| Review — start | `desktop/05-review-start.html` | `mobile/05-review-start.html` |
| Review — multiple choice, answered | `desktop/06-review-question.html` (wrong pick) | `mobile/06-review-question.html` (right pick) |
| Review — recall | `desktop/07-review-recall.html` (revealed) | `mobile/07-review-recall.html` (hidden) |
| Review — finished | `desktop/08-review-end.html` (all caught up) | `mobile/08-review-end.html` (more due) |

## Component map (ui.css class → React component)
| Class | Component | Notes |
|---|---|---|
| `.topbar`, `.tabs`, `.tab`, `.count` | `AppHeader` | ≥ 768 px. Tabs centred. Review count = `dueNow`, hidden when 0. |
| `.m-header`, `.tabbar` | `MobileHeader`, `TabBar` | < 768 px. Tab bar hidden during a review session (header shows progress + close instead). |
| `.wc` (`.compact` on mobile) | `WordCard` | Sections with empty data are not rendered. Bangla line hidden when the toggle is off. Every occurrence of the headword in examples is wrapped in `mark.w`. |
| `.bubble-user`, `.bubble-reply` | `MessageList` items | |
| `.composer`, `.composer-meta`, `.switch` | `Composer` | Sticky to the bottom of the viewport. `.focus` = focused state. `.send.idle` when the input is empty. |
| `.banner-*` | `Banner` | accent = repeat lookup counted; neutral = saved info; warn = typo; danger = error with Retry. |
| `.stats`, `.stat` | `ProgressStrip` | 6 tiles desktop, 3×2 mobile. "Due now" tile highlighted. |
| `.wrow`, `.dot`, `.xbadge` | `WordRow`, `StatusDot` | `.on` = selected (desktop). `×N` badge only when `lookupCount > 1`. |
| `.pips` | `BoxMeter` | 5 pips = box 1–5; box 0 = none filled. Green when mastered. |
| `.option`, `.explain` | `QuizOption`, `QuizExplanation` | After answering: correct → `.correct`, wrong pick → `.wrong`, the rest `.dim`. |
| `.seg` | `Segmented` | |
| `.btn-*`, `kbd` | `Button`, `Kbd` | `kbd` hints are hidden on touch devices (`@media (hover: none)`). |
| `.sk` | `Skeleton` | No shimmer with reduced motion. |

## Rules
- Fonts via `next/font/google`: Inter (UI), Source Serif 4 (headwords, big numbers), Hind Siliguri (Bangla). Icons: `lucide-react`, same names as in the HTML (`data-lucide="…"`).
- Breakpoints: < 768 px mobile layout; ≥ 768 desktop header; Words shows two panes at ≥ 1024 px, otherwise list → `/words/[id]`.
- Light/dark follow the system (`prefers-color-scheme`); no theme switch in the app.
- Content widths: Learn and Review column `--content-w` (760); Review cards max 680; Words list pane `--list-w` (380).
- Touch targets ≥ 44 px on mobile. Visible focus ring (`--focus-ring`) on every interactive element.
- Not drawn but required: hover states (in `ui.css`), the loading skeleton in Learn (`states.html`), the error banner with Retry, the "?" shortcuts dialog (`states.html`), the Delete confirmation (a small dialog: "Delete *cohesive*? Its review history is deleted too." [Cancel] [Delete]).
- The sample words, numbers and dates in the mockups are examples, not data to seed.
- Before ticking a UI task, compare the built page side by side with the matching file here at 1440×900 and 390×844, in light and dark.

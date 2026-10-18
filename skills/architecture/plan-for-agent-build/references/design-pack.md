# Design pack — how the planner designs

The builder implements this 1:1 and makes no design decisions. Plain HTML that opens in any
browser beats a design tool export: the builder can open it, screenshot it and compare.

## 1. Direction (decide, don't ask a palette quiz)
Pick one clear direction that fits the product and say it in one line to the user
(e.g. "calm reading app: warm paper background, one blue accent, serif headwords").
Rules: one accent colour + neutrals + success/danger/warn; one UI font (Inter is a safe default),
optionally one display/serif font for headlines or key words; a script font for non-Latin text if
needed (Bangla → Hind Siliguri). Light **and** dark. AA contrast. Generous spacing, quiet chrome.
If the user wants to choose the palette/fonts themselves, use the `frontend-design` skill's Theme
Studio for this step and continue here with its tokens.

## 2. Files
```
.agent/design/
  tokens.css     ← all tokens: fonts, type scale, radii, layout widths, motion, colours (light + dark)
  ui.css         ← component reference styles; comment each block with its React component name
  mock.js        ← ?theme=dark|light + Lucide icons (templates/agent/design/mock.js)
  index.html     ← gallery (templates/agent/design/index.html): scaled iframes + theme switch
  states.html    ← components and states sheet
  desktop/NN-name.html   ← 1440 wide
  mobile/NN-name.html    ← 390 wide
  README.md      ← how to view, file table, screen table, component map, rules
```
Copy `templates/agent/design/screen-head.html` as the start of every screen (fonts, tokens, ui.css,
Lucide from unpkg with a pinned version, mock.js). Use `data-lucide` icon names that exist in
`lucide-react`, so the builder uses the same icons.

## 3. tokens.css
- `:root` light values; dark values under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {…} }` **and** under `:root[data-theme="dark"]`.
- Names the builder can map straight into Tailwind v4 `@theme`: `--bg`, `--surface`, `--surface-2`, `--line`, `--ink`, `--ink-2`, `--ink-3`, `--accent`, `--accent-soft`, `--accent-text`, `--success*`, `--danger*`, `--warn*`, plus domain colours (e.g. status dots).
- Type scale as size + line-height pairs; radii sm/md/lg/xl/full; `--focus-ring`; shadows sm/md/lg; layout widths (content column, side panes, header/tab-bar heights).

## 4. Screens to draw
For each main page: desktop + mobile, with **realistic content** from the product (real words, real
names, plausible numbers; no lorem ipsum). Cover the important states across the set: empty,
filled, answered/selected, error (e.g. on mobile login), success/end. Long pages: use a tall frame
(`.frame-d.tall` / `.frame-m.tall`) so the whole page is visible. Mobile: bottom tab bar if there are
3–5 sections; hide it in focused flows (quiz, checkout) and show progress + close instead.
`states.html`: buttons, async button states (Save → Saving… → Saved), chips/segmented/switch, banners
(info/warn/danger with Retry), skeleton, toast, empty states, dialogs, shortcuts list.

## 5. Verify before showing the user
1. Serve: add a `launch.json` entry `python -m http.server 4321 --directory <project>/.agent/design` and open it with the browser preview tool (file:// is usually blocked).
2. Screenshot key screens in light and dark (`?theme=…`) at 1440×900 and 390×844.
3. Run this in the gallery page to catch overflow, missing icons and measure tall frames (then put the measured heights into index.html):
```js
const pages = [/* every screen path */];
const out = [];
for (const p of pages) {
  const f = Object.assign(document.createElement("iframe"), { src: "/" + p });
  f.style.cssText = "position:absolute;left:-5000px;width:1440px;height:900px";
  document.body.appendChild(f);
  await new Promise(r => f.onload = r); await new Promise(r => setTimeout(r, 400));
  const d = f.contentDocument, fr = d.querySelector(".frame-d,.frame-m,.sheet"), R = fr.getBoundingClientRect();
  const over = [...fr.querySelectorAll("*")].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > R.right + 1; });
  out.push(`${p} h=${Math.round(fr.scrollHeight)} overflowX=${over.length} icons=${d.querySelectorAll("svg.lucide").length}/${d.querySelectorAll("[data-lucide]").length}`);
  f.remove();
}
out.join("\n");
```
4. Fix, re-check, then show the user the gallery and ask for changes.

## 6. README component map
Worked example: `templates/agent/design/README.example.md` (from Vocab). A table: `ui.css` class → React component → notes (when shown/hidden, states). Plus rules: fonts via
`next/font`, icon library, breakpoints (< 768 mobile, ≥ 768 desktop, any two-pane threshold), light/dark
from the system, content widths, touch targets ≥ 44 px, focus ring, which required states are not
drawn (hover, delete confirmation…), "sample data is not seed data", and "compare side by side at
1440×900 and 390×844, light and dark, before ticking a UI task".

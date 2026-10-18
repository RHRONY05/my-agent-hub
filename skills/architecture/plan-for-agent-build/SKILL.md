---
name: plan-for-agent-build
description: Plan AND design a whole project so an autonomous builder agent (Google Antigravity) can build it end to end without asking anything — the "Claude plans + designs, Antigravity builds" workflow. Produces AGENTS.md + CLAUDE.md at the root and a .agent/ pack (product, architecture, database, API, domain logic, UI behaviour, finished desktop + mobile HTML designs with tokens, testing plan with e2e and Lighthouse targets, task list with acceptance criteria, PROGRESS.md, rules, /next-task and /status workflows) plus a goal command to paste into the builder. Use when the user wants to plan a new app/site/tool "for Antigravity to build", asks for "the same planning as Menuwala/Vocab", or says /plan-for-agent-build. NOT for step-by-step pair-programming where the user codes and learns one item at a time (use plan-project), and NOT for designing screens only (use design-canvas).
---

# Plan for Agent Build

I (Rony) work like this: **Claude plans and designs everything; an Antigravity agent builds it in one go**
from a `goal` command; I only add secrets and check the result. The builder must never have to make a
product, architecture or design decision. If it has to guess, the plan failed.

Real examples to copy from (read them when unsure what "done" looks like):
- `D:\Projects\Vocab_App` — single app. Root `AGENTS.md` + `CLAUDE.md`, `.agent/01…09`, `.agent/design/`.
- `D:\Projects\Menuwala\.agent` — multi-part variant (`platform/` + one folder per part, "Active build" table).

My background and rules for AI are in `D:\Projects\Personal_Context` (read `README.md` and
`06_ai_agent_instructions.md` first). Follow them: direct tone, no 20-item checklists in chat,
free tiers first, AI writes the code and I read the flow.

---

## Hard rules

1. **Docs are files, not chat.** Everything decided goes into the pack. Chat only summarises.
2. **`AGENTS.md` lives at the project root, outside `.agent/`.** Add `CLAUDE.md` containing only `@AGENTS.md` so Claude Code reads the same file. Never put AGENTS.md inside `.agent/`.
3. **The planner designs; the builder implements.** Ship finished screens for desktop **and** mobile. The builder's rules forbid design decisions and raw colour values.
4. **Every task has tests and concrete acceptance criteria** (what to type, what must appear). "Works well" is not an AC.
5. **Testing always covers 4 layers:** unit, integration, e2e on desktop + mobile, and Lighthouse on mobile + desktop with numeric targets (plus axe accessibility). Tests use a separate test user and mocked external AI/APIs.
6. **Infrastructure through MCP:** the builder creates Supabase / Vercel / GitHub resources itself via MCP. Free tier only; ask me before anything paid; never pause or delete existing projects.
7. **Secrets:** never written into docs or chat. Docs name variables only. The human-steps list says exactly which secret I must add and where.
8. **Keep it simple.** Cut anything that is not needed for the first version into an explicit "Out of scope" list.
9. **Never start building code yourself** in this skill. The output is the pack + the goal command.

---

## Phases

Work through them in order. Use the task list tool, and show me progress in one line per phase.

### Phase 0 — Context (no questions yet)
- Read `Personal_Context` (README + file 06). Look at the two example projects' `AGENTS.md`.
- If the project folder exists, read what is there. If not, propose `D:\Projects\<Name>` and create it.

### Phase 1 — Short interview
Ask only what changes the plan, at most ~6 questions, each with my likely answer as the default
(use the question tool with options). Typical: who uses it and on which device (desktop-first or
mobile-first?), the 3–5 things it must do, what exists today (an n8n flow, a Notion DB, an old app),
data that must be kept or seeded, integrations, hosting. If I already explained it, don't ask again.

### Phase 2 — Decisions
Write the **Key decisions** table (topic → decision) that will go into `AGENTS.md`. Choose sensible
defaults instead of asking: Next.js (App Router, TS strict) + Tailwind v4 + Supabase + Vercel + Zod +
Vitest + Playwright unless the project needs otherwise. Recommend one option; don't survey.

### Phase 3 — Docs pack
Create the files from `templates/` (fill every `{{…}}`; delete sections that don't apply):
`templates/AGENTS.template.md` → `AGENTS.md`, `templates/CLAUDE.template.md` → `CLAUDE.md`,
`templates/agent/*` → `.agent/*` (rename `rules/project.md` to `rules/<project>.md`).
Docs 01–07 have no template: write them from `references/doc-guide.md` (what each must contain),
using `D:\Projects\Vocab_App\.agent\` as the worked example.

```
<project>/
  AGENTS.md                ← start here: read order, key decisions, status
  CLAUDE.md                ← "@AGENTS.md"
  .agent/
    PROGRESS.md            ← state: Now table, human steps, env facts, decisions, session log
    01-PRODUCT.md          ← problem, user stories (IDs), out of scope
    02-ARCHITECTURE.md     ← stack, env vars, auth, data flow, folders, deploy
    03-DATABASE.md         ← full SQL migration, RLS, derived values
    04-API.md              ← every route/RPC: input, flow, output, errors
    05-AI-PROMPTS.md       ← only if the app calls an LLM: prompts + output schemas
    06-UI.md               ← behaviour per page + keyboard shortcuts (looks live in design/)
    07-<DOMAIN>.md         ← the core logic with formulas + worked examples (e.g. quiz engine, pricing)
    08-TASKS.md            ← V0 preflight → … → final, each with tests + AC
    09-TESTING.md          ← 4 layers, test user, mocks, Lighthouse targets
    rules/<project>.md     ← always-on rules (definition of done, DB, secrets, style, quality)
    workflows/next-task.md, workflows/status.md
    design/                ← Phase 4
```
Multi-part products (one platform, several brands/clients): put shared docs in `.agent/platform/`,
per-part docs in `.agent/<parts>/<slug>/`, and an "Active build" table in `AGENTS.md` (see Menuwala).

### Phase 4 — Design pack (I design, for real)
Follow `references/design-pack.md`. In short: pick one clear direction, write `design/tokens.css`
(light + dark) and `design/ui.css` (component reference), then draw every main screen as plain HTML
for **desktop 1440** and **mobile 390**, a `states.html` sheet, an `index.html` gallery, and a
`README.md` with the component map and rules. Serve the folder, check every screen in the browser
(screenshots + the overflow script), fix, then show me the gallery. Iterate on my feedback.

### Phase 5 — Testing plan
Fill `.agent/09-TESTING.md` (from `templates/agent/09-TESTING.md`): integration + e2e specs per flow, the test user, the mock
switch (and the guard that refuses it in production), Lighthouse pages and targets.

### Phase 6 — Tasks
Fill `.agent/08-TASKS.md` (from `templates/agent/08-TASKS.md`). Rules:
- V0 is always **Preflight** (tools, MCPs, secrets present by length only, versions; a table in PROGRESS.md).
- V1 is always **Scaffold + design system** (tokens, fonts, base components, app shell, test runners, private repo).
- Vertical slices after that, each naming its docs, design files, tests and AC.
- A local production-build Lighthouse run in the middle, deploy near the end, and a final task with
  production Lighthouse, README, and a **code-flow walkthrough** for me (request in → response out).
- 7–10 tasks for a small app. Each one finishable in one sitting by the agent.

### Phase 7 — Consistency check, then handoff
Run the checklist in `references/doc-guide.md` → "Before handoff" (names, env vars, viewport sizes,
every route and screen covered by a task, no stale references). Then give me:
1. The goal command from `templates/goal-command.md`, filled in.
2. The human steps (usually: add one API key to `.env.local`).
3. Two or three lines on any decision you made that I might want to change.

Write the planning entry in PROGRESS.md's session log before you finish.

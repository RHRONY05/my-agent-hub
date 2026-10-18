# What goes in each doc

The builder reads these in order and builds exactly what they say. Write so a capable agent with no
access to our conversation could build the app without a single question.

| Doc | Must contain | Common mistakes |
|---|---|---|
| `AGENTS.md` | One-paragraph "what this is and who it's for"; numbered read order; **Key decisions** table (users, device priority, stack, DB/hosting via MCP, AI, design source, testing, repo visibility); status checklist. | Decisions left as options ("Supabase or Firebase"). Read order missing design/ or testing. |
| `CLAUDE.md` | `@AGENTS.md` only. | Duplicating content. |
| `01-PRODUCT.md` | The problem (2–3 lines); one-paragraph product; user stories table with IDs (L1, W2, R3…) + notes; **Out of scope** list. | Features in the UI doc that have no story; no out-of-scope list (the builder then adds extras). |
| `02-ARCHITECTURE.md` | Stack table with versions/notes; allowed dependencies; `.env.example` block with comments (which are server-only, which the human adds, which never go to production); auth model; data-flow diagram; full folder tree; deploy steps via MCP. | Missing env var that a later doc uses. Telling the builder to "pick a model" without saying how to choose. |
| `03-DATABASE.md` | The whole first migration as SQL (tables, checks, indexes, triggers, RLS policies with `(select auth.uid())`); rules (uniqueness, what an update may change); derived values table. | RLS forgotten on one table; behaviour rules only in prose elsewhere. |
| `04-API.md` | Shared error format; per route: input (with limits), step-by-step flow, output type, error cases. | Output shapes that don't match what the UI doc shows. |
| `05-AI-PROMPTS.md` | (Only with an LLM.) TypeScript shapes; full system prompts in code blocks; user-message format; structured output + Zod + one retry; when the AI is and isn't called (cost). | Prompts that ask the user questions back; no "never invent" rule. |
| `06-UI.md` | Behaviour per page (states, empty/loading/error, what each button does), keyboard shortcuts table, "design wins on looks, this doc wins on behaviour". | Describing colours/spacing here instead of in design/. |
| `07-<DOMAIN>.md` | The core logic as tables + formulas + **worked examples** + the exact unit tests required. Pure functions, RNG/time injected. | Logic described only in words; no examples to test against. |
| `08-TASKS.md` | Rules line; ASCII dependency chain; tasks V0…Vn with bullets, **Tests:** and **AC:**; "Questions for the human" section. | AC that can't be checked; tests not named; deploy before tests exist. |
| `09-TESTING.md` | Layer table (unit, integration, e2e, Lighthouse); test user + mock switch + production guard + reset helper; minimum integration cases; e2e spec table (desktop + mobile projects); Lighthouse pages + targets table; npm scripts. | E2E against the owner's real data; real paid API calls in tests. |
| `rules/<project>.md` | Workflow (read order, one task at a time, definition of done incl. tests + design comparison + PROGRESS update + commit); DB via MCP rules; secrets; code style ("do not design", tokens only, Zod at boundaries, pure logic tested); quality bar. | — |
| `PROGRESS.md` | Now table; **Human steps** checklist; environment facts (no secrets); decisions log; session-log template + the planning entry. | — |
| `workflows/next-task.md`, `status.md` | Frontmatter `description`; numbered steps (see templates). | — |

## Before handoff (consistency checklist)

Run these greps/reads over the pack and fix every hit:
- [ ] Every env var used in any doc appears in the `.env.example` block (02).
- [ ] Viewport sizes are the same everywhere (design uses 1440×900 and 390×844 unless the project says otherwise).
- [ ] Every API route in 04 is built and tested in some task; every screen in design/ is named in some task.
- [ ] Every user story in 01 maps to a page/behaviour in 06 and a task.
- [ ] Names match across docs (table/column names, route paths, component names, file paths).
- [ ] No stale statements left from earlier drafts (e.g. "no e2e", "PWA", an old file name). Grep for them.
- [ ] Out-of-scope list doesn't contradict a task.
- [ ] Human steps list is short and exact (which key, which file).
- [ ] `AGENTS.md` read order lists every doc that exists.

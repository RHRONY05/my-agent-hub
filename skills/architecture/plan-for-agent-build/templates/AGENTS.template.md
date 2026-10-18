# AGENTS.md — Start here

This repo is **{{Project}}**, {{one sentence: what it is, for whom}}.
{{One short paragraph: the problem it solves and the main flow.}}

**Planned and designed by** Claude. **Built by** an AI agent (Antigravity), end to end.
The human checks the finished app; he does not write code.

## Read in this order
0. [.agent/PROGRESS.md](.agent/PROGRESS.md) — where the project is right now (read first, update before you stop)
1. [.agent/rules/{{project}}.md](.agent/rules/{{project}}.md) — always-on rules (non-negotiable)
2. [.agent/01-PRODUCT.md](.agent/01-PRODUCT.md) — what it does, user stories, out of scope
3. [.agent/02-ARCHITECTURE.md](.agent/02-ARCHITECTURE.md) — stack, folders, env, auth, deploy
4. [.agent/03-DATABASE.md](.agent/03-DATABASE.md) — schema, RLS, migration
5. [.agent/04-API.md](.agent/04-API.md) — every route's contract
6. [.agent/05-AI-PROMPTS.md](.agent/05-AI-PROMPTS.md) — prompts and output schemas {{delete if no LLM}}
7. [.agent/06-UI.md](.agent/06-UI.md) — pages, behaviour, keyboard shortcuts
8. [.agent/design/README.md](.agent/design/README.md) — **the visual design (source of truth)**: tokens + every screen, desktop and mobile
9. [.agent/07-{{DOMAIN}}.md](.agent/07-{{DOMAIN}}.md) — {{the core logic}}
10. [.agent/09-TESTING.md](.agent/09-TESTING.md) — unit, integration, e2e, Lighthouse targets
11. [.agent/08-TASKS.md](.agent/08-TASKS.md) — the task list (V0 → V{{n}})
12. `.agent/workflows/` — `/next-task` and `/status`

## Key decisions (already made — do not re-open)
| Topic | Decision |
|---|---|
| Users | {{e.g. exactly one user, email + password, no sign-up}} |
| Device | {{desktop-first / mobile-first; sizes 1440×900 and 390×844}} |
| Stack | {{Next.js 16 (App Router, TS strict) + Tailwind v4 + Supabase + Zod + Vitest + Playwright, on Vercel}} |
| Supabase | Cloud project created and managed through the **Supabase MCP**. Free tier only. Every schema change is also a file in `supabase/migrations/`. |
| Vercel | Project, env vars and deploys through the **Vercel MCP**. Hobby (free) plan. |
| AI | {{provider, model env var, when it is called and when not}} |
| Design | Done by the planner in `.agent/design/`. The builder implements it exactly and makes **no** design decisions. Tokens from `design/tokens.css` only. |
| Testing | Unit + integration (Vitest), e2e on desktop and mobile (Playwright), accessibility (axe), Lighthouse on mobile and desktop with targets in `09-TESTING.md`. Tests use a separate test user and mocked external APIs. |
| Repo | Git + **private** GitHub repo `RHRONY05/{{Repo}}`. Never commit secrets. |
| {{Topic}} | {{Decision}} |

## Status
- [x] Planning + design ({{YYYY-MM-DD}})
- [ ] Build V0 → V{{n}}

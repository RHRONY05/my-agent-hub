# 08 — Tasks

Rules: `rules/{{project}}.md`. Work **in order V0 → V{{n}}**, one agent, one go. Each task depends on the ones before it.
Mark a task `— in progress: <agent>` when you start; tick `[x]` + a one-line note when done; add a
session-log entry in `PROGRESS.md` after **every** task, then continue with the next task.

```
V0 Preflight ─▶ V1 Scaffold + design system ─▶ V2 Data + auth ─▶ V3 {{slice}} ─▶ V4 {{slice}}
                                                                                    │
         V{{n}} Final check + prod Lighthouse ◀─ V{{n-1}} Seed + deploy ◀─ … ◀─ V{{k}} {{slice}} + local Lighthouse
```

---

- [ ] **V0 Preflight**
  - Read `AGENTS.md`, every file in `.agent/`, and open the design gallery (`.agent/design/README.md` → "How to view").
  - Check: Node ≥ 20, git, Supabase MCP (list orgs/projects, `get_cost`), Vercel MCP, GitHub access for `RHRONY05`, Chrome DevTools MCP (`lighthouse_audit`), Playwright can install Chromium.
  - Check `.env.local` has the secrets the human adds ({{list}}) — length only, never print them.
  - {{Any version/model choice the builder must research and record}}
  - **AC:** a preflight table in PROGRESS.md (item · ✅/❌ · what the agent did / what the human must do).

- [ ] **V1 Scaffold + design system**
  - {{Framework + libraries from 02}}, Vitest (unit + `vitest.int.config.ts`), Playwright (`desktop` + `mobile` projects). Folder skeleton from 02. Scripts from 09-TESTING.md.
  - The folder already has `AGENTS.md`, `CLAUDE.md` and `.agent/`, so `create-next-app` may refuse to run here. Scaffold in a temporary folder and move the files in. **Never overwrite our `AGENTS.md` or `CLAUDE.md`**: if the framework generates its own agent-rules block, add it at the top of our `AGENTS.md`.
  - Design system: copy `design/tokens.css` into `globals.css` + Tailwind `@theme`; fonts via `next/font`; base components from the design README's component map; the app shell (desktop header / mobile header + tab bar) with placeholder pages.
  - `src/lib/env.ts` (Zod-validated), `.env.example`, `.gitignore`. {{noindex if private}}
  - `git init`, private GitHub repo `RHRONY05/{{Repo}}`, first commit pushed.
  - **AC:** `build`, `typecheck`, `lint`, `test` pass; a sample Playwright test passes on both projects; the shell matches the design at 1440 and 390, light and dark; repo is private.

- [ ] **V2 {{Data + auth}}**
  - Create the free Supabase project via MCP; migration from 03 → `apply_migration` → types → `get_advisors` clean.
  - Users: {{owner + e2e test user via a script}}; secrets generated into `.env.local`.
  - {{Login page per design, proxy/middleware, requireOwner()}}; test helpers (reset, login setup project).
  - **Tests:** {{auth.spec.ts; integration 401 cases}}.
  - **AC:** {{concrete checks}}.

- [ ] **V3 {{Vertical slice}}**
  - {{Lib + API routes from 04 + page per 06 and design files NN}}.
  - **Tests:** {{unit …; integration …; e2e …}}.
  - **AC (in the browser):** {{type X → see Y; matches design at 1440 and 390, light and dark}}.

- [ ] **V{{k}} {{Last UI slice}} + local Lighthouse**
  - {{…}}
  - **Tests:** {{e2e …}}, `a11y.spec.ts`, `visual.spec.ts` (baselines after comparing with the design by eye).
  - Production build locally → Lighthouse mobile + desktop on {{pages}} (09-TESTING.md). Fix misses.
  - **AC:** `npm run test:all` green; Lighthouse table in PROGRESS.md meets the targets.

- [ ] **V{{n-1}} Seed, cron, deploy**
  - {{Seed real starting data through the app's own code path}}.
  - {{Keepalive cron if Supabase free tier}}.
  - Via Vercel MCP: project from the GitHub repo, env vars (never test/mock vars, never the service-role key or passwords), deploy.
  - **AC:** production URL loads; login works there; {{a real end-to-end action works there}}.

- [ ] **V{{n}} Final check, production Lighthouse, handoff**
  - `npm run test:all` and `npm run build` green.
  - Lighthouse on the **production URL**, mobile + desktop. Fix, redeploy, re-run. Final table in PROGRESS.md.
  - `README.md`: what it is, local setup, env vars, scripts, tests, deploy{{, extras}}.
  - Final message to the human: what was built, the production URL, the Lighthouse table, a code-flow walkthrough for {{2–3 main flows}} (request in → response out, which files), and anything left for him to do.
  - **AC:** everything green; targets met (or each miss explained); walkthrough delivered.

---

## Questions for the human
(Agents add questions here; the human answers inline.)

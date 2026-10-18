# 09 — Testing and performance

Four layers. All must be green before a task is ticked (each task names which specs it adds).

| Layer | Tool | Command | What it covers |
|---|---|---|---|
| Unit | Vitest | `npm run test` | Pure logic in `src/lib/` ({{list}}) and Zod schemas. |
| Integration | Vitest (`*.int.test.ts`, separate config) | `npm run test:int` | API routes against the real Supabase project, logged in as the **e2e user**, external APIs mocked. |
| End-to-end | Playwright | `npm run test:e2e` | Real browser flows, desktop **and** mobile projects. |
| Performance + a11y | Lighthouse (Chrome DevTools MCP `lighthouse_audit`, or the `performance-audit` skill) + axe | — | Scores on mobile and desktop, recorded in PROGRESS.md. |

## Test user and mocks
- A second Supabase user, the **e2e user** (`E2E_EMAIL`, `E2E_PASSWORD` in `.env.local` only). RLS keeps its data apart from real data.
- Test runs set {{ALLOWED_EMAIL=$E2E_EMAIL}} and `{{MOCK_FLAG}}=1` (Playwright `webServer.env`; Vitest setup).
- `{{MOCK_FLAG}}=1` makes {{src/lib/ai.ts / the external client}} return fixtures from `tests/fixtures/`. Deterministic, no cost.
- `src/lib/env.ts` **refuses to start** with `{{MOCK_FLAG}}=1` when `VERCEL_ENV=production`.
- Each run first resets the e2e user's data (`tests/helpers/reset.ts`, service-role key, local only).

## Integration tests (minimum)
- {{Per route: happy path, edge cases, the important business rule}}.
- Every route returns 401 without a session and for a user who isn't allowed.

## E2E specs (Playwright)
Projects: `desktop` (1440×900) and `mobile` (390×844, touch, `isMobile`). Log in once in a setup project.

| Spec | Flow |
|---|---|
| `auth.spec.ts` | logged out → redirect to login; wrong password → error; correct → home; log out. |
| `{{flow}}.spec.ts` | {{steps and what must appear}} |
| `visual.spec.ts` | Screenshot every main screen on both projects, light and dark; compare with `.agent/design/` by eye once, then keep as `toHaveScreenshot` baselines. |
| `a11y.spec.ts` | `@axe-core/playwright` on the main pages: no serious or critical violations. |

## Performance targets (Lighthouse)
Run on a local **production build** mid-way and on the **production URL** at the end.
Pages: {{list}}. Log in first in the audited browser, then audit each page in **mobile** and **desktop** mode.

| Metric | Mobile | Desktop |
|---|---|---|
| Performance | ≥ 90 | ≥ 95 |
| Accessibility | 100 (≥ 95 only with a written reason) | 100 |
| Best Practices | ≥ 95 | ≥ 95 |
| SEO | {{≥ 95 for public sites / not a target for private apps (noindex)}} | |
| LCP | < 2.5 s | < 1.5 s |
| CLS | < 0.05 | < 0.05 |
| TBT | < 200 ms | < 100 ms |

Record every score in PROGRESS.md. If a target is missed, fix the cause and re-run; only write a reason when it cannot be fixed.

## Scripts in package.json
`test`, `test:int`, `test:e2e`, `test:all` (= typecheck + lint + test + test:int + test:e2e).
Allowed dev dependencies: `@playwright/test`, `@axe-core/playwright`.

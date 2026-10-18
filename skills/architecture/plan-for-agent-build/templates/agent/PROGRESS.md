# PROGRESS — the project's memory

**Every agent reads this first and updates it before ending any session.**
`08-TASKS.md` is the *plan* (what to build). This file is the *state* (where we are).

---

## Now
| | |
|---|---|
| **Phase** | Planned, ready to build |
| **Next task** | V0 Preflight |
| **Blocked on** | — |
| **Production URL** | — |
| **Last updated** | {{YYYY-MM-DD}} by Claude (planning) |

## Human steps
Things only the human can do. Agents add to this list; the human ticks them.
- [ ] {{e.g. Add `GEMINI_API_KEY=<key>` to `<project>\.env.local`}}
- [ ] When the build is done: open the production URL, log in, and try it.

## Environment facts (no secrets here!)
| Item | Value |
|---|---|
| GitHub repo | — (private) |
| Supabase project ref / region | — |
| Vercel project / URL | — |
| Node / npm | — |

## Lighthouse
| Page | Mobile perf / a11y / BP | Desktop perf / a11y / BP |
|---|---|---|
| — | — | — |

## Decisions made during the build
Agents append one line per choice the docs didn't cover (newest last). If it changes a doc, update the doc too.
- {{YYYY-MM-DD}} — Planning: see `AGENTS.md` "Key decisions".

## Session log
Newest at the bottom. One entry per task. Keep entries short.

```
### YYYY-MM-DD HH:MM — <agent> — <task ID>
Did: …
Tests: typecheck ✅ lint ✅ unit ✅ int ✅ e2e ✅ (N passed) build ✅
Commits: …
Problems / surprises: …
Next: …
```

### {{YYYY-MM-DD}} — Claude (planning) — planning
Did: wrote `AGENTS.md`, `CLAUDE.md`, all docs in `.agent/`, and the UI design in `.agent/design/`.
Next: Antigravity runs V0 Preflight.

# Full-Stack Planning Reference

When `plan-project` routes to this file, follow these steps sequentially.

> **This is a thin orchestration layer.** It runs the frontend and backend planning references in sequence, then adds integration-specific concerns that only exist when both halves live in the same project.

**Planning deliverables get saved to three files:**
- `docs/frontend-plan.md` — from the frontend planning reference
- `docs/backend-plan.md` — from the backend planning reference
- `docs/integration.md` — cross-cutting concerns (created in this reference)

---

## Step 1: Run Frontend Planning

Read and execute `references/frontend-planning.md` Steps 1–5 (requirements interview through component inventory).

All deliverables get saved incrementally to `docs/frontend-plan.md` as described in that reference.

**Do NOT run frontend Step 6 (phase breakdown) yet** — the combined phase breakdown will be different for a full-stack project.

---

## Step 2: Run Backend Planning

Read and execute `references/backend-planning.md` Steps 1–3 (requirements interview through API contract).

All deliverables get saved incrementally to `docs/backend-plan.md` as described in that reference.

**Do NOT run backend Step 4 (vertical slices) yet** — we'll create a combined phase breakdown.

---

## Step 3: API Contract Alignment

This is the integration step that only exists in full-stack projects. Verify that the frontend's data needs (from the screen inventory and component props) **exactly match** what the backend's API endpoints return.

Create an alignment table:

| Frontend Component | Data It Needs | Backend Endpoint | Fields Returned | Gap? |
|--------------------|---------------|------------------|-----------------|------|
| MovieCard | title, poster_url, showtime | GET /api/movies | title, poster_url, showtime | ✅ None |
| SeatGrid | seat_number, status | GET /api/movies/:id/seats | seat_number, status | ✅ None |
| ProfileHeader | name, email, avatar | GET /api/auth/me | name, email | ⚠️ Missing: avatar |

For each gap, decide:
- Does the backend need a new field?
- Does the frontend need to derive it from existing data?
- Is it a nice-to-have that can be deferred?

**Present the alignment table to the user. Save as the "API Alignment" section in `docs/integration.md`. Wait for approval before proceeding.**

---

## Step 4: Cross-Cutting Concerns

Document these integration-specific decisions and save each to `docs/integration.md`:

### Authentication Handshake Flow
Map how auth tokens flow between frontend and backend:

```
Frontend                              Backend
   │                                     │
   ├── Google Sign-In popup ──────────►  │
   │                                     │
   │  ◄── POST /api/auth/google ────────┤
   │      (sends Google credential)      │
   │                                     ├── Verify with Google
   │                                     ├── Find/create user in DB
   │  ◄── Response: { token: JWT } ─────┤
   │                                     │
   ├── Store JWT (localStorage/cookie)   │
   │                                     │
   ├── All future requests ────────────► │
   │   Authorization: Bearer <JWT>       ├── Middleware: verify JWT
   │                                     ├── Attach req.user
   │  ◄── Protected resource ───────────┤
```

### Shared Type Contracts
If using TypeScript, define shared interfaces. If JavaScript, document the expected shapes:

```javascript
// Shared contract: Movie object shape
// Frontend expects this from GET /api/movies
// Backend must return this exact shape
{
  id: "uuid",
  title: "string",
  poster_url: "string",
  showtime: "ISO 8601 timestamp"
}
```

### Error Contract
Agree on how errors are communicated:
- What HTTP status codes does the backend use for each error type?
- What JSON shape do errors have? (e.g., `{ success: false, message: "...", errors: [] }`)
- How does the frontend display each error type? (toast, inline, redirect)

### CORS & Environment Configuration
- In development: frontend runs on `:5173`, backend on `:5000` — CORS must allow the frontend origin
- In production: are they on the same domain (reverse proxy) or separate domains?
- Environment variables: which are shared, which are frontend-only, which are backend-only?

**Present to the user. Save all cross-cutting concerns to `docs/integration.md`. Wait for approval before proceeding.**

---

## Step 5: Combined Phase Breakdown

For a full-stack project, the phases interleave frontend and backend work:

### Recommended Phase Sequence:

1. **Infrastructure & Database** — Docker setup, database migrations, server skeleton, logging framework. *(Backend-first because the frontend needs API endpoints to connect to)*

2. **Backend Core Modules** — Auth, core business logic, integrations. Each module is a vertical slice (migration → service → controller → tests). Follow `backend-standards`.

3. **Frontend Foundation** — Project scaffold, routing, API service layer, auth context. Connect to the backend auth endpoint as the first integration test.

4. **Frontend Design System** — Visual design decisions via `frontend-design` skill (palette, fonts, tokens, component showcase).

5. **Frontend Screens & Integration** — Build screens with real API data. Follow `frontend-implementation` standards (4-stage assembly, 4-state async machines).

6. **End-to-End Polish** — Responsive design, error boundaries, loading states, cross-browser testing, full user flow walkthrough.

7. **DevOps & Deployment** — CI/CD pipeline, Docker production builds, hosting configuration.

**Present the proposed phases to the user. These phases become the checklist items in `project_tracker.md`. Wait for approval.**

---

## Step 6: Implementation Standards Bridge

Before handing off to doc-generation (Step 3 in the router), inform the user:

> Your full-stack planning blueprint is complete and saved across three documents:
> - `docs/frontend-plan.md` — Screen inventory, sitemap, user flows, wireframes
> - `docs/backend-plan.md` — Data models, API contracts
> - `docs/integration.md` — Auth handshake, shared types, error contract, CORS
>
> Three skills guide implementation:
> 1. **`backend-standards`** — Enforces fail-fast DB, Pino logging, ApiError/ApiResponse, asyncHandler, parameterized SQL, AAA testing.
> 2. **`frontend-design`** — Visual direction: color palette, font pairing, semantic design tokens, component showcase. Use BEFORE coding screens.
> 3. **`frontend-implementation`** — 4-stage page assembly, 4-state async machines, token linting. Use WHILE coding screens.

**Return to the router SKILL.md to execute the shared doc-generation step.**

# Backend Planning Reference

When `plan-project` routes to this file, follow these steps sequentially.
Complete each step, explain the reasoning to the user, and wait for confirmation before proceeding.

**All planning deliverables from this reference get saved to `docs/backend-plan.md`.**
Build the document incrementally — after each step is approved, append that section to the file.

---

## Step 1: Requirements Interview (Backend-Specific)

Ask concise questions to pin down the scope:

1. **Core Problem:** What does this API/service do? Who consumes it? (browser app, mobile app, other services, cron scheduler)
2. **Domain Entities:** What are the 3–5 main "things" the system manages? (e.g., users, movies, bookings, payments)
3. **Critical Business Rules:** Any operations that must be atomic, ordered, or protected from concurrent access? (e.g., seat reservation, payment processing, inventory decrement)
4. **External Integrations:** Does the system talk to 3rd-party services? (OAuth providers, email/SMS APIs, payment gateways, cloud storage)
5. **Auth Model:** How are users authenticated? (JWT, session cookies, API keys, OAuth 2.0)
6. **Tech Stack Constraints:** Any pre-decided technologies? (Node.js/Express, Python/FastAPI, PostgreSQL, MongoDB, Docker)

**Wait for user to answer. Save answers as the "Requirements" section in `docs/backend-plan.md`.**

---

## Step 2: Data Model Design

Based on the requirements, design the database schema:

1. **Entity List:** Name each table/collection and its purpose in one line.
2. **Column/Field Definitions:** For each entity, define:
   - Field name, data type, constraints (PK, FK, UNIQUE, NOT NULL)
   - Enum values for status fields (e.g., `'AVAILABLE' | 'RESERVED' | 'BOOKED'`)
3. **Relationship Map:** Draw a Markdown table or text diagram showing:
   - Which entities reference which (foreign keys)
   - Cardinality (one-to-one, one-to-many, many-to-many)
4. **Indexes:** Note any fields that will be frequently queried or filtered.

**Present to the user. Save as the "Data Models" section in `docs/backend-plan.md`. Wait for approval before proceeding.**

---

## Step 3: API Contract Table

Define every endpoint the backend will expose:

| Method | Endpoint | Purpose | Auth Required | Request Body | Response Shape |
|--------|----------|---------|---------------|--------------|----------------|
| GET | /health | Liveness probe | No | — | `{ status: 'ok' }` |
| GET | /api/movies | List all movies | No | — | `{ data: Movie[] }` |
| POST | /api/bookings/initiate | Reserve a seat | Yes (JWT) | `{ seatId }` | `{ bookingId, expiresAt }` |

Guidelines:
- Group endpoints by domain (Auth, Movies, Bookings, Admin, etc.)
- Note which endpoints involve database transactions or row locks
- Note which endpoints trigger side effects (emails, webhooks, background jobs)
- Specify HTTP status codes for success AND error cases

**Present to the user. Save as the "API Contract" section in `docs/backend-plan.md`. Wait for approval before proceeding.**

---

## Step 4: Break into Vertical Slices

Divide the backend into **4–7 independent phases/modules**. Each phase is a complete **Vertical Slice**:

A vertical slice means: for each feature module, you implement EVERYTHING top-to-bottom before moving to the next module:

```
Database Migration for this feature
        ↓
Request Validation & Middlewares
        ↓
Service Layer (Business Logic, Transactions)
        ↓
Controller & Router
        ↓
Automated Tests (Jest/Supertest — verified green before moving on)
```

### How to sequence the phases:

1. **Infrastructure first** — Database setup, server skeleton, logging, error handling framework. This is the foundation everything else sits on.
2. **Independent modules next** — Modules with no dependencies on other modules come first (e.g., Auth before Bookings, because Bookings needs an authenticated user).
3. **Dependent modules after** — Modules that require earlier modules to exist (e.g., Booking Verification depends on Booking Initiation).
4. **Integrations & background jobs last** — External service calls, cron jobs, webhooks. These are hardest to test and most fragile.
5. **DevOps at the end** — CI/CD, Docker production builds, deployment. Ship after the application logic is solid.

**Present the proposed phases to the user. Save as the "Phase Breakdown" section in `docs/backend-plan.md`. These phases become the checklist items in `project_tracker.md`. Wait for approval.**

---

## Step 5: Implementation Standards Bridge

Before handing off to doc-generation (Step 3 in the router), inform the user:

> Your backend planning blueprint is complete and saved in `docs/backend-plan.md`. When you start coding each vertical slice, the `backend-standards` skill enforces these industry patterns:
> - **Fail-fast DB startup** (verify connection before `app.listen`)
> - **Pino structured logging** (no `console.log` in production)
> - **ApiError / ApiResponse classes** (consistent JSON response shape)
> - **asyncHandler** (eliminate repetitive try/catch in controllers)
> - **Parameterized SQL** (prevent injection)
> - **AAA test pattern** (Arrange, Act, Assert)

**Return to the router SKILL.md to execute the shared doc-generation step.**

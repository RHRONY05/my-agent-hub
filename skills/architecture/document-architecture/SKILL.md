---
name: document-architecture
description: Analyzes backend codebase, detects critical & complex API endpoints, and automatically generates developer lifecycle diagrams, client user flows, and a complete API contract dictionary.
---

# Architecture & API Documentation Workflow

When the user triggers this skill (e.g. by asking to document architecture or typing `/document-architecture`), execute the following systematic procedure:

---

## Step 1: Scan & Analyze the Backend Codebase

Inspect all backend files across these folders:
- **Routes & Middlewares:** (e.g. `src/routes/`, `src/middlewares/`)
- **Controllers & Services:** (e.g. `src/controllers/`, `src/services/`)
- **Database & Migrations:** (e.g. `src/config/`, `migrations/`, models)
- **Background Tasks:** (e.g. `src/utils/cronJobs.js`, worker queues)

### Filter Criteria for "Complex / Critical" Endpoints:
Identify routes that meet any of these conditions:
1. Uses database transactions (`BEGIN ... COMMIT / ROLLBACK`)
2. Uses row-level or concurrency locks (`FOR UPDATE`, optimistic locking)
3. Interacts with third-party external services (OAuth, Stripe, Brevo, AWS S3)
4. Multi-step state changes or time-based expirations (OTP, reservations)

*(Do NOT draw deep lifecycle diagrams for simple single-query CRUD endpoints like `/health` or `GET /item/:id`)*.

---

## Step 2: Generate the Documentation in `docs/`

Write or overwrite two standardized files in the `docs/` directory:

### File 1: `docs/ARCHITECTURE.md` (System Design & Visual Flows)
Contains:
1. **Developer Technical Lifecycle Diagram:** End-to-end ASCII/Mermaid sequence diagram tracing:
   `Client ──► Middlewares (CORS, Body Parser, Logging) ──► Auth Guards ──► Controller ──► DB Transactions / 3rd Party APIs ──► Response Capture ──► Client`
2. **Client & Stakeholder User Journey:** High-level customer journey diagram (zero code/SQL/tech jargon).
3. **Database Entity Relationship (ER) Diagram:** Visual diagram of tables, PKs, FKs, and relationship cardinalities (1:1, 1:N).

### File 2: `docs/API_REFERENCE.md` (API Contracts & Dictionary)
Contains:
1. **Summary Endpoint Matrix:** Table of Method, Path, Auth Required, Purpose.
2. **Detailed Contracts:** Required headers, request body JSON, success response (200/201), and all error codes & JSON (400, 401, 404, 409, 500).
3. **Background Workers Table:** Schedule, actions, and file locations for cron jobs / queue workers.

---

## Step 3: Present Summary to User

- Provide a clickable link to the generated document.
- Highlight the complex endpoints that were diagrammed and invite the user to review.

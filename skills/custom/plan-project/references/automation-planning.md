# Automation Planning Reference

When `plan-project` routes to this file, follow these steps sequentially.
Complete each step, explain the reasoning to the user, and wait for confirmation before proceeding.

> **What counts as "automation"?**
> Any system whose primary job is to **react to events and execute a chain of steps** rather than serve a UI or respond to HTTP requests from users. Examples: CI/CD pipelines, scheduled data sync jobs, webhook-driven workflows, chatbot command handlers, email processors, ETL pipelines, notification dispatchers.

**All planning deliverables from this reference get saved to `docs/automation.md`.**
Build the document incrementally — after each step is approved, append that section to the file.

---

## Step 1: Requirements Interview (Automation-Specific)

Ask concise questions to pin down the scope:

1. **What triggers this automation?** Identify the trigger type:
   - **Schedule/Cron** — runs at fixed intervals (e.g., "every 5 minutes", "daily at 2 AM")
   - **Webhook** — triggered by an external service hitting an endpoint (e.g., GitHub push event, Stripe payment confirmation)
   - **Event** — triggered by an internal system event (e.g., new database row, file uploaded to storage, message on a queue)
   - **Manual** — triggered by a human action (e.g., CLI command, button click in admin panel)

2. **What does it do?** Describe the end-to-end transformation in plain language. (e.g., "When a user's booking expires, release the seat and send a notification email")

3. **What external services does it touch?** List every API, database, queue, or storage system involved.

4. **What happens when it fails?** Should it retry? Alert someone? Log and skip? Roll back?

5. **How often does it run / how much data does it process?** (Affects whether you need a simple script, a queue-based worker, or a distributed pipeline)

6. **Does it need to be idempotent?** If the same event is delivered twice, should it produce the same result without side effects? (Almost always: yes)

**Wait for user to answer. Save answers as the "Requirements" section in `docs/automation.md`.**

---

## Step 2: Node Flow Diagram

Map the automation as a **step-by-step node flow tree**. Each node is one discrete operation. Use the same Markdown tree style as navigation sitemap trees — this makes complex pipelines scannable.

### Example: "Abandoned Seat Cleanup" Cron Job

```
⏰ TRIGGER: Cron every 2 minutes
│
├── 1. Query DB: SELECT bookings WHERE status='PENDING_OTP' AND created_at < (now - 5 min)
│   │
│   ├── 0 results → EXIT (nothing to clean)
│   │
│   └── N results → for each expired booking:
│       │
│       ├── 2. BEGIN transaction
│       │   ├── UPDATE seat SET status='AVAILABLE' WHERE id = booking.seat_id
│       │   ├── UPDATE booking SET status='FAILED'
│       │   └── COMMIT
│       │
│       ├── 3. Log: "Released seat {seat_number} for booking {booking_id}"
│       │
│       └── 4. (Optional) Send notification to user: "Your reservation expired"
│
└── END
```

### Example: "GitHub Push → Auto-Deploy" Webhook

```
🔔 TRIGGER: POST /webhooks/github (push event on main branch)
│
├── 1. Verify webhook signature (HMAC-SHA256 with secret)
│   ├── INVALID → 401 Unauthorized, log warning, EXIT
│   └── VALID → continue
│
├── 2. Parse payload: extract branch, commit SHA, author
│   ├── Branch ≠ main → 200 OK "Ignored", EXIT
│   └── Branch = main → continue
│
├── 3. SSH into VPS → run deploy.sh
│   ├── SUCCESS → 200 OK "Deployed {sha}"
│   └── FAILURE → 500, alert admin via Slack/email
│
└── END
```

Create a node flow diagram for EACH automation in the project.

**Present to the user. Save as the "Node Flows" section in `docs/automation.md`. Wait for approval before proceeding.**

---

## Step 3: Data Shape at Each Step

For each node in the flow, document the **shape of data** entering and leaving that step. This prevents the #1 automation bug: passing the wrong data shape between steps.

| Step | Input Shape | Operation | Output Shape |
|------|-------------|-----------|--------------|
| 1. Query expired bookings | — | `SELECT id, seat_id, user_id FROM bookings WHERE ...` | `Array<{ id, seat_id, user_id }>` |
| 2. Release seat | `{ seat_id }` | `UPDATE seats SET status='AVAILABLE'` | `{ rowCount: 1 }` |
| 3. Fail booking | `{ booking_id }` | `UPDATE bookings SET status='FAILED'` | `{ rowCount: 1 }` |
| 4. Send notification | `{ user_id, seat_number }` | Email API call | `{ messageId }` or error |

**Present to the user. Save as the "Data Shapes" section in `docs/automation.md`. Wait for approval before proceeding.**

---

## Step 4: Error Handling & Retry Strategy

For each step in the flow, define what happens when it fails:

| Step | Failure Mode | Strategy | Max Retries | Fallback |
|------|-------------|----------|-------------|----------|
| DB query | Connection timeout | Retry with exponential backoff | 3 | Log fatal, alert admin |
| Update seat | Row lock contention | Retry immediately | 2 | Skip this booking, process next |
| Email send | API rate limit | Retry after 60s | 3 | Queue for later, don't block seat release |
| SSH deploy | Connection refused | No retry | 0 | Alert admin, manual deploy |

Key decisions to document:
- **Partial failure:** If step 2 succeeds but step 4 fails, is the overall operation still considered successful? (Usually yes — seat release is critical, notification is best-effort)
- **Idempotency guards:** How do you prevent double-processing if the trigger fires twice? (e.g., check booking status before updating, use a processed_at timestamp)
- **Dead letter queue:** For events that fail all retries, where do they go? (log table, error queue, alert channel)

**Present to the user. Save as the "Error Handling" section in `docs/automation.md`. Wait for approval before proceeding.**

---

## Step 5: External Service Dependency Map

List every external system the automation depends on, with auth method and failure impact:

| Service | Purpose | Auth Method | Failure Impact | Timeout |
|---------|---------|-------------|----------------|---------|
| PostgreSQL | Read/write bookings, seats | Connection string (env var) | **Fatal** — automation cannot run | 5s |
| Brevo API | Send notification emails | API key (env var) | **Non-fatal** — seat still released, email skipped | 10s |
| GitHub Webhooks | Trigger deploy | HMAC signature (shared secret) | **Blocking** — no deploys until fixed | N/A |
| VPS SSH | Execute deploy script | SSH key (private key file) | **Blocking** — deploy fails | 30s |

**Present to the user. Save as the "Service Dependencies" section in `docs/automation.md`. Wait for approval before proceeding.**

---

## Step 6: Automation Phase Breakdown

Organize implementation into phases:

### Recommended Phase Sequence:

1. **Infrastructure** — Runtime environment setup (Node.js script, Docker container, serverless function, cron daemon). Database schema/migrations if needed.

2. **Core Pipeline (Happy Path)** — Implement the node flow from Step 2 assuming everything succeeds. No error handling yet — just get the data flowing end-to-end.

3. **Error Handling & Resilience** — Add try/catch blocks, retry logic, fallbacks, and dead letter handling from Step 4.

4. **Idempotency & Guards** — Add duplicate detection, status checks before mutations, and processed_at timestamps.

5. **Observability** — Structured logging at each node (what was processed, how long it took, what failed). Alerting for fatal failures.

6. **Testing** — Unit test each step in isolation (mock external services). Integration test the full pipeline with a test database.

7. **Deployment & Scheduling** — Register the cron job, deploy the webhook endpoint, configure the event listener. Set up monitoring.

**Present the proposed phases to the user. Save as the "Phase Breakdown" section in `docs/automation.md`. These phases become the checklist items in `project_tracker.md`. Wait for approval.**

---

## Step 7: Implementation Standards Bridge

Before handing off to doc-generation (Step 3 in the router), inform the user:

> Your automation planning blueprint is complete and saved in `docs/automation.md`. Implementation standards depend on the runtime:
>
> - **Node.js runtime** → Follow `backend-standards` skill (Pino logging, asyncHandler, fail-fast DB).
> - **Browser/frontend runtime** → Follow `frontend-implementation` skill.
> - **Shell scripts** → Use `set -euo pipefail`, log with timestamps, handle signals (`trap`).

**Return to the router SKILL.md to execute the shared doc-generation step.**

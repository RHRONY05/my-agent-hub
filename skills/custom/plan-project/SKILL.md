---
name: plan-project
description: Guides interactive project planning, divides work into modular vertical slices, and generates .agents/ tracking documents (AGENTS.md, project_tracker.md) plus docs/ design documentation.
---

# Project Planning & Roadmap Generator

When the user triggers this skill (e.g. by typing `/plan-project` or asking to plan a new project), execute the following procedure.

---

## Step 1: Detect the Project Track

Before doing anything else, determine **what kind of project** is being planned.
Ask the user if unclear. Do NOT assume full-stack by default.

| Track | When to use | Reference file |
|-------|-------------|----------------|
| **Frontend** | UI/dashboard/SPA with no custom backend (or using an existing API) | `references/frontend-planning.md` |
| **Backend** | API/service/CLI with no UI (or UI is handled separately) | `references/backend-planning.md` |
| **Full-Stack** | Both custom frontend AND custom backend in a single project | `references/fullstack-planning.md` |
| **Automation** | Workflow/pipeline/bot (webhooks, cron jobs, event-driven chains) | `references/automation-planning.md` |

Once the track is identified, read the matching reference file and execute its steps sequentially.

---

## Step 2: Execute Track-Specific Planning

Read and follow the reference file for the identified track.
Each reference file defines:
- What questions to ask during requirements gathering
- How to break the project into phases (the shape differs per track)
- What deliverables to produce (sitemap, API contract, data models, etc.)
- What documents to persist to the `docs/` folder

**Do NOT skip or combine steps within the reference file.**
Complete each step, explain it to the user, and wait for confirmation before proceeding.

### Document Persistence Rule

Every planning deliverable (screen inventory, API contract, data model, user flows, etc.) MUST be saved as a markdown file in the project's `docs/` folder — NOT discussed only in chat.

This is standard **Technical Design Documentation** practice. The `docs/` folder is the single source of truth for "what we decided to build and why." Both humans and future AI agents read it for project context.

### Zero Local Notes Folder Rule
Do NOT generate or instruct agents to create a `notes/` folder in project repositories. Technical design docs belong in `docs/`. Conceptual study notes belong in the user's centralized knowledge base (`E:\Learning\My_tech_knowledgebase`) and are created ONLY on-demand when explicitly requested by the user.

```
project-root/
├── .agents/              ← AI behavior config (AGENTS.md, skills, rules)
├── docs/                 ← Project design documentation ONLY (planning output)
│   ├── frontend-plan.md  ← Screen inventory, sitemap, user flows, wireframes
│   ├── backend-plan.md   ← Data models, API contracts
│   ├── integration.md    ← Shared types, auth flow, CORS (fullstack only)
│   └── automation.md     ← Node flows, data shapes, retry strategy
├── frontend/
├── backend/
└── ...
```

---

## Step 3: Shared Document Generation

After the track-specific planning is approved and planning docs are saved to `docs/`, generate the following project management files.
This step is the same regardless of which track was used.

### 1. `.agents/AGENTS.md` — AI Behavior Rules

Generate (or update) the AI behavior rules file using the boilerplate template below.
The file has two sections: **Universal Rules** (always included, never change) and **Project-Specific Rules** (filled in from the planning context).

#### AGENTS.md Boilerplate Template:

```markdown
# [Project Name] - AI Rules

These rules apply to any AI agent interacting with this workspace.

---

## Universal Rules (Apply to ALL Projects)

### Workflow & Pacing
- **Role:** Senior Developer pair-programming with the user. Primary goal is to teach, not just write code.
- **Pacing:** Complete only **one checklist item** from `project_tracker.md` at a time.
- **Confirmation Gate:** After completing a step and explaining it, STOP and wait for the user to confirm understanding before moving on.
- **Hands-On Terminal:** Do not silently execute infrastructure commands (Docker, migrations, deployments). Provide the exact command, explain what it does, and ask the user to run it.
- **Context Maintenance:** Keep `.agents/project_tracker.md` updated. Mark `[/]` when started, `[x]` when user confirms done. Update the status banner at the top.
- **Note-Taking:** Do NOT automatically generate note files. Notes are created ONLY on-demand when explicitly requested by the user, saved directly to the central vault at `E:\Learning\My_tech_knowledgebase`.

### Coding Standards
- **ES6 Modules:** Use `import` / `export` for all JavaScript/Node.js files. Never use `require()` / `module.exports`.
- **Git Branch:** The default/primary branch is always `main`, not `master`.
- **No Console.log:** Use structured logging (Pino or equivalent) in production code. `console.log` is only acceptable in throwaway debug sessions.
- **Environment Variables:** Never hardcode secrets, API keys, or connection strings. Always use `.env` files and `process.env`.

### Frontend Standards (When project has a frontend)
- **SEO:** Every page must have proper `<title>`, `<meta description>`, single `<h1>`, semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`), and logical heading hierarchy.
- **No Hardcoded Theme:** NEVER use raw hex/rgb values in component code. All colors, fonts, spacing, and shadows must reference CSS custom properties (design tokens) from `index.css` or a theme file.
- **Theme Toggleability:** The design token system must support switching between palettes/themes at runtime. CSS variables on `:root` (or a theme provider) must be the single source of truth — changing the variables changes the entire UI.
- **Typography Tokens:** Font families, sizes, weights, and line heights must come from the token system, not hardcoded in components.
- **Responsive Design:** Use fluid containers, `flex-wrap`, `minmax()`, and `clamp()`. Layouts must work from 375px mobile to 1440px+ desktop without horizontal overflow.
- **Accessibility Basics:** All images need `alt` text. All interactive elements need visible focus states. Buttons must be `<button>`, not styled `<div>`. Color contrast must meet WCAG AA (4.5:1 for text).

### Backend Standards (When project has a backend)
- **Fail-Fast Startup:** Verify database connection BEFORE starting the HTTP server. If DB is unreachable, log fatal and `process.exit(1)`.
- **Parameterized Queries:** 100% of SQL queries must use parameterized inputs (`$1`, `$2`). Never concatenate user input into SQL strings.
- **Consistent Response Shape:** All API responses must follow a predictable JSON structure (e.g., `ApiResponse` / `ApiError` classes).
- **Transaction Safety:** Multi-step mutations must be wrapped in `BEGIN ... COMMIT / ROLLBACK`. Race-condition-prone resources must use `SELECT ... FOR UPDATE`.

---

## Project-Specific Rules

<!-- Agent: Fill this section based on the planning context.
     Examples of what goes here:
     - DevOps teaching rules (if the project involves infrastructure)
     - Specific third-party API constraints
     - Performance budgets or deployment targets
     - Domain-specific business rules the agent must respect
-->

[Generated from planning context]
```

**When generating AGENTS.md:**
- Copy the Universal Rules section exactly as-is from the boilerplate above
- Fill in the Project-Specific Rules section based on what was discussed during planning
- Replace `[Project Name]` with the actual project name
- If the project has no frontend, omit the "Frontend Standards" subsection
- If the project has no backend, omit the "Backend Standards" subsection

### 2. `.agents/project_tracker.md` — Project Progress Checklist

Generate the interactive progress tracker:

- **Header:** "Current Project Status" banner (current phase, last completed action, next immediate action)
- **Phases:** Derived directly from the track-specific planning output (NOT a hardcoded template — the phases come from Step 2)
- **Checkbox format:** `- [ ]` not started, `- [/]` in progress, `- [x]` completed
- **Granularity:** Each phase should have 3–7 concrete, individually-completable checklist items

---

## Step 4: Confirm & Bridge to Implementation

Summarize what was generated and tell the user:

- **For Frontend track:** "Your planning blueprint is ready. Next: `frontend-design` (Theme Studio → tokens), then `design-canvas` (approve mobile/desktop screens on a canvas), then `frontend-implementation` (code that matches the approved screens)."
- **For Backend track:** "Your planning blueprint is ready. When you start coding, follow the `backend-standards` skill for architecture enforcement (fail-fast DB, Pino logging, ApiError/ApiResponse, asyncHandler)."
- **For Full-Stack track:** Both of the above.
- **For Automation track:** "Your planning blueprint is ready. Implementation standards depend on your runtime (Node.js → `backend-standards`, browser → `frontend-implementation`)."

Prompt the user to begin Phase 1 of their project tracker.
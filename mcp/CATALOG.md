# MCP Server Catalog

This catalog documents the Model Context Protocol (MCP) servers configured on this machine, their tool counts, credentials required, and workflows they enable.

---

## Quick Reference Table

| Server Name | Package / Command | Tool Count | Transport | Key Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **supabase** | @supabase/mcp-server-supabase | 29 | Stdio / npx | Database management, RLS, migrations, SQL, types |
| **ercel** | ercel-mcp-pro | 70 | Stdio / npx | Deployments, project config, env vars, runtime logs |
| **github-mcp-server** | ghcr.io/github/github-mcp-server | 42 | Docker | PR reviews, issues, code search, repository APIs |
| **chrome-devtools** | chrome-devtools-mcp | 30 | Stdio / npx | Live browser automation, DOM inspection, network logs |
| **shadcn** | shadcn@latest mcp | 7 | Stdio / npx | Browse, search, and add shadcn/ui components |
| **magicui** | @magicuidesign/mcp@latest | 3 | Stdio / npx | Browse & install animated MagicUI primitives |
| **ceternity** | ceternityui-mcp | 5 | Stdio / npx | Inspect & fetch Aceternity UI component code |
| **uiverse** | github:Fabi-SPL/uiverse-mcp | 7 | Stdio / npx | Community UI elements (buttons, cards, loaders) |
| **StitchMCP** | mcp-remote + Stitch API | 15 | Remote / HTTP | Google Stitch UI generation & design systems |
| **magic-mcp** | @21st-dev/magic@latest | 51 | Stdio / npx | 21st.dev AI component generation (optional) |

---

## Detailed Server Profiles

### 1. supabase (Supabase Management Platform)
* **Package:** @supabase/mcp-server-supabase@latest
* **Authentication:** SUPABASE_ACCESS_TOKEN (Personal Access Token)
* **What it does:** Allows AI agents to interact with your Supabase account without leaving the editor.
* **Key Tools:**
  * execute_sql: Run arbitrary SQL queries and tests.
  * pply_migration / list_migrations: Manage versioned SQL migrations.
  * generate_typescript_types: Auto-generate strict TypeScript types from your schema.
  * get_advisors: Run database security and performance audits.
  * list_tables / list_projects: Discover schema and project structure.
* **When to enable:** Whenever working on backend data, Postgres schemas, auth, or Edge Functions.

### 2. ercel (Vercel Cloud Platform)
* **Package:** ercel-mcp-pro
* **Authentication:** VERCEL_TOKEN (Access Token)
* **What it does:** Complete control over deployments, environments, custom domains, and logs.
* **Key Tools:**
  * list_deployments / get_deployment: Inspect build state and deployment URLs.
  * get_runtime_logs: Read live server logs for debugging edge and serverless functions.
  * list_env_vars / create_env_var: Programmatically sync environment variables.
  * list_projects / get_project: Inspect project configuration.
* **When to enable:** Full-stack and Next.js applications hosted on Vercel.

### 3. github-mcp-server (GitHub Integration)
* **Package:** ghcr.io/github/github-mcp-server (Docker)
* **Authentication:** GITHUB_PERSONAL_ACCESS_TOKEN
* **What it does:** Interacts with GitHub repositories, pull requests, issues, and code search.
* **Key Tools:**
  * list_pull_requests / create_pull_request: Manage PR workflows.
  * dd_issue_comment / dd_comment_to_pending_review: Collaborative code review.
  * search_code: Search across GitHub codebases.
* **When to enable:** Collaborating on open source, GitHub issue tracking, and automated PR generation.

### 4. chrome-devtools (Browser Automation & Debugging)
* **Package:** chrome-devtools-mcp@latest
* **Authentication:** None required (local browser session)
* **What it does:** Gives agents a live browser session to test websites, inspect accessibility, and capture screenshots.
* **Key Tools:**
  * 
avigate_page / click / ill_form: Automated UI interaction.
  * 	ake_screenshot / 	ake_snapshot: Visual inspection.
  * list_console_messages / list_network_requests: Debugging front-end runtime errors.
* **When to enable:** End-to-end testing, visual UI review, responsive debugging.

### 5. UI Design Servers (shadcn, magicui, ceternity, uiverse)
* **Packages:** Official MCP clients for component libraries.
* **Authentication:** Free / public registries.
* **What they do:** Allow coding agents to query available buttons, cards, animations, and inputs directly from registries and insert clean code without hallucinations.
* **When to enable:** Scaffolding web applications and building modern user interfaces.

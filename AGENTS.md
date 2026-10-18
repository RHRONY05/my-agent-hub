# AGENTS.md: Personal AI Agent Hub Context & Operational Guide

> **System Context for AI Coding Agents**:  
> This file is the primary context and operating manual for any AI assistant (Google Antigravity, Claude Code) working inside this repository (`d:\Projects\my-agent-hub`)/ `https://github.com/RHRONY05/my-agent-hub`.

---

## 1. Project Purpose & Architecture

This repository is the developer's **Personal AI Agent Dotfiles & Command Center**. It centralizes, synchronizes, and version-controls tools, skills, and configurations across the machine's two active coding environments:

- **Primary IDE**: **Google Antigravity** (`C:\Users\Asus\.gemini\config\`)
- **Secondary CLI**: **Claude Code** (`C:\Users\Asus\.claude.json` & `C:\Users\Asus\.claude\skills\`)

### Core Responsibilities of This Repository:
1. **MCP Configuration**: Reconciles and synchronizes 11 active MCP servers (200+ tools) between Antigravity and Claude Code.
2. **Domain-Layered Skills**: Houses and version-controls 12 handwritten custom skills organized by domain layer (`backend`, `architecture`, `frontend`, `ui-ux-design`, `workflow`).
3. **Automated Cross-Linking**: Maintains zero-copy Windows NTFS Directory Junctions into agent skill folders.
4. **Secret Sanitization**: Commits only sanitized templates (`mcp_config.template.json`) with `${VAR}` placeholders, keeping real credentials locally in `.env`.

---

## 2. Repository Directory Map

```text
my-agent-hub/
├── AGENTS.md                      # This file: Canonical project instructions & agent manual
├── README.md                      # Personal dashboard & setup reference (First-Person POV)
├── package.json                   # NPM shortcuts (npm run sync, npm run backup-skills)
├── .env.example                   # Token template (SUPABASE_ACCESS_TOKEN, VERCEL_TOKEN, GITHUB_TOKEN)
├── .gitignore                     # Ignores .env, *.bak, node_modules, etc.
│
├── scripts/
│   ├── sync-agents.js             # 2-way sync engine (Antigravity ↔ Claude Code MCP & junctions)
│   └── backup-skills.js           # SHA-256 diff engine pulling skill modifications into Git
│
├── mcp/
│   ├── mcp_config.template.json   # Sanitized master template with ${VAR} placeholders
│   └── CATALOG.md                 # Full breakdown of all 11 MCP servers, tools, and usage
│
├── skills/
│   ├── CATALOG.md                 # Index of all system skills and custom domain mappings
│   ├── backend/                   # backend-standards
│   ├── architecture/              # db-docs, document-architecture, plan-project, plan-for-agent-build
│   ├── frontend/                  # frontend-design, frontend-implementation, performance-audit
│   ├── ui-ux-design/              # design-canvas, domain-asset-discovery, ui-styling, ui-ux-pro-max
│   └── workflow/                  # generate-qa-review, handoff
│
├── plugins/
│   └── CATALOG.md                 # Catalog of installed plugins (gemini-api, chrome-devtools, etc.)
│
└── docs/
    └── AGENT_SYNC.md              # Deep-dive on NTFS junctions and recovery
```

---

## 3. Machine State & Local Paths

This workstation runs **Windows 11**. Key paths:

| Environment | Config Path | Skills Path |
| :--- | :--- | :--- |
| **Google Antigravity** | `C:\Users\Asus\.gemini\config\mcp_config.json` | `C:\Users\Asus\.gemini\config\skills\` |
| **Claude Code** | `C:\Users\Asus\.claude.json` | `C:\Users\Asus\.claude\skills\` |
| **My Agent Hub** | `d:\Projects\my-agent-hub\mcp\` | `d:\Projects\my-agent-hub\skills\` |

### Active MCP Servers (11 Total):
`supabase`, `vercel`, `github-mcp-server` (Docker), `chrome-devtools`, `shadcn`, `magicui`, `aceternity`, `uiverse`, `StitchMCP`, `Sanity`, and `magic-mcp`.

---

## 4. Standard Operational Commands

When modifying or maintaining this repository, use the following commands:

* **Synchronize MCP Servers & Skills Across Agents**:
  ```powershell
  npm run sync
  # Or: node scripts/sync-agents.js
  ```
* **Pull Live Skill Modifications from Antigravity into Git**:
  ```powershell
  npm run backup-skills
  # Or: node scripts/backup-skills.js
  ```
* **Verify Claude Code Tool Connectivity**:
  ```powershell
  claude mcp list
  ```

---

## 5. Non-Negotiable Invariants for AI Agents

1. **Zero Secret Leaks**:
   * NEVER commit `.env`, live API tokens (`sbp_...`, `vcp_...`, `ghp_...`), or un-sanitized config files.
   * Only update `mcp/mcp_config.template.json` when adding or editing MCP servers.
2. **Domain-Layered Skill Discipline**:
   * All custom skills MUST reside inside a domain subfolder under `skills/<domain>/<skill-name>/` containing a `SKILL.md` with valid YAML frontmatter (`name`, `description`).
   * Never re-introduce a generic `skills/custom/` wrapper.
3. **Windows PowerShell Rules**:
   * Operating system is Windows. Shell is PowerShell.
   * **NEVER run `cd` commands** (always specify working directory via tool parameters).
   * Do NOT use Bash `&&` command chaining in PowerShell; use semicolon `;` or separate commands.
4. **First-Person POV**:
   * User-facing documentation (`README.md`, personal notes) must be written from the user's first-person perspective (*"my setup"*, *"how I work"*), not as a generic tutorial for others.

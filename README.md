# 🤖 My Agent Hub

> **My Personal AI Agent Dotfiles & Command Center**  
> Unified Model Context Protocol (MCP) servers, domain skills, and custom workflows shared seamlessly between **Google Antigravity** and **Claude Code**.

---

## ⚡ What is This?

This repository is my personal command center and dotfiles for AI coding agents. Instead of fragmenting tool configurations, API keys, and custom skills across different locations, this hub acts as the single source of truth for my workflow:

- **Primary IDE**: **Google Antigravity** (`~/.gemini/config/`)
- **Secondary CLI**: **Claude Code** (`~/.claude.json` & `~/.claude/skills/`)
- **11 MCP Servers (200+ Tools)**: Reconciled and synced across both environments.
- **45+ Domain Skills**: Linked live via Windows NTFS Directory Junctions (zero duplicate files; edits reflect instantly across both agents).
- **Sanitized for Git**: All committed templates use `${VAR}` placeholders, keeping real tokens safely in my local `.env`.
- **1-Command Sync**: Running `npm run sync` (or `node scripts/sync-agents.js`) reconciles tools and links skills.

---

## 📁 Repository Structure

```text
my-agent-hub/
├── AGENTS.md                      # AI agent instructions & codebase memory
├── README.md                      # Personal dashboard & workflow reference
├── package.json                   # NPM shortcuts (npm run sync, npm run backup-skills)
├── .env.example                   # API token template (Supabase, Vercel, GitHub, etc.)
├── .gitignore                     # Ignores .env, *.bak, and sensitive files
│
├── scripts/
│   ├── sync-agents.js             # 2-way sync engine (Antigravity ↔ Claude Code)
│   └── backup-skills.js           # SHA-256 diff engine pulling skill modifications into Git
│
├── mcp/
│   ├── CATALOG.md                 # Breakdown of all 11 MCP servers & tools I use
│   └── mcp_config.template.json   # Sanitized master template with ${VAR} placeholders
│
├── skills/
│   ├── CATALOG.md                 # Categorized catalog of all skills
│   ├── backend/                   # Backend standards & scaffolding
│   ├── architecture/              # System diagrams & project planning
│   ├── frontend/                  # Frontend implementation & performance audits
│   ├── ui-ux-design/              # Design canvas, UI styling & UI-UX-Pro-Max
│   ├── workflow/                  # Active recall QA reviews & agent handoffs
│   └── learning/                  # codebase-tutor: learning codebases as guided courses
│
├── plugins/
│   └── CATALOG.md                 # Catalog of installed plugins (chrome-devtools, gemini-api, etc.)
│
└── docs/
    └── AGENT_SYNC.md              # Architecture, junction details & maintenance guide
```

---

## 💻 How I Set Up / Restore on My Machine

My reference steps whenever setting up a new Windows workstation or restoring my configuration:

1. **Clone this repository:**
   ```bash
   git clone <my-repo-url> d:\Projects\my-agent-hub
   cd d:\Projects\my-agent-hub
   ```

2. **Populate my local secrets:**
   ```bash
   copy .env.example .env
   # Add SUPABASE_ACCESS_TOKEN, VERCEL_TOKEN, GITHUB_TOKEN, etc.
   ```

3. **Run the sync script:**
   ```bash
   npm run sync
   # Or: node scripts/sync-agents.js
   ```

Both **Antigravity** and **Claude Code** are immediately configured with my full tool inventory and skills.

---

## 🔄 Weekly Routine: Backing Up Skills

Whenever skills are edited or improved during coding sessions, I run this to pull changes back into this repo:

```bash
npm run backup-skills
# Or: node scripts/backup-skills.js
```

- Compares live files in `~/.gemini/config/skills/` against `my-agent-hub/skills/<domain>/`.
- Safely copies updated or newly added files into this repo.
- Detects any new custom skills created in Antigravity so I can categorize them.
- Once done, run `git commit` to push updates to GitHub.

---

## 🛠️ My Agent Environments & Config Paths

| Agent | Config Target | Format | Role |
| :--- | :--- | :--- | :--- |
| **Google Antigravity** | `~/.gemini/config/mcp_config.json` | JSON | Primary IDE (`~/.gemini/config/skills/`) |
| **Claude Code** | `~/.claude.json` | JSON | Secondary CLI (`~/.claude/skills/`) |

---

## 📜 Catalogs & Notes

- [AGENTS.md](AGENTS.md) — Operational instructions and system context for AI agents working in this repo.
- [MCP Server Catalog](mcp/CATALOG.md) — Descriptions and tools for Supabase, Vercel, GitHub, DevTools, etc.
- [Skills Catalog](skills/CATALOG.md) — Index of UI/UX, Backend, Cloud, AI, and Safety runbooks.
- [Plugins Catalog](plugins/CATALOG.md) — Overview of modular multi-skill plugin bundles.
- [Architecture & Maintenance Guide](docs/AGENT_SYNC.md) — Details on junction mechanics and recovery.

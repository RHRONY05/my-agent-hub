# HANDOFF: Personal AI Agent Hub (my-agent-hub)

## 1. Mission & Goal
Dedicated, production-grade **Personal AI Agent Hub & Dotfiles** repository in this directory (`d:\Projects\my-agent-hub`) for version control on GitHub.

This repository serves as:
1. **The Machine's Master AI Hub**: A clean, focused system to synchronize MCP tools and skills across your two active coding agents:
   - **Google Antigravity** (Primary IDE)
   - **Claude Code** (Secondary CLI)
2. **Personal Tool & Skill Inventory**:
   - Curated directory of all 11 MCP servers (what each does, key tools, when to enable).
   - Inventory of all 45+ builtin and plugin skills.
   - Dedicated folder for handwritten custom skills (`skills/custom/`).
3. **Safe & Sanitized**:
   - Zero committed secrets (uses `.env` + template configs for public/private GitHub hosting).
   - Automated sync engine (`sync-agents.js`) that merges configurations safely and manages zero-copy NTFS directory junctions.

---

## 2. Machine State & Discovered Environment
The agent clients configured on this Windows machine:

| Client | Config Location | Format | Status |
| :--- | :--- | :--- | :--- |
| **Antigravity** | `~/.gemini/config/mcp_config.json` & `~/.gemini/config/skills/` | JSON | Primary IDE (11 servers, 45 skills) |
| **Claude Code** | `~/.claude.json` & `~/.claude/skills/` | JSON | CLI installed. Verified connected. |

### Connected MCP Servers (11 Total):
1. `supabase`: Official Supabase server (`@supabase/mcp-server-supabase`)
2. `vercel`: Full-platform Vercel server (`vercel-mcp-pro`)
3. `github-mcp-server`: Docker-based GitHub server
4. `chrome-devtools`: Chrome DevTools MCP (`chrome-devtools-mcp`)
5. `shadcn`: Shadcn component registry
6. `magicui`: MagicUI registry
7. `aceternity`: Aceternity UI registry
8. `uiverse`: Uiverse component library
9. `StitchMCP`: Google Stitch UI generator via mcp-remote
10. `Sanity`: Sanity Studio & CMS MCP server
11. `magic-mcp`: 21st-dev magic generator (disabled by default)

### Skills (45 Total):
Canonical skills located in `~/.gemini/config/skills/`. They are linked into Claude Code via zero-copy NTFS Directory Junctions (`fs.symlinkSync(src, dest, 'junction')`).

---

## 3. Architecture of my-agent-hub

```text
my-agent-hub/
├── README.md                      # Personal AI command center overview & guide
├── sync-agents.js                 # Focused 2-way sync engine (Antigravity ↔ Claude Code)
├── .env.example                   # Token template (SUPABASE_ACCESS_TOKEN, VERCEL_TOKEN, GITHUB_TOKEN)
├── .gitignore                     # Strictly ignores .env, *.bak, node_modules, etc.
│
├── mcp/
│   ├── mcp_config.template.json   # Master sanitized template with ${VAR} placeholders
│   └── CATALOG.md                 # Full breakdown of all MCP servers, tools, and usage
│
├── skills/
│   ├── CATALOG.md                 # Catalog of all skills categorized by domain
│   ├── backend/                   # Backend standards & scaffolding
│   ├── architecture/              # System diagrams & project planning
│   ├── frontend/                  # Frontend implementation & performance audits
│   ├── ui-ux-design/              # Design canvas, UI styling & UI-UX-Pro-Max
│   └── workflow/                  # Active recall QA reviews & agent handoffs
│
├── plugins/
│   └── CATALOG.md                 # Catalog of installed plugins (gemini-api, chrome-devtools, etc.)
│
└── docs/
    └── AGENT_SYNC.md              # Deep-dive on NTFS junctions and maintenance
```

---

## 4. Operational Commands
* **Synchronize Environment**:
  ```powershell
  node sync-agents.js
  ```
* **Backup Weekly Skill Edits to Hub**:
  ```powershell
  node backup-skills.js
  ```
* **Verify Claude Code Connection**:
  ```powershell
  claude mcp list
  ```

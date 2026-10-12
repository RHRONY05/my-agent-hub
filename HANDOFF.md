# HANDOFF: Personal AI Agent Hub (my-agent-hub)

## 1. Mission & Goal
Build a dedicated, production-grade **Personal AI Agent Hub & Dotfiles** repository in this directory (d:\Projects\my-agent-hub) for version control on GitHub.

This repository serves as:
1. **The Machine's Master AI Hub**: A single, clean system to synchronize MCP tools and skills across all 4 coding agents:
   - **Google Antigravity**
   - **Claude Code**
   - **OpenAI Codex**
   - **Cursor IDE**
2. **Personal Tool & Skill Inventory**:
   - Curated directory of all 10 MCP servers (what each does, key tools, when to enable).
   - Inventory of all 44+ builtin and plugin skills.
   - Dedicated folder for handwritten custom skills with documentation on why they were created.
3. **Safe & Sanitized**:
   - Zero committed secrets (uses .env + template configs for public/private GitHub hosting).
   - Automated sync engine (sync-agents.js) that safely merges configurations and manages NTFS directory junctions.

---

## 2. Machine State & Discovered Environment
The following agent clients are installed and verified on this Windows machine:

| Client | Config Location | Format | Status |
| :--- | :--- | :--- | :--- |
| **Antigravity** | ~/.gemini/config/mcp_config.json & ~/.gemini/config/skills/ | JSON | Master Source of Truth (10 servers, 44 skills) |
| **Claude Code** | ~/.claude.json & ~/.claude/skills/ | JSON | CLI installed (2.1.293). Verified connected. |
| **OpenAI Codex**| ~/.codex/config.toml & ~/.codex/skills/ | TOML | CLI installed (0.153.4). Verified connected. |
| **Cursor IDE**  | ~/.cursor/mcp.json | JSON | Verified connected. |

### Connected MCP Servers (10 Total):
1. supabase: Official Supabase server (@supabase/mcp-server-supabase)
2. ercel: Full-platform Vercel server (ercel-mcp-pro)
3. github-mcp-server: Docker-based GitHub server
4. chrome-devtools: Chrome DevTools MCP (chrome-devtools-mcp)
5. shadcn: Shadcn component registry
6. magicui: MagicUI registry
7. ceternity: Aceternity UI registry
8. uiverse: Uiverse component library
9. StitchMCP: Google Stitch UI generator via mcp-remote
10. magic-mcp: 21st-dev magic generator (disabled by default)

### Skills (44 Total):
All located in ~/.gemini/config/skills/. They are linked into Claude Code and Codex via zero-copy NTFS Directory Junctions (s.symlinkSync(src, dest, 'junction')).

---

## 3. Architecture of my-agent-hub to Build

`	ext
my-agent-hub/
├── README.md                      # Personal AI command center overview & guide
├── sync-agents.js                 # Universal sync engine (Node.js, zero dependencies)
├── .env.example                   # Token template (SUPABASE_ACCESS_TOKEN, VERCEL_TOKEN, GITHUB_TOKEN)
├── .gitignore                     # Strictly ignores .env, *.bak, node_modules, etc.
│
├── mcp/
│   ├── mcp_config.template.json   # Master sanitized template with  placeholders
│   └── CATALOG.md                 # Full breakdown of all 10 MCP servers, tools, and usage
│
├── skills/
│   ├── custom/                    # Dedicated folder for user's own custom skills
│   └── CATALOG.md                 # Catalog of all 44 builtin skills categorized by domain
│
├── plugins/
│   └── CATALOG.md                 # Catalog of installed plugins (gemini-api, chrome-devtools, etc.)
│
└── docs/
    └── ARCHITECTURE.md            # Deep-dive on NTFS junctions, TOML/JSON merging, troubleshooting
`

---

## 4. Immediate Next Steps for the New Agent Turn
1. git init in d:\Projects\my-agent-hub.
2. Create .gitignore and .env.example.
3. Create sync-agents.js (adapted to read .env and mcp/mcp_config.template.json).
4. Generate the mcp/CATALOG.md and skills/CATALOG.md.
5. Create README.md and docs/ARCHITECTURE.md.
6. Review with user and set up git commit.

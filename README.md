# 🤖 My Agent Hub

> **Personal AI Agent Dotfiles & Command Center**  
> Unified Model Context Protocol (MCP) servers, domain skills, and workflows shared seamlessly across **Google Antigravity**, **Claude Code**, **OpenAI Codex**, and **Cursor**.

---

## ⚡ What is This?

Instead of fragmenting agent configurations, API keys, and custom skills across multiple coding assistants, **My Agent Hub** acts as the single source of truth for all AI tools on this machine:

- **10 MCP Servers (200+ Tools)**: Shared across Antigravity, Claude Code, Codex, and Cursor.
- **44+ Domain Skills**: Real-time linked via Windows NTFS Directory Junctions (0 file duplication).
- **Zero Secret Leaks**: Sanitized templates committed to Git; real API keys stored in local .env.
- **1-Command Sync**: Run 
ode sync-agents.js to update all coding agents simultaneously.

---

## 📁 Repository Structure

`	ext
my-agent-hub/
├── README.md                      # This command center dashboard
├── sync-agents.js                 # Universal sync engine (zero dependencies)
├── .env.example                   # API token template (Supabase, Vercel, GitHub, etc.)
├── .gitignore                     # Ignores .env, *.bak, and sensitive files
│
├── mcp/
│   ├── CATALOG.md                 # Full breakdown of all 10 MCP servers and tools
│   └── mcp_config.template.json   # Master sanitized template with  placeholders
│
├── skills/
│   ├── CATALOG.md                 # Categorized catalog of all 44+ domain skills
│   └── custom/                    # Your handwritten custom skills
│
├── plugins/
│   └── CATALOG.md                 # Catalog of installed plugins (chrome-devtools, gemini-api, etc.)
│
└── docs/
    └── AGENT_SYNC.md              # Deep-dive architecture and troubleshooting guide
`

---

## 🚀 Quick Start (New Machine Setup)

1. **Clone this repository:**
   `ash
   git clone <your-repo-url> d:\Projects\my-agent-hub
   cd d:\Projects\my-agent-hub
   `

2. **Configure your API keys:**
   `ash
   copy .env.example .env
   # Open .env and add your SUPABASE_ACCESS_TOKEN, VERCEL_TOKEN, GITHUB_TOKEN
   `

3. **Run the universal synchronizer:**
   `ash
   node sync-agents.js
   `

All installed agents (**Antigravity**, **Claude Code**, **Codex**, **Cursor**) will immediately be linked and configured with the exact same tools and skills.

---

## 🛠️ Supported Agents & Config Paths

| Agent | Config Target | Format | Status |
| :--- | :--- | :--- | :--- |
| **Google Antigravity** | ~/.gemini/config/mcp_config.json | JSON | Primary Master Source |
| **Claude Code** | ~/.claude.json | JSON | Verified (claude mcp list) |
| **OpenAI Codex** | ~/.codex/config.toml | TOML | Verified (codex mcp list) |
| **Cursor IDE** | ~/.cursor/mcp.json | JSON | Verified |

---

## 📜 Catalogs & References

- [MCP Server Catalog](mcp/CATALOG.md) — Descriptions and tools for Supabase, Vercel, GitHub, DevTools, etc.
- [Skills Catalog](skills/CATALOG.md) — Index of UI/UX, Backend, Cloud, AI, and Safety runbooks.
- [Plugins Catalog](plugins/CATALOG.md) — Overview of modular multi-skill plugin bundles.
- [Architecture & Maintenance Guide](docs/AGENT_SYNC.md) — Details on junction mechanics and recovery.

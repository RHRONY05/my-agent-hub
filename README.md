# 🤖 My Agent Hub

> **Personal AI Agent Dotfiles & Command Center**  
> Unified Model Context Protocol (MCP) servers, domain skills, and workflows shared seamlessly between **Google Antigravity** and **Claude Code**.

---

## ⚡ What is This?

Instead of fragmenting agent configurations, API keys, and custom skills, **My Agent Hub** acts as the single source of truth for your primary AI coding setup:

- **11 MCP Servers (200+ Tools)**: Synced seamlessly between **Antigravity** (IDE) and **Claude Code** (CLI).
- **45+ Domain Skills**: Real-time linked via Windows NTFS Directory Junctions (zero file duplication).
- **Zero Secret Leaks**: Sanitized templates committed to Git; real API keys stored in local `.env`.
- **1-Command Sync**: Run `node sync-agents.js` to reconcile tools and link new skills across both environments.

---

## 📁 Repository Structure

```text
my-agent-hub/
├── README.md                      # Command center dashboard
├── sync-agents.js                 # Focused 2-way sync engine (Antigravity ↔ Claude Code)
├── .env.example                   # API token template (Supabase, Vercel, GitHub, etc.)
├── .gitignore                     # Ignores .env, *.bak, and sensitive files
│
├── mcp/
│   ├── CATALOG.md                 # Full breakdown of all 11 MCP servers and tools
│   └── mcp_config.template.json   # Master sanitized template with ${VAR} placeholders
│
├── skills/
│   ├── CATALOG.md                 # Categorized catalog of all 45+ domain skills
│   └── custom/                    # Your handwritten custom skills
│
├── plugins/
│   └── CATALOG.md                 # Catalog of installed plugins (chrome-devtools, gemini-api, etc.)
│
└── docs/
    └── AGENT_SYNC.md              # Architecture and maintenance guide
```

---

## 🚀 Quick Start (New Machine Setup)

1. **Clone this repository:**
   ```bash
   git clone <your-repo-url> d:\Projects\my-agent-hub
   cd d:\Projects\my-agent-hub
   ```

2. **Configure your API keys:**
   ```bash
   copy .env.example .env
   # Open .env and add your SUPABASE_ACCESS_TOKEN, VERCEL_TOKEN, GITHUB_TOKEN
   ```

3. **Run the synchronizer:**
   ```bash
   node sync-agents.js
   ```

Both **Antigravity** and **Claude Code** will immediately share all MCP servers and skills.

---

## 🛠️ Supported Agents & Config Paths

| Agent | Config Target | Format | Status |
| :--- | :--- | :--- | :--- |
| **Google Antigravity** | `~/.gemini/config/mcp_config.json` | JSON | Primary IDE (`~/.gemini/config/skills/`) |
| **Claude Code** | `~/.claude.json` | JSON | Secondary CLI (`~/.claude/skills/`) |

---

## 📜 Catalogs & References

- [MCP Server Catalog](mcp/CATALOG.md) — Descriptions and tools for Supabase, Vercel, GitHub, DevTools, etc.
- [Skills Catalog](skills/CATALOG.md) — Index of UI/UX, Backend, Cloud, AI, and Safety runbooks.
- [Plugins Catalog](plugins/CATALOG.md) — Overview of modular multi-skill plugin bundles.
- [Architecture & Maintenance Guide](docs/AGENT_SYNC.md) — Details on junction mechanics and recovery.

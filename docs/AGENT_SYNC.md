# Cross-Agent Sync Architecture & Maintenance Guide

This document describes the unified MCP and Skills synchronization system configured for this machine. It allows **Google Antigravity**, **Claude Code**, **OpenAI Codex**, and **Cursor** to share identical skills and MCP tool capabilities.

---

## 1. Overview & Single Source of Truth

To prevent configuration drift, all MCP servers and skills are managed from a **single master source of truth**:

| Component | Master Location | Description |
| :--- | :--- | :--- |
| **Master MCP Servers** | C:\Users\Asus\.gemini\config\mcp_config.json | Contains all global tool configurations, commands, credentials, and tokens. |
| **Master Skills** | C:\Users\Asus\.gemini\config\skills\ | 44+ modular skill folders containing SKILL.md instructions and scripts. |

---

## 2. How Each Agent Connects

### A. Skills Sharing (Zero Duplicate Files)
Skills are shared across agents using **Windows NTFS Directory Junctions** (mklink /J):
* **Claude Code Target**: C:\Users\Asus\.claude\skills\<skill-name>
* **OpenAI Codex Target**: C:\Users\Asus\.codex\skills\<skill-name>
* **Antigravity Target**: C:\Users\Asus\.gemini\config\skills\<skill-name>

> **Why this matters:** When you or an agent create, edit, or update any SKILL.md in Antigravity or Codex or Claude, the changes reflect **instantly in real time across all agents**. No sync step is needed for existing skills.

### B. MCP Tools Synchronization
Because each AI coding assistant stores its MCP configuration in a different format and location, the sync engine maps the master JSON to each client:

1. **Cursor IDE**:
   * File: C:\Users\Asus\.cursor\mcp.json
   * Format: Standard JSON mcpServers object.
   * Preserves Cursor-specific servers (e.g., Sanity).
2. **Claude Code**:
   * File: C:\Users\Asus\.claude.json
   * Format: Top-level mcpServers object.
   * Claude Code CLI command: claude mcp list
3. **OpenAI Codex**:
   * File: C:\Users\Asus\.codex\config.toml
   * Format: Dotted TOML table [mcp_servers.<name>] and [mcp_servers.<name>.env].
   * Codex CLI command: codex mcp list
   * Safely enclosed between # >>> MANAGED BY SYNC-AGENTS tags so manual Codex settings remain untouched.

---

## 3. How to Run the Sync Engine

Whenever a new MCP server or skill is added in Antigravity, run from this directory:

`ash
node sync-agents.js
`

### What happens when you run it:
1. Reads C:\Users\Asus\.gemini\config\mcp_config.json.
2. Backs up existing config files (.sync.bak).
3. Updates ~/.cursor/mcp.json.
4. Updates ~/.claude.json.
5. Updates ~/.codex/config.toml.
6. Creates directory junctions for any newly discovered skills in ~/.gemini/config/skills/.

---

## 4. Current Connected MCP Servers (10 Active)

1. **supabase**: Official Supabase server (@supabase/mcp-server-supabase) with full access token (sbp_...).
2. **ercel**: Full-platform Vercel server (ercel-mcp-pro) with team token (cp_...).
3. **github-mcp-server**: GitHub server running via Docker with personal access token (ghp_...).
4. **chrome-devtools**: Browser automation and devtools inspection (chrome-devtools-mcp).
5. **shadcn**: Shadcn component registry inspector (shadcn@latest mcp).
6. **magicui**: MagicUI component manager (@magicuidesign/mcp@latest).
7. **ceternity**: Aceternity UI component manager (ceternityui-mcp).
8. **uiverse**: Uiverse component library (github:Fabi-SPL/uiverse-mcp).
9. **StitchMCP**: Google Stitch design system tools via mcp-remote.
10. **magic-mcp**: 21st-dev Magic component generator (disabled by default).

---

## 5. Troubleshooting & Agent Modification Guide

If any agent encounters issues with MCP or skills:

1. **Verify master JSON**: Check C:\Users\Asus\.gemini\config\mcp_config.json for syntax errors.
2. **Check agent health via CLI**:
   * For Claude Code: run claude mcp list in terminal.
   * For Codex: run codex mcp list in terminal.
3. **Re-run the sync script**: Run 
ode sync-agents.js.
4. **Restoring from backups**: Every target file creates an automated .sync.bak file before writing. If a config ever gets corrupted, simply restore the .bak file:
   * ~/.claude.json.sync.bak
   * ~/.cursor/mcp.json.sync.bak
   * ~/.codex/config.toml.sync.bak

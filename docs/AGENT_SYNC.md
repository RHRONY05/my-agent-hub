# Cross-Agent Sync Architecture & Maintenance Guide

This document describes the unified MCP and Skills synchronization system configured for this machine. It keeps **Google Antigravity** and **Claude Code** in sync with identical skills and MCP tool capabilities.

---

## 1. Overview & Single Source of Truth

To prevent configuration drift, all MCP servers and skills are managed cleanly between your two active environments:

| Component | Primary Location | Description |
| :--- | :--- | :--- |
| **Antigravity MCP** | `C:\Users\Asus\.gemini\config\mcp_config.json` | Contains global tool configurations, commands, and credentials. |
| **Claude Code MCP** | `C:\Users\Asus\.claude.json` | Contains Claude Code's active `mcpServers` configuration. |
| **Antigravity Skills** | `C:\Users\Asus\.gemini\config\skills\` | 45+ real skill folders: the live copy of every skill. |
| **Claude Code Skills** | `C:\Users\Asus\.claude\skills\` | NTFS junctions into the Antigravity folders. |

---

## 2. How the Environments Connect

### A. Skills Sharing (One Live Copy)
* **Antigravity** holds every skill as a **real folder** in `C:\Users\Asus\.gemini\config\skills\<skill-name>`. Antigravity does **not** follow directory junctions when it discovers skills, so a junction there makes the skill invisible (found 2026-10-25 with `codebase-tutor`, `db-docs` and `plan-for-agent-build`).
* **Claude Code** gets a **Windows NTFS Directory Junction** (`fs.symlinkSync(antigravityFolder, claudePath, 'junction')`) at `C:\Users\Asus\.claude\skills\<skill-name>` that points at the Antigravity folder. Claude Code follows junctions.
* **This hub** (`skills/<domain>/<skill-name>/`) is the version-controlled backup. `npm run sync` copies new hub skills into Antigravity; `npm run backup-skills` pulls edits made in either agent back into the hub.

> **Why this matters:** Antigravity and Claude Code read the same files, so an edit in either agent shows up **instantly in both**. Only the hub needs a step: run `npm run backup-skills` before committing.

### B. MCP Tools Synchronization
Both Antigravity and Claude Code use the standard JSON `mcpServers` schema:
* Antigravity: `~/.gemini/config/mcp_config.json`
* Claude Code: `~/.claude.json`

The sync engine performs a safe 2-way merge:
1. Reads all servers defined in Antigravity.
2. Discovers any servers newly added via Claude Code (`claude mcp add`).
3. Reconciles both registries and writes the combined configuration to both clients.
4. Backs up existing files to `.sync.bak` prior to saving.

---

## 3. How to Run the Sync Engine

Whenever a new MCP server or skill is added in either tool, run from this directory:

```bash
npm run sync
# Or: node scripts/sync-agents.js
```

### What happens when you run it:
1. Reads `C:\Users\Asus\.gemini\config\mcp_config.json` and `C:\Users\Asus\.claude.json`.
2. Backs up existing config files (`.sync.bak`).
3. Writes the synchronized MCP configuration to both clients.
4. Copies any new hub skill (`skills/<domain>/`) into Antigravity as a real folder (replacing an old junction if one exists), then links Claude Code to that folder.

---

## 4. Current Connected MCP Servers (11 Active)

1. **supabase**: Official Supabase server (`@supabase/mcp-server-supabase`).
2. **vercel**: Full-platform Vercel server (`vercel-mcp-pro`).
3. **github-mcp-server**: GitHub server running via Docker.
4. **chrome-devtools**: Browser automation and devtools inspection (`chrome-devtools-mcp`).
5. **shadcn**: Shadcn component registry inspector (`shadcn@latest mcp`).
6. **magicui**: MagicUI component manager (`@magicuidesign/mcp@latest`).
7. **aceternity**: Aceternity UI component manager (`aceternityui-mcp`).
8. **uiverse**: Uiverse component library (`github:Fabi-SPL/uiverse-mcp`).
9. **StitchMCP**: Google Stitch design system tools via mcp-remote.
10. **Sanity**: Sanity studio & CMS MCP server.
11. **magic-mcp**: 21st-dev Magic component generator (disabled by default).

---

## 5. Built-in Filtering & Safety

You don't need heavy third-party proxy middleware to prevent tool bloat:
* **Skills**: Both Antigravity and Claude Code only load skill summaries (YAML frontmatter) into prompt indexing, loading the full `SKILL.md` on-demand when relevant.
* **Claude Code `/mcp`**: Use `/mcp` inside the Claude Code CLI to toggle individual servers on or off whenever working in sensitive contexts.
* **Antigravity Scoping**: Antigravity supports lazy tool schemas and workspace-specific configurations (`.agents/`), keeping non-project tools idle until invoked.

---

## 6. Troubleshooting & Recovery

If any agent encounters issues:
1. **Verify JSON files**: Check `~/.gemini/config/mcp_config.json` and `~/.claude.json` for syntax errors.
2. **Check Claude Code CLI health**: Run `claude mcp list` in PowerShell/terminal.
3. **Re-run the sync script**: Run `npm run sync` (or `node scripts/sync-agents.js`).
4. **Restore from backups**: Every target file creates an automated `.sync.bak` file before writing. If a config ever gets corrupted, simply restore the `.bak` file:
   * `~/.claude.json.sync.bak`
   * `~/.gemini/config/mcp_config.json.sync.bak`

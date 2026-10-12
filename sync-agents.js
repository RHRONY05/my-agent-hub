#!/usr/bin/env node
/**
 * Cross-Agent MCP & Skills Synchronizer
 * 
 * Synchronizes MCP servers and Skills across:
 * - Google Antigravity (~/.gemini/config/) [Master Source of Truth]
 * - Claude Code (~/.claude.json & ~/.claude/skills/)
 * - OpenAI Codex (~/.codex/config.toml & ~/.codex/skills/)
 * - Cursor IDE (~/.cursor/mcp.json)
 *
 * Safe & Non-destructive:
 * - Uses NTFS directory junctions for Skills (0 duplicate files, real-time shared updates)
 * - Deep-merges MCP servers without overwriting tool-specific settings or personal configs
 * - Creates automated backups (.sync.bak) before modifying any configuration file
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = os.homedir();

// Master & Target Paths
const PATHS = {
  masterMcp: path.join(HOME, '.gemini', 'config', 'mcp_config.json'),
  masterSkills: path.join(HOME, '.gemini', 'config', 'skills'),
  cursorMcp: path.join(HOME, '.cursor', 'mcp.json'),
  claudeJson: path.join(HOME, '.claude.json'),
  claudeSkillsDir: path.join(HOME, '.claude', 'skills'),
  codexConfig: path.join(HOME, '.codex', 'config.toml'),
  codexSkillsDir: path.join(HOME, '.codex', 'skills'),
};

console.log('========================================================');
console.log('🤖 Universal AI Agent Sync Engine (Antigravity / Claude / Codex / Cursor)');
console.log('========================================================\n');

// 1. Validate Master Source of Truth
if (!fs.existsSync(PATHS.masterMcp)) {
  console.error(❌ Master MCP config not found at: );
  process.exit(1);
}

const masterRaw = fs.readFileSync(PATHS.masterMcp, 'utf8');
let masterData;
try {
  masterData = JSON.parse(masterRaw);
} catch (e) {
  console.error(❌ Failed to parse master MCP config: );
  process.exit(1);
}

const masterServers = masterData.mcpServers || {};
const serverNames = Object.keys(masterServers);
console.log(📦 Found  master MCP servers in Antigravity:);
serverNames.forEach(name => {
  const status = masterServers[name].disabled ? ' (disabled)' : '';
  console.log(   - );
});
console.log('');

// Helper: Backup a file
function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    const backupPath = filePath + '.sync.bak';
    fs.copyFileSync(filePath, backupPath);
  }
}

// 2. Sync to Cursor (~/.cursor/mcp.json)
function syncCursor() {
  console.log('🔄 Syncing to Cursor IDE...');
  try {
    let cursorData = { mcpServers: {} };
    if (fs.existsSync(PATHS.cursorMcp)) {
      backupFile(PATHS.cursorMcp);
      try {
        cursorData = JSON.parse(fs.readFileSync(PATHS.cursorMcp, 'utf8'));
        if (!cursorData.mcpServers) cursorData.mcpServers = {};
      } catch (err) {
        console.warn(   ⚠️ Warning reading cursor mcp.json: );
      }
    } else {
      const cursorDir = path.dirname(PATHS.cursorMcp);
      if (!fs.existsSync(cursorDir)) fs.mkdirSync(cursorDir, { recursive: true });
    }

    let addedCount = 0;
    for (const [name, config] of Object.entries(masterServers)) {
      cursorData.mcpServers[name] = config;
      addedCount++;
    }

    fs.writeFileSync(PATHS.cursorMcp, JSON.stringify(cursorData, null, 2), 'utf8');
    console.log(   ✅ Cursor:  total servers configured ( synced).);
  } catch (e) {
    console.error(   ❌ Failed to sync Cursor: );
  }
}

// 3. Sync to Claude Code (~/.claude.json)
function syncClaudeCode() {
  console.log('🔄 Syncing to Claude Code...');
  try {
    if (fs.existsSync(PATHS.claudeJson)) {
      backupFile(PATHS.claudeJson);
    }

    let claudeData = {};
    if (fs.existsSync(PATHS.claudeJson)) {
      try {
        claudeData = JSON.parse(fs.readFileSync(PATHS.claudeJson, 'utf8'));
      } catch (e) {
        console.warn(   ⚠️ Error reading claude.json: );
      }
    }

    if (!claudeData.mcpServers) claudeData.mcpServers = {};

    let syncedCount = 0;
    for (const [name, config] of Object.entries(masterServers)) {
      claudeData.mcpServers[name] = config;
      syncedCount++;
    }

    fs.writeFileSync(PATHS.claudeJson, JSON.stringify(claudeData, null, 2), 'utf8');
    console.log(   ✅ Claude Code:  total servers configured ( synced).);
  } catch (e) {
    console.error(   ❌ Failed to sync Claude Code: );
  }
}

// 4. Sync to OpenAI Codex (~/.codex/config.toml)
function syncCodex() {
  console.log('🔄 Syncing to OpenAI Codex...');
  try {
    if (!fs.existsSync(PATHS.codexConfig)) {
      console.warn(   ⚠️ ~/.codex/config.toml does not exist. Skipping codex.);
      return;
    }
    backupFile(PATHS.codexConfig);

    let tomlContent = fs.readFileSync(PATHS.codexConfig, 'utf8');

    // Remove previously managed section
    const START_TAG = '# >>> MANAGED BY SYNC-AGENTS (DO NOT EDIT MANUALLY) >>>';
    const END_TAG = '# <<< END MANAGED BY SYNC-AGENTS <<<';

    const startIdx = tomlContent.indexOf(START_TAG);
    const endIdx = tomlContent.indexOf(END_TAG);

    if (startIdx !== -1 && endIdx !== -1) {
      tomlContent = tomlContent.slice(0, startIdx).trimEnd() + '\n\n' + tomlContent.slice(endIdx + END_TAG.length).trimStart();
    }

    let managedToml = ${START_TAG}\n;
    let count = 0;

    for (const [name, config] of Object.entries(masterServers)) {
      if (config.disabled) continue;

      managedToml += \n[mcp_servers."]\n;
 if (config.command) {
 managedToml += command = \n;
 }
 if (config.args && Array.isArray(config.args)) {
 managedToml += rgs = \n;
 }
 if (config.env && Object.keys(config.env).length > 0) {
 managedToml += \n[mcp_servers..env]\n;
 for (const [k, v] of Object.entries(config.env)) {
 managedToml += ${k} = \n;
 }
 }
 count++;
 }

 managedToml += \n\n;
 tomlContent = tomlContent.trimEnd() + '\n\n' + managedToml;

 fs.writeFileSync(PATHS.codexConfig, tomlContent, 'utf8');
 console.log( ✅ Codex: active servers synced into ~/.codex/config.toml.);
 } catch (e) {
 console.error( ❌ Failed to sync Codex: );
 }
}

// 5. Sync Skills via NTFS Junctions
function syncSkills() {
 console.log('🔄 Linking Skills (Antigravity -> Claude Code & Codex)...');
 if (!fs.existsSync(PATHS.masterSkills)) {
 console.log(' ℹ️ No master skills folder found. Skipping skills link.');
 return;
 }

 const targets = [
 { name: 'Claude Code', dir: PATHS.claudeSkillsDir },
 { name: 'OpenAI Codex', dir: PATHS.codexSkillsDir }
 ];

 targets.forEach(target => {
 if (!fs.existsSync(target.dir)) {
 fs.mkdirSync(target.dir, { recursive: true });
 }
 });

 const skills = fs.readdirSync(PATHS.masterSkills, { withFileTypes: true })
 .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
 .map(dirent => dirent.name);

 let linkedCounts = { 'Claude Code': 0, 'OpenAI Codex': 0 };

 skills.forEach(skillName => {
 const srcPath = path.join(PATHS.masterSkills, skillName);

 targets.forEach(target => {
 const destPath = path.join(target.dir, skillName);

 if (!fs.existsSync(destPath)) {
 try {
 fs.symlinkSync(srcPath, destPath, 'junction');
 linkedCounts[target.name]++;
 } catch (err) {
 // Ignore
 }
 } else {
 linkedCounts[target.name]++;
 }
 });
 });

 console.log( ✅ Claude Code: skills active.);
 console.log( ✅ OpenAI Codex: skills active.);
}

// Execute
syncCursor();
syncClaudeCode();
syncCodex();
syncSkills();

console.log('\n🎉 All agents are in sync! You can rerun this anytime with: node sync-agents.js');
console.log('========================================================\n');

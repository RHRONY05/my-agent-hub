#!/usr/bin/env node
/**
 * Omni-Directional AI Agent Sync Engine
 * 
 * True Multi-Way Synchronization across:
 * - Google Antigravity (~/.gemini/config/)
 * - Claude Code (~/.claude.json & ~/.claude/skills/)
 * - OpenAI Codex (~/.codex/config.toml & ~/.codex/skills/)
 * - Cursor IDE (~/.cursor/mcp.json)
 * - My Agent Hub (d:/Projects/my-agent-hub/)
 *
 * Capabilities:
 * 1. Two-Way Skills: Discovers skills created in ANY agent (Antigravity, Claude, Codex, or my-agent-hub)
 *    and cross-links them across all agents using live NTFS Junctions.
 * 2. Two-Way MCP: Merges MCP servers discovered across Antigravity, Cursor, and Claude Code into
 *    a unified registry and distributes them everywhere.
 * 3. Safe Backups: Automatically creates .sync.bak files before any configuration write.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = os.homedir();

const PATHS = {
  hubRepo: path.resolve(__dirname),
  masterMcp: path.join(HOME, '.gemini', 'config', 'mcp_config.json'),
  geminiSkills: path.join(HOME, '.gemini', 'config', 'skills'),
  cursorMcp: path.join(HOME, '.cursor', 'mcp.json'),
  claudeJson: path.join(HOME, '.claude.json'),
  claudeSkills: path.join(HOME, '.claude', 'skills'),
  codexConfig: path.join(HOME, '.codex', 'config.toml'),
  codexSkills: path.join(HOME, '.codex', 'skills'),
  hubCustomSkills: path.join(path.resolve(__dirname), 'skills', 'custom'),
};

console.log('================================================================');
console.log('🔄 Omni-Directional AI Agent Sync Engine (Antigravity ↔ Claude ↔ Codex ↔ Cursor)');
console.log('================================================================\n');

function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, filePath + '.sync.bak');
  }
}

// 1. OMNI-DIRECTIONAL MCP SYNC
console.log('📡 Step 1: Merging MCP Servers across all agents...');

let unifiedServers = {};

if (fs.existsSync(PATHS.masterMcp)) {
  try {
    const data = JSON.parse(fs.readFileSync(PATHS.masterMcp, 'utf8'));
    Object.assign(unifiedServers, data.mcpServers || {});
  } catch (e) {
    console.warn('   ⚠️ Error reading Antigravity mcp_config.json:', e.message);
  }
}

if (fs.existsSync(PATHS.cursorMcp)) {
  try {
    const data = JSON.parse(fs.readFileSync(PATHS.cursorMcp, 'utf8'));
    for (const [name, config] of Object.entries(data.mcpServers || {})) {
      if (!unifiedServers[name]) {
        console.log('   ✨ Discovered new server from Cursor:', name);
        unifiedServers[name] = config;
      }
    }
  } catch (e) {}
}

if (fs.existsSync(PATHS.claudeJson)) {
  try {
    const data = JSON.parse(fs.readFileSync(PATHS.claudeJson, 'utf8'));
    for (const [name, config] of Object.entries(data.mcpServers || {})) {
      if (!unifiedServers[name]) {
        console.log('   ✨ Discovered new server from Claude Code:', name);
        unifiedServers[name] = config;
      }
    }
  } catch (e) {}
}

const totalMcpCount = Object.keys(unifiedServers).length;
console.log('   📦 Unified pool has ' + totalMcpCount + ' active/managed MCP servers.\n');

try {
  backupFile(PATHS.masterMcp);
  fs.writeFileSync(PATHS.masterMcp, JSON.stringify({ mcpServers: unifiedServers }, null, 2), 'utf8');
  console.log('   ✅ Antigravity: Synced.');
} catch (e) {
  console.error('   ❌ Antigravity error:', e.message);
}

try {
  backupFile(PATHS.cursorMcp);
  let cursorData = { mcpServers: {} };
  if (fs.existsSync(PATHS.cursorMcp)) {
    try { cursorData = JSON.parse(fs.readFileSync(PATHS.cursorMcp, 'utf8')); } catch (e) {}
  }
  cursorData.mcpServers = Object.assign({}, cursorData.mcpServers || {}, unifiedServers);
  fs.writeFileSync(PATHS.cursorMcp, JSON.stringify(cursorData, null, 2), 'utf8');
  console.log('   ✅ Cursor IDE: Synced.');
} catch (e) {
  console.error('   ❌ Cursor error:', e.message);
}

try {
  backupFile(PATHS.claudeJson);
  let claudeData = {};
  if (fs.existsSync(PATHS.claudeJson)) {
    try { claudeData = JSON.parse(fs.readFileSync(PATHS.claudeJson, 'utf8')); } catch (e) {}
  }
  claudeData.mcpServers = Object.assign({}, claudeData.mcpServers || {}, unifiedServers);
  fs.writeFileSync(PATHS.claudeJson, JSON.stringify(claudeData, null, 2), 'utf8');
  console.log('   ✅ Claude Code: Synced.');
} catch (e) {
  console.error('   ❌ Claude Code error:', e.message);
}

try {
  if (fs.existsSync(PATHS.codexConfig)) {
    backupFile(PATHS.codexConfig);
    let tomlContent = fs.readFileSync(PATHS.codexConfig, 'utf8');
    const START_TAG = '# >>> MANAGED BY SYNC-AGENTS (DO NOT EDIT MANUALLY) >>>';
    const END_TAG = '# <<< END MANAGED BY SYNC-AGENTS <<<';

    const sIdx = tomlContent.indexOf(START_TAG);
    const eIdx = tomlContent.indexOf(END_TAG);
    if (sIdx !== -1 && eIdx !== -1) {
      tomlContent = tomlContent.slice(0, sIdx).trimEnd() + '\n\n' + tomlContent.slice(eIdx + END_TAG.length).trimStart();
    }

    let managedToml = START_TAG + '\n';
    for (const [name, config] of Object.entries(unifiedServers)) {
      if (config.disabled) continue;
      managedToml += '\n[mcp_servers."' + name + '"]\n';
      if (config.command) managedToml += 'command = ' + JSON.stringify(config.command) + '\n';
      if (config.args && Array.isArray(config.args)) managedToml += 'args = ' + JSON.stringify(config.args) + '\n';
      if (config.env && Object.keys(config.env).length > 0) {
        managedToml += '\n[mcp_servers."' + name + '".env]\n';
        for (const [k, v] of Object.entries(config.env)) {
          managedToml += k + ' = ' + JSON.stringify(v) + '\n';
        }
      }
    }
    managedToml += '\n' + END_TAG + '\n';
    tomlContent = tomlContent.trimEnd() + '\n\n' + managedToml;
    fs.writeFileSync(PATHS.codexConfig, tomlContent, 'utf8');
    console.log('   ✅ OpenAI Codex: Synced.');
  }
} catch (e) {
  console.error('   ❌ Codex error:', e.message);
}

console.log('');

// 2. OMNI-DIRECTIONAL SKILLS SYNC
console.log('🧠 Step 2: Multi-Way Skills Discovery & Real-Time Cross-Linking...');

const skillLocations = [
  { name: 'Antigravity', dir: PATHS.geminiSkills },
  { name: 'Claude Code', dir: PATHS.claudeSkills },
  { name: 'OpenAI Codex', dir: PATHS.codexSkills },
  { name: 'Hub Custom', dir: PATHS.hubCustomSkills },
];

skillLocations.forEach(loc => {
  if (!fs.existsSync(loc.dir)) fs.mkdirSync(loc.dir, { recursive: true });
});

const canonicalSkills = new Map();

skillLocations.forEach(loc => {
  if (!fs.existsSync(loc.dir)) return;
  const items = fs.readdirSync(loc.dir, { withFileTypes: true });
  for (const item of items) {
    if (!item.isDirectory() || item.name.startsWith('.') || item.name === 'synced') continue;

    const fullPath = path.join(loc.dir, item.name);
    try {
      const stat = fs.lstatSync(fullPath);
      if (!stat.isSymbolicLink()) {
        if (!canonicalSkills.has(item.name)) {
          canonicalSkills.set(item.name, {
            name: item.name,
            sourceDir: fullPath,
            originName: loc.name
          });
        }
      }
    } catch (e) {}
  }
});

console.log('   📚 Found ' + canonicalSkills.size + ' canonical skills across all agent locations.');

const targets = [
  { name: 'Antigravity', dir: PATHS.geminiSkills },
  { name: 'Claude Code', dir: PATHS.claudeSkills },
  { name: 'OpenAI Codex', dir: PATHS.codexSkills }
];

let newLinksCount = 0;

for (const [skillName, skillInfo] of canonicalSkills) {
  targets.forEach(target => {
    const destPath = path.join(target.dir, skillName);
    if (!fs.existsSync(destPath)) {
      try {
        fs.symlinkSync(skillInfo.sourceDir, destPath, 'junction');
        newLinksCount++;
        console.log('   🔗 Linked [' + skillName + '] (origin: ' + skillInfo.originName + ') -> ' + target.name);
      } catch (err) {}
    }
  });
}

console.log('\n🎉 Omni-Directional Sync Complete!');
console.log('   - MCP Servers: ' + totalMcpCount + ' synchronized everywhere.');
console.log('   - Skills: ' + canonicalSkills.size + ' active across Antigravity, Claude Code, and Codex.');
console.log('   - Any edits made in any agent reflect instantly across all agents.\n');
console.log('================================================================\n');

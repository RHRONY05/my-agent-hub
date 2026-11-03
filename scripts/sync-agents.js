#!/usr/bin/env node
/**
 * Antigravity ↔ Claude Code Synchronization Engine
 * 
 * Focused, rock-solid 2-way sync between:
 * - Google Antigravity (~/.gemini/config/)
 * - Claude Code (~/.claude.json & ~/.claude/skills/)
 * - My Agent Hub (skills/<domain>/<skill>/)
 *
 * Capabilities:
 * 1. Two-Way MCP Sync: Seamlessly shares MCP servers between Antigravity and Claude Code.
 * 2. Layered Domain Skills Sync: Discovers custom skills organized by domain
 *    (backend, frontend, ui-ux-design, architecture, workflow, learning), copies each one
 *    into Antigravity as a real folder (Antigravity ignores junctions), and links Claude
 *    Code to that folder via an NTFS junction.
 * 3. Safe Backups: Automatically creates .sync.bak files before writing any configuration.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = os.homedir();

const PATHS = {
  hubRepo: path.resolve(__dirname, '..'),
  masterMcp: path.join(HOME, '.gemini', 'config', 'mcp_config.json'),
  geminiSkills: path.join(HOME, '.gemini', 'config', 'skills'),
  claudeJson: path.join(HOME, '.claude.json'),
  claudeSkills: path.join(HOME, '.claude', 'skills'),
  hubSkillsRoot: path.join(path.resolve(__dirname, '..'), 'skills'),
};

console.log('================================================================');
console.log('🔄 AI Agent Sync Engine (Google Antigravity ↔ Claude Code)');
console.log('================================================================\n');

function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, filePath + '.sync.bak');
  }
}

// 1. TWO-WAY MCP SYNC (Antigravity ↔ Claude Code)
console.log('📡 Step 1: Merging MCP Servers between Antigravity and Claude Code...');

let unifiedServers = {};

// Read Antigravity servers
if (fs.existsSync(PATHS.masterMcp)) {
  try {
    const data = JSON.parse(fs.readFileSync(PATHS.masterMcp, 'utf8'));
    Object.assign(unifiedServers, data.mcpServers || {});
  } catch (e) {
    console.warn('   ⚠️ Error reading Antigravity mcp_config.json:', e.message);
  }
}

// Read Claude Code servers
if (fs.existsSync(PATHS.claudeJson)) {
  try {
    const data = JSON.parse(fs.readFileSync(PATHS.claudeJson, 'utf8'));
    for (const [name, config] of Object.entries(data.mcpServers || {})) {
      if (!unifiedServers[name]) {
        console.log('   ✨ Discovered new server from Claude Code:', name);
        unifiedServers[name] = config;
      }
    }
  } catch (e) {
    console.warn('   ⚠️ Error reading Claude ~/.claude.json:', e.message);
  }
}

const totalMcpCount = Object.keys(unifiedServers).length;
console.log('   📦 Unified pool has ' + totalMcpCount + ' active/managed MCP servers.\n');

// Write back to Antigravity
try {
  backupFile(PATHS.masterMcp);
  fs.writeFileSync(PATHS.masterMcp, JSON.stringify({ mcpServers: unifiedServers }, null, 2), 'utf8');
  console.log('   ✅ Antigravity (~/.gemini/config/mcp_config.json): Synced.');
} catch (e) {
  console.error('   ❌ Antigravity write error:', e.message);
}

// Write back to Claude Code
try {
  backupFile(PATHS.claudeJson);
  let claudeData = {};
  if (fs.existsSync(PATHS.claudeJson)) {
    try { claudeData = JSON.parse(fs.readFileSync(PATHS.claudeJson, 'utf8')); } catch (e) {}
  }
  claudeData.mcpServers = Object.assign({}, claudeData.mcpServers || {}, unifiedServers);
  fs.writeFileSync(PATHS.claudeJson, JSON.stringify(claudeData, null, 2), 'utf8');
  console.log('   ✅ Claude Code (~/.claude.json): Synced.');
} catch (e) {
  console.error('   ❌ Claude Code write error:', e.message);
}

console.log('');

// 2. LAYERED DOMAIN SKILLS SYNC
console.log('🧠 Step 2: Layered Domain Skills Discovery & Cross-Linking...');

[PATHS.geminiSkills, PATHS.claudeSkills].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const canonicalSkills = new Map();

// A. First: Discover Hub Layered Skills (skills/<domain>/<skill-name>)
if (fs.existsSync(PATHS.hubSkillsRoot)) {
  const domains = fs.readdirSync(PATHS.hubSkillsRoot, { withFileTypes: true });
  for (const domain of domains) {
    if (!domain.isDirectory() || domain.name.startsWith('.')) continue;
    const domainDir = path.join(PATHS.hubSkillsRoot, domain.name);
    const skills = fs.readdirSync(domainDir, { withFileTypes: true });
    for (const skill of skills) {
      if (!skill.isDirectory() || skill.name.startsWith('.')) continue;
      const skillPath = path.join(domainDir, skill.name);
      if (fs.existsSync(path.join(skillPath, 'SKILL.md'))) {
        canonicalSkills.set(skill.name, {
          name: skill.name,
          sourceDir: skillPath,
          originName: `Hub (${domain.name})`
        });
      }
    }
  }
}

// B. Second: Discover any external standalone skills in Antigravity or Claude
const externalLocations = [
  { name: 'Antigravity', dir: PATHS.geminiSkills },
  { name: 'Claude Code', dir: PATHS.claudeSkills }
];

externalLocations.forEach(loc => {
  if (!fs.existsSync(loc.dir)) return;
  const items = fs.readdirSync(loc.dir, { withFileTypes: true });
  for (const item of items) {
    if (!item.isDirectory() || item.name.startsWith('.') || item.name === 'synced') continue;
    const fullPath = path.join(loc.dir, item.name);
    try {
      const stat = fs.lstatSync(fullPath);
      if (!stat.isSymbolicLink() && !canonicalSkills.has(item.name)) {
        canonicalSkills.set(item.name, {
          name: item.name,
          sourceDir: fullPath,
          originName: loc.name
        });
      }
    } catch (e) {}
  }
});

console.log('   📚 Found ' + canonicalSkills.size + ' canonical skills across hub layers & agents.');

// Antigravity does not follow directory junctions when discovering skills, so every
// skill must be a real folder in ~/.gemini/config/skills/ (the live copy). Claude Code
// follows junctions, so it links into that folder. Edits flow back into the hub with
// `npm run backup-skills`.

function isLink(p) {
  try { return fs.lstatSync(p).isSymbolicLink(); } catch (e) { return false; }
}

let copiedCount = 0;
let newLinksCount = 0;

for (const [skillName, skillInfo] of canonicalSkills) {
  const geminiPath = path.join(PATHS.geminiSkills, skillName);
  const claudePath = path.join(PATHS.claudeSkills, skillName);
  const fromHub = skillInfo.originName.startsWith('Hub');

  // A. Antigravity: real folder. Replace an old junction only for hub skills.
  try {
    if (fromHub && isLink(geminiPath)) {
      fs.unlinkSync(geminiPath);
      console.log('   ♻️  Removed junction [' + skillName + '] from Antigravity (not discoverable there)');
    }
    if (!fs.existsSync(geminiPath)) {
      fs.cpSync(skillInfo.sourceDir, geminiPath, { recursive: true, dereference: true });
      copiedCount++;
      console.log('   📁 Copied [' + skillName + '] (' + skillInfo.originName + ') -> Antigravity');
    }
  } catch (err) {
    console.warn('   ⚠️ Antigravity copy failed for ' + skillName + ':', err.message);
  }

  // B. Claude Code: junction into the Antigravity folder. Repoint old hub junctions.
  try {
    if (fromHub && isLink(claudePath) &&
        path.resolve(fs.readlinkSync(claudePath)) !== path.resolve(geminiPath)) {
      fs.unlinkSync(claudePath);
    }
    if (!fs.existsSync(claudePath) && !isLink(claudePath) && fs.existsSync(geminiPath)) {
      fs.symlinkSync(geminiPath, claudePath, 'junction');
      newLinksCount++;
      console.log('   🔗 Linked [' + skillName + '] Claude Code -> Antigravity folder');
    }
  } catch (err) {
    console.warn('   ⚠️ Claude Code link failed for ' + skillName + ':', err.message);
  }
}

console.log('\n🎉 Sync Complete!');
console.log('   - MCP Servers: ' + totalMcpCount + ' synchronized between Antigravity and Claude Code.');
console.log('   - Skills: ' + canonicalSkills.size + ' active across both agents (' + copiedCount + ' copied to Antigravity, ' + newLinksCount + ' linked into Claude Code).');
console.log('   - Antigravity holds real folders; Claude Code links to them. Run `npm run backup-skills` after editing a skill.\n');
console.log('================================================================\n');

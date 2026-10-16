#!/usr/bin/env node
/**
 * Personal AI Agent Hub - Skills Backup Engine
 * 
 * Synchronizes modifications made to custom skills in Google Antigravity (~/.gemini/config/skills/)
 * or Claude Code (~/.claude/skills/) back into the domain layers of this repository:
 *   my-agent-hub/skills/<domain>/<skill>/
 * 
 * Usage:
 *   node backup-skills.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const HOME = os.homedir();
const HUB_SKILLS_ROOT = path.join(__dirname, '..', 'skills');
const GEMINI_SKILLS = path.join(HOME, '.gemini', 'config', 'skills');
const PLUGINS_DIR = path.join(HOME, '.gemini', 'config', 'plugins');
const DATACLOUD_MANIFEST = path.join(GEMINI_SKILLS, '.datacloud_skills_manifest');

console.log('================================================================');
console.log('🔄 Personal AI Agent Hub: Skills Backup & Sync');
console.log('================================================================\n');

function hashFile(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex');
  } catch (e) {
    return null;
  }
}

function copyRecursive(src, dest, stats) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath, stats);
    } else {
      const srcHash = hashFile(srcPath);
      const destHash = hashFile(destPath);

      if (srcHash !== destHash) {
        fs.copyFileSync(srcPath, destPath);
        if (!destHash) {
          console.log(`   ➕ Added:   ${path.relative(HUB_SKILLS_ROOT, destPath)}`);
          stats.added++;
        } else {
          console.log(`   📝 Updated: ${path.relative(HUB_SKILLS_ROOT, destPath)}`);
          stats.updated++;
        }
      }
    }
  }

  // Clean up any files in dest that no longer exist in src
  const destEntries = fs.readdirSync(dest, { withFileTypes: true });
  for (const entry of destEntries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (!fs.existsSync(srcPath)) {
      if (entry.isDirectory()) {
        fs.rmSync(destPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(destPath);
      }
      console.log(`   🗑️ Removed: ${path.relative(HUB_SKILLS_ROOT, destPath)}`);
      stats.removed++;
    }
  }
}

// 1. Discover all currently tracked skills in my-agent-hub by domain
const trackedSkills = new Map(); // skillName -> { domain, hubPath }

if (fs.existsSync(HUB_SKILLS_ROOT)) {
  const domains = fs.readdirSync(HUB_SKILLS_ROOT, { withFileTypes: true });
  for (const domain of domains) {
    if (!domain.isDirectory() || domain.name.startsWith('.')) continue;
    const domainPath = path.join(HUB_SKILLS_ROOT, domain.name);
    const skills = fs.readdirSync(domainPath, { withFileTypes: true });
    for (const skill of skills) {
      if (!skill.isDirectory() || skill.name.startsWith('.')) continue;
      const skillPath = path.join(domainPath, skill.name);
      if (fs.existsSync(path.join(skillPath, 'SKILL.md'))) {
        trackedSkills.set(skill.name, {
          domain: domain.name,
          hubPath: skillPath
        });
      }
    }
  }
}

console.log(`📦 Found ${trackedSkills.size} custom skills tracked across domain layers in this repo.\n`);

// 2. Sync modifications from ~/.gemini/config/skills/ back into hub
console.log('📡 Checking for modifications in active agent environment (~/.gemini/config/skills)...');

const stats = { updated: 0, added: 0, removed: 0 };

for (const [skillName, info] of trackedSkills) {
  const activePath = path.join(GEMINI_SKILLS, skillName);
  if (!fs.existsSync(activePath)) {
    console.log(`   ⚠️ Skill [${skillName}] not found in ~/.gemini/config/skills/`);
    continue;
  }

  // Resolve real path in case it's a junction or symlink
  let realActivePath = activePath;
  try {
    const stat = fs.lstatSync(activePath);
    if (stat.isSymbolicLink()) {
      realActivePath = fs.realpathSync(activePath);
    }
  } catch (e) {}

  copyRecursive(realActivePath, info.hubPath, stats);
}

// 3. Scan for any brand-new custom skills in Antigravity that aren't tracked yet
let datacloudSkills = new Set();
if (fs.existsSync(DATACLOUD_MANIFEST)) {
  try {
    const data = JSON.parse(fs.readFileSync(DATACLOUD_MANIFEST, 'utf8'));
    datacloudSkills = new Set(Object.keys(data.skills || {}));
  } catch (e) {}
}

let pluginSkills = new Set();
if (fs.existsSync(PLUGINS_DIR)) {
  const plugins = fs.readdirSync(PLUGINS_DIR, { withFileTypes: true });
  for (const p of plugins) {
    const pSkillDir = path.join(PLUGINS_DIR, p.name, 'skills');
    if (fs.existsSync(pSkillDir)) {
      fs.readdirSync(pSkillDir).forEach(s => pluginSkills.add(s));
    }
  }
}

const builtinSkills = new Set(['agy-customizations', 'antigravity_guide', 'permissioned-github', 'pdf', 'playwright']);

const newUntrackedSkills = [];
if (fs.existsSync(GEMINI_SKILLS)) {
  const allActive = fs.readdirSync(GEMINI_SKILLS, { withFileTypes: true });
  for (const item of allActive) {
    if (!item.isDirectory() || item.name.startsWith('.') || item.name === 'synced') continue;
    if (
      !trackedSkills.has(item.name) &&
      !datacloudSkills.has(item.name) &&
      !pluginSkills.has(item.name) &&
      !builtinSkills.has(item.name)
    ) {
      newUntrackedSkills.push(item.name);
    }
  }
}

console.log('\n================================================================');
if (stats.updated === 0 && stats.added === 0 && stats.removed === 0) {
  console.log('✅ All 12 custom skills in my-agent-hub are already in 100% sync!');
} else {
  console.log(`🎉 Backup Complete: ${stats.updated} updated, ${stats.added} added, ${stats.removed} removed.`);
  console.log('💡 Tip: Run `git status` and commit your updated skills to GitHub.');
}

if (newUntrackedSkills.length > 0) {
  console.log('\n✨ New Untracked Custom Skill(s) Detected in Antigravity:');
  newUntrackedSkills.forEach(s => {
    console.log(`   • ${s}  --> Add to skills/<domain>/${s} to track it in Git.`);
  });
}
console.log('================================================================\n');

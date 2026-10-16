# Custom Skills Directory

This folder is dedicated to my own custom, personal skills.

## How I Add a Custom Skill
1. Create a subfolder: `skills/custom/<my-skill-name>/`
2. Create a `SKILL.md` file inside that subfolder.
3. Include YAML frontmatter at the top:
   ```markdown
   ---
   name: my-skill-name
   description: When to trigger this skill and what it does.
   ---

   # Instructions
   Write specific workflows, rules, or cheatsheets here.
   ```
4. Run `node sync-agents.js` in the root folder.
   The sync engine automatically links it into **Google Antigravity** and **Claude Code**!

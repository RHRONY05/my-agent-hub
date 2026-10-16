# Custom Skills Directory

This folder is dedicated to your own custom, personal skills.

## How to Create a Custom Skill
1. Create a subfolder: `skills/custom/<my-skill-name>/`
2. Create a `SKILL.md` file inside that subfolder.
3. Include YAML frontmatter at the top:
   ```markdown
   ---
   name: my-skill-name
   description: When to trigger this skill and what it does.
   ---

   # Instructions
   Write your specific workflow, rules, or cheatsheet here.
   ```
4. Run `node sync-agents.js` in the root folder.
   The sync engine will automatically link it into **Google Antigravity** and **Claude Code**!

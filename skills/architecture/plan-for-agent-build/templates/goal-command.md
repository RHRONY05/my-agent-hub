# Goal command (give this to the user to paste into Antigravity)

Short version (the workflows and rules carry the detail):

```
Read AGENTS.md and run /next-task until V{{n}} is done.
```

Long version (when the builder doesn't pick up `.agent/workflows` automatically):

```
Build {{Project}} in {{absolute project path}} end to end.
Start with AGENTS.md and read every file it lists, including .agent/design/.
Work through .agent/08-TASKS.md in order (V0 → V{{n}}), one task at a time.
For each task: implement it, write the tests it names, run npm run test:all,
check its acceptance criteria in a real browser at 1440×900 and 390×844 against
the matching design file, tick it, update .agent/PROGRESS.md, commit and push.
Do not make design decisions and do not add anything from the "Out of scope" list.
If something is ambiguous, choose the simpler option and log it in PROGRESS.md.
Stop and ask me only for the human steps listed in PROGRESS.md.
At the end, give me the production URL, the Lighthouse table, and a code-flow
walkthrough (request in → response out, which files) for {{the 2–3 main flows}}.
```

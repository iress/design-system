# Cross-Branch Bug Fix Labels

This repository uses labels to track bugs that affect multiple branches.

## Quick Start for Users

**You don't need to understand the label system!** Just:

1. Report the bug and mention which branch you saw it on
2. The Copilot bug-fixing agent will investigate both branches
3. The agent will tell you exactly which label(s) to add
4. Copy and paste the labels the agent provides

## Label System

### Branch-Specific Labels

- `affects-5.x` - Bug exists in the 5.x branch
- `affects-main` - Bug exists in the main branch
- `affects-both-branches` - Bug exists in both 5.x and main branches

## Workflow

### When Reporting a Bug Issue

1. Create the issue describing the bug
2. Mention which branch you encountered it on: "I saw this on main" or "This happens on 5.x"
3. Invoke the bug-fixing agent
4. **Agent investigates both branches** to determine actual scope
5. **Agent tells you which label to add** - just copy it!

Example:

```
You: @workspace I found a bug in the Button component on main branch

Agent: I've checked both branches. This bug only affects main.
       Please add label: `affects-main`
```

### When Creating a Bug Fix PR

The agent will provide you with:

- Exact PR title to use
- Which labels to add
- How to link related PRs

Just follow the agent's instructions - no need to figure it out yourself!

### PR Title Format

Use clear prefixes to indicate the fix:

- `Fix(5.x): [description]` - Fix for 5.x branch only
- `Fix(main): [description]` - Fix for main branch only
- `Fix: [description]` - When fixing both branches (used on both PRs)

## Example Workflow

### Single Branch Bug

**Issue #123**: "Button keyboard navigation broken"

- Labels: `bug`, `affects-main`

**PR #456**: "Fix(main): Add keyboard navigation to Button"

- Title clearly shows main branch
- References: `Fixes #123`

### Dual Branch Bug

**Issue #789**: "Dropdown menu scrolling issue"

- Labels: `bug`, `affects-both-branches`

**PR #111**: "Fix: Dropdown menu scrolling issue (5.x)"

- References: `Fixes #789`, `Related: #222 (main)`
- Labels: `bug`, `affects-5.x`

**PR #222**: "Fix: Dropdown menu scrolling issue (main)"

- References: `Fixes #789`, `Related: #111 (5.x)`
- Labels: `bug`, `affects-main`

## Copilot Agent Assistance

The bug-fixing Copilot agent will:

- Ask which branch(es) are affected
- Create appropriately labeled PRs
- Link related PRs automatically
- Add correct labels to issues and PRs

No manual cross-branch tracking required when using the agent!

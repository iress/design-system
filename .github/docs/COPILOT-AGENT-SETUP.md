# GitHub Copilot Agent Setup Guide

This guide explains how to set up and use GitHub Copilot agents in the Iress Design System repository.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Available Agents](#available-agents)
- [Bug-Fixing Agent](#bug-fixing-agent)
- [Slack Integration](#slack-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

This repository uses GitHub Copilot with specialized agents to assist with common development tasks. These agents follow domain-specific instructions and established patterns to maintain code quality and consistency.

## Prerequisites

To use GitHub Copilot agents in this repository, you need:

- ✅ GitHub account with Copilot access (Pro, Pro+, Business, or Enterprise)
- ✅ VS Code with GitHub Copilot extension installed
- ✅ Access to this repository (read or write permissions)
- ✅ (Optional) Slack account for Slack integration

## Available Agents

### 1. Bug-Fixing Agent

**Purpose**: Fix bugs from the GitHub issue tracker using a systematic, well-documented approach.

**Location**: `.github/agents/bugFixAgent.md`

**Capabilities**:

- Analyzes bugs systematically before proposing solutions
- Creates Storybook bug reproduction stories
- Provides multiple solution approaches with trade-offs
- Generates PR-ready documentation
- Follows minimal-change philosophy
- Integrates with GitHub Issues

## Bug-Fixing Agent

### How It Works

The bug-fixing agent follows a six-phase methodology:

1. **Initial Analysis**: Understand the bug and determine target branch(es) before proposing solutions
2. **Investigation**: Use workspace search to locate relevant code in target branch(es)
3. **Root Cause Analysis**: Identify the exact cause and check if it exists in both branches
4. **Solution Strategy**: Propose multiple approaches with trade-offs and branch-specific considerations
5. **Implementation**: Apply targeted fixes with tests to appropriate branch(es)
6. **Documentation**: Generate PR-ready documentation with cross-branch tracking

### Branch Management

The agent supports fixing bugs in both **5.x** (maintenance) and **main** (development) branches:

- **Single Branch Fixes**: When a bug only affects one branch
- **Dual Branch Fixes**: When a bug exists in both branches, ensuring consistency
- **Cross-Branch Tracking**: Automatically tracks when a fix needs to be applied to both branches
- **Version Differences**: Adapts fixes based on architectural differences between branches

### Invoking the Agent

#### Method 1: GitHub Copilot Chat (VS Code)

1. Open GitHub Copilot Chat in VS Code
2. Mention the agent in your query:

   ```
   @workspace Fix issue #123
   ```

3. Or describe the bug directly:
   ```
   @workspace The RichSelect component shows duplicate items when there are concurrent API requests
   ```

#### Method 2: Slack Integration (see below)

```
@GitHub Fix issue #456 - Button component not responding to keyboard events
```

### Example Usage

#### Example 1: Single Branch Bug Fix

**Scenario**: Bug only in main branch

```
You: @workspace Fix issue #456 - New feature in Button causing keyboard issues. I saw this on main branch.

Agent: I understand this is a keyboard event issue in the Button component on main.
Let me investigate if this also affects the 5.x branch by checking the code.

[Agent searches both branches]

Agent: I've checked both branches. This issue only exists in main - the feature
doesn't exist in 5.x. I'll focus on fixing main only.

Please add the label `affects-main` to the issue.

Proceeding to search for the Button component files...

#### Example 2: Dual Branch Bug Fix

**Scenario**: Button component not responding to keyboard events in both branches

```

You: @workspace Fix issue #456 - Button component not responding to keyboard events.
I noticed this on main branch.

Agent: I understand the Button component has keyboard event issues on main. Let me
check if this also affects the 5.x branch.

[Agent searches both branches]

Agent: I've checked both branches. The bug exists in BOTH 5.x and main - both are
missing keyboard event handlers. The code structure is similar, so I can apply a
consistent fix.

Please add the label `affects-both-branches` to the issue.

Should I proceed with creating a bug reproduction story and fixing both branches?

You: Yes, please

Agent: I've created a bug reproduction story at Button.stories.tsx.

[Agent performs analysis]

Agent: I found the Button component in both branches. The issue exists in both, and
the code structure is similar, so I can apply a consistent fix. Should I proceed?

Option 1 (Recommended): Add keyboard event handlers to existing button

- Pros: Minimal change, maintains API
- Cons: None
- Risk: Low
- Effort: Small

Option 2: Refactor event system

- Pros: More comprehensive
- Cons: Larger change, higher risk
- Risk: Medium
- Effort: Large

Which approach would you prefer?

You: Option 1

Agent: [Implements fix on 5.x first, then main, runs tests, creates documentation]
I've implemented the fix on both branches:

- PR for 5.x: Adds keyboard event handlers
- PR for 5.x: Adds keyboard event handlers (labeled `affects-5.x`)
- PR for main: Same fix (labeled `affects-main`, linked to 5.x PR)

All tests pass on both branches. The fixes are ready for review.

```

### Cross-Branch Tracking with Labels

The repository uses a simple label-based system for tracking cross-branch bug fixes:

#### Branch Labels

- `affects-5.x` - Bug exists in the 5.x branch
- `affects-main` - Bug exists in the main branch
- `affects-both-branches` - Bug exists in both branches

#### How It Works

1. **User reports bug**: Simply state which branch you saw the bug on (e.g., "I saw this on main")
2. **Agent investigates**: Checks both branches to determine if bug exists in both
3. **Agent provides labels**: Tells you exactly which label(s) to add based on investigation
4. **Agent creates PRs**: Generates properly titled and linked PRs with clear instructions
5. **User adds labels**: Simply copy the labels the agent specifies

**You don't need to know the label system** - just report where you saw the bug, and the agent figures out the rest!

#### Bug Fix PR Template

Use the simple bug fix PR template (`.github/PULL_REQUEST_TEMPLATE/bug_fix.md`):

- What was broken?
- Related issue number
- What changed?
- Testing checklist

To use: Add `?template=bug_fix.md` to your PR URL.

See [Cross-Branch Labels Guide](.github/CROSS_BRANCH_LABELS.md) for complete workflow details.

### What the Agent Creates

For simple bugs:

- ✅ Bug reproduction story (in main component stories file)
- ✅ Code fixes
- ✅ Updated/added tests

For complex bugs:

- ✅ Bug reproduction story
- ✅ Implementation plan (`bugfixing-[topic].plan.md`)
- ✅ Code fixes
- ✅ Updated/added tests
- ✅ Bug fix documentation (`bugfixing-[topic].docs.md`)

## Slack Integration

### Overview

You can trigger GitHub Copilot coding agent (including the bug-fixing agent) directly from Slack. This allows you to initiate bug fixes from team conversations, using the thread context as additional information.

### Setup

#### Step 1: Install GitHub App for Slack

1. Install the [GitHub App for Slack](https://github.com/marketplace/slack-github)
2. Follow the setup instructions to connect it to your Slack workspace

#### Step 2: Connect Your GitHub Account

1. In Slack, open a direct message with the GitHub App or mention it in a channel:

```

@GitHub Copilot

```

2. Send a prompt or type `login`:

```

login

```

3. Authorize the app to access your GitHub account when prompted

4. Click **Configure settings** to set your default repository:
- Repository: `iress/design-system-public`
- Click **Save changes**

### Using the Agent in Slack

#### Direct Messages

Send a direct message to the GitHub App:

```

@GitHub Fix the button alignment issue in RichSelect

```

#### Thread Mentions

Mention the GitHub App in a thread to include conversation context:

```

User 1: The RichSelect component shows duplicate items when fetching from API

User 2: This happens with concurrent requests

You: @GitHub Copilot please fix the duplicate items issue in RichSelect when
there are concurrent API requests

```

**Important**: Thread context is captured and stored in the pull request!

#### Syntax Options

**Basic invocation:**

```

@GitHub [your bug description]

```

**Specify repository:**

```

@GitHub Fix the dropdown bug in repo=iress/design-system-public

```

**Specify branch:**

```

@GitHub Fix validation issue in repo=iress/design-system-public branch=fix/form-validation

```

**With issue number:**

```

@GitHub Fix issue #456

```

### How Slack Integration Works

1. **Context Capture**: Agent captures entire thread as context (or just the DM)
2. **Bug Analysis**: Follows the six-phase bug-fixing methodology
3. **Implementation**: Creates fixes based on conversation context
4. **PR Creation**: Opens pull request with:
   - Summary of changes
   - Full Slack conversation context
   - Link to PR

### Slack Commands

- `login` - Connect/reconnect GitHub account
- `settings` - Update default repository
- `help` - Get help using the GitHub App

### Best Practices for Slack

1. **Be Specific**: Provide clear bug descriptions
2. **Include Context**: Mention components, files, reproduction steps
3. **Use Threads**: Group related discussions for better context
4. **Review PRs**: Always review generated PRs before merging
5. **Direct Messages**: Use DMs to limit context if needed

### Permissions

- **Write Access Required**: You must have write access to the repository to trigger the coding agent
- **Context Only**: Without write access, you can still provide input that becomes context for the PR

## Best Practices

### General Guidelines

1. **Start with Search**: Never assume file locations, always search first
2. **Read Instructions**: Check `.github/instructions/` for domain-specific guidance
3. **Minimal Changes**: Fix issues with targeted changes, avoid over-engineering
4. **Test Thoroughly**: Run tests after changes, ensure no regressions
5. **Communicate**: Confirm understanding at each phase before proceeding

### Bug Fixing Specific

1. **Create Reproduction Stories**: Always in the main component's stories file
2. **Provide Options**: Give multiple solution approaches when applicable
3. **Document Complex Bugs**: Create implementation plans and documentation for complex issues
4. **Follow File Organization**: Maintain established patterns for implementation and test files
5. **Simple Bugs**: Skip formal documentation for obvious single-file fixes

### Branch Management Best Practices

1. **Always Ask About Branches**: When a bug is reported, ask which branch(es) it affects
2. **Check Both Branches**: Even if reported on one branch, verify if the bug exists in the other
3. **Fix Older Branch First**: When fixing both branches, fix 5.x first, then port to main
4. **Document Differences**: If the fix differs between branches, clearly document why
5. **Link PRs**: Always cross-reference PRs for the same bug: "Related: #XXX (5.x)"
6. **Use Labels**: Add `affects-5.x`, `affects-main`, or `affects-both-branches` labels
7. **PR Titles**: Use `Fix(5.x):` or `Fix(main):` prefixes to clarify target branch
8. **Test Both Branches**: Run tests on both branches before submitting PRs
9. **Version-Specific Fixes**: If a fix only applies to one branch, explain why in the PR

#### Branch Fix Workflow

**For Dual-Branch Bugs:**

1. Create bug reproduction story (works for both branches)
2. Checkout 5.x branch → implement fix → test → create PR with title `Fix: [description] (5.x)`
3. Checkout main branch → implement fix → test → create PR with title `Fix: [description] (main)`
4. Add labels: Both PRs get `affects-5.x` and `affects-main` labels (or `affects-both-branches` on issue)
5. Link PRs: "Related: #XXX (5.x)" and "Related: #YYY (main)"
6. Document in issue: "Fixed in PR #XXX (5.x) and PR #YYY (main)"

**For Single-Branch Bugs:**

1. Create PR with title `Fix(branch): [description]` (e.g., `Fix(main): Button keyboard issue`)
2. Add appropriate label: `affects-5.x` or `affects-main`
3. Document why the bug only affects one branch in PR description
4. Add comment explaining version differences if needed

### Slack Integration

1. **Limit Sensitive Context**: Remember thread content appears in PRs
2. **Use DMs for Privacy**: Direct messages limit context capture
3. **Specify Repository**: Always specify repo if working across multiple
4. **Review Before Merge**: PRs are auto-created but need human review

## Troubleshooting

### Agent Not Responding

**Problem**: Agent doesn't seem to be working

**Solutions**:

1. Check you have GitHub Copilot enabled in VS Code
2. Ensure you're using the correct invocation pattern (`@workspace`)
3. Check `.github/copilot-instructions.md` exists and is properly formatted
4. Verify agent prompt file exists at `.github/agents/bugFixAgent.md`

### Slack Integration Issues

**Problem**: Agent not responding in Slack

**Solutions**:

1. Try the `login` command to re-authenticate
2. Verify GitHub App for Slack is installed in your workspace
3. Check you have write access to the repository
4. Use `settings` command to verify default repository

**Problem**: Wrong repository being used

**Solutions**:

1. Use `settings` command to update default repository
2. Explicitly specify repository in your message: `repo=iress/design-system-public`

**Problem**: Too much context captured from thread

**Solution**:

- Use direct messages instead of thread mentions
- Be explicit about what information is relevant

### File Organization Issues

**Problem**: Agent creating files in wrong locations

**Solutions**:

1. The agent should follow `.github/instructions/file-organization.instructions.md`
2. Bug reproduction stories should be in main component stories files
3. Implementation plans and docs should be in workspace root

### Test/Lint Failures

**Problem**: Tests or linting failing after agent changes

**Solutions**:

1. Run tests manually with coverage: `yarn workspace @iress-oss/ids-components run test:coverage [filename]`
2. Run linting: `yarn workspace @iress-oss/ids-components run lint`
3. Check test output for specific errors
4. Allow 30+ seconds for test startup (this is normal)

**Problem**: Agent running `yarn install` or setup commands

**Solution**:

- The agent should NOT run `yarn install` - the environment is pre-configured
- If the agent attempts this, remind it that dependencies are already installed
- Report this as unexpected behavior

**Problem**: Agent using `yarn test` instead of `yarn test:coverage`

**Solution**:

- The agent should always use `yarn test:coverage` commands
- Correct command: `yarn workspace @iress-oss/ids-components run test:coverage`
- If using wrong command, remind the agent to use coverage commands

## Additional Resources

- [Bug-Fixing Instructions](.github/instructions/bugfixing.instructions.md)
- [File Organization](.github/instructions/file-organization.instructions.md)
- [Global Instructions](.github/instructions/global.instructions.md)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Slack Integration Guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-slack)

## Support

For issues or questions:

1. Check this guide and related instruction files
2. Search existing GitHub issues
3. Create a new issue in the [issue tracker](https://github.com/iress/design-system/issues)
4. Contact the Design System team

---

**Happy bug fixing with GitHub Copilot!** 🐛→✨
```

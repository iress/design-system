# GitHub Copilot Bug-Fixing Agent - Implementation Plan

**Status:** ✅ Implemented with Branch Management
**Updated:** January 5, 2026  
**Purpose:** Design and implement a GitHub Copilot agent focused on fixing bugs from the issue tracker with support for both 5.x and main branches

---

## Current State Analysis

### ✅ Existing Assets

- Comprehensive `bugfixing.instructions.md` with detailed bug-fixing methodology
- Existing agent example (`createComponentMeta.md`) showing agent structure
- Well-organized `.github/instructions/` directory with domain-specific guidance
- Issue tracker already in use on GitHub

### ❌ Missing Components

- GitHub Copilot agent configuration
- Agent-specific prompt file for bug fixing
- Integration setup for GitHub Issues
- Agent registration/manifest files
- Slack integration setup

---

## Proposed Implementation Plan

### Phase 1: Agent Configuration Files

#### 1.1 Create `.github/copilot-instructions.md`

- Root-level Copilot instructions file (GitHub's standard location)
- Reference existing instruction files
- Define agent behavior and scope

#### 1.2 Create `.github/prompts/bugFixAgent.md`

- Agent-specific prompt using `## mode: agent` directive
- Tailored instructions for bug-fixing workflow
- Integration with GitHub Issues
- Reference to bugfixing.instructions.md

#### 1.3 Create `.github/copilot/agents/bug-fix-agent.yml` (if using GitHub Copilot Extensions)

- Agent manifest/configuration
- Define agent name, description, and capabilities
- Set up triggers and permissions

---

### Phase 2: Agent Behavior Definition

#### 2.1 Enhanced Bug-Fixing Workflow

- Integrate with GitHub Issues API
- Auto-fetch issue details when invoked with issue number
- Follow existing bugfixing.instructions.md methodology
- Generate PR-ready documentation

#### 2.2 Agent Invocation Pattern

- Define how to invoke: `@bug-fixer #123` or similar
- Support different bug types (UI, functional, performance, etc.)
- Context-aware responses based on issue labels

---

### Phase 3: Documentation & Setup

#### 3.1 Create `docs/COPILOT-AGENT-SETUP.md`

- Installation and configuration guide
- How to use the bug-fixing agent
- Examples and best practices
- Troubleshooting section

#### 3.2 Update Root README.md

- Add section about the Copilot bug-fixing agent
- Link to setup documentation

#### 3.3 Create `.github/copilot-workspace.yml` (optional)

- Workspace-level Copilot configuration
- Define repository-specific context and rules

---

### Phase 4: Integration Enhancements

#### 4.1 GitHub Actions Integration (optional)

- Auto-label issues for bug-fixing agent
- Trigger agent suggestions on new bug issues
- Link to bug fix documentation template

#### 4.2 Slack Integration

- Connect GitHub Copilot coding agent with Slack workspace
- Enable bug fixing directly from Slack threads
- Use Slack conversations as context for bug fixes
- See [Slack Integration Setup](#slack-integration-setup) below

#### 4.3 Testing & Validation

- Test agent with sample bug issues
- Validate instruction following
- Ensure proper documentation generation

---

## Proposed File Structure

```
.github/
├── copilot-instructions.md          # NEW: Root Copilot instructions
├── copilot/                          # NEW: Copilot agent configs
│   └── agents/
│       └── bug-fix-agent.yml
├── prompts/
│   ├── bugFixAgent.md               # NEW: Bug-fixing agent prompt
│   └── createComponentMeta.md       # EXISTING
├── instructions/
│   ├── bugfixing.instructions.md    # EXISTING (reference)
│   └── ...                          # EXISTING
└── workflows/
    └── bug-fix-agent-helper.yml     # NEW (optional)

docs/
└── COPILOT-AGENT-SETUP.md           # NEW: Setup documentation

WIP/
└── github-copilot-bug-fixing-agent-plan.md  # THIS FILE
```

---

## Key Features of the Bug-Fixing Agent

1. **Issue Integration**: Fetch GitHub issue details automatically
2. **Systematic Analysis**: Follow the proven bugfixing.instructions.md workflow
3. **Story Creation**: Auto-generate Storybook bug reproduction stories
4. **Solution Options**: Present multiple fix approaches with trade-offs
5. **Documentation**: Generate PR-ready bug fix documentation
6. **Context-Aware**: Use package-specific knowledge from instructions
7. **Test Generation**: Create or update tests for bug scenarios
8. **Progressive Communication**: Confirm understanding before proceeding
9. **Slack Integration**: Trigger bug fixes from Slack conversations
10. **PR Automation**: Auto-create pull requests with full context

---

## Slack Integration Setup

### Overview

The GitHub Copilot coding agent can be integrated with Slack, allowing team members to initiate bug-fixing sessions directly from Slack threads or direct messages. This integration captures conversation context and uses it to understand and implement solutions.

### Prerequisites

- GitHub account with access to Copilot through:
  - Copilot Pro
  - Copilot Pro+
  - Copilot Business
  - Copilot Enterprise
- Slack account and workspace membership
- GitHub App for Slack installed (see [GitHub Slack Integration](https://docs.github.com/en/integrations/how-tos/slack/integrate-github-with-slack))

### Setup Instructions

#### Step 1: Connect GitHub App to Your Account

1. In Slack, open a direct message with the GitHub App or mention Copilot in a thread:

   ```
   @GitHub Copilot
   ```

2. Send a prompt to Copilot coding agent:
   - Request to perform a task, or
   - Simply type `login`

3. If prompted, authorize the app to access your GitHub account

4. Click **Configure settings** to set a default repository for pull requests

5. In the "Settings" dialog:
   - Type the repository name (e.g., `iress/design-system-public`)
   - Click **Save changes**

#### Step 2: Using the Agent in Slack

**Direct Messages:**

```
@GitHub Fix the button alignment issue in RichSelect
```

**Thread Mentions:**

```
@GitHub Copilot can you help with this bug?
```

**With Repository/Branch Specification:**

```
@GitHub Add "Hello World" to the README in repo=iress/design-system-public branch=main
```

#### Syntax Options

- **Default**: Uses configured default repository and default branch
- **Specify Repository**: `repo=OWNER/REPO_NAME`
- **Specify Branch**: `branch=BRANCH_NAME`

Example for bug fixing:

```
@GitHub Fix the dropdown menu scrolling issue in repo=iress/design-system-public branch=fix/dropdown-scroll
```

### How It Works

1. **Context Capture**: When you mention `@GitHub` in a Slack thread, the agent captures the entire thread as context
2. **Session Initiation**: Copilot coding agent starts a coding session
3. **Implementation**: Agent analyzes the bug and implements fixes
4. **PR Creation**: Creates a pull request with:
   - Summary of changes
   - Full context from Slack conversation
   - Link to the PR in your default repository

### Important Notes

⚠️ **Thread Context**: When mentioned in a thread, the agent captures the **entire thread** as context. This is stored in the pull request.

💡 **Limit Context**: To limit context, send a **direct message** to the GitHub App instead of mentioning in a thread.

🔐 **Permissions**: You must have **write access** to the repository to trigger the coding agent. Without write access, you can still provide input in the thread, which will be used as context.

### Enterprise Configuration

For enterprise-owned repositories:

- Administrators must install and configure the [Slack GitHub App](https://github.com/marketplace/slack-github)
- Specify which repositories the Slack app can access
- See [Installing a GitHub App from GitHub Marketplace](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-github-marketplace-for-your-organizations)

### Slack Integration Workflow Examples

#### Example 1: Bug Report in Slack Thread

```
User 1: Hey team, the RichSelect component is showing duplicate items when we fetch data from the API

User 2: I noticed this too, it seems to happen when there are concurrent requests

@GitHub Copilot please investigate and fix the duplicate items issue in the RichSelect component when there are concurrent API requests
```

Copilot will:

1. Capture the entire thread context
2. Understand it's a concurrency issue in RichSelect
3. Follow bugfixing methodology
4. Create a PR with the fix and full context

#### Example 2: Direct Bug Fix Request

```
@GitHub Fix the form validation bug where error messages don't clear after input change in repo=iress/design-system-public branch=fix/form-validation
```

#### Example 3: Issue Tracker Integration

```
@GitHub Fix issue #456 - Button component not responding to keyboard events
```

### Available Commands

- `login` - Connect/reconnect GitHub account
- `settings` - Update default repository or other settings
- `help` - Get help with using the GitHub App in Slack

### Best Practices for Slack Integration

1. **Be Specific**: Provide clear bug descriptions in your Slack messages
2. **Include Context**: Mention relevant components, files, or scenarios
3. **Use Threads**: Group related bug discussions in threads for better context
4. **Review PRs**: Always review the generated PRs before merging
5. **Limit Sensitive Info**: Remember thread context is stored in PRs

### Troubleshooting

**Issue**: Agent not responding in Slack

- **Solution**: Check GitHub App authorization, try `login` command

**Issue**: Cannot create PR

- **Solution**: Verify write access to the repository

**Issue**: Wrong repository used

- **Solution**: Use `settings` command or specify `repo=` parameter

**Issue**: Too much context captured

- **Solution**: Use direct messages instead of thread mentions

---

## Questions Before Proceeding

### 1. Agent Type

Should this be:

- ✅ **Recommended**: A GitHub Copilot Chat participant (simpler, uses `copilot-instructions.md`)
- GitHub Copilot Extension (more complex, requires app registration)

### 2. Issue Integration

Should the agent:

- ✅ **Recommended**: Auto-fetch issues by number (`@bug-fixer #123`)
- Require manual issue details paste
- Both options

### 3. Scope

Should the agent handle:

- ✅ **Primary**: Only bugs from the issue tracker
- Also feature requests
- ✅ **Specified**: Only main branch bugs

### 4. Documentation Level

Should we create:

- ✅ **Phase 1-3**: Minimal setup (agent prompts + documentation)
- Phase 4: Full setup (includes GitHub Actions, workflows, Slack)

### 5. Slack Integration Priority

- High priority: Implement immediately
- Low priority: Add after core agent is working
- ✅ **Recommended**: Document now, implement after Phase 1-3

---

## Recommended Approach

**Start with Phase 1-3** (agent configuration and documentation) using GitHub Copilot Chat approach (simpler), then optionally add Phase 4 enhancements based on usage.

### Implementation Order

1. **Phase 1**: Core agent files and configuration
2. **Phase 3**: Documentation and setup guides (including Slack)
3. **Phase 2**: Enhanced behaviors and integrations
4. **Phase 4**: Advanced integrations (GitHub Actions, testing)

This approach allows for:

- ✅ Quick initial deployment
- ✅ Iterative enhancement based on feedback
- ✅ Lower initial complexity
- ✅ Clear documentation from day one

---

## Next Steps

1. **Get Approval**: Confirm plan with stakeholders
2. **Create Core Files**: Implement Phase 1
3. **Write Documentation**: Complete Phase 3
4. **Test Agent**: Validate with sample bugs
5. **Gather Feedback**: Iterate based on usage
6. **Add Enhancements**: Implement Phase 2 & 4 as needed

---

## References

- [GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
- [Integrate Coding Agent with Slack](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/integrate-coding-agent-with-slack)
- [About Copilot Integrations](https://docs.github.com/en/copilot/concepts/tools/about-copilot-integrations)
- [Responsible Use of GitHub Copilot](https://docs.github.com/en/copilot/responsible-use/copilot-coding-agent)
- Existing: `bugfixing.instructions.md`
- Existing: `createComponentMeta.md` (agent example)

---

## Success Criteria

- ✅ Agent follows bugfixing.instructions.md methodology
- ✅ Creates bug reproduction Storybook stories
- ✅ Generates comprehensive bug fix documentation
- ✅ Maintains backward compatibility
- ✅ Provides clear PR descriptions
- ✅ Can be invoked from Slack (optional)
- ✅ Integrates with GitHub Issues
- ✅ Supports multiple solution approaches

---

**Status:** Awaiting approval to proceed with implementation

# Contributing to [Component Library Name]

> 🛠️ This repository is **private** and maintained by Iress employees. While the package is published to [npm](https://www.npmjs.com/), **only Iress staff** are permitted to contribute to the source code.

## 👋 Welcome

Thank you for your interest in contributing to our component library. This project supports consistent, accessible, and high-quality experiences across Iress applications. It has been made publicly available so that our build partners are enabled to extend this cohesion to the software they create on Iress' behalf.

## 📋 Contribution Guidelines

### Who Can Contribute?

Only current employees of Iress with access to this repository may contribute.

### How to Contribute

Please refer to the [README.md](../../README.md) file in the root of this repository for detailed instructions on:

- Setting up your development environment
- Coding conventions and architectural guidelines
- Testing and linting requirements
- Creating pull requests
- Publishing and release processes

## 🤖 AI-Assisted Development

The guidelines site and `.ai/` docs use AI tools to validate and improve code examples during development. This is optional — if no AI tool is installed, the dev watcher skips the improvement step.

### Supported AI Tools

Install **one** of the following (first available is used):

| Tool | Install | Docs |
|------|---------|------|
| kiro-cli | `npm i -g @anthropic-ai/kiro` | [kiro-cli docs](https://kiro.dev) |
| GitHub Copilot CLI | `npm i -g @github/copilot` | [Copilot CLI docs](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) |

### How It Works

When you run `yarn dev`, a file watcher monitors:
- `apps/guidelines/content/**/*.mdx` (guidelines content)
- `packages/components/src/**/*.stories.tsx` (Storybook stories)

On change:
1. `scripts/derive-ai-docs.ts` regenerates `packages/components/.ai/` (incremental)
2. `scripts/ai-runner.ts` invokes your AI tool to validate and improve code examples

### Manual Usage

```bash
# Derive .ai/ from guidelines content
yarn derive:ai-docs

# Improve specific files
yarn ai-improve --target guidelines --files apps/guidelines/content/components/button.mdx

# Improve with a freeform prompt
yarn ai-improve --prompt "improve all code examples"

# Dry run (show what would change)
yarn derive:ai-docs --dry-run
```

### Committing `.ai/` Changes

The `packages/components/.ai/` folder is committed to git and ships with the npm package. After running the dev watcher or manual commands, commit any `.ai/` changes with your PR.

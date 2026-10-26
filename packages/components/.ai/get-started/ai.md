# AI

IDS provides agent skills that give AI coding assistants contextual knowledge about the design system — no runtime dependencies required.

## Ask Iris

🌸 **Ask Iris** is our AI assistant powered by Google Gemini, pre-loaded with
comprehensive IDS documentation. Click the "Ask Iris" button in the site header
to open a conversation — no setup required.

Ask Iris is designed for **designers, product managers, and anyone working with
IDS** — you don't need to be a developer to use it. Ask questions in plain
language, upload screenshots or mockups for feedback, and get answers grounded
in the design system. Iris can look at your designs and tell you which IDS
components map to what you've drawn, flag inconsistencies, or suggest
improvements.

Here are some ways to get the most out of it:

### Best practices

Ask Iris for guidance on correct component usage, accessibility requirements,
and design system conventions.

- "What's the best way to handle form validation with IDS components?"
- "Which component should I use for a confirmation dialog vs an alert?"
- "How do I make a data table accessible with screen readers?"
- "What are the spacing tokens I should use between form fields?"

### Brainstorming and wireframing

Describe what you're building and let Iris help you plan the component
composition and layout before you write any code.

- "I need a settings page with grouped preferences — what IDS components
  would work well together?"
- "Help me wireframe a dashboard layout with a sidebar nav, header, and
  card grid"
- "What's a good pattern for a multi-step onboarding flow using IDS?"
- "Suggest a component structure for a file upload area with progress
  indicators"

### Visual feedback on screenshots

Upload a screenshot, Figma export, or sketch and ask Iris to review it against
IDS guidelines.

- "Here's my mockup — which IDS components should the developer use to build
  this?"
- "Does this design follow IDS spacing and layout patterns?"
- "I've attached a screenshot of our current UI — what's inconsistent with
  the design system?"
- "Can you identify the IDS tokens that match the colours in this mockup?"

### Code generation and prototyping

Get working IDS code snippets tailored to your use case — paste them
straight into your project as a starting point.

- "Generate a responsive form with name, email, and phone fields using IDS"
- "Show me how to build a filterable data table with pagination"
- "Write a navigation sidebar with nested menu items and active states"

### Design token exploration

Explore the token system to find the right values for spacing, colour,
typography, and elevation.

- "What colour tokens are available for status indicators?"
- "Show me all the available border radius tokens and when to use each"
- "Which typography tokens should I use for page headings vs card titles?"

### Migration and upgrade assistance

Get help moving from older versions or other component libraries to the
latest IDS.

- "How do I migrate from OUI Button to IDS Button?"
- "What changed between IDS v5 and v6 for the Modal component?"
- "Help me replace a custom dropdown with the IDS Select component"

### Accessibility audits

Describe your current implementation and ask Iris to review it for
accessibility gaps.

- "Review this form markup — am I missing any aria attributes?"
- "What keyboard interactions should my custom tab component support?"
- "Is my colour combination meeting WCAG AA contrast requirements?"

### Pattern discovery

Find established patterns for common UI problems instead of inventing
solutions from scratch.

- "What's the IDS pattern for empty states?"
- "How should I handle loading skeletons across a page?"
- "What's the recommended approach for responsive layouts with IDS?"
- "Show me how other teams handle error boundaries with IDS components"

## Available Skills

| Skill | Description |
|-------|-------------|
| `figma-to-ids` | Translate Figma design properties into IDS component implementations |
| `ui-translation` | Translate natural language UI descriptions into IDS component code |
| `ui-doctor` | Audit and validate IDS component usage and compliance |
| `token-usage` | Guide on correctly using IDS design tokens in React components and CSS |
| `version-migration` | Migrate applications between IDS major versions (v4→v5, v5→v6, OUI→v6) |

## Installation

Install skills using the [skills CLI](https://github.com/vercel-labs/skills):

```bash
# Install all IDS skills (interactive — choose your agents)
npx skills add iress/design-system

# Install a specific skill
npx skills add iress/design-system --skill token-usage

# Install to a specific agent
npx skills add iress/design-system -a github-copilot
npx skills add iress/design-system -a claude-code
npx skills add iress/design-system -a cursor
npx skills add iress/design-system -a kiro-cli
```

## How it works

Skills are markdown files that provide context to AI tools. They include:

- **Component API knowledge** — correct prop usage, available options, TypeScript interfaces
- **Design patterns** — when to use which component, composition rules, accessibility requirements
- **Code examples** — verified examples extracted from Storybook stories
- **Migration rules** — automated transformation patterns for version upgrades

## Using with AI assistants

### GitHub Copilot

Skills are installed as custom instructions in `.github/copilot-instructions.md`.

### Kiro CLI

Skills are symlinked to `.kiro/skills/` and loaded automatically.

### Cursor / Claude Code

Skills are installed in the respective agent configuration directories.

## Figma Integration

The `figma-to-ids` skill can translate Figma designs directly into IDS code. If you have a Figma MCP server configured, AI agents can read Figma files and generate implementations. Without MCP, paste exported design specs into your prompt.

## `.ai/` Directory

Each published package includes an `.ai/` directory with AI-optimised documentation:

```
node_modules/@iress-oss/ids-components/.ai/
  components/alert.md
  components/button.md
  patterns/form.md
  skills/ui-translation.md
  index.json
```

These files are automatically generated from the guidelines content and Storybook examples. They are designed to be easily parsed by AI tools, providing up-to-date information on component APIs, usage patterns, and design tokens.
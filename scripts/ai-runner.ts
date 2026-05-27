#!/usr/bin/env tsx

/**
 * AI Tool Runner — detects which AI CLI is available and invokes it
 * non-interactively with the improve-code-examples skill.
 *
 * Usage:
 *   npx tsx scripts/ai-runner.ts --target guidelines --files content/components/button.mdx
 *   npx tsx scripts/ai-runner.ts --target styling-props --files content/styling-props/spacing.mdx
 *   npx tsx scripts/ai-runner.ts --prompt "improve all code examples"
 */

import { execSync, type ExecSyncOptions } from 'child_process';

// ─── AI Tool Registry ────────────────────────────────────────

interface AiTool {
  name: string;
  bin: string;
  buildCmd: (prompt: string) => string[];
}

const AI_TOOLS: AiTool[] = [
  {
    name: 'kiro-cli',
    bin: 'kiro-cli',
    buildCmd: (prompt) => [
      'kiro-cli',
      'chat',
      '--no-interactive',
      '--trust-all-tools',
      prompt,
    ],
  },
  {
    name: 'copilot',
    bin: 'copilot',
    buildCmd: (prompt) => [
      'copilot',
      '--allow-all-tools',
      '--allow-all-paths',
      '--prompt',
      prompt,
    ],
  },
  // Future:
  // { name: 'claude', bin: 'claude', buildCmd: (prompt) => ['claude', '--print', '-p', prompt] },
  // { name: 'codex', bin: 'codex', buildCmd: (prompt) => ['codex', '--quiet', '--approval-mode', 'full-auto', prompt] },
];

// ─── Targets ─────────────────────────────────────────────────

interface Target {
  skill: string;
  promptPrefix: string;
}

const SKILL_PATH = '.agents/skills/improve-code-examples/SKILL.md';

const TARGETS: Record<string, Target> = {
  guidelines: {
    skill: 'improve-code-examples',
    promptPrefix: `Read ${SKILL_PATH} for instructions, then validate and improve the tsx code examples in these files under apps/guidelines/content/. If multiple files, use subagents to process them in parallel:`,
  },
  'styling-props': {
    skill: 'improve-code-examples + token-usage',
    promptPrefix: `Read ${SKILL_PATH} and .kiro/skills/token-usage/SKILL.md for instructions, then validate token usage and improve the tsx code examples in these files under apps/guidelines/content/styling-props/. If multiple files, use subagents to process them in parallel:`,
  },
  patterns: {
    skill: 'improve-code-examples',
    promptPrefix: `Read ${SKILL_PATH} for instructions, then validate and improve the tsx code examples in these files under apps/guidelines/content/patterns/. If multiple files, use subagents to process them in parallel:`,
  },
};

// ─── Detection ───────────────────────────────────────────────

function findAvailableTool(): AiTool | null {
  for (const tool of AI_TOOLS) {
    try {
      execSync(`command -v ${tool.bin}`, { stdio: 'ignore' });
      return tool;
    } catch {
      continue;
    }
  }
  return null;
}

// ─── CLI Parsing ─────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  let target: string | undefined;
  let files: string[] = [];
  let prompt: string | undefined;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--target':
        target = args[++i];
        break;
      case '--files':
        // Collect all remaining non-flag args as files
        while (i + 1 < args.length && !args[i + 1].startsWith('--')) {
          files.push(args[++i]);
        }
        break;
      case '--prompt':
        prompt = args.slice(i + 1).join(' ');
        i = args.length; // consume all
        break;
    }
  }

  return { target, files, prompt };
}

// ─── Main ────────────────────────────────────────────────────

function main() {
  const { target, files, prompt } = parseArgs();

  // Build the prompt
  let fullPrompt: string;
  if (prompt) {
    // Scope freeform prompts to the guidelines content directory
    fullPrompt =
      `Read ${SKILL_PATH} for instructions. Work only on files in apps/guidelines/content/. Use subagents to process multiple files in parallel. ` +
      prompt;
  } else if (target && files.length > 0) {
    const t = TARGETS[target];
    if (!t) {
      console.error(
        `Unknown target: ${target}. Available: ${Object.keys(TARGETS).join(', ')}`,
      );
      process.exit(1);
    }
    fullPrompt = `${t.promptPrefix} ${files.join(', ')}`;
  } else {
    console.error(
      'Usage: ai-runner.ts --target <target> --files <file...>\n       ai-runner.ts --prompt "..."',
    );
    process.exit(1);
  }

  // Detect tool
  const tool = findAvailableTool();
  if (!tool) {
    console.error(
      '❌ No AI tool found. Install one of: kiro-cli, copilot\n' +
        '   See CONTRIBUTING.md for setup instructions.',
    );
    process.exit(1);
  }

  console.log(`🤖 Using ${tool.name} to improve code examples...`);
  console.log(`   Target: ${target ?? 'freeform'}`);
  if (files.length) console.log(`   Files: ${files.join(', ')}`);

  // Execute
  const cmd = tool.buildCmd(fullPrompt);
  const opts: ExecSyncOptions = {
    stdio: 'inherit',
    cwd: process.cwd(),
    timeout: 3 * 60 * 1000, // 3 min max
  };

  try {
    execSync(cmd.map((c) => (c.includes(' ') ? `"${c}"` : c)).join(' '), opts);
    console.log('✅ Done.');
  } catch (e: any) {
    if (e.killed) {
      console.log('⏱️  Timed out after 3 minutes.');
    } else if (e.status) {
      console.error(`⚠️  ${tool.name} exited with code ${e.status}`);
    }
  }
  process.exit(0);
}

main();

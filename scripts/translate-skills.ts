#!/usr/bin/env tsx

/**
 * Skills Translator: copies skills from .agents/skills/ (Open Agent Skills spec)
 * to package .ai/skills/ directories for npm distribution.
 *
 * Source of truth: .agents/skills/<name>/SKILL.md (spec-compliant, checked in)
 * Output:          packages/<pkg>/.ai/skills/<name>.md (npm-distributed, gitignored)
 *
 * - Strips YAML frontmatter (--- ... ---)
 * - Inlines reference files (references/*.md) for self-contained output
 * - Maps each skill to its target package
 *
 * Usage: npx tsx scripts/translate-skills.ts [--dry-run]
 */

import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// ─── Configuration ───────────────────────────────────────────

const SKILLS_DIR = path.resolve(import.meta.dirname, '../.agents/skills');
const COMPONENTS_AI_SKILLS = path.resolve(
  import.meta.dirname,
  '../packages/components/.ai/skills',
);
const TOKENS_AI_SKILLS = path.resolve(
  import.meta.dirname,
  '../packages/tokens/.ai/skills',
);
const DRY_RUN = process.argv.includes('--dry-run');

/** Mapping: skill directory name → target .ai/skills/ directory */
const SKILL_TARGETS: Record<string, string> = {
  'figma-to-ids': COMPONENTS_AI_SKILLS,
  'ui-translation': COMPONENTS_AI_SKILLS,
  'ui-doctor': COMPONENTS_AI_SKILLS,
  'token-usage': TOKENS_AI_SKILLS,
};

// ─── Frontmatter Stripping ──────────────────────────────────

/**
 * Strip YAML frontmatter from SKILL.md content.
 *
 * Input format:
 *   ---
 *   name: skill-name
 *   description: ...
 *   ---
 *
 *   # Skill: Title
 *   ...content...
 *
 * Output: just the markdown body (trimmed).
 */
function stripFrontmatter(content: string): string {
  const lines = content.split('\n');

  // Check for opening --- delimiter
  if (lines[0]?.trim() !== '---') {
    return content; // No frontmatter, return as-is
  }

  // Find the closing --- delimiter
  const endIdx = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  if (endIdx < 0) {
    return content; // Malformed frontmatter, return as-is
  }

  // Return everything after the closing ---
  return lines
    .slice(endIdx + 1)
    .join('\n')
    .trimStart();
}

// ─── Reference Inlining ─────────────────────────────────────

/**
 * Inline reference file contents into the skill body.
 *
 * Finds markdown links pointing to references/*.md and replaces them:
 * - The link text becomes plain text in the sentence
 * - The file content is appended immediately after the line
 *
 * Example:
 *   "Use the [report template](references/report-template.md) to structure..."
 * Becomes:
 *   "Use the report template below to structure..."
 *   <content of report-template.md>
 */
async function inlineReferences(
  body: string,
  skillDir: string,
): Promise<string> {
  const refsDir = path.join(skillDir, 'references');
  if (!existsSync(refsDir)) return body;

  const lines = body.split('\n');
  const result: string[] = [];
  const refPattern = /\[([^\]]+)\]\((references\/[^)]+\.md)\)/;

  for (const line of lines) {
    const match = line.match(refPattern);
    if (match) {
      const [, linkText, refPath] = match;
      const refFile = path.join(skillDir, refPath);

      if (existsSync(refFile)) {
        const refContent = await fs.readFile(refFile, 'utf-8');
        // Replace the link with plain text
        const plainLine = line.replace(refPattern, linkText);
        result.push(plainLine);
        result.push('');
        result.push(refContent.trim());
      } else {
        console.warn(`    ⚠️  Reference not found: ${refPath}`);
        result.push(line);
      }
    } else {
      result.push(line);
    }
  }

  return result.join('\n');
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log('🔄 Translating skills from .agents/skills/ → .ai/skills/...\n');

  if (DRY_RUN) {
    console.log('🏃 DRY RUN — no files will be written\n');
  }

  let translated = 0;
  let errors = 0;

  for (const [skillName, targetDir] of Object.entries(SKILL_TARGETS)) {
    const skillDir = path.join(SKILLS_DIR, skillName);
    const skillFile = path.join(skillDir, 'SKILL.md');

    if (!existsSync(skillFile)) {
      console.error(`  ✗ ${skillName}: SKILL.md not found`);
      errors++;
      continue;
    }

    try {
      // Read and process
      const raw = await fs.readFile(skillFile, 'utf-8');
      let body = stripFrontmatter(raw);
      body = await inlineReferences(body, skillDir);

      // Write
      const outputPath = path.join(targetDir, `${skillName}.md`);

      if (!DRY_RUN) {
        await fs.mkdir(targetDir, { recursive: true });
        await fs.writeFile(outputPath, body, 'utf-8');
      }

      const relOutput = path.relative(process.cwd(), outputPath);
      console.log(`  ✓ ${skillName} → ${relOutput}`);
      translated++;
    } catch (error) {
      console.error(
        `  ✗ ${skillName}: ${error instanceof Error ? error.message : error}`,
      );
      errors++;
    }
  }

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`✅ Skills translation complete!`);
  console.log(`  Translated: ${translated}`);
  console.log(`  Errors:     ${errors}`);

  if (DRY_RUN) {
    console.log('\n(dry run — no files written)');
  }

  if (errors > 0) {
    process.exit(1);
  }
}

main().catch(console.error);

/**
 * Migration script: converts .docs.mdx files from Storybook format
 * to Fumadocs-compatible MDX for the guidelines site.
 *
 * Usage: npx tsx scripts/migrate-docs.ts [--dry-run]
 */

import fs from 'fs/promises';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

// ─── Configuration ───────────────────────────────────────────

const CHROMATIC_BASE =
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/story/';

const COMPONENTS_SRC = 'packages/components/src/components';
const PATTERNS_SRC = 'packages/components/src/patterns';
const TARGET_COMPONENTS = 'packages/guidelines/content/docs/components';
const TARGET_PATTERNS = 'packages/guidelines/content/docs/patterns';

const DRY_RUN = process.argv.includes('--dry-run');

// ─── Types ───────────────────────────────────────────────────

interface MigrationResult {
  source: string;
  target: string;
  componentName: string;
  category: 'component' | 'pattern' | 'recipe';
  warnings: string[];
}

// ─── Helpers ─────────────────────────────────────────────────

/** Convert PascalCase export name to kebab Storybook story ID segment */
function exportToKebab(exportName: string): string {
  return exportName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/** Build a Chromatic URL from component name + story export name */
function buildStorybookUrl(
  componentName: string,
  exportName: string,
  category: 'components' | 'patterns',
): string {
  const kebab = exportToKebab(exportName);
  const componentKebab = exportToKebab(componentName);
  return `${CHROMATIC_BASE}${category}-${componentKebab}--${kebab}`;
}

/**
 * Extract a text description from ComponentOverview.
 * Handles both simple string descriptions and JSX fragment descriptions.
 */
function extractDescription(content: string): string | null {
  // Simple string description: description="..."
  const simpleMatch = content.match(
    /<ComponentOverview[\s\S]*?description="([^"]+)"/,
  );
  if (simpleMatch) return simpleMatch[1];

  // JSX fragment description: description={<>...</>}
  const jsxMatch = content.match(
    /<ComponentOverview[\s\S]*?description=\{[\s\S]*?<>([\s\S]*?)<\/>[\s\S]*?\}/,
  );
  if (jsxMatch) {
    return jsxMatch[1]
      .replace(/<[^>]+>/g, '') // strip inner HTML/JSX tags
      .replace(/\{' '\}/g, ' ') // replace JSX spaces
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim();
  }

  return null;
}

/**
 * Extract the H1 heading from the doc.
 * Falls back to component name if not found.
 */
function extractHeading(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Determine the story variable name used in imports.
 * e.g., "import * as ComponentStories from ..." → "ComponentStories"
 * or "import * as PopoverRecipes from ..." → "PopoverRecipes"
 */
function getStoryModuleNames(content: string): string[] {
  const matches = [
    ...content.matchAll(
      /import\s+\*\s+as\s+(\w+)\s+from\s+['"][^'"]+\.stories['"]/g,
    ),
  ];
  return matches.map((m) => m[1]);
}

/**
 * Determine the category prefix for URLs based on file path.
 */
function getCategoryPrefix(filePath: string): 'components' | 'patterns' {
  return filePath.includes('/patterns/') ? 'patterns' : 'components';
}

/**
 * Convert <IressAlert status="..." heading="..." ...>content</IressAlert>
 * to a Markdown blockquote callout.
 * Maps: info→NOTE, warning→WARNING, error→CAUTION, success→TIP
 */
function convertIressAlertToCallout(content: string): string {
  let result = content;
  let safety = 0;

  while (result.includes('<IressAlert') && safety < 50) {
    safety++;
    const start = result.indexOf('<IressAlert');
    if (start === -1) break;

    // Extract status and heading/title attributes
    const tagMatch = result.substring(start).match(/^<IressAlert([^>]*)>/s);
    if (!tagMatch) {
      // Self-closing <IressAlert ... />
      const selfClose = result.substring(start).match(/^<IressAlert[^/]*\/>/s);
      if (selfClose) {
        result =
          result.substring(0, start) +
          result.substring(start + selfClose[0].length);
        continue;
      }
      break;
    }

    const attrs = tagMatch[1];
    const statusMatch = attrs.match(/status="(\w+)"/);
    const headingMatch = attrs.match(/(?:heading|title)="([^"]+)"/);

    const status = statusMatch ? statusMatch[1] : 'info';
    const heading = headingMatch ? headingMatch[1] : '';

    // Map IressAlert status to GFM alert type
    const typeMap: Record<string, string> = {
      info: 'NOTE',
      warning: 'WARNING',
      error: 'CAUTION',
      success: 'TIP',
      danger: 'CAUTION',
    };
    const alertType = typeMap[status] || 'NOTE';

    // Find closing tag
    const closeTag = '</IressAlert>';
    const closeIdx = result.indexOf(closeTag, start);
    if (closeIdx === -1) break;

    const innerContent = result
      .substring(start + tagMatch[0].length, closeIdx)
      .trim();

    // Build blockquote callout
    const lines = innerContent
      .split('\n')
      .map((l) => `> ${l.trimEnd()}`)
      .join('\n');
    const titleLine = heading ? `> **${heading}**\n>\n` : '';
    const callout = `> [!${alertType}]\n${titleLine}${lines}`;

    const afterClose = result.substring(closeIdx + closeTag.length);
    result = result.substring(0, start) + callout + afterClose;
  }

  return result;
}

/**
 * Convert <IressExpander mode="link" activator="Title">content</IressExpander>
 * to a <details><summary> block.
 */
function convertIressExpanderToDetails(content: string): string {
  let result = content;
  let safety = 0;

  while (result.includes('<IressExpander') && safety < 50) {
    safety++;
    const start = result.indexOf('<IressExpander');
    if (start === -1) break;

    const tagMatch = result.substring(start).match(/^<IressExpander([^>]*)>/s);
    if (!tagMatch) {
      // Self-closing <IressExpander ... />
      const selfClose = result
        .substring(start)
        .match(/^<IressExpander[^/]*\/>/s);
      if (selfClose) {
        result =
          result.substring(0, start) +
          result.substring(start + selfClose[0].length);
        continue;
      }
      break;
    }

    const attrs = tagMatch[1];
    const activatorMatch = attrs.match(/activator="([^"]+)"/);
    const summary = activatorMatch ? activatorMatch[1] : 'Details';

    const closeTag = '</IressExpander>';
    const closeIdx = result.indexOf(closeTag, start);
    if (closeIdx === -1) break;

    const innerContent = result
      .substring(start + tagMatch[0].length, closeIdx)
      .trim();
    const details = `<details>\n<summary>${summary}</summary>\n\n${innerContent}\n\n</details>`;

    const afterClose = result.substring(closeIdx + closeTag.length);
    result = result.substring(0, start) + details + afterClose;
  }

  return result;
}

/**
 * Apply a regex replacement only on lines outside code fences.
 */
function replaceOutsideCodeFences(
  content: string,
  pattern: RegExp,
  replacement: string,
): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence;
      result.push(line);
      continue;
    }

    if (inCodeFence) {
      result.push(line);
    } else {
      const replaced = line.replace(pattern, replacement);
      // Only add the line if it wasn't completely removed
      if (replaced !== '' || line === '') {
        result.push(replaced);
      }
    }
  }

  return result.join('\n');
}

/**
 * Wrap bare <Iress...> JSX blocks in code fences, but ONLY when
 * they appear outside existing code fences.
 */
function wrapBareJsxInCodeFences(content: string): string {
  const lines = content.split('\n');
  const outputLines: string[] = [];
  let inCodeFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track code fence boundaries
    if (trimmed.startsWith('```')) {
      if (inCodeFence) {
        // Closing a code fence
        inCodeFence = false;
        outputLines.push(line);
        continue;
      } else {
        // Opening a code fence (```tsx, ```html, etc. or just ```)
        inCodeFence = true;
        outputLines.push(line);
        continue;
      }
    }

    // If inside a code fence, pass through
    if (inCodeFence) {
      outputLines.push(line);
      continue;
    }

    // Outside code fences: check for bare <Iress...> JSX
    if (/^<Iress\w+/.test(trimmed)) {
      // Self-closing tag on one line: <IressComponent ... />
      if (/\/>$/.test(trimmed)) {
        outputLines.push('```tsx');
        outputLines.push(line);
        outputLines.push('```');
        continue;
      }

      // Multi-line JSX block: find closing tag
      const tagNameMatch = trimmed.match(/^<(Iress\w+)/);
      if (tagNameMatch) {
        const tagName = tagNameMatch[1];
        const closeTag = `</${tagName}>`;
        const jsxLines = [line];
        let j = i + 1;
        let found = false;

        while (j < lines.length) {
          jsxLines.push(lines[j]);
          if (lines[j].includes(closeTag)) {
            found = true;
            break;
          }
          j++;
          if (j - i > 20) break; // Safety limit
        }

        if (found) {
          outputLines.push('```tsx');
          outputLines.push(...jsxLines);
          outputLines.push('```');
          i = j; // Skip processed lines
          continue;
        }
      }
    }

    outputLines.push(line);
  }

  return outputLines.join('\n');
}

/**
 * Remove <ComponentOverview .../> tags, handling nested JSX and braces.
 * Uses brace-counting to find the real end of the tag, since the tag
 * can contain description={<>...</>} with nested JSX.
 */
function removeComponentOverview(content: string): string {
  let result = content;
  let safety = 0;

  while (result.includes('<ComponentOverview') && safety < 10) {
    safety++;
    const start = result.indexOf('<ComponentOverview');
    if (start === -1) break;

    // Check if it's self-closing or wrapping
    // Find the end by tracking brace depth only.
    // We intentionally skip string tracking because JSX text content
    // (e.g. "user's") contains apostrophes that aren't JS string delimiters.
    let braceDepth = 0;
    let i = start + '<ComponentOverview'.length;
    let foundEnd = -1;

    while (i < result.length) {
      const ch = result[i];

      if (ch === '{') {
        braceDepth++;
        i++;
        continue;
      }

      if (ch === '}') {
        braceDepth--;
        i++;
        continue;
      }

      // Only look for tag end when not inside braces
      if (braceDepth === 0) {
        // Self-closing: />
        if (ch === '/' && i + 1 < result.length && result[i + 1] === '>') {
          foundEnd = i + 2;
          break;
        }
        // Opening tag end: > (wrapping form)
        if (ch === '>') {
          // Find </ComponentOverview>
          const closeTag = '</ComponentOverview>';
          const closeIdx = result.indexOf(closeTag, i + 1);
          if (closeIdx !== -1) {
            foundEnd = closeIdx + closeTag.length;
          } else {
            foundEnd = i + 1;
          }
          break;
        }
      }

      i++;
    }

    if (foundEnd === -1) {
      // Couldn't find end, give up on this one
      break;
    }

    // Remove the tag and any trailing whitespace/newlines
    const before = result.substring(0, start);
    let after = result.substring(foundEnd);
    after = after.replace(/^\s*\n?/, '');
    result = before + after;
  }

  return result;
}

/**
 * Find the exported Props type name from a component source file.
 * Looks for patterns like:
 *   export interface IressButtonProps ...
 *   export type IressButtonProps = ...
 *   export interface ButtonProps ...
 * Returns the type name or null if not found.
 */
function findExportedPropsType(
  relativePath: string,
  componentName: string,
): string | null {
  // Resolve relative path from guidelines content dir
  const absPath = path.resolve(
    'packages/guidelines/content/docs/components',
    relativePath,
  );

  if (!existsSync(absPath)) {
    return null;
  }

  const source = readFileSync(absPath, 'utf-8');

  // Priority 1: Iress-prefixed Props (e.g., IressButtonProps)
  const iressPrefixed = `Iress${componentName}Props`;
  const iressPattern = new RegExp(
    `export\\s+(?:interface|type)\\s+${iressPrefixed}\\b`,
  );
  if (iressPattern.test(source)) {
    return iressPrefixed;
  }

  // Priority 2: Bare Props (e.g., ButtonProps, ToasterProps)
  const bareName = `${componentName}Props`;
  const barePattern = new RegExp(
    `export\\s+(?:interface|type)\\s+${bareName}\\b`,
  );
  if (barePattern.test(source)) {
    return bareName;
  }

  // Priority 3: Any exported interface/type ending in Props
  const anyPropsMatch = source.match(
    /export\s+(?:interface|type)\s+(\w+Props)\b/,
  );
  if (anyPropsMatch) {
    return anyPropsMatch[1];
  }

  return null;
}

/**
 * Primary transformation: convert Storybook MDX to Fumadocs MDX.
 */
function transformContent(
  content: string,
  componentName: string,
  filePath: string,
  isRecipe: boolean,
  componentSrcPath?: string,
): { transformed: string; warnings: string[] } {
  const warnings: string[] = [];
  const category = getCategoryPrefix(filePath);
  const storyModules = getStoryModuleNames(content);

  let result = content;

  // 1. Remove all import statements (Storybook imports, story imports, config imports, component imports)
  result = result.replace(
    /import\s+(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+['"][^'"]+['"];?\n?/g,
    '',
  );

  // 2. Remove <Meta of={...} />
  result = result.replace(/<Meta\s+of=\{[^}]+\}\s*\/>\s*\n?/g, '');

  // 3. Remove <ComponentOverview ... /> (self-closing, possibly multi-line with JSX)
  // This is tricky because the tag can contain JSX fragments like description={<>...</>}
  // We need to match balanced braces to find the real end of the tag.
  result = removeComponentOverview(result);

  // 4. (Handled in step 3)

  // 5. Transform <ComponentExample of={ModuleName.ExportName} /> to Storybook links
  result = result.replace(
    /<ComponentExample[\s\S]*?of=\{(\w+)\.(\w+)\}[\s\S]*?\/>/g,
    (_match, moduleName, exportName) => {
      // Try to determine which component/pattern this story belongs to
      let storyComponentName = componentName;

      // If the module name is something like "TableBodyStories", extract "TableBody"
      for (const mod of storyModules) {
        if (mod === moduleName) {
          const nameFromModule = moduleName
            .replace(/Stories$/, '')
            .replace(/Recipes$/, '');
          if (nameFromModule !== 'Component') {
            storyComponentName = nameFromModule;
          }
        }
      }

      const url = buildStorybookUrl(storyComponentName, exportName, category);
      return `[Open ${exportName} in Storybook →](${url})`;
    },
  );

  // 6. Remove <ComponentExample ...>...</ComponentExample> (wrapping form, rare)
  result = result.replace(
    /<ComponentExample[\s\S]*?>[\s\S]*?<\/ComponentExample>\s*\n?/g,
    (_match) => {
      warnings.push('Found wrapping <ComponentExample>. Manual review needed.');
      return '<!-- TODO: Review this example manually -->\n';
    },
  );

  // 7. Remove any remaining ComponentApiExpander references
  result = result.replace(/<ComponentApiExpander[\s\S]*?\/>\s*\n?/g, '');
  result = result.replace(
    /<ComponentApiExpander[\s\S]*?>[\s\S]*?<\/ComponentApiExpander>\s*\n?/g,
    '',
  );

  // 7b. Convert <Story of={ModuleName.ExportName} /> to Storybook links
  result = result.replace(
    /<Story\s+of=\{(\w+)\.(\w+)\}\s*\/>/g,
    (_match, moduleName, exportName) => {
      let storyComponentName = componentName;
      for (const mod of storyModules) {
        if (mod === moduleName) {
          const nameFromModule = moduleName
            .replace(/Stories$/, '')
            .replace(/Recipes$/, '');
          if (nameFromModule !== 'Component') {
            storyComponentName = nameFromModule;
          }
        }
      }
      const url = buildStorybookUrl(storyComponentName, exportName, category);
      return `[Open ${exportName} in Storybook →](${url})`;
    },
  );

  // 7c. Remove any remaining <Story> tags
  result = result.replace(/<Story[\s\S]*?\/>\s*\n?/g, '');

  // 8. Convert multi-line <IressAlert> blocks to blockquote callouts
  result = convertIressAlertToCallout(result);

  // 8b. Convert multi-line <IressExpander> blocks to <details> elements
  result = convertIressExpanderToDetails(result);

  // 8c. Remove <p> wrappers around JSX (convert to plain content or code)
  result = result.replace(
    /<p>\s*\n?([\s\S]*?)\n?\s*<\/p>/g,
    (_match, inner) => {
      return inner.trim();
    },
  );

  // 8d. Convert <IressButton href="...">text</IressButton> to markdown links
  result = result.replace(
    /<IressButton\s+href="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/IressButton>/g,
    (_match, href, text) => `[${text.trim()}](${href})`,
  );

  // 8e. Convert remaining bare Iress JSX (outside code fences) to code blocks
  result = wrapBareJsxInCodeFences(result);

  // 8f. Handle remaining </Iress*>; (orphaned closing tags with semicolons from JSX)
  // Only outside code fences
  result = replaceOutsideCodeFences(result, /^<\/Iress\w+>;\s*$/gm, '');

  // 8g. Fix nested code fences: ```tsx\n\n```tsx → single opening ```tsx
  result = result.replace(/```tsx\s*\n\s*```tsx/g, '```tsx');

  // 8h. Fix any remaining bare </IressExpander>, </IressAlert>, </IressProvider> tags
  // Only outside code fences
  result = replaceOutsideCodeFences(result, /^<\/Iress\w+>\s*$/gm, '');

  // 9. Convert Storybook internal links to Fumadocs paths
  result = result.replace(
    /\(\?path=\/docs\/components-(\w+)--docs\)/g,
    (_match, slug) => `(/docs/components/${slug})`,
  );
  result = result.replace(
    /\(\?path=\/docs\/patterns-(\w+)--docs\)/g,
    (_match, slug) => `(/docs/patterns/${slug})`,
  );

  // 10. Clean up: remove excessive blank lines
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.trim();

  // 11. Extract description and heading
  const description =
    extractDescription(content) || `${componentName} component documentation.`;
  const heading = extractHeading(result) || componentName;

  // 12. Remove the H1 heading (Fumadocs renders title from frontmatter)
  result = result.replace(/^#\s+.+\n+/m, '');

  // 13. Compute component source info for frontmatter and auto-type-table
  const isComponent = !isRecipe && category === 'components';
  const srcPath = componentSrcPath || componentName;
  // Relative source path from components/src/components/ (e.g., "Button/Button.tsx" or "Menu/MenuItem/MenuItem.tsx")
  const componentSourceFile = isComponent
    ? `${srcPath}/${componentName}.tsx`
    : null;
  const propsPath = isComponent
    ? `../../../../../packages/components/src/components/${srcPath}/${componentName}.tsx`
    : null;
  const propsTypeName =
    isComponent && propsPath
      ? findExportedPropsType(propsPath, componentName)
      : null;

  // 14. Add Fumadocs frontmatter
  // Escape any quotes in the description for YAML
  const safeDescription = description.replace(/"/g, '\\"');
  let frontmatterLines = [
    '---',
    `title: ${heading}`,
    `description: "${safeDescription}"`,
  ];
  // Add component metadata for non-recipe component docs
  if (isComponent && componentSourceFile) {
    frontmatterLines.push(`component: "${componentSourceFile}"`);
    if (propsTypeName) {
      frontmatterLines.push(`propsType: "${propsTypeName}"`);
    }
  }
  frontmatterLines.push('---', '', '');
  const frontmatter = frontmatterLines.join('\n');
  result = frontmatter + result;

  // 15. Add auto-type-table props section for component docs (not recipes or patterns)
  if (isComponent && !result.includes('auto-type-table')) {
    if (propsTypeName && propsPath) {
      result += `\n\n## Props\n\n<auto-type-table path="${propsPath}" name="${propsTypeName}" />\n`;
    } else {
      warnings.push(
        `No exported Props type found in ${componentName}.tsx — skipping auto-type-table`,
      );
    }
  }

  return { transformed: result, warnings };
}

// ─── Main ────────────────────────────────────────────────────

async function findDocs(baseDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith('.docs.mdx')) {
        results.push(fullPath);
      }
    }
  }

  await walk(baseDir);
  return results.sort();
}

async function migrate() {
  console.log(DRY_RUN ? '🔍 DRY RUN MODE\n' : '🚀 Migrating docs...\n');

  const componentDocs = await findDocs(COMPONENTS_SRC);
  const patternDocs = await findDocs(PATTERNS_SRC);
  const allDocs = [...componentDocs, ...patternDocs];

  console.log(`Found ${allDocs.length} docs to migrate:\n`);
  console.log(`  Components: ${componentDocs.length}`);
  console.log(`  Patterns:   ${patternDocs.length}\n`);

  const results: MigrationResult[] = [];
  const errors: { file: string; error: Error }[] = [];

  for (const docPath of allDocs) {
    try {
      const content = await fs.readFile(docPath, 'utf-8');
      const relativePath = path.relative(process.cwd(), docPath);

      // Determine component name from directory structure
      const dirName = path.basename(path.dirname(docPath));
      const fileName = path.basename(docPath, '.docs.mdx');
      const isRecipe = fileName.toLowerCase().includes('recipe');
      const isPattern = docPath.includes('/patterns/');

      // For nested components like TabSet/Tab/Tab.docs.mdx or Menu/MenuItem/MenuItem.docs.mdx
      // Check if grandparent dir is a component (not 'components' or 'patterns')
      const grandparentDir = path.basename(path.dirname(path.dirname(docPath)));
      const isNested =
        grandparentDir !== 'components' && grandparentDir !== 'patterns';

      // Determine target path
      const targetDir = isPattern ? TARGET_PATTERNS : TARGET_COMPONENTS;
      let targetFileName: string;

      if (isRecipe) {
        // Recipes: e.g., AutocompleteRecipes → autocomplete-recipes
        targetFileName = exportToKebab(fileName);
      } else if (isNested) {
        // Nested: e.g., TabSet/Tab → tab (under main component)
        targetFileName = exportToKebab(fileName);
      } else {
        targetFileName = exportToKebab(dirName);
      }

      const targetPath = `${targetDir}/${targetFileName}.mdx`;

      // Transform content
      // For nested components (e.g., Menu/MenuItem), pass the relative path
      // from the components src dir so auto-type-table paths are correct
      const componentSrcRelative = isNested
        ? `${path.basename(path.dirname(path.dirname(docPath)))}/${dirName}`
        : dirName;

      const { transformed, warnings } = transformContent(
        content,
        dirName,
        docPath,
        isRecipe,
        componentSrcRelative,
      );

      if (!DRY_RUN) {
        await fs.mkdir(targetDir, { recursive: true });
        await fs.writeFile(targetPath, transformed, 'utf-8');
      }

      const category: MigrationResult['category'] = isRecipe
        ? 'recipe'
        : isPattern
          ? 'pattern'
          : 'component';

      results.push({
        source: relativePath,
        target: targetPath,
        componentName: dirName,
        category,
        warnings,
      });

      const status = DRY_RUN ? '📋' : '✓';
      const warn =
        warnings.length > 0 ? ` ⚠️  ${warnings.length} warning(s)` : '';
      console.log(`  ${status} ${fileName} → ${targetPath}${warn}`);
    } catch (error) {
      errors.push({
        file: docPath,
        error: error instanceof Error ? error : new Error(String(error)),
      });
      console.error(`  ✗ ${docPath}: ${error}`);
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log(`\n${DRY_RUN ? '📋 DRY RUN' : '✅'} Migration complete!\n`);
  console.log(`  Migrated:  ${results.length}`);
  console.log(`  Errors:    ${errors.length}`);
  console.log(
    `  Warnings:  ${results.reduce((sum, r) => sum + r.warnings.length, 0)}`,
  );

  // Print warnings
  const withWarnings = results.filter((r) => r.warnings.length > 0);
  if (withWarnings.length > 0) {
    console.log('\n⚠️  Files requiring manual review:\n');
    for (const r of withWarnings) {
      console.log(`  ${r.target}:`);
      for (const w of r.warnings) {
        console.log(`    - ${w}`);
      }
    }
  }

  // Print meta.json hints
  console.log("\n📝 Don't forget to update meta.json files for navigation.\n");

  if (errors.length > 0) {
    process.exit(1);
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});

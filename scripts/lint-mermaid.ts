#!/usr/bin/env tsx

/**
 * Mermaid Diagram Linter
 *
 * This script extracts and validates Mermaid diagrams from markdown files.
 * It uses the @mermaid-js/mermaid-cli package to parse and validate diagram syntax.
 *
 * Usage:
 *   yarn lint:mermaid              # Lint all markdown files
 *   yarn lint:mermaid file.md      # Lint specific file
 *   yarn lint:mermaid **\/*.md      # Lint files matching pattern
 */

import { readFileSync, existsSync } from 'fs';
import { globSync } from 'glob';
import { join, relative } from 'path';
import { tmpdir } from 'os';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import chalk from 'chalk';

interface MermaidBlock {
  content: string;
  lineNumber: number;
  fileName: string;
}

interface ValidationResult {
  fileName: string;
  lineNumber: number;
  error: string;
}

/**
 * Extract Mermaid code blocks from a markdown file
 */
function extractMermaidBlocks(filePath: string): MermaidBlock[] {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const blocks: MermaidBlock[] = [];
  let inMermaidBlock = false;
  let currentBlock: string[] = [];
  let blockStartLine = 0;

  lines.forEach((line, index) => {
    if (line.trim().startsWith('```mermaid')) {
      inMermaidBlock = true;
      blockStartLine = index + 1; // Line numbers are 1-indexed for user display
      currentBlock = [];
    } else if (inMermaidBlock && line.trim().startsWith('```')) {
      inMermaidBlock = false;
      if (currentBlock.length > 0) {
        blocks.push({
          content: currentBlock.join('\n'),
          lineNumber: blockStartLine + 1, // +1 for 1-indexed
          fileName: filePath,
        });
      }
    } else if (inMermaidBlock) {
      currentBlock.push(line);
    }
  });

  return blocks;
}

/**
 * Validate a single Mermaid diagram using mmdc CLI
 */
function validateMermaidDiagram(block: MermaidBlock): ValidationResult | null {
  const tmpDir = mkdtempSync(join(tmpdir(), 'mermaid-lint-'));
  const inputFile = join(tmpDir, 'diagram.mmd');
  const outputFile = join(tmpDir, 'diagram.svg');

  try {
    // Write the Mermaid content to a temporary file
    writeFileSync(inputFile, block.content);

    // Try to compile the diagram using mmdc (without -q for better errors)
    execSync(`npx mmdc -i "${inputFile}" -o "${outputFile}"`, {
      stdio: 'pipe',
    });

    // If successful, no error
    return null;
  } catch (error: any) {
    // Parse the error message from stderr
    let errorMsg = 'Unknown validation error';

    if (error.stderr) {
      const stderr = error.stderr.toString();

      // Extract the main error message (first line after "Error:")
      const errorMatch = stderr.match(/Error: ([^\n]+)/);
      if (errorMatch) {
        errorMsg = errorMatch[1].trim();

        // Try to extract additional context like line number and expectation
        const parseErrorMatch = stderr.match(/Parse error on line (\d+):/);
        const expectingMatch = stderr.match(
          /Expecting (.+?)(?:\n|Parser\.parseError)/,
        );

        if (parseErrorMatch) {
          const parseLineNum = parseErrorMatch[1];
          errorMsg = `Parse error on line ${parseLineNum}: ${errorMsg}`;
        }

        if (expectingMatch) {
          // Clean up the "expecting" message
          const expecting = expectingMatch[1]
            .replace(/'/g, '"')
            .replace(/\s+/g, ' ')
            .trim();

          if (!errorMsg.includes('Expecting')) {
            errorMsg += `\n      Expecting: ${expecting}`;
          }
        }
      } else {
        // Fallback: try to get any meaningful error text
        const lines = stderr
          .split('\n')
          .filter(
            (line: string) =>
              line.trim() &&
              !line.includes('Parser.parseError') &&
              !line.includes('file:///') &&
              !line.includes('at async'),
          );

        if (lines.length > 0) {
          errorMsg = lines.slice(0, 3).join('\n      ');
        }
      }
    } else if (error.message) {
      errorMsg = error.message;
    }

    return {
      fileName: block.fileName,
      lineNumber: block.lineNumber,
      error: errorMsg,
    };
  } finally {
    // Clean up temporary files
    try {
      rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  }
}

/**
 * Main function to lint Mermaid diagrams in markdown files
 */
function lintMermaidDiagrams(filePatterns: string[]): number {
  console.log(chalk.blue('🔍 Mermaid Diagram Linter\n'));

  // Resolve file patterns to actual files
  const files = new Set<string>();
  filePatterns.forEach((pattern) => {
    if (existsSync(pattern)) {
      files.add(pattern);
    } else {
      globSync(pattern, {
        ignore: ['**/node_modules/**', '**/storybook-static/**'],
      }).forEach((file) => files.add(file));
    }
  });

  if (files.size === 0) {
    console.log(
      chalk.yellow('⚠️  No markdown files found matching the pattern'),
    );
    return 0;
  }

  console.log(chalk.gray(`Found ${files.size} markdown file(s) to check\n`));

  const errors: ValidationResult[] = [];
  let totalDiagrams = 0;

  // Process each file
  for (const file of files) {
    const blocks = extractMermaidBlocks(file);

    if (blocks.length > 0) {
      const relativePath = relative(process.cwd(), file);
      console.log(chalk.cyan(`\n📄 ${relativePath}`));
      console.log(chalk.gray(`   Found ${blocks.length} Mermaid diagram(s)`));
      totalDiagrams += blocks.length;

      // Validate each Mermaid block
      blocks.forEach((block, index) => {
        process.stdout.write(
          chalk.gray(`   Diagram ${index + 1} (line ${block.lineNumber})... `),
        );

        const result = validateMermaidDiagram(block);
        if (result) {
          console.log(chalk.red('✗ Error'));
          errors.push(result);
        } else {
          console.log(chalk.green('✓ Valid'));
        }
      });
    }
  } // Print results
  console.log();
  if (errors.length > 0) {
    console.log(
      chalk.red(
        `❌ Found ${errors.length} error(s) in ${totalDiagrams} Mermaid diagram(s):\n`,
      ),
    );

    errors.forEach((error) => {
      const relativePath = relative(process.cwd(), error.fileName);
      console.log(chalk.red.bold(`  ${relativePath}:${error.lineNumber}`));

      // Format multi-line errors with proper indentation
      const errorLines = error.error.split('\n');
      errorLines.forEach((line) => {
        console.log(chalk.gray(`    ${line}`));
      });
      console.log(); // Add blank line between errors
    });

    return 1;
  } else {
    console.log(
      chalk.green(`✅ All ${totalDiagrams} Mermaid diagram(s) are valid!`),
    );
    return 0;
  }
}

// Main execution
const args = process.argv.slice(2);
const patterns = args.length > 0 ? args : ['**/*.md'];

const exitCode = lintMermaidDiagrams(patterns);
process.exit(exitCode);

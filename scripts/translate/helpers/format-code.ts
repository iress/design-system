/**
 * Formats TSX code blocks in markdown using prettier.
 */

import { format } from 'prettier';

const PRETTIER_OPTIONS = {
  parser: 'typescript',
  singleQuote: true,
  trailingComma: 'all' as const,
  semi: true,
  printWidth: 80,
  tabWidth: 2,
};

export async function formatCodeBlocks(markdown: string): Promise<string> {
  const parts = markdown.split(/(```tsx\n[\s\S]*?```)/g);

  const formatted = await Promise.all(
    parts.map(async (part, i) => {
      // Odd indices are code blocks
      if (i % 2 === 0) return part;

      // Extract code from the fenced block
      const code = part.slice(6, -3).trim(); // Remove ```tsx\n and ```

      try {
        const pretty = await format(code, PRETTIER_OPTIONS);
        return '```tsx\n' + pretty.trim() + '\n```';
      } catch {
        // If prettier fails, return original
        return part;
      }
    }),
  );

  return formatted.join('');
}

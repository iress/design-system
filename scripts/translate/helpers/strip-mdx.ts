/**
 * Strips MDX-specific syntax, returning clean markdown.
 * Preserves: headings, prose, code blocks, inline code, tables, lists.
 * Removes: imports, exports, JSX components outside code/tables.
 *
 * If keepStoryEmbeds is true, <StoryEmbed> tags are preserved as markers
 * for later resolution in Phase C.
 */
export function stripMdx(source: string, keepStoryEmbeds = false): string {
  // Split by code fences to avoid processing inside code blocks
  const parts = source.split(/(```[\s\S]*?```)/g);

  const processed = parts.map((part, i) => {
    // Odd indices are code blocks — leave untouched
    if (i % 2 === 1) return part;

    // Process line by line to preserve table rows and inline code
    const cleaned = part
      // Remove multi-line export const meta blocks first
      .replace(/export\s+const\s+meta\s*=\s*\{[\s\S]*?\};\n*/g, '');

    const lines = cleaned.split('\n');
    const result = lines
      .map((line) => {
        // Skip table rows (contain |) — preserve JSX in table cells
        if (line.trim().startsWith('|') && line.includes('|')) return line;

        // Skip lines that are only inline code
        if (line.trim().startsWith('`') && line.trim().endsWith('`')) return line;

        // Remove import statements
        if (/^import\s+/.test(line)) return '';
        // Remove export const meta
        if (/^export\s+const\s+\w+\s*=/.test(line)) return null; // mark for block removal

        // Convert IressTabSet/IressTab to markdown headings
        if (/^\s*<IressTabSet[\s>]/.test(line)) return '';
        if (/^\s*<\/IressTabSet>/.test(line)) return '';
        if (/^\s*<\/IressTab>/.test(line)) return '';
        const tabMatch = line.match(/^\s*<IressTab\s+label="([^"]+)"/);
        if (tabMatch) return `### ${tabMatch[1]}`;

        // Remove standalone JSX components (full line)
        if (/^\s*<Metadata[^/]*\/>/.test(line)) return '';
        if (/^\s*<Breakpoints\s*\/>/.test(line)) return '';
        // Convert <IressButton href="url">text</IressButton> to [text](url)
        if (/<IressButton/.test(line)) {
          return line.replace(
            /<IressButton[^>]*href="([^"]+)"[^>]*>([^<]+)<\/IressButton>/g,
            '[$2]($1)',
          );
        }

        if (!keepStoryEmbeds && /^\s*<StoryEmbed[^/]*\/>/.test(line)) return '';

        // Remove other self-closing JSX on their own line
        if (/^\s*<[A-Z]\w+[^>]*\/>\s*$/.test(line)) {
          if (keepStoryEmbeds && line.includes('StoryEmbed')) return line;
          return '';
        }

        return line;
      })
      .filter((line) => line !== null)
      .join('\n');

    return result;
  });

  return processed
    .join('')
    // Transform internal links: (/any/path) -> (../any/path.md), (/any/path#hash) -> (../any/path.md#hash)
    .replace(/\]\(\/([^)#\s]+)(#[^)]*)?\)/g, '](../$1.md$2)')
    // Collapse 3+ newlines to 2
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

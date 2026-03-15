import { SPACING_ALIAS_MAP } from './spacingAliasMap';

/**
 * Strips leftover alias utility classes and :root variable definitions
 * from the final CSS. These are extracted from source files by Panda but
 * are unused since the runtime now maps aliases to canonical tokens.
 */
export function cssgenDoneHook(
  artifact: string,
  content: string,
): string | void {
  if (artifact !== 'styles.css') return;

  const aliases = Object.keys(SPACING_ALIAS_MAP);
  let css = content;

  for (const alias of aliases) {
    // Remove alias utility classes that reference var(--spacing-ALIAS)
    css = css.replace(
      new RegExp(
        `\\.[^\\s,{}]+_-?${alias}\\{[^}]*var\\(--spacing-${alias}\\)[^}]*\\}`,
        'g',
      ),
      '',
    );
    // Remove alias :root variable definitions
    css = css.replace(new RegExp(`--spacing-${alias}:[^;]+;`, 'g'), '');
  }

  return css;
}

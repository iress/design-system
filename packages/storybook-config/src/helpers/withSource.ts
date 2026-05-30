import type { SourceProps } from '@storybook/addon-docs/blocks';

interface WithSourceOptions {
  /** Language for syntax highlighting. Defaults to 'tsx'. */
  language?: string;
  /** Props interface name to remove from the source (e.g. 'Props', 'IressAlertProps'). */
  replacePropsType?: string;
  /** Prop names to strip from the component usage in the source. */
  removeProps?: string[];
  /** Remove import statements from the displayed source. Defaults to false. */
  stripImports?: boolean;
  /** Extract just the return JSX from `export function X() { return (...) }`. Defaults to false. */
  stripExportFunction?: boolean;
  /** Format the source with prettier. Defaults to true. */
  format?: boolean;
}

/**
 * Applies all string transformations to source code.
 */
function transformSource(source: string, options?: WithSourceOptions): string {
  let code = source;

  // Always replace internal alias with published package name
  code = code.replace(
    /from\s+['"]@\/main['"]/g,
    "from '@iress-oss/ids-components'",
  );

  // Remove props interface if specified
  if (options?.replacePropsType) {
    const propsType = options.replacePropsType;
    code = code.replace(
      new RegExp(
        `(interface|type)\\s+${propsType}\\s*[={][\\s\\S]*?\\}\\s*;?\\n?`,
      ),
      '',
    );
    code = code.replace(new RegExp(`:\\s*${propsType}`), '');
  }

  // Remove specified props from component usage
  if (options?.removeProps?.length) {
    for (const prop of options.removeProps) {
      code = code.replace(
        new RegExp(`\\s+${prop}(=\\{[^}]*\\}|="[^"]*"|)`, 'g'),
        '',
      );
    }
  }

  // Strip import statements if requested
  if (options?.stripImports) {
    code = code.replace(/^import\s+.*;\s*\n/gm, '');
  }

  // Extract just the return JSX from export function
  if (options?.stripExportFunction) {
    const match = code.match(/export function \w+\([^)]*\)\s*\{[\s\S]*?return\s*\(\s*([\s\S]*)\s*\);\s*\}/);
    if (match) {
      code = match[1];
    }
  }

  // Clean up empty lines left by removals and trim
  code = code.replace(/\n{3,}/g, '\n\n').trim();

  // Replace serialized DOM elements with their readable equivalents
  code = code.replace(/\{\s*_react[^}]*\}/gs, 'document.body');

  return code;
}

/**
 * Formats code with prettier. Returns unformatted code if formatting fails.
 */
async function formatWithPrettier(code: string): Promise<string> {
  try {
    const prettier = await import('prettier/standalone');
    const babel = await import('prettier/plugins/babel');
    const estree = await import('prettier/plugins/estree');

    const formatted = await prettier.format(code, {
      parser: 'babel-ts',
      plugins: [babel.default ?? babel, estree.default ?? estree],
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 80,
      semi: true,
    });

    return formatted.trim();
  } catch {
    return code;
  }
}

/**
 * Provides a custom source for a story's code panel.
 *
 * Consolidates `withCustomSource`, `withTransformedRawSource`, and
 * `withTransformedProviderSource` into a single helper.
 *
 * Always transforms `@/main` → `@iress-oss/ids-components`.
 *
 * @param source Raw source string (usually from `?raw` import) or a transform function.
 * @param options Optional transformations to apply.
 * @returns Parameters object to spread into story parameters.
 *
 * @example
 * // Simple raw source (formatted, imports kept)
 * parameters: { ...withSource(AlertStatusSource) }
 *
 * @example
 * // Strip imports for cleaner Storybook display
 * parameters: { ...withSource(AlertStatusSource, { stripImports: true }) }
 *
 * @example
 * // With props type removal
 * parameters: { ...withSource(TableSource, { replacePropsType: 'Props' }) }
 *
 * @example
 * // No formatting (raw output)
 * parameters: { ...withSource(AlertStatusSource, { format: false }) }
 *
 * @example
 * // With a transform function (advanced)
 * parameters: { ...withSource((code) => code.replace(/foo/g, 'bar')) }
 *
 * @remarks
 * **Storybook quirk:** When using `withSource` with a mock component, the story's
 * `render` function MUST accept and spread `args` even if the mock ignores them:
 *
 * ```tsx
 * // ✅ Correct — Storybook's code panel works
 * render: (args) => <AlertStatus {...args} />,
 * parameters: { ...withSource(AlertStatusSource, { stripImports: true }) },
 *
 * // ❌ Broken — Storybook won't display code properly
 * render: () => <AlertStatus />,
 * ```
 *
 * The mock file itself does NOT need to accept args — it uses concrete props.
 * The `(args) => <Mock {...args} />` pattern is purely to satisfy Storybook's
 * internal source detection in autodocs `ComponentCanvas`.
 */
export function withSource(
  source: string | Exclude<SourceProps['transform'], undefined>,
  options?: WithSourceOptions,
): Record<string, unknown> {
  const language = options?.language ?? 'tsx';
  const shouldFormat = options?.format !== false;

  // Transform function mode
  if (typeof source === 'function') {
    return {
      docs: {
        source: {
          transform: source,
          language,
        },
      },
    };
  }

  // Apply string transformations
  const code = transformSource(source, options);

  // If formatting is enabled, use Storybook's transform API to format async
  // Always include `code` as well — the sandbox addon reads it directly
  if (shouldFormat) {
    return {
      docs: {
        source: {
          code,
          transform: async () => formatWithPrettier(code),
          language,
        },
      },
    };
  }

  return {
    docs: {
      source: {
        code,
        language,
      },
    },
  };
}

// Exported for testing
export { transformSource, formatWithPrettier };

/**
 * @deprecated Use `withSource` instead.
 */
export const withCustomSource = (
  code: string,
  language = 'tsx',
): Record<string, unknown> => withSource(code, { language, format: false });

/**
 * @deprecated Use `withSource` with `replacePropsType` option instead.
 */
export const withTransformedRawSource = (
  rawSource: string,
  propsInterface: string,
  omitArgs?: string[],
): Record<string, unknown> =>
  withSource(rawSource, {
    replacePropsType: propsInterface,
    removeProps: omitArgs,
    format: false,
  });

import { Canvas, type SourceProps, useOf } from '@storybook/addon-docs/blocks';
import { addons } from 'storybook/internal/preview-api';
import { FORCE_REMOUNT } from 'storybook/internal/core-events';
import {
  type ComponentProps,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import {
  IressStorybookContext,
  type IressStorybookContextProps,
} from './IressStorybookContext';
import { type GetSandboxProps, getSandboxUrl } from '~/helpers/getSandboxUrl';
import ComponentCanvasHTML from './ComponentCanvas.html?raw';
import ComponentCanvasTemplate from './ComponentCanvas.template.tsx?raw';

const COMMON_TRANSFORMERS: Record<string, (code: string) => string> = {
  removeWhiteSpaces: (oldCode: string) => oldCode.trim(),
  replaceBodyElement: (oldCode: string) =>
    oldCode
      .replace(
        /{\s+'_constructor-name_': 'HTMLBodyElement',?\s+}/gm,
        'document.body',
      )
      .replace(/\[object HTMLBodyElement\]/g, 'document.body'),
};

type CanvasProps = ComponentProps<typeof Canvas>;

interface ParametersConfig {
  parameters?: {
    docs?: {
      source?: {
        code?: string;
        transform?: SourceProps['transform'];
      };
    };
    codeSandbox?: IressStorybookContextProps['codeSandbox'] & GetSandboxProps;
  };
}

export interface ComponentCanvasProps
  extends Omit<CanvasProps, 'additionalTransformers'> {
  /**
   * Allow refreshing the canvas.
   * Useful for resetting if the story has side effects.
   */
  refresh?: boolean;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const transformCode = (
  code: string,
  transformers: Record<string, (code: string) => string>,
): string =>
  Object.values(transformers)
    .reduce((newCode, transformer) => transformer(newCode), code)
    .trim();

// =============================================================================
// CODE ANALYSIS UTILITIES
// =============================================================================

/**
 * Extract all custom components from JSX using regex
 */
function getCustomComponents(code: string): string[] {
  const regex = /<([A-Z][A-Za-z0-9]*)\b/g;
  const components = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    components.add(match[1]);
  }

  return Array.from(components);
}

/**
 * Parse a single import line and extract component names and source
 */
function parseImportLine(
  line: string,
): { components: string[]; source: string } | null {
  const trimmedLine = line.trim();

  if (!trimmedLine.startsWith('import ')) {
    return null;
  }

  const fromIndex = trimmedLine.lastIndexOf(' from ');
  if (fromIndex === -1) {
    return null;
  }

  // Extract source (remove quotes)
  const sourceWithQuotes = trimmedLine.slice(fromIndex + 6).trim();
  const source = sourceWithQuotes.slice(1, -1);

  // Extract import part
  const importPart = trimmedLine.slice(6, fromIndex).trim();

  const components: string[] = [];

  // Handle named imports { ... }
  if (importPart.startsWith('{') && importPart.endsWith('}')) {
    const namedImports = importPart.slice(1, -1);
    namedImports.split(',').forEach((name: string) => {
      const trimmed = name.trim();
      if (trimmed) {
        components.push(trimmed);
      }
    });
  }
  // Handle default imports
  else {
    const defaultImportRegex = /^\w+$/;
    if (defaultImportRegex.exec(importPart)) {
      components.push(importPart);
    }
  }

  return { components, source };
}

/**
 * Detect existing imports: returns { ComponentName: source }
 */
function getExistingImports(code: string): Record<string, string> {
  const imports: Record<string, string> = {};
  const lines = code.split('\n');

  for (const line of lines) {
    const parsed = parseImportLine(line);
    if (parsed) {
      parsed.components.forEach((component) => {
        imports[component] = parsed.source;
      });
    }
  }

  return imports;
}

/**
 * Detect locally defined components (const, function, class)
 */
function getLocalComponents(code: string): string[] {
  const regex = /(?:const|let|var|function|class)\s+([A-Z][A-Za-z0-9]*)\b/g;
  const locals = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    locals.add(match[1]);
  }

  return Array.from(locals);
}

// =============================================================================
// IMPORT INJECTION UTILITIES
// =============================================================================

/**
 * Find components that need to be imported
 */
function findMissingComponents(
  template: string,
  existingImports: Record<string, string>,
  localComponents: string[],
): string[] {
  const jsxComponents = getCustomComponents(template);

  return jsxComponents.filter(
    (component) =>
      !localComponents.includes(component) && !existingImports[component],
  );
}

/**
 * Update existing import line with additional components
 */
function updateExistingImport(
  template: string,
  library: string,
  missingComponents: string[],
): string {
  const escapedLibrary = library.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const importRegex = new RegExp(
    `import\\s+\\{([^}]+)\\}\\s+from\\s+["']${escapedLibrary}["']`,
  );

  return template.replace(importRegex, (match, group1: string) => {
    const existing = group1
      .split(',')
      .map((c: string) => c.trim())
      .filter(Boolean);
    const merged = Array.from(new Set([...existing, ...missingComponents]));
    return `import { ${merged.join(', ')} } from '${library}'`;
  });
}

/**
 * Add new import line after the last existing import
 */
function addNewImport(
  template: string,
  library: string,
  missingComponents: string[],
): string {
  const lastImportIndex = template.lastIndexOf('import');
  const insertPos =
    template.indexOf('\n', template.indexOf('\n', lastImportIndex) + 1) + 1;

  return (
    template.slice(0, insertPos) +
    `import { ${missingComponents.join(', ')} } from '${library}';\n` +
    template.slice(insertPos)
  );
}

/**
 * Inject missing imports into user-provided template
 */
function injectImports(
  template: string,
  library = '@iress-oss/ids-components',
): string {
  const existingImports = getExistingImports(template);
  const localComponents = getLocalComponents(template);
  const missingComponents = findMissingComponents(
    template,
    existingImports,
    localComponents,
  );

  if (missingComponents.length === 0) {
    return template;
  }

  const escapedLibrary = library.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const importRegex = new RegExp(
    `import\\s+\\{([^}]+)\\}\\s+from\\s+["']${escapedLibrary}["']`,
  );

  if (importRegex.test(template)) {
    return updateExistingImport(template, library, missingComponents);
  } else {
    return addNewImport(template, library, missingComponents);
  }
}

// =============================================================================
// ACTION CREATORS
// =============================================================================

/**
 * Create CodeSandbox action with proper file structure
 */
function createCodeSandboxAction(
  renderedCode: React.MutableRefObject<string | null>,
  mergedCodeSandbox: {
    html?: string;
    dependencies?: Record<string, string>;
    files?: Record<string, { content: string; isBinary: boolean }>;
  },
) {
  return {
    title: 'Open in CodeSandbox',
    onClick: () => {
      window.open(
        getSandboxUrl({
          files: {
            'index.tsx': {
              content: renderedCode.current ?? '',
              isBinary: false,
            },
            'index.html': {
              content: mergedCodeSandbox?.html ?? ComponentCanvasHTML,
              isBinary: false,
            },
            'package.json': {
              content: JSON.stringify(
                {
                  dependencies: {
                    react: 'latest',
                    'react-dom': 'latest',
                    ...mergedCodeSandbox?.dependencies,
                  },
                },
                null,
                2,
              ),
              isBinary: false,
            },
            ...mergedCodeSandbox?.files,
          },
        }),
        '_blank',
      );
    },
  };
}

/**
 * Create refresh action for canvas reset
 */
function createRefreshAction(
  context: { story: { id: string } },
  restProps: { story?: { inline?: boolean } },
) {
  return {
    title: 'Refresh',
    onClick: () => {
      if (restProps?.story?.inline === false) {
        const iframes = [
          ...document.querySelectorAll(`[id="iframe--${context.story.id}"]`),
        ] as HTMLIFrameElement[];
        iframes?.forEach((iframe) => {
          iframe?.contentWindow?.location.reload();
        });
      } else {
        addons.getChannel().emit(FORCE_REMOUNT, { storyId: context.story.id });
      }
    },
  };
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * This is an extended version of the Storybook Canvas component that adds additional functionality
 * such as code transformers and a refresh action.
 */
export const ComponentCanvas = ({
  additionalActions = [],
  refresh,
  ...restProps
}: ComponentCanvasProps) => {
  // Context and configuration
  const context = useOf<'story'>(restProps.of);
  const contextWithParams = context as ParametersConfig | undefined;
  const docsConfig = contextWithParams?.parameters?.docs;
  const { codeSandbox = {} } = useContext(IressStorybookContext);

  // State management
  const renderedCode = useRef<string | null>(
    restProps?.source?.code ?? docsConfig?.source?.code ?? null,
  );

  // Merge configurations
  const mergedCodeSandbox = {
    ...codeSandbox,
    ...contextWithParams?.parameters?.codeSandbox,
  };

  // Memoized transformers
  const transformers = useMemo(() => {
    if (mergedCodeSandbox?.additionalTransformers) {
      return {
        ...COMMON_TRANSFORMERS,
        ...mergedCodeSandbox.additionalTransformers,
      };
    }
    return COMMON_TRANSFORMERS;
  }, [mergedCodeSandbox?.additionalTransformers]);

  // Template and source configuration
  const templateSource = mergedCodeSandbox?.template ?? ComponentCanvasTemplate;
  const source = docsConfig?.source?.code
    ? {
        ...restProps?.source,
        code: transformCode(docsConfig.source.code, transformers),
      }
    : restProps?.source;

  // Transform handler
  const handleTransform = useCallback<
    Exclude<SourceProps['transform'], undefined>
  >(
    async (code, transformContext) => {
      const transformFn = source?.transform ?? docsConfig?.source?.transform;

      let transformed = transformCode(
        (await transformFn?.(code, transformContext)) ?? code,
        transformers,
      );

      // Apply template if no custom source code
      if (!docsConfig?.source?.code) {
        transformed = templateSource.replace('<Story />', transformed);
      }

      // Inject imports if package name is specified
      if (mergedCodeSandbox?.storyPackageName) {
        transformed = injectImports(
          transformed,
          mergedCodeSandbox.storyPackageName,
        );
      }

      renderedCode.current = transformed;
      return transformed;
    },
    [
      source?.transform,
      transformers,
      templateSource,
      docsConfig?.source?.code,
      mergedCodeSandbox?.storyPackageName,
    ],
  );

  // Build actions array
  const actions = [...additionalActions];

  // Add CodeSandbox action
  actions.push(createCodeSandboxAction(renderedCode, mergedCodeSandbox));

  // Add refresh action if enabled
  if (refresh) {
    actions.push(createRefreshAction(context, restProps));
  }

  return (
    <Canvas
      {...restProps}
      additionalActions={actions}
      source={{
        ...source,
        transform: handleTransform,
      }}
    />
  );
};

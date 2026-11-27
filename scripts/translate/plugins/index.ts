/**
 * Plugin system for component-specific transformations.
 * - StoryPlugin: transforms excluded args into children JSX
 * - StoryOverridePlugin: generates markdown/code for specific stories by ID
 */

export interface StoryPlugin {
  /** Components this plugin applies to */
  components: string[];
  /** Transform excluded args into children JSX */
  renderChildren?: (excludedArgs: Record<string, string>) => string | null;
  /** Transform a children value (e.g. replace Storybook control keys with real content) */
  transformChildren?: (children: string) => string | null;
}

export interface StoryOverridePlugin {
  /** Story IDs this plugin handles (e.g. 'components-hide--breakpoint-table') */
  stories: string[];
  /** Generate the output for this story — markdown or fenced code */
  render: (storyId: string) => string;
}

/**
 * Converts a raw object string like `{ id: 'name', required: true }` into JSX props.
 */
function propsFromRaw(raw: string): string {
  // Strip outer braces
  const inner = raw.replace(/^\{|\}$/g, '').trim();
  const props: string[] = [];

  for (const part of splitTopLevel(inner)) {
    const match = part.trim().match(/^(\w+):\s*([\s\S]+)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (value === 'true') props.push(key);
    else if (/^['"].*['"]$/.test(value)) props.push(`${key}=${value.replace(/^'|'$/g, '"')}`);
    else props.push(`${key}={${value}}`);
  }

  return props.join(' ');
}

/** Split by top-level commas (not inside nested braces/brackets) */
function splitTopLevel(str: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '{' || ch === '[' || ch === '(') depth++;
    else if (ch === '}' || ch === ']' || ch === ')') depth--;
    else if (ch === ',' && depth === 0) {
      parts.push(str.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(str.slice(start));
  return parts;
}

// --- Plugins ---

/** Storybook control keys that are not real content */
const CHILDREN_CONTROL_KEYS = new Set([
  'text', 'paragraphs', 'story', 'even', 'uneven', 'none',
  'basic', 'hello', 'details', 'menu',
  'inlineChildren', 'list',
]);

const childrenMappingPlugin: StoryPlugin = {
  components: ['IressPanel', 'IressInline', 'IressStack', 'IressCard', 'IressPopover', 'IressForm'],
  transformChildren(children) {
    if (CHILDREN_CONTROL_KEYS.has(children)) {
      return '<p>Content goes here.</p>';
    }
    // Form children mapping keys (variable references)
    if (children.includes('formArgTypes') || children.includes('.mapping.')) {
      return null; // Omit — form children are complex field configurations
    }
    return children;
  },
};

const fieldPlugin: StoryPlugin = {
  components: ['IressField'],
  renderChildren(excludedArgs) {
    if (excludedArgs.input) {
      return `<IressInput ${propsFromRaw(excludedArgs.input)} />`;
    }
    return null;
  },
};

const fieldGroupPlugin: StoryPlugin = {
  components: ['IressFieldGroup'],
  renderChildren(excludedArgs) {
    if (excludedArgs.inputs) {
      return [
        `<IressField label="First name" htmlFor="firstName">`,
        `  <IressInput id="firstName" />`,
        `</IressField>`,
        `<IressField label="Last name" htmlFor="lastName">`,
        `  <IressInput id="lastName" />`,
        `</IressField>`,
      ].join('\n');
    }
    return null;
  },
};

// --- Registry ---

const plugins: StoryPlugin[] = [childrenMappingPlugin, fieldPlugin, fieldGroupPlugin];

const pluginMap = new Map<string, StoryPlugin>();
for (const plugin of plugins) {
  for (const comp of plugin.components) {
    pluginMap.set(comp, plugin);
  }
}

export function getPlugin(componentName: string): StoryPlugin | undefined {
  return pluginMap.get(componentName);
}

// --- Story Override Plugins ---

import { join } from 'path';
import { readFileSync, existsSync, readdirSync } from 'fs';

const ROOT = join(import.meta.dirname, '../../..');

const breakpointTablePlugin: StoryOverridePlugin = {
  stories: [
    'components-hide--breakpoint-table',
    'foundations--col-breakpoints',
    'foundations--container-breakpoints',
    'foundations--designer-breakpoints',
    'foundations--xs',
    'foundations--sm',
    'foundations--md',
    'foundations--lg',
    'foundations--xl',
    'foundations--xxl',
  ],
  render(storyId: string) {
    const source = readFileSync(join(ROOT, 'packages/theme-preset/src/constants.ts'), 'utf-8');

    // Per-breakpoint detail (e.g. foundations--xs)
    const bpMatch = storyId.match(/^foundations--(\w+)$/);
    if (bpMatch) {
      const bp = bpMatch[1];
      const bpRegex = new RegExp(`${bp}:\\s*\\{([^}]*(?:\\{[^}]*\\}[^}]*)*)\\}`, 's');
      const detail = source.match(bpRegex);
      if (detail) {
        const body = detail[1];
        const get = (key: string) => body.match(new RegExp(`${key}:\\s*'([^']+)'`))?.[1] ?? '';
        return [
          `| Property | Value |`,
          `|----------|-------|`,
          `| Screen widths | ${get('screenWidthRange')} |`,
          `| Min screen width | ${get('minScreenWidth')} |`,
          get('maxScreenWidth') ? `| Max screen width | ${get('maxScreenWidth')} |` : null,
          `| Container max width | ${get('containerMaxWidth')} |`,
          `| Margin | \`${get('margin')}\` |`,
        ].filter(Boolean).join('\n');
      }
    }

    // Full breakpoint table
    const rows: string[] = [];
    const regex = /(\w+):\s*\{[^}]*screenWidthRange:\s*'([^']+)'/g;
    let m;
    while ((m = regex.exec(source)) !== null) {
      rows.push(`| \`${m[1]}\` | ${m[2]} |`);
    }
    if (rows.length === 0) return '';
    return ['| Breakpoint | Screen Widths |', '|------------|---------------|', ...rows].join('\n');
  },
};

const faMigrationPlugin: StoryOverridePlugin = {
  stories: ['components-icon--font-awesome-to-material-migration'],
  render(_storyId: string) {
    const source = readFileSync(join(ROOT, 'packages/components/src/components/Icon/helpers/iconMapping.ts'), 'utf-8');
    const rows: string[] = [];
    const regex = /'([^']+)':\s*'([^']+)'/g;
    let m;
    while ((m = regex.exec(source)) !== null) {
      if (m[1] !== m[2]) rows.push(`| \`${m[1]}\` | \`${m[2]}\` |`);
    }
    return ['| Font Awesome | Material Symbol |', '|-------------|-----------------|', ...rows].join('\n');
  },
};

const iconBrowserPlugin: StoryOverridePlugin = {
  stories: ['components-icon--icons'],
  render(_storyId: string) {
    return [
      'Icons use [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) via the `name` prop. The AI model already knows Material Symbol names — use any valid name directly.',
      '',
      '```tsx',
      '<IressIcon name="home" />',
      '<IressIcon name="settings" filled />',
      '<IressIcon name="arrow_forward" />',
      '```',
      '',
      'Also supports legacy Font Awesome names (e.g. `info-circle`, `times`, `chevron-down`) for migration compatibility.',
    ].join('\n');
  },
};

const zIndexPlugin: StoryOverridePlugin = {
  stories: ['foundations--z-index'],
  render(_storyId: string) {
    const source = readFileSync(join(ROOT, 'packages/theme-preset/src/constants.ts'), 'utf-8');
    const storySource = readFileSync(join(ROOT, 'packages/components/src/Foundation.stories.tsx'), 'utf-8');

    // Extract Z_INDEX values
    const zMatch = source.match(/Z_INDEX = \{([\s\S]*?)\};/);
    if (!zMatch) return '';
    const entries: Array<[string, string]> = [];
    for (const line of zMatch[1].split('\n')) {
      const m = line.match(/(\w+):\s*(\d+)/);
      if (m) entries.push([m[1], m[2]]);
    }

    // Extract usage descriptions
    const usageMatch = storySource.match(/zIndexUsage[^{]*\{([\s\S]*?)\};/);
    const usageMap: Record<string, string> = {};
    if (usageMatch) {
      const regex = /(\w+):\s*[`'"]([^`'"]+)[`'"]/g;
      let um;
      while ((um = regex.exec(usageMatch[1])) !== null) {
        usageMap[um[1]] = um[2];
      }
    }

    const rows = entries.map(([name, value]) =>
      `| \`${name}\` | ${usageMap[name] ?? ''} | ${value} |`
    );
    return ['| Name | Usage | Value |', '|------|-------|-------|', ...rows].join('\n');
  },
};

const feedbackPlugin: StoryOverridePlugin = {
  stories: ['patterns-feedback--decision-tree'],
  render(_storyId: string) {
    return [
      '**Choose the right feedback component:**',
      '',
      '| Scenario | Component | Example |',
      '|----------|-----------|---------|',
      '| Brief confirmation (auto-dismisses) | Toast | `success({ content: \'Record saved\' })` |',
      '| Persistent page-level info | Alert | `<IressAlert status="info">Session info</IressAlert>` |',
      '| Blocking decision required | Modal | `<IressModal heading="Confirm">Are you sure?</IressModal>` |',
      '| Inline field-level error | ValidationMessage | `<IressValidationMessage status="danger">Required</IressValidationMessage>` |',
      '',
      '```tsx',
      '// Toast — transient confirmation',
      'const { success } = useToaster();',
      "success({ content: 'Record saved' });",
      '',
      '// Alert — persistent inline message',
      '<IressAlert status="warning">Session expires in 5 minutes</IressAlert>',
      '',
      '// Modal — blocking decision',
      '<IressModal heading="Delete record?" show={showModal}>',
      '  Are you sure you want to delete this?',
      '</IressModal>',
      '```',
    ].join('\n');
  },
};

const formPlugin: StoryOverridePlugin = {
  stories: ['patterns-form--simple', 'patterns-form--fields'],
  render(storyId: string) {
    if (storyId === 'patterns-form--simple') {
      return [
        '```tsx',
        '<IressForm pattern="short">',
        '  <IressFormField',
        '    name="name"',
        '    label="Name"',
        '    rules={{ required: \'Name is required\' }}',
        '    render={(controlledProps) => <IressInput {...controlledProps} />}',
        '  />',
        '  <IressFormField',
        '    name="email"',
        '    label="Email"',
        '    rules={{ required: \'Email is required\' }}',
        '    render={(controlledProps) => <IressInput {...controlledProps} type="email" />}',
        '  />',
        '</IressForm>',
        '```',
      ].join('\n');
    }
    // fields — generate from supportedFormFields.tsx source of truth
    const source = readFileSync(
      join(ROOT, 'packages/components/src/patterns/Form/mocks/supportedFormFields.tsx'),
      'utf-8',
    );
    const rows: string[] = [];
    const regex = /(\w+):\s*\{\s*formField:[\s\S]*?renderSnippet:\s*`([^`]+)`/g;
    let m;
    while ((m = regex.exec(source)) !== null) {
      const component = m[1];
      const snippet = m[2].replace(/\n\s*/g, ' ').trim();
      const usesFieldset = source.slice(Math.max(0, m.index - 200), m.index + m[0].length).includes('IressFormFieldset');
      const wrapper = usesFieldset ? '`IressFormFieldset`' : '`IressFormField`';
      rows.push(`| \`${component}\` | ${wrapper} | \`render={${snippet}}\` |`);
    }
    return [
      '| Control | Wrapper | `render` prop |',
      '|---------|---------|--------------|',
      ...rows,
    ].join('\n');
  },
};

const searchSelectionPlugin: StoryOverridePlugin = {
  stories: ['patterns-search-selection--decision-tree'],
  render(_storyId: string) {
    return [
      '**Choose the right search/selection component:**',
      '',
      '| Scenario | Component |',
      '|----------|-----------|',
      '| User types to filter, selects a form value | `IressAutocomplete` |',
      '| User picks from a predefined list (single or multi) | `IressSelect` |',
      '| User picks an action from a filtered menu | `IressDropdownMenu` |',
      '| Custom popover triggered by input (e.g. date picker) | `IressInputPopover` |',
      '| Fully custom floating content | `IressPopover` |',
      '',
      '**Key differences:**',
      '',
      '- **Autocomplete**: Free-text allowed, async options, value is a string',
      '- **Select**: Must pick from list, supports multi-select and grouped options',
      '- **DropdownMenu**: Actions (not form values), filterable, supports sections',
      '- **InputPopover**: Low-level building block for custom input-triggered popovers',
      '- **Popover**: Generic floating panel, no built-in search/selection logic',
    ].join('\n');
  },
};

const stylingPropsReferencePlugin: StoryOverridePlugin = {
  stories: ['styling-props-reference--reference'],
  render(_storyId: string) {
    const source = readFileSync(
      join(ROOT, 'packages/components/src/styling-props/stylingPropsReference.ts'),
      'utf-8',
    );
    const rows: string[] = [];
    const regex = /jsxProp:\s*'([^']+)'[\s\S]*?cssProperty:\s*'([^']+)'[\s\S]*?tokenMapping:\s*(?:'([^']+)'|\[([^\]]+)\])[\s\S]*?responsive:\s*(true|false)/g;
    let m;
    while ((m = regex.exec(source)) !== null) {
      const prop = m[1];
      const css = m[2];
      const token = m[3] ?? m[4]?.replace(/'/g, '').trim() ?? 'N/A';
      const responsive = m[5] === 'true' ? '✓' : '';
      rows.push(`| \`${prop}\` | \`${css}\` | ${token} | ${responsive} |`);
    }
    return ['| Prop | CSS Property | Token | Responsive |', '|------|-------------|-------|------------|', ...rows].join('\n');
  },
};

const TOKEN_STORY_SECTIONS: Record<string, string> = {
  'colour--neutral': '### Neutral',
  'colour--primary': '### Primary',
  'colour--accent': '### Accent',
  'colour--success': '### System — Success',
  'colour--danger': '### System — Danger',
  'colour--warning': '### System — Warning',
  'colour--info': '### System — Info',
  'colour--data-subtle': '### Data — Subtle',
  'colour--data-bold': '### Data — Bold',
  'colour--global-interactions': '### GlobalInteractions',
  'radius--radius': '### Scale Tokens',
  'radius--system': '### System Tokens',
  'spacing--spacing': '## Spacing Tokens',
  'typography--base': '### Base',
  'typography--headings': '### Headings',
  'typography--body': '### Body — Small',
  'typography--code': '### Code',
  'introduction--reference': '## Colour Tokens',
};

const tokenStoriesPlugin: StoryOverridePlugin = {
  stories: Object.keys(TOKEN_STORY_SECTIONS),
  render(storyId: string) {
    const sectionHeading = TOKEN_STORY_SECTIONS[storyId];
    if (!sectionHeading) return '';

    const refPath = join(ROOT, 'packages/tokens/.ai/tokens-reference.md');
    if (!existsSync(refPath)) return '';

    const source = readFileSync(refPath, 'utf-8');
    // Determine heading level (## = 2, ### = 3)
    const level = sectionHeading.startsWith('### ') ? 3 : 2;
    // Stop at any heading at the same level or higher (fewer #'s)
    const nextHeadingRegex = level === 3
      ? /\n#{2,3} \S/  // Stop at ## or ###
      : /\n## \S/;      // Stop at ##

    const startIdx = source.indexOf(sectionHeading);
    if (startIdx === -1) return '';

    // Find the end: next heading at same or higher level, or end of file
    const afterHeading = source.slice(startIdx + sectionHeading.length);
    const endMatch = afterHeading.search(nextHeadingRegex);
    const section = endMatch === -1
      ? afterHeading.trim()
      : afterHeading.slice(0, endMatch).trim();

    // For the introduction--reference, just return the first section
    if (storyId === 'introduction--reference') {
      return 'See [tokens-reference.md](./tokens-reference.md) for the complete token reference.';
    }

    // For typography--body, capture from "Body — Small" to "Code" (both sm and md)
    if (storyId === 'typography--body') {
      const bodyStart = source.indexOf('### Body — Small');
      const codeStart = source.indexOf('### Code');
      if (bodyStart !== -1 && codeStart !== -1) {
        return source.slice(bodyStart + '### Body — Small'.length, codeStart).trim();
      }
    }

    return section;
  },
};

/**
 * Replaces Introduction docs embeds with a component/pattern listing table.
 * These are Storybook visual component browsers — in .ai/ output, we generate
 * a useful reference table from the built package meta.
 */
let _componentTable: string | null = null;

function getComponentTable(): string {
  if (_componentTable) return _componentTable;
  try {
    // Read all meta exports from the built dist to generate a listing
    const metaDir = join(ROOT, 'packages/components/dist/components');
    if (!existsSync(metaDir)) return 'Browse the individual component docs in this directory.';

    // Dynamically import can't be used here synchronously, so read from the source meta files
    const metaSrcDir = join(ROOT, 'packages/components/src');
    const components: { name: string; description: string; slug: string }[] = [];

    // Scan component meta dirs
    const componentsDir = join(metaSrcDir, 'components');
    for (const dir of readdirSync(componentsDir)) {
      const metaFile = join(componentsDir, dir, 'meta', 'index.tsx');
      if (!existsSync(metaFile)) continue;
      const content = readFileSync(metaFile, 'utf-8');
      const headingMatch = content.match(/heading:\s*['"]([^'"]+)['"]/);
      const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
      if (headingMatch && descMatch) {
        const slug = dir.replace(/([A-Z])/g, (_, c, i) => (i ? '-' : '') + c.toLowerCase());
        components.push({ name: headingMatch[1], description: descMatch[1], slug });
      }
    }

    // Scan pattern meta dirs
    const patternsDir = join(metaSrcDir, 'patterns');
    for (const dir of readdirSync(patternsDir)) {
      const metaFile = join(patternsDir, dir, 'meta', 'index.tsx');
      if (!existsSync(metaFile)) continue;
      const content = readFileSync(metaFile, 'utf-8');
      const headingMatch = content.match(/heading:\s*['"]([^'"]+)['"]/);
      const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
      if (headingMatch && descMatch) {
        const slug = dir.replace(/([A-Z])/g, (_, c, i) => (i ? '-' : '') + c.toLowerCase());
        components.push({ name: headingMatch[1], description: descMatch[1], slug: `../patterns/${slug}` });
      }
    }

    components.sort((a, b) => a.name.localeCompare(b.name));

    const rows = components.map((c) => {
      const path = c.slug.startsWith('../') ? `${c.slug}.md` : `${c.slug}.md`;
      return `| [Iress${c.name}](${path}) | ${c.description} |`;
    });

    _componentTable = ['| Component | Description |', '|-----------|-------------|', ...rows].join('\n');
    return _componentTable;
  } catch {
    return 'Browse the individual component docs in this directory.';
  }
}

const introductionPlugin: StoryOverridePlugin = {
  stories: [
    'components-introduction--docs',
    'patterns-introduction--docs',
  ],
  render: (storyId) => {
    if (storyId === 'patterns-introduction--docs') {
      return [
        '| Pattern | Description |',
        '|---------|-------------|',
        '| [Form](../patterns/form.md) | End-to-end form building with validation, layout, and accessibility |',
        '| [Loading](../patterns/loading.md) | Skeleton screens, spinners, and suspense boundaries |',
        '| [Feedback](../patterns/feedback.md) | Choosing between Alert, Toaster, and Modal for user feedback |',
        '| [Search & Selection](../patterns/search-selection.md) | Autocomplete, Select, and TagInput for search and multi-select |',
        '| [Dropdown Menu](../patterns/dropdown-menu.md) | Context menus, action menus, and navigation menus |',
      ].join('\n');
    }

    return getComponentTable();
  },
};

const overridePlugins: StoryOverridePlugin[] = [breakpointTablePlugin, faMigrationPlugin, iconBrowserPlugin, zIndexPlugin, feedbackPlugin, formPlugin, searchSelectionPlugin, stylingPropsReferencePlugin, tokenStoriesPlugin, introductionPlugin];

const overrideMap = new Map<string, StoryOverridePlugin>();
for (const plugin of overridePlugins) {
  for (const story of plugin.stories) {
    overrideMap.set(story, plugin);
  }
}

export function getOverridePlugin(storyId: string): StoryOverridePlugin | undefined {
  return overrideMap.get(storyId);
}

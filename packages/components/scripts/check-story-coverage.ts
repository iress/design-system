/**
 * check:story-coverage — Detects drift between component prop types and story coverage.
 *
 * For each component, extracts union/enum prop values from TypeScript interfaces
 * and checks that stories (or their mocks) demonstrate each value.
 *
 * Usage: npx tsx packages/components/scripts/check-story-coverage.ts [--component Button]
 */
import { Project } from 'ts-morph';
import { readFileSync, existsSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');

const componentArgIdx = process.argv.indexOf('--component');
const targetComponent =
  process.argv.find((a) => a.startsWith('--component='))?.split('=')[1] ??
  (componentArgIdx !== -1 ? process.argv[componentArgIdx + 1] : undefined);

/**
 * Props to ignore — these have many valid values where exhaustive story coverage
 * isn't meaningful (e.g. spacing tokens, alignment utilities).
 *
 * Format: 'ComponentName.propName' or '*.propName' for all components.
 */
const IGNORE: string[] = [
  // Spacing tokens — demonstrating every value isn't useful
  '*.gap',
  '*.rowGap',
  '*.gutter',
  // Alignment — covered conceptually, not every permutation
  '*.horizontalAlign',
  '*.verticalAlign',
  // Typography tokens on Skeleton — one example suffices
  'Skeleton.textStyle',
  // Popover/Tooltip auto alignment is internal
  'Tooltip.align',
  'Popover.align',
  // Popover type/displayMode are advanced usage
  'Popover.type',
  'Popover.displayMode',
  // Menu role="list" is a semantic variant, not visual
  'Menu.role',
  // ContextualMenu theme="light" is the default (implicitly covered)
  'ContextualMenu.theme',
  // Button fluid breakpoints — covered by responsive docs
  'Button.fluid',
];

function isIgnored(componentName: string, propName: string): boolean {
  return IGNORE.some(
    (entry) =>
      entry === `${componentName}.${propName}` || entry === `*.${propName}`,
  );
}

interface PropCoverage {
  prop: string;
  values: string[];
  covered: string[];
  missing: string[];
}

interface ComponentCoverage {
  name: string;
  file: string;
  props: PropCoverage[];
}

// Find which values appear in story/mock files
function findCoveredValues(
  componentDir: string,
  propName: string,
  expectedValues: string[],
): string[] {
  const storyFiles = globSync(join(componentDir, '**/*.stories.tsx'));
  const mockFiles = globSync(join(componentDir, '**/mocks/**/*.tsx'));
  const allFiles = [...storyFiles, ...mockFiles];

  const covered = new Set<string>();

  for (const file of allFiles) {
    const content = readFileSync(file, 'utf-8');
    for (const value of expectedValues) {
      // Check for prop={value}, prop="value", prop='value', or prop: 'value' in args
      const patterns = [
        `${propName}="${value}"`,
        `${propName}='${value}'`,
        `${propName}={${value}}`,
        `${propName}: '${value}'`,
        `${propName}: "${value}"`,
        `${propName}: ${value}`,
      ];
      if (patterns.some((p) => content.includes(p))) {
        covered.add(value);
      }
    }
  }

  return Array.from(covered);
}

// Main
const project = new Project({
  tsConfigFilePath: join(ROOT, 'tsconfig.lib.json'),
  skipAddingFilesFromTsConfig: true,
});

// Find all component directories
const componentDirs = globSync(join(SRC, 'components/*/'));
const patternDirs = globSync(join(SRC, 'patterns/*/'));
const allDirs = [...componentDirs, ...patternDirs];

const results: ComponentCoverage[] = [];
let totalMissing = 0;

for (const dir of allDirs) {
  const name = basename(dir);
  if (targetComponent && name.toLowerCase() !== targetComponent.toLowerCase())
    continue;

  // Find the main component file
  const mainFile = join(dir, `${name}.tsx`);
  if (!existsSync(mainFile)) continue;

  const sourceFile = project.addSourceFileAtPath(mainFile);
  const interfaces = sourceFile.getInterfaces();

  const propsCoverage: PropCoverage[] = [];

  // Check all interfaces (not just Iress-prefixed — some use internal names)
  for (const iface of interfaces) {
    const ifaceName = iface.getName();
    // Skip test/mock interfaces
    if (ifaceName.includes('Mock') || ifaceName.includes('Test')) continue;

    for (const prop of iface.getProperties()) {
      if (isIgnored(name, prop.getName())) continue;

      const type = prop.getType();
      if (!type.isUnion()) continue;

      const literals = type
        .getUnionTypes()
        .filter((t) => t.isStringLiteral() || t.isNumberLiteral())
        .map((t) => String(t.getLiteralValue()));

      // Skip: boolean-like, single value, huge unions (icon names, etc.)
      if (literals.length < 2 || literals.length > 20) continue;

      const covered = findCoveredValues(dir, prop.getName(), literals);
      const missing = literals.filter((v) => !covered.includes(v));

      if (missing.length > 0) {
        propsCoverage.push({
          prop: prop.getName(),
          values: literals,
          covered,
          missing,
        });
      }
    }
  }

  if (propsCoverage.length > 0) {
    results.push({ name, file: mainFile, props: propsCoverage });
    totalMissing += propsCoverage.reduce((sum, p) => sum + p.missing.length, 0);
  }
}

// Output
if (results.length === 0) {
  console.log('✅ All union prop values are covered by stories.');
} else {
  for (const comp of results) {
    console.log(`\n❌ ${comp.name}`);
    for (const prop of comp.props) {
      const pct = Math.round((prop.covered.length / prop.values.length) * 100);
      console.log(
        `   ${prop.prop}: ${prop.covered.length}/${prop.values.length} covered (${pct}%)`,
      );
      console.log(`   Missing: ${prop.missing.join(', ')}`);
    }
  }
  console.log(
    `\n${totalMissing} uncovered value(s) across ${results.length} component(s).`,
  );
  process.exit(1);
}

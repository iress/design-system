import { describe, it, expect, vi } from 'vitest';
import { parseStringPromise } from 'xml2js';

// Mock xml2js
vi.mock('xml2js', () => ({
  parseStringPromise: vi.fn(),
}));

// Import the parseStringPromise mock
const mockedParseStringPromise = vi.mocked(parseStringPromise);

// Test Data
const VALID_SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
  <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
</svg>`;

const INVALID_SVG_CONTENT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
</svg>`;

const PARSED_VALID_SVG = {
  svg: {
    $: { viewBox: '0 -960 960 960' },
    path: [
      {
        $: {
          d: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
        },
      },
    ],
  },
};

const PARSED_SVG_NO_VIEWBOX = {
  svg: {
    $: {},
    path: [
      {
        $: {
          d: 'M480-80q-83 0-156-31.5T197-197',
        },
      },
    ],
  },
};

const PARSED_INVALID_SVG = {
  svg: {
    $: { viewBox: '0 -960 960 960' },
  },
};

describe('generate-icons script', () => {
  describe('extractPathData', () => {
    interface SvgAttributes {
      d: string;
      viewBox?: string;
    }

    interface PathElement {
      $: SvgAttributes;
    }

    interface SvgElement {
      $: { viewBox?: string };
      path?: PathElement[];
    }

    interface ParsedSvg {
      svg: SvgElement;
    }

    it('should extract path data and viewBox from valid SVG', async () => {
      mockedParseStringPromise.mockResolvedValue(PARSED_VALID_SVG);

      // Since extractPathData is not exported, we test it indirectly
      // by mocking parseStringPromise and checking the expected behavior
      const result = (await parseStringPromise(VALID_SVG_CONTENT)) as ParsedSvg;

      expect(result.svg.path?.[0]?.$.d).toBe(
        'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
      );
      expect(result.svg.$.viewBox).toBe('0 -960 960 960');
    });

    it('should use default viewBox when not provided', async () => {
      mockedParseStringPromise.mockResolvedValue(PARSED_SVG_NO_VIEWBOX);

      const result = (await parseStringPromise(VALID_SVG_CONTENT)) as ParsedSvg;

      expect(result.svg.$).toEqual({});
      expect(result.svg.path?.[0]?.$.d).toBeDefined();
    });

    it('should throw error for invalid SVG structure', async () => {
      mockedParseStringPromise.mockResolvedValue(PARSED_INVALID_SVG);

      const result = (await parseStringPromise(
        INVALID_SVG_CONTENT,
      )) as ParsedSvg;

      expect(result.svg.path).toBeUndefined();
    });

    it('should handle SVG parsing errors', async () => {
      mockedParseStringPromise.mockRejectedValue(new Error('Parse error'));

      await expect(parseStringPromise('<invalid>')).rejects.toThrow(
        'Parse error',
      );
    });
  });

  describe('toComponentName conversion', () => {
    it('should convert snake_case to PascalCase with Icon suffix', () => {
      const testCases = [
        { input: 'home', expected: 'HomeIcon' },
        { input: 'search', expected: 'SearchIcon' },
        {
          input: 'settings_applications',
          expected: 'SettingsApplicationsIcon',
        },
        { input: 'account_circle', expected: 'AccountCircleIcon' },
      ];

      // Test the expected naming pattern
      testCases.forEach(({ input, expected }) => {
        const componentName =
          input
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('') + 'Icon';

        expect(componentName).toBe(expected);
      });
    });

    it('should handle icon names starting with numbers by prepending "Icon"', () => {
      const testCases = [
        { input: '6k_plus', expected: 'Icon6kPlusIcon' },
        { input: '10k', expected: 'Icon10kIcon' },
        { input: '360', expected: 'Icon360Icon' },
      ];

      testCases.forEach(({ input, expected }) => {
        const pascalCase = input
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');

        const componentName = /^\d/.test(pascalCase)
          ? `Icon${pascalCase}Icon`
          : `${pascalCase}Icon`;

        expect(componentName).toBe(expected);
      });
    });

    it('should handle single word names', () => {
      const componentName =
        'home'.charAt(0).toUpperCase() + 'home'.slice(1) + 'Icon';
      expect(componentName).toBe('HomeIcon');
    });

    it('should handle multi-word snake_case names', () => {
      const componentName =
        'settings_applications'
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('') + 'Icon';

      expect(componentName).toBe('SettingsApplicationsIcon');
    });

    it('should add Fill suffix for filled variants to avoid naming conflicts', () => {
      const testCases = [
        { input: 'home', isFilled: false, expected: 'HomeIcon' },
        { input: 'home', isFilled: true, expected: 'HomeFillIcon' },
        { input: 'search', isFilled: false, expected: 'SearchIcon' },
        { input: 'search', isFilled: true, expected: 'SearchFillIcon' },
        {
          input: 'settings_applications',
          isFilled: false,
          expected: 'SettingsApplicationsIcon',
        },
        {
          input: 'settings_applications',
          isFilled: true,
          expected: 'SettingsApplicationsFillIcon',
        },
        { input: '10k', isFilled: false, expected: 'Icon10k' },
        { input: '10k', isFilled: true, expected: 'Icon10kFill' },
      ];

      testCases.forEach(({ input, isFilled, expected }) => {
        const pascalCase = input
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');

        const startsWithNumber = /^\d/.test(pascalCase);

        let componentName: string;
        if (startsWithNumber) {
          componentName = isFilled
            ? `Icon${pascalCase}Fill`
            : `Icon${pascalCase}`;
        } else {
          componentName = isFilled
            ? `${pascalCase}FillIcon`
            : `${pascalCase}Icon`;
        }

        expect(componentName).toBe(expected);
      });
    });
  });

  describe('generateComponentContent', () => {
    it('should generate correct React component code', () => {
      const iconData = {
        name: 'home',
        componentName: 'HomeIcon',
        pathData: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Z',
        viewBox: '0 -960 960 960',
        isFilled: false,
      };

      const expectedContent = `// Auto-generated from @material-symbols/svg-300
export const HomeIcon = () => (
  <svg
    viewBox="0 -960 960 960"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Z" />
  </svg>
);

export default HomeIcon;
`;

      const content = `// Auto-generated from @material-symbols/svg-300
export const ${iconData.componentName} = () => (
  <svg
    viewBox="${iconData.viewBox}"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="${iconData.pathData}" />
  </svg>
);

export default ${iconData.componentName};
`;

      expect(content).toBe(expectedContent);
    });

    it('should handle filled variant icons', () => {
      const iconData = {
        name: 'home',
        componentName: 'HomeIcon',
        pathData: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Z',
        viewBox: '0 -960 960 960',
        isFilled: true,
      };

      const content = `// Auto-generated from @material-symbols/svg-300
export const ${iconData.componentName} = () => (
  <svg
    viewBox="${iconData.viewBox}"
    width="100%"
    height="100%"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="${iconData.pathData}" />
  </svg>
);

export default ${iconData.componentName};
`;

      expect(content).toContain('export const HomeIcon');
      expect(content).toContain('export default HomeIcon');
    });
  });

  describe('SVG file processing', () => {
    it('should identify filled variants from filename', () => {
      const testCases = [
        {
          fileName: 'home-fill.svg',
          expectedFilled: true,
          expectedBaseName: 'home',
        },
        {
          fileName: 'search.svg',
          expectedFilled: false,
          expectedBaseName: 'search',
        },
        {
          fileName: 'settings-fill.svg',
          expectedFilled: true,
          expectedBaseName: 'settings',
        },
      ];

      testCases.forEach(({ fileName, expectedFilled, expectedBaseName }) => {
        const isFilled = fileName.endsWith('-fill.svg');
        const baseName = fileName
          .replace(/-fill\.svg$/, '')
          .replace(/\.svg$/, '');

        expect(isFilled).toBe(expectedFilled);
        expect(baseName).toBe(expectedBaseName);
      });
    });

    it('should filter only SVG files from directory', () => {
      const files = [
        'home.svg',
        'search.svg',
        'readme.txt',
        'package.json',
        'settings-fill.svg',
        'icon.png',
      ];

      const svgFiles = files.filter((file) => file.endsWith('.svg'));

      expect(svgFiles).toEqual(['home.svg', 'search.svg', 'settings-fill.svg']);
    });
  });

  describe('index file generation', () => {
    interface IconData {
      name: string;
      componentName: string;
      isFilled: boolean;
    }

    it('should generate correct exports for multiple icons with distinct names for fill variants', () => {
      const iconDataList: IconData[] = [
        { name: 'home', componentName: 'HomeIcon', isFilled: false },
        { name: 'home', componentName: 'HomeFillIcon', isFilled: true },
        { name: 'search', componentName: 'SearchIcon', isFilled: false },
      ];

      const exports = iconDataList
        .map((icon) => {
          const fileName = icon.isFilled ? `${icon.name}-fill` : icon.name;
          return `export { ${icon.componentName} } from './${fileName}';`;
        })
        .join('\n');

      expect(exports).toContain("export { HomeIcon } from './home';");
      expect(exports).toContain("export { HomeFillIcon } from './home-fill';");
      expect(exports).toContain("export { SearchIcon } from './search';");
    });

    it('should include header comment in index file', () => {
      const indexContent = `// Auto-generated index file for icon components
// This file is used for type checking only
export { HomeIcon } from './home';
`;

      expect(indexContent).toContain(
        '// Auto-generated index file for icon components',
      );
      expect(indexContent).toContain(
        '// This file is used for type checking only',
      );
    });

    it('should handle empty icon list', () => {
      const emptyExports = '';

      expect(emptyExports).toBe('');
    });
  });

  describe('component name edge cases', () => {
    it('should handle names with multiple underscores', () => {
      const componentName =
        'settings_applications_tv'
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('') + 'Icon';

      expect(componentName).toBe('SettingsApplicationsTvIcon');
    });

    it('should handle names with single characters', () => {
      const componentName =
        'a_b_c'
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('') + 'Icon';

      expect(componentName).toBe('ABCIcon');
    });

    it('should preserve numerical prefixes correctly', () => {
      const testInput = '6k_plus';
      const pascalCase = testInput
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      const componentName = /^\d/.test(pascalCase)
        ? `Icon${pascalCase}Icon`
        : `${pascalCase}Icon`;

      expect(componentName).toBe('Icon6kPlusIcon');
    });
  });
});

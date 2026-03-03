import { describe, it, expect, vi } from 'vitest';
import { parseStringPromise } from 'xml2js';

// Mock xml2js so extractPathData doesn't need real SVG files
vi.mock('xml2js', () => ({
  parseStringPromise: vi.fn(),
}));

import {
  extractPathData,
  toComponentName,
  generateComponentContent,
  generateIndexContent,
  type IconData,
} from './generate-icons.utils';

const mockedParseStringPromise = vi.mocked(parseStringPromise);

// Test Data
const VALID_PATH_DATA =
  'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z';

const PARSED_VALID_SVG = {
  svg: {
    $: { viewBox: '0 -960 960 960' },
    path: [{ $: { d: VALID_PATH_DATA } }],
  },
};

const PARSED_SVG_NO_VIEWBOX = {
  svg: {
    $: {},
    path: [{ $: { d: 'M480-80q-83 0-156-31.5T197-197' } }],
  },
};

const PARSED_INVALID_SVG = {
  svg: {
    $: { viewBox: '0 -960 960 960' },
    // no path element
  },
};

describe('generate-icons script', () => {
  describe('extractPathData', () => {
    it('should extract path data and viewBox from valid SVG', async () => {
      mockedParseStringPromise.mockResolvedValue(PARSED_VALID_SVG);

      const result = await extractPathData('<svg>...</svg>');

      expect(result.path).toBe(VALID_PATH_DATA);
      expect(result.viewBox).toBe('0 -960 960 960');
    });

    it('should use default viewBox when not provided', async () => {
      mockedParseStringPromise.mockResolvedValue(PARSED_SVG_NO_VIEWBOX);

      const result = await extractPathData('<svg>...</svg>');

      expect(result.viewBox).toBe('0 -960 960 960');
      expect(result.path).toBe('M480-80q-83 0-156-31.5T197-197');
    });

    it('should throw error for invalid SVG structure (missing path)', async () => {
      mockedParseStringPromise.mockResolvedValue(PARSED_INVALID_SVG);

      await expect(extractPathData('<svg>...</svg>')).rejects.toThrow(
        'Failed to parse SVG',
      );
    });

    it('should throw error when XML parsing fails', async () => {
      mockedParseStringPromise.mockRejectedValue(new Error('Parse error'));

      await expect(extractPathData('<invalid>')).rejects.toThrow(
        'Failed to parse SVG: Parse error',
      );
    });
  });

  describe('toComponentName', () => {
    it('should convert snake_case to PascalCase with Icon suffix', () => {
      expect(toComponentName('home')).toBe('HomeIcon');
      expect(toComponentName('search')).toBe('SearchIcon');
      expect(toComponentName('settings_applications')).toBe(
        'SettingsApplicationsIcon',
      );
      expect(toComponentName('account_circle')).toBe('AccountCircleIcon');
    });

    it('should handle icon names starting with numbers by prepending "Icon"', () => {
      expect(toComponentName('6k_plus')).toBe('Icon6kPlus');
      expect(toComponentName('10k')).toBe('Icon10k');
      expect(toComponentName('360')).toBe('Icon360');
    });

    it('should handle single word names', () => {
      expect(toComponentName('home')).toBe('HomeIcon');
    });

    it('should handle multi-word snake_case names', () => {
      expect(toComponentName('settings_applications')).toBe(
        'SettingsApplicationsIcon',
      );
    });

    it('should handle names with multiple underscores', () => {
      expect(toComponentName('settings_applications_tv')).toBe(
        'SettingsApplicationsTvIcon',
      );
    });

    it('should handle names with single characters', () => {
      expect(toComponentName('a_b_c')).toBe('ABCIcon');
    });

    describe('filled variants', () => {
      it('should add Fill suffix for regular filled variants', () => {
        expect(toComponentName('home', true)).toBe('HomeFillIcon');
        expect(toComponentName('search', true)).toBe('SearchFillIcon');
        expect(toComponentName('settings_applications', true)).toBe(
          'SettingsApplicationsFillIcon',
        );
      });

      it('should not add Fill suffix for non-filled variants', () => {
        expect(toComponentName('home', false)).toBe('HomeIcon');
        expect(toComponentName('search', false)).toBe('SearchIcon');
      });

      it('should add Fill suffix for number-prefixed filled variants', () => {
        expect(toComponentName('10k', true)).toBe('Icon10kFill');
        expect(toComponentName('6k_plus', true)).toBe('Icon6kPlusFill');
      });

      it('should not add Fill suffix for number-prefixed non-filled variants', () => {
        expect(toComponentName('10k', false)).toBe('Icon10k');
      });
    });
  });

  describe('generateComponentContent', () => {
    it('should generate correct React component code', () => {
      const iconData: IconData = {
        name: 'home',
        componentName: 'HomeIcon',
        pathData: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Z',
        viewBox: '0 -960 960 960',
        isFilled: false,
      };

      const content = generateComponentContent(iconData);

      expect(content).toBe(`// Auto-generated from @material-symbols/svg-300
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
`);
    });

    it('should use the component name from iconData', () => {
      const iconData: IconData = {
        name: 'star',
        componentName: 'StarFillIcon',
        pathData: 'M200-200h560v-560H200v560Z',
        viewBox: '0 -960 960 960',
        isFilled: true,
      };

      const content = generateComponentContent(iconData);

      expect(content).toContain('export const StarFillIcon');
      expect(content).toContain('export default StarFillIcon');
      expect(content).toContain('M200-200h560v-560H200v560Z');
    });

    it('should include correct SVG attributes', () => {
      const iconData: IconData = {
        name: 'custom',
        componentName: 'CustomIcon',
        pathData: 'M0 0h24v24H0z',
        viewBox: '0 0 24 24',
        isFilled: false,
      };

      const content = generateComponentContent(iconData);

      expect(content).toContain('viewBox="0 0 24 24"');
      expect(content).toContain('width="100%"');
      expect(content).toContain('height="100%"');
      expect(content).toContain('fill="currentColor"');
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

  describe('generateIndexContent', () => {
    it('should generate correct exports for multiple icons', () => {
      const iconDataList: IconData[] = [
        {
          name: 'home',
          componentName: 'HomeIcon',
          pathData: '',
          viewBox: '',
          isFilled: false,
        },
        {
          name: 'home',
          componentName: 'HomeFillIcon',
          pathData: '',
          viewBox: '',
          isFilled: true,
        },
        {
          name: 'search',
          componentName: 'SearchIcon',
          pathData: '',
          viewBox: '',
          isFilled: false,
        },
      ];

      const content = generateIndexContent(iconDataList);

      expect(content).toContain("export { HomeIcon } from './home';");
      expect(content).toContain("export { HomeFillIcon } from './home-fill';");
      expect(content).toContain("export { SearchIcon } from './search';");
    });

    it('should include header comments', () => {
      const content = generateIndexContent([]);

      expect(content).toContain(
        '// Auto-generated index file for icon components',
      );
      expect(content).toContain('// This file is used for type checking only');
    });

    it('should handle empty icon list', () => {
      const content = generateIndexContent([]);

      expect(content).toBe(`// Auto-generated index file for icon components
// This file is used for type checking only

`);
    });
  });
});

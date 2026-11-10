import { NAV_ITEMS } from './nav';

describe('NAV_ITEMS', () => {
  it('is a non-empty array', () => {
    expect(NAV_ITEMS).toBeInstanceOf(Array);
    expect(NAV_ITEMS.length).toBeGreaterThan(0);
  });

  it('has unique top-level keys', () => {
    const keys = NAV_ITEMS.map((item) => item.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('has all required top-level sections', () => {
    const keys = NAV_ITEMS.map((item) => item.key);
    expect(keys).toContain('get-started');
    expect(keys).toContain('components');
    expect(keys).toContain('patterns');
    expect(keys).toContain('tokens');
    expect(keys).toContain('foundations');
    expect(keys).toContain('styling-props');
  });

  it('each top-level item has a label and href', () => {
    NAV_ITEMS.forEach((item) => {
      expect(item.label).toBeTruthy();
      expect(item.href).toBeTruthy();
    });
  });

  it('each top-level item has an icon', () => {
    NAV_ITEMS.forEach((item) => {
      expect(item.icon).toBeTruthy();
    });
  });

  it('components section has expected items', () => {
    const components = NAV_ITEMS.find((item) => item.key === 'components');
    expect(components?.children).toBeDefined();
    const childKeys = components!.children!.map(
      (child: { key: string }) => child.key,
    );
    expect(childKeys).toContain('button');
    expect(childKeys).toContain('alert');
    expect(childKeys).toContain('modal');
    expect(childKeys).toContain('table');
  });

  it('all children have unique keys within their parent', () => {
    NAV_ITEMS.forEach((item) => {
      if (item.children) {
        const childKeys = item.children.map(
          (child: { key: string }) => child.key,
        );
        expect(new Set(childKeys).size).toBe(childKeys.length);
      }
    });
  });

  it('all internal hrefs start with /', () => {
    const checkHrefs = (items: typeof NAV_ITEMS) => {
      items.forEach((item) => {
        if (item.href && !item.href.startsWith('http')) {
          expect(item.href).toMatch(/^\//);
        }
        if (item.children) {
          checkHrefs(item.children as typeof NAV_ITEMS);
        }
      });
    };
    checkHrefs(NAV_ITEMS);
  });
});

import { safeClosest } from './domUtils';

describe('domUtils', () => {
  describe('safeClosest', () => {
    it('should return null for null element', () => {
      expect(safeClosest(null, '.test')).toBeNull();
    });

    it('should return null for element without closest method', () => {
      const mockElement = {};
      expect(safeClosest(mockElement as Element, '.test')).toBeNull();
    });

    it('should return null for element with non-function closest', () => {
      const mockElement = { closest: 'not a function' };
      expect(
        safeClosest(mockElement as unknown as Element, '.test'),
      ).toBeNull();
    });

    it('should call closest method when available', () => {
      const mockElement = {
        closest: vi.fn().mockReturnValue(document.createElement('div')),
      };

      const result = safeClosest(mockElement as unknown as Element, '.test');

      expect(mockElement.closest).toHaveBeenCalledWith('.test');
      expect(result).toBeInstanceOf(HTMLElement);
    });

    it('should handle errors from closest method', () => {
      const mockElement = {
        closest: vi.fn().mockImplementation(() => {
          throw new Error('Test error');
        }),
      };

      expect(
        safeClosest(mockElement as unknown as Element, '.test'),
      ).toBeNull();
    });

    it('should work with real DOM elements', () => {
      const parent = document.createElement('div');
      parent.className = 'parent';
      const child = document.createElement('span');
      parent.appendChild(child);

      expect(safeClosest(child, '.parent')).toBe(parent);
      expect(safeClosest(child, '.nonexistent')).toBeNull();
    });
  });
});

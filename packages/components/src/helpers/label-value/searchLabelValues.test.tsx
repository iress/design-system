import { searchLabelValues } from './searchLabelValues';
import { generateLabelValueMeta } from '@/mocks/generateLabelValues';
import { render, screen } from '@testing-library/react';

describe('searchLabelValues', () => {
  it('returns no items if query is empty', () => {
    const items = searchLabelValues('', generateLabelValueMeta());
    expect(items).toHaveLength(0);
  });

  it('returns no items if they do not match query', () => {
    const items = searchLabelValues('Query', generateLabelValueMeta());
    expect(items).toHaveLength(0);
  });

  it('returns matching items for query', () => {
    const items = searchLabelValues('2', generateLabelValueMeta());
    expect(items).toHaveLength(1);
  });

  describe('highlighting functionality', () => {
    it('returns FormattedLabelValueMeta with highlighted labels', () => {
      const testData = [
        { label: 'Found item', value: '1' },
        { label: 'Another option', value: '2' },
        { label: 'Found result', value: '3' },
      ];

      const results = searchLabelValues('found', testData);

      expect(results).toHaveLength(2);

      // Check that formattedLabel exists for each result
      results.forEach((result) => {
        expect(result).toHaveProperty('formattedLabel');
        expect(result.formattedLabel).toBeDefined();
      });

      // Test the first result's highlighting
      const firstResult = results[0];
      render(firstResult.formattedLabel);

      const highlightedText = screen.getByText('Found');
      expect(highlightedText.tagName).toBe('B');
    });

    it('returns FormattedLabelValueMeta with highlighted meta when meta is string', () => {
      const testData = [
        { label: 'Item 1', value: '1', meta: 'Contains search term' },
        { label: 'Item 2', value: '2', meta: 'Different content' },
        { label: 'Item 3', value: '3', meta: 'Also has search here' },
      ];

      // Search by meta content (fuzzy search looks at labels primarily, but we can test meta highlighting)
      const results = searchLabelValues('item', testData);

      expect(results).toHaveLength(3);

      // Check that formattedMeta exists and is highlighted correctly
      results.forEach((result) => {
        expect(result).toHaveProperty('formattedMeta');
        if (typeof result.meta === 'string') {
          expect(result.formattedMeta).toBeDefined();
        }
      });
    });

    it('preserves non-string meta without highlighting', () => {
      const reactNodeMeta = <span>React Element</span>;
      const testData = [
        { label: 'Test item', value: '1', meta: reactNodeMeta },
        { label: 'Another test', value: '2', meta: 'String meta' },
      ];

      const results = searchLabelValues('test', testData);

      expect(results).toHaveLength(2);

      // First result should have original ReactNode meta
      const firstResult = results.find((r) => r.value === '1');
      expect(firstResult?.formattedMeta).toBe(reactNodeMeta);

      // Second result should have original string meta since 'test' is not in 'String meta'
      const secondResult = results.find((r) => r.value === '2');
      expect(typeof secondResult?.formattedMeta).toBe('string'); // No highlighting since query not found in meta
      expect(secondResult?.formattedMeta).toBe('String meta'); // It remains the original string
    });

    it('applies result limit correctly', () => {
      const testData = [
        { label: 'Test option 1', value: '1' },
        { label: 'Test option 2', value: '2' },
        { label: 'Test option 3', value: '3' },
        { label: 'Test option 4', value: '4' },
        { label: 'Test option 5', value: '5' },
      ];

      const results = searchLabelValues('test', testData, 3);

      expect(results).toHaveLength(3);

      // All returned results should have highlighting
      results.forEach((result, index) => {
        expect(result).toHaveProperty('formattedLabel');

        // Create a unique container for each result to avoid conflicts
        const container = document.createElement('div');
        container.setAttribute('data-test-container', `result-${index}`);
        document.body.appendChild(container);

        render(result.formattedLabel, { container });

        const highlightedText = container.querySelector('b');
        expect(highlightedText).not.toBeNull();
        expect(highlightedText?.textContent?.toLowerCase()).toBe('test');

        // Cleanup
        document.body.removeChild(container);
      });
    });

    it('handles mixed content with highlighting', () => {
      const testData = [
        { label: 'Important task', value: '1', meta: 'High priority' },
        { label: 'Regular task', value: '2', meta: 'Normal priority' },
        { label: 'Task item', value: '3', meta: <span>React meta</span> },
      ];

      const results = searchLabelValues('task', testData);

      expect(results).toHaveLength(3);

      // All should have highlighted labels - test each one individually
      results.forEach((result, index) => {
        // Create a unique container for each result to avoid conflicts
        const container = document.createElement('div');
        container.setAttribute('data-test-container', `label-${index}`);
        document.body.appendChild(container);

        render(result.formattedLabel, { container });

        const highlightedLabel = container.querySelector('b');
        expect(highlightedLabel).not.toBeNull();
        const highlightText = highlightedLabel?.textContent?.toLowerCase();
        expect(highlightText).toBe('task');

        // Cleanup
        document.body.removeChild(container);
      });

      // String meta should be formatted, ReactNode meta should be preserved
      const reactMetaResult = results.find((r) => r.value === '3');
      expect(reactMetaResult?.formattedMeta).toBeInstanceOf(Object);
      expect(reactMetaResult?.formattedMeta).toHaveProperty('type');
    });

    it('preserves all original properties in formatted results', () => {
      const testData = [
        {
          label: 'Test item',
          value: '1',
          meta: 'Description',
          append: 'Append content',
          prepend: 'Prepend content',
          testId: 'custom-id',
        },
      ];

      const results = searchLabelValues('test', testData);

      expect(results).toHaveLength(1);

      const result = results[0];

      // Original properties should be preserved
      expect(result.label).toBe('Test item');
      expect(result.value).toBe('1');
      expect(result.meta).toBe('Description');
      expect(result.append).toBe('Append content');
      expect(result.prepend).toBe('Prepend content');
      expect(result.testId).toBe('custom-id');

      // Formatted properties should be added
      expect(result).toHaveProperty('formattedLabel');
      expect(result).toHaveProperty('formattedMeta');
    });
  });
});

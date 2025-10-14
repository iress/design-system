import { highlightQueryInLabelValue } from './highlightQueryInLabelValue';
import { render, screen } from '@testing-library/react';

describe('highlightQueryInLabelValue', () => {
  it('returns same label if query not found', () => {
    const formatted = highlightQueryInLabelValue(
      {
        label: 'Label',
        value: 'Value',
      },
      'Not found',
    );

    expect(typeof formatted.formattedLabel).toBe('string');
    expect(formatted.formattedLabel).toEqual('Label');
  });

  it('returns formatted label if query found', () => {
    const formatted = highlightQueryInLabelValue(
      {
        label: 'Found items',
        value: 'Value',
      },
      'Found',
    );

    render(formatted.formattedLabel);

    expect(screen.getByText('Found').tagName).toBe('B');
  });

  describe('meta highlighting', () => {
    it('returns same meta if query not found in meta', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: 'Description text',
        },
        'Not found',
      );

      expect(typeof formatted.formattedMeta).toBe('string');
      expect(formatted.formattedMeta).toEqual('Description text');
    });

    it('returns formatted meta if query found in meta', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: 'Found in description',
        },
        'Found',
      );

      render(formatted.formattedMeta);

      expect(screen.getByText('Found').tagName).toBe('B');
    });

    it('returns original meta when meta is not a string (ReactNode)', () => {
      const reactNodeMeta = <span>React Element</span>;
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: reactNodeMeta,
        },
        'React',
      );

      expect(formatted.formattedMeta).toBe(reactNodeMeta);
    });

    it('highlights both label and meta when query is found in both', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Test label',
          value: 'Value',
          meta: 'Test meta',
        },
        'Test',
      );

      // Test label highlighting
      render(<div data-testid="label">{formatted.formattedLabel}</div>);
      const labelHighlight = screen.getByTestId('label').querySelector('b');
      expect(labelHighlight).toHaveTextContent('Test');

      // Test meta highlighting
      render(<div data-testid="meta">{formatted.formattedMeta}</div>);
      const metaHighlight = screen.getByTestId('meta').querySelector('b');
      expect(metaHighlight).toHaveTextContent('Test');
    });

    it('preserves other properties from original LabelValueMeta', () => {
      const originalItem = {
        label: 'Label',
        value: 'Value',
        meta: 'Meta text',
        append: <span>Append</span>,
        prepend: <span>Prepend</span>,
        testId: 'test-id',
      };

      const formatted = highlightQueryInLabelValue(originalItem, 'Label');

      expect(formatted).toMatchObject({
        label: 'Label',
        value: 'Value',
        meta: 'Meta text',
        append: originalItem.append,
        prepend: originalItem.prepend,
        testId: 'test-id',
      });

      // Check that formatted properties are added
      expect(formatted).toHaveProperty('formattedLabel');
      expect(formatted).toHaveProperty('formattedMeta');
    });
  });

  describe('custom tag element', () => {
    it('uses custom tag for highlighting label', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Marked text',
          value: 'Value',
        },
        'Marked',
        'mark',
      );

      render(formatted.formattedLabel);

      expect(screen.getByText('Marked').tagName).toBe('MARK');
    });

    it('uses custom tag for highlighting meta', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: 'Marked meta',
        },
        'Marked',
        'mark',
      );

      render(formatted.formattedMeta);

      expect(screen.getByText('Marked').tagName).toBe('MARK');
    });
  });

  describe('edge cases', () => {
    it('handles empty query string', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: 'Meta',
        },
        '',
      );

      expect(formatted.formattedLabel).toBe('Label');
      expect(formatted.formattedMeta).toBe('Meta');
    });

    it('handles missing meta property', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
        },
        'Label',
      );

      expect(formatted.formattedMeta).toBeUndefined();
    });

    it('handles null meta property', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: null,
        },
        'Label',
      );

      expect(formatted.formattedMeta).toBe(null);
    });

    it('handles undefined meta property', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: undefined,
        },
        'Label',
      );

      expect(formatted.formattedMeta).toBe(undefined);
    });
  });
});

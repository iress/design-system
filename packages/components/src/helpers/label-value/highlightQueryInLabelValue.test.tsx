import { highlightQueryInLabelValue } from './highlightQueryInLabelValue';
import { render, screen } from '@testing-library/react';
import React from 'react';

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

  describe('formattedMeta', () => {
    it('returns undefined formattedMeta when meta is not provided', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
        },
        'Label',
      );

      expect(formatted.formattedMeta).toBeUndefined();
    });

    it('returns undefined formattedMeta when meta is not a string', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: <span>JSX Element</span>,
        },
        'Label',
      );

      expect(formatted.formattedMeta).toBeUndefined();
    });

    it('returns same string formattedMeta if query not found in meta', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: 'Metadata text',
        },
        'Not found',
      );

      expect(typeof formatted.formattedMeta).toBe('string');
      expect(formatted.formattedMeta).toEqual('Metadata text');
    });

    it('returns formatted meta if query found in string meta', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: 'Found in metadata',
        },
        'Found',
      );

      render(<div>{formatted.formattedMeta}</div>);

      expect(screen.getByText('Found').tagName).toBe('B');
      // Check that the container contains the expected text content
      const container = screen.getByText('Found').parentElement;
      expect(container).toHaveTextContent('Found in metadata');
    });

    it('highlights query in both label and meta when found in both', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Test label',
          value: 'Value',
          meta: 'Test metadata',
        },
        'Test',
      );

      // Render both to test
      render(
        <div>
          <div data-testid="label">{formatted.formattedLabel}</div>
          <div data-testid="meta">{formatted.formattedMeta}</div>
        </div>,
      );

      const labelContainer = screen.getByTestId('label');
      const metaContainer = screen.getByTestId('meta');

      // Both should have highlighted "Test" in bold
      expect(labelContainer.querySelector('b')?.textContent).toBe('Test');
      expect(metaContainer.querySelector('b')?.textContent).toBe('Test');
    });

    it('uses custom Tag when provided for meta highlighting', () => {
      const formatted = highlightQueryInLabelValue(
        {
          label: 'Label',
          value: 'Value',
          meta: 'Custom tag test',
        },
        'Custom',
        'mark',
      );

      render(<div>{formatted.formattedMeta}</div>);

      expect(screen.getByText('Custom').tagName).toBe('MARK');
    });

    it('preserves original meta when formattedMeta is generated', () => {
      const original = {
        label: 'Label',
        value: 'Value',
        meta: 'Original meta',
      };

      const formatted = highlightQueryInLabelValue(original, 'Original');

      // Original should be preserved
      expect(formatted.meta).toBe('Original meta');
      // And formatted version should exist
      expect(formatted.formattedMeta).toBeDefined();
      expect(formatted.formattedMeta).not.toBe('Original meta');
    });
  });
});

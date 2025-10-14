import { render } from '@testing-library/react';
import { SelectOption } from '../Select.types';
import { mapSelectOptions } from './mapSelectOptions';
import { idsLogger } from '@helpers/utility/idsLogger';

describe('mapSelectOptions', () => {
  describe('warnings', () => {
    it('logs a deprecated warning when used', () => {
      mapSelectOptions([]);
      expect(idsLogger).toHaveBeenCalledTimes(1);
    });
  });

  describe('no groups', () => {
    const items: SelectOption[] = [
      {
        label: 'String label',
      },
      {
        label: 'String label 2',
      },
    ];

    it('renders the correct options', () => {
      const { getAllByRole } = render(
        <select aria-label="Select">{mapSelectOptions(items)}</select>,
      );
      const renderedItems = getAllByRole('option');
      expect(renderedItems).toHaveLength(2);
    });

    it('renders no test ids if no test id provided', () => {
      const { container } = render(
        <select aria-label="Select">{mapSelectOptions(items)}</select>,
      );
      expect(container.querySelectorAll('[data-testid]')).toHaveLength(0);
    });

    it('returns null when no items are passed', () => {
      expect(mapSelectOptions([])).toBe(null);
    });
  });

  describe('has groups', () => {
    const items: SelectOption[] = [
      {
        label: 'String label',
        children: [
          {
            label: 'String label',
          },
          {
            label: 'String label 2',
          },
        ],
      },
      {
        label: 'String label 3',
      },
    ];

    it('renders the correct options', () => {
      const { getAllByRole } = render(
        <select aria-label="Select">{mapSelectOptions(items)}</select>,
      );
      expect(getAllByRole('group')).toHaveLength(1);
      expect(getAllByRole('option')).toHaveLength(3);
    });
  });
});

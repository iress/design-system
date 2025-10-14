import { render } from '@testing-library/react';
import { mapCheckboxGroupOptions } from './mapCheckboxGroupOptions';
import { generateLabelValues } from '../../../mocks/generateLabelValues';

describe('mapCheckboxGroupOptions', () => {
  const labelValues = generateLabelValues();

  it('renders the correct checkbox group options', () => {
    const screen = render(<>{mapCheckboxGroupOptions(labelValues)}</>);

    const renderedItems = screen.getAllByRole('checkbox');
    expect(renderedItems).toHaveLength(labelValues.length);

    labelValues.forEach((option) => {
      expect(
        screen.getByRole('checkbox', { name: option.label }),
      ).toBeInTheDocument();
    });
  });

  it('returns null when no items are passed', () => {
    expect(mapCheckboxGroupOptions([])).toBe(null);
  });
});

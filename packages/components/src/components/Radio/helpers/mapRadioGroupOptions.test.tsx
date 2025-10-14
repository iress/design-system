import { render } from '@testing-library/react';
import {
  MOCK_RADIO_OPTIONS_LENGTH,
  generateRadioOptions,
} from '../mocks/generateRadioOptions';
import { mapRadioGroupOptions } from './mapRadioGroupOptions';

describe('mapRadioGroupOptions', () => {
  const radioGroupOptions = generateRadioOptions();

  it('renders the correct radio group options', () => {
    const screen = render(<>{mapRadioGroupOptions(radioGroupOptions)}</>);

    const renderedItems = screen.getAllByRole('radio');
    expect(renderedItems).toHaveLength(MOCK_RADIO_OPTIONS_LENGTH);

    radioGroupOptions.forEach((option) => {
      expect(
        screen.getByRole('radio', { name: option.label }),
      ).toBeInTheDocument();
    });
  });

  it('returns null when no items are passed', () => {
    expect(mapRadioGroupOptions([])).toBe(null);
  });
});

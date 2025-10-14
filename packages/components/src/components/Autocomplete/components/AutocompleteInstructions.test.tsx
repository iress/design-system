import { render, screen } from '@testing-library/react';
import { AutocompleteInstructions } from './AutocompleteInstructions';

describe('AutocompleteInstructions', () => {
  it('should render the instruction text with the correct minSearchLength', () => {
    render(<AutocompleteInstructions minSearchLength={3} />);

    const instructions = screen.getByText(
      'Type at least 3 characters to search',
    );
    expect(instructions).toBeInTheDocument();
  });

  it('should render with different minSearchLength values', () => {
    const { rerender } = render(
      <AutocompleteInstructions minSearchLength={1} />,
    );

    expect(
      screen.getByText('Type at least 1 character to search'),
    ).toBeInTheDocument();

    rerender(<AutocompleteInstructions minSearchLength={5} />);

    expect(
      screen.getByText('Type at least 5 characters to search'),
    ).toBeInTheDocument();
  });

  it('should handle edge case with minSearchLength of 1', () => {
    render(<AutocompleteInstructions minSearchLength={1} />);

    // Should use singular "character" when minSearchLength is 1
    const instructions = screen.getByText(
      'Type at least 1 character to search',
    );
    expect(instructions).toBeInTheDocument();
  });
});

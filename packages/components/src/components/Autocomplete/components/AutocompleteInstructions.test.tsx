import { render, screen } from '@testing-library/react';
import { AutocompleteInstructions } from './AutocompleteInstructions';

const styles = {
  instructions: 'instructions',
};

describe('AutocompleteInstructions', () => {
  it('should render the instruction text with the correct minSearchLength', () => {
    render(<AutocompleteInstructions minSearchLength={3} styles={styles} />);

    const instructions = screen.getByText(
      'Type at least 3 characters to search',
    );
    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveClass(styles.instructions);
  });

  it('should render with different minSearchLength values', () => {
    const { rerender } = render(
      <AutocompleteInstructions minSearchLength={1} styles={styles} />,
    );

    expect(
      screen.getByText('Type at least 1 character to search'),
    ).toBeInTheDocument();

    rerender(<AutocompleteInstructions minSearchLength={5} styles={styles} />);

    expect(
      screen.getByText('Type at least 5 characters to search'),
    ).toBeInTheDocument();
  });

  it('should use default styles when no styles are provided', () => {
    render(<AutocompleteInstructions minSearchLength={2} />);

    const instructions = screen.getByText(
      'Type at least 2 characters to search',
    );
    expect(instructions).toBeInTheDocument();
    // Should still render even without explicit styles
    expect(instructions.tagName).toBe('DIV');
  });

  it('should handle edge case with minSearchLength of 1', () => {
    render(<AutocompleteInstructions minSearchLength={1} styles={styles} />);

    // Should use singular "character" when minSearchLength is 1
    const instructions = screen.getByText(
      'Type at least 1 character to search',
    );
    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveClass(styles.instructions);
  });

  it('should apply empty string class when instructions style is not provided', () => {
    const emptyStyles = {};
    render(
      <AutocompleteInstructions minSearchLength={3} styles={emptyStyles} />,
    );

    const instructions = screen.getByText(
      'Type at least 3 characters to search',
    );
    expect(instructions).toBeInTheDocument();
    // Should have the default IressPanel class when instructions is undefined
    expect(instructions).toHaveClass('iress-u-panel');
  });
});

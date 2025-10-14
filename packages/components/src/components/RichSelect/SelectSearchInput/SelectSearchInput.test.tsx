import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { selectSearchInput } from './SelectSearchInput.styles';
import { IressSelectSearchInput } from './SelectSearchInput';

describe('IressSelectSearchInput', () => {
  it('renders with the appropriate defaults', () => {
    const classes = selectSearchInput({ isActiveInPopover: false });

    render(<IressSelectSearchInput data-testid="test-component" />);

    const selectSearch = screen.getByTestId('test-component');
    if (classes.root) {
      expect(selectSearch).toHaveClass(classes.root);
    }

    const prepend = screen.getByRole('img', { hidden: true });
    expect(prepend).toHaveClass('fa-search');

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('should have accessible name from aria-label when provided', () => {
      render(<IressSelectSearchInput aria-label="Custom search label" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Custom search label');
    });

    it('should have accessible name from placeholder when no aria-label provided', () => {
      render(<IressSelectSearchInput placeholder="Find items" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Find items');
    });

    it('should have default accessible name when no aria-label or placeholder provided', () => {
      render(<IressSelectSearchInput />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Search');
    });

    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressSelectSearchInput />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

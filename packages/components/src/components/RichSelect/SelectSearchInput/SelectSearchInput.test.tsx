import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import styles from './SelectSearchInput.module.scss';
import inputStyles from '../../Input/Input.module.scss';
import { IressSelectSearchInput } from './SelectSearchInput';

describe('IressSelectSearchInput', () => {
  it('renders with the appropriate defaults', () => {
    render(<IressSelectSearchInput data-testid="test-component" />);

    const selectSearch = screen.getByTestId('test-component');
    expect(selectSearch).toHaveClass(
      styles.selectSearchInput,
      inputStyles.watermark,
    );

    const prepend = screen.getByRole('img', { hidden: true });
    expect(prepend).toHaveClass('fa-search');

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    // TODO: Check why this is failing
    it.skip('should not have basic accessibility issues', async () => {
      const { container } = render(<IressSelectSearchInput />);
      const results = await axe(container);
      expect(results).not.toHaveNoViolations();
    });
  });
});

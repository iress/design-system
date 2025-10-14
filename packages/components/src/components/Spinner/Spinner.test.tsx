import { render, screen } from '@testing-library/react';
import { IressSpinner } from '.';
import styles from './Spinner.module.scss';
import iconStyles from '../Icon/Icon.module.scss';
import { axe } from 'jest-axe';

describe('IressSpinner', () => {
  it('renders the correct defaults', () => {
    render(
      <IressSpinner
        data-testid="test-spinner"
        className="test-class"
        screenreaderText="spinner"
      />,
    );

    screen.getByTestId('test-spinner');

    const spinner = screen.getByRole('img', { name: 'spinner' });
    expect(spinner).toHaveClass(
      'test-class',
      styles.spinner,
      'fa-spinner-third',
      iconStyles['spin-half'],
    );
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressSpinner screenreaderText="spinner" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

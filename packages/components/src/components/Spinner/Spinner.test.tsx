import { render, screen } from '@testing-library/react';
import { IressSpinner } from '.';
import { axe } from 'jest-axe';
import { icon } from '../Icon/Icon.styles';
import { GlobalCSSClass } from '@/enums';

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
      'bx-s_border-box', // spinner styles
      'fa-spinner-third', // icon name
      icon({ spin: 'half' }), // icon styles
      GlobalCSSClass.Spinner,
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

import { render, screen } from '@testing-library/react';
import { IressSpinner } from '.';
import { axe } from 'jest-axe';
import { icon } from '../Icon/Icon.styles';
import { chatty } from './Spinner.styles';
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
      icon({ spin: 'half' }), // icon styles
      GlobalCSSClass.Spinner,
    );
    expect(spinner).toHaveTextContent('progress_activity');
  });

  describe('variant', () => {
    it('renders chatty variant with three dots', () => {
      render(
        <IressSpinner
          variant="chatty"
          data-testid="test-chatty-spinner"
          screenreaderText="User is typing..."
        />,
      );

      const spinner = screen.getByTestId('test-chatty-spinner');
      expect(spinner).toHaveClass(chatty().root!, GlobalCSSClass.Spinner);
    });

    it('has correct aria-label for chatty variant', () => {
      render(
        <IressSpinner variant="chatty" screenreaderText="User is typing..." />,
      );

      const spinner = screen.getByLabelText('User is typing...');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressSpinner screenreaderText="spinner" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('chatty variant does not have basic accessibility issues', async () => {
      const { container } = render(
        <IressSpinner variant="chatty" screenreaderText="spinner" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

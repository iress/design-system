import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSkipLink } from '.';
import { GlobalCSSClass } from '@/enums';

describe('IressSkipLink', () => {
  it('should render with test id', () => {
    render(<IressSkipLink href="#main" data-testid="test" />);
    expect(screen.getByTestId('test')).toHaveClass(GlobalCSSClass.SkipLink);
  });

  describe('props', () => {
    describe('href', () => {
      it('renders if href is defined', () => {
        render(<IressSkipLink href="#main" />);

        const link = screen.getByRole('link', { name: 'Skip to content' });

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '#main');
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressSkipLink href="#main" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

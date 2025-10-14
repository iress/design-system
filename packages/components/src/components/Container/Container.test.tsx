import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { container, IressContainer } from '.';
import { GlobalCSSClass } from '@/enums';

describe('IressContainer', () => {
  it('renders the component with the correct classes', () => {
    render(<IressContainer role="main" className="test-class" />);

    expect(screen.getByRole('main')).toHaveClass(
      'test-class',
      container(),
      GlobalCSSClass.Container,
    );
  });

  describe('props', () => {
    describe('fluid', () => {
      it('uses container fluid variation from recipe', () => {
        render(<IressContainer role="main" fluid />);
        expect(screen.getByRole('main')).toHaveClass(
          container({ fluid: true }),
        );
      });
    });
  });

  describe('accessibility', () => {
    it('does not have basic accessibility issues', async () => {
      const { container } = render(<IressContainer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

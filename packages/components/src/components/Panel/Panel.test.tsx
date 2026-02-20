import { screen, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressPanel } from '.';
import { GlobalCSSClass } from '@/enums';

describe('IressPanel', () => {
  describe('props', () => {
    it('renders the correct default classes', () => {
      render(<IressPanel className="test-class">Hello</IressPanel>);

      const text = screen.getByText('Hello');
      expect(text).toBeInTheDocument();
      const panel = text.parentElement;
      expect(panel).toHaveClass('test-class', GlobalCSSClass.Panel);
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressPanel>Test Panel</IressPanel>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressPlaceholder } from './Placeholder';
import { placeholder } from './Placeholder.styles';

describe('IressPlaceholder', () => {
  describe('default', () => {
    it('renders the component with the correct defaults', () => {
      render(
        <IressPlaceholder className="test-class">Placeholder</IressPlaceholder>,
      );

      const component = screen.getByText('Placeholder');
      expect(component).toBeInTheDocument();
      expect(component).toHaveClass('test-class', placeholder().root!);
      expect(component).toHaveStyle({ width: 'auto', height: 'auto' });
    });
  });

  describe('props', () => {
    it('stretch => makes height 100%', () => {
      render(<IressPlaceholder stretch>Placeholder</IressPlaceholder>);
      const component = screen.getByText('Placeholder');
      expect(component).toHaveStyle({ height: '100%' });
    });

    it('width => adds a custom width', () => {
      render(<IressPlaceholder width={48}>Placeholder</IressPlaceholder>);
      const component = screen.getByText('Placeholder');
      expect(component).toHaveStyle({ width: '48px' });
    });

    it('height => adds a custom height', () => {
      render(<IressPlaceholder height={48}>Placeholder</IressPlaceholder>);
      const component = screen.getByText('Placeholder');
      expect(component).toHaveStyle({ height: '48px' });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressPlaceholder>Placeholder</IressPlaceholder>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

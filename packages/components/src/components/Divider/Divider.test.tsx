import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { DividerCssClass, IressDivider } from '.';

describe('IressDivider', () => {
  it('render the component with correct classes', () => {
    const screen = render(<IressDivider />);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveClass(DividerCssClass.Base);
  });

  describe('props', () => {
    describe('gutter', () => {
      it('adds a gutter class if specified', () => {
        const screen = render(<IressDivider gutter="md" />);

        const separator = screen.getByRole('separator');
        expect(separator).toHaveClass(`${DividerCssClass.Gutter}--md`);
      });
    });

    describe('vertical', () => {
      it('changes the class name based on orientation', () => {
        const screen = render(<IressDivider vertical />);

        const separator = screen.getByRole('separator');
        expect(separator).toHaveClass(DividerCssClass.Vertical);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(<IressDivider />);
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});

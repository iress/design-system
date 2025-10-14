import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressDivider } from '.';
import { divider } from './Divider.styles';
import { GlobalCSSClass } from '@/enums';

describe('IressDivider', () => {
  it('render the component with correct classes', () => {
    const screen = render(<IressDivider />);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveClass(divider(), GlobalCSSClass.Divider);
  });

  describe('props', () => {
    describe('vertical', () => {
      it('changes the class name based on orientation', () => {
        const screen = render(<IressDivider vertical />);

        const separator = screen.getByRole('separator');
        expect(separator).toHaveClass(divider({ vertical: true }));
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

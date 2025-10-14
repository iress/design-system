import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressStack, IressStackProps } from './Stack';
import { GlobalCSSClass } from '@/enums';

const renderComponent = (args: IressStackProps) => {
  return render(
    <IressStack data-testid="test-component" {...args}>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
    </IressStack>,
  );
};

describe('IressStack', () => {
  describe('props', () => {
    it('should not render with the default classes when gutter is not provided', () => {
      const { getByTestId } = renderComponent({});
      const component = getByTestId('test-component');
      expect(component).toHaveClass(GlobalCSSClass.Stack);
      expect(component).not.toHaveClass('iress-u-stack');
      expect(component).not.toHaveClass('iress--gutter--none');
    });

    it('should render with the default classes when gutter is provided', () => {
      const { getByTestId } = renderComponent({ gap: 'spacing.400' });
      const component = getByTestId('test-component');
      expect(component).not.toHaveClass('iress-u-stack');
      expect(component).not.toHaveClass('iress--gutter--md');
      expect(component).toHaveClass('gap_spacing.400');
    });

    describe('gutter', () => {
      it('should use the same value for all breakpoints', () => {
        const screen = renderComponent({
          gap: 'spacing.400',
        });

        const container = screen.getByTestId('test-component');

        expect(container).not.toHaveClass('iress-u-stack');
        expect(container).not.toHaveClass(/iress--gutter/);
        expect(container).toHaveClass('gap_spacing.400');
      });
    });

    describe('gap', () => {
      it('should use the same value for all breakpoints', () => {
        const screen = renderComponent({
          gap: 'spacing.400',
        });

        const container = screen.getByTestId('test-component');

        expect(container).not.toHaveClass('iress-u-stack');
        expect(container).not.toHaveClass(/iress--gutter/);
        expect(container).toHaveClass('gap_spacing.400');
      });

      it('should handle different values for different breakpoints', () => {
        const screen = renderComponent({
          gap: {
            base: 'spacing.200',
            md: 'spacing.400',
            lg: 'spacing.800',
          },
        });

        const container = screen.getByTestId('test-component');

        expect(container).not.toHaveClass('iress-u-stack');
        expect(container).not.toHaveClass(/iress--gutter/);
        // The css utility should generate a class that applies different gaps at different breakpoints
        expect(container).toHaveClass(/gap_/);
      });

      it('should not interfere with other stack properties', () => {
        const screen = renderComponent({
          gap: 'spacing.400',
        });

        const container = screen.getByTestId('test-component');
        expect(container).toHaveClass('gap_spacing.400');
        expect(container).not.toHaveClass('iress-u-stack');
        expect(container).not.toHaveClass('iress--gutter--md');
      });

      it('should handle zero spacing', () => {
        const screen = renderComponent({
          gap: 'spacing.000',
        });

        const container = screen.getByTestId('test-component');
        expect(container).toHaveClass('gap_spacing.000');
        expect(container).not.toHaveClass('iress-u-stack');
        expect(container).not.toHaveClass(/iress--gutter/);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderComponent({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressStack, IressStackProps } from './Stack';
import { GlobalCSSClass } from '@/enums';

const classNames = {
  horizontalAlignCenter: 'ai_center',
  horizontalAlignLeft: 'ai_flex-start',
  horizontalAlignRight: 'ai_flex-end',
  verticalAlignTop: 'jc_flex-start',
  verticalAlignMiddle: 'jc_center',
  verticalAlignBottom: 'jc_flex-end',
};

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
      const { getByTestId } = renderComponent({ gap: 'spacing.4' });
      const component = getByTestId('test-component');
      expect(component).not.toHaveClass('iress-u-stack');
      expect(component).not.toHaveClass('iress--gutter--md');
      expect(component).toHaveClass('gap_spacing.4');
    });

    describe('gutter', () => {
      it('should use the same value for all breakpoints', () => {
        const screen = renderComponent({
          gap: 'spacing.4',
        });

        const container = screen.getByTestId('test-component');

        expect(container).not.toHaveClass('iress-u-stack');
        expect(container).not.toHaveClass(/iress--gutter/);
        expect(container).toHaveClass('gap_spacing.4');
      });
    });

    describe('horizontalAlign', () => {
      it('should apply center horizontal alignment', () => {
        const { getByTestId } = renderComponent({ horizontalAlign: 'center' });
        const component = getByTestId('test-component');
        expect(component).toHaveClass(classNames.horizontalAlignCenter);
      });

      it('should apply left horizontal alignment', () => {
        const { getByTestId } = renderComponent({ horizontalAlign: 'left' });
        const component = getByTestId('test-component');
        expect(component).toHaveClass(classNames.horizontalAlignLeft);
      });

      it('should apply right horizontal alignment', () => {
        const { getByTestId } = renderComponent({ horizontalAlign: 'right' });
        const component = getByTestId('test-component');
        expect(component).toHaveClass(classNames.horizontalAlignRight);
      });
    });

    describe('verticalAlign', () => {
      it('should apply top vertical alignment', () => {
        const { getByTestId } = renderComponent({ verticalAlign: 'top' });
        const component = getByTestId('test-component');
        expect(component).toHaveClass(classNames.verticalAlignTop);
      });

      it('should apply middle vertical alignment', () => {
        const { getByTestId } = renderComponent({ verticalAlign: 'middle' });
        const component = getByTestId('test-component');
        expect(component).toHaveClass(classNames.verticalAlignMiddle);
      });

      it('should apply bottom vertical alignment', () => {
        const { getByTestId } = renderComponent({ verticalAlign: 'bottom' });
        const component = getByTestId('test-component');
        expect(component).toHaveClass(classNames.verticalAlignBottom);
      });
    });

    describe('gap', () => {
      it('should use the same value for all breakpoints', () => {
        const screen = renderComponent({
          gap: 'spacing.4',
        });

        const container = screen.getByTestId('test-component');

        expect(container).not.toHaveClass('iress-u-stack');
        expect(container).not.toHaveClass(/iress--gutter/);
        expect(container).toHaveClass('gap_spacing.4');
      });

      it('should handle different values for different breakpoints', () => {
        const screen = renderComponent({
          gap: {
            base: 'spacing.2',
            md: 'spacing.4',
            lg: 'spacing.8',
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
          gap: 'spacing.4',
        });

        const container = screen.getByTestId('test-component');
        expect(container).toHaveClass('gap_spacing.4');
        expect(container).not.toHaveClass('iress-u-stack');
        expect(container).not.toHaveClass('iress--gutter--md');
      });

      it('should handle zero spacing', () => {
        const screen = renderComponent({
          gap: 'spacing.0',
        });

        const container = screen.getByTestId('test-component');
        expect(container).toHaveClass('gap_spacing.0');
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

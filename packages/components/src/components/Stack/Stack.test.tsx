import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressStack, IressStackProps, StackCssClass } from '.';

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
    it('should render with the default classes', () => {
      const { getByTestId } = renderComponent({});
      const component = getByTestId('test-component');
      expect(component).toHaveClass(StackCssClass.Base);
      expect(component).toHaveClass(`${StackCssClass.Gutter}--none`);
    });

    describe('gutter', () => {
      it('should use the same value for all breakpoints', () => {
        const screen = renderComponent({
          gutter: IressStack.Gutter.Md,
        });

        const container = screen.getByTestId('test-component');

        expect(container).toHaveClass('iress-u-stack');
        expect(container).toHaveClass('iress--gutter--md');
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

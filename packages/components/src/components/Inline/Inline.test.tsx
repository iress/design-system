import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressInline, type IressInlineProps, InlineCssClass } from '.';

const renderComponent = (args: IressInlineProps) => {
  return render(
    <IressInline data-testid="test-component" {...args}>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
    </IressInline>,
  );
};

describe('IressInline', () => {
  describe('props', () => {
    test('default classes should be applied', () => {
      const { getByTestId } = renderComponent({});
      const component = getByTestId('test-component');
      expect(component).toHaveClass(InlineCssClass.Base);
      expect(component).toHaveClass(`${InlineCssClass.Gutter}--none`);
    });

    test('gutter should apply the correct class when set', () => {
      const screen = renderComponent({
        gutter: 'md',
      });

      const container = screen.getByTestId('test-component');

      expect(container).toHaveClass('iress-u-inline');
      expect(container).toHaveClass('iress--gutter--md');
    });

    test('horizontalAlign should apply the correct class when set', () => {
      const screen = renderComponent({
        horizontalAlign: 'right',
      });

      const container = screen.getByTestId('test-component');

      expect(container).toHaveClass('iress-u-inline');
      expect(container).toHaveClass(`${InlineCssClass.HorizontalAlign}--right`);
    });

    test('noWrap should apply the correct class when set', () => {
      const screen = renderComponent({
        noWrap: true,
      });

      const container = screen.getByTestId('test-component');

      expect(container).toHaveClass('iress-u-inline');
      expect(container).toHaveClass(InlineCssClass.NoWrap);
    });

    test('verticalAlign should apply the correct class when set', () => {
      const screen = renderComponent({
        verticalAlign: 'middle',
      });

      const container = screen.getByTestId('test-component');

      expect(container).toHaveClass('iress-u-inline');
      expect(container).toHaveClass(`${InlineCssClass.VerticalAlign}--middle`);
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

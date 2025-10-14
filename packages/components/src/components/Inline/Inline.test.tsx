import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressInline, IressInlineProps } from '.';
import { GlobalCSSClass } from '@/enums';

const classNames = {
  gapDefault: 'gap_spacing.000',
  gapMd: 'gap_spacing.400',
  wrapDefault: 'flex-wrap_wrap',
  wrapNoWrap: 'flex-wrap_nowrap',
  horizontalAlignDefault: 'jc_flex-start',
  horizontalAlignRight: 'jc_flex-end',
  verticalAlignDefault: 'ai_flex-start',
  verticalAlignCenter: 'ai_center',
};

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
      expect(component).toHaveClass(classNames.wrapDefault);
      expect(component).toHaveClass(classNames.horizontalAlignDefault);
      expect(component).toHaveClass(classNames.verticalAlignDefault);
      expect(component).toHaveClass(classNames.gapDefault);
      expect(component).toHaveClass(GlobalCSSClass.Inline);
    });

    test('gap should apply the correct class when set', () => {
      const screen = renderComponent({
        gap: 'spacing.400',
      });

      const container = screen.getByTestId('test-component');

      expect(container).not.toHaveClass('iress-u-inline');
      expect(container).not.toHaveClass('iress--gutter--md');
      expect(container).toHaveClass(classNames.gapMd);
    });

    test('horizontalAlign should apply the correct class when set', () => {
      const screen = renderComponent({
        horizontalAlign: 'right',
      });

      const container = screen.getByTestId('test-component');

      expect(container).not.toHaveClass('iress-u-inline');
      expect(container).toHaveClass(classNames.horizontalAlignRight);
    });

    test('noWrap should apply the correct class when set', () => {
      const screen = renderComponent({
        noWrap: true,
      });

      const container = screen.getByTestId('test-component');

      expect(container).not.toHaveClass('iress-u-inline');
      expect(container).toHaveClass(classNames.wrapNoWrap);
    });

    test('verticalAlign should apply the correct class when set', () => {
      const screen = renderComponent({
        verticalAlign: 'middle',
      });

      const container = screen.getByTestId('test-component');

      expect(container).not.toHaveClass('iress-u-inline');
      expect(container).toHaveClass(classNames.verticalAlignCenter);
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

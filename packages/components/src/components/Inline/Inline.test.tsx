import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressInline, IressInlineProps } from '.';
import { GlobalCSSClass } from '@/enums';

const classNames = {
  gapDefault: 'gap_spacing.0',
  gapMd: 'gap_spacing.4',
  wrapDefault: 'flex-wrap_wrap',
  wrapNoWrap: 'flex-wrap_nowrap',
  horizontalAlignRight: 'fha_right',
  verticalAlignCenter: 'fva_middle',
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
      expect(component).toHaveClass(classNames.gapDefault);
      expect(component).toHaveClass(GlobalCSSClass.Inline);
    });

    test('gap should apply the correct class when set', () => {
      const screen = renderComponent({
        gap: 'spacing.4',
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

    test('should have data-flex-dir="row" attribute', () => {
      const { getByTestId } = renderComponent({});
      const component = getByTestId('test-component');

      expect(component).toHaveAttribute('data-flex-dir', 'row');
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

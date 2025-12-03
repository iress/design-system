import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressPanel, type IressPanelProps, PanelCssClass } from '.';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';

function renderComponent(props?: IressPanelProps) {
  return render(
    <IressPanel {...props} data-testid={TEST_ID}>
      <div>Test content</div>
    </IressPanel>,
  );
}

describe('IressPanel', () => {
  describe('props', () => {
    it('renders the correct default classes', () => {
      const { getByTestId } = renderComponent({
        className: 'test-class',
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass('test-class');
      expect(component).toHaveClass(PanelCssClass.Base);
      expect(component).not.toHaveClass(PanelCssClass.Stretch);
      expect(component).toHaveClass(`${GlobalCSSClass.TextAlignBase}--inherit`);
      expect(component).toHaveClass(`${PanelCssClass.Background}--default`);
      expect(component).not.toHaveClass(PanelCssClass.NoBorderRadius);
      expect(component).toHaveClass(`${GlobalCSSClass.Padding}--md`);
    });

    it('renders the correct classes with custom props', () => {
      const { getByTestId } = renderComponent({
        className: 'test-class',
        background: 'alt',
        noBorderRadius: true,
        padding: 'lg',
        stretch: true,
        textAlign: 'center',
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass('test-class');
      expect(component).toHaveClass(PanelCssClass.Base);
      expect(component).toHaveClass(PanelCssClass.Stretch);
      expect(component).toHaveClass(`${GlobalCSSClass.TextAlignBase}--center`);
      expect(component).toHaveClass(`${PanelCssClass.Background}--alt`);
      expect(component).toHaveClass(PanelCssClass.NoBorderRadius);
      expect(component).toHaveClass(`${GlobalCSSClass.Padding}--lg`);
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressPanel data-testid="test-component" className="test-class">
          Test Panel
        </IressPanel>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

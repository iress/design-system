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
  describe('Default rendering', () => {
    it('should render with default base styles', () => {
      const { getByTestId } = renderComponent({});
      const component = getByTestId('test-component');

      expect(component).toHaveClass(GlobalCSSClass.Stack);
      expect(component).toHaveClass('d_flex');
      expect(component).toHaveClass('flex-d_column');
    });

    it('should render as a div by default', () => {
      const { getByTestId } = renderComponent({});
      const component = getByTestId('test-component');

      expect(component.tagName).toBe('DIV');
    });

    it('should render as a custom element when specified', () => {
      const { getByTestId } = render(
        <IressStack data-testid="test-component" element="section">
          <div>Test</div>
        </IressStack>,
      );
      const component = getByTestId('test-component');

      expect(component.tagName).toBe('SECTION');
    });

    it('should render children correctly', () => {
      const { getByText } = render(
        <IressStack>
          <div>First child</div>
          <div>Second child</div>
        </IressStack>,
      );

      expect(getByText('First child')).toBeInTheDocument();
      expect(getByText('Second child')).toBeInTheDocument();
    });

    it('should have data-flex-dir="column" attribute', () => {
      const { getByTestId } = renderComponent({});
      const component = getByTestId('test-component');

      expect(component).toHaveAttribute('data-flex-dir', 'column');
    });
  });

  describe('gap prop', () => {
    it('should apply gap when provided', () => {
      const { getByTestId } = renderComponent({ gap: 'spacing.4' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('gap_spacing.4');
    });

    it('should apply responsive gap values', () => {
      const { getByTestId } = renderComponent({
        gap: {
          base: 'spacing.2',
          md: 'spacing.4',
          lg: 'spacing.8',
        },
      });
      const component = getByTestId('test-component');

      expect(component.className).toMatch(/gap_/);
    });

    it('should handle zero spacing', () => {
      const { getByTestId } = renderComponent({ gap: 'spacing.0' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('gap_spacing.0');
    });
  });

  describe('horizontalAlign prop', () => {
    it('should apply center horizontal alignment', () => {
      const { getByTestId } = renderComponent({ horizontalAlign: 'center' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fha_center');
    });

    it('should apply left horizontal alignment', () => {
      const { getByTestId } = renderComponent({ horizontalAlign: 'left' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fha_left');
    });

    it('should apply right horizontal alignment', () => {
      const { getByTestId } = renderComponent({ horizontalAlign: 'right' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fha_right');
    });
  });

  describe('verticalAlign prop', () => {
    it('should apply top vertical alignment', () => {
      const { getByTestId } = renderComponent({ verticalAlign: 'top' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fva_top');
    });

    it('should apply middle vertical alignment', () => {
      const { getByTestId } = renderComponent({ verticalAlign: 'middle' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fva_middle');
    });

    it('should apply bottom vertical alignment', () => {
      const { getByTestId } = renderComponent({ verticalAlign: 'bottom' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fva_bottom');
    });

    it('should apply between vertical alignment', () => {
      const { getByTestId } = renderComponent({ verticalAlign: 'between' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fva_between');
    });

    it('should apply around vertical alignment', () => {
      const { getByTestId } = renderComponent({ verticalAlign: 'around' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fva_around');
    });

    it('should apply evenly vertical alignment', () => {
      const { getByTestId } = renderComponent({ verticalAlign: 'evenly' });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('fva_evenly');
    });
  });

  describe('Combined props', () => {
    it('should apply multiple props together', () => {
      const { getByTestId } = renderComponent({
        gap: 'spacing.4',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
      });
      const component = getByTestId('test-component');

      expect(component).toHaveClass('gap_spacing.4');
      expect(component).toHaveClass('fha_center');
      expect(component).toHaveClass('fva_middle');
    });

    it('should merge custom className with component classes', () => {
      const { getByTestId } = render(
        <IressStack data-testid="test-component" className="custom-class">
          <div>Test</div>
        </IressStack>,
      );
      const component = getByTestId('test-component');

      expect(component).toHaveClass('custom-class');
      expect(component).toHaveClass(GlobalCSSClass.Stack);
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

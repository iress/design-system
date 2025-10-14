import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressText } from '.';
import { GlobalCSSClass } from '@/enums';

const modes = Object.values(IressText.Mode);
const variants = Object.values(IressText.Variant);
const aligns = Object.values(IressText.Align);

describe('IressText', () => {
  describe('props', () => {
    it('should render with default props', () => {
      render(
        <IressText className="test-class" data-testid="test-id">
          Test text
        </IressText>,
      );

      const element = screen.getByTestId('test-id');

      expect(element).toHaveClass('iress-u-text');
      expect(element).toHaveClass('test-class');
      expect(element).not.toHaveClass('iress--no-gutter');
      expect(element).toBeInstanceOf(HTMLDivElement);
    });

    it.each(modes)('should render with mode %s', (mode) => {
      const { container } = render(
        <IressText mode={mode}>Test text</IressText>,
      );

      expect(container.firstChild).toHaveClass(`iress--${mode}`);
    });

    it.each(variants)('should render with variant %s', (variant) => {
      const { container } = render(
        <IressText variant={variant}>Test text</IressText>,
      );

      expect(container.firstChild).toHaveClass(`iress--${variant}`);
    });

    it.each(aligns)('should render with align %s', (align) => {
      const { container } = render(
        <IressText align={align}>Test text</IressText>,
      );

      expect(container.firstChild).toHaveClass(
        `${GlobalCSSClass.TextAlignBase}--${align}`,
      );
    });

    it('should render with the correct element', () => {
      const { container } = render(
        <IressText element={IressText.Element.Span}>Test text</IressText>,
      );

      expect(container.firstChild).toBeInstanceOf(HTMLSpanElement);
    });
  });
});

describe('accessibility', () => {
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <IressText data-testid="test-component" className="test-class">
        Test text
      </IressText>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

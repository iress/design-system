import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressText } from '.';
import { text } from './Text.styles';
import { GlobalCSSClass } from '@/enums';

describe('IressText', () => {
  describe('props', () => {
    it('should render with default props', () => {
      render(
        <IressText className="test-class" data-testid="test-id">
          Test text
        </IressText>,
      );

      const element = screen.getByTestId('test-id');

      expect(element).toHaveClass(text(), 'test-class', GlobalCSSClass.Text);
      expect(element).toBeInstanceOf(HTMLDivElement);
    });

    it('should render with the correct element', () => {
      const { container } = render(
        <IressText element="span">Test text</IressText>,
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

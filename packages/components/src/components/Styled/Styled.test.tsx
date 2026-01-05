import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { IressStyled } from './Styled';
import { iressCss } from '@/main';
import { createRef } from 'react';

describe('IressStyled', () => {
  describe('Default rendering', () => {
    it('should render as a div by default', () => {
      const { container } = render(
        <IressStyled data-testid="test-styled">Test Content</IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe('DIV');
      expect(element).toHaveTextContent('Test Content');
    });

    it('should render children correctly', () => {
      const { getByText } = render(
        <IressStyled>
          <span>Child 1</span>
          <span>Child 2</span>
        </IressStyled>,
      );

      expect(getByText('Child 1')).toBeInTheDocument();
      expect(getByText('Child 2')).toBeInTheDocument();
    });

    it('should apply className correctly', () => {
      const { container } = render(
        <IressStyled className="custom-class">Content</IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass('custom-class');
    });

    it('should forward data-testid prop', () => {
      const { getByTestId } = render(
        <IressStyled data-testid="test-id">Content</IressStyled>,
      );

      expect(getByTestId('test-id')).toBeInTheDocument();
    });
  });

  describe('Custom element rendering', () => {
    it('should render as a custom HTML element when element prop is provided', () => {
      const { container } = render(
        <IressStyled element="section">Section Content</IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe('SECTION');
      expect(element).toHaveTextContent('Section Content');
    });

    it('should render as span when element is span', () => {
      const { container } = render(
        <IressStyled element="span">Span Content</IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe('SPAN');
    });

    it('should render as button when element is button', () => {
      const { container } = render(
        <IressStyled element="button">Button Content</IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe('BUTTON');
    });

    it('should render as article when element is article', () => {
      const { container } = render(
        <IressStyled element="article">Article Content</IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe('ARTICLE');
    });
  });

  describe('Panda CSS props', () => {
    it('should apply Panda CSS style props', () => {
      render(
        <IressStyled p="xl" m="lg" bg="colour.neutral.10">
          Styled Content
        </IressStyled>,
      );

      expect(screen.getByText('Styled Content')).toHaveClass(
        ...iressCss({
          p: 'xl',
          m: 'lg',
          bg: 'colour.neutral.10',
        }).split(' '),
      );
    });

    it('should combine className with Panda CSS props', () => {
      render(
        <IressStyled className="custom-class" p="xl">
          Content
        </IressStyled>,
      );

      expect(screen.getByText('Content')).toHaveClass(
        ...[
          ...iressCss({
            p: 'xl',
          }).split(' '),
          'custom-class',
        ],
      );
    });
  });

  describe('Props forwarding', () => {
    it('should forward standard HTML attributes', () => {
      const { container } = render(
        <IressStyled id="test-id" title="Test Title" aria-label="Test Label">
          Content
        </IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('id', 'test-id');
      expect(element).toHaveAttribute('title', 'Test Title');
      expect(element).toHaveAttribute('aria-label', 'Test Label');
    });

    it('should forward event handlers', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <IressStyled element="button" onClick={handleClick}>
          Click Me
        </IressStyled>,
      );

      const button = container.firstChild as HTMLButtonElement;
      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge cases', () => {
    it('should render without children', () => {
      const { container } = render(<IressStyled />);

      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element.textContent).toBe('');
    });

    it('should render with null children', () => {
      const { container } = render(<IressStyled>{null}</IressStyled>);

      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element.textContent).toBe('');
    });

    it('should render with multiple types of children', () => {
      const { container } = render(
        <IressStyled>
          Text content
          <span>Span content</span>
          {123}
        </IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveTextContent('Text contentSpan content123');
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues with default div', async () => {
      const { container } = render(
        <IressStyled>Accessible content</IressStyled>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility issues with semantic elements', async () => {
      const { container } = render(
        <>
          <IressStyled element="article">Article content</IressStyled>
          <IressStyled element="section">Section content</IressStyled>
          <IressStyled element="nav">Navigation</IressStyled>
        </>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support ARIA attributes', () => {
      const { container } = render(
        <IressStyled role="alert" aria-live="polite" aria-atomic="true">
          Alert message
        </IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute('role', 'alert');
      expect(element).toHaveAttribute('aria-live', 'polite');
      expect(element).toHaveAttribute('aria-atomic', 'true');
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to the default div element', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <IressStyled ref={ref}>Content with ref</IressStyled>,
      );

      const element = container.firstChild as HTMLElement;
      expect(ref.current).toBe(element);
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('should forward ref to custom element types', () => {
      const buttonRef = createRef<HTMLButtonElement>();
      const { container: buttonContainer } = render(
        <IressStyled element="button" ref={buttonRef}>
          Button
        </IressStyled>,
      );

      expect(buttonRef.current?.tagName).toBe('BUTTON');
      expect(buttonRef.current).toBe(buttonContainer.firstChild);
    });

    it('should forward ref to section element', () => {
      const sectionRef = createRef<HTMLElement>();
      const { container } = render(
        <IressStyled element="section" ref={sectionRef}>
          Section content
        </IressStyled>,
      );

      expect(sectionRef.current?.tagName).toBe('SECTION');
      expect(sectionRef.current).toBe(container.firstChild);
    });

    it('should allow ref methods to be called', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <IressStyled ref={ref} data-testid="test-ref">
          Content
        </IressStyled>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.textContent).toBe('Content');
      expect(ref.current?.getAttribute('data-testid')).toBe('test-ref');
    });

    it('should work with callback refs', () => {
      let refElement: HTMLDivElement | null = null;
      const callbackRef = (element: HTMLDivElement | null) => {
        refElement = element;
      };

      const { container } = render(
        <IressStyled ref={callbackRef}>Callback ref content</IressStyled>,
      );

      expect(refElement).toBe(container.firstChild);
      expect(refElement!.textContent).toBe('Callback ref content');
    });
  });
});

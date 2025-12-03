import { type RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { CardCssClass, CardSlotClass, IressCard, type IressCardProps } from '.';
import userEvent from '@testing-library/user-event';

const TEST_ID = 'test-component';

function renderCard(
  { children, ...restProps }: Partial<IressCardProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressCard {...restProps} data-testid={TEST_ID}>
      {children ?? TEST_ID}
    </IressCard>,
  );
}

describe('IressCard', () => {
  it('should render the component with the correct text and classes', () => {
    const screen = renderCard({
      children: 'Test text',
      className: 'test-class',
    });

    const component = screen.getByTestId(TEST_ID);
    expect(component).toHaveClass(
      CardCssClass.Base,
      'test-class',
      `${CardCssClass.Padding}--md`,
    );

    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  it('renders with the correct data-testids', () => {
    const screen = renderCard({
      children: 'Test text',
      heading: 'Test heading',
      footer: 'Test footer',
    });

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__heading`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__body`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__footer`)).toBeInTheDocument();
  });

  describe('props', () => {
    describe('children', () => {
      it('renders children without slots if no slots provided', () => {
        const screen = renderCard({
          children: 'Test text',
        });

        const children = screen.getByText('Test text');
        expect(children).not.toHaveClass(CardSlotClass.Children);
      });

      it('renders children with slots if other slots provided', () => {
        const screen = renderCard({
          prepend: 'Prepend',
          children: 'Test text',
        });

        const children = screen.getByText('Test text');
        expect(children).toHaveClass(CardSlotClass.Children);
      });
    });

    describe('footer', () => {
      it('renders footer into footer slot if provided', () => {
        const screen = renderCard({
          footer: 'Test text',
        });

        const footer = screen.getByText('Test text');
        expect(footer).toHaveClass(CardSlotClass.Footer);
      });
    });

    describe('heading', () => {
      it('renders heading text into heading slot using a h2', () => {
        const screen = renderCard({
          heading: 'Test text',
        });

        const heading = screen.getByText('Test text');
        expect(heading.tagName).toBe('H2');
        expect(heading.parentElement).toHaveClass(CardSlotClass.Heading);
      });

      it('renders node directly into heading slot if provided', () => {
        const screen = renderCard({
          heading: <h3>Test text</h3>,
        });

        const heading = screen.getByText('Test text');
        expect(heading.tagName).toBe('H3');
        expect(heading.parentElement).toHaveClass(CardSlotClass.Heading);
      });
    });

    describe('media', () => {
      it('renders media into media slot if provided', () => {
        const screen = renderCard({
          media: 'Test text',
        });

        const media = screen.getByText('Test text');
        expect(media).toHaveClass(CardSlotClass.Media);
      });
    });

    describe('onClick', () => {
      it('calls the onClick function when the card is clicked', async () => {
        const onClick = vi.fn();

        const screen = renderCard({
          onClick,
        });

        await userEvent.click(screen.container.firstChild as Element);

        expect(onClick).toHaveBeenCalled();
      });

      it('renders as clickable', () => {
        const screen = renderCard({
          onClick: vi.fn(),
        });

        const component = screen.getByTestId(TEST_ID);
        expect(component).toHaveClass(CardCssClass.Clickable);
      });
    });

    describe('padding', () => {
      it('renders with custom padding', () => {
        const screen = renderCard({
          padding: 'lg',
        });

        const component = screen.getByTestId(TEST_ID);
        expect(component).toHaveClass(`${CardCssClass.Padding}--lg`);
      });
    });

    describe('prepend', () => {
      it('renders prepend into prepend slot if provided', () => {
        const screen = renderCard({
          prepend: 'Test text',
        });

        const prepend = screen.getByText('Test text');
        expect(prepend).toHaveClass(CardSlotClass.Prepend);
      });
    });

    describe('selected', () => {
      it('renders as selected', () => {
        const screen = renderCard({
          selected: true,
        });

        const component = screen.getByTestId(TEST_ID);
        expect(component).toHaveClass(CardCssClass.Selected);
      });
    });

    describe('stretch', () => {
      it('renders as stretched', () => {
        const screen = renderCard({
          stretch: true,
        });

        const component = screen.getByTestId(TEST_ID);
        expect(component).toHaveClass(CardCssClass.Stretch);
      });
    });

    describe('topRight', () => {
      it('renders topRight into topRight slot if provided', () => {
        const screen = renderCard({
          topRight: 'Test text',
        });

        const topRight = screen.getByText('Test text');
        expect(topRight).toHaveClass(CardSlotClass.TopRight);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressCard data-testid="test-component" className="test-class" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

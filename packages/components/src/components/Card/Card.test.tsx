import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import {
  IressCard,
  IressCardProps,
  IressButtonCard,
  IressLinkCard,
  card,
} from '.';
import userEvent from '@testing-library/user-event';
import { GlobalCSSClass } from '@/enums';

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
      'test-class',
      card().root!,
      GlobalCSSClass.Card,
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

  describe('Card styling', () => {
    it('provides correct default styling', () => {
      const screen = renderCard();
      const component = screen.getByTestId(TEST_ID);

      expect(component).toBeInTheDocument();
      expect(component.tagName).toBe('DIV');
    });

    describe('stretch', () => {
      it('applies stretch styling when stretch is true', () => {
        const screen = renderCard({ stretch: true });
        const component = screen.getByTestId(TEST_ID);

        expect(component).toHaveClass(card({ stretch: true }).root!);
      });
    });

    describe('selected', () => {
      it('applies selected styling when selected is true', () => {
        const screen = renderCard({ selected: true });
        const component = screen.getByTestId(TEST_ID);

        expect(component).toHaveClass(card({ selected: true }).root!);
      });
    });
  });

  describe('Card slots', () => {
    const slotCombinations: [string, string[]][] = [
      ['children', 'heading'],
      ['children', 'heading', 'footer'],
      ['prepend', 'children'],
      ['children', 'heading', 'footer', 'topRight'],
      ['children', 'heading', 'footer', 'topRight', 'media'],
      ['children', 'heading', 'footer', 'topRight', 'media', 'prepend'],
    ].map((combo) => [combo.join(' + '), combo]);

    it.each(slotCombinations)(
      `renders slots correctly for combo: %s`,
      (_combo, slots) => {
        const props = Object.fromEntries(
          slots
            .filter((slot) => slot !== 'children') // Handle children separately
            .map((slot) => [
              slot,
              <div key={slot} data-testid={`slot-${slot}`}>
                {slot}
              </div>,
            ]),
        );

        if (slots.includes('children')) {
          props.children = <div data-testid="slot-children">children</div>;
        }

        const { getByTestId } = renderCard(props);

        slots.forEach((slot) => {
          if (slot === 'children') {
            const slotContainer = getByTestId(`${TEST_ID}__body`);
            const slotContent = getByTestId('slot-children');
            expect(slotContainer).toContainElement(slotContent);
          } else {
            const slotTestId = `${TEST_ID}__${slot}`;
            const slotContainer = getByTestId(slotTestId);
            const slotContent = getByTestId(`slot-${slot}`);
            expect(slotContainer).toContainElement(slotContent);
          }
        });
      },
    );
  });

  describe('props', () => {
    describe('children', () => {
      it('renders children without slots if no slots provided', () => {
        const screen = renderCard({
          children: 'Test text',
        });
        const card = screen.getByTestId(TEST_ID);

        expect(card).toHaveTextContent('Test text');
        expect(
          screen.queryByTestId(`${TEST_ID}__body`),
        ).not.toBeInTheDocument();
        expect(card.childNodes.length).toBe(1);
      });

      it('renders children in body container if other slots provided', () => {
        const screen = renderCard({
          prepend: 'Prepend',
          children: 'Test text',
        });

        const children = screen.getByText('Test text');
        const body = screen.getByTestId(`${TEST_ID}__body`);
        expect(body).toContainElement(children);
      });
    });

    describe('footer', () => {
      it('renders footer into footer slot if provided', () => {
        const screen = renderCard({
          footer: 'Test text',
        });

        const footer = screen.getByText('Test text');
        const footerContainer = screen.getByTestId(`${TEST_ID}__footer`);
        expect(footerContainer).toContainElement(footer);
        expect(footerContainer).toHaveClass(card({ hasSlots: true }).footer!);
      });
    });

    describe('heading', () => {
      it('renders heading text into heading slot using a h3', () => {
        const screen = renderCard({
          heading: 'Test text',
        });

        const heading = screen.getByText('Test text');
        expect(heading.tagName).toBe('H2');
        const headingContainer = screen.getByTestId(`${TEST_ID}__heading`);
        expect(headingContainer).toContainElement(heading);
        expect(headingContainer).toHaveClass(
          card({ hasSlots: true, hasHeading: true }).heading!,
        );
      });

      it('renders node directly into heading slot if provided', () => {
        const screen = renderCard({
          heading: <h3>Test text</h3>,
        });

        const heading = screen.getByText('Test text');
        expect(heading.tagName).toBe('H3');
        const headingContainer = screen.getByTestId(`${TEST_ID}__heading`);
        expect(headingContainer).toContainElement(heading);
        expect(headingContainer).toHaveClass(
          card({ hasSlots: true, hasHeading: true }).heading!,
        );
      });
    });

    describe('media', () => {
      it('renders media into media slot if provided', () => {
        const screen = renderCard({
          media: 'Test text',
        });

        const media = screen.getByText('Test text');
        const mediaContainer = screen.getByTestId(`${TEST_ID}__media`);
        expect(mediaContainer).toContainElement(media);
        expect(mediaContainer).toHaveClass(
          card({ hasSlots: true, hasMedia: true }).media!,
        );
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

      it('applies clickable styling', () => {
        const screen = renderCard({
          onClick: vi.fn(),
        });

        const component = screen.getByTestId(TEST_ID);
        expect(component).toHaveClass(card({ clickable: true }).root!);
      });
    });

    describe('padding', () => {
      it('renders with custom padding', () => {
        const screen = renderCard({
          p: 'lg',
        });

        const component = screen.getByTestId(TEST_ID);
        expect(component).toHaveClass('p_lg');
      });
    });

    describe('prepend', () => {
      it('renders prepend into prepend slot if provided', () => {
        const screen = renderCard({
          prepend: 'Test text',
        });

        const prepend = screen.getByText('Test text');
        const prependContainer = screen.getByTestId(`${TEST_ID}__prepend`);
        expect(prependContainer).toContainElement(prepend);
        expect(prependContainer).toHaveClass(
          card({ hasSlots: true, hasPrepend: true }).prepend!,
        );
      });
    });

    describe('topRight', () => {
      it('renders topRight into topRight slot if provided', () => {
        const screen = renderCard({
          topRight: 'Test text',
        });

        const topRight = screen.getByText('Test text');
        const topRightContainer = screen.getByTestId(`${TEST_ID}__topRight`);
        expect(topRightContainer).toContainElement(topRight);
        expect(topRightContainer).toHaveClass(
          card({ hasSlots: true }).topRight!,
        );
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

describe('IressButtonCard', () => {
  it('should render the component with the correct text and as a button', () => {
    const screen = render(
      <IressButtonCard data-testid={TEST_ID} className="test-class">
        Test text
      </IressButtonCard>,
    );

    const card = screen.getByText('Test text');

    expect(card).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID).tagName).toBe('BUTTON');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressButtonCard data-testid={TEST_ID} className="test-class">
          Test text
        </IressButtonCard>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('IressLinkCard', () => {
  it('should render the component with the correct text and as an anchor', () => {
    const screen = render(
      <IressLinkCard data-testid={TEST_ID} className="test-class">
        Test text
      </IressLinkCard>,
    );

    const card = screen.getByText('Test text');

    expect(card).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID).tagName).toBe('A');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressLinkCard data-testid={TEST_ID} className="test-class">
          Test text
        </IressLinkCard>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

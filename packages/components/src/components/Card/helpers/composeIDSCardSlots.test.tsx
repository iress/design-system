import { render, renderHook } from '@testing-library/react';
import { CardSlotClass } from '../Card.types';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';
import { composeIDSCardSlots } from './composeIDSCardSlots';

describe('composeIDSCardSlots', () => {
  it('returns children directly if provided with no slots', () => {
    const children = <div></div>;

    const hook = renderHook(() =>
      composeIDSCardSlots({
        children,
      }),
    );

    const slottedChildren = hook.result.current;
    expect(slottedChildren).toBe(children);
  });

  it('renders a h2 element for the heading if string is provided', () => {
    const hook = renderHook(() =>
      composeIDSCardSlots({
        heading: 'Test text',
      }),
    );

    const screen = render(hook.result.current);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test text');
  });

  const combinations: [string, string[]][] = [
    ['children', 'heading'],
    ['children', 'heading', 'footer'],
    ['prepend', 'children'],
    ['children', 'heading', 'footer', 'topRight'],
    ['children', 'heading', 'footer', 'topRight', 'media'],
    ['children', 'heading', 'footer', 'topRight', 'media', 'prepend'],
  ].map((combo) => [combo.join(' + '), combo]);

  it.each(combinations)(
    `provides slottedChildren for combo: %s`,
    (_combo, slots) => {
      const props = Object.fromEntries(
        slots.map((slot) => [
          slot,
          <div key={slot} data-testid={slot}>
            {slot}
          </div>,
        ]),
      );
      const hook = renderHook(() => composeIDSCardSlots(props));

      const screen = render(hook.result.current);

      slots.forEach((slot) => {
        const slotElement = screen.getByTestId(slot);
        expect(slotElement).toBeInTheDocument();
        expect(slotElement.parentElement).toHaveClass(
          CardSlotClass[capitalizeFirstLetter(slot) as never],
        );
      });
    },
  );

  describe('Custom styles', () => {
    it('uses custom styles if provided', () => {
      const customStyles = {
        Prepend: 'custom-prepend',
        Heading: 'custom-heading',
        TopRight: 'custom-top-right',
        Media: 'custom-media',
        Children: 'custom-children',
        Footer: 'custom-footer',
      };

      const hook = renderHook(() =>
        composeIDSCardSlots(
          {
            prepend: <div></div>,
            heading: <div></div>,
            topRight: <div></div>,
            media: <div></div>,
            children: <div></div>,
            footer: <div></div>,
          },
          customStyles,
        ),
      );

      const screen = render(hook.result.current);

      expect(
        screen.container.querySelector(`.${customStyles.Prepend}`),
      ).not.toBe(null);
      expect(
        screen.container.querySelector(`.${customStyles.Heading}`),
      ).not.toBe(null);
      expect(
        screen.container.querySelector(`.${customStyles.TopRight}`),
      ).not.toBe(null);
      expect(screen.container.querySelector(`.${customStyles.Media}`)).not.toBe(
        null,
      );
      expect(
        screen.container.querySelector(`.${customStyles.Children}`),
      ).not.toBe(null);
      expect(
        screen.container.querySelector(`.${customStyles.Footer}`),
      ).not.toBe(null);
    });
  });
});

import { renderHook } from '@testing-library/react';
import { composeIDSCard } from './composeIDSCard';
import { CardCssClass } from '../Card.types';

describe('composeIDSCard', () => {
  it('provides defaults if no props provided', () => {
    const hook = renderHook(() => composeIDSCard());

    const wrapperProps = hook.result.current;
    expect(wrapperProps.className).toContain(CardCssClass.Base);
    expect(wrapperProps.className).toContain(`${CardCssClass.Padding}--md`);
    expect(wrapperProps.onClick).toBe(undefined);
  });

  describe('props', () => {
    describe('stretch', () => {
      it('adds stretch class to wrapper props', () => {
        const hook = renderHook(() =>
          composeIDSCard({
            stretch: true,
          }),
        );

        const wrapperProps = hook.result.current;
        expect(wrapperProps.className).toContain(CardCssClass.Stretch);
      });
    });

    describe('padding', () => {
      it('adds custom padding if provided', () => {
        const hook = renderHook(() =>
          composeIDSCard({
            padding: 'lg',
          }),
        );

        const wrapperProps = hook.result.current;
        expect(wrapperProps.className).not.toContain(
          `${CardCssClass.Padding}--md`,
        );
        expect(wrapperProps.className).toContain(`${CardCssClass.Padding}--lg`);
      });
    });

    describe('selected', () => {
      it('adds selected class name to card if set to true', () => {
        const hook = renderHook(() =>
          composeIDSCard({
            selected: true,
          }),
        );

        const wrapperProps = hook.result.current;
        expect(wrapperProps.className).toContain(CardCssClass.Selected);
      });
    });
  });

  describe('Custom styles', () => {
    it('uses custom styles if provided', () => {
      const customStyles = {
        Base: 'custom-base',
        Padding: 'custom-padding',
        Clickable: 'custom-clickable',
        Selected: 'custom-selected',
        Stretch: 'custom-stretch',
      };

      const hook = renderHook(() =>
        composeIDSCard(
          {
            onClick: () => undefined,
            selected: true,
            stretch: true,
          },
          customStyles,
        ),
      );

      const wrapperProps = hook.result.current;
      expect(wrapperProps.className).toContain(customStyles.Base);
      expect(wrapperProps.className).toContain(customStyles.Selected);
      expect(wrapperProps.className).toContain(customStyles.Stretch);
      expect(wrapperProps.className).toContain(`${customStyles.Padding}--md`);
    });
  });
});

import { composeHideClasses } from './composeHideClasses';
import { HideCssClass } from '../Hide.types';
import { BREAKPOINTS } from '@/main';

describe('composeHideClasses', () => {
  it('transforms a ResponsiveSizing<boolean> object into classes', () => {
    const fullTest = composeHideClasses(HideCssClass.TotallyHidden, {
      xs: true,
      sm: false,
      md: true,
      lg: false,
      xl: true,
    });

    expect(fullTest).toEqual([
      'iress-hidden--xs',
      'iress-hidden--md',
      'iress-hidden--xl',
      'iress-hidden--xxl',
    ]);
  });

  it('copies the previous breakpoint', () => {
    const previousBreakpoint = composeHideClasses(HideCssClass.TotallyHidden, {
      xs: true,
    });

    expect(previousBreakpoint).toEqual(
      BREAKPOINTS.map(
        (breakpoint) => `${HideCssClass.TotallyHidden}--${breakpoint}`,
      ),
    );
  });

  it('copies the previous breakpoint with gap in the middle', () => {
    const previousBreakpointWithGap = composeHideClasses(
      HideCssClass.TotallyHidden,
      {
        sm: true,
        lg: false,
      },
    );

    expect(previousBreakpointWithGap).toEqual([
      'iress-hidden--sm',
      'iress-hidden--md',
    ]);
  });
});

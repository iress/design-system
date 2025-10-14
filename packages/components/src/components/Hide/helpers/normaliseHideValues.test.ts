import { describe, it, expect } from 'vitest';
import { normaliseHideValues } from './normaliseHideValues';

describe('normaliseHideValues', () => {
  it('copies the previous breakpoint', () => {
    const previousBreakpoint = normaliseHideValues({
      xs: true,
    });

    expect(previousBreakpoint).toEqual({
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
      xxl: true,
    });
  });

  it('copies the previous breakpoint with gap in the middle', () => {
    const previousBreakpointWithGap = normaliseHideValues({
      sm: true,
      lg: false,
    });

    expect(previousBreakpointWithGap).toEqual({
      xs: false,
      sm: true,
      md: true,
      lg: false,
      xl: false,
      xxl: false,
    });
  });
});

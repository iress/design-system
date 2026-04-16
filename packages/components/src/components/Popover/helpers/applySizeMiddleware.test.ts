import { applySizeMiddlewareStyles } from './applySizeMiddleware';

describe('applySizeMiddlewareStyles', () => {
  it('always sets maxHeight to availableHeight even when space is limited (≤200px)', () => {
    // This tests the fix for the bug where the dropdown was cut off without scroll
    // when placed inside a scrollable container near the bottom of the screen.
    // Previously, maxHeight was only set when availableHeight > POPOVER_USE_MAX_HEIGHT (200),
    // so with limited space (e.g. 100px), no maxHeight was applied and the dropdown
    // overflowed its container.
    const style = {} as CSSStyleDeclaration;

    applySizeMiddlewareStyles(style, 250, 100);

    expect(style.maxHeight).toBe('100px');
  });

  it('always sets maxHeight to availableHeight when space is very limited', () => {
    const style = {} as CSSStyleDeclaration;

    applySizeMiddlewareStyles(style, 250, 50);

    expect(style.maxHeight).toBe('50px');
  });

  it('sets maxHeight when availableHeight is just below POPOVER_USE_MAX_HEIGHT (200)', () => {
    const style = {} as CSSStyleDeclaration;

    applySizeMiddlewareStyles(style, 250, 199);

    expect(style.maxHeight).toBe('199px');
  });

  it('sets maxHeight when availableHeight is above the old POPOVER_USE_MAX_HEIGHT threshold', () => {
    const style = {} as CSSStyleDeclaration;

    applySizeMiddlewareStyles(style, 250, 300);

    expect(style.maxHeight).toBe('300px');
  });

  it('sets width to match the reference element width', () => {
    const style = {} as CSSStyleDeclaration;

    applySizeMiddlewareStyles(style, 350, 400);

    expect(style.width).toBe('350px');
    expect(style.maxHeight).toBe('400px');
  });

  it('sets maxHeight when availableHeight is 0', () => {
    const style = {} as CSSStyleDeclaration;

    applySizeMiddlewareStyles(style, 250, 0);

    expect(style.maxHeight).toBe('0px');
  });
});

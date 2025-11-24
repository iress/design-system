import { getTransitionDuration } from './getTransitionDuration';

describe('getTransitionDuration', () => {
  it('gets the transition from an element', () => {
    const element = document.createElement('div');
    element.style.transitionDuration = '0.3s';
    expect(getTransitionDuration(element)).toBe(300 * 0.8);
  });

  it('uses the multiplier', () => {
    const element = document.createElement('div');
    element.style.transitionDuration = '0.3s';
    expect(getTransitionDuration(element, 1.2)).toBe(300 * 1.2);
  });

  it('returns fallback if no element sent in', () => {
    expect(getTransitionDuration()).toBe(240);
  });

  it('returns fallback if the duration is 0', () => {
    const element = document.createElement('div');
    element.style.transitionDuration = '0s';
    expect(getTransitionDuration(element, 1.2)).toBe(240);
  });
});

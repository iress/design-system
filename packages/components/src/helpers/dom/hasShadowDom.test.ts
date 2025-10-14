import { hasShadowDom } from './hasShadowDom';

describe('hasShadowDom', () => {
  it('returns true if element has shadow dom', () => {
    const ele = document.createElement('div');
    ele.attachShadow({ mode: 'open' });
    expect(hasShadowDom(ele)).toBe(true);
  });

  it('returns false if element does not have shadow dom', () => {
    const ele = document.createElement('div');
    expect(hasShadowDom(ele)).toBe(false);
  });
});

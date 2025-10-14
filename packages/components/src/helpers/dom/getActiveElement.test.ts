import { getActiveElement } from './getActiveElement';

describe('getActiveElement', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = '';
    Object.defineProperty(document, 'activeElement', {
      value: undefined,
      configurable: true,
    });
  });

  it(`returns undefined if there's no active element`, () => {
    // Mock activeElement on document
    const button = document.createElement('button');
    document.documentElement.appendChild(button);

    expect(getActiveElement()).toEqual(undefined);
  });

  it(`returns undefined if there's no active element (shadow DOM)`, () => {
    // Set up shadow root
    const div = document.createElement('div');
    div.attachShadow({ mode: 'open' });
    document.documentElement.appendChild(div);

    expect(getActiveElement()).toEqual(undefined);
  });

  it('returns the active element (no shadow DOM)', () => {
    // Mock activeElement on document
    const button = document.createElement('button');
    document.documentElement.appendChild(button);
    Object.defineProperty(document, 'activeElement', {
      value: button,
      configurable: true,
    });

    expect(getActiveElement()).toEqual(button);
  });

  it('returns the active element (shadow DOM)', () => {
    // Mock activeElement on shadow root
    const div = document.createElement('div');
    div.attachShadow({ mode: 'open' });
    const link = document.createElement('a');
    document.documentElement.appendChild(div);
    Object.defineProperty(document, 'activeElement', {
      value: div,
      configurable: true,
    });
    Object.defineProperty(div.shadowRoot, 'activeElement', {
      value: link,
      configurable: true,
    });

    expect(getActiveElement()).toEqual(link);
  });
});

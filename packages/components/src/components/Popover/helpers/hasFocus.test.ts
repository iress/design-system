import { hasFocus } from './hasFocus';

describe('hasFocus', () => {
  let linkContainer: HTMLDivElement, buttonContainer: HTMLDivElement;

  const setUpHasFocus = (setActiveEle: boolean) => {
    document.documentElement.innerHTML = '';

    // Create button inside a div
    const button = document.createElement('button');
    buttonContainer = document.createElement('div');
    buttonContainer.appendChild(button);
    document.documentElement.appendChild(buttonContainer);

    // Create link inside another div
    linkContainer = document.createElement('div');
    const link = document.createElement('a');
    link.href = 'https://google.com';
    linkContainer.appendChild(link);
    document.documentElement.appendChild(linkContainer);

    if (setActiveEle) {
      // Manually set activeElement prop on document for testing purposes
      Object.defineProperty(document, 'activeElement', {
        writable: true,
        value: button,
      });
    }
  };

  it(`returns false if element doesn't contain focussed ele`, () => {
    setUpHasFocus(true);
    const focusVal = hasFocus(linkContainer);
    expect(focusVal).toBe(false);
  });

  it(`returns false if no active element is found`, () => {
    setUpHasFocus(false);
    const focusVal = hasFocus(linkContainer);
    expect(focusVal).toBe(false);
  });

  it('returns true if element does contain focussed ele', () => {
    setUpHasFocus(true);
    const focusVal = hasFocus(buttonContainer);
    expect(focusVal).toEqual(true);
  });
});

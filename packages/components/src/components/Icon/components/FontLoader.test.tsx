import { render } from '@testing-library/react';
import { createRef } from 'react';
import { FontLoader } from './FontLoader';

describe('FontLoader', () => {
  const testUrl = 'https://example.com/font.css';

  it('renders style tag in document head', () => {
    render(<FontLoader keyPrefix="test" url={testUrl} />);

    const style = document.head.querySelector(`style[data-url="${testUrl}"]`);
    expect(style).toBeTruthy();
    expect(style?.textContent).toBe(`@import url("${testUrl}") layer(reset);`);
  });

  it('renders style tag in shadow container when provided', () => {
    const shadowRoot = document
      .createElement('div')
      .attachShadow({ mode: 'open' });

    render(
      <FontLoader keyPrefix="test" url={testUrl} container={shadowRoot} />,
    );

    const shadowStyle = shadowRoot.querySelector(
      `style[data-url="${testUrl}"]`,
    );
    expect(shadowStyle).toBeTruthy();
    expect(shadowStyle?.textContent).toBe(
      `@import url("${testUrl}") layer(reset);`,
    );
  });

  it('renders style tag in shadow container via ref', () => {
    const shadowRoot = document
      .createElement('div')
      .attachShadow({ mode: 'open' });
    const ref = createRef<ShadowRoot>();
    (ref as { current: ShadowRoot }).current = shadowRoot;

    render(<FontLoader keyPrefix="test" url={testUrl} container={ref} />);

    const shadowStyle = shadowRoot.querySelector(
      `style[data-url="${testUrl}"]`,
    );
    expect(shadowStyle).toBeTruthy();
  });

  it('skips head injection when onlyShadow is true', () => {
    const shadowRoot = document
      .createElement('div')
      .attachShadow({ mode: 'open' });

    render(
      <FontLoader
        keyPrefix="test"
        url={testUrl}
        container={shadowRoot}
        onlyShadow
      />,
    );

    const headStyle = document.head.querySelector(
      `style[data-url="${testUrl}"]`,
    );
    expect(headStyle).toBeNull();

    const shadowStyle = shadowRoot.querySelector(
      `style[data-url="${testUrl}"]`,
    );
    expect(shadowStyle).toBeTruthy();
  });

  it('handles null ref', () => {
    const ref = createRef<ShadowRoot>();

    expect(() => {
      render(<FontLoader keyPrefix="test" url={testUrl} container={ref} />);
    }).not.toThrow();
  });
});

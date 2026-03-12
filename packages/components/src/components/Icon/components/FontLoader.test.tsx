import { render } from '@testing-library/react';
import { createRef } from 'react';
import { FontLoader } from './FontLoader';

describe('FontLoader', () => {
  const testUrl = 'https://example.com/font.css';

  beforeEach(() => {
    document.querySelectorAll("meta[name='csp-nonce']").forEach((el) => {
      el.remove();
    });
  });

  it('renders link tag in document head', () => {
    render(<FontLoader keyPrefix="test" url={testUrl} />);

    const link = document.head.querySelector(`link[data-url="${testUrl}"]`);
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe(testUrl);
    expect(link?.getAttribute('rel')).toBe('stylesheet');
  });

  it('applies nonce to link tags when csp-nonce meta is present', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', 'test-nonce-123');
    document.head.appendChild(meta);

    render(<FontLoader keyPrefix="test" url={testUrl} />);

    const link = document.head.querySelector(`link[data-url="${testUrl}"]`);
    expect(link?.nonce).toBe('test-nonce-123');
  });

  it('renders link tags without nonce when no csp-nonce meta is present', () => {
    render(<FontLoader keyPrefix="test" url={testUrl} />);

    const link = document.head.querySelector(`link[data-url="${testUrl}"]`);
    expect(link?.nonce).toBeFalsy();
  });

  it('renders link tag in shadow container when provided', () => {
    const shadowRoot = document
      .createElement('div')
      .attachShadow({ mode: 'open' });

    render(
      <FontLoader keyPrefix="test" url={testUrl} container={shadowRoot} />,
    );

    const shadowLink = shadowRoot.querySelector(`link[data-url="${testUrl}"]`);
    expect(shadowLink).toBeTruthy();
    expect(shadowLink?.getAttribute('href')).toBe(testUrl);
  });

  it('renders link tag in shadow container via ref', () => {
    const shadowRoot = document
      .createElement('div')
      .attachShadow({ mode: 'open' });
    const ref = createRef<ShadowRoot>();
    (ref as { current: ShadowRoot }).current = shadowRoot;

    render(<FontLoader keyPrefix="test" url={testUrl} container={ref} />);

    const shadowLink = shadowRoot.querySelector(`link[data-url="${testUrl}"]`);
    expect(shadowLink).toBeTruthy();
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

    const headLink = document.head.querySelector(`link[data-url="${testUrl}"]`);
    expect(headLink).toBeNull();

    const shadowLink = shadowRoot.querySelector(`link[data-url="${testUrl}"]`);
    expect(shadowLink).toBeTruthy();
  });

  it('handles null ref', () => {
    const ref = createRef<ShadowRoot>();

    expect(() => {
      render(<FontLoader keyPrefix="test" url={testUrl} container={ref} />);
    }).not.toThrow();
  });
});

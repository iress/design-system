import { getNonce } from './getNonce';

describe('getNonce', () => {
  beforeEach(() => {
    document.querySelectorAll("meta[name='csp-nonce']").forEach((el) => {
      el.remove();
    });
  });

  it('returns null when no csp-nonce meta tag is present', () => {
    expect(getNonce()).toBeNull();
  });

  it('returns the nonce value when csp-nonce meta tag is present', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', 'abc123');
    document.head.appendChild(meta);

    expect(getNonce()).toBe('abc123');
  });

  it('returns null when csp-nonce meta tag has empty content', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', '');
    document.head.appendChild(meta);

    expect(getNonce()).toBeNull();
  });

  it('returns null when csp-nonce meta tag has whitespace-only content', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', '   ');
    document.head.appendChild(meta);

    expect(getNonce()).toBeNull();
  });

  it('trims leading and trailing whitespace from the nonce value', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', '  abc123  ');
    document.head.appendChild(meta);

    expect(getNonce()).toBe('abc123');
  });

  it('returns null in SSR/Node environments where document is undefined', () => {
    const originalDocument = globalThis.document;

    try {
      // @ts-expect-error — simulating SSR environment
      (globalThis as Record<string, unknown>).document = undefined;

      expect(getNonce()).toBeNull();
    } finally {
      globalThis.document = originalDocument;
    }
  });
});

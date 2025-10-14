import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { IressShadow } from './Shadow';

// Mock createPortal since we're testing the Shadow component in isolation
vi.mock('react-dom', () => ({
  createPortal: vi.fn((children: React.ReactNode) => children),
}));

// Mock the styled-system styles
vi.mock('../../styled-system/styles.css?raw', () => ({
  default: '.ids-styles { color: red; }',
}));

// Mock default fonts
vi.mock('@iress-oss/ids-tokens', () => ({
  defaultFonts: ['https://fonts.googleapis.com/css?family=Roboto'],
}));

describe('IressShadow', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up document head
    document.head.querySelectorAll('link').forEach((link) => {
      if (
        link.href.includes('fonts.googleapis.com') ||
        link.href.includes('cdn.iress.com')
      ) {
        link.remove();
      }
    });

    // Clean up CSP nonce meta tag
    document.head.querySelectorAll('meta[name="csp-nonce"]').forEach((meta) => {
      meta.remove();
    });
  });

  it('renders without crashing', () => {
    expect(() => render(<IressShadow>Test</IressShadow>)).not.toThrow();
  });

  it('renders children within a shadow DOM', async () => {
    const testId = 'test-child';
    const { container } = render(
      <IressShadow>
        <div data-testid={testId}>Test Content</div>
      </IressShadow>,
    );

    // Wait for shadow root to be created
    await waitFor(() => {
      const host = container.querySelector('div');
      expect(host?.shadowRoot).toBeTruthy();
    });

    // Check that children are rendered
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('attaches shadow root with open mode', async () => {
    const { container } = render(
      <IressShadow>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      expect(host?.shadowRoot).toBeTruthy();
    });

    const host = container.querySelector('div');
    expect(host?.shadowRoot?.mode).toBe('open');
  });

  it('includes IDS styles in shadow DOM', async () => {
    const { container } = render(
      <IressShadow>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const style = shadowRoot?.querySelector('style');
      expect(style).toBeTruthy();
      expect(style?.textContent).toContain('.ids-styles');
    });
  });

  it('loads default fonts in document head', async () => {
    render(
      <IressShadow>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const fontLink: HTMLLinkElement | null = document.head.querySelector(
        'link[href*="fonts.googleapis.com"]',
      );
      expect(fontLink?.rel).toBe('stylesheet');
    });
  });

  it('loads custom font URLs', async () => {
    const customFont = 'https://fonts.googleapis.com/css?family=Custom';
    render(
      <IressShadow fontFaceUrls={[customFont]}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const fontLink = document.head.querySelector(
        `link[href="${customFont}"]`,
      )!;
      expect(fontLink).toBeTruthy();
    });
  });

  it('does not duplicate font links when same URL is used', async () => {
    const fontUrl = 'https://fonts.googleapis.com/css?family=Roboto';

    // First render
    const { rerender } = render(
      <IressShadow fontFaceUrls={[fontUrl]}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const fontLinks = document.head.querySelectorAll(
        `link[href="${fontUrl}"]`,
      );
      expect(fontLinks).toHaveLength(1);
    });

    // Second render with same font
    rerender(
      <IressShadow fontFaceUrls={[fontUrl]}>
        <div>Test</div>
      </IressShadow>,
    );

    // Should still only have one link
    const fontLinks = document.head.querySelectorAll(`link[href="${fontUrl}"]`);
    expect(fontLinks).toHaveLength(1);
  });

  it('loads icons stylesheet when noIcons is false', async () => {
    render(
      <IressShadow noIcons={false}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const iconLink = document.head.querySelector(
        'link[href*="cdn.iress.com/icons"]',
      )!;
      expect(iconLink).toBeTruthy();
    });
  });

  it('does not load icons stylesheet when noIcons is true', async () => {
    render(
      <IressShadow noIcons={true}>
        <div>Test</div>
      </IressShadow>,
    );

    // Wait for a short period to ensure no icon link is added
    await waitFor(() => {
      const iconLink = document.head.querySelector(
        'link[href*="cdn.iress.com/icons"]',
      );
      expect(iconLink).toBeFalsy();
    });
  });

  it('loads custom stylesheet URLs in shadow DOM', async () => {
    const stylesheetUrl = 'https://example.com/custom.css';
    const { container } = render(
      <IressShadow stylesheetUrls={[stylesheetUrl]}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const link: HTMLLinkElement | null | undefined =
        shadowRoot?.querySelector(`link[href="${stylesheetUrl}"]`);
      expect(link).toBeTruthy();
      expect(link?.rel).toBe('stylesheet');
    });
  });

  it('loads custom stylesheet contents in shadow DOM', async () => {
    const stylesheetContent = {
      custom: '.custom { color: blue; }',
    };
    const { container } = render(
      <IressShadow stylesheetContents={stylesheetContent}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const style = shadowRoot?.querySelectorAll('style')[1]; // First is IDS styles
      expect(style).toBeTruthy();
      expect(style).toHaveAttribute('id', 'custom');
      expect(style?.textContent).toBe(stylesheetContent.custom);
    });
  });

  it('applies CSP nonce to IDS style element when present in document', async () => {
    const nonce = 'test-nonce-123';

    // Add meta tag with CSP nonce
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', nonce);
    document.head.appendChild(meta);

    const { container } = render(
      <IressShadow>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const idsStyle = shadowRoot?.querySelector('style');
      expect(idsStyle).toBeTruthy();
      expect(idsStyle).toHaveAttribute('nonce', nonce);
    });
  });

  it('does not apply CSP nonce to IDS style when not present in document', async () => {
    const { container } = render(
      <IressShadow>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const idsStyle = shadowRoot?.querySelector('style');
      expect(idsStyle).toBeTruthy();
      expect(idsStyle).not.toHaveAttribute('nonce');
    });
  });

  it('applies CSP nonce to custom stylesheet content elements when present in document', async () => {
    const nonce = 'custom-nonce-456';
    const stylesheetContent = {
      custom: '.custom { color: blue; }',
      another: '.another { color: green; }',
    };

    // Add meta tag with CSP nonce
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', nonce);
    document.head.appendChild(meta);

    const { container } = render(
      <IressShadow stylesheetContents={stylesheetContent}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const customStyles = shadowRoot?.querySelectorAll('style[id]');

      expect(customStyles).toHaveLength(2);
      customStyles?.forEach((style) => {
        expect(style).toHaveAttribute('nonce', nonce);
      });
    });
  });

  it('does not apply CSP nonce to custom stylesheet content when not present in document', async () => {
    const stylesheetContent = {
      custom: '.custom { color: blue; }',
    };

    const { container } = render(
      <IressShadow stylesheetContents={stylesheetContent}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const customStyle = shadowRoot?.querySelector('style[id="custom"]');

      expect(customStyle).toBeTruthy();
      expect(customStyle).not.toHaveAttribute('nonce');
    });
  });

  it('handles empty CSP nonce meta content gracefully', async () => {
    // Add meta tag with empty nonce
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', '');
    document.head.appendChild(meta);

    const { container } = render(
      <IressShadow stylesheetContents={{ test: '.test {}' }}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const idsStyle = shadowRoot?.querySelector('style');
      const customStyle = shadowRoot?.querySelector('style[id="test"]');

      // Empty nonce should not be applied
      expect(idsStyle).not.toHaveAttribute('nonce');
      expect(customStyle).not.toHaveAttribute('nonce');
    });
  });

  it('applies CSP nonce to both IDS and custom styles when present', async () => {
    const nonce = 'combined-nonce-789';
    const stylesheetContent = {
      custom: '.custom { color: purple; }',
    };

    // Add meta tag with CSP nonce
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'csp-nonce');
    meta.setAttribute('content', nonce);
    document.head.appendChild(meta);

    const { container } = render(
      <IressShadow stylesheetContents={stylesheetContent}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const allStyles = shadowRoot?.querySelectorAll('style');

      expect(allStyles).toHaveLength(2); // IDS style + custom style

      // IDS style (first one, without id attribute)
      const idsStyle = Array.from(allStyles ?? []).find(
        (style) => !style.hasAttribute('id'),
      );
      expect(idsStyle).toBeTruthy();
      expect(idsStyle).toHaveAttribute('nonce', nonce);

      // Custom style (with id attribute)
      const customStyle = shadowRoot?.querySelector('style[id="custom"]');
      expect(customStyle).toBeTruthy();
      expect(customStyle).toHaveAttribute('nonce', nonce);
    });
  });

  it('passes through additional props to the host element', () => {
    const { container } = render(
      <IressShadow className="custom-class" data-testid="shadow-host">
        <div>Test</div>
      </IressShadow>,
    );

    const host = container.querySelector('div');
    expect(host).toHaveClass('custom-class');
    expect(host).toHaveAttribute('data-testid', 'shadow-host');
  });

  it('handles multiple stylesheet URLs', async () => {
    const urls = [
      'https://example.com/style1.css',
      'https://example.com/style2.css',
    ];
    const { container } = render(
      <IressShadow stylesheetUrls={urls}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      urls.forEach((url) => {
        const link = shadowRoot?.querySelector(`link[href="${url}"]`);
        expect(link).toBeTruthy();
      });
    });
  });

  it('handles multiple stylesheet contents', async () => {
    const contents = {
      css1: '.style1 { color: red; }',
      css2: '.style2 { color: blue; }',
    };
    const { container } = render(
      <IressShadow stylesheetContents={contents}>
        <div>Test</div>
      </IressShadow>,
    );

    await waitFor(() => {
      const host = container.querySelector('div');
      const shadowRoot = host?.shadowRoot;
      const styles = shadowRoot?.querySelectorAll('style');
      // First style is IDS, then our custom styles
      expect(styles?.[1]?.textContent).toBe(contents.css1);
      expect(styles?.[1]).toHaveAttribute('id', 'css1');
      expect(styles?.[2]?.textContent).toBe(contents.css2);
      expect(styles?.[2]).toHaveAttribute('id', 'css2');
    });
  });
});

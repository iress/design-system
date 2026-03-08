/**
 * Retrieves the CSP nonce from the `<meta name="csp-nonce">` tag in the document head.
 * This nonce is required for dynamically injected inline styles when a Content Security Policy
 * with nonce-based style-src is active (which causes 'unsafe-inline' to be ignored).
 *
 * @returns The nonce string, or null if not found or in SSR/Node environments
 */
export const getNonce = (): string | null => {
  // Guard against SSR/Node environments where `document` is not available.
  if (typeof document === 'undefined') {
    return null;
  }

  const meta = document.querySelector("meta[name='csp-nonce']");
  const rawContent = meta?.getAttribute('content');

  if (rawContent == null) {
    return null;
  }

  const trimmed = rawContent.trim();

  return trimmed === '' ? null : trimmed;
};

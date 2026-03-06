/**
 * Retrieves the CSP nonce from the `<meta name="csp-nonce">` tag in the document head.
 * This nonce is required for dynamically injected inline styles when a Content Security Policy
 * with nonce-based style-src is active (which causes 'unsafe-inline' to be ignored).
 *
 * @returns The nonce string, or null if not found
 */
export const getNonce = (): string | null =>
  document.querySelector("meta[name='csp-nonce']")?.getAttribute('content') ??
  null;

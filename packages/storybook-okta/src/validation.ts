import type { AddonConfig } from './types';

const DANGEROUS_PROTOCOLS = ['java' + 'script:', 'data:', 'vbscript:'];

/**
 * Validates and sanitizes Okta configuration parameters
 */
export function validateOktaConfig(config: AddonConfig): AddonConfig {
  if (!config.issuer || !config.clientId) {
    throw new Error('Okta configuration requires issuer and clientId');
  }

  // Validate issuer URL format
  let issuerUrl: URL;
  try {
    issuerUrl = new URL(config.issuer);
  } catch {
    throw new Error('Invalid Okta issuer URL format');
  }

  if (!issuerUrl.protocol.startsWith('https')) {
    throw new Error('Okta issuer must use HTTPS');
  }

  // Sanitize clientId (remove any non-alphanumeric characters except hyphens and underscores)
  const sanitizedClientId = config.clientId.replace(/[^a-zA-Z0-9_-]/g, '');
  if (sanitizedClientId !== config.clientId) {
    throw new Error('Invalid characters in Okta clientId');
  }

  // Validate unprotected routes format
  if (config.unprotected) {
    config.unprotected.forEach((route) => {
      if (
        typeof route !== 'string' ||
        route.includes('<script>') ||
        DANGEROUS_PROTOCOLS.some((protocol) => route.startsWith(protocol))
      ) {
        throw new Error('Invalid unprotected route format');
      }
    });
  }

  return {
    ...config,
    clientId: sanitizedClientId,
  };
}

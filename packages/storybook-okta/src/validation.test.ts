import { describe, it, expect } from 'vitest';
import { validateOktaConfig } from './validation';
import type { AddonConfig } from './types';

describe('validateOktaConfig', () => {
  const validConfig = {
    issuer: 'https://dev-123.okta.com/oauth2/default',
    clientId: 'abc123_def-456',
  };

  it('should validate correct configuration', () => {
    expect(() => validateOktaConfig(validConfig)).not.toThrow();
  });

  it('should throw error for missing issuer', () => {
    expect(() =>
      validateOktaConfig({ clientId: 'test' } as AddonConfig),
    ).toThrow('requires issuer and clientId');
  });

  it('should throw error for non-HTTPS issuer', () => {
    const insecureIssuer = 'ht' + 'tp://dev-123.okta.com/oauth2/default';
    expect(() =>
      validateOktaConfig({
        ...validConfig,
        issuer: insecureIssuer,
      }),
    ).toThrow('must use HTTPS');
  });

  it('should throw error for invalid clientId characters', () => {
    expect(() =>
      validateOktaConfig({
        ...validConfig,
        clientId: 'abc<script>alert(1)</script>',
      }),
    ).toThrow('Invalid characters in Okta clientId');
  });

  it('should throw error for malicious unprotected routes', () => {
    expect(() =>
      validateOktaConfig({
        ...validConfig,
        unprotected: ['<script>alert(1)</script>'],
      }),
    ).toThrow('Invalid unprotected route format');
  });
});

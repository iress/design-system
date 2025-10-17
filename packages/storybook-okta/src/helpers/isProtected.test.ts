import { isProtectedFromContext } from './isProtected';
import { type StoryContext } from 'storybook/internal/types';
import { type ReactRenderer } from '@storybook/react';
import { type AddonConfig } from '../types';
import { ADDON_ID } from '../constants';

describe('isProtected', () => {
  const createMockContext = (
    parameters: Record<string, unknown> = {},
  ): StoryContext<ReactRenderer> => ({
    id: 'test-story--default',
    title: 'Test Story',
    name: 'Default',
    parameters,
    args: {},
    argTypes: {},
    globals: {},
    hooks: {} as StoryContext<ReactRenderer>['hooks'],
    viewMode: 'story',
    loaded: {},
    abortSignal: new AbortController().signal,
    step: vi.fn(),
    canvasElement: document.createElement('div'),
    mount: vi.fn(),
  });

  describe('isProtectedFromContext', () => {
    it('returns true when no addon config is present', () => {
      const context = createMockContext();

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('returns true when addon config is null', () => {
      const context = createMockContext({
        [ADDON_ID]: null,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('returns true when addon config is undefined', () => {
      const context = createMockContext({
        [ADDON_ID]: undefined,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('returns false when addon is explicitly disabled', () => {
      const config: AddonConfig = {
        issuer: 'https://test.okta.com',
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:6006',
        disable: true,
      };

      const context = createMockContext({
        [ADDON_ID]: config,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(false);
    });

    it('returns true when addon config is present and not disabled', () => {
      const config: AddonConfig = {
        issuer: 'https://test.okta.com',
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:6006',
      };

      const context = createMockContext({
        [ADDON_ID]: config,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('returns true when addon config is present with disable: false', () => {
      const config: AddonConfig = {
        issuer: 'https://test.okta.com',
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:6006',
        disable: false,
      };

      const context = createMockContext({
        [ADDON_ID]: config,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('returns true when addon config has unprotected routes but is not disabled', () => {
      const config: AddonConfig = {
        issuer: 'https://test.okta.com',
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:6006',
        unprotected: ['/docs/test--page', 'another-story--default'],
      };

      const context = createMockContext({
        [ADDON_ID]: config,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('handles empty config object', () => {
      const config = {};

      const context = createMockContext({
        [ADDON_ID]: config,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('returns true when addon config is present with disable: undefined', () => {
      const config: AddonConfig = {
        issuer: 'https://test.okta.com',
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:6006',
        disable: undefined,
      };

      const context = createMockContext({
        [ADDON_ID]: config,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('works with different story contexts', () => {
      const config: AddonConfig = {
        issuer: 'https://test.okta.com',
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:6006',
      };

      const docsContext = createMockContext({
        [ADDON_ID]: config,
      });
      docsContext.viewMode = 'docs';

      const storyContext = createMockContext({
        [ADDON_ID]: config,
      });
      storyContext.viewMode = 'story';

      expect(isProtectedFromContext(docsContext)).toBe(true);
      expect(isProtectedFromContext(storyContext)).toBe(true);
    });

    it('handles context with other addon parameters', () => {
      const config: AddonConfig = {
        issuer: 'https://test.okta.com',
        clientId: 'test-client-id',
        redirectUri: 'http://localhost:6006',
      };

      const context = createMockContext({
        [ADDON_ID]: config,
        'other-addon': { enabled: true },
        docs: { page: 'test' },
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('handles null context gracefully', () => {
      const result = isProtectedFromContext(
        null as unknown as StoryContext<ReactRenderer>,
      );

      expect(result).toBe(true);
    });

    it('handles undefined context gracefully', () => {
      const result = isProtectedFromContext(
        undefined as unknown as StoryContext<ReactRenderer>,
      );

      expect(result).toBe(true);
    });

    it('handles context without parameters', () => {
      const context = {
        id: 'test-story--default',
        // no parameters property
      } as unknown as StoryContext<ReactRenderer>;

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });
  });
});

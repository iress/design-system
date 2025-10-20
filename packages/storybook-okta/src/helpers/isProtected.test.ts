import { isProtectedFromContext } from './isProtected';
import { type StoryContext } from 'storybook/internal/types';
import { type ReactRenderer } from '@storybook/react';
import { type AddonConfig } from '../types';
import { ADDON_ID } from '../constants';
import { getAddonConfigForPreview } from '../hooks/useAddonConfig';

// Mock the environment config function
vi.mock('../hooks/useAddonConfig', () => ({
  getAddonConfigForPreview: vi.fn(),
}));

describe('isProtected', () => {
  const mockEnvironmentConfig: AddonConfig = {
    issuer: 'https://test.okta.com',
    clientId: 'test-client-id',
    redirectUri: 'http://localhost:6006',
  };

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
    originalStoryFn: vi.fn(),
    context: {} as StoryContext<ReactRenderer>['context'],
    canvas: {} as StoryContext<ReactRenderer>['canvas'],
    reporting: {} as StoryContext<ReactRenderer>['reporting'],
    moduleExport: {} as StoryContext<ReactRenderer>['moduleExport'],
    attachedCSFFile: {} as StoryContext<ReactRenderer>['attachedCSFFile'],
    undecoratedStoryFn: vi.fn(),
    componentId: 'test-story',
    storyExport: {} as StoryContext<ReactRenderer>['storyExport'],
    initialArgs: {},
    kind: 'Test Story',
    story: 'Default',
    tags: [],
  });

  beforeEach(() => {
    vi.clearAllMocks();
    // Default to environment config being available and not disabled
    (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
      mockEnvironmentConfig,
    );
  });

  describe('isProtectedFromContext', () => {
    it('returns true when no story config and environment config is enabled', () => {
      const context = createMockContext();

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
      expect(getAddonConfigForPreview).toHaveBeenCalled();
    });

    it('returns false when no story config and environment config is disabled', () => {
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue({
        ...mockEnvironmentConfig,
        disable: true,
      });

      const context = createMockContext();

      const result = isProtectedFromContext(context);

      expect(result).toBe(false);
    });

    it('returns true when no environment config is available', () => {
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue(
        undefined,
      );

      const context = createMockContext();

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
    });

    it('returns false when story explicitly disables authentication (overrides environment)', () => {
      const storyConfig: Partial<AddonConfig> = {
        disable: true,
      };

      const context = createMockContext({
        [ADDON_ID]: storyConfig,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(false);
      // Should not check environment config when story overrides
    });

    it('returns true when story config is present but disable is false', () => {
      const storyConfig: Partial<AddonConfig> = {
        disable: false,
      };

      const context = createMockContext({
        [ADDON_ID]: storyConfig,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
      expect(getAddonConfigForPreview).toHaveBeenCalled();
    });

    it('returns true when story config is present but disable is undefined (falls back to environment)', () => {
      const storyConfig: AddonConfig = {
        issuer: 'https://story.okta.com',
        clientId: 'story-client-id',
        redirectUri: 'http://localhost:3000',
      };

      const context = createMockContext({
        [ADDON_ID]: storyConfig,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
      expect(getAddonConfigForPreview).toHaveBeenCalled();
    });

    it('story disable: true overrides environment disable: false', () => {
      (getAddonConfigForPreview as ReturnType<typeof vi.fn>).mockReturnValue({
        ...mockEnvironmentConfig,
        disable: false,
      });

      const storyConfig: Partial<AddonConfig> = {
        disable: true,
      };

      const context = createMockContext({
        [ADDON_ID]: storyConfig,
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(false);
    });

    it('works with different story contexts', () => {
      const docsContext = createMockContext();
      docsContext.viewMode = 'docs';

      const storyContext = createMockContext();
      storyContext.viewMode = 'story';

      expect(isProtectedFromContext(docsContext)).toBe(true);
      expect(isProtectedFromContext(storyContext)).toBe(true);
    });

    it('handles context with other addon parameters', () => {
      const context = createMockContext({
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

    it('handles story config with null disable value', () => {
      const context = createMockContext({
        [ADDON_ID]: { disable: null },
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
      expect(getAddonConfigForPreview).toHaveBeenCalled();
    });

    it('handles empty story config object', () => {
      const context = createMockContext({
        [ADDON_ID]: {},
      });

      const result = isProtectedFromContext(context);

      expect(result).toBe(true);
      expect(getAddonConfigForPreview).toHaveBeenCalled();
    });
  });
});

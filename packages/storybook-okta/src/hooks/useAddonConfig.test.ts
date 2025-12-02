import { renderHook, act } from '@testing-library/react';
import { addons } from 'storybook/manager-api';
import {
  useAddonConfigForManager,
  getAddonConfigForPreview,
} from './useAddonConfig';
import { ADDON_OPTIONS } from '../constants';
import { registerOkta } from '../helpers/oktaRegister';
import type { AddonConfig } from '../types';
import { type OktaAuth } from '@okta/okta-auth-js';

// Mock dependencies
vi.mock('storybook/manager-api', () => ({
  addons: {
    getChannel: vi.fn(),
  },
}));

vi.mock('../helpers/oktaRegister', () => ({
  registerOkta: vi.fn(),
}));

describe('useAddonConfig', () => {
  const mockChannel = {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    isAsync: false,
    sender: null,
    events: {},
    data: {},
    addListener: vi.fn(),
    removeListener: vi.fn(),
    removeAllListeners: vi.fn(),
    once: vi.fn(),
    prependListener: vi.fn(),
    prependOnceListener: vi.fn(),
    listeners: vi.fn(),
    rawListeners: vi.fn(),
    listenerCount: vi.fn(),
    eventNames: vi.fn(),
    getMaxListeners: vi.fn(),
    setMaxListeners: vi.fn(),
  };

  const mockAddonConfig: AddonConfig = {
    issuer: 'https://test.okta.com',
    clientId: 'test-client-id',
    redirectUri: 'http://localhost:6006',
    disable: false,
    unprotected: ['/docs/test--page'],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(addons.getChannel).mockReturnValue(
      mockChannel as unknown as ReturnType<typeof addons.getChannel>,
    );
    vi.mocked(registerOkta).mockReturnValue(undefined as unknown as OktaAuth);
  });

  describe('useAddonConfigForManager', () => {
    it('initializes with config from getAddonConfigForPreview', () => {
      // Mock the preview config
      const previewConfig: AddonConfig = {
        issuer: 'https://preview.okta.com',
        clientId: 'preview-client-id',
        redirectUri: 'http://localhost:6007',
      };

      vi.spyOn(process, 'env', 'get').mockReturnValue({
        IDS_OKTA: JSON.stringify(previewConfig),
      } as NodeJS.ProcessEnv);

      const { result } = renderHook(() => useAddonConfigForManager());

      expect(result.current).toEqual(previewConfig);
    });

    it('initializes with undefined when no preview config available', () => {
      vi.spyOn(process, 'env', 'get').mockReturnValue({} as NodeJS.ProcessEnv);

      const { result } = renderHook(() => useAddonConfigForManager());

      expect(result.current).toBeUndefined();
    });

    it('sets up channel listener for ADDON_OPTIONS', () => {
      renderHook(() => useAddonConfigForManager());

      expect(mockChannel.on).toHaveBeenCalledWith(
        ADDON_OPTIONS,
        expect.any(Function),
      );
    });

    it('updates state when channel receives new options', () => {
      let channelCallback: (options: AddonConfig) => void = () => {};

      mockChannel.on.mockImplementation(
        (event: string, callback: (options: AddonConfig) => void) => {
          if (event === ADDON_OPTIONS) {
            channelCallback = callback;
          }
        },
      );

      const { result } = renderHook(() => useAddonConfigForManager());

      // Initially undefined (assuming no env config)
      vi.spyOn(process, 'env', 'get').mockReturnValue({} as NodeJS.ProcessEnv);

      act(() => {
        channelCallback(mockAddonConfig);
      });

      expect(result.current).toEqual(mockAddonConfig);
    });

    it('calls registerOkta when options are received', () => {
      let channelCallback: (options: AddonConfig) => void = () => {};

      mockChannel.on.mockImplementation(
        (event: string, callback: (options: AddonConfig) => void) => {
          if (event === ADDON_OPTIONS) {
            channelCallback = callback;
          }
        },
      );

      renderHook(() => useAddonConfigForManager());

      act(() => {
        channelCallback(mockAddonConfig);
      });

      expect(registerOkta).toHaveBeenCalledWith(mockAddonConfig);
    });

    it('does not call registerOkta when options are null/undefined', () => {
      let channelCallback: (
        options: AddonConfig | undefined,
      ) => void = () => {};

      mockChannel.on.mockImplementation(
        (
          event: string,
          callback: (options: AddonConfig | undefined) => void,
        ) => {
          if (event === ADDON_OPTIONS) {
            channelCallback = callback;
          }
        },
      );

      renderHook(() => useAddonConfigForManager());

      act(() => {
        channelCallback(undefined);
      });

      expect(registerOkta).not.toHaveBeenCalled();

      act(() => {
        channelCallback(undefined);
      });

      expect(registerOkta).not.toHaveBeenCalled();
    });

    it('handles multiple option updates correctly', () => {
      let channelCallback: (options: AddonConfig) => void = () => {};

      mockChannel.on.mockImplementation(
        (event: string, callback: (options: AddonConfig) => void) => {
          if (event === ADDON_OPTIONS) {
            channelCallback = callback;
          }
        },
      );

      const { result } = renderHook(() => useAddonConfigForManager());

      const firstConfig = { ...mockAddonConfig, clientId: 'first-client' };
      const secondConfig = { ...mockAddonConfig, clientId: 'second-client' };

      act(() => {
        channelCallback(firstConfig);
      });

      expect(result.current).toEqual(firstConfig);
      expect(registerOkta).toHaveBeenCalledWith(firstConfig);

      act(() => {
        channelCallback(secondConfig);
      });

      expect(result.current).toEqual(secondConfig);
      expect(registerOkta).toHaveBeenCalledWith(secondConfig);
      expect(registerOkta).toHaveBeenCalledTimes(2);
    });

    it('handles config with disable flag', () => {
      let channelCallback: (options: AddonConfig) => void = () => {};

      mockChannel.on.mockImplementation(
        (event: string, callback: (options: AddonConfig) => void) => {
          if (event === ADDON_OPTIONS) {
            channelCallback = callback;
          }
        },
      );

      const { result } = renderHook(() => useAddonConfigForManager());

      const disabledConfig = { ...mockAddonConfig, disable: true };

      act(() => {
        channelCallback(disabledConfig);
      });

      expect(result.current).toEqual(disabledConfig);
      expect(registerOkta).toHaveBeenCalledWith(disabledConfig);
    });

    it('handles config with unprotected routes', () => {
      let channelCallback: (options: AddonConfig) => void = () => {};

      mockChannel.on.mockImplementation(
        (event: string, callback: (options: AddonConfig) => void) => {
          if (event === ADDON_OPTIONS) {
            channelCallback = callback;
          }
        },
      );

      const { result } = renderHook(() => useAddonConfigForManager());

      const configWithUnprotected = {
        ...mockAddonConfig,
        unprotected: ['/docs/public--page', 'story-id--variant'],
      };

      act(() => {
        channelCallback(configWithUnprotected);
      });

      expect(result.current).toEqual(configWithUnprotected);
      expect(registerOkta).toHaveBeenCalledWith(configWithUnprotected);
    });

    it('preserves all OktaAuthOptions properties', () => {
      let channelCallback: (options: AddonConfig) => void = () => {};

      mockChannel.on.mockImplementation(
        (event: string, callback: (options: AddonConfig) => void) => {
          if (event === ADDON_OPTIONS) {
            channelCallback = callback;
          }
        },
      );

      const { result } = renderHook(() => useAddonConfigForManager());

      const fullConfig: AddonConfig = {
        ...mockAddonConfig,
        scopes: ['openid', 'profile', 'email'],
        pkce: true,
        responseType: 'code',
        responseMode: 'query',
        httpRequestClient: vi.fn(),
        transformAuthState: vi.fn(),
        restoreOriginalUri: vi.fn(),
        cookies: { secure: true },
        devMode: false,
      };

      act(() => {
        channelCallback(fullConfig);
      });

      expect(result.current).toEqual(fullConfig);
      expect(registerOkta).toHaveBeenCalledWith(fullConfig);
    });
  });

  describe('getAddonConfigForPreview', () => {
    beforeEach(() => {
      // Reset process.env before each test
      vi.restoreAllMocks();
    });

    it('returns config from IDS_OKTA environment variable', () => {
      const envConfig: AddonConfig = {
        issuer: 'https://env.okta.com',
        clientId: 'env-client-id',
        redirectUri: 'http://localhost:8080',
        disable: true,
        unprotected: ['/docs/env--page'],
      };

      vi.spyOn(process, 'env', 'get').mockReturnValue({
        IDS_OKTA: JSON.stringify(envConfig),
      } as NodeJS.ProcessEnv);

      const result = getAddonConfigForPreview();

      expect(result).toEqual(envConfig);
    });

    it('returns undefined when IDS_OKTA is not set', () => {
      vi.spyOn(process, 'env', 'get').mockReturnValue({} as NodeJS.ProcessEnv);

      const result = getAddonConfigForPreview();

      expect(result).toBeUndefined();
    });

    it('handles complex config object', () => {
      const complexConfig: AddonConfig = {
        issuer: 'https://complex.okta.com',
        clientId: 'complex-client-id',
        redirectUri: 'http://localhost:9000',
        scopes: ['openid', 'profile', 'email', 'groups'],
        pkce: true,
        responseType: 'code',
        responseMode: 'fragment',
        disable: false,
        unprotected: [
          '/docs/introduction--page',
          '/docs/getting-started--page',
          'component-id--default',
          'component-id--variant',
        ],
        cookies: {
          secure: true,
          sameSite: 'strict',
        },
        devMode: true,
        storageManager: {
          token: {
            storageTypes: ['localStorage', 'sessionStorage'],
          },
        },
      };

      vi.spyOn(process, 'env', 'get').mockReturnValue({
        IDS_OKTA: JSON.stringify(complexConfig),
      } as NodeJS.ProcessEnv);

      const result = getAddonConfigForPreview();

      expect(result).toEqual(complexConfig);
    });
  });

  describe('integration', () => {
    it('uses preview config as initial state when available', () => {
      const previewConfig: AddonConfig = {
        issuer: 'https://preview.okta.com',
        clientId: 'preview-client',
        redirectUri: 'http://localhost:6006',
      };

      vi.spyOn(process, 'env', 'get').mockReturnValue({
        IDS_OKTA: JSON.stringify(previewConfig),
      } as NodeJS.ProcessEnv);

      const { result } = renderHook(() => useAddonConfigForManager());

      expect(result.current).toEqual(previewConfig);
    });

    it('channel updates override preview config', () => {
      const previewConfig: AddonConfig = {
        issuer: 'https://preview.okta.com',
        clientId: 'preview-client',
        redirectUri: 'http://localhost:6006',
      };

      vi.spyOn(process, 'env', 'get').mockReturnValue({
        IDS_OKTA: JSON.stringify(previewConfig),
      } as NodeJS.ProcessEnv);

      let channelCallback: (options: AddonConfig) => void = () => {};

      mockChannel.on.mockImplementation(
        (event: string, callback: (options: AddonConfig) => void) => {
          if (event === ADDON_OPTIONS) {
            channelCallback = callback;
          }
        },
      );

      const { result } = renderHook(() => useAddonConfigForManager());

      // Initially should have preview config
      expect(result.current).toEqual(previewConfig);

      // Channel update should override
      act(() => {
        channelCallback(mockAddonConfig);
      });

      expect(result.current).toEqual(mockAddonConfig);
      expect(registerOkta).toHaveBeenCalledWith(mockAddonConfig);
    });
  });
});

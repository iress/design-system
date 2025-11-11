import type { Options } from 'storybook/internal/types';
import type { UserConfig } from 'vite';
import { ADDON_ID } from './constants';
import type { AddonConfig } from './types';

export const managerHead = (head: string) => {
  return `
    ${head}
    <script>
      function clearOktaParams(event) {
        if (event.data !== 'CLEAR_OKTA_PARAMS') {
          return;
        }

        const url = new URL(window.parent.location.toString());

        if (url.searchParams.get('code') === 'undefined') {
          url.searchParams.delete('code');
          url.searchParams.delete('state');
          url.searchParams.delete('session_state');
          url.searchParams.delete('error');
          url.searchParams.delete('error_description');
          window.parent.history.replaceState({}, '', url.toString());
        }
      }

      window.addEventListener('message', clearOktaParams);
    </script>
  `;
};

export const viteFinal = async (
  config: UserConfig,
  options: Options & { [ADDON_ID]: AddonConfig },
) => {
  const addonConfig = options[ADDON_ID];

  return {
    ...config,
    define: {
      ...config.define,
      [`process.env.${ADDON_ID}`]: JSON.stringify(addonConfig),
    },
  };
};

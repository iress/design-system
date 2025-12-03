import { mergeConfig, type InlineConfig } from 'vite';

export const managerHead = (head: string) => {
  return `
    ${head}

    <script>
      function requestParentLocation(event) {
        if (event.data !== 'REQUEST_PARENT_LOCATION') {
          return;
        }

        event.source.postMessage({ type: 'CHECK_LOCATION', location: {
          href: window.location.href,
          search: window.location.search.toString(),
        } }, '*');
      }

      function removeAddonState(event) {
        if (event.data?.type !== 'REMOVE_ADDON_STATE' || !event.data?.url) {
          return;
        }

        window.history.replaceState({}, '', event.data.url);
      }

      function openInSandbox(event) {
        if (event.data?.type !== 'OPEN_IN_SANDBOX' || !event.data?.generateUrl) {
          return;
        }

        window.location.href = event.data.generateUrl({
          href: window.location.href,
          search: window.location.search.toString(),
        });
      }

      window.addEventListener('message', requestParentLocation);
      window.addEventListener('message', removeAddonState);
      window.addEventListener('message', openInSandbox);
    </script>
  `;
};

export const previewHead = managerHead;

export const viteFinal = (config: InlineConfig) =>
  mergeConfig(config, {
    optimizeDeps: {
      include: [
        '@jridgewell/resolve-uri',
        '@jridgewell/trace-mapping',
        'ts-interface-checker',
        'lines-and-columns',
      ],
    },
  });

const setupLocalPreset = ({
  managerEntries = [],
  previewAnnotations = [],
  preset = {},
}) => {
  if (managerEntries.length) {
    preset.managerEntries = (entry = []) => [...entry, ...managerEntries];
  }

  if (previewAnnotations.length) {
    preset.previewAnnotations = (entry = []) => [
      ...entry,
      ...previewAnnotations,
    ];
  }

  return preset;
};

const autoReloadManagerHead = (port = 7000, additional = '') => {
  return (head) => `${head}

${additional}

<script>
(function () {
  const ws = new WebSocket('ws://127.0.0.1:${port}');
  ws.onmessage = (msg) => {
    if (msg.data === 'reload') {
      // Force reload bypassing cache
      const url = new URL(location.href);
      url.searchParams.set('t', Date.now());
      location.replace(url);
    }
  };
  ws.onopen = () => console.log('Connected to dev WebSocket');
})();
</script>`;
};

module.exports = {
  setupLocalPreset,
  autoReloadManagerHead,
};

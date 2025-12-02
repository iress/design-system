export const autoReloadManagerHead = (port = 7000, additional = '') => {
  return (head?: string) => `${head ?? ''}

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

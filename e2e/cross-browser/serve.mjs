// Minimal static file server for the built Storybook. No dependencies, so it
// behaves the same on Windows, macOS and Linux runners.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(
  process.argv[2] ?? '../../packages/components/storybook-static',
);
const port = Number(process.env.PORT ?? 6006);

const MIME = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mjs': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const filePath = normalize(
    join(root, pathname === '/' ? 'index.html' : pathname),
  );

  // Never serve anything outside the Storybook output directory.
  if (!filePath.startsWith(root + sep) && filePath !== root) {
    res.writeHead(403).end();
    return;
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404).end();
    return;
  }

  res.writeHead(200, {
    'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Serving ${root} on http://127.0.0.1:${port}`);
});

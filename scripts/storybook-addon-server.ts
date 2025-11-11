import { ChildProcess, spawn } from 'child_process';
import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import net from 'net';

let proc: ChildProcess | undefined;
let wss: WebSocketServer | undefined;

const location = process.argv[2];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!location) {
  console.error('Please provide a path to a package with Storybook installed');
  process.exit(1);
}

const pkg = await import(`../${location}/package.json`);
if (!pkg.storybook) {
  console.error(
    `The package at ${location} does not appear to be a Storybook addon. This server is only meant for Storybook addons, use the typical yarn storybook for other packages.`,
  );
  process.exit(1);
}

async function start() {
  proc?.kill();
  proc = spawn(
    'yarn',
    [location, 'storybook', 'dev', '-p', '6006', '--no-open'],
    {
      stdio: 'inherit',
    },
  );

  await waitForLocalhost();

  if (wss) return;

  wss = new WebSocketServer({ port: 7000 });
  console.log('WebSocket server running on ws://localhost:7000');

  wss.on('connection', () => {
    console.log('Browser connected to WebSocket');
  });
}

/**
 * Wait until a localhost port is open
 */
async function waitForLocalhost(port = 6006, timeout = 15000, interval = 500) {
  const start = Date.now();
  function isPortOpen() {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(interval);

      socket.once('error', () => resolve(false));
      socket.once('timeout', () => {
        socket.destroy();
        resolve(false);
      });
      socket.connect(port, '127.0.0.1', () => {
        socket.end();
        resolve(true);
      });
    });
  }

  while (Date.now() - start < timeout) {
    if (await isPortOpen()) return true;
    await new Promise((r) => setTimeout(r, interval));
  }

  return false;
}

start();

chokidar
  .watch([
    path.resolve(__dirname, `../${location}/.storybook/local-preset.cjs`),
    path.resolve(__dirname, `../${location}/.storybook/main.ts`),
    path.resolve(__dirname, `../${location}/.storybook/manager.ts`),
    path.resolve(__dirname, `../${location}/dist/manager.js`),
    path.resolve(__dirname, `../${location}/dist/preset.cjs`),
  ])
  .on('change', (file) => {
    console.log(`[restart] ${file} changed, restarting Storybook...`);
    start();

    wss?.clients?.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('reload');
      }
    });
  });

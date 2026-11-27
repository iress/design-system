import { defineConfig, devices } from '@playwright/test';

const PORT = 6006;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node serve.mjs',
    url: `http://127.0.0.1:${PORT}/iframe.html`,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(PORT) },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // Edge is only preinstalled on the Windows runners.
    ...(process.platform === 'win32'
      ? [
          {
            name: 'msedge',
            use: { ...devices['Desktop Edge'], channel: 'msedge' },
          },
        ]
      : []),
  ],
});

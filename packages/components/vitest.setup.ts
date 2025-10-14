import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

expect.extend(toHaveNoViolations);

const idsLoggerMock = vi.fn();

beforeEach(() => {
  userEvent.setup();
});

afterEach(() => {
  cleanup();
  idsLoggerMock.mockClear();
});

vi.mock('@helpers/utility/idsLogger', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@helpers/utility/idsLogger')>()),
  idsLogger: idsLoggerMock,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
  })),
});

// Set timezone to UTC for consistent date/time formatting across environments
process.env.TZ = 'UTC';

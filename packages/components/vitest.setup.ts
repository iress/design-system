import { cleanup } from '@testing-library/react';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';

expect.extend(jestDomMatchers);
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
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- for testing only
  ...(await importOriginal<typeof import('@helpers/utility/idsLogger')>()),
  idsLogger: idsLoggerMock,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Set timezone to UTC for consistent date/time formatting across environments
process.env.TZ = 'UTC';

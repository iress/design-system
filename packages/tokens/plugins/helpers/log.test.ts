import { vi } from 'vitest';
import { log } from './log';

vi.unmock('./log');

// Mock chalk to return plain text in tests
vi.mock('chalk', () => ({
  default: {
    hex: () => ({
      bgHex: () => (text: string) => text,
    }),
    red: (text: string) => text,
    bold: (text: string) => text,
  },
  hex: () => ({
    bgRgb: () => (text: string) => text,
  }),
  red: (text: string) => text,
  bold: (text: string) => text,
}));

beforeAll(() => {
  vi.spyOn(global.console, 'log').mockImplementation(() => undefined);
  vi.spyOn(global.console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('log', () => {
  it('log.message prints a message with the badge', async () => {
    log.message('test message');
    expect(console.log).toHaveBeenLastCalledWith('[IDS] test message');
  });

  it('log.title prints a bold message with the badge', async () => {
    log.title('test title');
    expect(console.log).toHaveBeenLastCalledWith('[IDS] test title');
  });
});

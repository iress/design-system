import { idsLogger } from './idsLogger';

const loggerLevels = ['log', 'warn', 'error'] as const;

vi.unmock('./idsLogger');

describe('idsLogger', () => {
  const logMessageStyles =
    'background: #21F5A8; color: #3A1C46; font-weight:bold;';

  beforeAll(() => {
    loggerLevels.forEach((level) => {
      vi.spyOn(console, level).mockImplementation(() => undefined);
    });
  });

  afterAll(() => {
    loggerLevels.forEach((level) => {
      vi.spyOn(console, level).mockReset();
    });
  });

  it(`logs a message when the level isn't supplied`, () => {
    idsLogger('test log');
    expect(console.log).toHaveBeenLastCalledWith(
      '%c IDS ',
      logMessageStyles,
      'test log',
    );
  });

  it('provides a warning message when the level is set to log', () => {
    idsLogger('test log', 'log');
    expect(console.log).toHaveBeenLastCalledWith(
      '%c IDS ',
      logMessageStyles,
      'test log',
    );
  });

  it('provides a warning message when the level is set to warn', () => {
    idsLogger('test warn', 'warn');
    expect(console.warn).toHaveBeenLastCalledWith(
      '%c IDS ',
      logMessageStyles,
      'test warn',
    );
  });

  it('provides an error message when the level is set to error', () => {
    idsLogger('test error', 'error');
    expect(console.error).toHaveBeenLastCalledWith(
      '%c IDS ',
      logMessageStyles,
      'test error',
    );
  });
});

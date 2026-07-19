import { idsLogger } from './idsLogger';
import { LoggerLevels } from '@/enums';

vi.unmock('./idsLogger');

describe('idsLogger', () => {
  const logMessageStyles =
    'background: #21F5A8; color: #3A1C46; font-weight:bold;';

  beforeAll(() => {
    Object.values(LoggerLevels).forEach((level) => {
      vi.spyOn(console, level).mockImplementation(() => undefined);
    });
  });

  afterAll(() => {
    Object.values(LoggerLevels).forEach((level) => {
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
    idsLogger('test log', LoggerLevels.Log);
    expect(console.log).toHaveBeenLastCalledWith(
      '%c IDS ',
      logMessageStyles,
      'test log',
    );
  });

  it('provides a warning message when the level is set to warn', () => {
    idsLogger('test warn', LoggerLevels.Warn);
    expect(console.warn).toHaveBeenLastCalledWith(
      '%c IDS ',
      logMessageStyles,
      'test warn',
    );
  });

  it('provides a warning message when the level is set to warn', () => {
    idsLogger('test error', LoggerLevels.Error);
    expect(console.error).toHaveBeenLastCalledWith(
      '%c IDS ',
      logMessageStyles,
      'test error',
    );
  });
});

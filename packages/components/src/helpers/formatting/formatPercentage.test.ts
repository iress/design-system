import { formatPercentage } from './formatPercentage';

describe('Component library formatting tests', () => {
  beforeAll(() => {
    vi.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('formatPercentage', () => {
    describe('when passed a number or string', () => {
      it('returns a formatted percentage', () => {
        expect(formatPercentage(0)).toBe('0%');
        expect(formatPercentage(12.99)).toBe('12.99%');
        expect(formatPercentage(200)).toBe('200%');
        expect(formatPercentage('12.99')).toBe('12.99%');
        expect(formatPercentage('200')).toBe('200%');
      });
    });

    describe('when passed a non-numeric string', () => {
      it('returns 0%', () => {
        expect(formatPercentage('test')).toBe('0%');
      });
    });
  });
});

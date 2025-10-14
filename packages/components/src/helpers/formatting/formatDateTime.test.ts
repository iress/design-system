import { formatISODateTime, formatRelativeTime } from './formatDateTime';
import { type DateValue } from './formatDate';

describe('Component library formatting tests', () => {
  const dateNumber = 1631883423423;
  const dateObj = new Date(dateNumber);
  const dateString = '2021-09-17T12:57:03.423Z';

  beforeAll(() => {
    vi.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('formatISODate', () => {
    it('parses the date and returns a formatted string', () => {
      expect(formatISODateTime(dateNumber)).toBe('2021-09-17 12:57:03 (UTC)');
      expect(formatISODateTime(dateObj)).toBe('2021-09-17 12:57:03 (UTC)');
      expect(formatISODateTime(dateString)).toBe('2021-09-17 12:57:03 (UTC)');
    });
  });

  describe('formatRelativeTime', () => {
    it('parses the date and returns a formatted string', () => {
      expect(formatRelativeTime(dateNumber)).toBe('17 Sep 2021');
      expect(formatRelativeTime(dateObj)).toBe('17 Sep 2021');
      expect(formatRelativeTime(dateString)).toBe('17 Sep 2021');
    });

    it('uses relative time for years if set to useShortDateAfter is null', () => {
      expect(formatRelativeTime(dateNumber, null)).toBe('next year');
      expect(formatRelativeTime(dateObj, null)).toBe('next year');
      expect(formatRelativeTime(dateString, null)).toBe('next year');
    });

    it('returns empty string for undefined values', () => {
      const undefinedValue = undefined as unknown as DateValue;
      expect(formatRelativeTime(undefinedValue)).toBe('');
    });

    it('returns empty string for invalid date values', () => {
      expect(formatRelativeTime('invalid-date')).toBe('');
      const nullValue = null as unknown as DateValue;
      expect(formatRelativeTime(nullValue)).toBe('');
    });
  });
});

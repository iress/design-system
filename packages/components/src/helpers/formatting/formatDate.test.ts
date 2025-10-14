import { formatDate, formatShortDate, getDateObj, pad } from './formatDate';

describe('Component library formatting tests', () => {
  const dateNumber = 1631883423423;
  const dateObj = new Date(dateNumber);
  const dateString = '2021-09-17T12:57:03.423Z';
  const formattedDate = '17/09/2021';

  beforeAll(() => {
    vi.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('formatDate', () => {
    describe('when passed a date number', () => {
      it('returns a formatted (DD/MM/YYYY) date', () => {
        expect(formatDate(dateNumber)).toBe(formattedDate);
      });
    });

    describe('when passed a date string', () => {
      it('returns a formatted (DD/MM/YYYY) date', () => {
        expect(formatDate(dateString)).toBe(formattedDate);
      });
    });

    describe('when passed an invalid value', () => {
      it('returns an empty string', () => {
        expect(formatDate('fdf')).toBe('');
      });
    });
  });

  describe('getDateObj', () => {
    describe('when passed a date', () => {
      it('returns the data as-is', () => {
        expect(getDateObj(dateObj)).toEqual(dateObj);
      });
    });

    describe('when passed a date number', () => {
      it('returns a valid date object', () => {
        expect(getDateObj(dateNumber)).toEqual(dateObj);
      });
    });
    describe('when passed a date string', () => {
      it('returns a valid date object', () => {
        expect(getDateObj(dateString)).toEqual(dateObj);
      });
    });
  });

  describe('pad', () => {
    describe('when passed a number lower than 10', () => {
      it('appends a 0 and returns as a string', () => {
        expect(pad(5)).toBe('05');
        expect(pad(9)).toBe('09');
        expect(pad(0)).toBe('00');
      });
    });
    describe('when passed a number higher than 9', () => {
      it('returns as a string', () => {
        expect(pad(10)).toBe('10');
        expect(pad(15)).toBe('15');
        expect(pad(55)).toBe('55');
      });
    });
  });

  describe('formatShortDate', () => {
    it('parses the date and returns a formatted string', () => {
      expect(formatShortDate(dateNumber)).toBe('17 Sep 2021');
      expect(formatShortDate(dateObj)).toBe('17 Sep 2021');
      expect(formatShortDate(dateString)).toBe('17 Sep 2021');
    });
  });
});

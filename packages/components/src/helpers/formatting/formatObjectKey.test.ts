import { formatObjectKey } from './formatObjectKey';

describe('Component library formatting tests', () => {
  beforeAll(() => {
    vi.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('formatObjectKey', () => {
    it('converts camel case to a nice string', () => {
      const formatted = formatObjectKey('camelCaseString');
      expect(formatted).toBe('Camel Case String');
    });

    it('converts snake case to a nice string', () => {
      const formatted = formatObjectKey('snake_case_string');
      expect(formatted).toBe('Snake Case String');
    });

    it('converts kebab case to a nice string', () => {
      const formatted = formatObjectKey('kebab-case-string');
      expect(formatted).toBe('Kebab Case String');
    });
  });
});

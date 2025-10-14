import { formatCurrency } from './formatCurrency'; // Adjust the import path as needed

describe('formatCurrency', () => {
  it('should return an empty string when value is empty', () => {
    expect(formatCurrency({ value: '' })).toBe('');
  });

  it('should return the original value if it cannot be converted to a number', () => {
    expect(formatCurrency({ value: 'not a number' })).toBe('not a number');
  });

  it('should format currency with default options', () => {
    expect(formatCurrency({ value: '1000' })).toBe('1,000.00');
  });

  it('should format currency with custom locale', () => {
    expect(formatCurrency({ value: '1000', locale: 'de-DE' })).toBe('1.000,00');
  });

  it('should format currency with custom currency code', () => {
    expect(formatCurrency({ value: '1000', currencyCode: 'USD' })).toBe(
      '1,000.00',
    );
  });

  it('should format currency with symbol when withSymbol is true', () => {
    expect(formatCurrency({ value: '1000', withSymbol: true })).toBe(
      '$1,000.00',
    );
  });

  it('should format negative numbers correctly', () => {
    expect(String(formatCurrency({ value: '-1000' })).replace(/\s/g, '')).toBe(
      '-1,000.00',
    );
  });

  it('should format large numbers correctly', () => {
    expect(formatCurrency({ value: '9123456789123456' })).toBe(
      '9,123,456,789,123,456.00',
    );
  });

  it('should format small decimal numbers correctly', () => {
    expect(formatCurrency({ value: '0.01' })).toBe('0.01');
  });

  it('should use currency code when withSymbol is false', () => {
    expect(
      formatCurrency({
        value: '1000',
        withSymbol: false,
        currencyCode: 'USD',
      }),
    ).toBe('1,000.00');
  });
});

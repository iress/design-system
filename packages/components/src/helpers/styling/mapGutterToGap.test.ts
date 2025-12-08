import { mapGutterToGap } from './mapGutterToGap';

describe('mapGutterToGap', () => {
  it('should return the correct gap for a string input', () => {
    const gapString = mapGutterToGap('md');
    expect(gapString).toBe('spacing.4');
  });

  it('should return the correct gap for an object input', () => {
    const gapObject = mapGutterToGap({ sm: 'sm', lg: 'lg' });
    expect(gapObject).toEqual({ sm: 'spacing.2', lg: 'spacing.7' });
  });

  it('should return "spacing.0" for an invalid input', () => {
    const gapInvalid = mapGutterToGap();
    expect(gapInvalid).toBe('spacing.0');
  });
});

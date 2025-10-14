import { composePopoverWidth } from './composePopoverWidth';

describe('composePopoverWidth', () => {
  it('returns empty object if no width provided', () => {
    expect(composePopoverWidth()).toStrictEqual({});
  });

  it('returns width styles if width provided', () => {
    expect(composePopoverWidth('30rem')).toStrictEqual({
      maxWidth: '30rem',
      width: '100%',
    });
  });

  it('returns maxWidth none if its set to match the activator', () => {
    expect(composePopoverWidth('30rem', true)).toStrictEqual({
      maxWidth: 'none',
    });
  });
});

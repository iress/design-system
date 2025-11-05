import { withJsxTransformer } from './withJsxTransformer';

describe('withJsxTransformer', () => {
  it('creates an docs parameter with the jsx settings', () => {
    expect(
      withJsxTransformer({
        showFunctions: true,
      }),
    ).toEqual({
      jsx: {
        showFunctions: true,
      },
    });
  });
});

import { stringifyStorybookArgs } from './stringifyStorybookArgs';

describe('stringifyStorybookArgs', () => {
  it('stringifies the args into an Args for use in Storybook code samples', () => {
    expect(stringifyStorybookArgs({ required: true })).toEqual(
      '{\n  required: true,\n}',
    );
  });
});

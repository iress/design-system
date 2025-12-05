import { addToStorybookCategory } from './addToStorybookCategory';
import { disableArgTypes } from './disableArgTypes';
import { mergeStorybookConfig } from './mergeStorybookConfig';
import { removeArgTypes } from './removeArgTypes';
import { withCustomSource } from './withCustomSource';

describe('mergeStorybookConfig', () => {
  it('combines multiple objects into a single object', () => {
    expect(
      mergeStorybookConfig({
        hello: 'there',
      }),
    ).toEqual({
      hello: 'there',
    });

    expect(
      mergeStorybookConfig(
        {
          hello: 'there',
        },
        {
          hello: 'world',
        },
      ),
    ).toEqual({
      hello: 'world',
    });

    expect(
      mergeStorybookConfig(
        {
          hello: {
            again: 0,
            notAgain: 1,
          },
        },
        {
          hello: {
            there: 2,
          },
        },
      ),
    ).toEqual({
      hello: {
        again: 0,
        notAgain: 1,
        there: 2,
      },
    });
  });

  it('combines other helpers into a single object', () => {
    expect({
      argTypes: mergeStorybookConfig(
        addToStorybookCategory('storybook', ['hello', 'world']),
        removeArgTypes(['hello']),
        disableArgTypes(['world']),
      ),
      parameters: mergeStorybookConfig(withCustomSource('code')),
    }).toEqual({
      argTypes: {
        hello: {
          table: {
            category: 'storybook',
            disable: true,
          },
        },
        world: {
          table: {
            category: 'storybook',
          },
          control: {
            disable: true,
            type: {},
          },
        },
      },
      parameters: {
        docs: {
          source: {
            code: 'code',
            language: 'tsx',
          },
        },
      },
    });
  });
});

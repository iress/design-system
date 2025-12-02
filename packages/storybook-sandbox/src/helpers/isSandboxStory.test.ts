import { type API } from 'storybook/manager-api';
import {
  isSandboxStory,
  isSandboxStoryFromContext,
  isSandboxStoryFromParameters,
} from './isSandboxStory';
import { ADDON_ID } from '../constants';

describe('isSandboxStory', () => {
  it('returns true if addon is not disabled via the Storybook API', () => {
    expect(
      isSandboxStory({
        getCurrentStoryData: () => ({
          parameters: {
            [ADDON_ID]: {
              disable: false,
            },
          },
        }),
      } as unknown as API),
    ).toBe(true);
  });
});

describe('isSandboxStoryFromParameters', () => {
  it('returns true if addon is not disabled via Storybook parameters', () => {
    expect(
      isSandboxStoryFromParameters({
        [ADDON_ID]: {
          disable: false,
        },
      }),
    ).toBe(true);
  });
});

describe('isSandboxStoryFromContext', () => {
  it('returns true if addon is not disabled via Storybook context', () => {
    expect(
      isSandboxStoryFromContext({
        parameters: {
          [ADDON_ID]: {
            disable: false,
          },
        },
      }),
    ).toBe(true);
  });
});

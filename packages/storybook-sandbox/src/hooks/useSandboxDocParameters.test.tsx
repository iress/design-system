import { act, renderHook } from '@testing-library/react';
import { useSandboxDocParameters } from './useSandboxDocParameters';
import { addons } from 'storybook/preview-api';
import { SANDBOX_DOCS_RENDERED } from '../constants';
import { type ChannelListener } from 'storybook/internal/manager-api';

// Mocking the Storybook Addons Channel
const channelOn = vi.fn();
vi.mock('storybook/preview-api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/preview-api')>()),
  addons: {
    getChannel: () => ({
      on: channelOn,
      off: vi.fn(),
      last: () => [
        {
          parameters: {
            hello: 'world',
          },
        },
      ],
      emit: (event: string, ...args: never[]) => {
        const listeners = (
          channelOn.mock.calls as [string, ChannelListener][]
        ).filter((listener) => listener[0] === event);

        listeners.forEach(([, listener]) => listener(...args));
      },
    }),
  },
}));

describe('useSandboxDocParameters', () => {
  it('updates parameters when the event is called', () => {
    const setParameters = vi.fn();

    renderHook(() => useSandboxDocParameters(setParameters));

    // Should be called with the last event if it happened before rendering
    expect(setParameters).toHaveBeenCalledWith({ hello: 'world' });

    // Emit a new event
    act(() => {
      addons
        .getChannel()
        ?.emit(SANDBOX_DOCS_RENDERED, { parameters: { hello: 'storybook' } });
    });

    // Should be called with new parameters
    expect(setParameters).toHaveBeenLastCalledWith({ hello: 'storybook' });
  });
});

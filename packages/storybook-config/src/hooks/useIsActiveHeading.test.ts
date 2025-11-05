import { act, renderHook, waitFor } from '@testing-library/react';
import { useIsActiveHeading } from './useIsActiveHeading';

describe('useIsActiveHeading', () => {
  const heading = { current: document.createElement('div') };
  heading.current.innerHTML = '<h1 id="test">Test</h1>';

  it('should update when the hash is changed to the hash of the heading', async () => {
    const hook = renderHook(() => useIsActiveHeading(heading));

    expect(hook.result.current).toBe(false);

    // Simulate hash change
    void act(() => (window.location.hash = '#test'));

    // Should now be active heading
    await waitFor(() => expect(hook.result.current).toBe(true));

    // Simulate hash change to something else
    void act(() => (window.location.hash = '#other'));

    // Should not be active heading
    await waitFor(() => expect(hook.result.current).toBe(false));
  });
});

import { renderHook, act, waitFor } from '@testing-library/react';
import { useHash } from './useHash';

describe('useHash', () => {
  it('gets the hash of the page', async () => {
    window.location.hash = 'test';
    const hook = renderHook(() => useHash());

    // Initial hash should be set
    expect(hook.result.current[0]).toBe('#test');

    // Simulate visiting a hash
    void act(() => (window.location.hash = 'new'));

    // The next render should be the new hash
    await waitFor(() => expect(hook.result.current[0]).toBe('#new'));
  });

  it('sets the hash of the page', () => {
    window.location.hash = '';
    const hook = renderHook(() => useHash());

    // Initial hash should be set
    expect(hook.result.current[0]).toBe('');

    // Update the hash
    act(() => hook.result.current[1]('new'));

    // The next render should be the new hash
    expect(window.location.hash).toBe('#new');
  });
});

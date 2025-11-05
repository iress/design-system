import { act, renderHook } from '@testing-library/react';
import { useTocbotClick } from './useTocbotClick';

describe('useTocbotClick', () => {
  it('should update when the tocbot is clicked (custom event)', () => {
    const hook = renderHook(() => useTocbotClick());

    const initialTime = hook.result.current;

    // Simulate tocbot click
    void act(() => window.dispatchEvent(new Event('tocbot:click')));

    // Should be set to the next time
    expect(hook.result.current).not.toBe(initialTime);
  });
});

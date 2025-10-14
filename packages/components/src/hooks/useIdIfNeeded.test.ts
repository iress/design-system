import { renderHook } from '@testing-library/react';
import { useIdIfNeeded } from './useIdIfNeeded';

describe('useIdIfNeeded', () => {
  it('uses the prop id if provided', () => {
    const hook = renderHook(() => useIdIfNeeded({ id: 'test' }));
    expect(hook.result.current).toBe('test');
  });

  it('uses automatic id if no id provided', () => {
    const hook = renderHook(() => useIdIfNeeded());
    expect(hook.result.current).toBeTypeOf('string');
    expect(hook.result.current).not.toBe('');
  });

  it('prefixes automatic id', () => {
    const hook = renderHook(() => useIdIfNeeded(undefined, 'prefix'));
    expect(hook.result.current.startsWith('prefix')).toBe(true);
  });

  it('ignores prefixes if id is provided', () => {
    const hook = renderHook(() => useIdIfNeeded({ id: 'test' }, 'prefix'));
    expect(hook.result.current.startsWith('prefix')).toBe(false);
  });
});

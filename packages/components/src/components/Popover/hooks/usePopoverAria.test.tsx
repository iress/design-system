import { renderHook } from '@testing-library/react';
import { usePopoverAria } from './usePopoverAria';

describe('usePopoverAria', () => {
  it('toggles aria controls', () => {
    const hook = renderHook(() => usePopoverAria());

    const attributes = hook.result.current;
    expect(attributes.getAriaControls()).toEqual([]);

    attributes.toggleAriaControls('control-1');
    expect(attributes.getAriaControls()).toEqual(['control-1']);

    attributes.toggleAriaControls('control-1', false);
    expect(attributes.getAriaControls()).toEqual([]);
  });
});

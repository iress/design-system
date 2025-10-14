import { renderHook } from '@testing-library/react';
import { useAriaRelationship } from './useAriaRelationship';

describe('useAriaRelationship', () => {
  it('adds and removes the aria attribute during re-renders', () => {
    const hook = renderHook(() => useAriaRelationship('aria-controls'));
    const controlId = 'test';

    const controller = document.createElement('div');
    const control = document.createElement('div');

    // Mock first render where controller and control are rendered
    hook.result.current.setController(controller);
    hook.result.current.setControlViaRef(controlId)(control);

    expect(controller).toHaveAttribute('aria-controls', controlId);

    // Mock second render where control is removed
    hook.result.current.setControlViaRef(controlId)(null);

    expect(controller).toHaveAttribute('aria-controls', '');
  });
});

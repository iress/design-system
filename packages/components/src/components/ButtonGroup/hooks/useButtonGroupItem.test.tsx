import { renderHook, act } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { ButtonGroupItemProps, useButtonGroupItem } from './useButtonGroupItem';
import {
  ButtonGroupProvider,
  ButtonGroupProviderProps,
} from '../ButtonGroupProvider';

function renderHookInButtonGroup(
  props: ButtonGroupItemProps,
  wrapperProps: Partial<ButtonGroupProviderProps> = {},
) {
  return renderHook(() => useButtonGroupItem(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <ButtonGroupProvider {...wrapperProps}>{children}</ButtonGroupProvider>
    ),
  });
}

describe('useButtonGroupItem', () => {
  it('returns undefined if not in a button group', () => {
    const hook = renderHook(() => useButtonGroupItem({}));
    expect(hook.result.current).toBeUndefined();
  });

  it('provides attributes if rendered in a button group', () => {
    const hook = renderHookInButtonGroup({});
    expect(hook.result.current?.active).toBe(false);
    expect(hook.result.current?.props).toStrictEqual({
      'aria-pressed': false,
    });
    expect(hook.result.current?.toggle).toBeInstanceOf(Function);
  });

  it('does not call onChange if the button has no value', () => {
    const onChange = vi.fn();
    const hook = renderHookInButtonGroup(
      {},
      {
        onChange,
      },
    );
    hook.result.current?.toggle();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange when the button is toggled', () => {
    const onChange = vi.fn();
    const hook = renderHookInButtonGroup(
      {
        value: 'test',
      },
      {
        onChange,
      },
    );

    act(() => hook.result.current?.toggle());

    expect(onChange).toHaveBeenCalledWith('test');
    expect(hook.result.current?.props['aria-pressed']).toBe(true);
    expect(hook.result.current?.active).toBe(true);

    act(() => hook.result.current?.toggle());

    expect(onChange).toHaveBeenCalledWith(undefined);
    expect(hook.result.current?.props['aria-pressed']).toBe(false);
    expect(hook.result.current?.active).toBe(false);
  });

  it('calls onChange when the button is toggled (multiple)', () => {
    const onChange = vi.fn();
    const hook = renderHookInButtonGroup(
      {
        value: 'test',
      },
      {
        multiple: true,
        onChange,
      },
    );

    act(() => hook.result.current?.toggle());

    expect(onChange).toHaveBeenCalledWith(['test']);
    expect(hook.result.current?.props['aria-pressed']).toBe(true);
    expect(hook.result.current?.active).toBe(true);

    act(() => hook.result.current?.toggle());

    expect(onChange).toHaveBeenCalledWith([]);
    expect(hook.result.current?.props['aria-pressed']).toBe(false);
    expect(hook.result.current?.active).toBe(false);
  });
});

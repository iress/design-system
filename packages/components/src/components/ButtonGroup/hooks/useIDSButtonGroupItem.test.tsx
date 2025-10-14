import { renderHook, act } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { useIDSButtonGroupItem } from './useIDSButtonGroupItem';
import {
  ButtonGroupItemProps,
  IressButtonGroupProviderProps,
} from '../ButtonGroup.types';
import { IressButtonGroupProvider } from '../ButtonGroupProvider';
import styles from '../ButtonGroup.module.scss';

function renderHookInButtonGroup(
  props: ButtonGroupItemProps,
  wrapperProps: Partial<IressButtonGroupProviderProps> = {},
) {
  return renderHook(() => useIDSButtonGroupItem(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <IressButtonGroupProvider {...wrapperProps}>
        {children}
      </IressButtonGroupProvider>
    ),
  });
}

describe('useIDSButtonGroupItem', () => {
  it('returns undefined if not in a button group', () => {
    const hook = renderHook(() => useIDSButtonGroupItem({}));
    expect(hook.result.current).toBeUndefined();
  });

  it('provides class name and attributes if rendered in a button group', () => {
    const hook = renderHookInButtonGroup({});
    expect(hook.result.current?.className).toContain(styles.item);
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
    expect(onChange).not.toBeCalled();
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

    expect(onChange).toBeCalledWith({ selected: 'test' });
    expect(hook.result.current?.props['aria-pressed']).toBe(true);
    expect(hook.result.current?.className).toContain(styles.active);

    act(() => hook.result.current?.toggle());

    expect(onChange).toBeCalledWith({ selected: undefined });
    expect(hook.result.current?.props['aria-pressed']).toBe(false);
    expect(hook.result.current?.className).not.toContain(styles.active);
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

    expect(onChange).toBeCalledWith({ selected: ['test'] });
    expect(hook.result.current?.props['aria-pressed']).toBe(true);
    expect(hook.result.current?.className).toContain(styles.active);

    act(() => hook.result.current?.toggle());

    expect(onChange).toBeCalledWith({ selected: [] });
    expect(hook.result.current?.props['aria-pressed']).toBe(false);
    expect(hook.result.current?.className).not.toContain(styles.active);
  });
});

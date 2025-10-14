import { renderHook } from '@testing-library/react';
import { useMenuStyles } from './useMenuStyles';
import styles from '../Menu.module.scss';
import { MenuStylesHookProps } from '../Menu.types';
import { IressPopover, IressPopoverProps } from '@/main';
import { PropsWithChildren } from 'react';

function renderHookInPopover(
  props: MenuStylesHookProps,
  wrapperProps: Partial<IressPopoverProps> = {},
) {
  return renderHook(() => useMenuStyles(props), {
    wrapper: ({ children }: PropsWithChildren) => (
      <IressPopover
        {...wrapperProps}
        activator={wrapperProps.activator ?? <button>Activator</button>}
      >
        {children}
      </IressPopover>
    ),
  });
}

describe('useMenuStyles', () => {
  it('has default class name', () => {
    const hook = renderHook(() => useMenuStyles({}));

    const attributes = hook.result.current;
    expect(attributes.className).toContain(styles.menu);
    expect(attributes.className).toContain(styles.stack);
    expect(attributes.className).not.toContain(styles.fluid);
    expect(attributes.className).not.toContain(styles.nav);
  });

  it('changes layout class name', () => {
    const hook = renderHook(() => useMenuStyles({ layout: 'inline' }));

    const attributes = hook.result.current;
    expect(attributes.className).toContain(styles.inline);
  });

  it('adds fluid class name', () => {
    const hook = renderHook(() => useMenuStyles({ fluid: true }));

    const attributes = hook.result.current;
    expect(attributes.className).toContain(styles.fluid);
  });

  describe('inside popover', () => {
    it('always adds fluid class name to menu popover', () => {
      const hook = renderHookInPopover({}, { type: IressPopover.Type.Menu });
      const attributes = hook.result.current;
      expect(attributes.className).toContain(styles.fluid);
    });

    it('always adds fluid class name to listbox popover', () => {
      const hook = renderHookInPopover({}, { type: IressPopover.Type.Listbox });
      const attributes = hook.result.current;
      expect(attributes.className).toContain(styles.fluid);
    });
  });
});

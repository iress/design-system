import { render, renderHook } from '@testing-library/react';
import { type PropsWithChildren } from 'react';
import styles from '../MenuItem.module.scss';
import checkboxMarkStyles from '../../../CheckboxMark/CheckboxMark.module.scss';
import { type MenuItemButtonHookProps } from '../MenuItem.types';
import { useMenuItemButtonProps } from './useMenuItemButtonProps';
import { type MenuProviderProps } from '../../Menu.types';
import { MenuProvider } from '../../MenuProvider';

const TEST_ID = 'test';

function renderHookSolo(props: Partial<MenuItemButtonHookProps> = {}) {
  return renderHook(() =>
    useMenuItemButtonProps({
      ...props,
      'data-testid': TEST_ID,
    }),
  );
}

function renderHookInMenu(
  props: Partial<MenuItemButtonHookProps> = {},
  wrapperProps: Partial<MenuProviderProps> = {},
) {
  return renderHook(
    () =>
      useMenuItemButtonProps({
        ...props,
        'data-testid': TEST_ID,
      }),
    {
      wrapper: ({ children }: PropsWithChildren) => (
        <MenuProvider
          {...wrapperProps}
          id={wrapperProps.id ?? 'test'}
          layout={wrapperProps.layout ?? 'stack'}
          role={wrapperProps.role ?? 'list'}
        >
          {children}
        </MenuProvider>
      ),
    },
  );
}

describe('useMenuItemButtonProps', () => {
  it('uses defaults if nothing provided', () => {
    const hook = renderHookSolo();

    const props = hook.result.current;
    expect(props.append).toBeUndefined();
    expect(props.children).toBeUndefined();
    expect(props.className).toContain(styles.menuItem);
    expect(props.className).toContain(styles.button);
    expect(props.noWrap).toBeFalsy();
    expect(props.role).toBeUndefined();
  });

  describe('props', () => {
    describe('append', () => {
      it('renders append if provided', () => {
        const hook = renderHookSolo({ append: 'append' });
        const props = hook.result.current;
        expect(props.append).toBeDefined();

        const screen = render(props.append);
        expect(screen.getByText('append')).toHaveClass(styles.append);
      });
    });

    describe('children', () => {
      it('renders children if provided', () => {
        const hook = renderHookSolo({ children: 'children' });
        const props = hook.result.current;
        expect(props.children).toBeDefined();

        const screen = render(props.children);
        expect(screen.getByText('children')).toHaveClass(styles.contents);
      });
    });

    describe('className', () => {
      it('adds className if provided', () => {
        const hook = renderHookSolo({ className: 'custom' });
        const props = hook.result.current;
        expect(props.className).toContain('custom');
      });
    });

    describe('divider', () => {
      it('adds divider class if provided', () => {
        const hook = renderHookSolo({ divider: true });
        const props = hook.result.current;
        expect(props.className).toContain(styles.divider);
      });
    });

    describe('prepend', () => {
      it('renders prepend if provided', () => {
        const hook = renderHookSolo({ prepend: 'prepend' });
        const props = hook.result.current;
        expect(props.prepend).toBe('prepend');
      });

      it('renders checkbox if menu is multiSelect', () => {
        const hook = renderHookInMenu(
          { value: '1' },
          { multiSelect: true, selected: ['1'] },
        );
        const props = hook.result.current;
        expect(props.prepend).toBeDefined();

        const screen = render(props.prepend);
        const checkboxMark = screen.getByTestId(`${TEST_ID}__checkbox-mark`);
        expect(checkboxMark).toHaveClass(
          styles.checkboxMark,
          checkboxMarkStyles.checked,
        );
      });
    });

    describe('role', () => {
      it('does not add role if listitem', () => {
        const hook = renderHookSolo({ role: 'listitem' });
        const props = hook.result.current;
        expect(props.role).toBeUndefined();
      });

      it('adds role if not listitem', () => {
        const hook = renderHookSolo({ role: 'option' });
        const props = hook.result.current;
        expect(props.role).toBe('option');
      });
    });

    describe('selected', () => {
      it('uses selected prop if menu does not support selection', () => {
        const hook = renderHookInMenu({ selected: true }, { role: 'list' });
        const props = hook.result.current;
        expect(props.className).toContain(styles.selected);
      });
    });
  });

  describe('inside menu', () => {
    describe('layout', () => {
      it('adds layout class', () => {
        const hook = renderHookInMenu({}, { layout: 'stack' });
        const props = hook.result.current;
        expect(props.className).toContain(styles['menu--stack']);
      });
    });

    describe('multiSelect', () => {
      it('adds multiSelect class if menu is multiSelect', () => {
        const hook = renderHookInMenu({}, { multiSelect: true });
        const props = hook.result.current;
        expect(props.className).toContain(styles.multiSelect);
      });
    });

    describe('nav', () => {
      it('adds nav class if menu is set to nav', () => {
        const hook = renderHookInMenu({}, { nav: true });
        const props = hook.result.current;
        expect(props.className).toContain(styles['menu--nav']);
      });
    });

    describe('noWrap', () => {
      it('adds noWrap class if menu has noWrap', () => {
        const hook = renderHookInMenu({}, { noWrap: true });
        const props = hook.result.current;
        expect(props.className).toContain(styles.noWrap);
      });
    });

    describe('selected', () => {
      it('uses menu selected if menu supports selection', () => {
        const hook = renderHookInMenu(
          { selected: false, value: '1' },
          { role: 'listbox', selected: '1' },
        );
        const props = hook.result.current;
        expect(props.className).toContain(styles.selected);
      });
    });
  });
});

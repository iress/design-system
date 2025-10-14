import { IressExpander } from '../../Expander';
import { IressPanel, type IressPanelProps } from '../../Panel';
import { type IressMenuProps } from '../Menu';

export const MenuRoleDescription = ({
  children,
  role,
  ...restProps
}: IressPanelProps & { role: IressMenuProps['role'] }) => {
  if (role === 'listbox') {
    return (
      <IressPanel {...restProps}>
        {children}
        <p>
          The <code>listbox</code> menu is used for lists from which a user may
          select one or more items.
        </p>
        <p>
          A value is supplied to MenuItem (like you would with an{' '}
          <code>option</code> element inside a <code>select</code>) and a{' '}
          <code>onChange</code> event is emitted with the selected value(s)
          whenever the selection is changed by the user.
        </p>
        <p>
          If you need to set the selected state of an item programmatically, you
          can use the <code>selected</code> prop. This is set as string on Menu
          (or an array of strings for multi-selectable Menus), which then sets
          the selected state the child MenuItems. You can also set the{' '}
          <code>selected</code> prop on individual MenuItems, although we
          recommend that you use Menu&apos;s <code>selected</code> prop instead.
        </p>
        <p>
          <strong>Note:</strong> This is the menu type used to power Filter
          components.
        </p>
        <IressExpander activator="Keyboard interaction" mode="link">
          <ul>
            <li>
              Menu items can be navigated using the arrow keys, depending on the
              orientation of the menu.
            </li>
            <li>
              In stack layouts, pressing the <code>up</code> arrow key on the
              first item will <strong>not</strong> focus the last item
            </li>
            <li>
              In stack layouts, pressing the <code>down</code> arrow key on the
              last item will <strong>not</strong> focus the first item
            </li>
            <li>
              In inline layouts, pressing the <code>right</code> arrow key on
              the last item will <strong>not</strong> focus the first item
            </li>
            <li>
              In inline layouts, pressing the <code>left</code> arrow key on the
              first item will <strong>not</strong> focus the last item
            </li>
            <li>
              Pressing the <code>tab</code> key when focused on any item in the
              menu will focus to next focusable item outside of the menu
            </li>
          </ul>
        </IressExpander>
      </IressPanel>
    );
  }

  if (role === 'menu') {
    return (
      <IressPanel {...restProps}>
        {children}
        <p>
          The application menu is used when the items in the menu has an action
          that performs a task in the application. It is activated by setting
          the <code>role</code> prop to <code>menu</code>.
        </p>

        <IressExpander activator="Keyboard interaction" mode="link">
          <ul>
            <li>
              In stack layout, pressing the <code>up</code> arrow key on the
              first item will focus the last item
            </li>
            <li>
              In stack layout, pressing the <code>down</code> arrow key on the
              last item will focus the first item
            </li>
            <li>
              In inline layouts, pressing the <code>left</code> arrow key on the
              first item will focus the last item
            </li>
            <li>
              In inline layouts, pressing the <code>right</code> arrow key on
              the last item will focus the first item
            </li>
            <li>
              Pressing the <code>tab</code> key when focused on any item in the
              menu will focus to next focusable item outside of the menu
            </li>
          </ul>
        </IressExpander>
      </IressPanel>
    );
  }

  if (role === 'list') {
    return (
      <IressPanel {...restProps}>
        {children}
        <p>
          The list menu is used to describe that the items are related to the
          same context, similar to using <code>ul</code> or <code>ol</code>{' '}
          lists. It is activated by setting the <code>role</code> prop to{' '}
          <code>list</code>.
        </p>

        <IressExpander activator="Keyboard interaction" mode="link">
          <ul>
            <li>Menu items cannot be navigated using the arrow keys</li>
            <li>
              Menu items are navigated using the <code>tab</code> key
            </li>
          </ul>
        </IressExpander>
      </IressPanel>
    );
  }

  return null;
};

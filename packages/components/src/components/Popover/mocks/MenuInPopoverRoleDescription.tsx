import { type IressMenuProps } from '@/components/Menu';
import { IressPanel, type IressPanelProps } from '../../Panel';

export const MenuInPopoverRoleDescription = ({
  children,
  role,
  ...restProps
}: IressPanelProps & { role: IressMenuProps['role'] }) => {
  if (role === 'listbox') {
    return (
      <IressPanel {...restProps}>
        {children}
        <h3>Listbox menu behaviour</h3>
        <ul>
          <li>Once activated, focus is set to the first menu item</li>
          <li>Menu items can be navigated using arrow keys</li>
          <li>
            Popover will close when:
            <ul>
              <li>
                the <code>esc</code> key is pressed
              </li>
              <li>
                the <code>tab</code> key is pressed (focus moves to the next
                focusable element in the DOM)
              </li>
              <li>
                a menu item is clicked (except when a listbox menu is in{' '}
                <code>multiSelect</code> mode)
              </li>
              <li>
                When user presses the <code>up</code> key when the first item is
                focused
              </li>
            </ul>
          </li>
        </ul>
      </IressPanel>
    );
  }

  if (role === 'list') {
    return (
      <IressPanel {...restProps}>
        {children}
        <h3>Navigation/list menu behaviour</h3>
        <ul>
          <li>Once activated, focus is set to the popover panel</li>
          <li>
            Menu items can be navigated using the <code>tab</code> key
          </li>
          <li>
            Popover will close when:
            <ul>
              <li>
                the <code>esc</code> key is pressed
              </li>
              <li>the popover panel loses focus</li>
            </ul>
          </li>
        </ul>
      </IressPanel>
    );
  }

  if (role === 'menu') {
    return (
      <IressPanel {...restProps}>
        {children}
        <h3>Application menu behaviour</h3>
        <ul>
          <li>Once activated, focus is set to the first menu item</li>
          <li>
            Menu items can be navigated using the <code>up</code> and{' '}
            <code>down</code> arrow keys
          </li>
          <li>
            Popover will close when:
            <ul>
              <li>
                the <code>esc</code> key is pressed
              </li>
              <li>
                the <code>tab</code> key is pressed (focus moves to the
                focusable element in the DOM)
              </li>
              <li>a menu item is clicked</li>
            </ul>
          </li>
        </ul>
      </IressPanel>
    );
  }

  return null;
};

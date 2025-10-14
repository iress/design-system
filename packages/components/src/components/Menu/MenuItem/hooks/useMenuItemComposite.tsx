import { CompositeItem } from '@floating-ui/react';
import { type ReactElement, cloneElement } from 'react';
import styles from '../MenuItem.module.scss';
import { useMenuComposite } from '../../hooks/useMenuComposite';

/**
 * Helps the consuming component decide whether the MenuItem needs to use Floating UI Composite components.
 * Floating UI composite components manage the keyboard navigation of the menu.
 *
 * Scenarios
 * - If inside a composite menu, wrap the node in a CompositeItem component
 * - If not inside a composite menu, display the node as is
 * - If the role is listitem, we cannot assign an interactive item as a listitem, hence wrap the node in a span with role listitem
 *
 * See: https://floating-ui.com/docs/Composite
 * Also see: https://floating-ui.com/docs/useListNavigation
 *
 * TODO: Change to a component, and use the new isMenuComposite helper and pass the popover and menu as arguments.
 *
 * @param {ReactElement} node the node that will be rendered as a menu item
 * @param {string} role The role of the item, this is usually calculated with the `composeMenuItemRole` helper.
 * @returns {ReactNode}
 */
export const useMenuItemComposite = (node?: ReactElement, role?: string) => {
  const isComposite = useMenuComposite();

  if (!node) {
    return null;
  }

  const button =
    role === 'listitem' ? (
      <span role="listitem" className={styles.listItem}>
        {node}
      </span>
    ) : (
      node
    );
  return isComposite ? (
    <CompositeItem render={(htmlProps) => cloneElement(button, htmlProps)} />
  ) : (
    button
  );
};

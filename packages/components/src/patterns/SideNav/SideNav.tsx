import {
  type CSSProperties,
  type ElementType,
  type MouseEventHandler,
  type ReactNode,
  useMemo,
} from 'react';
import { css, cx } from '@/styled-system/css';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { IressMenu } from '@/components/Menu';
import { IressMenuItem } from '@/components/Menu/MenuItem/MenuItem';
import { IressMenuGroup } from '@/components/Menu/MenuGroup/MenuGroup';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@/helpers/utility/propagateTestid';
import type { MaterialSymbol } from 'material-symbols';
import { sideNav } from './SideNav.styles';
import { useSideNavState } from './hooks/useSideNavState';
import { isSideNavGroup } from './SideNav.helpers';
import type { IressStyledProps } from '@/types';
import { IressText } from '@/components/Text';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A flat navigation item shown in the side panel.
 */
export interface SideNavSubItem {
  /** Unique key for the item. */
  key: string;

  /** Display label for the sub-item. */
  label: ReactNode;

  /** URL for the navigation link — renders an anchor. */
  href?: string;

  /** Custom element type for third-party routing libraries. */
  element?: ElementType;

  /** Optional click handler for side-effects. */
  onClick?: MouseEventHandler;

  /** Whether this sub-item is currently active/selected. */
  active?: boolean;
}

/**
 * A group of sub-items displayed as an expandable drawer in the side panel.
 */
export interface SideNavSideMenuGroup {
  /** Unique key for the group. */
  key: string;

  /** Display label for the drawer header. */
  label: ReactNode;

  /** Child items shown inside this drawer. */
  children: SideNavSubItem[];

  /** Whether this drawer is active/expanded. */
  active?: boolean;
}

/**
 * A panel content entry — either a flat item or a group of items.
 *
 * When mixing flat items and groups in a single array, ensure all `key` values
 * are unique across both types to avoid React reconciliation issues.
 */
export type SideNavPanelItem = SideNavSubItem | SideNavSideMenuGroup;

/**
 * A top-level navigation item with a rail icon and optional panel children.
 */
export interface SideNavItem {
  /** Unique key for the item. */
  key: string;

  /** Icon shown on the rail (Material Symbol name). */
  icon: MaterialSymbol;

  /** Display label for the item. */
  label: ReactNode;

  /** Accessible label for the rail icon tooltip. */
  ariaLabel?: string;

  /**
   * Content shown in the side panel when this item is active.
   * Can be flat sub-items, grouped sub-items, or a mix of both.
   */
  children?: SideNavPanelItem[];

  /** URL for navigation. */
  href?: string;

  /** Custom element type for third-party routing libraries. */
  element?: ElementType;

  /** Optional click handler for side-effects. */
  onClick?: MouseEventHandler;

  /** Show a divider after this item in the rail. */
  divider?: boolean;
}

/**
 * Common props shared by all IressSideNav configurations.
 */
interface IressSideNavBaseProps extends Omit<IressStyledProps<'nav'>, 'width'> {
  /** Array of navigation items defining the rail icons. */
  items: SideNavItem[];

  /** Callback fired when the active item changes via a rail click. */
  onActiveItemKeyChange?: (key: string) => void;

  /**
   * Override: label displayed at the top of the side panel.
   * When provided alongside sideMenuItems, this replaces the active item's label.
   */
  sideMenuLabel?: ReactNode;

  /** Whether the side panel is expanded (controlled). */
  expanded?: boolean;

  /**
   * Default expanded state (uncontrolled).
   * @default false
   */
  defaultExpanded?: boolean;

  /** Callback when the expanded state changes. */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * Whether to show numbered headers in the expanded side menu.
   * @default false
   */
  numbered?: boolean;

  /** Content rendered at the top of the expanded side panel. */
  header?: ReactNode;

  /** Content rendered at the bottom of the expanded side panel. */
  footer?: ReactNode;

  /**
   * Accessible label for the navigation landmark.
   * @default 'Side navigation'
   */
  'aria-label'?: string;

  /**
   * Label text for the expand button (accessibility).
   * @default 'Expand navigation'
   */
  expandLabel?: string;

  /**
   * Label text for the collapse button (accessibility).
   * @default 'Collapse navigation'
   */
  collapseLabel?: string;

  /**
   * Width of the side panel when expanded. Can be a CSS length value or number (pixels).
   * @default '250px'
   */
  width?: string | number;
}

/**
 * When no `sideMenuItems` override is provided, `activeItemKey` is required
 * to determine which rail item's children appear in the panel.
 */
interface IressSideNavWithActiveItem extends IressSideNavBaseProps {
  /**
   * Key of the active rail item.
   * Sets the initial selection and can be updated externally.
   * Rail clicks update the internal active item automatically.
   */
  activeItemKey: string;
  sideMenuItems?: never;
}

/**
 * When `sideMenuItems` are provided, they override the panel content
 * and `activeItemKey` becomes optional (used only for rail highlighting).
 */
interface IressSideNavWithSideMenuItems extends IressSideNavBaseProps {
  /**
   * Override: content to display in the side panel instead of
   * `items[activeItemKey].children`. Can be flat items, groups, or a mix.
   */
  sideMenuItems: SideNavPanelItem[];

  /**
   * Key of the active rail item.
   * Optional when sideMenuItems is provided — used only for rail highlighting.
   */
  activeItemKey?: string;
}

/**
 * Props for the IressSideNav component.
 */
export type IressSideNavProps =
  | IressSideNavWithActiveItem
  | IressSideNavWithSideMenuItems;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Provides a vertical navigation menu typically used in application sidebars.
 *
 * @example
 * ```tsx
 * import { IressSideNav } from '@iress-oss/ids-components';
 *
 * <IressSideNav
 *   items={[{ key: 'home', label: 'Home', icon: 'home' }]}
 *   activeItemKey="home"
 * />
 * ```
 */
export const IressSideNav = ({
  'aria-label': ariaLabel = 'Side navigation',
  activeItemKey,
  className,
  collapseLabel = 'Collapse navigation',
  'data-testid': dataTestId,
  defaultExpanded,
  expanded,
  expandLabel = 'Expand navigation',
  footer,
  header,
  items,
  numbered = false,
  onActiveItemKeyChange,
  onExpandedChange,
  sideMenuItems,
  sideMenuLabel,
  style,
  width: widthProp,
  ...restProps
}: IressSideNavProps) => {
  const [styleProps, nonStyleProps] = useMemo(
    () => splitCssProps(restProps),
    [restProps],
  );
  const width = typeof widthProp === 'number' ? `${widthProp}px` : widthProp;

  const {
    isExpanded,
    toggleExpanded,
    resolvedActiveItemKey,
    setActiveItemKey,
    panelContent,
    panelLabel,
    hasPanelContent,
  } = useSideNavState({
    items,
    activeItemKey,
    onActiveItemKeyChange,
    sideMenuItems,
    sideMenuLabel,
    expanded,
    defaultExpanded,
    onExpandedChange,
  });

  const classes = sideNav({ expanded: isExpanded });
  const styles = sideNav.raw({ expanded: isExpanded });

  return (
    <styled.nav
      {...nonStyleProps}
      aria-label={ariaLabel}
      className={cx(
        css(styles.root, styleProps),
        className,
        GlobalCSSClass.SideNav,
      )}
      data-testid={dataTestId}
      style={
        {
          '--iress-width': width,
          ...style,
        } as CSSProperties
      }
    >
      {/* Rail */}
      <IressMenu
        variant="rail"
        data-testid={propagateTestid(dataTestId, 'rail')}
      >
        {items.map((item) => (
          <IressMenuItem
            key={item.key}
            icon={item.icon}
            href={item.href}
            element={item.element}
            onClick={(e: React.MouseEvent) => {
              setActiveItemKey(item.key);
              item.onClick?.(e);
            }}
            aria-label={
              item.ariaLabel ??
              (typeof item.label === 'string' ? item.label : undefined)
            }
            selected={resolvedActiveItemKey === item.key}
            data-testid={propagateTestid(dataTestId, `rail-item-${item.key}`)}
            divider={item.divider}
          >
            {item.label}
          </IressMenuItem>
        ))}

        <IressMenuItem
          className={classes.toggle}
          listItemStyle={{ className: classes.toggle }}
          icon={
            isExpanded
              ? 'keyboard_double_arrow_left'
              : 'keyboard_double_arrow_right'
          }
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? collapseLabel : expandLabel}
          data-testid={propagateTestid(dataTestId, 'toggle')}
        >
          {isExpanded ? collapseLabel : expandLabel}
        </IressMenuItem>
      </IressMenu>

      {/* Side Panel */}
      <div
        className={classes.panel}
        data-testid={propagateTestid(dataTestId, 'panel')}
        aria-hidden={!isExpanded}
      >
        <div className={classes.panelContent}>
          <div className={classes.panelContentInner}>
            {/* Header slot */}
            {header && (
              <div
                className={classes.header}
                data-testid={propagateTestid(dataTestId, 'header')}
              >
                {header}
              </div>
            )}

            {/* Panel heading — active item label */}
            {panelLabel && (
              <IressText
                className={classes.panelHeading}
                element="h2"
                textStyle="typography.heading.3"
                data-testid={propagateTestid(dataTestId, 'panel-heading')}
              >
                {panelLabel}
              </IressText>
            )}

            {/* Side menu content — flat items and/or groups */}
            {hasPanelContent && (
              <IressMenu
                variant="side"
                numbered={numbered}
                data-testid={propagateTestid(dataTestId, 'side-menu')}
              >
                {panelContent.map((entry, index) =>
                  isSideNavGroup(entry) ? (
                    <IressMenuGroup
                      key={entry.key ?? index}
                      label={entry.label}
                      defaultActive={entry.active}
                      data-testid={propagateTestid(
                        dataTestId,
                        `side-group-${entry.key ?? index}`,
                      )}
                    >
                      {entry.children.map((child, childIndex) => (
                        <IressMenuItem
                          key={child.key ?? childIndex}
                          href={child.href}
                          element={child.element}
                          onClick={child.onClick}
                          selected={child.active}
                          data-testid={propagateTestid(
                            dataTestId,
                            `side-item-${child.key ?? childIndex}`,
                          )}
                        >
                          {child.label}
                        </IressMenuItem>
                      ))}
                    </IressMenuGroup>
                  ) : (
                    <IressMenuItem
                      key={entry.key ?? index}
                      href={entry.href}
                      element={entry.element}
                      onClick={entry.onClick}
                      selected={entry.active}
                      data-testid={propagateTestid(
                        dataTestId,
                        `side-item-${entry.key ?? index}`,
                      )}
                    >
                      {entry.label}
                    </IressMenuItem>
                  ),
                )}
              </IressMenu>
            )}

            {/* Footer slot */}
            {footer && (
              <div
                className={classes.footer}
                data-testid={propagateTestid(dataTestId, 'footer')}
              >
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </styled.nav>
  );
};

IressSideNav.displayName = 'IressSideNav';

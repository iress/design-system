import { type ReactNode, useMemo } from 'react';
import { css, cx } from '@/styled-system/css';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { IressButton } from '@/components/Button';
import { IressMenu } from '@/components/Menu';
import {
  IressMenuItem,
  type IressMenuItemProps,
} from '@/components/Menu/MenuItem/MenuItem';
import { IressPopover, type IressPopoverProps } from '@/components/Popover';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@/helpers/utility/propagateTestid';
import { contextualMenu } from './ContextualMenu.styles';
import type { MaterialSymbol } from 'material-symbols';
import { IressIcon } from '@/components/Icon';

export interface IressContextualMenuItem extends Omit<
  IressMenuItemProps,
  | 'canToggle'
  | 'label'
  | 'selected'
  | 'value'
  | 'children'
  | 'href'
  | 'component'
> {
  /**
   * Unique identifier for the menu item, used by React as a key and passed in the onAction callback.
   */
  key: string;

  /**
   * The content of the menu item.
   */
  label: ReactNode;

  /**
   * Icon to display alongside the menu item label.
   */
  icon?: MaterialSymbol;
}

/**
 * @deprecated Use `IressContextualMenuItem` instead. This type will be removed in a future release.
 */
export type ConectualMenuItem = IressContextualMenuItem;

export interface IressContextualMenuProps extends Omit<
  IressPopoverProps,
  'activator' | 'type'
> {
  /**
   * The items rendered in the contextual menu.
   */
  items?: IressContextualMenuItem[];

  /**
   * Size for the menu trigger.
   * @default small
   */
  size?: 'small' | 'medium';

  /**
   * Adds a border around the trigger.
   * @default false
   */
  bordered?: boolean;

  /**
   * Visual theme for the trigger treatment.
   * @default light
   */
  theme?: 'light' | 'dark';

  /**
   * Accessible label for the menu trigger button.
   * @default More options
   */
  ariaLabel?: string;

  /**
   * Emitted when a menu item is clicked.
   * Receives the clicked item as an argument.
   */
  onAction?: (item: IressContextualMenuItem) => void;
}

/**
 * Displays a context-sensitive menu of actions triggered by user interaction.
 *
 * @example
 * ```tsx
 * import { IressContextualMenu } from '@iress-oss/ids-components';
 *
 * <IressContextualMenu
 *   items={[{ key: 'copy', label: 'Copy' }, { key: 'paste', label: 'Paste' }]}
 * />
 * ```
 */
export const IressContextualMenu = ({
  ariaLabel = 'More options',
  align = 'bottom-end',
  bordered = false,
  children,
  className,
  container,
  'data-testid': dataTestId,
  items,
  offset = { mainAxis: -6, crossAxis: 0 },
  onAction,
  size = 'small',
  textStyle,
  theme = 'light',
  ...restProps
}: IressContextualMenuProps) => {
  const [styleProps, nonStyleProps] = useMemo(
    () => splitCssProps(restProps),
    [restProps],
  );

  const classes = contextualMenu({ bordered, size, theme });

  return (
    <styled.div
      className={cx(
        css(styleProps),
        className,
        classes.root,
        GlobalCSSClass.ContextualMenu,
      )}
      data-size={size}
      data-theme={theme}
      data-testid={dataTestId}
    >
      <IressPopover
        {...nonStyleProps}
        align={align}
        container={container}
        activator={
          <IressButton
            aria-label={ariaLabel}
            className={classes.trigger}
            data-testid={propagateTestid(dataTestId, 'activator')}
            mode="quaternary"
            icon="more_vert"
          />
        }
        contentStyle={{ className: classes.menu, p: 'none' }}
        data-testid={propagateTestid(dataTestId, 'popover')}
        offset={offset}
        type="menu"
      >
        {!!items?.length && (
          <IressMenu data-testid={propagateTestid(dataTestId, 'menu')}>
            {/* Destructure `icon` to avoid passing it as we handle it differently in contextual menu */}
            {items.map(({ icon, ...item }) => (
              <IressMenuItem
                textStyle={textStyle ?? 'typography.body.sm'}
                {...item}
                className={cx(classes.item, item.className)}
                key={item.key}
                onClick={(e) => {
                  onAction?.({ icon, ...item });
                  item.onClick?.(e);
                }}
                prepend={icon ? <IressIcon name={icon} /> : item.prepend}
              >
                {item.label}
              </IressMenuItem>
            ))}
          </IressMenu>
        )}
        {children}
      </IressPopover>
    </styled.div>
  );
};

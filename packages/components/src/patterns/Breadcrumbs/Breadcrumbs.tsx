import type { ElementType, ReactNode } from 'react';
import { cx } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { breadcrumbs } from './Breadcrumbs.styles';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressLink, type IressLinkProps } from '@/components/Link';
import type { IressStyledProps } from '@/types';
import { IressText } from '@/components/Text';
import { IressPopover, type IressPopoverProps } from '@/components/Popover';
import { IressMenu, IressMenuItem } from '@/components/Menu';

export type BreadcrumbItem<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> = Omit<IressLinkProps<C, THref>, 'children' | 'value'> & {
  /**
   * The page or level name to display for this breadcrumb item.
   */
  label: ReactNode;
};

export interface IressBreadcrumbsProps<
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
> extends IressStyledProps<'nav'> {
  /**
   * Array of breadcrumb items defining the navigation path, in hierarchical order.
   * The last item is automatically treated as the current page.
   */
  items: BreadcrumbItem<C, THref>[];

  /**
   * Maximum number of items to show before collapsing with overflow.
   * Set to 0 to show all items without overflow.
   * @default 5
   */
  limit?: number;

  /**
   * Additional props to pass to the overflow popover, such as `aria-label` for accessibility.
   * This is only applicable when `limit` is set to a value less than the number of items.
   */
  overflowProps?: Omit<IressPopoverProps, 'activator'>;
}

const Breadcrumb = ({
  className,
  'data-testid': dataTestId,
  isCurrent = false,
  label,
  ...restProps
}: BreadcrumbItem & { isCurrent: boolean }) => {
  if (isCurrent) {
    return (
      <IressText
        className={className}
        data-testid={dataTestId}
        aria-current="page"
      >
        {label}
      </IressText>
    );
  }

  return (
    <IressLink {...restProps} className={className}>
      {label}
    </IressLink>
  );
};
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbOverflow = ({
  'aria-label': ariaLabel = 'More pages',
  className,
  'data-testid': dataTestId,
  items = [],
  overflowClassName,
  ...restProps
}: Omit<IressPopoverProps, 'activator'> & {
  items: BreadcrumbItem[];
  overflowClassName?: string;
}) => (
  <IressPopover
    align="bottom"
    contentStyle={{ p: 'none' }}
    {...restProps}
    activator={
      <IressLink aria-label={ariaLabel} className={className}>
        ...
      </IressLink>
    }
    data-testid={dataTestId}
  >
    <IressMenu data-testid={propagateTestid(dataTestId, 'menu')}>
      {items.map(({ key, label, ...item }, index) => (
        <IressMenuItem
          key={key ?? index}
          {...item}
          className={cx(item.className, overflowClassName)}
        >
          {label}
        </IressMenuItem>
      ))}
    </IressMenu>
  </IressPopover>
);
BreadcrumbOverflow.displayName = 'BreadcrumbOverflow';

/**
 * Breadcrumbs provides secondary navigation, helping users understand
 * their current location within the site hierarchy and navigate back to parent levels.
 *
 * @example
 * ```tsx
 * import { IressBreadcrumbs } from '@iress-oss/ids-components';
 *
 * <IressBreadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Product Details' }, // Current page
 *   ]}
 * />
 * ```
 */
export const IressBreadcrumbs = <
  C extends ElementType | undefined = undefined,
  THref extends string | undefined = undefined,
>({
  children,
  className,
  'data-testid': dataTestId,
  items,
  limit = 5,
  overflowProps,
  ...restProps
}: IressBreadcrumbsProps<C, THref>) => {
  const limitMinusOne = limit - 1;
  const classes = breadcrumbs();
  const firstItem = items[0];
  const lastItems = items
    .slice(-(limitMinusOne - 1))
    .filter((item) => item !== firstItem);
  const hiddenItems = limit === 0 ? [] : items.slice(1, -(limitMinusOne - 1));

  return (
    <styled.nav
      className={cx(className, classes.root, GlobalCSSClass.Breadcrumbs)}
      data-testid={dataTestId}
      {...restProps}
    >
      {children}
      <ol className={classes.list}>
        {firstItem && (
          <li
            className={classes.item}
            data-testid={propagateTestid(dataTestId, 'item-0')}
          >
            <Breadcrumb
              isCurrent={items.length === 1}
              {...firstItem}
              className={items.length === 1 ? classes.current : classes.link}
            />
          </li>
        )}
        {hiddenItems.length > 0 && (
          <li
            className={classes.item}
            data-testid={propagateTestid(dataTestId, 'item-overflow')}
          >
            <BreadcrumbOverflow
              {...overflowProps}
              className={cx(classes.link, overflowProps?.className)}
              data-testid={propagateTestid(dataTestId, 'overflow')}
              items={hiddenItems}
              overflowClassName={classes.overflowItem}
            />
          </li>
        )}
        {lastItems.map(({ key, ...item }, index) => (
          <li
            className={classes.item}
            data-testid={propagateTestid(dataTestId, `item-${index + 1}`)}
            key={key ?? index}
          >
            <Breadcrumb
              isCurrent={index === lastItems.length - 1}
              {...item}
              className={
                index === lastItems.length - 1 ? classes.current : classes.link
              }
            />
          </li>
        ))}
      </ol>
    </styled.nav>
  );
};

IressBreadcrumbs.displayName = 'IressBreadcrumb';

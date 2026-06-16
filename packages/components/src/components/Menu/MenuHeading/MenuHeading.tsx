import type { TextElements } from '@/components/Text';
import { IressMenuText, type IressMenuTextProps } from '../MenuText/MenuText';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export type { IressMenuTextProps as IressMenuHeadingProps } from '../MenuText/MenuText';

/**
 * A heading element within a menu, used to label groups of menu items.
 *
 * @example
 * ```tsx
 * import { IressMenu, IressMenuHeading, IressMenuItem } from '@iress-oss/ids-components';
 *
 * <IressMenu>
 *   <IressMenuHeading>Actions</IressMenuHeading>
 *   <IressMenuItem>Edit</IressMenuItem>
 * </IressMenu>
 * ```
 */
export const IressMenuHeading = <E extends TextElements = 'h2'>({
  className,
  element = 'h2' as E,
  textStyle = 'typography.body.md.medium',
  ...restProps
}: IressMenuTextProps<E>) => (
  <IressMenuText
    element={element}
    textStyle={textStyle}
    {...(restProps as IressMenuTextProps<E>)}
    className={cx(className, GlobalCSSClass.MenuHeading)}
  />
);

IressMenuHeading.displayName = 'IressMenuHeading';

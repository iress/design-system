import { useMenuItemRole } from '../MenuItem/hooks/useMenuItemRole';
import { type ReactNode, useContext } from 'react';
import { MenuContext } from '../Menu';
import {
  IressText,
  type IressTextProps,
  type TextElements,
} from '@/components/Text';
import { menuItem } from '../MenuItem/MenuItem.styles';
import { css, cx } from '@/styled-system/css';
import { IressMenuDivider } from '../MenuDivider/MenuDivider';
import { GlobalCSSClass } from '@/enums';
import { splitCssProps } from '@/styled-system/jsx';

export type IressMenuTextProps<E extends TextElements = 'div'> =
  IressTextProps<E> & {
    /**
     * Section after menu item content.
     */
    append?: ReactNode;

    /**
     * Adds a divider after any content.
     * If you would like to add content before the menu item, use a `<hr />` instead.
     */
    divider?: boolean;

    /**
     * 	Section before menu item content.
     */
    prepend?: ReactNode;
  };

const isHeading = <E extends TextElements = 'div'>(
  element?: E,
  textStyle?: IressTextProps['textStyle'],
) => {
  return (
    (element && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(element)) ??
    (textStyle &&
      [
        'typography.heading.1',
        'typography.heading.2',
        'typography.heading.3',
        'typography.heading.4',
        'typography.heading.5',
      ].includes(textStyle))
  );
};

export const IressMenuText = <E extends TextElements = 'div'>({
  append,
  children,
  className,
  'data-testid': dataTestid,
  divider,
  element,
  prepend,
  role,
  textStyle,
  width = '12/12',
  ...restProps
}: IressMenuTextProps<E>) => {
  const menu = useContext(MenuContext);
  const menuItemRole = useMenuItemRole() ?? role;
  const classes = menuItem.raw({
    layout: menu?.layout,
    isHeading: isHeading<E>(element, textStyle),
    hasAppendOrPrepend: !!(append ?? prepend),
  });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <>
      <div
        className={cx(
          className,
          css(classes.root, styleProps, { width }),
          GlobalCSSClass.MenuText,
        )}
        data-testid={dataTestid}
        role={menuItemRole}
      >
        {prepend && <div>{prepend}</div>}
        <IressText<E>
          {...(nonStyleProps as IressTextProps<E>)}
          className={css(classes.contents)}
          element={element}
          textStyle={textStyle}
          width={width}
        >
          {children}
        </IressText>
        {append && <div className={css(classes.append)}>{append}</div>}
      </div>
      {divider && <IressMenuDivider mt="spacing.1" />}
    </>
  );
};

IressMenuText.displayName = 'IressMenuText';

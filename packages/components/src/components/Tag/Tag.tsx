import {
  useMemo,
  useRef,
  type FocusEvent,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCloseButton } from '../Button';
import { tag } from './Tag.styles';
import { css, cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { splitCssProps, styled } from '@/styled-system/jsx';
import type { IressStyledProps } from '@/types';

type TagElement<
  TOnClick extends
    | ((e: SyntheticEvent<HTMLButtonElement>) => void)
    | undefined = undefined,
> = TOnClick extends (e: SyntheticEvent<HTMLButtonElement>) => void
  ? 'button'
  : 'span';

export type IressTagProps<
  TOnClick extends (e: SyntheticEvent<HTMLButtonElement>) => void | undefined,
> = IressStyledProps<TagElement<TOnClick>> & {
  /**
   * Contents of the tag.
   */
  children?: ReactNode;

  /**
   * You can completely replace the delete button to provide your own functionality.
   * When this is provided, `deleteButtonText` will not be used and `onDelete` and `onDeleteButtonBlur` will not be called.
   */
  deleteButton?: ReactNode;

  /**
   * Screen reader text for delete button
   */
  deleteButtonText?: string;

  /**
   * Callback triggered when the tag is clicked.
   * If this prop is provided, the tag will render as a `<button>` element with hover styles to indicate it is clickable.
   */
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;

  /**
   * Callback triggered when the tag is deleted
   */
  onDelete?: (children: string, e: SyntheticEvent<HTMLButtonElement>) => void;

  /**
   * Callback triggered when the close button is blurred
   */
  onDeleteButtonBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
};

export const IressTag = <
  TOnClick extends (e: SyntheticEvent<HTMLButtonElement>) => void | undefined,
>({
  children,
  className,
  'data-testid': dataTestId,
  deleteButton,
  deleteButtonText = 'Delete',
  onClick,
  onDelete,
  onDeleteButtonBlur,
  ...restProps
}: IressTagProps<TOnClick>) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const classes = tag({
    customDeleteButton: !!deleteButton,
    clickable: !!onClick,
  });
  const styles = tag.raw({
    customDeleteButton: !!deleteButton,
    clickable: !!onClick,
  });
  const showDelete = Boolean(onDelete ?? deleteButton);

  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const StyledComponent = useMemo(() => {
    return onClick ? styled.button : styled.span;
  }, [onClick]);

  return (
    <StyledComponent
      className={cx(
        className,
        css(styles.root, styleProps),
        GlobalCSSClass.Tag,
      )}
      data-testid={dataTestId}
      {...nonStyleProps}
    >
      <span ref={contentRef} className={classes.content}>
        {children}
      </span>

      {showDelete && (
        <span className={classes.deleteButton}>
          {deleteButton ?? (
            <IressCloseButton
              data-testid={propagateTestid(dataTestId, 'delete-button__button')}
              onBlur={onDeleteButtonBlur}
              onClick={(e) =>
                onDelete?.(contentRef.current?.textContent ?? '', e)
              }
              screenreaderText={deleteButtonText}
            />
          )}
        </span>
      )}
    </StyledComponent>
  );
};

IressTag.displayName = 'IressTag';

import {
  type MouseEventHandler,
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

interface TagBaseProps {
  /**
   * Contents of the tag.
   */
  children?: ReactNode;

  /**
   * If true, reduces the padding and height of the tag. Useful when used inside an input component.
   */
  compact?: boolean;

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
   * Callback triggered when the tag is deleted
   */
  onDelete?: (children: string, e: SyntheticEvent<HTMLButtonElement>) => void;

  /**
   * Callback triggered when the close button is blurred
   */
  onDeleteButtonBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
}

/**
 * Props for IressTag when onClick is provided (renders as button)
 */
type ClickableTagProps = Omit<IressStyledProps<'button'>, 'onClick'> &
  TagBaseProps & {
    /**
     * Callback triggered when the tag is clicked.
     * If this prop is provided, the tag will render as a `<button>` element with hover styles to indicate it is clickable.
     */
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

/**
 * Props for IressTag when onClick is not provided (renders as span)
 */
type StaticTagProps = IressStyledProps<'span'> &
  TagBaseProps & {
    onClick?: never;
  };

export type IressTagProps = ClickableTagProps | StaticTagProps;

const Tag = ({
  children,
  className,
  compact,
  'data-testid': dataTestId,
  deleteButton,
  deleteButtonText = 'Delete',
  onClick,
  onDelete,
  onDeleteButtonBlur,
  ...restProps
}: IressTagProps) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const classes = tag({
    customDeleteButton: !!deleteButton,
    clickable: !!onClick,
    compact,
  });
  const styles = tag.raw({
    customDeleteButton: !!deleteButton,
    clickable: !!onClick,
    compact,
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
      {...(onClick ? { onClick, type: 'button' as const } : {})}
      {...(nonStyleProps as object)}
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

Tag.displayName = 'IressTag';

export const IressTag: {
  (props: StaticTagProps): React.JSX.Element;
  (props: ClickableTagProps): React.JSX.Element;
  displayName: string;
} = Tag;

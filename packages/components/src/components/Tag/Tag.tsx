import {
  useMemo,
  useRef,
  type FocusEvent,
  type ReactNode,
  type SyntheticEvent,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCloseButton } from '../Button';
import { tag } from './Tag.styles';
import { css, cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { splitCssProps } from '@/styled-system/jsx';
import type { IressCSSProps, IressTestProps } from '@/interfaces';

interface InternalTagProps<E extends ElementType = 'span'>
  extends IressCSSProps, IressTestProps {
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
   * Element type to render the Tag as.
   * @default 'span'
   */
  element?: E;

  /**
   * Style of the tag, based on the data colour palette (10-90) or system status colours (danger, info, success, warning).
   * Can be a number (10-90), a string ('10'-'90'), or a system status ('danger', 'info', 'success', 'warning').
   */
  mode?:
    | 10
    | 20
    | 30
    | 40
    | 50
    | 60
    | 70
    | 80
    | 90
    | '10'
    | '20'
    | '30'
    | '40'
    | '50'
    | '60'
    | '70'
    | '80'
    | '90'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning';

  /**
   * When true, renders the tag with a visible border instead of a filled background.
   */
  bordered?: boolean;

  /**
   * Callback triggered when the tag is deleted
   */
  onDelete?: (children: string, e: SyntheticEvent<HTMLButtonElement>) => void;

  /**
   * Callback triggered when the close button is blurred
   */
  onDeleteButtonBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
}

type ElementProps<E extends ElementType = 'span'> = Omit<
  ComponentPropsWithoutRef<E>,
  keyof InternalTagProps<E>
>;

export type IressTagProps<E extends ElementType = 'span'> = ElementProps<E> &
  InternalTagProps<E>;

export const IressTag = <E extends ElementType = 'span'>({
  bordered = false,
  children,
  className,
  compact,
  'data-testid': dataTestId,
  deleteButton,
  deleteButtonText = 'Delete',
  element,
  mode,
  onDelete,
  onDeleteButtonBlur,
  ...restProps
}: IressTagProps<E>) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const isInteractiveElement = element == 'button' || element == 'a';
  const clickable = isInteractiveElement || !!restProps.onClick;

  const classes = tag({
    bordered,
    customDeleteButton: !!deleteButton,
    clickable,
    compact,
    mode: mode as Extract<InternalTagProps['mode'], string>,
  });
  const styles = tag.raw({
    bordered,
    customDeleteButton: !!deleteButton,
    clickable,
    compact,
    mode: mode as Extract<InternalTagProps['mode'], string>,
  });
  const showDelete = Boolean(onDelete ?? deleteButton);

  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const StyledElement = useMemo(() => {
    if (element) return element;
    return clickable ? 'button' : 'span';
  }, [element, clickable]);

  return (
    <StyledElement
      className={cx(
        className,
        css(styles.root, styleProps),
        GlobalCSSClass.Tag,
      )}
      data-testid={dataTestId}
      {...(StyledElement === 'button' ? { type: 'button' as const } : {})}
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
    </StyledElement>
  );
};

IressTag.displayName = 'IressTag';

import { useRef, FocusEvent, ReactNode, SyntheticEvent } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCloseButton } from '../Button';
import { IressText, IressTextProps } from '../Text';
import { tag } from './Tag.styles';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

export interface IressTagProps extends Omit<IressTextProps<'span'>, 'element'> {
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
   * Callback triggered when the tag is deleted
   */
  onDelete?: (children: string, e: SyntheticEvent<HTMLButtonElement>) => void;

  /**
   * Callback triggered when the close button is blurred
   */
  onDeleteButtonBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
}

export const IressTag = ({
  children,
  className,
  'data-testid': dataTestId,
  deleteButton,
  deleteButtonText = 'Delete',
  onDelete,
  onDeleteButtonBlur,
  ...restProps
}: IressTagProps) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const styles = tag({ customDeleteButton: !!deleteButton });

  return (
    <IressText
      className={cx(className, styles.root, GlobalCSSClass.Tag)}
      data-testid={dataTestId}
      element="span"
      {...restProps}
    >
      <span ref={contentRef} className={styles.content}>
        {children}
      </span>

      <span className={styles.deleteButton}>
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
    </IressText>
  );
};

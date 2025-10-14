import { useRef } from 'react';
import classNames from 'classnames';
import { type IressTagProps } from './Tag.types';
import styles from './Tag.module.scss';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCloseButton } from '../Button';

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

  return (
    <div
      className={classNames(className, 'iress-u-text', styles.tag)}
      data-testid={dataTestId}
      {...restProps}
    >
      <span ref={contentRef} className={styles.content}>
        {children}
      </span>

      {deleteButton ?? (
        <IressCloseButton
          onClick={(e) => onDelete?.(contentRef.current?.textContent ?? '', e)}
          onBlur={onDeleteButtonBlur}
          screenreaderText={deleteButtonText}
          data-testid={propagateTestid(dataTestId, 'delete-button__button')}
        />
      )}
    </div>
  );
};

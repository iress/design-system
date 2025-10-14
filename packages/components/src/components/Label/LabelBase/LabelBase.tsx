import classNames from 'classnames';
import styles from '../Label.module.scss';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { type LabelBaseProps } from './LabelBase.types';
import { useState } from 'react';

export const LabelBase = ({
  append,
  as: BaseTag = 'label',
  children,
  className,
  'data-testid': dataTestId,
  hiddenLabel = false,
  optional,
  required,
  ...restProps
}: LabelBaseProps) => {
  const [name, setName] = useState<string | undefined>();

  // Update the name state when the text content of the label changes
  // This allows other components to access the label text without the noise of the required/optional text and appended content
  const updateName = (element: HTMLElement | null) => {
    const newName = element?.textContent;

    if (newName && newName !== name) {
      setName(newName);
    }
  };

  return (
    <BaseTag
      className={classNames(className, GlobalCSSClass.FormLabel, {
        [styles.label]: true,
        [styles.hidden]: hiddenLabel,
        [styles.hasAppend]: append,
      })}
      {...restProps}
      data-name={name}
      data-testid={dataTestId}
    >
      {required && (
        <>
          {!hiddenLabel && (
            <span className={classNames(styles.required)} aria-hidden="true">
              *
            </span>
          )}
          <span className={GlobalCSSClass.SROnly}>Required </span>
        </>
      )}
      <span
        className={
          classNames({
            [GlobalCSSClass.SROnly]: hiddenLabel === true,
          }) || undefined
        }
        data-testid={propagateTestid(dataTestId, 'text')}
        ref={updateName}
      >
        {children}
      </span>
      {!required && optional && (
        <span
          className={classNames(styles.optional, {
            [GlobalCSSClass.SROnly]: hiddenLabel === true,
          })}
        >
          {typeof optional === 'string' ? optional : '(optional)'}
        </span>
      )}
      {append}
    </BaseTag>
  );
};

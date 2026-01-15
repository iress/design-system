import classNames from 'classnames';
import styles from '../Label.module.scss';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { type LabelBaseProps } from './LabelBase.types';
import { type ReactNode, type SVGProps, useState } from 'react';

/**
 * Material Symbols Lock icon (filled, weight 300, rounded, grade 24, optical size 24dp)
 */
export const LockIcon = ({
  title,
  ...props
}: SVGProps<SVGSVGElement> & {
  title: ReactNode;
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    {...props}
  >
    <title>{title}</title>
    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
  </svg>
);

export const LabelBase = ({
  append,
  as: BaseTag = 'label',
  children,
  className,
  'data-testid': dataTestId,
  hiddenLabel = false,
  locked,
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
        [styles.locked]: locked,
        [styles.hasAppend]: append,
      })}
      {...restProps}
      data-name={name}
      data-testid={dataTestId}
    >
      {locked && (
        <LockIcon
          className={styles.lock}
          title="(Locked) "
          data-testid={propagateTestid(dataTestId, 'lock-icon')}
        />
      )}
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

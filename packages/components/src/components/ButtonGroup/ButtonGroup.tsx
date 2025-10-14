import classNames from 'classnames';
import { type IressButtonGroupProps } from './ButtonGroup.types';
import styles from './ButtonGroup.module.scss';
import { useIdIfNeeded } from '../../hooks';
import { IressButtonGroupProvider } from './ButtonGroupProvider';
import React, { useMemo } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { IressButton } from '../Button/Button';
import { GlobalCSSClass } from '@/enums';

export const IressButtonGroup = ({
  children,
  className,
  'data-testid': dataTestId,
  defaultSelected,
  hiddenLabel,
  label: labelProp,
  multiple,
  onChange,
  options,
  selected,
  ...restProps
}: IressButtonGroupProps) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const labelId = `${id}--label`;

  const label = useMemo(() => {
    if (typeof labelProp === 'string')
      return (
        <div
          id={labelId}
          className={classNames(styles.label, {
            [GlobalCSSClass.SROnly]: hiddenLabel,
          })}
          data-testid={propagateTestid(dataTestId, 'label')}
        >
          {labelProp}
        </div>
      );

    return React.cloneElement(labelProp, {
      id: labelId,
    });
  }, [dataTestId, hiddenLabel, labelId, labelProp]);

  return (
    <IressButtonGroupProvider
      defaultSelected={defaultSelected}
      multiple={multiple}
      onChange={onChange}
      selected={selected}
    >
      <div
        className={classNames(className, styles.buttonGroup)}
        id={id}
        data-testid={dataTestId}
        {...restProps}
      >
        {label}
        <div role="group" aria-labelledby={labelId} className={styles.values}>
          {children}
          {toArray<string>(options).map((option) => (
            <IressButton
              key={option}
              data-testid={propagateTestid(dataTestId, 'button__button')}
            >
              {option}
            </IressButton>
          ))}
        </div>
      </div>
    </IressButtonGroupProvider>
  );
};

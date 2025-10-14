import classNames from 'classnames';
import { type IressRadioProps } from './Radio.types';
import styles from './Radio.module.scss';
import { forwardRef, useContext } from 'react';
import { useIdIfNeeded } from '../../hooks';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { RadioGroupContext } from '../RadioGroup/RadioGroupContext';
import { IressReadonly } from '../Readonly';
import { getFormControlValueAsString } from '@helpers/form/getFormControlValueAsString';

const RadioMark = () => (
  <svg
    version="1.1"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.mark}
  >
    <circle cx="100" cy="100" r="70" />
  </svg>
);

const Radio = (
  {
    checked: controlledChecked,
    children,
    className,
    'data-testid': dataTestId,
    defaultChecked: uncontrolledChecked,
    hiddenControl,
    name,
    onChange,
    readOnly: readOnlyProp,
    required,
    value,
    touch,
    ...restProps
  }: IressRadioProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const id = useIdIfNeeded(restProps);
  const radioGroup = useContext(RadioGroupContext);

  const hasRadioGroup = !!radioGroup.onChange;
  const checked = controlledChecked ?? uncontrolledChecked;
  const isChecked = hasRadioGroup ? radioGroup.value === value : checked;
  const readOnly = hasRadioGroup ? radioGroup.readonly : readOnlyProp;

  if (readOnly) {
    return isChecked ? (
      <IressReadonly
        {...restProps}
        width={undefined}
        value={getFormControlValueAsString(value)}
      >
        {children}
      </IressReadonly>
    ) : null;
  }

  const radioName = radioGroup.name ?? name;
  const isHidden = radioGroup.hiddenRadio ?? hiddenControl;
  const isRequired = radioGroup.required ?? required;
  const isTouch = radioGroup.touch ?? touch;

  return (
    <div
      data-testid={dataTestId}
      className={classNames(className, {
        [styles.radio]: true,
        [styles.hiddenControl]: isHidden,
        [styles.touch]: isTouch,
      })}
    >
      <input
        {...restProps}
        type="radio"
        id={id}
        name={radioName}
        ref={ref}
        className={styles.input}
        data-testid={propagateTestid(dataTestId, 'input')}
        onChange={(e) => {
          onChange?.(e, value);
          radioGroup.onChange?.(e, value);
        }}
        value={String(value)}
        checked={isChecked}
        required={isRequired}
      />
      <label htmlFor={id} className={styles.label}>
        {!isHidden && (
          <RadioMark data-testid={propagateTestid(dataTestId, 'mark')} />
        )}
        {children}
      </label>
    </div>
  );
};

export const IressRadio = forwardRef(Radio);

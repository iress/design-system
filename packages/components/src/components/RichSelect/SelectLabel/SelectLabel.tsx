import classNames from 'classnames';
import { type IressSelectLabelProps } from './SelectLabel.types';
import { useMemo } from 'react';
import { toArray } from '@helpers/formatting/toArray';
import { composeLabelValueDescriptor } from '@helpers/label-value/composeLabelValueDescriptor';
import styles from './SelectLabel.module.scss';
import { IressIcon } from '@/components/Icon';
import { IressText } from '@/components/Text';
import { ButtonCssClass } from '@/components/Button';
import { GlobalCSSClass } from '@/enums';

export const IressSelectLabel = ({
  append = <IressIcon name="chevron-down" size="xs" />,
  className,
  placeholder,
  prepend,
  selected,
  selectedOptionsText = '{{numOptions}} selected',
  ...restProps
}: IressSelectLabelProps) => {
  const selectedArray = toArray(selected);

  const label = useMemo(() => {
    if (!selectedArray.length) return placeholder;
    if (selectedArray.length === 1) return selectedArray[0].label;
    return composeLabelValueDescriptor(selectedArray, selectedOptionsText);
  }, [placeholder, selectedArray, selectedOptionsText]);

  return (
    <button
      {...restProps}
      type="button"
      className={classNames(
        className,
        styles.selectLabel,
        ButtonCssClass.Base,
        GlobalCSSClass.FormElementInner,
      )}
    >
      {prepend && (
        <span className={classNames(ButtonCssClass.Prepend, styles.prepend)}>
          {prepend}
        </span>
      )}
      <IressText
        className={classNames(styles.contents, {
          [styles.placeholder]: !selectedArray.length,
        })}
      >
        {label}
      </IressText>
      {append && <span className={styles.append}>{append}</span>}
    </button>
  );
};

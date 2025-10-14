import { useMemo } from 'react';
import { toArray } from '@helpers/formatting/toArray';
import { composeLabelValueDescriptor } from '@helpers/label-value/composeLabelValueDescriptor';
import { selectLabel } from './SelectLabel.styles';
import { IressText } from '@/components/Text';
import { GlobalCSSClass } from '@/enums';
import { type IressHTMLAttributes } from '@/interfaces';
import { type IressSelectActivatorProps } from '../components/SelectActivator';
import { cx } from '@/styled-system/css';

export type IressSelectLabelProps = Omit<
  IressHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  IressSelectActivatorProps;

export const IressSelectLabel = ({
  append,
  className,
  placeholder,
  prepend,
  selected,
  selectedOptionsText = '{{numOptions}} selected',
  ...restProps
}: IressSelectLabelProps) => {
  const selectedArray = toArray(selected);
  const shouldShowDefaultChevron = !append;
  const classes = selectLabel({ showDefaultChevron: shouldShowDefaultChevron });

  const label = useMemo(() => {
    if (!selectedArray.length) return placeholder;
    if (selectedArray.length === 1) return selectedArray[0].label;
    return composeLabelValueDescriptor(selectedArray, selectedOptionsText);
  }, [placeholder, selectedArray, selectedOptionsText]);

  return (
    <button
      {...restProps}
      type="button"
      className={cx(
        className,
        classes.selectLabel,
        GlobalCSSClass.FormElementInner,
        GlobalCSSClass.RichSelectLabel,
      )}
    >
      {prepend && <span className={classes.prepend}>{prepend}</span>}
      <IressText
        className={cx(
          classes.contents,
          !selectedArray.length && classes.placeholder,
        )}
        element="span"
      >
        {label}
      </IressText>
      <span className={classes.append}>{append}</span>
    </button>
  );
};

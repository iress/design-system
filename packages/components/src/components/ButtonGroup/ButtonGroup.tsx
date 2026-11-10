import { type ControlledValue, useIdIfNeeded } from '../../hooks';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { buttonGroup } from './ButtonGroup.styles';
import { cx, css } from '@/styled-system/css';
import { type FormControlValue, type IressStyledProps } from '@/types';
import { type ReactNode } from 'react';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { ButtonGroupProvider } from './ButtonGroupProvider';
import { GlobalCSSClass } from '@/enums';

export interface IressButtonGroupProps<
  T = FormControlValue,
  TMultiple extends boolean = false,
> extends Omit<IressStyledProps, 'onChange'> {
  /**
   * Content of the button group, usually multiple `IressButton`.
   */
  children?: ReactNode;

  /**
   * Initially selected value, use for uncontrolled components.
   */
  defaultSelected?: ControlledValue<T, TMultiple>;

  /**
   * Hides the label if set; label will still be read out by screen readers.
   */
  hiddenLabel?: boolean;

  /**
   * Sets the label text for the button group.
   * If passed an element, it will render the element with an id, to ensure its connection to the button group.
   */
  label: ReactNode;

  /**
   * Allows multiple buttons to be selected.
   */
  multiple?: TMultiple;

  /**
   * Called when a user activates one of its children buttons.
   */
  onChange?: (newValue?: ControlledValue<T, TMultiple>) => void;

  /**
   * Selected value, use for controlled components.
   */
  selected?: ControlledValue<T, TMultiple>;
}

/**
 * Groups related buttons together with consistent spacing and alignment.
 *
 * @example
 * ```tsx
 * import { IressButtonGroup, IressButton } from '@iress-oss/ids-components';
 *
 * <IressButtonGroup>
 *   <IressButton>One</IressButton>
 *   <IressButton>Two</IressButton>
 * </IressButtonGroup>
 * ```
 */
export const IressButtonGroup = <
  T = FormControlValue,
  TMultiple extends boolean = false,
>({
  children,
  className,
  'data-testid': dataTestId,
  defaultSelected,
  hiddenLabel,
  label,
  multiple,
  onChange,
  selected,
  ...restProps
}: IressButtonGroupProps<T, TMultiple>) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const labelId = `${id}--label`;
  const classes = buttonGroup({ hiddenLabel });
  const styles = buttonGroup.raw({ hiddenLabel });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <ButtonGroupProvider
      defaultSelected={defaultSelected}
      multiple={multiple}
      onChange={onChange}
      selected={selected}
    >
      <styled.div
        className={cx(className, classes.root, GlobalCSSClass.ButtonGroup)}
        id={id}
        data-testid={dataTestId}
        {...nonStyleProps}
      >
        <div
          className={classes.label}
          data-testid={propagateTestid(dataTestId, 'label')}
          id={labelId}
        >
          {label}
        </div>
        <div
          role="group"
          aria-labelledby={labelId}
          className={css(styles.values, styleProps)}
        >
          {children}
        </div>
      </styled.div>
    </ButtonGroupProvider>
  );
};

IressButtonGroup.displayName = 'IressButtonGroup';

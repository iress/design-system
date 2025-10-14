import { cx } from '@/styled-system/css';
import { slider } from './Slider.styles';
import {
  forwardRef,
  useCallback,
  type ReactNode,
  type ChangeEvent,
  type CSSProperties,
  type Ref,
} from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  type SliderTickLabel,
  type SliderTickLabelValue,
  SliderTicks,
} from './components/SliderTicks';
import { useIdIfNeeded } from '../../hooks';
import { useControlledState } from '@/hooks/useControlledState';
import { IressReadonly } from '../Readonly';
import { type IressStyledProps, type IressUnstyledProps } from '@/types';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';

export interface IressSliderProps
  extends Omit<IressStyledProps<'input'>, 'children' | 'onInput' | 'onChange'> {
  /**
   * Initial value of the slider. Used for uncontrolled sliders.
   */
  defaultValue?: number;

  /**
   * Format the changed value.
   */
  formatValue?: (
    value: number,
    tick?: SliderTickLabelValue,
    readOnly?: boolean,
  ) => ReactNode;

  /**
   * If `true`, the value tooltip will be hidden.
   */
  hiddenValueTooltip?: boolean;

  /**
   * Set the maximum value for the slider.
   * @default 10
   */
  max?: number;

  /**
   * Sets minimum value for the slider.
   * @default 0
   */
  min?: number;

  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;

  /**
   * Emitted when the slider value changes.
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>, value?: number) => void;

  /**
   * If `true`, the user cannot modify the value.
   */
  readOnly?: boolean;

  /**
   * Sets the step value of the slider.
   * @default 1
   */
  step?: number;

  /**
   * List of labels to be displayed.
   */
  tickLabels?: SliderTickLabel[] | boolean;

  /**
   * Value of the slider. Used for controlled sliders.
   */
  value?: number;
}

export interface SliderReadonlyProps
  extends Omit<IressUnstyledProps<'input'>, 'value'> {
  /**
   * The label of the value.
   */
  label?: ReactNode;

  /**
   * The name of the control, which is submitted with the form data.
   */
  name?: string;

  /**
   * The current value of the slider.
   */
  value?: number;
}

export interface SliderCustomCSSProperties extends CSSProperties {
  '--iress-thumb-value-offset'?: string;
  '--iress-tick-label-width'?: string;
}

const createTicksFromMinMaxAndStep = (min = 0, max = 10, step = 1) => {
  const ticks = [];
  for (let current = min; current <= max; current += step) ticks.push(current);
  return ticks;
};

const Slider = (
  {
    'data-testid': dataTestId,
    defaultValue,
    className,
    formatValue,
    hiddenValueTooltip,
    max = 10,
    min = 0,
    onChange,
    readOnly,
    step = 1,
    style,
    tickLabels: tickLabelsProp,
    value: valueProp,
    ...restProps
  }: IressSliderProps,
  ref: Ref<HTMLInputElement>,
) => {
  useNoDefaultValueInForms({
    component: 'IressSelect',
    defaultValue,
  });

  const id = useIdIfNeeded({ id: restProps?.id });

  const ticks =
    typeof tickLabelsProp === 'boolean'
      ? createTicksFromMinMaxAndStep(min, max, step)
      : (tickLabelsProp ?? []);
  const ticksWithLabels = ticks.map((tick) =>
    typeof tick === 'number' ? { value: tick } : tick,
  );

  const { value, setValue } = useControlledState<number>({
    component: 'IressSlider',
    defaultValue: valueProp ? undefined : (defaultValue ?? min),
    value: valueProp,
  });

  const getValueLabel = useCallback(() => {
    const valueTick = ticksWithLabels?.find((tick) => tick.value === value);
    return formatValue
      ? formatValue(value ?? 0, valueTick, readOnly)
      : (valueTick?.label ?? value);
  }, [ticksWithLabels, formatValue, value, readOnly]);

  const getThumbValueOffset = useCallback(() => {
    const offset = Math.min(
      Number((((value ?? 0) - min) * 100) / (max - min)),
      100,
    );
    // Magic numbers! https://css-tricks.com/value-bubbles-for-range-inputs/
    return `calc(${offset}% + ((1.75rem / 2) - ${offset * 0.285}px))`;
  }, [max, min, value]);

  if (readOnly) {
    return (
      <IressReadonly
        data-testid={propagateTestid(dataTestId, 'slider')}
        name={restProps?.name}
        value={value}
      >
        {getValueLabel()}
      </IressReadonly>
    );
  }

  const classes = slider();
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const styles: SliderCustomCSSProperties = {
    ...style,
    '--iress-thumb-value-offset': getThumbValueOffset(),
  };

  return (
    <styled.div
      {...styleProps}
      className={cx(className, classes.root, GlobalCSSClass.Slider)}
      style={styles}
      data-testid={dataTestId}
    >
      {!hiddenValueTooltip && (
        <output className={classes.thumbValue}>{getValueLabel()}</output>
      )}
      <input
        className={classes.control}
        max={max}
        min={min}
        step={step}
        {...nonStyleProps}
        value={value}
        type="range"
        onChange={(e) => {
          onChange?.(e, Number(e.target.value));
          setValue(Number(e.target.value));
        }}
        ref={ref}
        list={`${id}--markers`}
        data-testid={propagateTestid(dataTestId, 'slider')}
      />
      <SliderTicks
        tickLabels={ticksWithLabels}
        id={`${id}--markers`}
        max={max}
        min={min}
        data-testid={propagateTestid(dataTestId, 'datalist')}
      />
    </styled.div>
  );
};

export const IressSlider = forwardRef(Slider);

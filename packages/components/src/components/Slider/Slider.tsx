import classNames from 'classnames';
import {
  type IressSliderProps,
  type SliderCustomCSSProperties,
} from './Slider.types';
import styles from './Slider.module.scss';
import { forwardRef, useCallback } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { SliderTicks } from './components/SliderTicks';
import { useIdIfNeeded } from '../../hooks';
import { useControlledState } from '@/hooks/useControlledState';
import { IressReadonly } from '../Readonly';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';

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
    readonly,
    step = 1,
    tickLabels: tickLabelsProp,
    value: valueProp,
    ...restProps
  }: IressSliderProps,
  ref: React.Ref<HTMLInputElement>,
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
      ? formatValue(value ?? 0, valueTick, readonly)
      : (valueTick?.label ?? value);
  }, [ticksWithLabels, formatValue, value, readonly]);

  const getThumbValueOffset = useCallback(() => {
    const offset = Number((((value ?? 0) - min) * 100) / (max - min));
    // Magic numbers! https://css-tricks.com/value-bubbles-for-range-inputs/
    return `calc(${offset}% + ((var(--iress-thumb-width) / 2) - ${
      offset * 0.285
    }px))`;
  }, [max, min, value]);

  if (readonly) {
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

  return (
    <div
      className={classNames(className, styles.slider)}
      style={
        {
          '--iress-thumb-value-offset': getThumbValueOffset(),
        } as SliderCustomCSSProperties
      }
      data-testid={dataTestId}
    >
      {!hiddenValueTooltip && (
        <output className={styles.thumbValue}>{getValueLabel()}</output>
      )}
      <input
        className={styles.control}
        max={max}
        min={min}
        step={step}
        {...restProps}
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
    </div>
  );
};

export const IressSlider = forwardRef(Slider);
IressSlider.displayName = 'IressSlider';

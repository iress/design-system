import { SliderCustomCSSProperties } from '../Slider';
import { slider } from '../Slider.styles';
import { cx } from '@/styled-system/css';
import { ReactNode } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressStyledProps, IressUnstyledProps } from '@/types';
import { IressTestProps } from '@/interfaces';
import { styled } from '@/styled-system/jsx';

export interface SliderTicksProps extends IressUnstyledProps<'datalist'> {
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
   * List of labels to be displayed.
   */
  tickLabels?: SliderTickLabelValue[];
}

export interface SliderTickMarkProps extends IressTestProps {
  /**
   * List of all tick labels for the slider.
   * Used to calculate the relative width of each tick mark.
   */
  allTickLabels: SliderTickLabelValue[];

  /**
   * The index of the tick label in the list.
   */
  index: number;

  /**
   * The maximum value of the slider.
   */
  max: number;

  /**
   * The minimum value of the slider.
   */
  min: number;

  /**
   * The tick label to be displayed.
   */
  tickLabel: SliderTickLabelValue;
}

export interface SliderTickLabelValue
  extends Omit<IressStyledProps, 'children'> {
  /**
   * The label of the tick mark. If not provided, the value will be displayed.
   */
  label?: ReactNode;

  /**
   * The value of the tick mark. Will be used as the value of the form control.
   */
  value: number;
}

/**
 * Represents a tick label for the slider.
 * It can either be a number or an object containing a value, optional label as well as optional styling.
 */
export type SliderTickLabel = number | SliderTickLabelValue;

const getRelativeWidthOfTick = (
  value: number,
  index: number,
  tickLabels: SliderTickLabelValue[],
  max: number,
  min: number,
) => {
  const slice =
    index === 0 ? value - min : value - (tickLabels[index - 1]?.value ?? 0);
  const relativeSlice = Number((slice / (max - min)) * 100);
  return `${relativeSlice}%`;
};

const TickMark = ({
  allTickLabels,
  'data-testid': dataTestId,
  index,
  max,
  min,
  tickLabel,
}: SliderTickMarkProps) => {
  const classes = slider();
  const { className, label, value, ...tickLabelProps } = tickLabel;

  const tickWidth = getRelativeWidthOfTick(
    value,
    index,
    allTickLabels,
    max,
    min,
  );

  const styles: SliderCustomCSSProperties = {
    '--iress-tick-label-width': tickWidth,
  };

  return (
    <div key={value} className={cx(classes.tickMark)} style={styles}>
      <option value={value} data-testid={dataTestId} />
      <styled.div
        {...tickLabelProps}
        className={cx(classes.tickMarkLabel, className)}
      >
        {label ?? `${value}`}
      </styled.div>
    </div>
  );
};

export const SliderTicks = ({
  max = 10,
  min = 0,
  tickLabels = [],
  ...restProps
}: SliderTicksProps) => {
  const classes = slider();

  return (
    <datalist className={classes.tickMarkList} {...restProps}>
      {tickLabels.map((tickLabel, index) => (
        <TickMark
          key={tickLabel.value}
          allTickLabels={tickLabels}
          data-testid={propagateTestid(restProps['data-testid'], 'option')}
          index={index}
          max={max}
          min={min}
          tickLabel={tickLabel}
        />
      ))}
    </datalist>
  );
};

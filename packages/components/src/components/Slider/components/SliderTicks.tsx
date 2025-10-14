import {
  type SliderCustomCSSProperties,
  type SliderTickLabelValue,
  type SliderTickLabelValueWithClassName,
  type SliderTicksProps,
} from '../Slider.types';
import styles from '../Slider.module.scss';
import classNames from 'classnames';
import { useMemo } from 'react';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { BREAKPOINTS } from '@/constants';

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

const addHideClassesForTick = (
  tickLabel: SliderTickLabelValue,
): SliderTickLabelValueWithClassName => {
  return BREAKPOINTS.reduce(
    (tickWithClasses, breakpoint, index) => ({
      ...tickWithClasses,
      className: {
        ...tickWithClasses.className,
        [`${GlobalCSSClass.SROnly}--${breakpoint}`]: !!(
          tickWithClasses.hiddenOn?.[breakpoint] ??
          tickWithClasses.className?.[
            `${GlobalCSSClass.SROnly}--${BREAKPOINTS[index - 1]}`
          ]
        ),
      },
    }),
    { ...tickLabel, className: {} as Record<string, boolean> },
  );
};

export const SliderTicks = ({
  max = 10,
  min = 0,
  tickLabels = [],
  ...restProps
}: SliderTicksProps) => {
  const tickLabelsWithClasses: SliderTickLabelValueWithClassName[] = useMemo(
    () =>
      tickLabels.map((tickLabel) => {
        if (!tickLabel.hiddenOn) return tickLabel;
        return addHideClassesForTick(tickLabel);
      }),
    [tickLabels],
  );

  return (
    <datalist className={styles.tickMarkList} {...restProps}>
      {tickLabelsWithClasses.map((tickLabel, index) => (
        <div
          key={tickLabel.value}
          className={classNames(styles.tickMark, {
            [styles.isMax]: max === tickLabel.value,
          })}
          style={
            {
              '--iress-tick-label-width': getRelativeWidthOfTick(
                tickLabel.value,
                index,
                tickLabels,
                max,
                min,
              ),
            } as SliderCustomCSSProperties
          }
        >
          <option
            value={tickLabel.value}
            data-testid={propagateTestid(restProps['data-testid'], 'option')}
          />
          <div
            className={classNames(styles.tickMarkLabel, tickLabel.className)}
          >
            {tickLabel.label ?? `${tickLabel.value}`}
          </div>
        </div>
      ))}
    </datalist>
  );
};

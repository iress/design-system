import { useEffect, useState } from 'react';
import { type IressProgressProps } from './Progress.types';
import styles from './Progress.module.scss';

import { propagateTestid } from '@helpers/utility/propagateTestid';
import { stringReplacer } from '@helpers/formatting/stringReplacer';
import classNames from 'classnames';

const Progress = ({
  className,
  max = 100,
  min = 0,
  sectionTitle = 'Progress is {{current}} of {{max}}',
  value = 0,
  'data-testid': dataTestId,
  ...restProps
}: IressProgressProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(value);

  const percentage = Math.round(((value - min) / (max - min)) * 100).toString();
  const width = `${percentage}%`;

  const normalisedSectionTitle = (): string =>
    stringReplacer(sectionTitle, [
      { name: '{{current}}', value: uncontrolledValue.toString() },
      { name: '{{max}}', value: max.toString() },
    ]);

  useEffect(() => {
    const clampedMin = Math.max(value, min);
    const clampedMax = Math.min(clampedMin, max);

    setUncontrolledValue(clampedMax);
  }, [value, min, max]);

  // TODO: Consider replacing this with native progress bar: <progress />
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
  return (
    <div
      {...restProps}
      data-testid={dataTestId}
      className={classNames(className, styles.progress)}
    >
      <div
        aria-valuetext={normalisedSectionTitle()}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={uncontrolledValue}
        aria-label={normalisedSectionTitle()}
        className={styles.indicator}
        role="progressbar"
        data-testid={propagateTestid(dataTestId, 'progressbar')}
        style={{
          width: width,
        }}
      />
    </div>
  );
};

export const IressProgress = Progress;

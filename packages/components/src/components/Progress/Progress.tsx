import { CSSProperties, useEffect, useState } from 'react';
import { stringReplacer } from '@helpers/formatting/stringReplacer';
import { css, cx } from '@/styled-system/css';
import { progress } from './Progress.styles';
import { IressStyledProps } from '@/types';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { token } from '@/styled-system/tokens';
import { UtilityValues } from '@/styled-system/types/prop-type';

type ProgressElement<TMin extends number | undefined = undefined> =
  TMin extends number ? 'meter' : 'progress';

/**
 * The component will render as a `<progress>` element by default, but if the `min` prop is set, it will render as a `<meter>` element instead. This is useful for indicating a measurement that is not necessarily a progress bar.
 * If you are using `IressProgressProps` in your own components, make sure to set the correct generic type for `TMin` to ensure that the correct element attributes are used.
 *
 * Examples:
 * - `IressProgressProps<undefined>` will use the attributes of a `<progress />` element.
 * - `IressProgressProps<0>` will use the attributes of a `<meter />` element.
 */
export type IressProgressProps<TMin extends number | undefined = undefined> =
  Omit<IressStyledProps<ProgressElement<TMin>>, 'borderRadius' | 'value'> & {
    /**
     * The **`border-radius`** CSS property rounds the corners of an element's outer border edge using the radius tokens in the design system.
     * @see https://developer.mozilla.org/docs/Web/CSS/border-radius
     */
    borderRadius?: UtilityValues['borderRadius'];

    /**
     * The maximum value of the progress indicator.
     * @default 100
     **/
    max?: number;

    /**
     * The minimum value of the progress indicator. If `min` is set, the progress indicator will render as a `<meter />` element instead of a `<progress />` element, thereby changing its role to `meter` instead of `progressbar`.
     * @default 0
     **/
    min?: TMin;

    /**
     * The text that is announced by the screen reader. Should contain a description of the section the progress is being measured for. You can use {{current}} and {{max}} as string replacers for the current value and maximum value respectively.
     * @default "Progress is {{current}} of {{max}}"
     */
    sectionTitle?: string;

    /**
     * The current value of the progress indicator.
     * @default 0
     **/
    value?: number;
  };

export interface ProgressCustomCSSProperties extends CSSProperties {
  '--iress-border-radius'?: string;
}

export const IressProgress = <TMin extends number | undefined = undefined>({
  borderRadius,
  className: classNameProp,
  max = 100,
  min,
  sectionTitle = 'Progress is {{current}} of {{max}}',
  style: styleProp,
  value = 0,
  ...restProps
}: IressProgressProps<TMin>) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(value);
  const [styleProps, nonStyleProps] = splitCssProps(restProps);
  const className = cx(
    classNameProp,
    css(progress.raw(), styleProps),
    GlobalCSSClass.Progress,
  );

  const normalisedSectionTitle = (): string =>
    stringReplacer(sectionTitle, [
      { name: '{{current}}', value: String(uncontrolledValue) },
      { name: '{{max}}', value: max.toString() },
    ]);

  useEffect(() => {
    const clampedMin = Math.max(value, min ?? 0);
    const clampedMax = Math.min(clampedMin, max);

    setUncontrolledValue(clampedMax);
  }, [value, min, max]);

  const style: ProgressCustomCSSProperties = {
    '--iress-border-radius': borderRadius
      ? token(`radii.${borderRadius}`)
      : undefined,
    ...styleProp,
  };

  if (min !== undefined) {
    return (
      <styled.meter
        aria-label={normalisedSectionTitle()}
        className={className}
        max={max}
        min={min}
        value={uncontrolledValue}
        {...(nonStyleProps as IressProgressProps<number>)}
        style={style}
      />
    );
  }

  return (
    <styled.progress
      aria-label={normalisedSectionTitle()}
      className={className}
      max={max}
      value={uncontrolledValue}
      {...(nonStyleProps as IressProgressProps<undefined>)}
      style={style}
    />
  );
};

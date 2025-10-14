import { forwardRef } from 'react';
import classNames from 'classnames';
import {
  type IressIconProps,
  IconSet,
  IconSpin,
  IconRotate,
  IconFlip,
  IconSize,
  type IconWithEnums,
} from './Icon.types';
import styles from './Icon.module.scss';
import { TextMode } from '../../main';

const Icon = (
  {
    name,
    screenreaderText,
    set = 'fal',
    rotate,
    fixedWidth,
    flip,
    size,
    spin,
    mode,
    className,
    ...restProps
  }: IressIconProps,
  ref: React.Ref<HTMLSpanElement>,
) => {
  const prefix = 'fa-';

  const classMap = {
    [styles.icon]: true,
    [prefix + name]: true,
    [set]: !!set,
    [`${prefix}fw`]: !!fixedWidth,
    [prefix + size]: size !== undefined,
    [styles[`mode-${mode}`]]: mode !== undefined,
    [styles[`flip-${flip}`]]: flip !== undefined,
    [styles[`rotate-${rotate}`]]: rotate !== undefined,
    [styles[`spin-${spin}`]]: spin !== undefined,
  };
  const cssClasses = classNames(className, classMap);

  const a11yAttributes: Record<string, string> =
    screenreaderText === undefined || screenreaderText === ''
      ? { 'aria-hidden': 'true' }
      : { 'aria-label': screenreaderText };

  return (
    <span
      ref={ref}
      role="img"
      className={cssClasses}
      {...a11yAttributes}
      {...restProps}
    />
  );
};

export const IressIcon = forwardRef<HTMLElement, IressIconProps>(
  Icon,
) as IconWithEnums;

IressIcon.displayName = 'IressIcon';
/** @deprecated IressIcon.Spin is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressIcon.Spin = IconSpin;
/** @deprecated IressIcon.Size is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressIcon.Size = IconSize;
/** @deprecated IressIcon.Flip is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressIcon.Flip = IconFlip;
/** @deprecated IressIcon.Rotate is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressIcon.Rotate = IconRotate;
/** @deprecated IressIcon.Set is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressIcon.Set = IconSet;
/** @deprecated IressIcon.Mode is now deprecated and will be removed in a future version. Please use the value directly instead. */
IressIcon.Mode = TextMode;

import classNames from 'classnames';
import { TextVariant } from '@/enums';
import {
  type IressSkeletonProps,
  SkeletonMode,
  type SkeletonWithEnums,
} from './Skeleton.types';
import styles from './Skeleton.module.scss';
import { toCSSLengthValue } from '@helpers/formatting/toCSSLengthValue';
import { IressText } from '../Text';

export const IressSkeleton: SkeletonWithEnums = ({
  className,
  height,
  width,
  textVariant,
  mode = 'text',
  style,
  ...restProps
}: IressSkeletonProps) => {
  const isTextMode = mode === 'text';

  const inlineStyles = {
    ...style,
    width: width ? toCSSLengthValue(width) : style?.width,
    height: !isTextMode && height ? toCSSLengthValue(height) : style?.height,
  };
  const cssClasses = classNames(className, styles.skeleton, styles[mode], {
    'iress-u-text': isTextMode,
  });

  return (
    <div
      {...restProps}
      className={cssClasses}
      style={inlineStyles}
      aria-hidden="true"
    >
      {isTextMode && <IressText variant={textVariant}>&nbsp;</IressText>}
    </div>
  );
};

/** @deprecated IressSkeleton.Mode enum is now deprecated and will be removed in a future version. Please use the SkeletonModes type instead. **/
IressSkeleton.Mode = SkeletonMode;

/** @deprecated IressSkeleton.TextVariant enum is now deprecated and will be removed in a future version. Please use the TextVariants type instead. **/
IressSkeleton.TextVariant = TextVariant;

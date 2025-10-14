import { toCSSLengthValue } from '@helpers/formatting/toCSSLengthValue';
import { IressText } from '../Text';
import { skeleton } from './Skeleton.styles';
import { cx } from '@/styled-system/css';
import { IressStyledProps } from '@/types';
import { IressCSSProps } from '@/interfaces';
import { GlobalCSSClass } from '@/enums';

type SkeletonMode = 'rect' | 'circle' | 'text';

export interface IressSkeletonProps<TMode extends SkeletonMode = 'text'>
  extends Omit<IressStyledProps, 'width' | 'height'> {
  /**
   * Sets the height of the skeleton bones. If no unit is specified it will default to pixels.
   * Not allowed when in `text` mode.
   */
  height?: TMode extends 'text' ? never : string;

  /**
   * Mode of the skeleton. `rect` and `circle` must have `width` and `height` specified. `text` works with `textStyle`.
   * @default text
   */
  mode?: TMode;

  /**
   * Use `textStyle` to specify what the Skeleton should emulate. If set to `h1` a non-break space with the same font-size and line-height of a h1 will be rendered.
   */
  textStyle?: IressCSSProps['textStyle'];

  /**
   * Sets the width of the skeleton bones. If no unit is specified it will default to pixels.
   */
  width?: string;
}

export const IressSkeleton = <TMode extends SkeletonMode = 'text'>({
  className,
  height,
  width,
  mode: modeProp,
  style,
  'data-testid': dataTestId,
  ...restProps
}: IressSkeletonProps<TMode>) => {
  const mode: SkeletonMode = modeProp ?? 'text';
  const isTextMode = mode === 'text';

  const inlineStyles = {
    ...style,
    width: width && toCSSLengthValue(width),
    height: !isTextMode ? height && toCSSLengthValue(height) : undefined,
  };

  return (
    <IressText
      {...restProps}
      className={cx(className, skeleton({ mode }), GlobalCSSClass.Skeleton)}
      style={inlineStyles}
      aria-hidden="true"
      data-testid={dataTestId}
    >
      {isTextMode && <>&nbsp;</>}
    </IressText>
  );
};

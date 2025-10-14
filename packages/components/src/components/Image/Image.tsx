import { GlobalCSSClass } from '@/enums';
import { image } from './Image.styles';
import { cx } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { type IressStyledProps } from '@/types';

export interface IressImageProps
  extends Omit<IressStyledProps<'img'>, 'maxWidth' | 'alt' | 'src'> {
  /**
   * The alternative text representation of the image. It is used by screen readers to describe the image. If the image is intended for decoration purposes only, make it an empty string.
   */
  alt: string;

  /**
   * Override the maximum width of the image
   */
  maxWidth?: string | number;

  /**
   * The address of the image
   */
  src: string;
}

const Image = styled('img', image);

export const IressImage = ({
  className,
  maxWidth = '100%',
  style,
  ...restProps
}: IressImageProps) => {
  const inlineStyles = {
    ...style,
    maxWidth,
  };

  return (
    <Image
      className={cx(className, GlobalCSSClass.Image)}
      style={inlineStyles}
      {...restProps}
    />
  );
};

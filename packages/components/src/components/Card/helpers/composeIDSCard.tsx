import {
  CardCssClass,
  type CardCssModule,
  type IressCardWrapperProps,
} from '../Card.types';
import { PaddingSize } from '@/enums';
import classNames from 'classnames';
import { type IressHTMLAttributes } from '@/interfaces';

export function composeIDSCard<T = HTMLDivElement>(
  {
    className,
    clickable,
    padding = PaddingSize.Md,
    selected,
    stretch,
  }: IressCardWrapperProps<T> = {},
  styles: CardCssModule = {},
): IressHTMLAttributes<T> {
  const cssClasses = { ...CardCssClass, ...styles };

  return {
    className: classNames(
      cssClasses.Base,
      className,
      `${cssClasses.Padding}--${padding}`,
      {
        [cssClasses.Stretch]: stretch,
        [cssClasses.Clickable]: clickable,
        [cssClasses.Selected]: selected,
      },
    ),
  };
}

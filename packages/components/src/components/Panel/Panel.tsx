import classNames from 'classnames';
import {
  type IressPanelProps,
  PanelBackground,
  PanelCssClass,
  type PanelWithEnums,
} from './Panel.types';
import { PaddingSize, TextAlign, GlobalCSSClass } from '@/enums';
import { getResponsivePaddingClasses } from '@helpers/responsive/getResponsivePaddingClasses';

export const IressPanel: PanelWithEnums = ({
  children,
  background = 'default',
  noBorderRadius,
  noGutter,
  padding = 'md',
  stretch,
  textAlign = 'inherit',
  className,
  ...restProps
}: IressPanelProps) => {
  const classMap = {
    [PanelCssClass.Stretch]: stretch,
    [PanelCssClass.NoBorderRadius]: noBorderRadius,
    [PanelCssClass.NoGutter]: noGutter,
  };

  const cssClasses = classNames(
    className,
    PanelCssClass.Base,
    `${GlobalCSSClass.TextAlignBase}--${textAlign}`,
    `${PanelCssClass.Background}--${background}`,
    getResponsivePaddingClasses(padding),
    classMap,
  );

  return (
    <div className={cssClasses} {...restProps}>
      {children}
    </div>
  );
};

/** @deprecated IressPanel.Background is now deprecated and will be removed in a future version. Please use the PanelBackgrounds type instead. */
IressPanel.Background = PanelBackground;

/** @deprecated IressPanel.Padding is now deprecated and will be removed in a future version. Please use the PaddingSizes type instead. */
IressPanel.Padding = PaddingSize;

/** @deprecated IressPanel.TextAlign is now deprecated and will be removed in a future version. Please use the TextAligns type instead. */
IressPanel.TextAlign = TextAlign;

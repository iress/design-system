import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCloseButton } from '../../Button';
import { slideout } from '../Slideout.styles';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { IressText } from '@/components/Text';
import { type IressStyledProps } from '@/types';
import { type ReactNode } from 'react';

export interface SlideoutInnerProps extends IressStyledProps {
  closeText?: string;
  floatingRef?: (node: HTMLElement | null) => void;
  footer?: ReactNode;
  heading?: ReactNode;
  onOpenChange: (show: boolean) => void;
}

export const SlideoutInner = ({
  children,
  closeText,
  'data-testid': dataTestid,
  floatingRef,
  footer,
  heading,
  onOpenChange,
  className,
  ...restProps
}: SlideoutInnerProps) => {
  const classes = slideout();

  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const {
    p = 'md',
    pt,
    pl,
    pr,
    pb,
    px,
    py,
    ...restStyleProps
  } = styleProps as IressStyledProps;

  return (
    <styled.div
      ref={floatingRef}
      data-testid={dataTestid}
      className={className}
      {...nonStyleProps}
      {...restStyleProps}
    >
      <IressCloseButton
        onClick={() => onOpenChange(false)}
        screenreaderText={closeText}
        className={classes.closeButton}
        data-testid={propagateTestid(dataTestid, 'close-button__button')}
      />
      <IressText
        className={classes.content}
        p={p}
        px={px}
        py={py}
        pt={pt}
        pl={pl}
        pr={pr}
        pb={pb}
        data-testid={propagateTestid(dataTestid, 'content')}
      >
        {heading}
        {children}
      </IressText>
      {footer && (
        <styled.div
          className={classes.footer}
          p={p}
          px={px}
          py={py}
          pt={pt}
          pl={pl}
          pr={pr}
          pb={pb}
          data-testid={propagateTestid(dataTestid, 'footer')}
        >
          {footer}
        </styled.div>
      )}
    </styled.div>
  );
};

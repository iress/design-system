import classNames from 'classnames';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCloseButton } from '../../Button';
import { type SlideoutInnerProps } from '../Slideout.types';
import styles from '../Slideout.module.scss';

export const SlideoutInner = ({
  children,
  closeText,
  'data-testid': dataTestid,
  floatingRef,
  footer,
  heading,
  onOpenChange,
  padding,
  ...restProps
}: SlideoutInnerProps) => (
  <div ref={floatingRef} {...restProps} data-testid={dataTestid}>
    <IressCloseButton
      onClick={() => onOpenChange(false)}
      screenreaderText={closeText}
      className={styles.closeButton}
      data-testid={propagateTestid(dataTestid, 'close-button__button')}
    />
    <div
      className={classNames(styles.content, `iress-p--${padding}`)}
      data-testid={propagateTestid(dataTestid, 'content')}
    >
      {heading}
      {children}
    </div>
    {footer && (
      <div
        className={classNames(styles.footer, `iress-p--${padding}`)}
        data-testid={propagateTestid(dataTestid, 'footer')}
      >
        {footer}
      </div>
    )}
  </div>
);

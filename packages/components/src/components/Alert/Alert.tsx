import classNames from 'classnames';
import { ALERT_ICONS, type IressAlertProps } from './Alert.types';
import { HeadingLevel, SystemValidationStatus } from '@/enums';
import styles from './Alert.module.scss';
import { IressIcon } from '../Icon';
import { IressText } from '../Text';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { HeadingWithDeprecatedFallback } from '@/components/HeadingWithDeprecatedFallback/HeadingWithDeprecatedFallback';

export const IressAlert = ({
  children,
  className,
  footer,
  heading,
  headingLevel = 'h2',
  headingText,
  status = 'info',
  ...restProps
}: IressAlertProps) => (
  <IressText
    className={classNames(
      className,
      `${styles.alert} ${styles[status]} iress-u-inline iress--gutter--sm iress--no-wrap`,
    )}
    {...restProps}
  >
    <IressIcon
      name={ALERT_ICONS[status]}
      screenreaderText={`${status}: `}
      size="lg"
      fixedWidth
      className={styles.icon}
    />
    <div className={styles.wrapper}>
      {(heading ?? headingText) && (
        <div className={styles.heading}>
          <HeadingWithDeprecatedFallback
            component="IressAlert"
            heading={heading}
            headingText={headingText}
            HeadingTag={headingLevel}
            data-testid={propagateTestid(restProps['data-testid'], 'heading')}
          />
        </div>
      )}
      {children}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  </IressText>
);

/** @deprecated IressAlert.HeadingLevel enum is now deprecated and will be removed in a future version. Please use the HeadingLevels type instead. **/
IressAlert.HeadingLevel = HeadingLevel;

/** @deprecated IressAlert.Status enum is now deprecated and will be removed in a future version. Please use the SystemValidationStatuses type instead. **/
IressAlert.Status = SystemValidationStatus;

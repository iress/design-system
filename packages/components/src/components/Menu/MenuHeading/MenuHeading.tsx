import {
  type IressMenuHeadingProps,
  type MenuHeadingType,
} from '../MenuItem/MenuItem.types';
import { HeadingLevel } from '@/enums';
import { IressMenuText } from '../MenuText/MenuText';
import classNames from 'classnames';
import styles from '../MenuItem/MenuItem.module.scss';

export const IressMenuHeading: MenuHeadingType = ({
  children,
  className,
  level: Heading = 'h2',
  ...restProps
}: IressMenuHeadingProps) => (
  <IressMenuText
    {...restProps}
    className={classNames(className, styles.heading)}
  >
    <Heading>{children}</Heading>
  </IressMenuText>
);

/** @deprecated IressMenuHeading.Level enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressMenuHeading.Level = HeadingLevel;

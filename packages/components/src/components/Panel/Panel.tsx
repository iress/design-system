import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { IressCard, type IressCardProps } from '../Card';

export type IressPanelProps = IressCardProps;

export const IressPanel = ({
  className,
  children,
  ...restProps
}: IressPanelProps) => (
  <IressCard {...restProps} className={cx(className, GlobalCSSClass.Panel)}>
    {children}
  </IressCard>
);

IressPanel.displayName = 'IressPanel';

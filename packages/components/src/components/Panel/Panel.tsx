import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { IressCard, type IressCardProps } from '../Card';

export type IressPanelProps = IressCardProps;

/**
 * Provides a sectioned container for grouping related content with an optional heading.
 *
 * @example
 * ```tsx
 * import { IressPanel } from '@iress-oss/ids-components';
 *
 * <IressPanel>Panel content</IressPanel>
 * ```
 */
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

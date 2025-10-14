import { IconSize, IressIcon } from '../../Icon';
import { type ToastStatus } from './Toast.types';
import styles from './Toast.module.scss';

interface ToastIconProps {
  status: ToastStatus;
}

export const ToastIcon: React.FC<ToastIconProps> = ({ status }) => {
  const icons: Record<ToastStatus, string> = {
    error: 'ban',
    success: 'check',
    info: 'info-square',
  };

  return (
    <IressIcon
      name={icons[status]}
      screenreaderText={`${status}: `}
      size={IconSize.Lg}
      fixedWidth
      className={styles.toast__icon}
    />
  );
};

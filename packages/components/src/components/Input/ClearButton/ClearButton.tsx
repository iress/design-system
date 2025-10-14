import { GlobalCSSClass } from '@/enums';
import styles from './ClearButton.module.scss';
import { type IressButtonHTMLAttributes } from '@/main';

type ClearButtonProps = IressButtonHTMLAttributes<HTMLButtonElement>;

export const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles.clear}
      onClick={onClick}
      // Avoid triggering onBlur event on input
      onMouseDown={(e) => e.preventDefault()}
      type="button"
    >
      <span aria-hidden="true">&times;</span>
      <span className={GlobalCSSClass.SROnly}>Clear</span>
    </button>
  );
};

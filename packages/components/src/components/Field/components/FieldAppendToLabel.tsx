import classNames from 'classnames';
import { type FieldAppendToLabelProps } from '../Field.types';
import styles from '../Field.module.scss';
import { GlobalCSSClass, IressValidationSummary } from '@/main';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { getUniqueItemsByKey } from '../helpers/getUniqueItemsByKey';

export const FieldAppendToLabel = ({
  error,
  errorMessages,
  hiddenLabel,
  hint,
  'data-parent-testid': parentTestId,
}: FieldAppendToLabelProps) => (
  <>
    {hint && (
      <div
        className={classNames(styles.hint, {
          [GlobalCSSClass.SROnly]: hiddenLabel,
        })}
        data-testid={propagateTestid(parentTestId, 'hint')}
      >
        {hint}
      </div>
    )}
    {error}
    {errorMessages && (
      <IressValidationSummary
        className={styles.errorSummary}
        messages={getUniqueItemsByKey(errorMessages, 'message')}
        data-testid={propagateTestid(parentTestId, 'error')}
      />
    )}
  </>
);

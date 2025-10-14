import { ReactNode } from 'react';
import { IressIcon } from '../../Icon';
import { IressTooltip } from '../../Tooltip';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { css } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { field } from '../Field.styles';

export interface FieldHintProps {
  /**
   * The hint content to display
   */
  hint: ReactNode;

  /**
   * Whether the field is in horizontal mode
   */
  horizontal?: boolean;

  /**
   * Whether the label is hidden
   */
  hiddenLabel?: boolean;

  /**
   * Data test ID for the hint element
   */
  dataTestId?: string;

  /**
   * The label content to wrap (only used in horizontal mode)
   */
  children: ReactNode;
}

export const FieldHint = ({
  hint,
  horizontal,
  hiddenLabel,
  dataTestId,
  children,
}: FieldHintProps) => {
  const styles = field.raw({
    hasError: false,
    hiddenLabel,
    horizontal,
    multipleFields: false,
  });

  if (horizontal) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <styled.div
        className={css(styles.hint)}
        data-testid={propagateTestid(dataTestId, 'hint')}
        srOnly={hiddenLabel}
      >
        {hint}
      </styled.div>
    </>
  );
};

export const FieldHintIcon = ({ hint }: { hint: ReactNode }) => (
  <IressTooltip
    tooltipText={typeof hint === 'string' ? hint : 'Additional information'}
    align="top"
  >
    <IressIcon
      name="info-circle"
      screenreaderText="More information"
      ml="spacing.100"
    />
  </IressTooltip>
);

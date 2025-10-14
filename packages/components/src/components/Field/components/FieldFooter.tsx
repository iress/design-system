import { getUniqueItemsByKey } from '../helpers/getUniqueItemsByKey';
import { type ReactNode, useEffect, useMemo, useRef } from 'react';
import { type ValidationMessageObj } from '@/interfaces';
import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { IressValidationSummary } from '@/components/ValidationMessage';
import { IressIcon, type IressIconProps } from '@/components/Icon';
import { field } from '../Field.styles';
import { css, cx } from '@/styled-system/css';
import { IressText } from '@/components/Text';

export interface FieldFooterProps extends IressStyledProps {
  /**
   * Validation error to be displayed above the field.
   */
  error?: ReactNode;

  /**
   * Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`.
   */
  errorMessages?: ValidationMessageObj[];

  /**
   * If true, the supplementary area will be displayed with a border to distinguish it from other fields.
   */
  multipleFields?: boolean;

  /**
   * Supplementary content to be displayed below the field. Is only shown when the field is not in an error state.
   */
  supplementary?: ReactNode;
}

const ErrorIcon = (props: Omit<IressIconProps, 'name'>) => (
  <IressIcon name="exclamation-triangle" {...props} pr="xs" />
);

export const FieldFooter = ({
  className,
  'data-testid': dataTestId,
  error,
  errorMessages = [],
  multipleFields,
  supplementary,
  ...restProps
}: FieldFooterProps) => {
  const classes = field({ multipleFields });
  const elementRef = useRef<HTMLDivElement>(null);
  const textContent = useRef<string | null>(null);
  const hasError = useMemo(
    () => !!error || errorMessages.length > 0,
    [error, errorMessages.length],
  );

  useEffect(() => {
    if (
      !elementRef.current ||
      elementRef.current.textContent === textContent.current
    ) {
      return;
    }
    elementRef.current.classList.remove(
      css({ animationStyle: 'field-footer' }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Trigger reflow
    elementRef.current.offsetHeight;
    textContent.current = elementRef.current.textContent;

    elementRef.current.classList.add(css({ animationStyle: 'field-footer' }));
  }, [supplementary, hasError]);

  if (!supplementary && !hasError) {
    return null;
  }

  return (
    <styled.div
      {...restProps}
      className={cx(className, classes.footer)}
      ref={elementRef}
    >
      {hasError && (
        <IressValidationSummary
          itemStyle={{ textStyle: 'typography.body.sm' }}
          messages={getUniqueItemsByKey(errorMessages, 'message')}
          data-testid={dataTestId}
          prefix={<ErrorIcon aria-label="Error: " />}
          visiblePrefix
        >
          {error}
        </IressValidationSummary>
      )}
      {!hasError && (
        <IressText className={classes.supplementary}>{supplementary}</IressText>
      )}
    </styled.div>
  );
};

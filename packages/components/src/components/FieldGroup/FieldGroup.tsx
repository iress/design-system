import { propagateTestid } from '@helpers/utility/propagateTestid';
import { type IressFieldProps } from '../Field';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { FieldFooter } from '../Field/components/FieldFooter';
import { fieldGroup } from './FieldGroup.styles';
import { css, cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { LabelBase } from '@/components/Label/LabelBase/LabelBase';
import { type ReactNode } from 'react';

export interface IressFieldGroupProps extends IressFieldProps<
  'fieldset',
  'legend'
> {
  /**
   * Should contain multiple `IressField`, or other elements supported in field group such as `IressButton`.
   */
  children?: ReactNode;

  /**
   * Displays multiple children inline rather than stacked, with a small gap.
   */
  inline?: boolean;

  /**
   * Displays multiple children inline and removes column gap.
   */
  join?: boolean;
}

/**
 * Groups multiple fields together with a shared label, hint, and error state rendered as a fieldset.
 *
 * @example
 * ```tsx
 * import { IressFieldGroup, IressField, IressInput } from '@iress-oss/ids-components';
 *
 * <IressFieldGroup label="Contact details" inline>
 *   <IressField label="First name"><IressInput /></IressField>
 *   <IressField label="Last name"><IressInput /></IressField>
 * </IressFieldGroup>
 * ```
 */
export const IressFieldGroup = ({
  children,
  className,
  'data-testid': dataTestId,
  error,
  errorMessages,
  hiddenLabel,
  hint,
  inline,
  join,
  label,
  removeErrorMargin,
  required,
  supplementary,
  ...restProps
}: IressFieldGroupProps) => {
  const styles = fieldGroup.raw({
    hasError: !!error || !!errorMessages?.length,
    hiddenLabel,
    inline,
    join,
    removeErrorMargin,
  });
  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  return (
    <fieldset
      className={cx(
        className,
        css(styles.root, styleProps),
        GlobalCSSClass.FieldGroup,
      )}
      data-testid={dataTestId}
      {...nonStyleProps}
    >
      <LabelBase
        append={
          hint && (
            <styled.div
              className={css(styles.hint)}
              data-testid={propagateTestid(dataTestId, 'hint')}
              srOnly={hiddenLabel}
            >
              {hint}
            </styled.div>
          )
        }
        className={css(styles.legend)}
        element="legend"
        data-testid={propagateTestid(dataTestId, 'legend')}
        hiddenLabel={hiddenLabel}
        required={required}
      >
        {label}
      </LabelBase>
      <div className={css(styles.fields)}>{children}</div>
      <FieldFooter
        data-testid={propagateTestid(dataTestId, 'error')}
        error={error}
        errorMessages={errorMessages}
        multipleFields
        supplementary={supplementary}
      />
    </fieldset>
  );
};

IressFieldGroup.displayName = 'IressFieldGroup';

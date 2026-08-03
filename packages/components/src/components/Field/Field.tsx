import { isValidElement, type ReactNode } from 'react';
import { IressLabel } from '../Label';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { type LabelBaseProps } from '../Label/LabelBase/LabelBase';
import { type FormControlReadOnly, type IressStyledProps } from '@/types';
import { type ValidationMessageObj } from '@/interfaces';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { field } from './Field.styles';
import { css, cx } from '@/styled-system/css';
import { FieldFooter } from './components/FieldFooter';
import { FieldHint } from './components/FieldHint';
import { GlobalCSSClass } from '@/enums';

export type IressFieldProps<
  E extends 'div' | 'fieldset' = 'div',
  ELabel extends 'label' | 'legend' = 'label',
> = IressStyledProps<E> &
  Pick<LabelBaseProps<ELabel>, 'hiddenLabel' | 'required'> & {
    /**
     * The form control this field is related to.
     */
    children?: ReactNode;

    /**
     * Text to be displayed as supporting field description.
     */
    hint?: ReactNode;

    /**
     * Displays the label and input field inline instead of stacked vertically.
     */
    horizontal?: boolean;

    /**
     * Controls the width of the label container when in horizontal mode.
     * Can be any valid CSS width value (e.g., '200px', '20%', 'auto').
     * Only applies when `horizontal` is true.
     */
    labelWidth?: string;

    /**
     * Used to connect it to the input element, it should be the input's id.
     * If provided, the label will be rendered as a `<label>` element, otherwise it will be rendered as a `<strong>` element.
     *
     * [Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for)
     */
    htmlFor?: ELabel extends 'label' ? string : undefined;

    /**
     * Text to be displayed in the label.
     **/
    label: ReactNode;

    /**
     * Validation error to be displayed above the field.
     */
    error?: ReactNode;

    /**
     * Validation errors to be displayed above the field, an array of validation messages to be displayed in `IressValidationSummary`.
     */
    errorMessages?: ValidationMessageObj[];

    /**
     * ID for the error container element, used to associate the error message with the form control via `aria-describedby`.
     * When `error` or `errorMessages` are present and `htmlFor` is set, this is automatically derived as `${htmlFor}-error`.
     * Override only if you need a custom error container ID.
     */
    errorId?: string;

    /**
     * Renders the group in a read-only state (no asterisk symbol).
     * Use `'locked'` when the control is read-only due to permissions.
     */
    readOnly?: FormControlReadOnly;

    /**
     * Removes the reserved space for error messages, allowing fields to stack with narrower gaps.
     * When true, no margin is reserved for potential error messages.
     */
    removeErrorMargin?: boolean;

    /**
     * Supplementary content to be displayed below the field. Is only shown when the field is not in an error state.
     */
    supplementary?: ReactNode;
  };

export const IressField = ({
  children,
  className,
  'data-testid': dataTestId,
  error,
  errorId,
  errorMessages,
  hiddenLabel,
  hint,
  horizontal,
  label,
  labelWidth,
  required,
  readOnly,
  removeErrorMargin = false,
  supplementary,
  ...restProps
}: IressFieldProps) => {
  const { htmlFor: htmlForProp } = restProps;
  let htmlFor: string | undefined;

  if (htmlForProp === undefined && isValidElement<IressStyledProps>(children)) {
    htmlFor = toArray(children)[0].props.id;
  } else {
    htmlFor = htmlForProp;
  }

  // Auto-derive errorId from htmlFor when errors are present (can be overridden by explicit errorId prop)
  const hasError = !!error || !!errorMessages?.length;
  const effectiveErrorId =
    errorId ?? (hasError && htmlFor ? `${htmlFor}-error` : undefined);

  const styles = field.raw({
    hasError,
    hasHint: !!hint,
    hiddenLabel,
    horizontal,
    multipleFields: false, // Add this as needed
    removeErrorMargin,
  });
  const [styleProps, nonStyledProps] = splitCssProps(restProps);
  const isReadOnly = !!readOnly;

  const renderLabelWithHint = () => {
    const labelContent = (
      <IressLabel
        className={css(styles.label)}
        data-testid={propagateTestid(dataTestId, 'label')}
        hiddenLabel={hiddenLabel}
        htmlFor={htmlFor}
        readOnly={readOnly}
        required={isReadOnly ? false : !!required}
      >
        {label}
      </IressLabel>
    );

    if (!hint) {
      return labelContent;
    }

    return (
      <FieldHint
        hint={hint}
        horizontal={horizontal}
        hiddenLabel={hiddenLabel}
        dataTestId={dataTestId}
      >
        {labelContent}
      </FieldHint>
    );
  };

  return (
    <styled.div
      className={cx(
        className,
        css(styles.root, styleProps),
        GlobalCSSClass.Field,
      )}
      style={{
        ...(horizontal &&
          labelWidth && {
            gridTemplateColumns: `${labelWidth} 1fr`,
          }),
      }}
      data-testid={dataTestId}
      {...nonStyledProps}
    >
      <styled.div className={css(styles.labelContainer)}>
        {renderLabelWithHint()}
      </styled.div>
      <styled.div className={css(styles.fieldContainer)}>
        <div className={css(styles.element)}>{children}</div>
      </styled.div>
      <FieldFooter
        className={css(styles.footer)}
        data-testid={propagateTestid(dataTestId, 'error')}
        error={error}
        errorId={effectiveErrorId}
        errorMessages={errorMessages}
        supplementary={supplementary}
      />
    </styled.div>
  );
};

IressField.displayName = 'IressField';

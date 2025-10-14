import { type ReactNode, useContext } from 'react';
import { FormContext } from '../FormContext';
import { formatObjectKey } from '@helpers/formatting/formatObjectKey';
import {
  IressValidationSummary,
  type IressValidationSummaryProps,
} from '@/components/ValidationMessage';
import { IressAlert, type IressAlertProps } from '@/components/Alert';
import { styled } from '@/styled-system/jsx';
import { propagateTestid } from '@/helpers/utility/propagateTestid';

export type IressFormValidationSummaryProps = Omit<
  IressValidationSummaryProps,
  'messages'
> &
  Omit<
    IressAlertProps,
    'defaultDismissed' | 'dismissed' | 'onDismiss' | 'status'
  > & {
    /**
     * The content to use as the summary. If provided, this will override the default validation messages.
     * This is useful if you want to provide a custom summary message or if you want to
     * use a different validation mechanism that does not rely on the form context.
     */
    children?: ReactNode;
  };

const FocusableAlert = styled(
  'div',
  {
    base: {
      borderRadius: 'radius.system.form',
      _focus: { outline: '[none]', layerStyle: 'elevation.focus' },
    },
  },
  {
    defaultProps: {
      role: 'alert',
      tabIndex: -1,
    },
  },
);

/**
 * Validation summary messages based on the form context from react-hook-form
 */
export const IressFormValidationSummary = ({
  actions,
  children,
  'data-testid': testId,
  footer,
  heading = <h3>There was a problem submitting this form</h3>,
  itemStyle,
  icon,
  srOnly,
  variant,
  ...restProps
}: IressFormValidationSummaryProps) => {
  const form = useContext(FormContext);

  if (!form) {
    throw new Error(
      'IressFormValidationSummary must be used within a IressForm',
    );
  }

  const errorMessages = Object.entries(form.errorMessages).filter(
    ([, error]) => !!error,
  );

  if (errorMessages.length === 0 || children) {
    return (
      <FocusableAlert
        data-testid={testId}
        srOnly={srOnly}
        ref={form.setFocusOnError}
      >
        {children}
      </FocusableAlert>
    );
  }

  // TODO: Possibly move this logic to a resolver so we can access the original field reference
  // Resolvers are a big change to how the validation would work, as we would have to ask the consumers to use a schema to validate the form
  const validationSummaryMessages = errorMessages.map(([fieldName, error]) => {
    // Get the field id
    const fieldId = `${form?.id}__${fieldName}`;
    const fieldElement = document.getElementById(fieldId);

    // Get the field label
    const fieldLabelList = (fieldElement as HTMLInputElement)?.labels;
    const fieldLabels = Array.from(fieldLabelList ?? []);
    const fieldLegend = fieldElement
      ?.closest('fieldset')
      ?.querySelector('legend');

    const errorMessagePrefix = `${
      fieldLabels[0]?.dataset?.name ??
      fieldLegend?.dataset?.name ??
      formatObjectKey(fieldName)
    }: `;

    return {
      linkToTarget: fieldId,
      message: `${errorMessagePrefix}${error}`,
    };
  });

  return (
    <FocusableAlert
      ref={form.setFocusOnError}
      data-testid={testId}
      srOnly={srOnly}
    >
      <IressAlert
        actions={actions}
        footer={footer}
        heading={heading}
        icon={icon}
        status="danger"
        variant={variant}
      >
        <IressValidationSummary
          {...restProps}
          data-testid={propagateTestid(testId, 'messages')}
          itemStyle={{
            'data-testid': propagateTestid(testId, 'error'),
            ...itemStyle,
          }}
          messages={validationSummaryMessages}
        />
      </IressAlert>
    </FocusableAlert>
  );
};

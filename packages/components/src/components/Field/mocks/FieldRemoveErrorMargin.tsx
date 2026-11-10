import { useState } from 'react';
import {
  IressCol,
  IressField,
  IressInline,
  IressInput,
  IressRow,
  IressStack,
  IressText,
  IressToggle,
} from '@/main';

export function FieldRemoveErrorMargin() {
  const [removeErrorMargin, setRemoveErrorMargin] = useState(false);
  const [showError, setShowError] = useState(false);

  const fieldProps = {
    removeErrorMargin,
    ...(showError
      ? {
          errorMessages: [{ message: 'This field is required' }],
        }
      : {}),
  };

  const fieldPropsWithContent = {
    removeErrorMargin,
    ...(showError
      ? {
          errorMessages: [{ message: 'This field is required' }],
        }
      : {
          supplementary: 'This is always-displayed supplementary text',
        }),
  };

  return (
    <IressStack gap="spacing.5">
      <IressInline gap="spacing.4">
        <IressToggle
          onChange={(checked) => setRemoveErrorMargin(checked)}
          checked={removeErrorMargin}
        >
          Remove error margin (tighter field spacing)
        </IressToggle>

        <IressToggle
          onChange={(checked) => setShowError(checked)}
          checked={showError}
        >
          Show error message
        </IressToggle>
      </IressInline>

      <IressRow gutter="spacing.6">
        <IressCol span="6">
          <IressStack gap="spacing.2">
            <IressText element="h3">Vertical Label Layout</IressText>
            <IressStack gap="spacing.0">
              <IressField {...fieldProps} label="First Name">
                <IressInput placeholder="Enter first name" />
              </IressField>
              <IressField {...fieldPropsWithContent} label="Last Name">
                <IressInput placeholder="Enter last name" />
              </IressField>
              <IressField {...fieldProps} label="Email Address">
                <IressInput type="email" placeholder="Enter email" />
              </IressField>
            </IressStack>
          </IressStack>
        </IressCol>

        <IressCol span="6">
          <IressStack gap="spacing.2">
            <IressText element="h3">Horizontal Label Layout</IressText>
            <IressStack gap="spacing.0">
              <IressField
                {...fieldProps}
                horizontal
                labelWidth="120px"
                label="First Name"
              >
                <IressInput placeholder="Enter first name" />
              </IressField>
              <IressField
                {...fieldPropsWithContent}
                horizontal
                labelWidth="120px"
                label="Last Name"
              >
                <IressInput placeholder="Enter last name" />
              </IressField>
              <IressField
                {...fieldProps}
                horizontal
                labelWidth="120px"
                label="Email Address"
              >
                <IressInput type="email" placeholder="Enter email" />
              </IressField>
            </IressStack>
          </IressStack>
        </IressCol>
      </IressRow>
    </IressStack>
  );
}

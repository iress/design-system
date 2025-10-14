import {
  IressForm,
  IressStack,
  IressButton,
  IressTab,
  IressFormField,
  IressInput,
} from '@/main';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { IressTabSet } from '../TabSet';

interface FormInsideTabProps {
  loading?: boolean;
  onSubmit?: (data: FieldValues) => void;
}

const FormInsideTab = ({ loading, onSubmit }: FormInsideTabProps) => (
  <IressForm onSubmit={onSubmit}>
    <IressStack gap="md">
      <IressFormField
        name="conversation"
        label="Conversation"
        render={(controlledProps) => (
          <IressInput {...controlledProps} rows={5} />
        )}
      />
      <IressButton type="submit" mode="primary">
        {loading ? `Loading...` : `Submit`}
      </IressButton>
    </IressStack>
  </IressForm>
);

export const TabsWithPassedState = () => {
  const [, setSubmission] = useState<FieldValues | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <IressStack gap="md">
      <IressTabSet>
        <IressTab label="Tab 1">
          <FormInsideTab
            loading={loading}
            onSubmit={(data) => {
              setLoading(true);
              setTimeout(() => {
                setSubmission(data);
                setLoading(false);
              }, 1000);
            }}
          />
        </IressTab>
      </IressTabSet>
    </IressStack>
  );
};

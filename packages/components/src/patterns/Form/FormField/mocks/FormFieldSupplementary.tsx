import { IressForm, IressFormField, IressInput, IressText } from '@/main';

export function FormFieldSupplementary() {
  return (
    <IressForm>
      <IressFormField
        label="Comment"
        name="comment"
        hint="Enter your feedback (max 200 characters)"
        render={(controlledProps) => (
          <IressInput
            {...controlledProps}
            rows={3}
            maxLength={200}
            placeholder="Type your comment here..."
          />
        )}
        renderSupplementary={({ value }) => (
          <IressText textStyle="typography.body.sm" color="muted">
            {(value as string)?.length || 0} / 200 characters
          </IressText>
        )}
        rules={{
          maxLength: {
            value: 200,
            message: 'Comment must not exceed 200 characters',
          },
        }}
      />
    </IressForm>
  );
}

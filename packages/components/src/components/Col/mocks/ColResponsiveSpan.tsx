import { IressCol, IressRow, IressStack, IressText } from '@/main';

export function ColResponsiveSpan() {
  return (
    <IressStack gap="spacing.4">
      <IressRow>
        <IressCol span={{ xs: 12, md: 3 }}>
          <IressText>Sidebar (full width on mobile, 3/12 on desktop)</IressText>
        </IressCol>
        <IressCol span={{ xs: 12, md: 9 }}>
          <IressText>Main content (full width on mobile, 9/12 on desktop)</IressText>
        </IressCol>
      </IressRow>
    </IressStack>
  );
}

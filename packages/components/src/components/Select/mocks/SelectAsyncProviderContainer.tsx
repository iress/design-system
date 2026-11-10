import { IressProvider, IressSelect, IressText } from '@/main';
import { useState } from 'react';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';

export function SelectAsyncProviderContainer() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setContainer}>
      <IressProvider popoverContainer={container}>
        <IressSelect
          container={undefined}
          options={() => Promise.resolve(MOCK_LABEL_VALUE_META)}
          placeholder="Search for an option"
          matchActivatorWidth={false}
        />
        <IressText mt="spacing.10">End of app content</IressText>
      </IressProvider>
    </div>
  );
}

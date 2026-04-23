import { useRef, useState } from 'react';
import {
  IressButton,
  IressPopover,
  IressPopoverProvider,
  IressStack,
  IressText,
} from '@/main';

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <IressStack gap="md">
      <IressText>
        The provider below delegates all nested popovers into the green
        container. The second popover overrides the provider&apos;s container
        and renders inline (no portal).
      </IressText>

      <IressPopoverProvider container={container}>
        <IressStack gap="md">
          <IressPopover activator={<IressButton>Uses provider</IressButton>}>
            This popover is rendered inside the provider&apos;s container below.
          </IressPopover>

          <IressPopover
            activator={<IressButton>Overrides provider</IressButton>}
            container={null}
          >
            This popover overrides the provider and renders inline.
          </IressPopover>
        </IressStack>
      </IressPopoverProvider>

      <div
        ref={(node) => {
          containerRef.current = node;
          setContainer(node);
        }}
        style={{
          border: '2px dashed green',
          padding: '16px',
          minHeight: '80px',
        }}
      >
        <IressText>
          <strong>Provider container</strong> — popovers using the provider will
          render here.
        </IressText>
      </div>
    </IressStack>
  );
};

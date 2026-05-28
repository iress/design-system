import { useRef, useState } from 'react';
import {
  IressButton,
  IressTooltip,
  IressTooltipProvider,
  IressStack,
  IressText,
} from '@/main';

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <IressStack gap="md">
      <IressText>
        The provider below delegates all nested tooltips into the green
        container. The second tooltip overrides the provider&apos;s container
        and renders inline (no portal).
      </IressText>

      <IressTooltipProvider container={container}>
        <IressStack gap="md">
          <IressTooltip open tooltipText="Uses provider container">
            <IressButton>Uses provider</IressButton>
          </IressTooltip>

          <IressTooltip
            open
            container={null}
            tooltipText="Renders inline"
          >
            <IressButton>Overrides provider</IressButton>
          </IressTooltip>
        </IressStack>
      </IressTooltipProvider>

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
          <strong>Provider container</strong> — tooltips using the provider will
          render here.
        </IressText>
      </div>
    </IressStack>
  );
};

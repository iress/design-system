import { useRef } from 'react';
import { IressExpander, IressPanel, IressRichSelect } from '@/main';

export const SelectScrollableContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        height: '300px',
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #ccc',
      }}
    >
      {Array.from({ length: 25 }, (_, index) => (
        <IressPanel key={index} background="alt">
          {`scroll up ${index}`}
        </IressPanel>
      ))}
      <IressExpander activator="RichSelect inside expander">
        <IressRichSelect
          placeholder="click me"
          container={containerRef}
          options={() => Promise.resolve([])}
        />
      </IressExpander>
    </div>
  );
};

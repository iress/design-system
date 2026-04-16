import { useRef } from 'react';
import { IressExpander, IressPanel, IressRichSelect } from '@/main';

const NUMERIC_OPTIONS = Array.from({ length: 9 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1,
}));

export const SelectInScrollableExpander = () => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      style={{ height: '400px', overflow: 'auto', border: '1px solid #ccc' }}
    >
      <IressExpander activator="Click to expand">
        <IressRichSelect
          placeholder="Click me"
          container={container}
          initialOptions={NUMERIC_OPTIONS}
          options={async () => Promise.resolve(NUMERIC_OPTIONS)}
        />
      </IressExpander>
      {Array.from({ length: 6 }, (_, index) => (
        <IressPanel key={index} background="alt">
          {`scroll up ${index}`}
        </IressPanel>
      ))}
    </div>
  );
};

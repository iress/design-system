import { type HTMLAttributes, useRef, useState } from 'react';
import { IressButton, IressIcon, IressInline } from '@iress-oss/ids-components';

export function Pre(props: HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const hideCopy = props.className?.includes('language-diff');

  const handleCopy = () => {
    const code = preRef.current?.textContent ?? '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <IressInline noWrap bg="colour.neutral.20" mb="spacing.4">
      <pre ref={preRef} {...props} style={{ flex: 1, marginBlockEnd: 0 }} />
      {!hideCopy && (
        <IressButton
          mode="muted"
          onClick={handleCopy} 
          bg="colour.neutral.20"
        >
          {copied ? (
            'Copied!'
          ) : (
            <IressIcon name="content_copy" screenreaderText="Copy code" />
          )}
        </IressButton>
      )}
      </IressInline>
    </div>
  );
}

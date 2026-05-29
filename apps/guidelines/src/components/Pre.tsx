import { type HTMLAttributes, useRef, useState } from 'react';
import { IressButton, IressIcon } from '@iress-oss/ids-components';

export function Pre(props: HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = preRef.current?.textContent ?? '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <pre ref={preRef} {...props} />
      <IressButton
        mode="muted"
        onClick={handleCopy}
        style={{ position: 'absolute', top: '.5em', right: 0 }}
      >
        {copied ? (
          'Copied!'
        ) : (
          <IressIcon name="content_copy" screenreaderText="Copy code" />
        )}
      </IressButton>
    </div>
  );
}

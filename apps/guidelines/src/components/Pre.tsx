import { type HTMLAttributes, useRef, useState } from 'react';
import { IressButton, IressIcon, IressInline } from '@iress-oss/ids-components';
import { cssVars } from '@iress-oss/ids-tokens';

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
        <style>{`
          .token.deleted {
              color: ${cssVars.colour.system.danger.text};
          }

          .code-line.deleted {
              background-color: ${cssVars.colour.system.danger.surface};
              border-left-color: transparent;
          }

          .token.inserted {
              color: ${cssVars.colour.system.success.text};
          }

          .code-line.inserted {
              background-color: ${cssVars.colour.system.success.surface};
              border-left-color: transparent;
          }
        `}</style>
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

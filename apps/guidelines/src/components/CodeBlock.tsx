import { IressButton, IressCard, IressInline, IressLink } from '@iress-oss/ids-components';

interface CodeBlockProps {
  children: string;
  language?: string;
  chromaticUrl?: string;
}

export function CodeBlock({ children, language, chromaticUrl }: CodeBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
  };

  return (
    <IressCard>
      <pre>
        <code className={language ? `language-${language}` : undefined}>
          {children}
        </code>
      </pre>
      <IressInline gap="sm">
        <IressButton mode="tertiary" compact onClick={handleCopy}>
          Copy
        </IressButton>
        {chromaticUrl && (
          <IressLink href={chromaticUrl} target="_blank" rel="noopener noreferrer">
            View in Storybook
          </IressLink>
        )}
      </IressInline>
    </IressCard>
  );
}

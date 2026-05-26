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
    <div>
      <pre>
        <code className={language ? `language-${language}` : undefined}>
          {children}
        </code>
      </pre>
      <button type="button" onClick={handleCopy}>
        Copy
      </button>
      {chromaticUrl && (
        <a href={chromaticUrl} target="_blank" rel="noopener noreferrer">
          View in Storybook
        </a>
      )}
    </div>
  );
}

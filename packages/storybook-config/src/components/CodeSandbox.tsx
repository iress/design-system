import { use, useEffect } from 'react';
import { IressStorybookContext } from './IressStorybookContext';
import {
  getSandboxUrl,
  type GetSandboxProps,
} from '@iress-oss/ids-storybook-sandbox';

export interface CodeSandboxProps extends GetSandboxProps {
  /**
   * The title to show on the redirect panel
   */
  title?: string;
}

/**
 * Component to redirect the user to a CodeSandbox URL within Storybook.
 */
export const CodeSandbox = ({
  files,
  title = 'Redirecting to CodeSandbox...',
}: CodeSandboxProps) => {
  if (!files) {
    throw new Error('CodeSandbox component requires a "files" prop');
  }

  const { IressPanel } = use(IressStorybookContext);
  const url = getSandboxUrl({ files });

  useEffect(() => {
    if (!url) return;
    window.open(url, '_blank');
  }, [url]);

  return (
    <IressPanel bg="colour.neutral.20" textAlign="center" p="xl" m="xl">
      <h2>{title}</h2>
      <p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Click here to open CodeSandbox
        </a>
        .
      </p>
    </IressPanel>
  );
};

'use client';

import { useState } from 'react';
import { IressLink } from '@iress-oss/ids-components';

const STORYBOOK_BASE_URL =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ||
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

interface StorybookEmbedProps {
  storyId: string;
  height?: number;
  code?: string;
}

export function StorybookEmbed({
  storyId,
  height = 300,
  code,
}: StorybookEmbedProps) {
  const [showCode, setShowCode] = useState(false);
  const iframeSrc = `${STORYBOOK_BASE_URL}/iframe.html?id=${storyId}&viewMode=story&shortcuts=false&singleStory=true`;
  const storyUrl = `${STORYBOOK_BASE_URL}/?path=/story/${storyId}`;

  return (
    <div className="storybook-embed">
      <iframe
        src={iframeSrc}
        width="100%"
        height={height}
        title={storyId}
        loading="lazy"
        className="storybook-embed-iframe"
      />
      <div className="storybook-embed-actions">
        <IressLink href={storyUrl} target="_blank">
          Open in Storybook
        </IressLink>
        {code && (
          <button
            className="storybook-embed-toggle"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        )}
      </div>
      {showCode && code && (
        <pre className="storybook-embed-code">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

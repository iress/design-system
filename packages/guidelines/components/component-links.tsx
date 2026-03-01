'use client';

import {
  IressDivider,
  IressInline,
  IressLink,
  IressPanel,
  IressStack,
  IressTag,
  IressText,
} from '@iress-oss/ids-components';
import { useState } from 'react';

const STORYBOOK_BASE_URL =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ||
  'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

const GITHUB_BASE =
  'https://github.com/iress/design-system/blob/main/packages/components/src/components';

function storybookId(storybookTitle: string): string {
  return storybookTitle
    .replace(/\//g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

interface ComponentLinksProps {
  title: string;
  component: string;
  storybookTitle: string;
}

export function ComponentLinks({
  title,
  component,
  storybookTitle,
}: ComponentLinksProps) {
  const importCode = `import { Iress${title} } from '@iress-oss/ids-components';`;
  const githubUrl = `${GITHUB_BASE}/${component}`;
  const sbId = storybookId(storybookTitle);
  const storybookUrl = `${STORYBOOK_BASE_URL}/?path=/docs/${sbId}--docs`;

  return (
    <IressPanel>
      <IressStack gap="md">
        <IressInline gap="xl" verticalAlign="middle">
          <IressText element="strong" width="input.6">
            Import
          </IressText>
          <IressTag
            onClick={() => navigator.clipboard.writeText(importCode)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigator.clipboard.writeText(importCode);
            }}
            textStyle="typography.code"
          >
            {importCode}
          </IressTag>
        </IressInline>
        <IressDivider />
        <IressInline gap="xl">
          <IressText element="strong" width="input.6">
            Links
          </IressText>
          <IressInline gap="md">
            <IressLink href={githubUrl} target="_blank">
              GitHub
            </IressLink>
            <IressLink href={storybookUrl} target="_blank">
              Storybook
            </IressLink>
          </IressInline>
        </IressInline>
      </IressStack>
    </IressPanel>
  );
}

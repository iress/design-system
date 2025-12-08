import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ADDON_ID, PREVIEW_SNIPPET } from '../constants';
import { useParameter, type API } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { getSandboxUrl } from '../helpers/getSandboxUrl';
import type { AddonConfig, DocsConfig } from '../types';
import { transformCodeWithParameters } from '../helpers/transformCode';
import OpenInCodeSandboxHTML from './OpenInCodeSandbox.html?raw';
import OpenInCodeSandboxTemplate from './OpenInCodeSandbox.template?raw';
import OpenInCodeSandboxCustomTemplate from './OpenInCodeSandboxCustom.template?raw';
import type { IFiles } from 'codesandbox-import-utils/lib/api/define';
import { SandboxIcon } from './SandboxIcon';

interface OpenInCodeSandboxProps {
  active?: boolean;
  api: API;
}

export const OpenInCodeSandbox = ({
  active = true,
  api,
}: OpenInCodeSandboxProps) => {
  const [source, setSource] = useState('');
  const docsConfig = useParameter<DocsConfig>('docs', {});
  const addonConfig = useParameter<AddonConfig>(ADDON_ID, {
    html: OpenInCodeSandboxHTML,
    template: OpenInCodeSandboxTemplate,
  });

  const tsxFiles = useMemo<IFiles>(() => {
    // If no custom source code, use the main template
    if (!docsConfig?.source?.code) {
      return {
        'index.tsx': {
          content: source ?? '',
          isBinary: false,
        },
      } as IFiles;
    }

    // If custom source code exists, use the custom template
    return {
      'index.tsx': {
        content: OpenInCodeSandboxCustomTemplate,
        isBinary: false,
      },
      'component.tsx': {
        content: source,
        isBinary: false,
      },
    };
  }, [docsConfig, source]);

  const handlePreviewSnippet = useCallback(
    (newSource: string) => {
      setSource(
        transformCodeWithParameters(newSource, addonConfig, docsConfig),
      );
    },
    [api, addonConfig, docsConfig],
  );

  useEffect(() => {
    api.getChannel()?.on(PREVIEW_SNIPPET, handlePreviewSnippet);
    return () => api.getChannel()?.off(PREVIEW_SNIPPET, handlePreviewSnippet);
  }, [api, handlePreviewSnippet]);

  if (!active) {
    return null;
  }

  return (
    <IconButton
      key={ADDON_ID}
      title="Open in CodeSandbox"
      onClick={() => {
        window.open(
          getSandboxUrl({
            files: {
              ...tsxFiles,
              'index.html': {
                content: addonConfig?.html ?? OpenInCodeSandboxHTML,
                isBinary: false,
              },
              'package.json': {
                content: JSON.stringify(
                  {
                    dependencies: {
                      react: 'latest',
                      'react-dom': 'latest',
                      ...addonConfig?.dependencies,
                    },
                  },
                  null,
                  2,
                ),
                isBinary: false,
              },
              ...addonConfig?.files,
            },
          }),
          '_blank',
        );
      }}
    >
      <SandboxIcon />
    </IconButton>
  );
};

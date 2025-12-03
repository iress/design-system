import React from 'react';
import { useState } from 'react';
import { SandboxButton } from '../SandboxButton';
import { TooltipLinkList } from 'storybook/internal/components';
import { getUrlWithState } from '../../helpers';
import type { AddonState } from '../../types';

let timeout: NodeJS.Timeout;

interface SandboxShareProps {
  onShare?: () => void;
  state: AddonState;
}

const copyToClipboard = async (
  state: AddonState,
  setCopied: (flag: boolean) => void,
  onShare?: () => void,
  setParams?: (url: URL) => void,
) => {
  await navigator.clipboard.writeText(
    getUrlWithState(state, window.location, setParams),
  );
  setCopied(true);
  timeout = setTimeout(() => setCopied(false), 2000);
  onShare?.();
};

export const SandboxShare = ({ onShare, state }: SandboxShareProps) => {
  const [showCopiedPreview, setShowCopiedPreview] = useState(false);
  const [showCopiedCode, setShowCopiedCode] = useState(false);

  const handleCopyPreview = () => {
    void copyToClipboard(state, setShowCopiedPreview, onShare, (url) => {
      url.pathname = '/iframe.html';
      url.searchParams.set('viewMode', 'story');
    });

    return () => timeout && clearTimeout(timeout);
  };

  const handleCopyCode = () => {
    void copyToClipboard(state, setShowCopiedCode, onShare);

    return () => timeout && clearTimeout(timeout);
  };

  return (
    <SandboxButton
      label="Share"
      icon="share"
      menu={
        <TooltipLinkList
          links={[
            {
              id: 'copy-preview',
              title: showCopiedPreview ? 'Copied!' : 'Share preview only',
              onClick: handleCopyPreview,
            },
            {
              id: 'copy-code',
              title: showCopiedCode ? 'Copied!' : 'Share preview and code',
              onClick: handleCopyCode,
            },
          ]}
        />
      }
    />
  );
};

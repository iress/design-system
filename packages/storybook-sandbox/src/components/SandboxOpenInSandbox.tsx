import React from 'react';
import { getOpenCodeUrl } from '../helpers';
import type { API } from 'storybook/manager-api';
import { SandboxLabel } from './SandboxLabel';

interface SandboxOpenInSandboxProps
  extends Omit<
    React.HTMLAttributes<HTMLAnchorElement>,
    'children' | 'href' | 'onClick'
  > {
  api: API;
  code: string;
  title?: string;
}

export const SandboxOpenInSandbox = ({
  api,
  className,
  code,
  title,
  ...restProps
}: SandboxOpenInSandboxProps) => {
  let openCodeUrl: string;

  try {
    openCodeUrl = getOpenCodeUrl(
      code,
      window.location,
      api.getCurrentStoryData()?.parameters,
    );
  } catch {
    openCodeUrl = '';
  }

  if (!openCodeUrl) {
    return null;
  }

  return (
    <a
      {...restProps}
      className={`sandbox-open-in-sandbox ${className ?? ''}`}
      href={openCodeUrl}
    >
      <SandboxLabel title={title} />
    </a>
  );
};

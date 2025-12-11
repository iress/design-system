import React from 'react';
import { Badge } from 'storybook/internal/components';
import type { AddonConfig } from '../types';
import { useEffect, useState } from 'react';
import { styled } from 'storybook/theming';
import type { API } from 'storybook/manager-api';

const EnvironmentBadge = styled.span({
  marginInlineStart: '0.3em',
  fontSize: '0.85em',
});

interface VersionBadgeProps extends AddonConfig {
  api: API;
}

export const VersionBadge = ({
  api,
  environment,
  version = '',
}: VersionBadgeProps) => {
  const [badgeVersion, setBadgeVersion] = useState<string>('');
  const [badgeEnvironment, setBadgeEnvironment] = useState<string>('');

  const urlState = api?.getUrlState();
  let currentRef: string | undefined;

  if (urlState) {
    const { path, viewMode } = urlState;
    const refs = api.getRefs();
    const pathMinusViewMode = path.replace(`/${viewMode}/`, '');
    currentRef = Object.values(refs).find((ref) =>
      pathMinusViewMode.startsWith(`${ref.id}_`),
    )?.id;
  }

  useEffect(() => {
    const fetchEnvironment = async () => {
      if (typeof environment === 'function') {
        const result = await environment();
        setBadgeEnvironment(result);
      } else if (environment) {
        setBadgeEnvironment(environment);
      }
    };

    void fetchEnvironment();
  }, [environment]);

  useEffect(() => {
    const fetchVersion = async () => {
      if (typeof version === 'function') {
        const result = await version(currentRef);
        setBadgeVersion(result);
      } else {
        setBadgeVersion(version);
      }
    };

    void fetchVersion();
  }, [version, currentRef]);

  if (!badgeVersion) {
    return null;
  }

  return (
    <div className="version-badge">
      <Badge status="neutral">{badgeVersion}</Badge>{' '}
      {badgeEnvironment && (
        <EnvironmentBadge>{badgeEnvironment}</EnvironmentBadge>
      )}
    </div>
  );
};

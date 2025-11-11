import { Badge } from 'storybook/internal/components';
import type { AddonConfig } from '../types';
import { useEffect, useState } from 'react';
import { styled } from 'storybook/theming';

const EnvironmentBadge = styled.span({
  marginInlineStart: '0.3em',
  fontSize: '0.85em',
});

export const VersionBadge = ({
  environment,
  version = '0.0.0',
}: AddonConfig) => {
  const [badgeVersion, setBadgeVersion] = useState<string>('');
  const [badgeEnvironment, setBadgeEnvironment] = useState<string>('');

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
        const result = await version();
        setBadgeVersion(result);
      } else {
        setBadgeVersion(version);
      }
    };

    void fetchVersion();
  }, [version]);

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

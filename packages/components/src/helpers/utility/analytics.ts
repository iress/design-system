import type { IressAnalyticsMetadata } from '@/interfaces';

const trimValue = (value: string | undefined) => value?.trim();

export const createAnalyticsAttribute = (
  analytics?: IressAnalyticsMetadata,
) => {
  if (!analytics) return undefined;

  const page = trimValue(analytics.page);
  const action = trimValue(analytics.action);
  const target = trimValue(analytics.target);

  if (!page || !action) return undefined;

  return [page, action, target].filter(Boolean).join('-');
};

export const resolveAnalyticsAttribute = (
  analytics: IressAnalyticsMetadata | undefined,
  existingAttribute?: string,
) => existingAttribute ?? createAnalyticsAttribute(analytics);

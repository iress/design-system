import type { IressAnalyticsMetadata, IressAnalyticsProps } from '@/interfaces';

const trimValue = (value: string | undefined) => value?.trim();

interface ResolveAnalyticsAttributeOptions {
  generateFromAnalytics?: boolean;
}

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
  {
    analytics,
    'data-analytics': explicitAttribute,
  }: Pick<IressAnalyticsProps, 'analytics' | 'data-analytics'>,
  { generateFromAnalytics = true }: ResolveAnalyticsAttributeOptions = {},
) => {
  if (explicitAttribute !== undefined) return explicitAttribute;
  return generateFromAnalytics
    ? createAnalyticsAttribute(analytics)
    : undefined;
};

import type { IressAnalyticsMetadata, IressAnalyticsProps } from '@/interfaces';

const trimValue = (value: string | undefined) => value?.trim();

export interface ResolveAnalyticsAttributeOptions {
  generateFromAnalytics?: boolean;
}

type AnalyticsAttributeProps = Pick<
  IressAnalyticsProps,
  'analytics' | 'data-analytics'
>;

type AnalyticsResolvable =
  | AnalyticsAttributeProps
  | IressAnalyticsMetadata
  | undefined;

const isAnalyticsAttributeProps = (
  value: AnalyticsResolvable,
): value is AnalyticsAttributeProps =>
  !!value &&
  typeof value === 'object' &&
  ('analytics' in value || 'data-analytics' in value);

const hasTopLevelAnalyticsMetadata = (
  value: AnalyticsResolvable,
): value is IressAnalyticsMetadata =>
  !!value && typeof value === 'object' && 'page' in value && 'action' in value;

const isResolveAnalyticsAttributeOptions = (
  value: string | ResolveAnalyticsAttributeOptions | undefined,
): value is ResolveAnalyticsAttributeOptions =>
  !!value && typeof value === 'object';

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

export function resolveAnalyticsAttribute(
  analytics?: IressAnalyticsMetadata,
  existingAttribute?: string,
): string | undefined;
export function resolveAnalyticsAttribute(
  props?: AnalyticsAttributeProps,
  options?: ResolveAnalyticsAttributeOptions,
): string | undefined;
export function resolveAnalyticsAttribute(
  value?: AnalyticsResolvable,
  existingAttributeOrOptions?: string | ResolveAnalyticsAttributeOptions,
) {
  if (typeof existingAttributeOrOptions === 'string') {
    return existingAttributeOrOptions;
  }

  if (isAnalyticsAttributeProps(value)) {
    if (value['data-analytics'] !== undefined) {
      return value['data-analytics'];
    }

    if (value.analytics !== undefined) {
      return isResolveAnalyticsAttributeOptions(existingAttributeOrOptions) &&
        existingAttributeOrOptions.generateFromAnalytics === false
        ? undefined
        : createAnalyticsAttribute(value.analytics);
    }
  }

  return hasTopLevelAnalyticsMetadata(value)
    ? createAnalyticsAttribute(value)
    : undefined;
}

export const resolveAnalyticsAttributeFromProps = (
  props: AnalyticsAttributeProps,
  options?: ResolveAnalyticsAttributeOptions,
) => resolveAnalyticsAttribute(props, options);

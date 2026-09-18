import { describe, expect, it } from 'vitest';
import { resolveAnalyticsAttribute as publicResolveAnalyticsAttribute } from '../../main';
import {
  createAnalyticsAttribute,
  resolveAnalyticsAttribute,
} from './analytics';

describe('analytics utilities', () => {
  describe('createAnalyticsAttribute', () => {
    it('joins page and action values', () => {
      expect(
        createAnalyticsAttribute({
          page: 'summary',
          action: 'save-draft',
        }),
      ).toBe('summary-save-draft');
    });

    it('includes target when provided', () => {
      expect(
        createAnalyticsAttribute({
          page: 'actions',
          action: 'approve',
          target: 'item',
        }),
      ).toBe('actions-approve-item');
    });

    it('returns undefined when page or action are blank', () => {
      expect(
        createAnalyticsAttribute({
          page: '  ',
          action: 'save-draft',
        }),
      ).toBeUndefined();
      expect(
        createAnalyticsAttribute({
          page: 'summary',
          action: '  ',
        }),
      ).toBeUndefined();
    });
  });

  describe('resolveAnalyticsAttribute', () => {
    it('prefers an explicit data-analytics attribute', () => {
      expect(
        resolveAnalyticsAttribute({
          analytics: {
            page: 'summary',
            action: 'save-draft',
          },
          'data-analytics': 'manually-set',
        }),
      ).toBe('manually-set');
    });

    it('can skip generating a value from analytics metadata', () => {
      expect(
        resolveAnalyticsAttribute(
          {
            analytics: {
              page: 'summary',
              action: 'save-draft',
            },
          },
          { generateFromAnalytics: false },
        ),
      ).toBeUndefined();
    });

    it('is available from the public package entry point', () => {
      expect(
        publicResolveAnalyticsAttribute({
          analytics: {
            page: 'summary',
            action: 'save-draft',
          },
        }),
      ).toBe('summary-save-draft');
    });
  });
});

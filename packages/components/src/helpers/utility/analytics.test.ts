import { describe, expect, it } from 'vitest';
import type { IressAnalyticsProps } from '@/interfaces';
import {
  resolveAnalyticsAttribute as publicResolveAnalyticsAttribute,
  resolveAnalyticsAttributeFromProps as publicResolveAnalyticsAttributeFromProps,
} from '../../main';
import {
  createAnalyticsAttribute,
  resolveAnalyticsAttribute,
  resolveAnalyticsAttributeFromProps,
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
    it('supports the original metadata and explicit attribute signature', () => {
      expect(
        resolveAnalyticsAttribute(
          {
            page: 'summary',
            action: 'save-draft',
          },
          'manually-set',
        ),
      ).toBe('manually-set');
    });

    it('supports the original explicit attribute signature without analytics metadata', () => {
      expect(resolveAnalyticsAttribute(undefined, 'manually-set')).toBe(
        'manually-set',
      );
    });

    it('supports the props-based helper signature', () => {
      expect(
        resolveAnalyticsAttribute({
          analytics: {
            page: 'summary',
            action: 'save-draft',
          },
        }),
      ).toBe('summary-save-draft');
    });

    it('supports legacy metadata objects with additional fields', () => {
      expect(
        resolveAnalyticsAttribute({
          page: 'outer-page',
          action: 'outer-action',
          id: 'button-id',
        } as IressAnalyticsProps & {
          action: string;
          id: string;
          page: string;
        }),
      ).toBe('outer-page-outer-action');
    });

    it('prefers top-level metadata when a widened legacy object includes an undefined analytics prop', () => {
      expect(
        resolveAnalyticsAttribute({
          analytics: undefined,
          page: 'summary',
          action: 'save-draft',
        } as IressAnalyticsProps & { action: string; page: string }),
      ).toBe('summary-save-draft');
    });

    it('is available from the public package entry point', () => {
      expect(
        publicResolveAnalyticsAttribute({
          page: 'summary',
          action: 'save-draft',
        }),
      ).toBe('summary-save-draft');
    });
  });

  describe('resolveAnalyticsAttributeFromProps', () => {
    it('prefers analytics props even when wider objects include page and action fields', () => {
      expect(
        resolveAnalyticsAttributeFromProps({
          analytics: {
            page: 'summary',
            action: 'save-draft',
          },
          'data-analytics': 'manually-set',
          page: 'outer-page',
          action: 'outer-action',
        } as IressAnalyticsProps & { page: string; action: string }),
      ).toBe('manually-set');
    });

    it('prefers an explicit data-analytics attribute', () => {
      expect(
        resolveAnalyticsAttributeFromProps({
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
        resolveAnalyticsAttributeFromProps(
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
        publicResolveAnalyticsAttributeFromProps({
          analytics: {
            page: 'summary',
            action: 'save-draft',
          },
        }),
      ).toBe('summary-save-draft');
    });
  });
});

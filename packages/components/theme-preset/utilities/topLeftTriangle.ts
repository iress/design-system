import { defineUtility } from '@pandacss/dev';
import { spacing } from '../tokens/spacing';
import { colors } from '../tokens/colors';
import { cssVars } from '@iress-oss/ids-tokens';

export const topLeftTriangle = defineUtility({
  className: 'triangle',
  values: { type: 'boolean' },
  transform: (value) => {
    if (value !== true) {
      return {
        display: 'none',
      };
    }

    return {
      '&:before': {
        content: `''` as never,
        position: 'absolute',
        top: spacing['spacing.0'].value,
        left: spacing['spacing.0'].value,
        width: `calc(${cssVars.typography.base.size} * 2)`,
        height: `calc(${cssVars.typography.base.size} * 2)`,
        backgroundColor: 'currentColor',
        clipPath: 'polygon(0 0, 100% 0, 0% 100%)',
        borderTopLeftRadius: '0.3rem',
      },
    };
  },
});

export const checkmark = defineUtility({
  className: 'checkmark',
  values: { type: 'boolean' },
  transform: (value) => {
    if (value !== true) {
      return {
        display: 'none',
      };
    }

    return {
      '&[data-checked="true"]': {
        display: 'flex',
        position: 'absolute',
        top: `calc(${cssVars.typography.base.size} * (2/14))`,
        left: '0',
        zIndex: '100',
        color: colors['colour.neutral.10'].value,
        width: cssVars.typography.base.size,
        height: cssVars.typography.base.size,
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&:hover': {
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
        },
      },
    };
  },
});

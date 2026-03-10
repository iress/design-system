import { defineUtility } from '@pandacss/dev';
import { sizes } from '../tokens/sizes';
import { cssVars } from '@iress-oss/ids-tokens';

export const selectChevron = defineUtility({
  className: 'selectChevron',
  values: { type: 'boolean' },
  transform: (value) => {
    return {
      '&:after': {
        content: `''` as never,
        width: sizes['chevron.select'].value,
        height: sizes['chevron.select'].value,
        top: '50%',
        insetInlineEnd: `calc(${cssVars.spacing[2]} + calc(0.25 * ${cssVars.spacing[2]}))`,
        position: 'absolute',
        mask: `no-repeat center / contain url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        transform:
          value === true
            ? 'translateY(-50%)'
            : 'translateY(-50%) rotate(180deg)',
        backgroundColor: `var(--iress-chevron-color, ${cssVars.colour.neutral[90]})`,
        pointerEvents: 'none',
      },
      '&[aria-expanded="true"]:after, [aria-expanded="true"] > &:after': {
        transform:
          value === true
            ? 'translateY(-50%) rotate(180deg)'
            : 'translateY(-50%)',
      },
    };
  },
});

import { defineUtility } from '@pandacss/dev';
import { borders } from '../tokens/borders';
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

export const selectChevronRtl = defineUtility({
  className: 'selectChevronRtl',
  values: { type: 'boolean' },
  transform: (value) => {
    if (value !== true) {
      return {
        content: `''` as never,
        width: sizes['chevron.select'].value,
        height: sizes['chevron.select'].value,
        top: '50%',
        insetInlineEnd: `calc(${cssVars.spacing[2]} + calc(0.25 * ${cssVars.spacing[2]}))`,
        position: 'absolute',
        border: `${borders.input.value.width} ${borders.input.value.style} ${borders.input.value.color}`,
        borderBlockStart: 'none',
        borderInlineStart: 'none',
        transform: 'translateY(-50%) rotate(135deg)',
        pointerEvents: 'none',
      };
    }

    return {
      '&:after': {
        content: `''` as never,
        width: sizes['chevron.select'].value,
        height: sizes['chevron.select'].value,
        top: '50%',
        insetInlineEnd: `calc(${cssVars.spacing[2]} + calc(0.25 * ${cssVars.spacing[4]}))`,
        position: 'absolute',
        border: `${borders.input.value.width} ${borders.input.value.style} ${borders.input.value.color}`,
        borderBlockStart: 'none',
        borderInlineStart: 'none',
        transform: 'translateY(-50%) rotate(-45deg)',
        pointerEvents: 'none',
      },
    };
  },
});

export const tableChevron = defineUtility({
  className: 'tableChevron',
  values: { type: 'boolean' },
  transform: (value) => {
    if (value !== true) {
      return {
        '&:after': {
          content: `''`,
          width: '.6em',
          height: '.6em',
          top: '45%',
          borderBottom: '1.5px solid',
          borderRight: '1.5px solid',
          borderBottomRightRadius: '1.5px',
          borderColor: 'currentColor',
          transformOrigin: 'center',
          pointerEvents: 'none',
          transform: 'translateY(-30%) rotate(-135deg)',
          transition: 'transform 0.3s ease',
          display: 'inline-block',
          verticalAlign: 'text-bottom',
          marginInlineStart: `${cssVars.spacing[2]}`,
        },
      };
    }

    return {
      '&:after': {
        content: `''`,
        width: '.6em',
        height: '.6em',
        borderBottom: '1.5px solid',
        borderRight: '1.5px solid',
        borderBottomRightRadius: '1.5px',
        borderColor: 'currentColor',
        transformOrigin: 'center',
        pointerEvents: 'none',
        transform: 'translateY(-90%) rotate(45deg)',
        transition: 'transform 0.3s ease',
        display: 'inline-block',
        verticalAlign: 'text-bottom',
        marginInlineStart: `${cssVars.spacing[2]}`,
      },
    };
  },
});

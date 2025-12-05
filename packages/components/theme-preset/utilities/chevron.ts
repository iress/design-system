import { defineUtility } from '@pandacss/dev';
import { borders } from '../tokens/borders';
import { sizes } from '../tokens/sizes';
import { spacing } from '../tokens/spacing';

export const selectChevron = defineUtility({
  className: 'selectChevron',
  values: { type: 'boolean' },
  transform: (value) => {
    if (value !== true) {
      return {
        content: `''` as never,
        width: sizes['chevron.select'].value,
        height: sizes['chevron.select'].value,
        top: '50%',
        insetInlineEnd: `calc(${spacing['spacing.2'].value} + calc(0.25 * ${spacing['spacing.2'].value}))`,
        position: 'absolute',
        border: `${borders.input.value.width} ${borders.input.value.style} ${borders.input.value.color}`,
        borderBlockStart: 'none',
        borderInlineStart: 'none',
        transform: 'translateY(-50%) rotate(-135deg)',
        pointerEvents: 'none',
      };
    }

    return {
      '&:after': {
        content: `''` as never,
        width: sizes['chevron.select'].value,
        height: sizes['chevron.select'].value,
        top: '50%',
        insetInlineEnd: `calc(${spacing['spacing.2'].value} + calc(0.25 * ${spacing['spacing.2'].value}))`,
        position: 'absolute',
        border: `${borders.input.value.width} ${borders.input.value.style} ${borders.input.value.color}`,
        borderBlockStart: 'none',
        borderInlineStart: 'none',
        transform: 'translateY(-50%) rotate(45deg)',
        pointerEvents: 'none',
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
        insetInlineEnd: `calc(${spacing['spacing.2'].value} + calc(0.25 * ${spacing['spacing.4'].value}))`,
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
        insetInlineEnd: `calc(${spacing['spacing.2'].value} + calc(0.25 * ${spacing['spacing.4'].value}))`,
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
          marginInlineStart: `${spacing['spacing.2'].value}`,
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
        marginInlineStart: `${spacing['spacing.2'].value}`,
      },
    };
  },
});

import { sva } from '@/styled-system/css';

export const selectTags = sva({
  slots: ['root', 'placeholder', 'prepend', 'append', 'tag', 'tagsList'],
  base: {
    root: {
      // Performance: CSS containment limits style recalculation scope
      contain: 'layout style paint',
      display: 'flex',
      alignItems: 'center',
      width: '[100%]',
      paddingBlock: 'spacing.1',
      paddingInline: 'spacing.2',
      minHeight: 'input.height',
      alignSelf: 'auto',
      backgroundColor: 'colour.neutral.10',
      border: 'input',
      borderRadius: 'radius.system.form',
      color: 'colour.neutral.80',
      textAlign: 'left',
      fontWeight: 'normal',
      cursor: 'pointer',
      focusable: 'select-activator',

      transition: '[all 0.3s ease]',

      '&:has(.tag)': {
        cursor: 'inherit',

        '& .append': {
          cursor: 'pointer',
        },
      },
    },
    placeholder: {
      color: 'colour.neutral.60',
      textAlign: 'left',
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      textStyle: 'typography.body.md',
    },
    prepend: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'spacing.0',
      color: 'colour.neutral.70',
    },
    append: {},
    tag: {
      display: 'inline-flex',
    },
    tagsList: {
      overflow: 'hidden',
      flex: '1',
    },
  },
  variants: {
    showDefaultChevron: {
      true: {
        root: {
          alignSelf: 'center',
          position: 'relative',
        },
        append: {
          selectChevron: true,
        },
      },
      false: {
        append: {},
      },
    },
  },
});

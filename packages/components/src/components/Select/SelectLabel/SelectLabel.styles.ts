import { sva } from '@/styled-system/css';

export const selectLabel = sva({
  slots: ['selectLabel', 'contents', 'placeholder', 'prepend', 'append'],
  base: {
    selectLabel: {
      display: 'flex',
      width: '[100%]',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 'input.height',
      paddingInline: 'spacing.2',
      paddingBlock: 'spacing.0',
      backgroundColor: 'colour.neutral.10',
      border: 'input',
      borderRadius: 'radius.system.form',
      boxSizing: 'border-box',
      textStyle: 'typography.body.md',
      color: 'colour.neutral.80',
      cursor: 'pointer',
      transition: 'common',
      focusable: 'select-activator',
    },
    contents: {
      textStyle: 'inherit',
      color: '[inherit]',
      backgroundColor: 'transparent',
      textAlign: 'left',
      borderWidth: '0',
      flex: '1',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      padding: '[0]',
    },
    placeholder: {
      color: 'colour.neutral.60',
      textAlign: 'left',
      textStyle: 'typography.body.md',
    },
    prepend: {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'colour.neutral.40',
      gap: 'spacing.1',
    },
    append: {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'colour.neutral.70',
      gap: 'spacing.1',
      marginInlineEnd: 'spacing.1',
      pointerEvents: 'none',
    },
  },
  variants: {
    showDefaultChevron: {
      true: {
        selectLabel: {
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

import { sva } from '@/styled-system/css';

export const dropdownMenu = sva({
  slots: [
    'root',
    'activator',
    'searchHeader',
    'searchInput',
    'optionList',
    'optionContent',
    'optionMeta',
    'optionMetaText',
    'reset',
    'noResults',
    'popoverContent',
  ],
  base: {
    root: {},
    activator: {
      appearance: 'none',
      color: 'colour.neutral.90',
      bg: 'colour.neutral.10',
      border: 'input',
      pl: 'spacing.3',
      pr: 'spacing.8',
      textStyle: 'typography.body.md.medium',
      minHeight: 'input.height',
      borderRadius: 'radius.system.form',
      cursor: 'pointer',
      focusable: 'select-activator',
      display: 'inline-flex',
      gap: 'spacing.2',
      alignItems: 'center',
      position: 'relative',
      selectChevron: true,

      _rtl: {
        pr: 'spacing.3',
        pl: 'spacing.8',
      },
    },
    searchHeader: {},
    searchInput: {},
    optionList: {
      _empty: {
        display: 'none',
      },
    },
    optionContent: {
      flex: '[1 1 auto]',
      flexDirection: 'column',
    },
    optionMeta: {
      display: 'block',
    },
    optionMetaText: {
      fontWeight: 'normal',
      color: 'colour.neutral.60',
    },
    reset: {
      minHeight: 'auto',
      m: 'spacing.2',
    },
    noResults: {},
    popoverContent: {
      maxHeight: 'overlay.sm',
      scrollable: 'y',
      maxWidth: '[none]',
    },
  },
  variants: {},
  compoundVariants: [],
});

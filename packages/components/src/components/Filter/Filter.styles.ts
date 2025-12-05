import { sva } from '@/styled-system/css';

export const filter = sva({
  slots: [
    'root',
    'chevron',
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
    chevron: {
      selectChevron: true,
      marginInlineStart: 'spacing.2',

      _rtl: {
        selectChevronRtl: true,
      },
    },
    searchInput: {
      minWidth: '[270px]',
      position: 'relative',
      '&:not(:last-child)': {
        marginBottom: 'spacing.4',
      },
      '& .ids-spinner': {
        position: 'absolute',
        right: 'spacing.5',
      },
    },
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
    },
    noResults: {},
    popoverContent: {
      maxHeight: 'overlay.sm',
      overflowY: 'auto',
    },
  },
  variants: {},
  compoundVariants: [],
});

export type FilterVariants = Parameters<typeof filter>[0];

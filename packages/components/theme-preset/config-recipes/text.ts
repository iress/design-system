import { defineRecipe, SystemStyleObject } from '@pandacss/dev';

const inlineStyles = {
  '& code': {
    textStyle: 'typography.code',
    paddingBlock: 'spacing.000',
    paddingInline: 'spacing.100',
    background: 'colour.neutral.20',
    color: 'colour.neutral.80',
    borderWidth: '0.5px',
    borderColor: 'colour.neutral.30',
    borderRadius: 'radius.025',
    alignSelf: 'flex-start',
  },
  '& small': {
    textStyle: 'typography.body.sm',
  },
  '& cite': {
    textStyle: 'typography.body.sm',
  },
  '& caption:not(table[class] *)': {
    textStyle: 'typography.body.sm',
    display: 'block',
  },
  '& a:not([class])': {
    color: 'colour.primary.text',
    textDecoration: 'underline',
    _hover: {
      textDecoration: 'none',
    },
  },
} satisfies SystemStyleObject;

const blockStyles = {
  '& h1': {
    textStyle: 'typography.heading.1',
  },
  '& h2': {
    textStyle: 'typography.heading.2',
  },
  '& h3': {
    textStyle: 'typography.heading.3',
  },
  '& h4': {
    textStyle: 'typography.heading.4',
  },
  '& h5': {
    textStyle: 'typography.heading.5',
  },
  '& h6': {
    textStyle: 'typography.body.md.strong',
  },
  _nestedHeadings: {
    marginBlockStart: 'spacing.400',
    marginBlockEnd: 'spacing.200',
    '&:first-child': {
      marginBlockStart: 'spacing.000',
    },
    '&:has(+ p)': {
      marginBlockEnd: 'spacing.100',
    },
    '& + p': {
      marginBlockStart: 'spacing.100',
    },
    '& *': {
      fontSize: 'inherit',
    },
    '& code': {
      fontSize: '0.9em !important', // TODO: Remove this when we have a better solution for code in headings
    },
  },
  '& p': {
    marginBlock: 'spacing.400',
    _siblingHeadings: {
      marginBlockStart: 'spacing.800',
    },
    '&:first-child': {
      marginBlockStart: 'spacing.000',
    },
    '&:last-child': {
      marginBlockEnd: 'spacing.000',
    },
  },
  '& blockquote': {
    fontStyle: 'italic',
    marginBlockStart: '[0px]',
    marginInlineStart: '[0px]',
    position: 'relative',
    paddingInlineStart: 'spacing.700',
    _after: {
      content: `''`,
      backgroundColor: 'colour.neutral.30',
      width:
        'var(--iress-blockquote-border-width, var(--iress-text-blockquote-border-width, var(--iress-default-border-width--lg, 5px)))',
      insetBlockStart: '[0px]',
      insetInlineStart: '[0px]',
      position: 'absolute',
      height: '[100%]',
    },
  },
  '& hr': {
    border: 0,
    borderBlockStart: 'divider',
    marginBlock: 'spacing.600',
  },
  '& ul': {
    listStyleType: 'disc',
    marginBlockEnd: 'spacing.400',
    paddingInlineStart: 'spacing.400',
    '& > li': {
      marginBlockEnd: 'spacing.100',
    },
    _siblingHeadings: {
      marginBlockStart: 'spacing.800',
    },
  },
  '& ol': {
    listStyleType: 'decimal',
    marginBlockEnd: 'spacing.400',
    paddingInlineStart: 'spacing.600',
    '& > li': {
      marginBlockEnd: 'spacing.100',
    },
    _siblingHeadings: {
      marginBlockStart: 'spacing.800',
    },
  },
  '& table:not([class])': {
    border: 'none',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    minWidth: '100%',
    mb: 'xl',

    '& th, & td': {
      paddingInline: 'spacing.100',
      paddingBlock: 'spacing.400',
      border: 'table',
      borderLeftWidth: '0px',
      borderRightWidth: '0px',
    },

    '& th:first-child, & td:first-child': {
      paddingInlineStart: 'spacing.000',
    },

    '& th:last-child, & td:last-child': {
      paddingInlineEnd: 'spacing.000',
    },

    '& th': {
      textAlign: 'start',
      textStyle: 'typography.regular.md.strong',
    },

    '& thead th': {
      textStyle: 'typography.heading.5',
    },

    '& thead tr:first-child th, & thead tr:first-child td, &:not(:has(thead)) tbody tr:first-child th, &:not(:has(thead)) tbody tr:first-child td':
      {
        borderTopWidth: '0px',
      },

    '& tfoot tr:last-child th, & tfoot tr:last-child td, &:not(:has(tfoot)) tbody tr:last-child th, &:not(:has(tfoot)) tbody tr:last-child td':
      {
        borderBottomWidth: '0px',
      },
  },
  '& pre:not(:has(.docblock-source:only-child), [class], .sbdocs-diff-viewer *)':
    {
      textStyle: 'typography.code',
      paddingBlock: 'spacing.200',
      paddingInline: 'spacing.200',
      background: 'colour.neutral.20',
      color: 'colour.neutral.80',
      borderWidth: '0.5px',
      borderColor: 'colour.neutral.30',
      borderRadius: 'radius.system.form',
      overflow: 'auto',
    },
} satisfies SystemStyleObject;

export const textRecipe = defineRecipe({
  className: 'text',
  description:
    'The styles for an element that displays text based on the design system guidelines.',
  base: {
    color: 'colour.neutral.80',
    textStyle: 'typography.body.md',
  },
  variants: {
    /**
     * The HTML element that should be rendered.
     */
    element: {
      p: {
        marginBlockEnd: 'spacing.200',
      },
      div: blockStyles,
      span: {},
      h1: blockStyles['& h1'],
      h2: blockStyles['& h2'],
      h3: blockStyles['& h3'],
      h4: blockStyles['& h4'],
      h5: blockStyles['& h5'],
      h6: blockStyles['& h6'],
      code: inlineStyles['& code'],
      small: inlineStyles['& small'],
      cite: inlineStyles['& cite'],
      caption: inlineStyles['& caption:not(table[class] *)'],
      strong: {
        textStyle: 'typography.body.md.strong',
      },
      em: {
        textStyle: 'typography.body.md.em',
      },
      a: inlineStyles['& a:not([class])'],
      blockquote: blockStyles['& blockquote'],
      pre: blockStyles[
        '& pre:not(:has(.docblock-source:only-child), [class], .sbdocs-diff-viewer *)'
      ],
    },
  },
  compoundVariants: [
    {
      element: ['p', 'div', 'span'],
      css: inlineStyles,
    },
  ],
  defaultVariants: {
    element: 'div',
  },
  staticCss: ['*'],
});

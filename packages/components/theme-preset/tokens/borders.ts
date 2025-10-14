import { cssVars } from '@iress-oss/ids-tokens';
import { Tokens } from '@pandacss/dev';

export const borders = {
  alert: {
    description: 'Used for alert borders',
    value: {
      width: '0.5px',
      style: 'solid',
      color: 'currentColor',
    },
  },
  divider: {
    description: 'Used to divide content',
    value: {
      width: '1px',
      style: 'solid',
      color: cssVars.colour.neutral['30'],
    },
  },
  input: {
    description: 'Border for input fields',
    value: {
      width: '1px',
      style: 'solid',
      color: cssVars.colour.neutral['70'],
    },
  },
  placeholder: {
    description: 'Used for placeholders',
    value: {
      width: '1.5px',
      style: 'solid',
      color: cssVars.colour.neutral['30'],
    },
  },
  hover: {
    description: 'Used when hovering over elements such as expanders',
    value: {
      width: '1px',
      style: 'solid',
      color: cssVars.colour.primary.fill,
    },
  },
  table: {
    description: 'Used for tables',
    value: {
      width: '1px',
      style: 'solid',
      color: cssVars.colour.neutral['40'],
    },
  },
} satisfies Tokens['borders'];

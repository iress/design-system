import { type CompositionStyles, defineTextStyles } from '@pandacss/dev';
import { typography, cssVars } from '@iress-oss/ids-tokens';
import { type UtilityValues } from '@/styled-system/types/prop-type';

export const textCompositions: CompositionStyles['textStyles'] = {
  'typography.heading.1': {
    description: typography.heading['1'].$description,
    value: {
      font: cssVars.typography.heading['1'],
    },
  },
  'typography.heading.2': {
    description: typography.heading['2'].$description,
    value: {
      font: cssVars.typography.heading['2'],
    },
  },
  'typography.heading.3': {
    description: typography.heading['3'].$description,
    value: {
      font: cssVars.typography.heading['3'],
    },
  },
  'typography.heading.4': {
    description: typography.heading['4'].$description,
    value: {
      font: cssVars.typography.heading['4'],
    },
  },
  'typography.heading.5': {
    description: typography.heading['5'].$description,
    value: {
      font: cssVars.typography.heading['5'],
    },
  },
  'typography.body.sm': {
    description: typography.body.sm.$description,
    value: {
      font: cssVars.typography.body.sm.regular,
      '& strong': {
        font: cssVars.typography.body.sm.strong,
      },
      '& em': {
        font: cssVars.typography.body.sm.em,
      },
      '& code': {
        fontSize: '0.9em !important',
      },
    },
  },
  'typography.body.sm.regular': {
    description: typography.body.sm.regular.$description,
    value: {
      font: cssVars.typography.body.sm.regular,
    },
  },
  'typography.body.sm.medium': {
    description: typography.body.sm.medium.$description,
    value: {
      font: cssVars.typography.body.sm.medium,
    },
  },
  'typography.body.sm.strong': {
    description: typography.body.sm.strong.$description,
    value: {
      font: cssVars.typography.body.sm.strong,
    },
  },
  'typography.body.sm.em': {
    description: typography.body.sm.em.$description,
    value: {
      font: cssVars.typography.body.sm.em,
    },
  },
  'typography.body.md.regular': {
    description: typography.body.md.regular.$description,
    value: {
      font: cssVars.typography.body.md.regular,
    },
  },
  'typography.body.md': {
    description: typography.body.md.$description,
    value: {
      font: cssVars.typography.body.md.regular,
      '& strong': {
        font: cssVars.typography.body.md.strong,
      },
      '& em': {
        font: cssVars.typography.body.md.em,
      },
      '& code': {
        fontSize: '0.9em !important',
      },
    },
  },
  'typography.body.md.medium': {
    description: typography.body.md.medium.$description,
    value: {
      font: cssVars.typography.body.md.medium,
    },
  },
  'typography.body.md.strong': {
    description: typography.body.md.strong.$description,
    value: {
      font: cssVars.typography.body.md.strong,
    },
  },
  'typography.body.md.em': {
    description: typography.body.md.em.$description,
    value: {
      font: cssVars.typography.body.md.em,
    },
  },
  'typography.body.lg': {
    description: typography.body.lg.$description,
    value: {
      font: cssVars.typography.body.lg.regular,
      '& strong': {
        font: cssVars.typography.body.lg.strong,
      },
      '& em': {
        font: cssVars.typography.body.lg.em,
      },
      '& code': {
        fontSize: '0.9em !important',
      },
    },
  },
  'typography.body.lg.regular': {
    description: typography.body.lg.regular.$description,
    value: {
      font: cssVars.typography.body.lg.regular,
    },
  },
  'typography.body.lg.medium': {
    description: typography.body.lg.medium.$description,
    value: {
      font: cssVars.typography.body.lg.medium,
    },
  },
  'typography.body.lg.strong': {
    description: typography.body.lg.strong.$description,
    value: {
      font: cssVars.typography.body.lg.strong,
    },
  },
  'typography.body.lg.em': {
    description: typography.body.lg.em.$description,
    value: {
      font: cssVars.typography.body.lg.em,
    },
  },
  'typography.code': {
    description: typography.code.$description,
    value: {
      font: cssVars.typography.code,
    },
  },
};

export const textStyles = defineTextStyles(textCompositions);

export const TEXT_STYLES = Object.keys(
  textCompositions,
) as unknown as UtilityValues['textStyle'][];

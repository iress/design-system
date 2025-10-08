import { Type } from '../enums';
import {
  type IressDesignTokenGroup,
  type IressDesignToken,
} from '../interfaces';

interface SpacingSchema extends IressDesignTokenGroup {
  '000': IressDesignToken;
  100: IressDesignToken;

  // Relative values
  '050': IressDesignToken;
  150: IressDesignToken;
  200: IressDesignToken;
  250: IressDesignToken;
  300: IressDesignToken;
  350: IressDesignToken;
  400: IressDesignToken;
  500: IressDesignToken;
  600: IressDesignToken;
  700: IressDesignToken;
  800: IressDesignToken;
  900: IressDesignToken;
  1000: IressDesignToken;
  1200: IressDesignToken;
}

const baseSpacing = '.25rem';

const spacing = {
  $description:
    'Spacing is the distance between elements. It is used to create visual balance and hierarchy in the UI to ensure a cohesive experience for the user.',
  '000': {
    $description: 'No spacing',
    $type: Type.Dimension,
    $value: '0rem',
    $extensions: {
      'iress.aliases': ['none'],
      'styler.hide': true,
    },
  },
  100: {
    $description: 'The base unit for spacing',
    $type: Type.Dimension,
    $value: baseSpacing, // 4px
    $extensions: {
      'iress.aliases': ['xs'],
      'styler.field.range': {
        max: 8,
        step: 0.25,
        tokens: [
          'spacing.000',
          'spacing.050',
          'spacing.100',
          'spacing.150',
          'spacing.200',
          'spacing.250',
          'spacing.300',
          'spacing.350',
          'spacing.400',
          'spacing.500',
          'spacing.600',
          'spacing.700',
          'spacing.800',
          'spacing.900',
          'spacing.1000',
          'spacing.1200',
        ],
        visual: 'width',
      },
      'styler.label': 'Base spacing',
    },
  },

  // Relative values
  '050': {
    $description: '50% (0.5x) spacing',
    $type: Type.Dimension,
    $value: `calc(0.5 * {spacing.100 || ${baseSpacing}})`, // 2px
    $extensions: {
      'styler.hide': true,
    },
  },
  150: {
    $description: '150% (1.5x) spacing',
    $type: Type.Dimension,
    $value: `calc(1.5 * {spacing.100 || ${baseSpacing}})`, // 6px
    $extensions: {
      'styler.hide': true,
    },
  },
  200: {
    $description: '200% (2x) spacing',
    $type: Type.Dimension,
    $value: `calc(2 * {spacing.100 || ${baseSpacing}})`, // 8px
    $extensions: {
      'iress.aliases': ['sm'],
      'styler.hide': true,
    },
  },
  250: {
    $description: '250% (2.5x) spacing',
    $type: Type.Dimension,
    $value: `calc(2.5 * {spacing.100 || ${baseSpacing}})`, // 10px
    $extensions: {
      'styler.hide': true,
    },
  },
  300: {
    $description: '300% (3x) spacing',
    $type: Type.Dimension,
    $value: `calc(3 * {spacing.100 || ${baseSpacing}})`, // 12px
    $extensions: {
      'styler.hide': true,
    },
  },
  350: {
    $description: '350% (3.5x) spacing',
    $type: Type.Dimension,
    $value: `calc(3.5 * {spacing.100 || ${baseSpacing}})`, // 14px
    $extensions: {
      'styler.hide': true,
    },
  },
  400: {
    $description: '400% (4x) spacing',
    $type: Type.Dimension,
    $value: `calc(4 * {spacing.100 || ${baseSpacing}})`, // 16px
    $extensions: {
      'iress.aliases': ['md'],
      'styler.hide': true,
    },
  },
  500: {
    $description: '500% (5x) spacing',
    $type: Type.Dimension,
    $value: `calc(5 * {spacing.100 || ${baseSpacing}})`, // 20px
    $extensions: {
      'styler.hide': true,
    },
  },
  600: {
    $description: '600% (6x) spacing',
    $type: Type.Dimension,
    $value: `calc(6 * {spacing.100 || ${baseSpacing}})`, // 24px
    $extensions: {
      'iress.aliases': ['lg'],
      'styler.hide': true,
    },
  },
  700: {
    $description: '700% (7x) spacing',
    $type: Type.Dimension,
    $value: `calc(7 * {spacing.100 || ${baseSpacing}})`, // 28px
    $extensions: {
      'styler.hide': true,
    },
  },
  800: {
    $description: '800% (8x) spacing',
    $type: Type.Dimension,
    $value: `calc(8 * {spacing.100 || ${baseSpacing}})`, // 32px
    $extensions: {
      'styler.hide': true,
    },
  },
  900: {
    $description: '900% (9x) spacing',
    $type: Type.Dimension,
    $value: `calc(9 * {spacing.100 || ${baseSpacing}})`, // 36px
    $extensions: {
      'styler.hide': true,
    },
  },
  1000: {
    $description: '1000% (10x) spacing',
    $type: Type.Dimension,
    $value: `calc(10 * {spacing.100 || ${baseSpacing}})`, // 40px
    $extensions: {
      'styler.hide': true,
    },
  },
  1200: {
    $description: '1200% (12x) spacing',
    $type: Type.Dimension,
    $value: `calc(12 * {spacing.100 || ${baseSpacing}})`, // 48px
    $extensions: {
      'iress.aliases': ['xl'],
      'styler.hide': true,
    },
  },
} as const satisfies SpacingSchema;

export default spacing;

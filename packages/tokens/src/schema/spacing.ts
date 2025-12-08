import { Type } from '../enums';
import {
  type IressDesignTokenGroup,
  type IressDesignToken,
} from '../interfaces';

interface SpacingSchema extends IressDesignTokenGroup {
  0: IressDesignToken;
  1: IressDesignToken;

  // Relative values
  2: IressDesignToken;
  3: IressDesignToken;
  4: IressDesignToken;
  5: IressDesignToken;
  6: IressDesignToken;
  7: IressDesignToken;
  8: IressDesignToken;
  10: IressDesignToken;
}

const baseSpacing = '.25rem';

const spacing = {
  $description:
    'Spacing is the distance between elements. It is used to create visual balance and hierarchy in the UI to ensure a cohesive experience for the user.',
  0: {
    $description: 'No spacing',
    $type: Type.Dimension,
    $value: '0rem',
    $extensions: {
      'iress.aliases': ['none'],
      'styler.hide': true,
    },
  },
  1: {
    $description: 'The base unit for spacing',
    $type: Type.Dimension,
    $value: baseSpacing, // 4px
    $extensions: {
      'iress.aliases': ['xs'],
      'styler.field.range': {
        max: 8,
        step: 0.25,
        tokens: [
          'spacing.0',
          'spacing.1',
          'spacing.2',
          'spacing.3',
          'spacing.4',
          'spacing.5',
          'spacing.6',
          'spacing.7',
          'spacing.8',
          'spacing.10',
        ],
        visual: 'width',
      },
      'styler.label': 'Base spacing',
    },
  },

  // Relative values
  2: {
    $description: '2x spacing',
    $type: Type.Dimension,
    $value: `calc(2 * {spacing.100 || ${baseSpacing}})`, // 8px
    $extensions: {
      'iress.aliases': ['sm'],
      'styler.hide': true,
    },
  },
  3: {
    $description: '3x spacing',
    $type: Type.Dimension,
    $value: `calc(3 * {spacing.100 || ${baseSpacing}})`, // 12px
    $extensions: {
      'styler.hide': true,
    },
  },
  4: {
    $description: '4x spacing',
    $type: Type.Dimension,
    $value: `calc(4 * {spacing.100 || ${baseSpacing}})`, // 16px
    $extensions: {
      'iress.aliases': ['md'],
      'styler.hide': true,
    },
  },
  5: {
    $description: '5x spacing',
    $type: Type.Dimension,
    $value: `calc(5 * {spacing.100 || ${baseSpacing}})`, // 20px
    $extensions: {
      'styler.hide': true,
    },
  },
  6: {
    $description: '6x spacing',
    $type: Type.Dimension,
    $value: `calc(6 * {spacing.100 || ${baseSpacing}})`, // 24px
    $extensions: {
      'iress.aliases': ['lg'],
      'styler.hide': true,
    },
  },
  7: {
    $description: '7x spacing',
    $type: Type.Dimension,
    $value: `calc(7 * {spacing.100 || ${baseSpacing}})`, // 28px
    $extensions: {
      'styler.hide': true,
    },
  },
  8: {
    $description: '8x spacing',
    $type: Type.Dimension,
    $value: `calc(8 * {spacing.100 || ${baseSpacing}})`, // 32px
    $extensions: {
      'styler.hide': true,
    },
  },
  10: {
    $description: '10x spacing',
    $type: Type.Dimension,
    $value: `calc(10 * {spacing.100 || ${baseSpacing}})`, // 40px
    $extensions: {
      'iress.aliases': ['xl'],
      'styler.hide': true,
    },
  },
} as const satisfies SpacingSchema;

export default spacing;

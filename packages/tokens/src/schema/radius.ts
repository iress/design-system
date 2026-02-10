import { Type } from '../enums';
import {
  type CompositeValue,
  type IressDesignToken,
  type IressDesignTokenGroup,
} from '../interfaces';

interface RadiusSchema extends IressDesignTokenGroup {
  0: IressDesignToken;
  1: IressDesignToken;

  // Relative values
  2: IressDesignToken;
  3: IressDesignToken;
  4: IressDesignToken;

  system: IressDesignTokenGroup & {
    button: IressDesignToken<CompositeValue['radius']>;
    form: IressDesignToken<CompositeValue['radius']>;
    layout: IressDesignToken<CompositeValue['radius']>;
    pill: IressDesignToken<CompositeValue['radius']>;
    tag: IressDesignToken<CompositeValue['radius']>;
  };
}

const baseRadius = '0.25rem'; // 4px

const radius = {
  $description:
    'Radius is the curvature of the corners of elements. It is used to soften the appearance of elements and make them more visually appealing and/or align to a client brand.',
  0: {
    $description: 'No radius',
    $type: Type.Dimension,
    $value: '0px',
    $extensions: {
      'iress.aliases': ['none'],
      'styler.hide': true,
    },
  },
  1: {
    $description: 'The base unit for radius',
    $type: Type.Dimension,
    $value: baseRadius,
    $extensions: {
      'styler.field.range': {
        max: 16,
        tokens: ['radius.0', 'radius.1', 'radius.2', 'radius.3', 'radius.4'],
        visual: 'topRightRadius',
      },
      'styler.label': 'Base radius',
    },
  },
  2: {
    $description: '2x radius',
    $type: Type.Dimension,
    $value: `calc(2 * {radius.1 || ${baseRadius}})`, // 8px
    $extensions: {
      'styler.hide': true,
    },
  },
  3: {
    $description: '3x radius',
    $type: Type.Dimension,
    $value: `calc(3 * {radius.1 || ${baseRadius}})`, // 12px
    $extensions: {
      'styler.hide': true,
    },
  },
  4: {
    $description: '4x radius',
    $type: Type.Dimension,
    $value: `calc(4 * {radius.1 || ${baseRadius}})`, // 16px
    $extensions: {
      'styler.hide': true,
    },
  },
  system: {
    $description:
      'Some components have a default radius to better align to a brand. By default they inherit from the base radius, for some brands you may need to customise this to further emphasise their identity.',
    button: {
      $description:
        'Applies to buttons and other interactive elements such as the hover state of links.',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.1 || ${baseRadius}}`,
        topRight: `{radius.1 || ${baseRadius}}`,
        bottomRight: `{radius.1 || ${baseRadius}}`,
        bottomLeft: `{radius.1 || ${baseRadius}}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
    form: {
      $description: 'Applies to form inputs and alerts.',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.1 || ${baseRadius}}`,
        topRight: `{radius.1 || ${baseRadius}}`,
        bottomRight: `{radius.1 || ${baseRadius}}`,
        bottomLeft: `{radius.1 || ${baseRadius}}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
    layout: {
      $description: 'Applies to panels, modals and slideouts.',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.3 || calc(3 * ${baseRadius})}`,
        topRight: `{radius.3 || calc(3 * ${baseRadius})}`,
        bottomRight: `{radius.3 || calc(3 * ${baseRadius})}`,
        bottomLeft: `{radius.3 || calc(3 * ${baseRadius})}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
    pill: {
      $description: 'Applies to pills.',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.4 || calc(4 * ${baseRadius})}`,
        topRight: `{radius.4 || calc(4 * ${baseRadius})}`,
        bottomRight: `{radius.4 || calc(4 * ${baseRadius})}`,
        bottomLeft: `{radius.4 || calc(4 * ${baseRadius})}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
    tag: {
      $description: 'Applies to tags.',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.1 || ${baseRadius}}`,
        topRight: `{radius.1 || ${baseRadius}}`,
        bottomRight: `{radius.1 || ${baseRadius}}`,
        bottomLeft: `{radius.1 || ${baseRadius}}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
  },
} as const satisfies RadiusSchema;

export default radius;

import { Type } from '../enums';
import {
  type CompositeValue,
  type IressDesignToken,
  type IressDesignTokenGroup,
} from '../interfaces';

interface RadiusSchema extends IressDesignTokenGroup {
  '000': IressDesignToken;
  '100': IressDesignToken;

  // Relative values
  '025': IressDesignToken;
  '050': IressDesignToken;
  '075': IressDesignToken;

  system: IressDesignTokenGroup & {
    badge: IressDesignToken<CompositeValue['radius']>;
    button: IressDesignToken<CompositeValue['radius']>;
    form: IressDesignToken<CompositeValue['radius']>;
    layout: IressDesignToken<CompositeValue['radius']>;
  };
}

const baseRadius = '1rem';

const radius = {
  $description:
    'Radius is the curvature of the corners of elements. It is used to soften the appearance of elements and make them more visually appealing and/or align to a client brand.',
  '000': {
    $description: 'No radius',
    $type: Type.Dimension,
    $value: '0px',
    $extensions: {
      'iress.aliases': ['none'],
      'styler.hide': true,
    },
  },
  '100': {
    $description: 'The base unit for radius',
    $type: Type.Dimension,
    $value: baseRadius, // 16px
    $extensions: {
      'styler.field.range': {
        max: 32,
        tokens: [
          'radius.000',
          'radius.025',
          'radius.050',
          'radius.075',
          'radius.100',
        ],
        visual: 'topRightRadius',
      },
      'styler.label': 'Base radius',
    },
  },
  '025': {
    $description: '25% (0.25x) radius',
    $type: Type.Dimension,
    $value: `calc(0.25 * {radius.100 || ${baseRadius}})`, // 4px
    $extensions: {
      'styler.hide': true,
    },
  },
  '050': {
    $description: '50% (0.5x) radius',
    $type: Type.Dimension,
    $value: `calc(0.5 * {radius.100 || ${baseRadius}})`, // 8px
    $extensions: {
      'styler.hide': true,
    },
  },
  '075': {
    $description: '75% (0.75x) radius',
    $type: Type.Dimension,
    $value: `calc(0.75 * {radius.100 || ${baseRadius}})`, // 12px
    $extensions: {
      'styler.hide': true,
    },
  },
  system: {
    $description:
      'Some components have a default radius to better align to a brand. By default they inherit from the base radius, for some brands you may need to customise this to further emphasise their identity.',
    badge: {
      $description:
        'Applies to badges and tags (that have not been designated to be a circle).',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.025 || calc(0.25 * ${baseRadius})}`,
        topRight: `{radius.025 || calc(0.25 * ${baseRadius})}`,
        bottomRight: `{radius.025 || calc(0.25 * ${baseRadius})}`,
        bottomLeft: `{radius.025 || calc(0.25 * ${baseRadius})}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
    button: {
      $description:
        'Applies to buttons and other interactive elements such as the hover state of links.',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.075 || calc(0.75 * ${baseRadius})}`,
        topRight: `{radius.075 || calc(0.75 * ${baseRadius})}`,
        bottomRight: `{radius.075 || calc(0.75 * ${baseRadius})}`,
        bottomLeft: `{radius.075 || calc(0.75 * ${baseRadius})}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
    form: {
      $description: 'Applies to form inputs and alerts.',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.050 || calc(0.5 * ${baseRadius})}`,
        topRight: `{radius.050 || calc(0.5 * ${baseRadius})}`,
        bottomRight: `{radius.050 || calc(0.5 * ${baseRadius})}`,
        bottomLeft: `{radius.050 || calc(0.5 * ${baseRadius})}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
    layout: {
      $description: 'Applies to panels, modals and slideouts.',
      $type: Type.Radius,
      $value: {
        topLeft: `{radius.100 || ${baseRadius}}`,
        topRight: `{radius.100 || ${baseRadius}}`,
        bottomRight: `{radius.100 || ${baseRadius}}`,
        bottomLeft: `{radius.100 || ${baseRadius}}`,
      },
      $extensions: {
        'styler.panel': 'radius.system',
      },
    },
  },
} as const satisfies RadiusSchema;

export default radius;

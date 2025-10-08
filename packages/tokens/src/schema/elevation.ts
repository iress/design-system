import { Type } from '../enums';
import {
  type CompositeValue,
  type IressDesignToken,
  type IressDesignTokenGroup,
} from '../interfaces';

interface ElevationSchema extends IressDesignTokenGroup {
  raised: IressDesignTokenGroup & {
    shadow: IressDesignToken<CompositeValue['shadow']>;
    border: IressDesignToken<CompositeValue['border']>;
  };
  floating: IressDesignTokenGroup & {
    shadow: IressDesignToken<CompositeValue['shadow']>;
    border: IressDesignToken<CompositeValue['border']>;
  };
  overflow: IressDesignTokenGroup & {
    shadow: IressDesignToken<CompositeValue['shadow']>;
    border: IressDesignToken<CompositeValue['border']>;
  };
  focus: IressDesignTokenGroup & {
    shadow: IressDesignToken<
      [CompositeValue['shadow'], CompositeValue['shadow']]
    >;
    border?: IressDesignToken<CompositeValue['border']>;
  };
  focusCompact: IressDesignTokenGroup & {
    shadow: IressDesignToken<CompositeValue['shadow']>;
    borderColor: IressDesignToken<string>;
  };
}

const elevation = {
  $description:
    'Elevations are the layered surfaces that form the foundation of the UI. They create a blank canvas where other UI will be placed, such as text, icons, backgrounds, and borders. Most elevations consist of surfaces and shadows. Together, surfaces and shadows give the impression of lift or depth. Elevations can guide focus through layering, or indicate that the UI can be scrolled, slid, or dragged.',
  raised: {
    $description:
      'Raised elevations sit slightly higher than default elevations. They are reserved for cards that can be moved, such as Jira issue cards and Trello cards. In special circumstances, they can be used for cards as a way to provide additional heirarchy or emphasis.',
    $extensions: {
      'styler.preview.elevation': {
        shadow: 'elevation.raised.shadow',
        border: 'elevation.raised.border',
      },
    },
    shadow: {
      $description: 'Shadow for raised elevations',
      $type: Type.Shadow,
      $value: {
        color: '#091E4220',
        offsetX: '0px',
        offsetY: '3px',
        blur: '5px',
      },
      $extensions: {
        'styler.panel': 'elevation.raised',
      },
    },
    border: {
      $description: 'Border for raised elevations',
      $type: Type.Border,
      $value: {
        color: '#091E4220',
        width: '0.5px',
        style: 'solid',
      },
      $extensions: {
        'styler.panel': 'elevation.raised',
      },
    },
  },
  floating: {
    $description:
      'Floating is the highest elevation available. It is reserved for a UI that sits over another UI, such as modals, dialogs, dropdown menus, floating toolbars, and floating single-action buttons.',
    shadow: {
      $description: 'Shadow for floating elevations',
      $type: Type.Shadow,
      $value: {
        color: '#091E4215',
        offsetX: '0px',
        offsetY: '10px',
        blur: '18px',
      },
      $extensions: {
        'styler.panel': 'elevation.floating',
      },
    },
    border: {
      $description: 'Border for floating elevations',
      $type: Type.Border,
      $value: {
        color: '#091E4215',
        width: '0.5px',
        style: 'solid',
      },
      $extensions: {
        'styler.panel': 'elevation.floating',
      },
    },
    $extensions: {
      'styler.preview.elevation': {
        shadow: 'elevation.floating.shadow',
        border: 'elevation.floating.border',
      },
    },
  },
  overflow: {
    $description:
      'Overflow is a shadow indicating content has scrolled outside a view. It can be used for vertical or horizontal scroll. An example of overflow shadows is the horizontal scroll in tables on a Confluence page.',
    shadow: {
      $description: 'Shadow for overflow elevations',
      $type: Type.Shadow,
      $value: {
        color: '#091E4215',
        type: 'inset',
        offsetX: '7px',
        offsetY: '0px',
        blur: '5px',
      },
      $extensions: {
        'styler.panel': 'elevation.overflow',
      },
    },
    border: {
      $description: 'Border for overflow elevations',
      $type: Type.Border,
      $value: {
        color: 'transparent',
        width: '0px',
        style: 'solid',
      },
      $extensions: {
        'styler.panel': 'elevation.overflow',
      },
    },
    $extensions: {
      'styler.preview.elevation': {
        shadow: 'elevation.overflow.shadow',
        border: 'elevation.overflow.border',
      },
    },
  },
  focus: {
    $description:
      'Focus is an outline indicating that an element is focused, usually via keyboard interaction. It is user when a user cannot interact with the page using a mouse/touch.',
    shadow: {
      $description: 'Shadow for focus elevations',
      $type: Type.Shadow,
      $value: [
        {
          color: '{colour.neutral.10 || #FFFFFF}',
          offsetX: '0px',
          offsetY: '0px',
          blur: '0px',
          spread: '1.5px',
        },
        {
          color: '#0066FF',
          offsetX: '0px',
          offsetY: '0px',
          blur: '0px',
          spread: '3.5px',
        },
      ],
      $extensions: {
        'styler.panel': 'elevation.focus',
      },
    },
    $extensions: {
      'styler.preview.elevation': {
        shadow: 'elevation.focus.shadow',
      },
    },
  },
  focusCompact: {
    $description:
      'Focus compact is a variation of the focus elevation to indicate focus on elements that have restricted space making the default focus not aesthetically pleasing (for example, a search input in a dropdown like rich select). Avoid using where possible, as it makes the focus state less obvious.',
    shadow: {
      $description: 'Shadow for focus compact elevations',
      $type: Type.Shadow,
      $value: {
        color: '#0066FF',
        offsetX: '0px',
        offsetY: '-2px',
        blur: '0px',
        spread: '0px',
        type: 'inset',
      },
      $extensions: {
        'styler.panel': 'elevation.focusCompact',
      },
    },
    borderColor: {
      $description: 'Border color for focus compact elevations',
      $type: Type.Color,
      $value: '#0066FF',
      $extensions: {
        'styler.panel': 'elevation.focusCompact',
      },
    },
    $extensions: {
      'styler.preview.elevation': {
        shadow: 'elevation.focusCompact.shadow',
        borderColor: 'elevation.focusCompact.borderColor',
      },
    },
  },
} as const satisfies ElevationSchema;

export default elevation;

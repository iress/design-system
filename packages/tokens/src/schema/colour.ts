import { Type } from '../enums';
import {
  type IressDesignToken,
  type IressDesignTokenGroup,
} from '../interfaces';

interface ColourSchema extends IressDesignTokenGroup {
  neutral: IressDesignTokenGroup & {
    10: IressDesignToken;
    20: IressDesignToken;
    30: IressDesignToken;
    40: IressDesignToken;
    50: IressDesignToken;
    60: IressDesignToken;
    70: IressDesignToken;
    80: IressDesignToken;
    90: IressDesignToken;
  };
  primary: IressDesignTokenGroup & {
    fill: IressDesignToken;
    fillHover: IressDesignToken;
    onFill: IressDesignToken;
    surface: IressDesignToken;
    surfaceHover: IressDesignToken;
    text: IressDesignToken;
  };
  accent: IressDesignTokenGroup & {
    fill: IressDesignToken;
    fillHover: IressDesignToken;
    onFill: IressDesignToken;
    surface: IressDesignToken;
    surfaceHover: IressDesignToken;
    text: IressDesignToken;
  };
  system: IressDesignTokenGroup & {
    success: IressDesignTokenGroup & {
      fill: IressDesignToken;
      fillHover: IressDesignToken;
      onFill: IressDesignToken;
      surface: IressDesignToken;
      surfaceHover: IressDesignToken;
      text: IressDesignToken;
    };
    danger: IressDesignTokenGroup & {
      fill: IressDesignToken;
      fillHover: IressDesignToken;
      onFill: IressDesignToken;
      surface: IressDesignToken;
      surfaceHover: IressDesignToken;
      text: IressDesignToken;
    };
    warning: IressDesignTokenGroup & {
      fill: IressDesignToken;
      fillHover: IressDesignToken;
      onFill: IressDesignToken;
      surface: IressDesignToken;
      surfaceHover: IressDesignToken;
      text: IressDesignToken;
    };
    info: IressDesignTokenGroup & {
      fill: IressDesignToken;
      fillHover: IressDesignToken;
      onFill: IressDesignToken;
      surface: IressDesignToken;
      surfaceHover: IressDesignToken;
      text: IressDesignToken;
    };
  };
  data: IressDesignTokenGroup & {
    subtle: IressDesignTokenGroup & {
      10: IressDesignToken;
      20: IressDesignToken;
      30: IressDesignToken;
      40: IressDesignToken;
      50: IressDesignToken;
      60: IressDesignToken;
      70: IressDesignToken;
      80: IressDesignToken;
      90: IressDesignToken;
    };
    bold: IressDesignTokenGroup & {
      10: IressDesignToken;
      20: IressDesignToken;
      30: IressDesignToken;
      40: IressDesignToken;
      50: IressDesignToken;
      60: IressDesignToken;
      70: IressDesignToken;
      80: IressDesignToken;
      90: IressDesignToken;
    };
  };
  globalInteractions: IressDesignTokenGroup & {
    backdrop: IressDesignToken;
    focusRing: IressDesignToken;
  };
}

const colour = {
  $description:
    'Colour distinguishes our brand and reinforces consistent experiences across products.',
  neutral: {
    $description:
      'Neutral colours apply to most backgrounds, text, and shapes in our experiences. They do not typically have a meaning associated with them, though they can imply things like disabled states. **Note:** There are some colour contrasts that are AA Large and are used for placeholders. If WCAG compliance is necessary for your application, please avoid using placeholders to meet this requirement.',
    10: {
      $description:
        'Used as the default background colour for most components. For tooltips, it is used as the foreground colour for the tooltip content.',
      $type: Type.Color,
      $value: '#FFFFFF',
      $extensions: {
        'iress.aliases': ['page'],
        'iress.contrast.AA': [
          'colour.neutral.70',
          'colour.neutral.80',
          'colour.neutral.90',
        ],
        'styler.panel': 'colour.neutral',
      },
    },
    20: {
      $description:
        'Used as the alternating background colour for components such as tables. Used as the background colour behind panels and cards for highly interactive screens.',
      $type: Type.Color,
      $value: '#F5F6F8',
      $extensions: {
        'iress.aliases': ['alt'],
        'iress.contrast.AA': [
          'colour.neutral.70',
          'colour.neutral.80',
          'colour.neutral.90',
        ],
        'styler.panel': 'colour.neutral',
      },
    },
    30: {
      $description:
        'Used as the border colour for dividers, and the default divider colour for components with in-built headers and footers such as cards.',
      $type: Type.Color,
      $value: '#E2E6EA',
      $extensions: {
        'iress.contrast.AA': ['colour.neutral.80', 'colour.neutral.90'],
        'styler.panel': 'colour.neutral',
      },
    },
    40: {
      $description:
        'Used for borders in subtle interactive components, such as checkboxes and radios with hidden controls and the progress bar.',
      $type: Type.Color,
      $value: '#CFD5DA',
      $extensions: {
        'iress.contrast.AA': ['colour.neutral.80', 'colour.neutral.90'],
        'styler.panel': 'colour.neutral',
      },
    },
    50: {
      $description:
        'Used as the background colour for interactive components such as the slider.',
      $type: Type.Color,
      $value: '#A8B2BB',
      $extensions: {
        'iress.contrast.AA': ['colour.neutral.90'],
        'styler.panel': 'colour.neutral',
      },
    },
    60: {
      $description:
        'Used for placeholder text in form controls and disabled states.',
      $type: Type.Color,
      $value: '#828F9D',
      $extensions: {
        'iress.contrast.AA': ['colour.neutral.90'],
        'styler.panel': 'colour.neutral',
      },
    },
    70: {
      $description:
        'Used for muted text such as hints and descriptions to allow for content hierarchy.',
      $type: Type.Color,
      $value: '#5D6C7E',
      $extensions: {
        'iress.aliases': ['muted'],
        'iress.contrast.AA': ['colour.neutral.10', 'colour.neutral.20'],
        'styler.panel': 'colour.neutral',
      },
    },
    80: {
      $description:
        'Used as the default text colour for most components. For tooltips, it is used as the background colour.',
      $type: Type.Color,
      $value: '#384666',
      $extensions: {
        'iress.aliases': ['text'],
        'iress.contrast.AA': [
          'colour.neutral.10',
          'colour.neutral.20',
          'colour.neutral.30',
          'colour.neutral.40',
        ],
        'styler.panel': 'colour.neutral',
      },
    },
    90: {
      $description:
        'Used for very dark text or UI elements requiring maximum contrast.',
      $type: Type.Color,
      $value: '#141F4D',
      $extensions: {
        'iress.contrast.AA': [
          'colour.neutral.10',
          'colour.neutral.20',
          'colour.neutral.30',
          'colour.neutral.40',
        ],
        'styler.panel': 'colour.neutral',
      },
    },
  },
  primary: {
    $description:
      'The primary colour is your "brand" colour, and is used across all interactive elements such as buttons, links, inputs, etc. This colour can define the overall feel and can elicit emotion.',
    fill: {
      $description:
        'Used for primary buttons and the active state of form controls such as checkboxes and radio buttons. Also used for the border of tags when they have a custom button.',
      $type: Type.Color,
      $value: '#003271',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.onFill'],
        'styler.panel': 'colour.primary',
      },
    },
    fillHover: {
      $description:
        'Used for the hover state of primary buttons as well as hovering over active form controls.',
      $type: Type.Color,
      $value: '#002352',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.onFill'],
        'styler.panel': 'colour.primary',
      },
    },
    onFill: {
      $description:
        'Used as the foreground colour on primary buttons and active form controls.',
      $type: Type.Color,
      $value: '#FFFFFF',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.fill'],
        'styler.panel': 'colour.primary',
      },
    },
    surface: {
      $description:
        'Used as the background colour for secondary buttons and the focused state of menu and tab items. Also used as the background colour of active buttons.',
      $type: Type.Color,
      $value: '#EBF3FF',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.text', 'colour.neutral.80'],
        'styler.panel': 'colour.primary',
      },
    },
    surfaceHover: {
      $description:
        'Used for the hover state of secondary buttons, form controls and hovering over focused menu and tab items. Also used when hovering over table rows.',
      $type: Type.Color,
      $value: '#DCEAFE',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.text', 'colour.neutral.80'],
        'styler.panel': 'colour.primary',
      },
    },
    text: {
      $description:
        'Used for text on primary buttons, active form controls and focused tab and menu items. Also used for the link text colour and tertiary buttons.',
      $type: Type.Color,
      $value: '#003271',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.surface'],
        'styler.panel': 'colour.primary',
      },
    },
  },
  accent: {
    $description:
      'The accent colour is a colour used to emphasise key parts of the UI. These act as "secondary" or "supporting" colours to you primary colour. The brand accent is useful for grabbing attention or to support your primary/brand colour.',
    fill: {
      $description:
        'Used in illustrations to support the primary colour and to add visual interest to the UI.',
      $type: Type.Color,
      $value: '#C26EF4',
      $extensions: {
        'iress.contrast.AA': ['colour.accent.onFill'],
        'styler.panel': 'colour.accent',
      },
    },
    fillHover: {
      $description:
        'Used in illustrations to support the primary colour and to add visual interest to the UI when hovered.',
      $type: Type.Color,
      $value: '#A855D9',
      $extensions: {
        'iress.contrast.AA': ['colour.accent.onFill'],
        'styler.panel': 'colour.accent',
      },
    },
    onFill: {
      $description:
        'Used in illustrations to support the primary colour and to add visual interest to the UI when used as a foreground colour.',
      $type: Type.Color,
      $value: '#1F0032',
      $extensions: {
        'iress.contrast.AA': ['colour.accent.fill'],
        'styler.panel': 'colour.accent',
      },
    },
    surface: {
      $description: 'Used to highlight a selected row in a table.',
      $type: Type.Color,
      $value: '#E0BDF5',
      $extensions: {
        'iress.contrast.AA': ['colour.accent.text', 'colour.neutral.80'],
        'styler.panel': 'colour.accent',
      },
    },
    surfaceHover: {
      $description:
        'Used for the hover state of a highlighted row in a table to provide additional emphasis on hover.',
      $type: Type.Color,
      $value: '#D4A6F2',
      $extensions: {
        'iress.contrast.AA': ['colour.accent.text', 'colour.neutral.80'],
        'styler.panel': 'colour.accent',
      },
    },
    text: {
      $description:
        'Used for text on top of accent surfaces (such as highlighted table rows).',
      $type: Type.Color,
      $value: '#1F0032',
      $extensions: {
        'iress.contrast.AA': ['colour.accent.surface'],
        'styler.panel': 'colour.accent',
      },
    },
  },
  system: {
    $description:
      'Along with primary colours, it is helpful to have a selection of system colours to use in components such as pills, alerts and labels. System colours emphasis different semantic states. They are used to provide visual feedback and/or warnings to users as they use your interface.',
    success: {
      $description:
        'Communicates that an action has been successful and inform a user that the action is a positive action.',
      fill: {
        $description:
          'Used for the background colour of primary success buttons, as well as the border of alerts and badges. It is also used for the foreground colour of icons inside toasts and alerts.',
        $type: Type.Color,
        $value: '#37C49C',
        $extensions: {
          'iress.contrast.AA': ['colour.system.success.onFill'],
          'styler.panel': 'colour.system.success',
        },
      },
      fillHover: {
        $description: 'Used for the hover state of primary success buttons.',
        $type: Type.Color,
        $value: '#2DAB88',
        $extensions: {
          'iress.contrast.AA': ['colour.system.success.onFill'],
          'styler.panel': 'colour.system.success',
        },
      },
      onFill: {
        $description:
          'Used for the foreground colour of primary success buttons and badges.',
        $type: Type.Color,
        $value: '#0A2E25',
        $extensions: {
          'iress.contrast.AA': ['colour.system.success.fill'],
          'styler.panel': 'colour.system.success',
        },
      },
      surface: {
        $description:
          'Used for the background colour of success alerts and toasts, and the background of secondary success buttons.',
        $type: Type.Color,
        $value: '#EBF9F5',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.success.text',
            'colour.neutral.90',
          ],
          'styler.panel': 'colour.system.success',
        },
      },
      surfaceHover: {
        $description: 'Used for the hover state of secondary success buttons.',
        $type: Type.Color,
        $value: '#D7F3EB',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.success.text',
            'colour.neutral.90',
          ],
          'styler.panel': 'colour.system.success',
        },
      },
      text: {
        $description:
          'Used for the text colour of success alerts and toasts, and success tertiary buttons.',
        $type: Type.Color,
        $value: '#006b44',
        $extensions: {
          'iress.contrast.AA': ['colour.system.success.surface'],
          'styler.panel': 'colour.system.success',
        },
      },
    },
    danger: {
      $description:
        'Communicates something went wrong or prevents the user from moving forward with their task, as well as inform a potential action is destructive/negative.',
      fill: {
        $description:
          'Used for the background colour of primary danger buttons, as well as the border of alerts and badges. It is also used for the foreground colour of icons inside toasts and alerts.',
        $type: Type.Color,
        $value: '#c21010',
        $extensions: {
          'iress.contrast.AA': ['colour.system.danger.onFill'],
          'styler.panel': 'colour.system.danger',
        },
      },
      fillHover: {
        $description: 'Used for the hover state of primary danger buttons.',
        $type: Type.Color,
        $value: '#B32727',
        $extensions: {
          'iress.contrast.AA': ['colour.system.danger.onFill'],
          'styler.panel': 'colour.system.danger',
        },
      },
      onFill: {
        $description:
          'Used for the foreground colour of primary danger buttons and badges.',
        $type: Type.Color,
        $value: '#FFF4F3',
        $extensions: {
          'iress.contrast.AA': ['colour.system.danger.fill'],
          'styler.panel': 'colour.system.danger',
        },
      },
      surface: {
        $description:
          'Used for the background colour of danger alerts and toasts, and the background of secondary danger buttons.',
        $type: Type.Color,
        $value: '#FFEDEC',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.danger.text',
            'colour.neutral.90',
          ],
          'styler.panel': 'colour.system.danger',
        },
      },
      surfaceHover: {
        $description: 'Used for the hover state of secondary danger buttons.',
        $type: Type.Color,
        $value: '#FFD9D6',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.danger.text',
            'colour.neutral.90',
          ],
          'styler.panel': 'colour.system.danger',
        },
      },
      text: {
        $description:
          'Used for the text colour of danger alerts and toasts, and danger tertiary buttons.',
        $type: Type.Color,
        $value: '#c21010',
        $extensions: {
          'iress.contrast.AA': ['colour.system.danger.surface'],
          'styler.panel': 'colour.system.danger',
        },
      },
    },
    warning: {
      $description:
        'Communicates attention required but does not prevent the user from moving forward with their task.',
      fill: {
        $description:
          'Used for the border of warning alerts and the background of warning badges.',
        $type: Type.Color,
        $value: '#F0AD03',
        $extensions: {
          'iress.contrast.AA': ['colour.system.warning.onFill'],
          'styler.panel': 'colour.system.warning',
        },
      },
      fillHover: {
        $description: 'Used for the hover state of primary warning buttons.',
        $type: Type.Color,
        $value: '#DA9D00',
        $extensions: {
          'iress.contrast.AA': ['colour.system.warning.onFill'],
          'styler.panel': 'colour.system.warning',
        },
      },
      onFill: {
        $description: 'Used for the foreground colour of warning badges.',
        $type: Type.Color,
        $value: '#2B1F00',
        $extensions: {
          'iress.contrast.AA': ['colour.system.warning.fill'],
          'styler.panel': 'colour.system.warning',
        },
      },
      surface: {
        $description: 'Used for the background colour of warning alerts.',
        $type: Type.Color,
        $value: '#FFF8E6',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.warning.text',
            'colour.neutral.90',
          ],
          'styler.panel': 'colour.system.warning',
        },
      },
      surfaceHover: {
        $description: 'Used for the hover state of secondary warning buttons.',
        $type: Type.Color,
        $value: '#FFEAA0',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.warning.text',
            'colour.neutral.90',
          ],
          'styler.panel': 'colour.system.warning',
        },
      },
      text: {
        $description: 'Used for the text colour of warning alerts.',
        $type: Type.Color,
        $value: '#825400',
        $extensions: {
          'iress.contrast.AA': ['colour.system.warning.surface'],
          'styler.panel': 'colour.system.warning',
        },
      },
    },
    info: {
      $description: 'Provides additional helpful context.',
      fill: {
        $description:
          'Used for the border of info alerts and toasts and the background of info badges.',
        $type: Type.Color,
        $value: '#669AFF',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.onFill'],
          'styler.panel': 'colour.system.info',
        },
      },
      fillHover: {
        $description: 'Used for the hover state of primary info buttons.',
        $type: Type.Color,
        $value: '#5685E1',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.onFill'],
          'styler.panel': 'colour.system.info',
        },
      },
      onFill: {
        $description: 'Used for the foreground colour of info badges.',
        $type: Type.Color,
        $value: '#121D33',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.fill'],
          'styler.panel': 'colour.system.info',
        },
      },
      surface: {
        $description:
          'Used for the background colour of info alerts and toasts.',
        $type: Type.Color,
        $value: '#E5EEFF',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.text', 'colour.neutral.90'],
          'styler.panel': 'colour.system.info',
        },
      },
      surfaceHover: {
        $description: 'Used for the hover state of secondary info buttons.',
        $type: Type.Color,
        $value: '#CCDEFF',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.text', 'colour.neutral.90'],
          'styler.panel': 'colour.system.info',
        },
      },
      text: {
        $description: 'Used for the text colour of info alerts and toasts.',
        $type: Type.Color,
        $value: '#0047ab',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.surface'],
          'styler.panel': 'colour.system.info',
        },
      },
    },
  },
  data: {
    $description:
      'Data colours are used to visualise data in charts, graphs, and other data visualisation components. They provide visual distinction between different data series.',
    subtle: {
      $description:
        'Subtle data colours provide softer contrast for backgrounds and less prominent data visualisations.',
      10: {
        $description: 'First data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#FFE6F2',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.10', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
      20: {
        $description: 'Second data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#FEEAFF',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.20', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
      30: {
        $description: 'Third data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#F1E6FF',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.30', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
      40: {
        $description: 'Fourth data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#E5F5FF',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.40', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
      50: {
        $description: 'Fifth data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#E6EEFF',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.50', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
      60: {
        $description: 'Sixth data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#C8D7FF',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.60', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
      70: {
        $description:
          'Seventh data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#E4FFFD',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.70', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
      80: {
        $description: 'Eighth data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#BADFD4',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.80', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
      90: {
        $description: 'Ninth data visualisation colour in the subtle palette.',
        $type: Type.Color,
        $value: '#ECECEC',
        $extensions: {
          'iress.contrast.AA': ['colour.data.bold.90', 'colour.neutral.90'],
          'styler.panel': 'colour.data.subtle',
        },
      },
    },
    bold: {
      $description:
        'Bold data colours provide strong contrast for foregrounds and prominent data visualisations.',
      10: {
        $description: 'First data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#AC2C6A',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.10', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
      20: {
        $description: 'Second data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#AA20AF',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.20', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
      30: {
        $description: 'Third data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#7E38D7',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.30', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
      40: {
        $description: 'Fourth data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#006EB8',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.40', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
      50: {
        $description: 'Fifth data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#0055FF',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.50', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
      60: {
        $description: 'Sixth data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#0032B2',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.60', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
      70: {
        $description: 'Seventh data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#1D7C73',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.70', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
      80: {
        $description: 'Eighth data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#124E3D',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.80', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
      90: {
        $description: 'Ninth data visualisation colour in the bold palette.',
        $type: Type.Color,
        $value: '#384666',
        $extensions: {
          'iress.contrast.AA': ['colour.data.subtle.90', 'colour.neutral.10'],
          'styler.panel': 'colour.data.bold',
        },
      },
    },
  },
  globalInteractions: {
    $description:
      "These tokens govern the interface's behavior during user engagement, ensuring clear visual hierarchy and accessible navigation across all components.",
    backdrop: {
      $description:
        "By dimming the underlying interface, the Backdrop reduces cognitive load and establishes a clear depth of field, signalling that the user's attention is required exclusively on the foreground element.",
      $type: Type.Color,
      $value: '#61656bcc',
      $extensions: {
        'iress.contrast.AA': ['colour.neutral.10'],
        'styler.panel': 'colour.globalInteractions',
      },
    },
    focusRing: {
      $description:
        'A high-contrast "halo" used to identify the currently active element during keyboard navigation. Applied with a 2px width and 2px offset to ensure the indicator remains distinct from the component border, satisfying WCAG 2.4.7 for visibility.',
      $type: Type.Color,
      $value: '#005BFF',
      $extensions: {
        'iress.contrast.AA': ['colour.neutral.10'],
        'styler.panel': 'colour.globalInteractions',
      },
    },
  },
} as const satisfies ColourSchema;

export default colour;

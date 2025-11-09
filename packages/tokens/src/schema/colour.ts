import { Type } from '../enums';
import {
  type IressDesignToken,
  type IressDesignTokenGroup,
} from '../interfaces';

interface ColourSchema extends IressDesignTokenGroup {
  primary: IressDesignTokenGroup & {
    fill: IressDesignToken;
    fillHover: IressDesignToken;
    onFill: IressDesignToken;
    surface: IressDesignToken;
    surfaceHover: IressDesignToken;
    text: IressDesignToken;
  };
  neutral: IressDesignTokenGroup & {
    10: IressDesignToken;
    20: IressDesignToken;
    30: IressDesignToken;
    40: IressDesignToken;
    50: IressDesignToken;
    60: IressDesignToken;
    70: IressDesignToken;
    80: IressDesignToken;
  };
  accent: IressDesignTokenGroup & {
    brand: IressDesignToken;
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
      onFill: IressDesignToken;
      surface: IressDesignToken;
      text: IressDesignToken;
    };
    info: IressDesignTokenGroup & {
      fill: IressDesignToken;
      onFill: IressDesignToken;
      surface: IressDesignToken;
      text: IressDesignToken;
    };
    backdrop: IressDesignTokenGroup & {
      fill: IressDesignToken;
    };
  };
}

const colour = {
  $description:
    'Colour distinguishes our brand and reinforces consistent experiences across products.',
  primary: {
    $description:
      'The primary colour is your "brand" colour, and is used across all interactive elements such as buttons, links, inputs, etc. This colour can define the overall feel and can elicit emotion.',
    fill: {
      $description:
        'Used for primary buttons and the active state of form controls such as checkboxes and radio buttons. Also used for the border of tags when they have a custom button.',
      $type: Type.Color,
      $value: '#13213F',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.onFill'],
        'styler.panel': 'colour.primary',
      },
    },
    fillHover: {
      $description:
        'Used for the hover state of primary buttons as well as hovering over active form controls.',
      $type: Type.Color,
      $value: '#2B3752',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.onFill'],
        'styler.panel': 'colour.primary',
      },
    },
    onFill: {
      $description:
        'Used as the foreground colour on primary buttons and active form controls.',
      $type: Type.Color,
      $value: '#ECF2FF',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.fill'],
        'styler.panel': 'colour.primary',
      },
    },
    surface: {
      $description:
        'Used as the background colour for secondary buttons and the focused state of menu and tab items. Also used as the background colour of active buttons.',
      $type: Type.Color,
      $value: '#D9E5FF',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.text', 'colour.neutral.80'],
        'styler.panel': 'colour.primary',
      },
    },
    surfaceHover: {
      $description:
        'Used for the hover state of secondary buttons, form controls and hovering over focused menu and tab items. Also used when hovering over table rows.',
      $type: Type.Color,
      $value: '#E1EAFF',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.text', 'colour.neutral.80'],
        'styler.panel': 'colour.primary',
      },
    },
    text: {
      $description:
        'Used for text on primary buttons, active form controls and focused tab and menu items. Also used for the link text colour and tertiary buttons.',
      $type: Type.Color,
      $value: '#13213F',
      $extensions: {
        'iress.contrast.AA': ['colour.primary.surface'],
        'styler.panel': 'colour.primary',
      },
    },
  },
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
          'colour.neutral.80',
          'colour.neutral.70',
          'colour.neutral.60',
        ],
        'styler.panel': 'colour.neutral',
      },
    },
    20: {
      $description:
        'Used as the alternating background colour for components such as tables. Used as the background colour behind panels and cards for highly interactive screens.',
      $type: Type.Color,
      $value: '#F9F9F9',
      $extensions: {
        'iress.aliases': ['alt'],
        'iress.contrast.AA': ['colour.neutral.80', 'colour.neutral.70'],
        'styler.panel': 'colour.neutral',
      },
    },
    30: {
      $description:
        'Used as the border colour for dividers, and the default divider colour for components with in-built headers and footers such as cards.',
      $type: Type.Color,
      $value: '#E4E5E7',
      $extensions: {
        'styler.panel': 'colour.neutral',
      },
    },
    40: {
      $description:
        'Used for borders in subtle interactive components, such as checkboxes and radios with hidden controls and the progress bar.',
      $type: Type.Color,
      $value: '#D7D8DA',
      $extensions: {
        'styler.panel': 'colour.neutral',
      },
    },
    50: {
      $description:
        'Used as the background colour for interactive components such as the slider.',
      $type: Type.Color,
      $value: '#AFB2B6',
      $extensions: {
        'styler.panel': 'colour.neutral',
      },
    },
    60: {
      $description:
        'Used for placeholder text in form controls and disabled states.',
      $type: Type.Color,
      $value: '#878B92',
      $extensions: {
        'iress.contrast.AA': ['colour.neutral.10'],
        'styler.panel': 'colour.neutral',
      },
    },
    70: {
      $description:
        'Used for muted text such as hints and descriptions to allow for content hierarchy.',
      $type: Type.Color,
      $value: '#6D7278',
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
      $value: '#393F46',
      $extensions: {
        'iress.aliases': ['text'],
        'iress.contrast.AA': ['colour.neutral.10', 'colour.neutral.20'],
        'styler.panel': 'colour.neutral',
      },
    },
  },
  accent: {
    $description:
      'The accent colour is a colour used to emphasise key parts of the UI. These act as "secondary" or "supporting" colours to you primary colour.',
    brand: {
      $description:
        'The brand accent is useful for grabbing attention and to support your primary/brand colour. It should be used sparingly to draw attention to key elements.',
      $type: Type.Color,
      $value: '#FF99A8',
      $extensions: {
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
        $value: '#02794D',
        $extensions: {
          'iress.contrast.AA': ['colour.system.success.onFill'],
          'styler.panel': 'colour.system.success',
        },
      },
      fillHover: {
        $description: 'Used for the hover state of primary success buttons.',
        $type: Type.Color,
        $value: '#01603D',
        $extensions: {
          'iress.contrast.AA': ['colour.system.success.onFill'],
          'styler.panel': 'colour.system.success',
        },
      },
      onFill: {
        $description:
          'Used for the foreground colour of primary success buttons and badges.',
        $type: Type.Color,
        $value: '#EFFBF2',
        $extensions: {
          'iress.contrast.AA': ['colour.system.success.fill'],
          'styler.panel': 'colour.system.success',
        },
      },
      surface: {
        $description:
          'Used for the background colour of success alerts and toasts, and the background of secondary success buttons.',
        $type: Type.Color,
        $value: '#E6F9EB',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.success.text',
            'colour.neutral.80',
          ],
          'styler.panel': 'colour.system.success',
        },
      },
      surfaceHover: {
        $description: 'Used for the hover state of secondary success buttons.',
        $type: Type.Color,
        $value: '#D5F6DE',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.success.text',
            'colour.neutral.80',
          ],
          'styler.panel': 'colour.system.success',
        },
      },
      text: {
        $description:
          'Used for the text colour of success alerts and toasts, and success tertiary buttons.',
        $type: Type.Color,
        $value: '#015537',
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
        $value: '#C20A0A',
        $extensions: {
          'iress.contrast.AA': ['colour.system.danger.onFill'],
          'styler.panel': 'colour.system.danger',
        },
      },
      fillHover: {
        $description: 'Used for the hover state of primary danger buttons.',
        $type: Type.Color,
        $value: '#A50606',
        $extensions: {
          'iress.contrast.AA': ['colour.system.danger.onFill'],
          'styler.panel': 'colour.system.danger',
        },
      },
      onFill: {
        $description:
          'Used for the foreground colour of primary danger buttons and badges.',
        $type: Type.Color,
        $value: '#FFF6F5',
        $extensions: {
          'iress.contrast.AA': ['colour.system.danger.fill'],
          'styler.panel': 'colour.system.danger',
        },
      },
      surface: {
        $description:
          'Used for the background colour of danger alerts and toasts, and the background of secondary danger buttons.',
        $type: Type.Color,
        $value: '#FEE8E7',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.danger.text',
            'colour.neutral.80',
          ],
          'styler.panel': 'colour.system.danger',
        },
      },
      surfaceHover: {
        $description: 'Used for the hover state of secondary danger buttons.',
        $type: Type.Color,
        $value: '#FEDEDC',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.danger.text',
            'colour.neutral.80',
          ],
          'styler.panel': 'colour.system.danger',
        },
      },
      text: {
        $description:
          'Used for the text colour of danger alerts and toasts, and danger tertiary buttons.',
        $type: Type.Color,
        $value: '#970202',
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
        $value: '#F6C84C',
        $extensions: {
          'iress.contrast.AA': ['colour.system.warning.onFill'],
          'styler.panel': 'colour.system.warning',
        },
      },
      onFill: {
        $description: 'Used for the foreground colour of warning badges.',
        $type: Type.Color,
        $value: '#1A1200',
        $extensions: {
          'iress.contrast.AA': ['colour.system.warning.fill'],
          'styler.panel': 'colour.system.warning',
        },
      },
      surface: {
        $description: 'Used for the background colour of warning alerts.',
        $type: Type.Color,
        $value: '#FEF4CD',
        $extensions: {
          'iress.contrast.AA': [
            'colour.system.warning.text',
            'colour.neutral.80',
          ],
          'styler.panel': 'colour.system.warning',
        },
      },
      text: {
        $description: 'Used for the text colour of warning alerts.',
        $type: Type.Color,
        $value: '#1A1200',
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
        $value: '#004FBD',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.onFill'],
          'styler.panel': 'colour.system.info',
        },
      },
      onFill: {
        $description: 'Used for the foreground colour of info badges.',
        $type: Type.Color,
        $value: '#F5FAFF',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.fill'],
          'styler.panel': 'colour.system.info',
        },
      },
      surface: {
        $description:
          'Used for the background colour of info alerts and toasts.',
        $type: Type.Color,
        $value: '#E5F3FF',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.text', 'colour.neutral.80'],
          'styler.panel': 'colour.system.info',
        },
      },
      text: {
        $description: 'Used for the text colour of info alerts and toasts.',
        $type: Type.Color,
        $value: '#123987',
        $extensions: {
          'iress.contrast.AA': ['colour.system.info.surface'],
          'styler.panel': 'colour.system.info',
        },
      },
    },
    backdrop: {
      $description:
        'Used to cover the page in order to highlight a specific component, such as a modal.',
      fill: {
        $description: 'Used for the background colour of the backdrop.',
        $type: Type.Color,
        $value: '#393F46CC',
        $extensions: {
          'iress.contrast.AA': ['colour.neutral.10'],
          'styler.panel': 'colour.system.backdrop',
        },
      },
    },
  },
} as const satisfies ColourSchema;

export default colour;

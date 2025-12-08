import { Type } from '../enums';
import {
  type CompositeValue,
  type IressDesignToken,
  type IressDesignTokenGroup,
} from '../interfaces';

const baseSize = '.875rem';
const headingFont = 'Ubuntu, Helvetica, sans-serif';
const bodyFont = 'Inter, Helvetica, sans-serif';

export const defaultFonts = [
  'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap',
] as const;

interface TypographySchema extends IressDesignTokenGroup {
  base: IressDesignTokenGroup & {
    size: IressDesignToken;
    headingFont: IressDesignToken;
    bodyFont: IressDesignToken;
  };
  heading: IressDesignTokenGroup & {
    1: IressDesignToken<CompositeValue['typography']>;
    2: IressDesignToken<CompositeValue['typography']>;
    3: IressDesignToken<CompositeValue['typography']>;
    4: IressDesignToken<CompositeValue['typography']>;
    5: IressDesignToken<CompositeValue['typography']>;
  };
  body: IressDesignTokenGroup & {
    sm: IressDesignTokenGroup & {
      regular: IressDesignToken<CompositeValue['typography']>;
      medium: IressDesignToken<CompositeValue['typography']>;
      strong: IressDesignToken<CompositeValue['typography']>;
      em: IressDesignToken<CompositeValue['typography']>;
    };
    md: IressDesignTokenGroup & {
      regular: IressDesignToken<CompositeValue['typography']>;
      medium: IressDesignToken<CompositeValue['typography']>;
      strong: IressDesignToken<CompositeValue['typography']>;
      em: IressDesignToken<CompositeValue['typography']>;
    };
    lg: IressDesignTokenGroup & {
      regular: IressDesignToken<CompositeValue['typography']>;
      medium: IressDesignToken<CompositeValue['typography']>;
      strong: IressDesignToken<CompositeValue['typography']>;
      em: IressDesignToken<CompositeValue['typography']>;
    };
  };
  code: IressDesignToken<CompositeValue['typography']>;
}

const typography = {
  $description:
    'Typography is our system of fonts and text styles. It enhances communication, reinforces brand, and guides the emotions of our users.',
  base: {
    $description:
      'These are the baseline typography units for the design system. The other typography styles usually inherit these, but can be customised on a font by font basis.',
    size: {
      $description:
        'This is the base font size, and is used to calculate the font sizes of each token.',
      $type: Type.FontSize,
      $value: baseSize,
      $extensions: {
        'styler.input.max': 40,
      },
    },
    headingFont: {
      $description:
        'This is the base font family for headings, used for heading tokens.',
      $type: Type.FontFamily,
      $value: headingFont,
    },
    bodyFont: {
      $description:
        'This is the base font family for body, used for body tokens.',
      $type: Type.FontFamily,
      $value: bodyFont,
      $extensions: {
        'styler.field.fontUrls': {
          tokens: ['typography.base.bodyFont', 'typography.base.headingFont'],
        },
      },
    },
  },
  heading: {
    $description:
      'Headings come in a range of sizes, for use in different contexts.',
    1: {
      $description:
        'Use for the main page title to establish a clear hierarchy. There is only one H1 per screen, emphasising the primary purpose or context of the page.',
      $type: Type.Typography,
      $value: {
        fontFamily: `{typography.base.headingFont || ${headingFont}}`,
        fontSize: `calc({typography.base.size || ${baseSize}} * (36 / 14))`,
        fontWeight: 500,
        lineHeight: 1.3,
      },
      $extensions: {
        'styler.panel': 'typography.heading.1',
        'styler.label': '',
        'styler.watchToken': 'typography.base.headingFont',
      },
    },
    2: {
      $description:
        'Use for **primary section headings** within a page to organise content and guide the user through key areas. Also suitable for large components—such as modals—where space allows and where it pairs well with: body.md or body.lg.',
      $type: Type.Typography,
      $value: {
        fontFamily: `{typography.base.headingFont || ${headingFont}}`,
        fontSize: `calc({typography.base.size || ${baseSize}} * (30 / 14))`,
        fontWeight: 500,
        lineHeight: 1.3,
      },
      $extensions: {
        'styler.panel': 'typography.heading.2',
        'styler.label': '',
        'styler.watchToken': 'typography.base.headingFont',
      },
    },
    3: {
      $description:
        'Use for: sub-sections under H2s to further structure content and maintain a clear visual hierarchy. Ideal for breaking down complex sections into manageable parts.',
      $type: Type.Typography,
      $value: {
        fontFamily: `{typography.base.headingFont || ${headingFont}}`,
        fontSize: `calc({typography.base.size || ${baseSize}} * (26 / 14))`,
        fontWeight: 500,
        lineHeight: 1.3,
      },
      $extensions: {
        'styler.panel': 'typography.heading.3',
        'styler.label': '',
        'styler.watchToken': 'typography.base.headingFont',
      },
    },
    4: {
      $description:
        'Use for: supporting headings within content blocks or small components where space is limited—such as table headers, cards, or side panels. Provides structure without overwhelming the layout.',
      $type: Type.Typography,
      $value: {
        fontFamily: `{typography.base.headingFont || ${headingFont}}`,
        fontSize: `calc({typography.base.size || ${baseSize}} * (22 / 14))`,
        fontWeight: 500,
        lineHeight: 1.3,
      },
      $extensions: {
        'styler.panel': 'typography.heading.4',
        'styler.label': '',
        'styler.watchToken': 'typography.base.headingFont',
      },
    },
    5: {
      $description:
        'Use for: minor labels or titles in compact UI elements, such as cards, sidebars, or inline labels. Best used to emphasise supplementary information without drawing too much attention. Works well with body.sm and is ideal for subtle content like fine print. Use sparingly to preserve typographic hierarchy.',
      $type: Type.Typography,
      $value: {
        fontFamily: `{typography.base.headingFont || ${headingFont}}`,
        fontSize: `calc({typography.base.size || ${baseSize}} * (18 / 14))`,
        fontWeight: 400,
        lineHeight: 1.3,
      },
      $extensions: {
        'styler.panel': 'typography.heading.5',
        'styler.label': '',
        'styler.watchToken': 'typography.base.headingFont',
      },
    },
  },
  body: {
    $description:
      'Body text are used for all text content in the product, such as paragraphs, lists, and tables. They come in four different weights, strong is used to label fields and highlight text in a paragraph to make important text easier to scan, emphasis is used to display text that is referencing a legal term or other taxnomies, and medium text is used to indicate text is interactive, such as a button or a link.',
    sm: {
      $description:
        'Used for small components such as badges and field hints, as well as compact variations of tables and lists.',
      regular: {
        $description:
          'The default small text, most commonly used to display text in small components and compact tables and lists.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `calc({typography.base.size || ${baseSize}} * (12 / 14))`,
          fontWeight: 400,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.sm',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      medium: {
        $description:
          'Medium text is used to indicate text is interactive, such as a button or a link.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `calc({typography.base.size || ${baseSize}} * (12 / 14))`,
          fontWeight: 500,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.sm',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      strong: {
        $description:
          'Strong text is used to highlight important information in a paragraph of text.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `calc({typography.base.size || ${baseSize}} * (12 / 14))`,
          fontWeight: 600,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.sm',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      em: {
        $description:
          'Emphasised text is used to highlight a term or definition in a paragraph of text. It is used sparingly, usually for legal purposes.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `calc({typography.base.size || ${baseSize}} * (12 / 14))`,
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.sm',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
    },
    md: {
      $description:
        'The most commonly used body text size, used for most text content in the product.',
      regular: {
        $description:
          'The default text, most commonly used to display text across all products.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `{typography.base.size || ${baseSize}}`,
          fontWeight: 400,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.md',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      medium: {
        $description:
          'Medium text is used to indicate text is interactive, such as a button or a link.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `{typography.base.size || ${baseSize}}`,
          fontWeight: 500,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.md',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      strong: {
        $description:
          'Strong text is used to highlight important information in a paragraph of text.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `{typography.base.size || ${baseSize}}`,
          fontWeight: 600,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.md',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      em: {
        $description:
          'Emphasised text is used to highlight a term or definition in a paragraph of text. It is used sparingly, usually for legal purposes.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `{typography.base.size || ${baseSize}}`,
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.md',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
    },
    lg: {
      $description:
        'Used for tag lines, subtitles, and other large text content in the product.',
      regular: {
        $description:
          'The default large text, most commonly used to display large text across all products.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `calc({typography.base.size || ${baseSize}} * (18 / 14))`,
          fontWeight: 400,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.lg',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      medium: {
        $description:
          'Medium text is used to indicate text is interactive, such as a button or a link.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `calc({typography.base.size || ${baseSize}} * (18 / 14))`,
          fontWeight: 500,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.lg',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      strong: {
        $description:
          'Strong text is used to highlight important information in a paragraph of text.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `calc({typography.base.size || ${baseSize}} * (18 / 14))`,
          fontWeight: 600,
          lineHeight: 1.5,
        },
        $extensions: {
          'styler.panel': 'typography.body.lg',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
      em: {
        $description:
          'Emphasised text is used to highlight a term or definition in a paragraph of text. It is used sparingly, usually for legal purposes.',
        $type: Type.Typography,
        $value: {
          fontFamily: `{typography.base.bodyFont || ${bodyFont}}`,
          fontSize: `calc({typography.base.size || ${baseSize}} * (18 / 14))`,
          fontWeight: 500,
          lineHeight: 1.5,
          fontStyle: 'italic',
        },
        $extensions: {
          'styler.panel': 'typography.body.lg',
          'styler.watchToken': 'typography.base.bodyFont',
        },
      },
    },
  },
  code: {
    $description:
      'Used to display code snippets in the product, such as in the API documentation.',
    $type: Type.Typography,
    $value: {
      fontFamily: 'Space, monospace',
      fontSize: `{typography.base.size || ${baseSize}}`,
      fontWeight: 400,
      lineHeight: 1.6,
    },
    $extensions: {
      'styler.panel': 'typography.code',
    },
  },
} as const satisfies TypographySchema;

export default typography;

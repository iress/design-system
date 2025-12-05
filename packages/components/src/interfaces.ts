import { type ReactNode } from 'react';
import { type SystemValidationStatus, type PaddingSize } from './enums';
import {
  type PositiveSpacingToken,
  type FormControlValue,
  type PaddingSizes,
  type ResponsiveProp,
  type SystemValidationStatuses,
} from './types';
import { type SpacingToken } from '@/styled-system/tokens';
import { type UtilityValues } from './styled-system/types/prop-type';

/**
 * This interface is used to ensure that the ref returned by a component is compatible with React Hook Form.
 * It provides the contract for necessary methods to interact with the third-party library, such as `blur` and `focus`.
 */
export interface ReactHookFormCompatibleRef<
  T extends HTMLElement = HTMLInputElement,
> {
  /**
   * This method is used by react-hook-form to blur the control.
   */
  blur: () => void;

  /**
   * This method is used by react-hook-form to focus the control.
   */
  focus: () => void;

  /**
   * This method is used by react-hook-form as a fallback to get the value of the control.
   */
  input: T | null;

  /**
   * This object allows you to manipulate how `IressFormField` will handle your component, automating some of the changes you may usually have to do in the `render` prop.
   */
  extras?: {
    /**
     * Additional props that will be passed to the `onChange` handler of the control, essentially also triggering onChange
     */
    additionalOnChangeProps?: string[];

    /**
     * The name of the prop that will be used to set the value of the control.
     * @default 'value'
     */
    valueProp?: string;
  };
}

export interface ValidationMessageObj {
  status?: SystemValidationStatus | SystemValidationStatuses;
  message: string;
  linkToTarget?: string;
  dataTestId?: string;
  prefix?: ReactNode;
  visiblePrefix?: boolean;
}

export type WithDataAttributes<T = NonNullable<unknown>> = T & {
  'data-testid'?: string;
  'data-value'?: string;
};

export interface NameValue {
  name: string;
  value: string;
}

/**
 * This allows for customising the slot/render props of a component.
 */
export interface IressCustomiseSlot extends IressCSSProps, IressTestProps {
  className?: string;
  style?: React.CSSProperties;
}

export type IressHTMLAttributes<T = HTMLDivElement> = WithDataAttributes<
  React.HTMLAttributes<T>
>;

export type IressInputHTMLAttributes<T = HTMLInputElement> = WithDataAttributes<
  React.InputHTMLAttributes<T>
>;

export type IressAnchorHTMLAttributes<T = HTMLAnchorElement> =
  WithDataAttributes<React.AnchorHTMLAttributes<T>>;

export type IressButtonHTMLAttributes<T = HTMLButtonElement> =
  WithDataAttributes<React.ButtonHTMLAttributes<T>>;

export type IressFormHTMLAttributes<T = HTMLFormElement> = WithDataAttributes<
  React.FormHTMLAttributes<T>
>;

/**
 * @deprecated, use ResponsiveProps<T> instead
 */
export interface ResponsiveSizing<T> {
  xs?: T | null;
  sm?: T | null;
  md?: T | null;
  lg?: T | null;
  xl?: T | null;
  xxl?: T | null;
}

type VariablePaddingSizeDimension =
  | PaddingSize
  | PaddingSizes
  | SpacingToken
  | null;

export interface VariablePaddingSize {
  b?: VariablePaddingSizeDimension;
  l?: VariablePaddingSizeDimension;
  r?: VariablePaddingSizeDimension;
  t?: VariablePaddingSizeDimension;
  x?: VariablePaddingSizeDimension;
  y?: VariablePaddingSizeDimension;
}

export interface LabelValue {
  label: string;
  testId?: string;
  value?: FormControlValue;
}

export interface LabelValueMeta extends LabelValue {
  append?: React.ReactNode;
  divider?: boolean;
  meta?: React.ReactNode;
  prepend?: React.ReactNode;
}

export interface FormattedLabelValueMeta extends LabelValueMeta {
  formattedLabel?: React.ReactNode;
  formattedMeta?: React.ReactNode;
}

export interface BreakpointDetail {
  mediaQuery: string;
  screenWidthRange: string;
  minScreenWidth: string;
  maxScreenWidth?: string;
  containerMaxWidth: string;
  viewportWidth: number;
}

/**
 * IressCSSProps allow you to style components using the design system tokens.
 * **Note:** These are the only props we support for styling components. Anything else is at your own risk.
 */
export interface IressCSSProps {
  /**
   * **`bg`** sets the background color of an element using the `background-color` css property using the color tokens in the design system.
   *
   * We recommend using the following token values for best background contrast:
   * - `colour.primary.fill` for primary backgrounds that need to stand out
   * - `colour.primary.surface` for primary backgrounds that need to be less prominent
   * - `colour.neutral.10` for the base background color, normally white in light mode or shade of grey in dark mode
   * - `colour.neutral.20` for a slightly darker background color, used in neutral state components
   * - `colour.system.danger.fill` for error backgrounds that need to stand out
   * - `colour.system.danger.surface` for error backgrounds that need to be less prominent
   * - `colour.system.success.fill` for success backgrounds that need to stand out
   * - `colour.system.success.surface` for success backgrounds that need to be less prominent
   * - `colour.system.warning.fill` for warning backgrounds that need to stand out
   * - `colour.system.warning.surface` for warning backgrounds that need to be less prominent
   * - `colour.system.info.fill` for info backgrounds that need to stand out
   * - `colour.system.info.surface` for info backgrounds that need to be less prominent
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-color
   */
  bg?: ResponsiveProp<UtilityValues['color']>;

  /**
   * The **`border-radius`** CSS property rounds the corners of an element's outer border edge using the radius tokens in the design system.
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-radius
   */
  borderRadius?: ResponsiveProp<UtilityValues['borderRadius']>;

  /**
   * The **`color`** CSS property sets the foreground color value of an element's text and text decorations using the colour tokens from the design system. It also sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
   *
   * We recommend using the following token values for best color contrast:
   * - `colour.primary.onFill` used on top of `colour.primary.fill` for primary text that needs to stand out
   * - `colour.primary.text` used on top of `colour.primary.surface` or `colour.neutral.10` for primary text that needs to be less prominent
   * - `colour.neutral.70` used on top of `colour.neutral.10` or `colour.neutral.20` for muted text
   * - `colour.neutral.80` used on top of `colour.neutral.10` or `colour.neutral.20` for standard text
   * - `colour.system.danger.onFill` used on top of `colour.system.danger.fill` for error text that needs to stand out
   * - `colour.system.danger.text` used on top of `colour.system.danger.surface` for error text that needs to be less prominent
   * - `colour.system.success.onFill` used on top of `colour.system.success.fill` for success text that needs to stand out
   * - `colour.system.success.text` used on top of `colour.system.success.surface` for success text that needs to be less prominent
   * - `colour.system.warning.onFill` used on top of `colour.system.warning.fill` for warning text that needs to stand out
   * - `colour.system.warning.text` used on top of `colour.system.warning.surface` for warning text that needs to be less prominent
   * - `colour.system.info.onFill` used on top of `colour.system.info.fill` for informative text that needs to stand out
   * - `colour.system.info.text` used on top of `colour.system.info.surface` for informative text that needs to be less prominent
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/color
   */
  color?: ResponsiveProp<UtilityValues['color']>;

  /**
   * The `focusable` prop is used to apply the focus elevation when focused. It can be set to `true` to apply focus styles on focus, or `'within'` to apply focus styles when the element or any of its children are focused.
   */
  focusable?: 'true' | 'within';

  /**
   * Set **`hide`** to hide an element completely using `display: none`. It can also be set to an object of breakpoints to hide the element at specific breakpoints.
   *
   * Hide on all breakpoints: `hide: true`
   * Hide on specific breakpoints: `hide: { xs: false, sm: true, md: false, lg: true, xl: false, xxl: true }`
   *
   * Notes:
   * - If you need to hide an element but allow it to be visible to screen readers, use the `srOnly` prop instead.
   * - Consider if you can conditionally render the element instead of hiding it.
   */
  hide?: ResponsiveProp<UtilityValues['hide']>;

  /**
   * Elevate a layer by using a **`layerStyle`**. These are connected to the elevation tokens in the design system. They can be combined to create hierarchy and structure.
   *
   * - `elevation.raised`: Raised elevations sit slightly higher than other content. They are reserved for cards that can be moved, such as Jira issue cards and Trello cards. In special circumstances, they can be used for cards as a way to provide additional heirarchy or emphasis.
   * - `elevation.floating`: Floating is the highest elevation available. It is reserved for a UI that sits over another UI, such as modals, dialogs, dropdown menus, floating toolbars, and floating single-action buttons.
   * - `elevation.overflow`: Overflow is a shadow indicating content has scrolled outside a view. It can be used for vertical or horizontal scroll. An example of overflow shadows is the horizontal scroll in tables on a Confluence page.
   */
  layerStyle?: ResponsiveProp<
    | 'elevation.raised'
    | 'elevation.floating'
    | 'elevation.overflow'
    | 'elevation.focus'
    | 'elevation.focusCompact'
  >;

  /**
   * The **`max-width`** CSS property sets the maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified by `max-width`.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-width
   */
  maxWidth?: ResponsiveProp<UtilityValues['maxWidth']>;

  /**
   * The **`m`** property is short for `margin`, and sets the margin area on all four sides of an element.
   *
   * It uses the spacing tokens in the design system. You can also use the negative values to overlap elements or ignore padding based on the design requirements.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin
   */
  m?: ResponsiveProp<UtilityValues['margin']>;

  /**
   * The **`my`** property is short for `margin-block`. It defines the logical block start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   *
   * It uses the spacing tokens in the design system. You can also use the negative values to overlap elements or ignore padding based on the design requirements.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block
   */
  my?: ResponsiveProp<UtilityValues['marginBlock']>;

  /**
   * The **`mx`** property is short for `margin-inline`. It is a shorthand property that defines both the logical inline start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   *
   * It uses the spacing tokens in the design system. You can also use the negative values to overlap elements or ignore padding based on the design requirements.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline
   */
  mx?: ResponsiveProp<UtilityValues['marginInline']>;

  /**
   * The **`mb`** property is short for `margin-bottom` and sets the margin area on the bottom side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * It uses the spacing tokens in the design system.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  mb?: ResponsiveProp<UtilityValues['marginBottom']>;

  /**
   * The **`ml`** property is short for `margin-left` and sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * It uses the spacing tokens in the design system.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   */
  ml?: ResponsiveProp<UtilityValues['marginLeft']>;

  /**
   * The **`mr`** property is short for `margin-right` and sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * It uses the spacing tokens in the design system.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  mr?: ResponsiveProp<UtilityValues['marginRight']>;

  /**
   * The **`mt`** property is short for `margin-top` and sets the margin area on the top side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * It uses the spacing tokens in the design system.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-top
   */
  mt?: ResponsiveProp<UtilityValues['marginTop']>;

  /**
   * The **`noGutter`** property is used to remove the bottom margin from the last child of a component.
   * This is useful when you want to avoid extra spacing at the end of a layout.
   */
  noGutter?: boolean;

  /**
   * The **`p`** property is short for `padding`, and sets the padding area on all four sides of an element at once.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding
   */
  p?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`py`** property is short for `padding-block`. It defines the logical block start and end paddings of an element, which maps to physical paddings depending on the element's writing mode, directionality, and text orientation.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block
   */
  py?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`px`** property is short for `padding-inline`. It is a shorthand property that defines both the logical inline start and end paddings of an element, which maps to physical paddings depending on the element's writing mode, directionality, and text orientation.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline
   */
  px?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`pb`** property is short for `padding-bottom` and sets the padding area on the bottom side of an element.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  pb?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`pl`** property is short for `padding-left` and sets the padding area on the left side of an element.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   */
  pl?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`pr`** property is short for `padding-right` and sets the padding area on the right side of an element.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  pr?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`pt`** property is short for `padding-top` and sets the padding area on the top side of an element.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   */
  pt?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`row-gap`** CSS property sets the size of the gap (gutter) between an element's rows.
   *
   * Note: It only has an effect when used as a direct child of a layout component, such as IressRow, IressStack or IressInline.
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **47** | **52**  | **10.1** | **16** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/row-gap
   */
  rowGap?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * Set **`srOnly`** to hide an element visually but still make it accessible to screen readers. It can also be set to an object of breakpoints to hide the element at specific breakpoints.
   *
   * Hide on all breakpoints: `srOnly: true`
   * Hide on specific breakpoints: `srOnly: { xs: false, sm: true, md: false, lg: true, xl: false, xxl: true }`
   */
  srOnly?: ResponsiveProp<UtilityValues['srOnly']>;

  /**
   * The **`stretch`** property is used to stretch an element to fill the available space in its parent container. It sets the `height` property to `100%` and `alignSelf` to `stretch`, allowing the element to expand and contract based on the size of its parent.
   */
  stretch?: boolean;

  /**
   * The **`text-align`** CSS property sets the horizontal alignment of the inline-level content inside a block element or table-cell box.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/text-align
   */
  textAlign?: ResponsiveProp<
    'left' | 'right' | 'center' | 'justify' | 'inherit'
  >;

  /**
   * Select the typography to be used using the **`textStyle`** prop. These are connected to the typography tokens in the design system.'
   *
   * - `typography.body.sm` - Use for small components such as badges and disclaimers, as well as compact variations of tables and lists.
   * - `typography.body.md` - The most commonly used body text size, used for most text content in the product and the default state of all components in the design system.
   * - `typography.body.lg` - Use for tag lines, subtitles, and other large text content in the product.
   * - `typography.heading.1` - Use for the main page title to establish a clear hierarchy. There is typically only one H1 per screen, emphasising the primary purpose or context of the page.
   * - `typography.heading.2` - Use for primary section headings within a page to organise content and guide the user through key areas. Also suitable for large components—such as modals—where space allows and where it pairs well with body.md or body.lg.
   * - `typography.heading.3` - Use for sub-sections under H2s to further structure content and maintain a clear visual hierarchy. Ideal for breaking down complex sections into manageable parts.
   * - `typography.heading.4` - Use for supporting headings within content blocks or small components where space is limited—such as table headers, cards, or side panels. Provides structure without overwhelming the layout.
   * - `typography.heading.5` - Use for minor labels or titles in compact UI elements, such as cards, sidebars, or inline labels. Best used to emphasise supplementary information without drawing too much attention. Works well with body.sm and is ideal for subtle content like fine print. Use sparingly to preserve typographic hierarchy.
   * - `typography.code` - Used to display code snippets in the product, such as in the API documentation.
   */
  textStyle?: ResponsiveProp<UtilityValues['textStyle']>;

  /**
   * The **`width`** CSS property sets an element's width. By default, it sets the width of the content area, but if `box-sizing` is set to `border-box`, it sets the width of the border area.
   *
   * This prop only allows widths available throughout the component library. To use a custom width, you need to use the `style` prop, or add a custom class to the element and use CSS.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/width
   */
  width?: ResponsiveProp<UtilityValues['width']>;
}

export interface IressTestProps {
  /**
   * The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.
   *
   * Notes:
   * - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library.
   * - Only use this prop for your tests
   *
   * @see https://testing-library.com/docs/queries/bytestid
   */
  'data-testid'?: string;
}

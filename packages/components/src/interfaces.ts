import type { CSSProperties, ReactNode } from 'react';
import type {
  PositiveSpacingToken,
  FormControlValue,
  ResponsiveProp,
  SpacingToken,
  Statuses,
  SizeToken,
} from './types';
import type { UtilityValues } from './styled-system/types/prop-type';

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

/**
 * Validation message object used in feedback components.
 */
export interface ValidationMessageObj {
  /**
   * The test ID for the validation message element.
   */
  dataTestId?: string;

  /**
   * The validation message to be displayed.
   */
  message: string;

  /**
   * The validation status indicating the type of message.
   */
  status?: Statuses;

  /**
   * The ID of the element the message is describing.
   */
  linkToTarget?: string;

  /**
   * Prefix to the validation message. Will be `status` prop if nothing is provided.
   */
  prefix?: ReactNode;

  /**
   * If set to true, the prefix will be visually displayed (default is only available to screen readers)
   */
  visiblePrefix?: boolean;
}

/**
 * This allows for customising the slot/render props of a component.
 */
export interface IressCustomiseSlot extends IressCSSProps, IressTestProps {
  /**
   * Class name of the slot.
   */
  className?: string;

  /**
   * Style object to be applied to the slot.
   */
  style?: CSSProperties;
}

/**
 * Value that is used across custom form controls that display a label and store the value, usually to display in a select or dropdown.
 */
export interface LabelValue<T extends FormControlValue = FormControlValue> {
  /**
   * The label to be displayed for the option.
   */
  label: string;

  /**
   * The test ID for the option element.
   */
  testId?: string;

  /**
   * The value associated with the option.
   */
  value?: T;
}

/**
 * Extended label-value pair with additional metadata for richer display options.
 */
export interface LabelValueMeta<
  T extends FormControlValue = FormControlValue,
> extends LabelValue<T> {
  /**
   * Append content to provide extra context after the label.
   * Usually used for badges or supplementary information.
   */
  append?: ReactNode;

  /**
   * Group options under a common heading.
   * **Note:** When `children` is provided, the option becomes a non-selectable group label and its children are the selectable options within that group. `value` is not used in these cases.
   */
  children?: Omit<LabelValueMeta<T>, 'children'>[];

  /**
   * Whether to display a divider below the option.
   */
  divider?: boolean;

  /**
   * Metadata to provide more context about the option.
   * Usually displayed in a smaller font or different style.
   */
  meta?: ReactNode;

  /**
   * Content to prepend before the label.
   * Usually used for icons or indicators.
   */
  prepend?: ReactNode;
}

/**
 * Extended label-value pair with formatted label and metadata for advanced display options, usually to display the search term highlighted.
 */
export interface FormattedLabelValueMeta<
  T extends FormControlValue = FormControlValue,
> extends LabelValueMeta<T> {
  /**
   * Group options under a common heading.
   * **Note:** When `children` is provided, the option becomes a non-selectable group label and its children are the selectable options within that group. `value` is not used in these cases.
   */
  children?: Omit<FormattedLabelValueMeta<T>, 'children'>[];

  /**
   * Formatted label content, allowing for highlighted search terms.
   */
  formattedLabel?: ReactNode;

  /**
   * Formatted metadata content, allowing for highlighted search terms.
   */
  formattedMeta?: ReactNode;
}

/**
 * Details about a specific breakpoint in the design system.
 */
export interface BreakpointDetail {
  /**
   * The media query string for the breakpoint.
   * This must be valid CSS media query syntax.
   */
  mediaQuery: string;

  /**
   * The name of the screen width range for the breakpoint.
   * Used to display in documentation and debugging.
   */
  screenWidthRange: string;

  /**
   * The minimum screen width for the breakpoint.
   */
  minScreenWidth: string;

  /**
   * The maximum screen width for the breakpoint.
   */
  maxScreenWidth?: string;

  /**
   * The maximum width of the container at this breakpoint.
   */
  containerMaxWidth: string;

  /**
   * The viewport width in pixels for the breakpoint.
   * Used for design and development reference, as a guideline for debugging responsive layouts.
   */
  viewportWidth: number;
}

/**
 * IressCSSProps allow you to style components using the design system tokens.
 * **Note:** These are the only props we support for styling components. Anything else is at your own risk.
 */
export interface IressCSSProps {
  /**
   * The **`align-self`** CSS property overrides a flex item's alignment set by its flex container's `align-items` property.
   *
   * This is useful when you want a single flex item to have a different alignment than the others in the flex container.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/align-self
   */
  alignSelf?: ResponsiveProp<'start' | 'end' | 'center' | 'stretch'>;

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
  bg?: UtilityValues['color'];

  /**
   * The **`border-radius`** CSS property rounds the corners of an element's outer border edge using the radius tokens in the design system.
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
  color?: UtilityValues['color'];

  /**
   * The `focusable` prop is used to apply the focus ring when focused. It can be set to `true` to apply focus styles on focus, or `'within'` to apply focus styles when the element or any of its children are focused.
   */
  focusable?: 'true' | 'within';

  /**
   * The `flex` prop is used to set the flex grow property of an element. It allows the element to grow and fill available space in a flex container.
   *
   * In the design system, we only allow `1` as a value to ensure consistent behavior across components, ensuring that flex items expand in a predictable way and preventing layout inconsistencies between implementations.
   */
  flex?: '1';

  /**
   * Set **`hideFrom`** to hide an element completely using `display: none`. It can be combined with `hideBelow` to create complex responsive visibility rules.
   *
   * Hide on all breakpoints: `hideFrom: true`
   * Hide on specific breakpoints: `hideFrom: 'lg'`
   *
   * Notes:
   * - If you need to hide an element but allow it to be visible to screen readers, use the `srOnly` prop instead.
   * - Consider if you can conditionally render the element instead of hiding it using the `useBreakpoint` hook.
   */
  hideFrom?: UtilityValues['hideFrom'];

  /**
   * Set **`hideBelow`** to hide an element completely using `display: none`. It can be combined with `hideFrom` to create complex responsive visibility rules.
   *
   * Hide below a specific breakpoint: `hideBelow: 'lg'`
   *
   * Notes:
   * - If you need to hide an element but allow it to be visible to screen readers, use the `srOnly` prop instead.
   * - Consider if you can conditionally render the element instead of hiding it using the `useBreakpoint` hook.
   */
  hideBelow?: UtilityValues['hideBelow'];

  /**
   * The **`max-width`** CSS property sets the maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified by `max-width`.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-width
   */
  maxWidth?: SizeToken;

  /**
   * The **`m`** property is short for `margin`, and sets the margin area on all four sides of an element.
   *
   * It uses the spacing tokens in the design system. You can also use the negative values to overlap elements or ignore padding based on the design requirements.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin
   */
  m?: ResponsiveProp<SpacingToken | 'auto'>;

  /**
   * The **`my`** property is short for `margin-block`. It defines the logical block start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   *
   * It uses the spacing tokens in the design system. You can also use the negative values to overlap elements or ignore padding based on the design requirements.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block
   */
  my?: ResponsiveProp<SpacingToken | 'auto'>;

  /**
   * The **`mx`** property is short for `margin-inline`. It is a shorthand property that defines both the logical inline start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   *
   * It uses the spacing tokens in the design system. You can also use the negative values to overlap elements or ignore padding based on the design requirements.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline
   */
  mx?: ResponsiveProp<SpacingToken | 'auto'>;

  /**
   * The **`mb`** property is short for `margin-bottom` and sets the margin area on the bottom side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * It uses the spacing tokens in the design system.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  mb?: ResponsiveProp<SpacingToken | 'auto'>;

  /**
   * The **`ml`** property is short for `margin-left` and sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * It uses the spacing tokens in the design system.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   */
  ml?: ResponsiveProp<SpacingToken | 'auto'>;

  /**
   * The **`mr`** property is short for `margin-right` and sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * It uses the spacing tokens in the design system.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  mr?: ResponsiveProp<SpacingToken | 'auto'>;

  /**
   * The **`mt`** property is short for `margin-top` and sets the margin area on the top side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * It uses the spacing tokens in the design system.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-top
   */
  mt?: ResponsiveProp<SpacingToken | 'auto'>;

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
   * @see https://developer.mozilla.org/docs/Web/CSS/padding
   */
  p?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`py`** property is short for `padding-block`. It defines the logical block start and end paddings of an element, which maps to physical paddings depending on the element's writing mode, directionality, and text orientation.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block
   */
  py?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`px`** property is short for `padding-inline`. It is a shorthand property that defines both the logical inline start and end paddings of an element, which maps to physical paddings depending on the element's writing mode, directionality, and text orientation.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline
   */
  px?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`pb`** property is short for `padding-bottom` and sets the padding area on the bottom side of an element.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  pb?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`pl`** property is short for `padding-left` and sets the padding area on the left side of an element.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   */
  pl?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`pr`** property is short for `padding-right` and sets the padding area on the right side of an element.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  pr?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`pt`** property is short for `padding-top` and sets the padding area on the top side of an element.
   *
   * It uses the spacing tokens in the design system. Padding cannot use negative values, if you need to overlap elements or ignore padding, use the margin property instead.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   */
  pt?: ResponsiveProp<PositiveSpacingToken>;

  /**
   * The **`scrollable`** property enables scrolling behavior for an element when its content overflows its bounds. It sets the `overflow` CSS property to `auto`, allowing scrollbars to appear as needed. The scrollbar has been styled to match the design system.
   * You can set the value to `true` to enable scrolling on both axes, or specify `'x'` or `'y'` to restrict scrolling to a single axis.
   */
  scrollable?: UtilityValues['scrollable'];

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
   * - `typography.heading.1` - Use for the main page title to establish a clear hierarchy. There is typically only one H1 per screen, emphasising the primary purpose or context of the page.
   * - `typography.heading.2` - Use for primary section headings within a page to organise content and guide the user through key areas. Also suitable for large components—such as modals—where space allows and where it pairs well with body.md.
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
   * @see https://developer.mozilla.org/docs/Web/CSS/width
   */
  width?: ResponsiveProp<SizeToken | 'auto'>;
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

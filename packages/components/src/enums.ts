export enum GlobalCSSClass {
  FormElement = 'iress-form-element',
  FormElementInner = 'iress-form-element__inner',
  FormElementInvalid = 'iress-form-element--invalid',
  FormLabel = 'iress-form-label',
  SROnly = 'iress-sr-only',
  NoScroll = 'iress-no-scroll',
  Hidden = 'iress-hidden',
  IgnoreStack = 'iress-u-stack--ignore',
  TextAlignBase = 'iress--text-align',
  HiddenMobile = 'iress-hidden--mobile',
  Width = 'iress-width',
  Display = 'iress-display',
  Padding = 'iress-p',
}

/** @deprecated Breakpoint enum is now deprecated and will be removed in a future version. Please use the Breakpoints type instead. **/
export enum Breakpoint {
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
  Xxl = 'xxl',
}

/** @deprecated DisplayMode enum is now deprecated and will be removed in a future version. Please use the DisplayModes type instead. **/
export enum DisplayMode {
  Inline = 'inline',
  Overlay = 'overlay',
}

/** @deprecated HeadingLevel enum is now deprecated and will be removed in a future version. Please use the HeadingLevels type instead. */
export enum HeadingLevel {
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

/** @deprecated LoggerLevels enum is now deprecated and will be removed in a future version. Please use the LoggerLevels type instead. **/
export enum LoggerLevels {
  Log = 'log',
  Warn = 'warn',
  Error = 'error',
}

/** @deprecated TextFieldType enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
export enum TextFieldType {
  Date = 'date',
  Email = 'email',
  Number = 'number',
  Password = 'password',
  Search = 'search',
  Tel = 'tel',
  Text = 'text',
  Url = 'url',
  Time = 'time',
  Color = 'color',
  File = 'file',
  DateTimeLocal = 'datetime-local',
}

/** @deprecated FormElementType enum is now deprecated and will be removed in a future version. Please use the FormElementTypes type instead. **/
export enum FormElementType {
  Date = 'date',
  Email = 'email',
  Number = 'number',
  Password = 'password',
  Search = 'search',
  Tel = 'tel',
  Text = 'text',
  Url = 'url',
  Time = 'time',
  File = 'file',
  Color = 'color',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Select = 'select',
  CheckboxGroup = 'checkbox-group',
  RadioGroup = 'radio-group',
  Combobox = 'combobox',
  DateTimeLocal = 'datetime-local',
}

/** @deprecated FormElementWidth enum is now deprecated and will be removed in a future version. Please use the FormElementWidths type instead. **/
export enum FormElementWidth {
  Two = '2',
  Four = '4',
  Six = '6',
  Eight = '8',
  Ten = '10',
  Twelve = '12',
  Sixteen = '16',
  TwentyFivePercent = '25perc',
  FiftyPercent = '50perc',
  SeventyFivePercent = '75perc',
}

/** @deprecated FloatingUIAlign enum is now deprecated and will be removed in a future version. Please use the FloatingUIAligns type instead. **/
export enum FloatingUIAlign {
  Auto = 'auto',
  BottomStart = 'bottom-start',
  BottomCenter = 'bottom',
  BottomEnd = 'bottom-end',
  TopStart = 'top-start',
  TopCenter = 'top',
  TopEnd = 'top-end',
  LeftStart = 'left-start',
  LeftCenter = 'left',
  LeftEnd = 'left-end',
  RightStart = 'right-start',
  RightCenter = 'right',
  RightEnd = 'right-end',
}

/** @deprecated SystemValidationStatus enum is now deprecated and will be removed in a future version. Please use the SystemValidationStatuses type instead. **/
export enum SystemValidationStatus {
  Danger = 'danger',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

/** @deprecated TextAlign enum is now deprecated and will be removed in a future version. Please use the TextAligns type instead. **/
export enum TextAlign {
  Inherit = 'inherit',
  Left = 'left',
  Center = 'center',
  Right = 'right',
  Justify = 'justify',
}

/** @deprecated TextElement enum is now deprecated and will be removed in a future version. Please use the TextElements type instead. **/
export enum TextElement {
  P = 'p',
  Div = 'div',
  Span = 'span',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  Code = 'code',
  Blockquote = 'blockquote',
  Caption = 'caption',
  Cite = 'cite',
  Small = 'small',
}

/** @deprecated TextMode enum is now deprecated and will be removed in a future version. Please use the TextModes type instead. **/
export enum TextMode {
  /** @deprecated TextMode.Body enum is deprecated and will be removed in a future version. Please use the variant prop instead. **/
  Body = 'body',
  Danger = 'danger',
  Info = 'info',
  Muted = 'muted',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Positive = 'positive',
  Negative = 'negative',
}

/** @deprecated TextVariant enum is now deprecated and will be removed in a future version. Please use the TextVariants type instead. **/
export enum TextVariant {
  Blockquote = 'blockquote',
  Bold = 'bold',
  Body = 'body',
  Code = 'code',
  Display = 'display',
  Display1 = 'display1',
  Display2 = 'display2',
  Display3 = 'display3',
  Display4 = 'display4',
  Heading1 = 'h1',
  Heading2 = 'h2',
  Heading3 = 'h3',
  Heading4 = 'h4',
  Heading5 = 'h5',
  Heading6 = 'h6',
  Italic = 'italic',
  Lead = 'lead',
  Small = 'small',
  Cite = 'cite',
  Caption = 'caption',
}

/** @deprecated PaddingSize enum is now deprecated and will be removed in a future version. Please use the PaddingSizes type instead. **/
export enum PaddingSize {
  None = 'none',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
}

/** @deprecated ModalSize enum is now deprecated and will be removed in a future version. Please use the ModalSizes type instead. **/
export enum ModalSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  FullPage = 'fullpage',
}

/** @deprecated GutterSize enum is now deprecated and will be removed in a future version. Please use the GutterSizes type instead. **/
export enum GutterSize {
  None = 'none',
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

/** @deprecated HorizontalAlign is now deprecated and will be removed in a future version. Please use the HorizontalAligns type instead. */
export enum HorizontalAlign {
  Around = 'around',
  Between = 'between',
  Center = 'center',
  Evenly = 'evenly',
  Left = 'left',
  Right = 'right',
}

/** @deprecated VerticalAlign is now deprecated and will be removed in a future version. Please use the VerticalAligns type instead. */
export enum VerticalAlign {
  Bottom = 'bottom',
  Middle = 'middle',
  Stretch = 'stretch',
  Top = 'top',
}

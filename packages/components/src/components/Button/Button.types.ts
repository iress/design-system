import { type ReactNode } from 'react';
import { type IressButtonHTMLAttributes } from '@/interfaces';
import { type Breakpoint } from '@/enums';
import { type ButtonGroupItemProps } from '../ButtonGroup';
import { type Breakpoints, type FormControlValue } from '@/types';

export interface IressButtonProps
  extends Omit<IressButtonHTMLAttributes<ButtonRef>, 'value'>,
    ButtonGroupItemProps {
  /**
   * Content for the append slot.
   */
  append?: ReactNode;

  /**
   * Accepts key/value pairs of attributes to be applied to the rendered native element.
   * @deprecated Use the native HTML attributes instead.
   */
  attrs?: Record<string, string | boolean>;

  /**
   * Content is placed between prepend and append if provided. Used to describe the expected action of this button.
   */
  children?: ReactNode;

  /**
   * If provided a href, will download the file instead of open it within the browser. Has no effect if href is not provided.
   */
  download?: boolean;

  /**
   * If `true`, the button will stretch to fill it's container. If set to a breakpoint, the button will be fluid up till that breakpoint.
   */
  fluid?: boolean | Breakpoint | Breakpoints | 'true' | '' | 'false';

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   */
  href?: string;

  /**
   * When true, button is in loading state. If provided a string, will be used as the loading text for screen readers.
   */
  loading?: boolean | string;

  /**
   * Style of the button.
   */
  mode?: ButtonMode | ButtonModes;

  /**
   * Prevents text wrapping if set to true.
   */
  noWrap?: boolean;

  /**
   * Content for the prepend slot.
   */
  prepend?: ReactNode;

  /**
   * Specifies the relationship of the target object to the link object.
   * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
   */
  rel?: string;

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
   */
  target?: string;

  /**
   * The type of the button.
   */
  type?: ButtonType | ButtonTypes;

  /**
   * The value of the button, when used in `IressButtonGroup`.
   */
  value?: FormControlValue;
}

/** @deprecated ButtonMode enum is now deprecated and will be removed in a future version. Please use the ButtonModes type instead. */
export enum ButtonMode {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Link = 'link',
  Danger = 'danger',
  Positive = 'positive',
  Negative = 'negative',
}
export const BUTTON_MODES = [
  'primary',
  'secondary',
  'tertiary',
  'link',
  'danger',
  'positive',
  'negative',
] as const;
export type ButtonModes = (typeof BUTTON_MODES)[number];

/** @deprecated ButtonType enum is now deprecated and will be removed in a future version. Please use the ButtonTypes type instead. */
export enum ButtonType {
  Button = 'button',
  Reset = 'reset',
  Submit = 'submit',
}
export const BUTTON_TYPES = ['button', 'reset', 'submit'] as const;
export type ButtonTypes = (typeof BUTTON_TYPES)[number];

export enum ButtonCssClass {
  Active = 'iress--active',
  Base = 'iress-u-button',
  Fluid = 'iress--fluid',
  Loading = 'iress--loading',
  Mode = 'iress--mode',
  NoWrap = 'iress--no-wrap',
  Prepend = 'iress-u-button__prepend',
}

export type ButtonRef = HTMLAnchorElement | HTMLButtonElement;

export interface ButtonComponent
  extends React.ForwardRefExoticComponent<
    IressButtonProps & React.RefAttributes<ButtonRef>
  > {
  /** @deprecated IressButton.Mode enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Mode: typeof ButtonMode;

  /** @deprecated IressButton.Type enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Type: typeof ButtonType;

  /** @deprecated IressButton.Fluid enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
  Fluid: typeof Breakpoint;
}

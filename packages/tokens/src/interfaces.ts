import { type Type } from './enums';
import { type CSSProperties } from 'react';

export interface IressDesignToken<T = string> {
  /**
   * A description of why the token is deprecated, and if possible a suggestion for a replacement.
   */
  $deprecated?: string;

  /**
   * A description of the token and its purpose.
   */
  $description: string;

  /**
   * Extensions to the token, usually used to describe its usage in downstream applications (eg. Styler).
   */
  $extensions?: {
    /**
     * Adds an alias to the token, which can be used in place of the original token name.
     * This is useful for providing a more user-friendly name or for creating a shorthand version of the token.
     */
    'iress.aliases'?: string[];

    /**
     * Usually used for colour tokens, this extension defines the allowed foreground tokens, hence must achieve sufficient contrast to meet AA.
     * The first token in the array should be the default foreground token.
     */
    'iress.contrast.AA'?: string[];

    /**
     * Marks the token as read-only and cannot be modified by themes.
     */
    'iress.readonly'?: boolean;

    /**
     * A special field used by Styler to render custom font URL fields for font family tokens.
     */
    'styler.field.fontUrls'?: {
      /**
       * The tokens to watch for non-safe web font, which will trigger this field to show.
       */
      tokens: string[];
    };

    /**
     * A special field used by Styler to render a range field for tokens that are calculated from another token (eg. spacing and radius).
     */
    'styler.field.range'?: {
      /**
       * The maximum value for the range slider in pixels.
       */
      max?: number;

      /**
       * The step the slider should increment/decrement by in pixels.
       */
      step?: number;

      /**
       * The tokens to include in the matrix, usually a set of 3-4 tokens that are related.
       */
      tokens: string[];

      /**
       * The visual representation of the matrix, which CSS properties to apply the radius/spacing to.
       */
      visual: 'width' | 'topRightRadius';
    };

    /**
     * Hides the field in the Styler UI.
     */
    'styler.hide'?: boolean;

    /**
     * Used to set the maximum value for input fields in the Styler UI (in pixels).
     * For example, a font size token may want to limit the maximum value to 100.
     */
    'styler.input.max'?: number;

    /**
     * Changes the label of the token in the Styler UI.
     * If not provided, it will use the last part of the token name in title case.
     */
    'styler.label'?: string;

    /**
     * Groups the token in the Styler UI. Tokens with the same group name will be displayed together in the same section.
     * If the group name is found in the schema, it will use that to fill out the title and description of the section.
     */
    'styler.panel'?: string;

    /**
     * Specifies a token to watch for changes in the Styler UI.
     * When the watched token changes, this token will be updated accordingly.
     */
    'styler.watchToken'?: string;
  };

  /**
   * The type of the token, usually connected to the type of value it represents.
   */
  $type: Type;

  /**
   * The fallback value of the token. Usually you would use the theme's value rather than the value directly from the schema.
   * The value listed in the design token schema is the "white-label" value.
   */
  $value: T;
}

export interface IressDesignTokenGroup {
  /**
   * A description of why the token is deprecated, and if possible a suggestion for a replacement.
   */
  $deprecated?: string;

  /**
   * A description of the token group and its purpose.
   */
  $description: string;

  /**
   * Extensions to the token group, usually used to describe its usage in downstream applications (eg. Styler).
   */
  $extensions?: {
    /**
     * Marks the tokens in this group as read-only and cannot be modified by themes.
     */
    'iress.readonly'?: boolean;

    /**
     * Adds a preview for elevation tokens in Styler using a box with the shadow and border applied to it.
     * The shadow, border and borderColor must be a token in the schema (eg. shadow.elevation.1 and border.elevation.1).
     * Note: This will only work if this token group is being used as a panel.
     */
    'styler.preview.elevation'?: {
      shadow: string;
      border?: string;
      borderColor?: string;
    };
  };

  /**
   * The default type of the token group. If provided, it will cascade down the rest of the token group.
   */
  $type?: Type;
}

export interface CSSVariablesMap {
  [key: string]: string | number | CSSVariablesMap;
}

export interface CompositeValue {
  /**
   * A composite value for a background token.
   * This type of token is not yet in the schema, we have custom types for it.
   */
  background: {
    attachment?: CSSProperties['backgroundAttachment'];
    clip?: CSSProperties['backgroundClip'];
    color: CSSProperties['backgroundColor'];
    image?: CSSProperties['backgroundImage'];
    origin?: CSSProperties['backgroundOrigin'];
    position?: CSSProperties['backgroundPosition'];
    repeat?: CSSProperties['backgroundRepeat'];
    size?: CSSProperties['backgroundSize'];
  };

  /**
   * A composite value for a border token.
   * This doesn't follow the spec exactly, it follows according to what Style Dictionary will translate!
   * @see https://tr.designtokens.org/format/#border
   */
  border: {
    color: CSSProperties['borderColor'];
    width?: string;
    style?: CSSProperties['borderStyle'];
  };

  /**
   * A composite value for a radius token.
   * This type of token is not yet in the schema, we have custom types for it.
   */
  radius: {
    topLeft?: CSSProperties['borderTopLeftRadius'];
    topRight?: CSSProperties['borderTopRightRadius'];
    bottomLeft?: CSSProperties['borderBottomLeftRadius'];
    bottomRight?: CSSProperties['borderBottomRightRadius'];
  };

  /**
   * A composite value for a shadow token.
   * This doesn't follow the spec exactly, it follows according to what Style Dictionary will translate!
   * @see https://tr.designtokens.org/format/#shadow
   */
  shadow: {
    color: string;
    offsetX?: string;
    offsetY?: string;
    blur?: string;
    spread?: string;
    type?: 'inset';
  };

  /**
   * A composite value for a typography token.
   * This doesn't follow the spec exactly, it follows according to what Style Dictionary will translate!
   * @see https://tr.designtokens.org/format/#typography
   */
  typography: {
    fontFamily?: CSSProperties['fontFamily'];
    fontSize?: CSSProperties['fontSize'];
    fontStyle?: CSSProperties['fontStyle'];
    fontVariant?: CSSProperties['fontVariant'];
    fontWeight?: CSSProperties['fontWeight'];
    fontWidth?: CSSProperties['fontStretch'];
    lineHeight?: CSSProperties['lineHeight'];
  };
}

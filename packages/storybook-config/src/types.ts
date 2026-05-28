import { type SourceProps } from '@storybook/addon-docs/blocks';
import type reactElementToJSXString from 'react-element-to-jsx-string';
import { type TestComponentMeta } from './components/TestTable';

export interface ParametersConfig {
  docs?: {
    source?: {
      code?: string;
      transform?: SourceProps['transform'];
    };
  };

  /**
   * Optional configuration for IDs-specific Storybook features, such as testing metadata. This is not a standard Storybook parameter and is used internally by the Iress Storybook setup.
   */
  idsConfig?: {
    /**
     * URL for guidelines documentation. If provided, a link will be appended to the tab navigation in the generated documentation pages, directing users to the full documentation for the component. The URL should be the base URL for the guidelines, and the specific page will be constructed based on the component's title.
     */
    guidelinesUrl?: string;

    /**
     * Optional metadata for component testing, used to generate test information in the documentation.
     */
    testMeta?: TestComponentMeta[];
  };
}

export type ReactElementToJSXStringOptions = Exclude<
  Parameters<typeof reactElementToJSXString>[1],
  undefined
>;

/**
 * Event for broadcasting hash changes from a parent window to an iframe Storybook instance.
 * Used to communicate hash changes between Storybook compositions.
 */
export interface BroadcastHashEvent {
  type: 'UPDATE_HASH';
  hash: string;
}

/**
 * Event for passing theme data between the parent window and iframe Storybook instances.
 * Used to synchronize themes across Storybook compositions.
 */
export interface PassThemeEvent {
  type: 'PASS_THEME';

  /**
   * Name of the theme.
   */
  name: string;

  /**
   * Optional href to a CSS file for the theme.
   */
  href?: string;

  /**
   * Optional raw CSS string for the theme.
   */
  css?: string;
}

/**
 * Event for loading a theme in an iframe Storybook instance.
 * Sent from the parent window to apply the selected theme.
 */
export interface LoadThemeEvent extends Omit<PassThemeEvent, 'type'> {
  type: 'LOAD_THEME';
}

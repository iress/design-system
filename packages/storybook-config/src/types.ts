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
     * Template to use for autodocs generation. 'default' uses the standard Storybook template, while 'component' uses a custom template designed for component documentation with enhanced prop tables and sections for guidelines and testing information.
     */
    autodocsTemplate?: 'default' | 'component';

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
 * Event posted from a Storybook iframe to its parent with the current content height.
 * Used by storybook embeds to auto-size the iframe.
 */
export interface RelaySizeEvent {
  type: 'RELAY_SIZE';
  height: number;
}

export interface RequestSizeEvent {
  type: 'REQUEST_SIZE';
}

/**
 * Event for controlling Storybook embeds via postMessage. Sent from the parent window to an iframe Storybook instance to configure the embed, such as which panels to show and which panel to select on load.
 * This allows for dynamic customisation of Storybook embeds in contexts like the guidelines site.
 */
export interface EmbedStorybookEvent {
  type: 'EMBED_STORYBOOK';
  panel?: string;
  allowedPanels?: string[];
  showPanel?: boolean;
  selectorsToHide?: string[];
}

/**
 * Event posted from a Storybook iframe to its parent indicating panel status.
 * Used to synchronize panel state between the iframe and parent, allowing the parent to react to changes in the embed's UI state.
 */
export interface RelayPanelEvent {
  type: 'RELAY_PANEL';
  flag: boolean;
  height: number;
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

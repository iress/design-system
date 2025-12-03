import type { OktaAuthOptions } from '@okta/okta-auth-js';

export interface AddonConfig extends OktaAuthOptions {
  /**
   * Whether the addon is disabled.
   * If set to true, it will disable the addon for this story.
   * This is useful for stories that do not require authentication.
   * @default false
   */
  disable?: boolean;

  /**
   * List of unprotected routes.
   * If set, these routes will not require authentication and display directly.
   *
   * This is the `path` part of the Storybook URL if its a docs url, otherwise its the story ID.
   *
   * Examples:
   * - Docs: `/docs/ids-button--default`
   * - Stories: `ids-button--default`
   */
  unprotected?: string[];
}

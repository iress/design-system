import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { cssVars } from '@iress-oss/ids-tokens';
import { type TagBadgeParameters } from 'storybook-addon-tag-badges/manager-helpers';

type TagSuffixFn = (tag: string) => string;

interface ManagerProps {
  /**
   * The title to show in the Storybook manager UI.
   * Defaults to "Iress Design System".
   */
  title?: string;

  /**
   * The logo to show in the Storybook manager UI.
   * Defaults to the IDS Wealth logo.
   */
  logo?: string;

  /**
   * The version to show in the version badge.
   */
  version?: string | ((ref?: string) => Promise<string> | string);
}

/**
 * Function to set up the Storybook manager configuration.
 * Used to centralise the configuration for all Storybook instances in multiple repositories.
 */
export const setUpManager = ({
  title = 'Iress Design System',
  logo = './assets/ids-logo-wealth.png',
  version,
}: ManagerProps) => {
  const config = addons.getConfig();

  addons.setConfig({
    theme: create({
      base: 'light',
      brandTitle: title,
      brandUrl: '/',
      brandImage: logo,
      brandTarget: '_self',
    }),
    IDS_ToggleStories: {
      disable: () => {
        return (
          process.env.STORYBOOK_VRT === 'true' ||
          process.env.STORYBOOK_MCP === 'true'
        );
      },
    },
    IDS_VersionBadge: {
      environment: () => {
        if (window.location.host.includes('localhost')) {
          return 'Local';
        }

        if (window.location.host.includes('staging')) {
          return 'Staging';
        }

        if (window.location.origin.includes('dev')) {
          return 'Dev';
        }

        if (window.location.origin.includes('chromatic')) {
          return 'Chromatic';
        }

        return '';
      },
      version,
    },
    sidebar: {
      ...config.sidebar,
      filters: {
        ...config.sidebar?.filters,
        hideDefaultStory: (item): boolean => {
          if (process.env.STORYBOOK_VRT === 'true') {
            return true;
          }

          return item.name !== 'Default';
        },
        hideByTag: (item): boolean => {
          return !item.tags?.includes('hideInSidebar');
        },
        vrt: (item): boolean => {
          if (process.env.STORYBOOK_VRT !== 'true') {
            return true;
          }

          return item.type === 'story' && !item.tags?.includes('vrt:false');
        },
        mcp: (item): boolean => {
          if (process.env.STORYBOOK_MCP !== 'true') {
            return true;
          }

          return item.type === 'docs' && !item.tags?.includes('mcp:false');
        },
      },
    },
    tagBadges: [
      {
        tags: { prefix: 'beta' },
        badge: ({ getTagSuffix, tag }) => {
          const oldComponent = (getTagSuffix as TagSuffixFn)(tag).trim();

          const title = oldComponent ? `Replaces ${oldComponent}` : 'Beta';
          const desc = oldComponent
            ? `This component is in beta and will replace ${oldComponent} in the next major version.`
            : 'This component is new, please provide feedback to the Frontend Enablement team if you encounter any issues.';

          return {
            text: 'Beta',
            style: {
              background: cssVars.colour.system.success.surface,
              color: cssVars.colour.system.success.text,
              borderColor: cssVars.colour.system.success.fill,
            },
            tooltip: {
              title,
              desc,
            },
          };
        },
        display: {
          mdx: ['story', 'component'],
          sidebar: [
            { type: 'story', skipInherited: true },
            { type: 'docs', skipInherited: true },
            { type: 'component', skipInherited: false },
            { type: 'group', skipInherited: false },
          ],
          toolbar: ['docs', 'story'],
        },
      },
      {
        tags: { prefix: 'caution' },
        badge: ({ getTagSuffix, tag }) => {
          const newComponent = (getTagSuffix as TagSuffixFn)(tag);

          return {
            text: 'Caution',
            style: {
              background: cssVars.colour.system.warning.surface,
              color: cssVars.colour.system.warning.text,
              borderColor: cssVars.colour.system.warning.fill,
            },
            tooltip: {
              title: `Use ${newComponent} instead`,
              desc: 'The design of this component is changing. Please use the new component instead.',
            },
          };
        },
        display: {
          mdx: ['story', 'component'],
          sidebar: [
            { type: 'story', skipInherited: true },
            { type: 'docs', skipInherited: true },
            { type: 'component', skipInherited: false },
            { type: 'group', skipInherited: false },
          ],
          toolbar: ['docs', 'story'],
        },
      },
      {
        tags: 'updated',
        badge: {
          text: 'Updated',
          style: {
            background: cssVars.colour.neutral[20],
            color: cssVars.colour.neutral[80],
            borderColor: cssVars.colour.neutral[30],
          },
          tooltip: {
            title: 'Updated',
            desc: 'This component has been recently updated with new props. The props have been marked as beta. Please tell us if there are any issues.',
          },
        },
        display: {
          mdx: ['story', 'component'],
          sidebar: [
            { type: 'story', skipInherited: true },
            { type: 'docs', skipInherited: true },
            { type: 'component', skipInherited: false },
            { type: 'group', skipInherited: false },
          ],
          toolbar: ['docs', 'story'],
        },
      },
    ] satisfies TagBadgeParameters,
  });
};

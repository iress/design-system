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
   * Guidelines site link shown in the toolbar.
   */
  guidelines?: {
    title?: string;
    description?: string;
    url: string;
  };

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
  guidelines,
  version,
}: ManagerProps) => {
  const config = addons.getConfig();

  if (guidelines) {
    const injectGuidelinesLink = () => {
      const target = document.getElementById('storybook-checklist-widget');
      if (!target || target.dataset.idsGuidelines) return;
      target.dataset.idsGuidelines = 'true';
      const container = target.parentElement ?? target;
      container.innerHTML = '';
      container.style.padding = '0';

      const link = document.createElement('a');
      link.href = guidelines.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.cssText = `display:flex;flex-direction:column;gap:4px;padding:8px 12px;font-size:13px;font-weight:600;text-decoration:none;color:${cssVars.colour.neutral[10]};background:color-mix(in srgb, ${cssVars.colour.neutral[80]}, transparent 5%);z-index:100;position:relative;`;
      link.innerHTML = `<span style="display:flex;align-items:center;gap:8px"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>${guidelines.title ?? 'Guidelines'}<span style="background:${cssVars.colour.data.bold[10]};color:${cssVars.colour.data.subtle[10]};font-size:11px;padding:0px 4px;border-radius:4px">NEW</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto;opacity:0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span>${guidelines.description ? `<span style="font-size:11px;color:${cssVars.colour.neutral[20]};font-weight:400">${guidelines.description}</span>` : ''}`;
      container.appendChild(link);
    };

    injectGuidelinesLink();
    const observer = new MutationObserver(injectGuidelinesLink);
    observer.observe(document.body, { childList: true, subtree: true });
  }


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

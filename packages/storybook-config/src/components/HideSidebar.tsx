/**
 * Adds styles to hide the sidebar table of contents in Storybook Docs.
 */
export const HideSidebar = () => (
  <style>{`.sbdocs-toc--custom {
    display: none !important;
  }`}</style>
);

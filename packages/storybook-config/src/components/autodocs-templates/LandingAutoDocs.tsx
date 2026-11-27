import { DocsContext, Story } from '@storybook/addon-docs/blocks';
import { useContext } from 'react';

export const LandingAutoDocs = () => {
  const docsContext = useContext(DocsContext);
  const stories = docsContext.componentStories();

  return (
    <>
      <style>{`.sbdocs-wrapper, .sbdocs.sbdocs-content { padding: 0; max-width: none } `}</style>
      {stories?.map((story) => (
        <Story key={story.id} of={story.moduleExport as never} />
      ))}
    </>
  );
};

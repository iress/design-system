import {
  Title,
  Subtitle,
  Description,
  Controls,
  useOf,
} from '@storybook/addon-docs/blocks';
import { ComponentCanvas } from './ComponentCanvas';

/**
 * Custom autodocs page that renders each story using ComponentCanvas,
 * which includes the "Open in Sandbox" action via useSandboxCanvasProps.
 */
export const AutoDocsPage = () => {
  const resolvedMeta = useOf<'meta'>('meta');
  const storiesObj = resolvedMeta.csfFile?.stories ?? {};
  const stories = Object.values(storiesObj);
  const primaryStory = stories[0];

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      {primaryStory && (
        <>
          <ComponentCanvas
            of={primaryStory.moduleExport as never}
            withToolbar
          />
          <Controls />
        </>
      )}
      {stories.slice(1).map((story) => (
        <div key={story.id}>
          <h3 id={story.id}>{story.name}</h3>
          <ComponentCanvas of={story.moduleExport as never} />
        </div>
      ))}
    </>
  );
};

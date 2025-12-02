import {
  type ReactRenderer,
  type Loader,
  type Preview,
} from '@storybook/react-vite';
import { getPreview } from '../src/preview.tsx';
import {
  DocsContext as DocsContextProps,
  type PreviewWeb,
} from 'storybook/internal/preview-api';
import type Channel from 'storybook/internal/channels';
import { convert, ThemeProvider, themes } from 'storybook/theming';
import { IressStorybook } from '../src/components/IressStorybook';
import { HideSidebar } from '../src/components/HideSidebar';

const loaders = [
  /**
   * This loader adds a DocsContext to the story, which is required for the most Blocks to work. A
   * story will specify which stories they need in the index with:
   *
   * ```ts
   * parameters: {
   *   relativeCsfPaths: ['../stories/MyStory.stories.tsx'], // relative to the story
   * }
   * ```
   *
   * The DocsContext will then be added via the decorator below.
   *
   * Copied from: https://github.com/storybookjs/storybook/blob/next/code/.storybook/preview.tsx
   */
  async ({ parameters: { relativeCsfPaths, attached = true } }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    const preview = (window as any).__STORYBOOK_PREVIEW__ as
      | PreviewWeb<ReactRenderer>
      | undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const channel = (window as any).__STORYBOOK_ADDONS_CHANNEL__ as
      | Channel
      | undefined;
    // __STORYBOOK_PREVIEW__ and __STORYBOOK_ADDONS_CHANNEL__ is set in the PreviewWeb constructor
    // which isn't loaded in portable stories/vitest
    if (!relativeCsfPaths || !preview || !channel) {
      return {};
    }
    const csfFiles = await Promise.all(
      (relativeCsfPaths as string[]).map(async (blocksRelativePath) => {
        const projectRelativePath = `./src/components/${blocksRelativePath.replace(
          /^..\//,
          '',
        )}.tsx`;
        const entry =
          preview.storyStore.storyIndex?.importPathToEntry(projectRelativePath);

        if (!entry) {
          throw new Error(
            `Couldn't find story file at ${projectRelativePath} (passed as ${blocksRelativePath})`,
          );
        }

        return preview.storyStore.loadCSFFileByStoryId(entry.id);
      }),
    );
    const docsContext = new DocsContextProps(
      channel,
      preview.storyStore,
      preview.renderStoryToElement.bind(preview),
      csfFiles,
    );
    if (attached && csfFiles[0]) {
      docsContext.attachCSFFile(csfFiles[0]);
    }

    return { docsContext };
  },
] as Loader[];

const storybookConfigPreview = getPreview({});

const preview: Preview = {
  ...storybookConfigPreview,
  decorators: [
    ...(storybookConfigPreview.decorators as never[]),

    // This decorator provides the DocsContext to the story if it was loaded by the loader above.
    (Story, { loaded: { docsContext } }) =>
      docsContext ? (
        <IressStorybook context={docsContext as never}>
          <HideSidebar />
          <Story />
        </IressStorybook>
      ) : (
        <Story />
      ),

    (Story) => (
      <ThemeProvider theme={convert(themes.light)}>
        <Story />
      </ThemeProvider>
    ),
  ],
  loaders,
};

export default preview;

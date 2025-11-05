// TODO: Probably better done with end-to-end tests
import { act, render } from '@testing-library/react';
import { ComponentCanvas, type ComponentCanvasProps } from './ComponentCanvas';
import { type StoryModule } from '../types';
import { type ComponentProps } from 'react';
import type { Canvas, SourceProps } from '@storybook/addon-docs/blocks';
import { addons } from 'storybook/preview-api';
import { FORCE_REMOUNT } from 'storybook/internal/core-events';
import { SANDBOX_DOCS_RENDERED } from '@iress-oss/ids-storybook-sandbox';

// We mock the @storybook/addon-docs/blocks package to avoid rendering the actual DocsContainer component,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).
const canvasProps = vi.fn();
vi.mock('@storybook/addon-docs/blocks', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@storybook/addon-docs/blocks')>()),
  useOf: () => ({
    type: 'story',
    story: {
      id: 'story-id',
      name: 'Story name',
    },
  }),
  Canvas: (props: ComponentProps<typeof Canvas>) => {
    canvasProps(props);
    return <div>Canvas rendered</div>;
  },
  Controls: () => <div>Controls rendered</div>,
}));

const storiesMock: StoryModule = {
  default: {},
  __namedExportsOrder: [],
};

describe('ComponentCanvas', () => {
  it('renders @storybook/addon-docs/blocks/Canvas with appropriate defaults', () => {
    render(<ComponentCanvas of={storiesMock.default} meta={storiesMock} />);

    expect(canvasProps).toHaveBeenLastCalledWith({
      additionalActions: [],
      meta: storiesMock,
      of: storiesMock.default,
      source: {
        transform: expect.any(Function) as SourceProps['transform'],
      },
      withToolbar: true,
    });
  });

  it('replaces the alias with the package name, if custom source provided', () => {
    render(
      <ComponentCanvas
        of={{
          ...storiesMock.default,
          parameters: {
            docs: {
              source: {
                code: `import { Text } from '@/main';`,
              },
            },
          },
        }}
        meta={storiesMock}
      />,
    );

    expect(canvasProps).toHaveBeenLastCalledWith(
      expect.objectContaining({
        source: expect.objectContaining({
          code: `import { Text } from '@iress-oss/ids-components';`,
        }) as SourceProps,
      }),
    );
  });

  it('replaces the alias with the package name, if custom transformer provided', async () => {
    render(<ComponentCanvas of={storiesMock.default} meta={storiesMock} />);

    // Get last canvas props, which should contain the source transform function
    const lastCanvasProps = canvasProps.mock.calls[
      canvasProps.mock.calls.length - 1
    ][0] as ComponentCanvasProps;

    // Check if the function is working as expected
    const result = await lastCanvasProps?.source?.transform?.(
      'RandomComponent',
      {
        ...storiesMock.default,
        parameters: {
          docs: {
            source: {
              transform: (code: string) =>
                `import { ${code} } from '@/main'; export default () => <RandomComponent />;`,
            },
          },
        },
      },
    );

    expect(result).toBe(
      `import { RandomComponent } from '@iress-oss/ids-components'; export default () => <RandomComponent />;`,
    );
  });

  describe('refresh', () => {
    it('adds refresh action if refresh is true', () => {
      render(
        <ComponentCanvas of={storiesMock.default} meta={storiesMock} refresh />,
      );
      expect(canvasProps).toHaveBeenLastCalledWith(
        expect.objectContaining({
          additionalActions: expect.arrayContaining([
            expect.objectContaining({
              title: 'Refresh',
            }),
          ]) as ComponentProps<typeof Canvas>['additionalActions'],
        }) as ComponentProps<typeof Canvas>,
      );

      // Check if the refresh action calls the FORCE_REMOUNT event when clicked
      const props = canvasProps.mock.lastCall?.[0] as ComponentCanvasProps;
      const additionalActions = props?.additionalActions ?? [];
      const refreshAction = additionalActions.find(
        (action) => action.title === 'Refresh',
      );

      refreshAction?.onClick?.({} as never);
      expect(addons.getChannel().last(FORCE_REMOUNT)).toStrictEqual([
        {
          storyId: 'story-id',
        },
      ]);
    });
  });
});

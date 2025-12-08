// TODO: Probably better done with end-to-end tests
import { render } from '@testing-library/react';
import { ComponentCanvas } from './ComponentCanvas';
import { type ComponentProps } from 'react';
import type { Canvas } from '@storybook/addon-docs/blocks';
import { ModuleExports, StoryAnnotations } from 'storybook/internal/types';
import { vi, describe, it, expect } from 'vitest';
import { UseSandboxCanvasProps } from '@iress-oss/ids-storybook-sandbox';

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

// Mock the storybook-sandbox hook that's causing the hook call issues
vi.mock('@iress-oss/ids-storybook-sandbox', () => ({
  useSandboxCanvasProps: vi.fn(
    (props) =>
      ({
        additionalActions: [],
        ...props,
        source: {
          transform: vi.fn().mockResolvedValue('transformed code'),
        },
        withToolbar: true,
      }) as UseSandboxCanvasProps,
  ),
}));

const storiesMock: ModuleExports = {
  default: {},
  __namedExportsOrder: [],
};

describe('ComponentCanvas', () => {
  it('renders @storybook/addon-docs/blocks/Canvas with appropriate defaults', () => {
    render(
      <ComponentCanvas
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
      />,
    );

    expect(canvasProps).toHaveBeenCalledWith(
      expect.objectContaining({
        additionalActions: [],
        withToolbar: true,
        source: expect.objectContaining({
          transform: expect.any(Function) as never,
        }) as UseSandboxCanvasProps['source'],
      }),
    );
  });

  it('renders Canvas component', () => {
    const { container } = render(
      <ComponentCanvas
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
      />,
    );

    expect(container).toHaveTextContent('Canvas rendered');
  });
});

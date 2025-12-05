import { render } from '@testing-library/react';
import { ComponentCanvas, ComponentCanvasProps } from './ComponentCanvas';
import { type ComponentProps } from 'react';
import type { Canvas } from '@storybook/addon-docs/blocks';
import { ModuleExports, StoryAnnotations } from 'storybook/internal/types';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { IressStorybookContext } from './IressStorybookContext';

// Mock dependencies
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
}));

const storiesMock: ModuleExports = {
  default: {},
  __namedExportsOrder: [],
};

describe('ComponentCanvas', () => {
  beforeEach(() => {
    canvasProps.mockClear();
  });

  it('renders Canvas component with default props', () => {
    const { container } = render(
      <ComponentCanvas
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
      />,
    );

    expect(container).toHaveTextContent('Canvas rendered');
    expect(canvasProps).toHaveBeenCalledWith(
      expect.objectContaining({
        additionalActions: expect.arrayContaining([
          expect.objectContaining({ title: 'Open in CodeSandbox' }),
        ]) as never,
      }),
    );
  });

  it('adds refresh action when refresh prop is true', () => {
    render(
      <ComponentCanvas
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
        refresh
      />,
    );

    expect(canvasProps).toHaveBeenCalledWith(
      expect.objectContaining({
        additionalActions: expect.arrayContaining([
          expect.objectContaining({ title: 'Refresh' }),
        ]) as never,
      }),
    );
  });

  it('handles code transformation correctly', async () => {
    render(
      <ComponentCanvas
        of={storiesMock.default as StoryAnnotations}
        meta={storiesMock}
      />,
    );

    const props = canvasProps.mock.calls[0][0] as ComponentCanvasProps;
    const transform = props.source?.transform;

    // Test basic transformation (whitespace removal)
    const code = '  const x = 1;  ';
    const result = await transform?.(code, {});
    expect(result).toContain('const x = 1;');
    expect(result).not.toContain('  const x = 1;  ');
  });

  it('injects imports when storyPackageName is provided in context', async () => {
    const contextValue = {
      codeSandbox: {
        storyPackageName: '@test/package',
      },
    };

    render(
      <IressStorybookContext.Provider value={contextValue as never}>
        <ComponentCanvas
          of={storiesMock.default as StoryAnnotations}
          meta={storiesMock}
        />
      </IressStorybookContext.Provider>,
    );

    const props = canvasProps.mock.calls[0][0] as ComponentCanvasProps;
    const transform = props.source?.transform;

    // Test import injection
    const code = '<TestComponent />';
    const result = await transform?.(code, {});

    expect(result).toContain("import { TestComponent } from '@test/package';");
    expect(result).toContain('<TestComponent />');
  });

  it('does not duplicate existing imports', async () => {
    const contextValue = {
      codeSandbox: {
        storyPackageName: '@test/package',
      },
    };

    render(
      <IressStorybookContext.Provider value={contextValue as never}>
        <ComponentCanvas
          of={storiesMock.default as StoryAnnotations}
          meta={storiesMock}
        />
      </IressStorybookContext.Provider>,
    );

    const props = canvasProps.mock.calls[0][0] as ComponentCanvasProps;
    const transform = props.source?.transform;

    const code = `
      import { TestComponent } from '@test/package';
      <TestComponent />
    `;
    const result = await transform?.(code, {});

    // Should not add another import
    const matches = result?.match(
      /import \{ TestComponent \} from '@test\/package'/g,
    );
    expect(matches?.length).toBe(1);
  });

  it('merges with existing imports from same library', async () => {
    const contextValue = {
      codeSandbox: {
        storyPackageName: '@test/package',
      },
    };

    render(
      <IressStorybookContext.Provider value={contextValue as never}>
        <ComponentCanvas
          of={storiesMock.default as StoryAnnotations}
          meta={storiesMock}
        />
      </IressStorybookContext.Provider>,
    );

    const props = canvasProps.mock.calls[0][0] as ComponentCanvasProps;
    const transform = props.source?.transform;

    const code = `
      import { OtherComponent } from '@test/package';
      <TestComponent />
    `;
    const result = await transform?.(code, {});

    expect(result).toContain(
      "import { OtherComponent, TestComponent } from '@test/package'",
    );
  });
});

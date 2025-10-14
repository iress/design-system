import { Meta, StoryObj } from '@storybook/react';
import type { AgGridReact } from 'ag-grid-react';
import { lazy, Suspense } from 'react';

const AgGridSimple = lazy(() => import('./mocks/AgGridSimple.tsx'));
import AgGridSimpleSource from './mocks/AgGridSimple.tsx?raw';

const AgGridComplex = lazy(() => import('./mocks/AgGridComplex.tsx'));
import AgGridComplexSource from './mocks/AgGridComplex.tsx?raw';

const AgGridComplexStatic = lazy(
  () => import('./mocks/AgGridComplexStatic.tsx'),
);
import AgGridComplexStaticSource from './mocks/AgGridComplexStatic.tsx?raw';

import { DocsLoading } from '@iress-storybook/components';

const AgGridCompact = lazy(
  () => import('./mocks/AgGridCompact.tsx'),
);
import AgGridCompactSource from './mocks/AgGridCompact.tsx?raw';

const AgGridCompactStatic = lazy(
  () => import('./mocks/AgGridCompactStatic.tsx'),
);
import AgGridCompactStaticSource from './mocks/AgGridCompactStatic.tsx?raw';

const AGGridStub = () => <div>AG Grid Stub</div>;
const Loading = () => <DocsLoading>Loading story</DocsLoading>;

type Story = StoryObj<AgGridReact>;

export default {
  title: 'Components/Table/AG Grid',
  component: AGGridStub,
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    IDS_Sandbox: {
      scopes: ['ag-grid'],
    },
    options: {
      selectedPanel: 'storybook/a11y/panel',
    },
  },
} as Meta<AgGridReact>;

export const Simple: Story = {
  render: (args) => (
    <Suspense fallback={<Loading />}>
      <AgGridSimple {...args} />
    </Suspense>
  ),
  parameters: {
    docs: {
      source: {
        code: AgGridSimpleSource,
        language: 'tsx',
      },
    },
    layout: 'fullscreen',
  },
};

export const Complex: Story = {
  render: (args) => (
    <Suspense fallback={<Loading />}>
      <AgGridComplex {...args} />
    </Suspense>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    docs: {
      source: {
        code: AgGridComplexSource,
        language: 'tsx',
      }, 
    },
    layout: 'fullscreen',
  },
};

export const ComplexStatic: Story = {
  render: (args) => (
    <Suspense fallback={<Loading />}>
      <AgGridComplexStatic {...args} />
    </Suspense>
  ),
  parameters: {
    docs: {
      source: {
        code: AgGridComplexStaticSource,
        language: 'tsx',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['hideInSidebar'],
};

export const Compact: Story = {
  render: (args) => (
    <Suspense fallback={<Loading />}>
      <AgGridCompact {...args} />
    </Suspense>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    docs: {
      source: {
        code: AgGridCompactSource,
        language: 'tsx',
      }, 
    },
    layout: 'fullscreen',
  },
};

export const CompactStatic: Story = {
  render: (args) => (
    <Suspense fallback={<Loading />}>
      <AgGridCompactStatic {...args} />
    </Suspense>
  ),
  parameters: {
    docs: {
      source: {
        code: AgGridCompactStaticSource,
        language: 'tsx',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['hideInSidebar'],
};

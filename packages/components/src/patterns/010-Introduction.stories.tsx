import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressCard,
  IressRow,
  IressStack,
  IressCol,
  IressSkeleton,
} from '@/main';
import { Suspense } from 'react';

import breadcrumbs from './Breadcrumbs/meta';
import contextualMenu from './ContextualMenu/meta';
import dropdownMenu from './DropdownMenu/meta';
import form from './Form/meta';
import loading from './Loading/meta';
import shadow from './Shadow/meta';

const patterns: {
  heading: string;
  href: string;
  tags?: string[];
  Thumbnail: React.FC;
}[] = [breadcrumbs, contextualMenu, dropdownMenu, form, loading, shadow];

const Reference = () => {
  return (
    <IressStack gap="lg" mt="lg">
      <IressRow gutter="lg">
        {patterns.map(({ Thumbnail, ...component }) => (
          <IressCol key={component.heading} span={{ md: 3 }}>
            <IressCard
              {...component}
              element="a"
              media={
                <Suspense
                  fallback={
                    <IressSkeleton mode="rect" width="751px" height="184px" />
                  }
                >
                  <Thumbnail />
                </Suspense>
              }
              stretch
            />
          </IressCol>
        ))}
      </IressRow>
    </IressStack>
  );
};

type Story = StoryObj<typeof Reference>;

export default {
  title: 'Patterns/Introduction',
  component: Reference,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      disable: true,
    },
  },
} as Meta<typeof Reference>;

export const Default: Story = {
  render: () => <Reference />,
  parameters: {
    layout: 'fullscreen',
  },
};

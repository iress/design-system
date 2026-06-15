import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressCard,
  IressRow,
  IressStack,
  IressCol,
  IressSkeleton,
  IressContainer,
} from '@/main';
import { Suspense } from 'react';

import breadcrumbs from './Breadcrumbs/meta';
import contextualMenu from './ContextualMenu/meta';
import dropdownMenu from './DropdownMenu/meta';
import feedback from './Feedback/meta';
import form from './Form/meta';
import loading from './Loading/meta';
import searchSelection from './SearchSelection/meta';
import shadow from './Shadow/meta';
import sideNav from './SideNav/meta';

const patterns = [
  breadcrumbs,
  contextualMenu,
  dropdownMenu,
  feedback,
  form,
  loading,
  searchSelection,
  shadow,
  sideNav,
];

const Reference = () => {
  return (
    <IressContainer>
        <IressStack gap="lg" my="lg" maxWidth="overlay.lg" mx="auto">
      <IressRow gutter="lg">
        {patterns.map(({ Thumbnail, ...component }) => (
          <IressCol key={component.heading} span={{ md: 4 }}>
            <IressCard
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
              heading={component.heading}
              stretch
              href={'storybook' in component ? component.storybook : undefined}
            >
              {component.description}
            </IressCard>
          </IressCol>
        ))}
      </IressRow>
    </IressStack>
    </IressContainer>
  );
};

type Story = StoryObj<typeof Reference>;

export default {
  title: 'Patterns/Introduction',
  component: Reference,
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: { disable: true },
    layout: 'fullscreen',
    idsConfig: {
      autodocsTemplate: 'landing',
    },
  },
} as Meta<typeof Reference>;

export const Default: Story = {
  render: () => <Reference />,
  parameters: {
    layout: 'fullscreen',
  },
};

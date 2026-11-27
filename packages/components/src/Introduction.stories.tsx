import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressStack,
  IressText,
  IressCard,
  IressRow,
  IressCol,
  IressDivider,
  IressButton,
  IressContainer,
  IressIcon,
} from '@/main';

const GUIDELINES_URL = 'https://iress.github.io/design-system/';

const Introduction = () => (
  <IressContainer py="xl">
    <IressStack gap="md" maxWidth="overlay.lg" mx="auto">
      <IressStack gap="sm">
        <IressText element="h1" textStyle="typography.heading.1">
          Iress Design System
        </IressText>
        <IressText element="p" color="colour.neutral.70">
          Interactive component playground, visual regression testing, and API
          reference.
        </IressText>
      </IressStack>

      <IressDivider />

      <IressStack gap="md">
        <IressText element="h2" textStyle="typography.heading.3">
          What is this Storybook for?
        </IressText>
        <IressRow gutter="md">
          <IressCol span={{ md: 4 }}>
            <IressCard heading="Playground" stretch>
              Try components with live controls. Each component's docs page has
              a Playground tab where you can adjust props interactively.
            </IressCard>
          </IressCol>
          <IressCol span={{ md: 4 }}>
            <IressCard heading="API Reference" stretch>
              Auto-generated prop tables from TypeScript interfaces. See every
              prop, its type, default value, and description.
            </IressCard>
          </IressCol>
          <IressCol span={{ md: 4 }}>
            <IressCard heading="Visual Testing" stretch>
              Stories power Chromatic visual regression tests. Each story is a
              visual test case captured on every PR.
            </IressCard>
          </IressCol>
        </IressRow>
      </IressStack>

      <IressDivider />

      <div>
        <IressText element="h2" textStyle="typography.heading.3">
          Looking for design guidance?
        </IressText>
        <IressText element="p" mt="sm">
          For usage guidelines, design patterns, when-to-use guidance, and full
          component documentation, visit the IDS Guidelines site.
        </IressText>
        <IressButton
          href={GUIDELINES_URL}
          target="_blank"
          rel="noopener noreferrer"
          mode="primary"
          alignSelf="start"
          append={<IressIcon name="open_in_new" />}
        >
          Open Guidelines
        </IressButton>
      </div>
    </IressStack>
  </IressContainer>
);

type Story = StoryObj<typeof Introduction>;

export default {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: { disable: true },
    layout: 'fullscreen',
    idsConfig: {
      autodocsTemplate: 'landing',
    },
  },
  tags: ['hideInSidebar:false'],
} as Meta<typeof Introduction>;

export const Default: Story = {};

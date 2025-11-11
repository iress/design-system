import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressBadge,
  IressCol,
  IressRow,
  IressStack,
  IressText,
  IressButton,
  IressDivider,
  IressInline,
  IressCard,
  IressSkeleton,
} from '@/main';
import { version } from '../package.json';
import { lazy, Suspense } from 'react';

const HomePageHero = lazy(() => import('./components/HomePageHero'));
const Version6Hero = lazy(() => import('./components/Version6Hero'));
const FoundationsHero = lazy(() => import('./components/FoundationsHero'));
const ComponentsHero = lazy(() => import('./components/ComponentsHero'));
const TokensHero = lazy(() => import('./components/TokensHero'));

const HomePage = () => {
  return (
    <IressStack gap="lg">
      <IressRow verticalAlign="middle" gutter="lg">
        <IressCol>
          <IressStack gap="md">
            <IressText>
              <h1>Iress Design System</h1>
              <IressBadge mode="neutral">{version}</IressBadge>
            </IressText>

            <IressText element="p" textStyle="typography.body.lg">
              The Iress Design System (IDS) serves as a shared visual language,
              working code, design tools and resources, human interface
              guidelines, and a community. It supports designers and developers
              building digital products for both B2B (Financial Advisors,
              Paraplanners) and B2B2C (client customers) segments.
            </IressText>
            <IressInline gap="md">
              <IressButton
                mode="primary"
                href="/?path=/docs/get-started-develop--docs"
                px="md"
                py="spacing.300"
              >
                Start developing
              </IressButton>
              <IressButton
                href="/?path=/docs/foundations-introduction--docs"
                mode="secondary"
                px="md"
                py="spacing.300"
              >
                Read foundations
              </IressButton>
            </IressInline>
          </IressStack>
        </IressCol>
        <IressCol span={{ md: 6 }}>
          <Suspense>
            <HomePageHero />
          </Suspense>
        </IressCol>
      </IressRow>
      <IressDivider />
      <IressRow gutter="lg" verticalAlign="stretch">
        <IressCol span={12}>
          <IressText element="h2">Quick links</IressText>
        </IressCol>
        <IressCol span={3}>
          <IressCard
            element="a"
            heading="Version 6"
            media={
              <Suspense
                fallback={
                  <IressSkeleton mode="rect" width="751px" height="184px" />
                }
              >
                <Version6Hero />
              </Suspense>
            }
            href="https://docs.google.com/document/d/17K81rHBZjjF_tsrC8QFrSsmjrC0IJu_bpU4sB2N7PSQ/edit?usp=sharing"
            stretch
            bg="colour.primary.surface"
            color="colour.primary.text"
            target="_blank"
          >
            Start developing with the latest version of the Iress Design System.
            Version 6 has had a complete styling overhaul to keep IDS modern.
          </IressCard>
        </IressCol>
        <IressCol span={3}>
          <IressCard
            element="a"
            heading="Foundations"
            media={
              <Suspense
                fallback={
                  <IressSkeleton mode="rect" width="751px" height="184px" />
                }
              >
                <FoundationsHero />
              </Suspense>
            }
            href="/?path=/docs/foundations-introduction--docs"
            stretch
          >
            Core design principles, colors, typography, spacing, and visual
            guidelines that form the foundation of our design system.
          </IressCard>
        </IressCol>
        <IressCol span={3}>
          <IressCard
            element="a"
            heading="Components"
            media={
              <Suspense
                fallback={
                  <IressSkeleton mode="rect" width="751px" height="184px" />
                }
              >
                <ComponentsHero />
              </Suspense>
            }
            href="/?path=/docs/components-introduction--docs"
            stretch
          >
            Pre-built UI components like buttons, forms, tables, and navigation
            elements ready to use in your applications.
          </IressCard>
        </IressCol>
        <IressCol span={3}>
          <IressCard
            element="a"
            heading="Design Tokens"
            media={
              <Suspense
                fallback={
                  <IressSkeleton mode="rect" width="751px" height="184px" />
                }
              >
                <TokensHero />
              </Suspense>
            }
            href="/?path=/docs/foundations-tokens-introduction--docs"
            stretch
          >
            Shared design values for colors, spacing, typography, and other
            visual properties that ensure consistency across products.
          </IressCard>
        </IressCol>
      </IressRow>
      <IressRow gutter="lg" verticalAlign="stretch">
        <IressCol span={3}>
          <IressCard
            element="a"
            heading="Patterns"
            href="/?path=/docs/patterns-introduction--docs"
            stretch
          >
            Common UI patterns and layouts for forms and complex interations.
          </IressCard>
        </IressCol>
        <IressCol span={3}>
          <IressCard
            element="a"
            heading="Styling props"
            href="/?path=/docs/styling-props-reference--docs"
            stretch
          >
            Safely customise any component in the design system using styling
            props to create engaging UIs.
          </IressCard>
        </IressCol>
        <IressCol span={3}>
          <IressCard
            element="a"
            heading="Themes"
            href="/?path=/docs/themes-introduction--docs"
            stretch
          >
            IDS is white-labelled, allowing you to create custom themes tailored
            to your client's identity.
          </IressCard>
        </IressCol>
        <IressCol span={3}>
          <IressCard
            element="a"
            heading="Resources"
            href="/?path=/docs/resources-introduction--docs"
            stretch
          >
            MCP server and other tools to help you make the most of the Iress
            Design System.
          </IressCard>
        </IressCol>
      </IressRow>
    </IressStack>
  );
};

type Story = StoryObj<typeof HomePage>;

export default {
  title: 'Introduction',
  component: HomePage,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      disable: true,
    },
  },
} as Meta<typeof HomePage>;

export const Default: Story = {
  render: () => <HomePage />,
  parameters: {
    layout: 'fullscreen',
  },
};

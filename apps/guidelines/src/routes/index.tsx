import { createFileRoute, Link } from '@tanstack/react-router';
import {
  IressButton,
  IressCard,
  IressCol,
  IressInline,
  IressRow,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';
import { lazy, Suspense } from 'react';

const HomePageHero = lazy(() => import('../components/heroes/HomePageHero'));
const ComponentsHero = lazy(() => import('../components/heroes/ComponentsHero'));
const FoundationsHero = lazy(() => import('../components/heroes/FoundationsHero'));
const TokensHero = lazy(() => import('../components/heroes/TokensHero'));

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <IressStack gap="lg" maxWidth="overlay.lg" mx="auto">
      <IressRow verticalAlign="middle" gutter="lg">
        <IressCol span={{ xs: 12, md: 7 }}>
          <IressStack gap="md">
            <IressText element="h1">Iress Design System</IressText>
            <IressText element="p" color="muted">
              A shared visual language, working code, and design tools for building
              consistent digital products across Iress.
            </IressText>
            <IressInline gap="md">
              <IressButton mode="primary" element={Link} to="/get-started/develop">
                Start developing
              </IressButton>
              <IressButton element={Link} to="/get-started/design">
                Start designing
              </IressButton>
            </IressInline>
          </IressStack>
        </IressCol>
        <IressCol span={{ xs: 12, md: 5 }}>
          <Suspense fallback={null}>
            <HomePageHero />
          </Suspense>
        </IressCol>
      </IressRow>

      <IressRow gutter="md">
        <IressCol span={{ xs: 12, md: 6, lg: 4 }}>
          <IressCard
            heading="Foundations"
            stretch
            element={Link}
            to="/foundations/principles"
            onClick={() => {}}
            media={<Suspense fallback={null}><FoundationsHero /></Suspense>}
          >
            Core principles, accessibility, responsive layout, and content
            guidelines that underpin every component.
          </IressCard>
        </IressCol>
        <IressCol span={{ xs: 12, md: 6, lg: 4 }}>
          <IressCard
            heading="Components"
            stretch
            element={Link}
            to="/components/button"
            onClick={() => {}}
            media={<Suspense fallback={null}><ComponentsHero /></Suspense>}
          >
            Production-ready React components with built-in accessibility,
            theming, and responsive behaviour.
          </IressCard>
        </IressCol>
        <IressCol span={{ xs: 12, md: 6, lg: 4 }}>
          <IressCard
            heading="Patterns"
            stretch
            element={Link}
            to="/patterns/form"
            onClick={() => {}}
            media={<Suspense fallback={null}><TokensHero /></Suspense>}
          >
            Composable patterns for common workflows — forms, navigation,
            loading states, and feedback.
          </IressCard>
        </IressCol>
        <IressCol span={{ xs: 12, md: 6, lg: 4 }}>
          <IressCard
            heading="Styling Props"
            stretch
            element={Link}
            onClick={() => {}}
            to="/styling-props/styling-props"
          >
            Apply tokens directly as React props — spacing, colour, layout,
            typography, and more on any component.
          </IressCard>
        </IressCol>
        <IressCol span={{ xs: 12, md: 6, lg: 4 }}>
          <IressCard
            heading="Tokens"
            stretch
            element={Link}
            onClick={() => {}}
            to="/tokens/colour"
          >
            Design tokens for colour, spacing, typography, and radius — the
            building blocks of the visual language.
          </IressCard>
        </IressCol>
        <IressCol span={{ xs: 12, md: 6, lg: 4 }}>
          <IressCard
            heading="Migration Guides"
            stretch
            element={Link}
            to="/resources-migration-guides/from-v5-to-v6"
            onClick={() => {}}
          >
            Step-by-step guides for upgrading from previous versions (v4→v5,
            v5→v6, OUI→v6).
          </IressCard>
        </IressCol>
      </IressRow>
    </IressStack>
  );
}

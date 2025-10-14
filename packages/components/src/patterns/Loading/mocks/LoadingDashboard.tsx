import {
  IressCard,
  IressCol,
  IressContainer,
  IressDivider,
  IressInline,
  IressLoading,
  IressRow,
  IressSkeleton,
  IressStack,
  IressText,
} from '@/main';
import { ReactNode, useEffect, useState } from 'react';

const API = {
  criticalContent: async () =>
    new Promise<ReactNode>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(
          <IressContainer>
            <IressStack gap="lg">
              <IressRow horizontalAlign="between" verticalAlign="middle">
                <IressText element="h1" mb="none">
                  Dashboard
                </IressText>
                <IressInline gap="lg">
                  <IressSkeleton textStyle="typography.body.lg" width="200px" />
                  <IressSkeleton textStyle="typography.body.lg" width="200px" />
                </IressInline>
              </IressRow>
              <IressDivider />
              <IressRow gutter="lg">
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="Financial update 2025"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="The ASX update"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="In the news"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
              </IressRow>
            </IressStack>
          </IressContainer>,
        );
      }, 3000);
    }),
};

export const LoadingDashboard = () => {
  const [critical, setCritical] = useState<ReactNode | undefined>();

  useEffect(() => {
    const initialise = async () => {
      setCritical(await API.criticalContent());
    };

    void initialise();
  }, []);

  return (
    <IressLoading pattern="page" critical={critical} template="dashboard" />
  );
};

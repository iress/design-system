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
            <IressStack gutter="lg">
              <IressRow horizontalAlign="between" verticalAlign="middle">
                <IressText element="h1" noGutter>
                  Dashboard
                </IressText>
                <IressInline gutter="lg">
                  <IressSkeleton textVariant="lead" width="200px" />
                  <IressSkeleton textVariant="lead" width="200px" />
                </IressInline>
              </IressRow>
              <IressDivider />
              <IressRow gutter="lg">
                <IressCol span="4">
                  <IressCard stretch>
                    <IressStack gutter="md">
                      <IressSkeleton mode="rect" height="300px" />
                      <IressText element="h3">Financial update 2025</IressText>
                      <IressSkeleton textVariant="body" width="50%" />
                    </IressStack>
                  </IressCard>
                </IressCol>
                <IressCol span="4">
                  <IressCard stretch>
                    <IressStack gutter="md">
                      <IressSkeleton mode="rect" height="300px" />
                      <IressText element="h3">The ASX update</IressText>
                      <IressSkeleton textVariant="body" width="50%" />
                    </IressStack>
                  </IressCard>
                </IressCol>
                <IressCol span="4">
                  <IressCard stretch>
                    <IressStack gutter="md">
                      <IressSkeleton mode="rect" height="300px" />
                      <IressText element="h3">In the news</IressText>
                      <IressSkeleton textVariant="body" width="50%" />
                    </IressStack>
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

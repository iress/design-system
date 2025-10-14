import { IressButton, IressLoading, IressStack, IressText } from '@/main';
import { ReactNode, useEffect, useState } from 'react';

const API = {
  criticalContent: async () =>
    new Promise<ReactNode>((_resolve, reject) => {
      // Simulate a slow network request.
      setTimeout(() => {
        reject(
          new Error(
            'Could not generate the summary at this time due to an unknown error. Please try again or contact support if the issue persists.',
          ),
        );
      }, 3000);
    }),
};

export const LoadingDashboardError = () => {
  const [critical, setCritical] = useState<ReactNode | undefined>();
  const [error, setError] = useState<ReactNode | undefined>();

  useEffect(() => {
    const initialise = async () => {
      try {
        setCritical(await API.criticalContent());
      } catch (e) {
        setError(
          <IressStack gap="sm">
            <IressText
              element="h2"
              textStyle="typography.heading.3"
              textAlign="center"
              color="colour.system.danger.text"
            >
              Error
            </IressText>
            <IressText textAlign="center" noGutter>
              <p>{String(e).replace('Error: ', '')}</p>
              <p>
                <IressButton mode="primary" status="danger">
                  Try again
                </IressButton>
              </p>
            </IressText>
          </IressStack>,
        );
      }
    };

    void initialise();
  }, []);

  return (
    <IressLoading
      pattern="page"
      critical={critical}
      error={error}
      template="dashboard"
    />
  );
};

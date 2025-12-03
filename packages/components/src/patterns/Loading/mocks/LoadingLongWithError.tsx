import { IressButton, IressLoading, IressStack, IressText } from '@/main';
import { type ReactNode, useEffect, useState } from 'react';

const API = {
  getContent: async () =>
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

export const LoadingLongWithError = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<ReactNode | undefined>();

  useEffect(() => {
    const initialise = async () => {
      try {
        await API.getContent();
        setLoaded(true);
      } catch (e) {
        setError(
          <IressStack gutter="md">
            <IressText element="h2" variant="h3" align="center" mode="danger">
              Error
            </IressText>
            <IressText align="center" noGutter>
              <p>{String(e).replace('Error: ', '')}</p>
              <p>
                <IressButton>Try again</IressButton>
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
      messageList={{
        3000: 'Processing transcript',
        5000: 'Noting key information',
        7000: 'Generating summary',
      }}
      pattern="long"
      error={error}
      loaded={loaded}
    >
      <IressText element="h2" variant="h3" align="center">
        Submitting your file
      </IressText>
    </IressLoading>
  );
};

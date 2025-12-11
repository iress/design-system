import {
  IressButton,
  IressInline,
  IressPanel,
  IressStack,
} from '@iress-oss/ids-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { type BroadcastHashEvent } from './types';

const MainStub = () => null;

type Story = StoryObj<typeof MainStub>;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MainStub> = {
  title: 'Main',
  component: MainStub,
};

export default meta;

const Hash = () => {
  const [broadcastHash, setBroadcastHash] = useState('');

  useEffect(() => {
    const saveParentHash = (event: MessageEvent<BroadcastHashEvent>) => {
      if (event.data?.type !== 'UPDATE_HASH') {
        return;
      }

      setBroadcastHash(event.data.hash);
    };

    window.addEventListener('message', saveParentHash);

    return () => {
      window.removeEventListener('message', saveParentHash);
    };
  }, []);

  return (
    <IressPanel bg="alt">
      <p>
        This story is to test the main Storybook configuration which broadcasts
        theme changes via postMessage.
      </p>
      <p>
        Parent window hash: <strong>{broadcastHash || 'N/A'}</strong>
      </p>
      <p>
        <IressButton
          onClick={() => {
            window.parent.location.hash = String(Date.now());
          }}
        >
          Trigger a hash change on parent window
        </IressButton>
      </p>
    </IressPanel>
  );
};

export const BroadcastHash: Story = {
  render: () => <Hash />,
};

export const PassAndLoadTheme: Story = {
  render: () => (
    <IressStack gap="md">
      <IressPanel bg="alt">
        <p>
          This story is to test the main Storybook configuration which passes
          theme changes via postMessage. It is used to communicate theme changes
          between Storybook compositions.
        </p>
        <IressInline gap="md">
          <IressButton
            onClick={() => {
              // eslint-disable-next-line sonarjs/post-message
              window.parent.postMessage(
                {
                  type: 'PASS_THEME',
                  name: 'red-text',
                  css: '.red-text { --iress-colour-neutral-80: red; --iress-typography-base-body-font: "Work Sans", sans-serif; }',
                  fonts: [
                    'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap',
                  ],
                },
                '*',
              );
            }}
          >
            Red theme
          </IressButton>
          <IressButton
            onClick={() => {
              // eslint-disable-next-line sonarjs/post-message
              window.parent.postMessage(
                {
                  type: 'PASS_THEME',
                  name: '',
                },
                '*',
              );
            }}
          >
            Clear
          </IressButton>
        </IressInline>
      </IressPanel>
      <IressPanel bg="alt">
        <p>
          Here you can also test sending theme changes from within the iframe
          itself. You probably wouldn't do this in a real-world scenario, but
          it's useful for testing.
        </p>
        <IressInline gap="md">
          <IressButton
            onClick={() => {
              // eslint-disable-next-line sonarjs/post-message
              window.postMessage(
                {
                  type: 'LOAD_THEME',
                  name: 'blue-text',
                  css: '.blue-text { --iress-colour-neutral-80: blue; }',
                },
                '*',
              );
            }}
          >
            Blue theme
          </IressButton>
          <IressButton
            onClick={() => {
              // eslint-disable-next-line sonarjs/post-message
              window.postMessage(
                {
                  type: 'LOAD_THEME',
                  name: '',
                },
                '*',
              );
            }}
          >
            Clear
          </IressButton>
        </IressInline>
      </IressPanel>
    </IressStack>
  ),
};

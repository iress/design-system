import {
  IressButton,
  IressInline,
  IressPanel,
  IressStack,
  IressToggle,
} from '@iress-oss/ids-components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import {
  type RelaySizeEvent,
  type BroadcastHashEvent,
  type EmbedStorybookEvent,
  type RelayPanelEvent,
} from './types';

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
    <IressPanel>
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
      <IressPanel>
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
      <IressPanel>
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

const Size = () => {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const saveSize = (event: MessageEvent<RelaySizeEvent>) => {
      if (event.data?.type !== 'RELAY_SIZE') {
        return;
      }

      setSize(event.data.height);
    };

    window.parent.addEventListener('message', saveSize);

    return () => {
      window.parent.removeEventListener('message', saveSize);
    };
  }, []);

  return (
    <IressPanel>
      <p>
        This story is to test the main Storybook configuration which passes the
        storybook preview iframe height via postMessage. This is used to adjust
        the height of the iframe in Storybook embeds to better show case the
        content without excessive whitespace or scrollbars.
      </p>
      <p>
        Height of story: <strong>{size || 'N/A'}</strong>
      </p>
      <p>
        <IressButton
          onClick={() => {
            // eslint-disable-next-line sonarjs/post-message
            window.parent.postMessage({ type: 'REQUEST_SIZE' }, '*');
          }}
        >
          Parent can re-request the size if needed via REQUEST_SIZE message
        </IressButton>
      </p>
    </IressPanel>
  );
};

export const RelaySize: Story = {
  render: () => <Size />,
};

const Embed = () => {
  const [showPanel, setShowPanel] = useState(true);

  const updateEmbed = (params: Omit<EmbedStorybookEvent, 'type'>) => {
    // eslint-disable-next-line sonarjs/post-message
    window.parent.postMessage(
      {
        type: 'EMBED_STORYBOOK',
        ...params,
      },
      '*',
    );
  };

  useEffect(() => {
    updateEmbed({
      panel: 'storybook/docs/panel',
      allowedPanels: ['storybook/docs/panel', 'storybook/a11y/panel'],
      selectorsToHide: ['[title="Hide stories"]', '[title="Show stories"]'],
    });
  }, []);

  return (
    <IressStack gap="md">
      <IressPanel>
        <p>
          This story is to test the main Storybook configuration which allows us
          to customise the Storybook embed via postMessage. This is used to
          control Storybook embeds in the guidelines, allowing us to hide
          certain panels and set the initial panel when the story is loaded.
        </p>
        <IressInline gap="md">
          <IressButton
            onClick={() => {
              updateEmbed({
                panel: 'storybook/a11y/panel',
                allowedPanels: ['storybook/a11y/panel'],
                showPanel,
              });
            }}
          >
            Show stories controller with a11y panel
          </IressButton>
          <IressToggle checked={showPanel} onChange={setShowPanel}>
            Show/hide
          </IressToggle>
        </IressInline>
      </IressPanel>
    </IressStack>
  );
};

export const StorybookEmbed: Story = {
  render: () => <Embed />,
};

const Panel = () => {
  const [openPanel, setOpenPanel] = useState('');
  const [panelHeight, setPanelHeight] = useState(0);

  useEffect(() => {
    const savePanelOpen = (event: MessageEvent<RelayPanelEvent>) => {
      if (event.data?.type !== 'RELAY_PANEL') {
        return;
      }

      setOpenPanel(event.data.flag ? 'yes' : 'no');
      setPanelHeight(event.data.height);
    };

    window.parent.addEventListener('message', savePanelOpen);

    // eslint-disable-next-line sonarjs/post-message
    window.parent.postMessage({ type: 'REQUEST_PANEL' }, '*');

    return () => {
      window.parent.removeEventListener('message', savePanelOpen);
    };
  }, []);

  return (
    <IressStack gap="md">
      <IressPanel>
        <p>
          This story is to test the main Storybook configuration which
          broadcasts panel open/close state via postMessage. This is used to
          communicate when the addon panel is opened or closed in Storybook
          embeds, allowing the parent window to react to these changes in the
          embed's UI state.
        </p>
        <p>
          <strong>Is the panel open?</strong> {openPanel}
        </p>
        {openPanel === 'yes' && (
          <p>
            The height of the panel is: <strong>{panelHeight}</strong>
          </p>
        )}
      </IressPanel>
    </IressStack>
  );
};

export const RelayPanel: Story = {
  render: () => <Panel />,
};

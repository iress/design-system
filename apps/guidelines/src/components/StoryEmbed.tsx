import {
  IressButton,
  IressCard,
  IressIcon,
  IressInline,
  IressLink,
  IressSpinner,
  IressText,
} from '@iress-oss/ids-components';
import { useState, useRef, useEffect } from 'react';

const mainStorybook = 'https://main--691abcc79dfa560a36d0a74f.chromatic.com';

const subStorybooks = {
  components: `http://localhost:6006`,
  tokens: `https://main--69169618e0408bbf7684f876.chromatic.com`,
};

interface StoryEmbedProps {
  /** Storybook story ID, e.g. "components-button--default" */
  id: string;
  /** Optional height in px. Defaults to 110. */
  height?: number;
  type?: keyof typeof subStorybooks;
  /** Panel to auto-select on load */
  panel?: string;
  /** Panel IDs to show (hides all others). If omitted, all panels are visible. */
  panels?: string[];
  /** CSS selectors to hide inside the iframe */
  hide?: string[];
}

export function StoryEmbed({
  id,
  height = 110,
  type = 'components',
  panel: defaultPanel,
  panels = ['storybook/docs/panel', 'storybook/a11y/panel'],
  hide = [
    '[title="Hide stories"]',
    '[title="Show stories"]',
    '[aria-label="Enter full screen"]',
    '[aria-label="Exit full screen"]',
    '[title="Open in CodeSandbox"]',
  ],
}: StoryEmbedProps) {
  const [inView, setInView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(defaultPanel ? true : false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const iframeSrc = `${subStorybooks[type]}/?path=/story/${id}&shortcuts=false&singleStory=true&embedded=true&panel=false`;
  const storybookUrl = `${mainStorybook}/?path=/docs/${type}_${id}`;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;

      if (event.data?.type === 'RELAY_SIZE' && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height + 10}px`;
      }

      if (event.data?.type === 'RELAY_PANEL') {
        const isOpen = !!event.data.flag;
        setPanelOpen(isOpen);

        // Re-request size after panel toggle settles
        setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage(
            { type: 'REQUEST_SIZE' },
            '*',
          );
        }, 300);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLoad = (panel = defaultPanel, showPanel?: boolean) => {
    setLoading(false);
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'EMBED_STORYBOOK',
        panel,
        allowedPanels: panels,
        selectorsToHide: hide,
        showPanel: showPanel ?? !!panel,
      },
      '*',
    );
  };

  const togglePanel = (panel: string) => {
    // If clicking the same panel that's open, close it. Otherwise open with that panel.
    const shouldOpen = !(panelOpen && panel === defaultPanel);
    handleLoad(panel, shouldOpen);
  };

  const openSandbox = () => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'OPEN_SANDBOX',
      },
      '*',
    );
  };

  return (
    <IressCard p="none" style={{ overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{ position: 'relative', minHeight: height }}
      >
        {(!inView || loading) && (
          <IressText
            element="p"
            textStyle="typography.body.sm"
            bg="colour.neutral.10"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <IressSpinner mr="sm" /> Loading example...
          </IressText>
        )}
        {inView && (
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={`Story: ${id}`}
            style={{
              width: '100%',
              height,
              border: 'none',
              display: loading ? 'none' : 'block',
              transition: 'height 0.2s ease',
            }}
            onLoad={() => handleLoad()}
          />
        )}
        <IressInline gap="xs" bg="colour.neutral.20" p="sm">
          <IressButton
            mode="muted"
            onClick={() => togglePanel('storybook/docs/panel')}
            prepend={<IressIcon name="code_blocks" />}
          >
            Show code
          </IressButton>
          <IressButton
            mode="muted"
            onClick={() => togglePanel('storybook/a11y/panel')}
            prepend={<IressIcon name="accessibility_new" />}
          >
            Accessibility
          </IressButton>
          <IressButton
            mode="muted"
            onClick={() => openSandbox()}
            prepend={<IressIcon name="draw" />}
          >
            Open in CodeSandbox
          </IressButton>
          <IressButton
            href={storybookUrl}
            target="_blank"
            mode="muted"
            rel="noopener noreferrer"
            ml="auto"
            append={<IressIcon name="open_in_new" />}
          >
            Open in Storybook
          </IressButton>
        </IressInline>
      </div>
    </IressCard>
  );
}

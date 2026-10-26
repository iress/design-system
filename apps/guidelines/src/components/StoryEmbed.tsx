import {
  IressButton,
  IressCard,
  IressIcon,
  IressInline,
  IressSpinner,
  IressText,
} from '@iress-oss/ids-components';
import { useState, useRef, useEffect } from 'react';

declare const __STORYBOOK_BRANCH__: string;
const branch = __STORYBOOK_BRANCH__;

const mainStorybook = `https://${branch}--691abcc79dfa560a36d0a74f.chromatic.com`;

const useRemote =
  import.meta.env.VITE_STORYBOOK_REMOTE === 'true' || !import.meta.env.DEV;

const subStorybooks = useRemote
  ? {
      components: `https://${branch}--69166895eb243715fcd0d241.chromatic.com`,
      tokens: `https://${branch}--69169618e0408bbf7684f876.chromatic.com`,
    }
  : {
      components: 'http://localhost:6006',
      tokens: 'http://localhost:6007',
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
  /** Whether to auto-resize the iframe to fit content. Defaults to true. */
  autoHeight?: boolean;
  /** Whether to show the controls bar (code, accessibility, sandbox buttons). Defaults to true. */
  controls?: boolean;
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
  autoHeight = true,
  controls = true,
}: StoryEmbedProps) {
  const [inView, setInView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  // Track the panel we're trying to open/close to avoid race conditions with RELAY_PANEL
  const pendingPanelRef = useRef<{
    panel: string | null;
    shouldOpen: boolean;
  } | null>(null);
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

  // Bug 1: Add panel=0 to ensure panel starts closed
  const iframeSrc = controls
    ? `${subStorybooks[type]}/?path=/story/${id}&shortcuts=false&singleStory=true&embedded=true&full=1&panel=0`
    : `${subStorybooks[type]}/iframe.html?id=${id}&viewMode=story&singleStory=true`;
  const storybookUrl = `${mainStorybook}/?path=/docs/${type}_${id}`;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.source !==
        (iframeRef.current?.contentWindow as MessageEventSource | null)
      )
        return;

      const data = event.data as
        | { type: string; height?: number; flag?: boolean; panel?: string }
        | undefined;

      if (data?.type === 'RELAY_SIZE' && iframeRef.current && autoHeight) {
        iframeRef.current.style.height = `${(data.height ?? 0) + 10}px`;
      }

      if (data?.type === 'RELAY_PANEL') {
        const isOpen = !!data.flag;
        setPanelOpen(isOpen);

        // Bug 3 fix: Only update activePanel based on our pending action, not raw Storybook state
        // This prevents race conditions where Storybook sends intermediate states
        if (pendingPanelRef.current) {
          const { panel, shouldOpen } = pendingPanelRef.current;
          if (shouldOpen && isOpen) {
            // Panel opened successfully
            setActivePanel(panel);
            pendingPanelRef.current = null;
          } else if (!shouldOpen && !isOpen) {
            // Panel closed successfully
            setActivePanel(null);
            pendingPanelRef.current = null;
          }
          // Otherwise, ignore intermediate states and wait for the final state
        } else if (!isOpen) {
          // No pending action and panel closed - clear active panel
          setActivePanel(null);
        }

        // Re-request size after panel toggle settles
        setTimeout(() => {
          iframeRef.current?.contentWindow?.postMessage(
            { type: 'REQUEST_SIZE' },
            new URL(iframeSrc).origin,
          );
        }, 300);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [iframeSrc, autoHeight]);

  const sendEmbedMessage = (panel?: string, showPanel?: boolean) => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'EMBED_STORYBOOK',
        panel,
        allowedPanels: panels,
        selectorsToHide: hide,
        showPanel: showPanel ?? !!panel,
      },
      new URL(iframeSrc).origin,
    );
  };

  const handleLoad = () => {
    // Bug 2: Start fade-out transition before hiding overlay
    setFadingOut(true);

    // Give time for Storybook to initialize and EMBED_STORYBOOK to run
    setTimeout(() => {
      sendEmbedMessage(defaultPanel, !!defaultPanel);
    }, 100);

    // Complete the fade-out after animation
    setTimeout(() => {
      setLoading(false);
      setFadingOut(false);
    }, 400);
  };

  const togglePanel = (panel: string) => {
    // Bug 3: Proper toggle - close if clicking the same panel that's open
    if (panelOpen && activePanel === panel) {
      // Close the panel
      pendingPanelRef.current = { panel: null, shouldOpen: false };
      sendEmbedMessage(panel, false);
    } else {
      // Open with the specified panel
      pendingPanelRef.current = { panel, shouldOpen: true };
      sendEmbedMessage(panel, true);
    }
  };

  const openSandbox = () => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'OPEN_SANDBOX',
      },
      new URL(iframeSrc).origin,
    );
  };

  return (
    <IressCard p="none" style={{ overflow: 'hidden' }} mb="spacing.8">
      <div
        ref={containerRef}
        style={{ position: 'relative', minHeight: height }}
      >
        {/* Bug 2: Animated loading overlay with fade-out transition */}
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
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: fadingOut ? 0 : 1,
              transition: 'opacity 0.3s ease-out',
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
              display: 'block',
              opacity: loading && !fadingOut ? 0 : 1,
              transition: 'height 0.2s ease, opacity 0.3s ease-out',
            }}
            onLoad={handleLoad}
          />
        )}
        {controls && (
          <IressInline gap="xs" bg="colour.neutral.20" p="sm">
            <IressButton
              mode={
                panelOpen && activePanel === 'storybook/docs/panel'
                  ? 'secondary'
                  : 'muted'
              }
              onClick={() => togglePanel('storybook/docs/panel')}
              prepend={<IressIcon name="code_blocks" />}
            >
              {panelOpen && activePanel === 'storybook/docs/panel'
                ? 'Hide code'
                : 'Show code'}
            </IressButton>
            <IressButton
              mode={
                panelOpen && activePanel === 'storybook/a11y/panel'
                  ? 'secondary'
                  : 'muted'
              }
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
        )}
      </div>
    </IressCard>
  );
}

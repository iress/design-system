import { getMainConfig } from './main';

vi.mock('url', () => import('node:url'));
vi.mock('path', () => import('node:path'));

const CODE_PANEL = 'storybook/docs/panel';
const A11Y_PANEL = 'storybook/a11y/panel';

describe('embedded Storybook panel requests', () => {
  let frame: HTMLIFrameElement;
  let manager: Document;
  let toggle: HTMLButtonElement;
  let toggleClick: ReturnType<typeof vi.fn<() => void>>;

  const requestPanel = (showPanel: boolean, panel?: string) => {
    frame.contentWindow?.dispatchEvent(
      new MessageEvent('message', {
        data: {
          type: 'EMBED_STORYBOOK',
          showPanel,
          panel,
          allowedPanels: [CODE_PANEL, A11Y_PANEL],
        },
      }),
    );
  };

  const addPanel = () => {
    const panel = manager.createElement('div');
    panel.id = 'storybook-panel-root';
    Object.defineProperty(panel, 'offsetHeight', { value: 200 });
    panel.innerHTML = `
      <div role="tablist" aria-label="Available addons">
        <button role="tab" data-key="${CODE_PANEL}">Code</button>
        <button role="tab" data-key="${A11Y_PANEL}">Accessibility</button>
      </div>
    `;
    manager.body.append(panel);
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    frame = document.createElement('iframe');
    document.body.append(frame);
    manager = frame.contentDocument!;

    const config = getMainConfig({ absolutePath: process.cwd() });
    if (typeof config.managerHead !== 'function') {
      throw new Error('Expected a managerHead transform');
    }
    const head: unknown = await Reflect.apply(config.managerHead, config, ['']);
    if (typeof head !== 'string') {
      throw new Error('Expected manager HTML');
    }
    const source = /<script>\s*(function _waitFor[\s\S]*?)<\/script>/.exec(
      head,
    )?.[1];
    expect(source).toBeDefined();

    const script = manager.createElement('script');
    script.textContent = `
      var _queryToOpenPanel = '[aria-label="Show addon panel"]';
      var _queryToClosePanel = '[aria-label="Hide addon panel"]';
      ${source}
    `;
    manager.body.append(script);

    toggle = manager.createElement('button');
    toggle.setAttribute('aria-label', 'Hide addon panel');
    toggleClick = vi.fn(() => {
      const isOpen = toggle.getAttribute('aria-label') === 'Hide addon panel';
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Show addon panel' : 'Hide addon panel',
      );
      manager.getElementById('storybook-panel-root')?.remove();
      if (!isOpen) addPanel();
    });
    toggle.addEventListener('click', toggleClick);
    manager.body.append(toggle);
    addPanel();
  });

  afterEach(async () => {
    await vi.advanceTimersByTimeAsync(8000);
    frame.remove();
    vi.useRealTimers();
  });

  it('does not let initial close polling undo a later open request', async () => {
    requestPanel(false);
    await vi.advanceTimersByTimeAsync(600);
    expect(toggle).toHaveAttribute('aria-label', 'Show addon panel');

    requestPanel(true, CODE_PANEL);
    await vi.advanceTimersByTimeAsync(8000);

    expect(toggle).toHaveAttribute('aria-label', 'Hide addon panel');
    expect(toggleClick).toHaveBeenCalledTimes(2);
  });

  it('does not let a pending open request override a newer close request', async () => {
    toggle.remove();
    requestPanel(true, CODE_PANEL);
    await vi.advanceTimersByTimeAsync(200);
    requestPanel(false, CODE_PANEL);
    await vi.advanceTimersByTimeAsync(200);

    toggle.setAttribute('aria-label', 'Show addon panel');
    manager.body.append(toggle);
    await vi.advanceTimersByTimeAsync(1000);

    expect(toggleClick).not.toHaveBeenCalled();
  });

  it('selects another tab without toggling an already open panel', async () => {
    const tab = manager.querySelector<HTMLButtonElement>(
      `[data-key="${A11Y_PANEL}"]`,
    )!;
    const selectTab = vi.fn();
    tab.addEventListener('click', selectTab);

    requestPanel(true, A11Y_PANEL);
    await vi.advanceTimersByTimeAsync(600);

    expect(selectTab).toHaveBeenCalledOnce();
    expect(toggleClick).not.toHaveBeenCalled();
  });

  it('opens the panel even when its tabs are not mounted while closed', async () => {
    toggle.click();
    toggleClick.mockClear();

    requestPanel(true, CODE_PANEL);
    await vi.advanceTimersByTimeAsync(600);

    expect(toggle).toHaveAttribute('aria-label', 'Hide addon panel');
    expect(toggleClick).toHaveBeenCalledOnce();
  });
});

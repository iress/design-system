import {
  SECTION_EVENT,
  getSectionFromUrl,
  getSectionHref,
  navigateToSection,
  parseMdxHref,
  scrollToSection,
} from './sectionLinks';

describe('parseMdxHref', () => {
  it('treats a missing href as external', () => {
    expect(parseMdxHref(undefined)).toEqual({ type: 'external' });
  });

  it('parses same-page heading links', () => {
    expect(parseMdxHref('#avoid-using-disabled')).toEqual({
      type: 'section',
      section: 'avoid-using-disabled',
    });
  });

  it('does not treat hash routes as heading links', () => {
    expect(parseMdxHref('#/components/button')).toEqual({ type: 'external' });
  });

  it('parses internal links without a heading', () => {
    expect(parseMdxHref('/components/button')).toEqual({
      type: 'internal',
      to: '/components/button',
    });
  });

  it('splits the heading from internal links', () => {
    expect(parseMdxHref('/components/button#avoid-using-disabled')).toEqual({
      type: 'internal',
      to: '/components/button',
      section: 'avoid-using-disabled',
    });
  });

  it('ignores an empty heading on internal links', () => {
    expect(parseMdxHref('/components/button#')).toEqual({
      type: 'internal',
      to: '/components/button',
      section: undefined,
    });
  });

  it('treats protocol-relative and absolute URLs as external', () => {
    expect(parseMdxHref('//example.com')).toEqual({ type: 'external' });
    expect(parseMdxHref('https://example.com#x')).toEqual({ type: 'external' });
  });
});

describe('section URLs', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('reads the section from the hash route', () => {
    window.history.replaceState(
      null,
      '',
      '/#/components/button?tab=develop&section=loading',
    );
    expect(getSectionFromUrl()).toBe('loading');
  });

  it('returns undefined when there is no section', () => {
    window.history.replaceState(null, '', '/#/components/button?tab=develop');
    expect(getSectionFromUrl()).toBeUndefined();
  });

  it('builds a section href on the current route, dropping other params', () => {
    window.history.replaceState(null, '', '/#/components/button?tab=develop');
    expect(getSectionHref('avoid-using-disabled')).toBe(
      '#/components/button?section=avoid-using-disabled',
    );
  });

  it('falls back to the root route when there is no hash', () => {
    expect(getSectionHref('intro')).toBe('#/?section=intro');
  });

  it('updates the URL and notifies listeners when navigating', () => {
    window.history.replaceState(null, '', '/#/components/button?tab=develop');
    const listener = vi.fn();
    window.addEventListener(SECTION_EVENT, listener);

    navigateToSection('avoid-using-disabled');

    expect(window.location.hash).toBe(
      '#/components/button?section=avoid-using-disabled',
    );
    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe(
      'avoid-using-disabled',
    );
    window.removeEventListener(SECTION_EVENT, listener);
  });
});

describe('scrollToSection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns false when the heading does not exist', () => {
    expect(scrollToSection('missing')).toBe(false);
  });

  it('scrolls the nearest scrollable container with an offset', () => {
    document.body.innerHTML = `
      <div id="scroller" style="overflow-y: auto">
        <h4 id="target">Target</h4>
      </div>
    `;
    const scroller = document.getElementById('scroller')!;
    const target = document.getElementById('target')!;
    scroller.scrollBy = vi.fn();
    scroller.getBoundingClientRect = () => ({ top: 100 }) as DOMRect;
    target.getBoundingClientRect = () => ({ top: 400 }) as DOMRect;

    expect(scrollToSection('target')).toBe(true);
    expect(scroller.scrollBy).toHaveBeenCalledWith({
      top: 280,
      behavior: 'smooth',
    });
  });

  it('falls back to scrollIntoView without a scrollable container', () => {
    document.body.innerHTML = '<h4 id="target">Target</h4>';
    const target = document.getElementById('target')!;
    target.scrollIntoView = vi.fn();

    expect(scrollToSection('target')).toBe(true);
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  describe('while the layout settles', () => {
    let resize: () => void;
    const observe = vi.fn();
    const disconnect = vi.fn();

    beforeEach(() => {
      vi.useFakeTimers();
      observe.mockClear();
      disconnect.mockClear();
      vi.stubGlobal(
        'ResizeObserver',
        class {
          constructor(callback: () => void) {
            resize = callback;
          }
          observe = observe;
          disconnect = disconnect;
        },
      );
      document.body.innerHTML = `
        <div id="scroller" style="overflow-y: auto">
          <div id="content"><h4 id="target">Target</h4></div>
        </div>
      `;
      const scroller = document.getElementById('scroller')!;
      scroller.scrollBy = vi.fn();
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.unstubAllGlobals();
    });

    const scroller = () => document.getElementById('scroller')!;

    it('re-aligns instantly when content above the heading resizes', () => {
      scrollToSection('target');
      expect(observe).toHaveBeenCalledWith(document.getElementById('content'));

      resize();

      expect(scroller().scrollBy).toHaveBeenLastCalledWith(
        expect.objectContaining({ behavior: 'auto' }),
      );
    });

    it('stops re-aligning after a timeout', () => {
      scrollToSection('target');
      vi.advanceTimersByTime(3000);
      expect(disconnect).toHaveBeenCalled();
    });

    it('stops re-aligning when the user scrolls', () => {
      scrollToSection('target');
      window.dispatchEvent(new Event('wheel'));
      expect(disconnect).toHaveBeenCalled();
    });
  });
});

/**
 * Helpers for linking to headings ("sections") within guidelines pages.
 *
 * The site uses hash routing (`#/components/button?tab=design`), so a native
 * `#heading-id` fragment would replace the route. Instead, the target heading
 * is stored in a `section` search param (`#/components/button?section=id`)
 * and `TabbedContent` selects the right tab and scrolls to it.
 */

export const SECTION_PARAM = 'section';

/** Fired when a same-page section link is clicked. `detail` is the heading id. */
export const SECTION_EVENT = 'ids:navigate-section';

export type ParsedHref =
  | { type: 'section'; section: string }
  | { type: 'internal'; to: string; section?: string }
  | { type: 'external' };

/** Classify an MDX link href. */
export function parseMdxHref(href: string | undefined): ParsedHref {
  if (!href) return { type: 'external' };

  if (href.startsWith('#') && href.length > 1 && !href.startsWith('#/')) {
    return { type: 'section', section: decodeURIComponent(href.slice(1)) };
  }

  if (href.startsWith('/') && !href.startsWith('//')) {
    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return { type: 'internal', to: href };
    const section = href.slice(hashIndex + 1);
    return {
      type: 'internal',
      to: href.slice(0, hashIndex) || '/',
      section: section ? decodeURIComponent(section) : undefined,
    };
  }

  return { type: 'external' };
}

function getHashParts(): { path: string; params: URLSearchParams } {
  const [path, query] = window.location.hash.split('?');
  return { path: path || '#/', params: new URLSearchParams(query ?? '') };
}

/** Read the `section` param from the hash route. */
export function getSectionFromUrl(): string | undefined {
  return getHashParts().params.get(SECTION_PARAM) ?? undefined;
}

/** Build the hash URL for a section on the current page. */
export function getSectionHref(section: string): string {
  const { path } = getHashParts();
  const params = new URLSearchParams({ [SECTION_PARAM]: section });
  return `${path}?${params.toString()}`;
}

/** Update the URL to point at a section on the current page and notify listeners. */
export function navigateToSection(section: string): void {
  window.history.pushState(null, '', getSectionHref(section));
  window.dispatchEvent(new CustomEvent(SECTION_EVENT, { detail: section }));
}

function getScrollContainer(el: HTMLElement): HTMLElement | null {
  let parent = el.parentElement;
  while (parent) {
    const { overflowY } = getComputedStyle(parent);
    if (overflowY === 'auto' || overflowY === 'scroll') return parent;
    parent = parent.parentElement;
  }
  return null;
}

/** How long to keep a heading aligned while embeds above it load and resize. */
const SETTLE_MS = 3000;

function alignTo(
  el: HTMLElement,
  container: HTMLElement | null,
  behavior: ScrollBehavior,
): void {
  if (container) {
    const offset =
      el.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollBy({ top: offset - 20, behavior });
  } else {
    el.scrollIntoView({ behavior, block: 'start' });
  }
}

/**
 * Keep the heading aligned while content above it changes size (e.g. story
 * embeds resizing as they load). Stops after SETTLE_MS or when the user scrolls.
 */
function keepAligned(el: HTMLElement, container: HTMLElement | null): void {
  const content = el.parentElement;
  if (!content || typeof ResizeObserver === 'undefined') return;

  const observer = new ResizeObserver(() => alignTo(el, container, 'auto'));
  const userEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const stop = () => {
    observer.disconnect();
    clearTimeout(timer);
    userEvents.forEach((type) => window.removeEventListener(type, stop));
  };

  observer.observe(content);
  userEvents.forEach((type) =>
    window.addEventListener(type, stop, { passive: true }),
  );
  timer = setTimeout(stop, SETTLE_MS);
}

/** Scroll the heading with the given id into view. Returns false if not found. */
export function scrollToSection(section: string): boolean {
  const el = document.getElementById(section);
  if (!el) return false;

  const container = getScrollContainer(el);
  alignTo(el, container, 'smooth');
  keepAligned(el, container);
  return true;
}

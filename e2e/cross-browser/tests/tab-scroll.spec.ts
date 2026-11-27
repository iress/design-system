import { expect, test } from '@playwright/test';

test('keyboard selection scrolls only the tab list and hover does not restart it', async ({
  page,
}) => {
  await page.setViewportSize({ width: 160, height: 500 });
  await page.goto('/iframe.html?viewMode=story&id=components-tabset--panels');

  const tablist = page.getByRole('tablist');
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(3);
  await page.evaluate(() => document.fonts.ready);

  // Place the tab bar within a longer page, then focus an overflowing tab.
  await page.locator('#storybook-root').evaluate((root) => {
    root.style.paddingTop = '800px';
    root.style.paddingBottom = '1200px';
  });
  await tabs.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();

  const initialPageY = await tablist.evaluate(async (list) => {
    list.scrollTo({ left: 0, behavior: 'instant' });
    window.scrollTo(0, window.scrollY + list.getBoundingClientRect().top + 8);
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    return window.scrollY;
  });
  expect(initialPageY).toBeGreaterThan(0);
  expect(
    await tablist.evaluate((list) => list.scrollWidth > list.clientWidth),
  ).toBe(true);

  // Dispatch a hover on the first frame of the actual horizontal scroll.
  await tablist.evaluate((list) => {
    const scrollTo = list.scrollTo.bind(list);
    let calls = 0;
    const pageY = window.scrollY;
    window.addEventListener('scroll', () => {
      if (window.scrollY !== pageY) {
        list.setAttribute('data-page-scrolled', 'true');
      }
    });
    Object.defineProperty(list, 'scrollTo', {
      configurable: true,
      value: (...args: unknown[]) => {
        calls += 1;
        Reflect.apply(scrollTo, list, args);
      },
    });
    list.querySelectorAll<HTMLElement>('[role="tab"]').forEach((tab) => {
      const scrollIntoView = tab.scrollIntoView.bind(tab);
      tab.scrollIntoView = (...args) => {
        calls += 1;
        scrollIntoView(...args);
      };
    });
    const hoverOnScroll = () => {
      if (calls > 0) {
        list.removeEventListener('scroll', hoverOnScroll);
        const tab = list.querySelector('[role="tab"]');
        list.setAttribute('data-scroll-calls-before-hover', String(calls));
        tab?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            list.setAttribute('data-scroll-calls-after-hover', String(calls));
          });
        });
      }
    };
    list.addEventListener('scroll', hoverOnScroll);
  });

  await page.keyboard.press('Enter');
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(tablist).toHaveAttribute('data-scroll-calls-after-hover', '1');
  await expect(tablist).toHaveAttribute('data-scroll-calls-before-hover', '1');
  await expect
    .poll(() =>
      tabs.nth(1).evaluate((tab) => {
        const list = tab.closest('[role="tablist"]')!;
        const tabRect = tab.getBoundingClientRect();
        const listRect = list.getBoundingClientRect();
        return JSON.stringify({
          tabLeft: tabRect.left,
          tabRight: tabRect.right,
          listLeft: listRect.left,
          listRight: listRect.right,
          scrollLeft: list.scrollLeft,
          scrollWidth: list.scrollWidth,
          clientWidth: list.clientWidth,
          visible:
            tabRect.left >= listRect.left - 1 &&
            tabRect.right <= listRect.right + 1,
        });
      }),
    )
    .toContain('"visible":true');
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(initialPageY);
  await expect(tablist).not.toHaveAttribute('data-page-scrolled', 'true');
});

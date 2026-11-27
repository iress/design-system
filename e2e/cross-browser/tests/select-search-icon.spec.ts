import { expect, test } from '@playwright/test';

/**
 * Reported by Hiroyo Horikawa: with an async IressSelect in a narrow space, the
 * search icon in the "Search and select" field is partly clipped on Windows
 * when the select is opened. It was not seen on macOS.
 *
 * The popover gets an inline min-width equal to the trigger, but the search
 * input has an intrinsic width, so the popover can be wider than a narrow
 * viewport. The search input root has `overflow: hidden`.
 */
const STORY_URL =
  '/iframe.html?viewMode=story&id=components-select--async-options';

// The search input that lives inside the open popover (the closed trigger also
// renders one, so scope to the popover content).
const POPOVER_SEARCH_INPUT = '.ids-popover__content .ids-select-search-input';

// Widths around and below the popover's intrinsic width (~213px).
const VIEWPORT_WIDTHS = [120, 160, 200, 260];

// Sub-pixel tolerance for fractional layout and device scale factors.
const TOLERANCE = 0.75;

for (const width of VIEWPORT_WIDTHS) {
  test(`search icon is fully visible when opened in a ${width}px wide viewport`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 500 });
    await page.goto(STORY_URL);

    await page.getByRole('button', { name: 'Single select' }).click();

    const searchInput = page.locator(POPOVER_SEARCH_INPUT).first();
    await expect(searchInput).toBeVisible();

    // Popover positioning runs inside requestAnimationFrame, and focusing the
    // input can scroll the page, so wait for both to settle.
    await page.waitForTimeout(750);

    const metrics = await page.evaluate((selector) => {
      const root = document.querySelector(selector);
      const icon = root?.querySelector('.ids-icon');
      if (!root || !icon) {
        return null;
      }

      const rootRect = root.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();

      return {
        viewportWidth: window.innerWidth,
        pageScrollX: window.scrollX,
        rootLeft: rootRect.left,
        rootRight: rootRect.right,
        rootScrollLeft: root.scrollLeft,
        iconLeft: iconRect.left,
        iconRight: iconRect.right,
        userAgent: navigator.userAgent,
      };
    }, POPOVER_SEARCH_INPUT);

    // Attach the numbers so runs on different operating systems can be compared.
    await testInfo.attach('metrics.json', {
      body: JSON.stringify(metrics, null, 2),
      contentType: 'application/json',
    });

    expect(metrics, 'search input and icon should exist').not.toBeNull();
    const m = metrics!;

    // The icon must sit inside the visible window and inside the input root.
    expect(m.iconLeft, 'icon left edge vs viewport').toBeGreaterThanOrEqual(
      -TOLERANCE,
    );
    expect(m.iconRight, 'icon right edge vs viewport').toBeLessThanOrEqual(
      m.viewportWidth + TOLERANCE,
    );
    expect(m.iconLeft, 'icon left edge vs input root').toBeGreaterThanOrEqual(
      m.rootLeft - TOLERANCE,
    );

    // The root is overflow: hidden. If focus scrolled it, the icon is clipped.
    expect(m.rootScrollLeft, 'input root should not be scrolled').toBe(0);
  });
}

# Visual Regression Testing for Migration

Visual regression testing (VRT) is highly recommended for IDS v6 migration to catch styling and layout changes that automated checks miss.

## Why VRT for Migration?

IDS v6 introduces significant styling changes:
- New CSS architecture (Panda CSS)
- Different default spacing/sizing
- Icon system change (FontAwesome → Material Symbols)
- Component visual updates (shadows, borders, colors)

VRT catches these before users do.

## Recommended: Playwright VRT

Playwright has built-in visual comparison with minimal setup.

### Automated Setup

The migration skill includes a script that auto-detects your routing framework and generates tests:

```bash
.agents/skills/version-migration/scripts/setup-playwright-vrt.sh
```

This script:
- Detects **React Router** or **Next.js** (App Router / Pages Router)
- Finds all static routes in your application
- Generates Playwright config and test suite
- Creates tests for each route + interactive components
- Includes responsive viewport tests

**Supported frameworks:**
- React Router (v5, v6)
- Next.js App Router
- Next.js Pages Router

Dynamic routes (with `:param` or `[param]`) are skipped automatically.

### Manual Setup

If you prefer manual setup or use a different router:

```bash
# Install Playwright
npm install -D @playwright/test

# Initialize (creates playwright.config.ts)
npx playwright install
```

### Basic Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  // Generate baseline screenshots
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true' ? 'all' : 'none',
});
```

### Pre-Migration: Capture Baselines

Before migrating, the setup script has already generated route-based tests. Just capture baselines:

```typescript
// e2e/components.spec.ts
import { test, expect } from '@playwright/test';

test('button variants', async ({ page }) => {
  await page.goto('/components/button');
  await expect(page).toHaveScreenshot('button-variants.png');
});

test('form validation', async ({ page }) => {
  await page.goto('/forms/example');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveScreenshot('form-validation.png');
});

test('modal open', async ({ page }) => {
  await page.goto('/components/modal');
  await page.getByRole('button', { name: 'Open Modal' }).click();
  await page.waitForSelector('[role="dialog"]');
  await expect(page).toHaveScreenshot('modal-open.png');
});
```

```bash
UPDATE_SNAPSHOTS=true npx playwright test
```

This creates `e2e/components.spec.ts-snapshots/` with baseline images for all detected routes.

If you need to add custom tests, edit `e2e/components.spec.ts`:

### Post-Migration: Compare

After migrating to v6, run tests without `UPDATE_SNAPSHOTS`:

```bash
npx playwright test
```

Playwright will:
- Compare new screenshots to baselines
- Fail tests if differences exceed threshold
- Generate diff images showing changes

### Review Differences

```bash
# Open HTML report with visual diffs
npx playwright show-report
```

Review each diff:
- ✅ **Expected changes**: Update baseline (`UPDATE_SNAPSHOTS=true`)
- ❌ **Regressions**: Fix the component/styling

## Alternative: Chromatic (Storybook)

If using Storybook, Chromatic provides automated VRT:

```bash
# Install
npm install -D chromatic

# Capture baseline (before migration)
npx chromatic --project-token=<token>

# After migration, run again
npx chromatic --project-token=<token>
```

Chromatic shows visual diffs in a web UI.

## What to Test

The auto-generated test suite covers:

1. **All static routes**: Every page in your app (excluding dynamic routes)
2. **Interactive components**: Buttons, forms, modals (auto-detected)
3. **Responsive layouts**: Mobile, tablet, desktop viewports

Additional priority components to add manually:

1. **Forms**: Inputs, validation states, error messages
2. **Modals/Slideouts**: Overlays, positioning, backdrop
3. **Buttons**: All modes, loading states, icons
4. **Alerts**: All status variants
5. **Tables**: Headers, rows, sorting indicators
6. **Navigation**: Menus, tabs, breadcrumbs
7. **Layout**: Spacing, responsive breakpoints

## Tips

- **Test critical user flows**, not every component variation
- **Use consistent viewport sizes** (e.g., 1280x720)
- **Wait for animations** to complete before screenshots
- **Mask dynamic content** (timestamps, random IDs)
- **Set threshold** for acceptable pixel differences (e.g., 0.2%)

## Playwright VRT Script

Use `scripts/setup-playwright-vrt.sh` to generate a starter test suite based on your component usage.

## Integration with CI

```yaml
# .github/workflows/vrt.yml
name: Visual Regression Tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm start & npx wait-on http://localhost:3000
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## When to Update Baselines

Update baselines when:
- ✅ Visual change is intentional (design update)
- ✅ Component behavior improved (better accessibility)
- ✅ Layout fix (responsive improvement)

Don't update when:
- ❌ Unexpected spacing change
- ❌ Missing styles
- ❌ Broken layout
- ❌ Wrong colors/icons

## Post-Migration Checklist

- [ ] Run VRT suite
- [ ] Review all visual diffs
- [ ] Fix regressions
- [ ] Update baselines for intentional changes
- [ ] Document visual changes in PR
- [ ] Get design team approval for significant changes

#!/usr/bin/env bash
# Generates Playwright VRT test suite based on component usage

set -euo pipefail

echo "🎭 Setting up Playwright Visual Regression Testing..."
echo

# Check if Playwright is installed
if ! command -v npx &> /dev/null; then
  echo "❌ npx not found. Install Node.js first."
  exit 1
fi

# Check if already initialized
if [[ -f "playwright.config.ts" ]]; then
  echo "⚠️  playwright.config.ts already exists"
  read -p "Overwrite? (y/N): " -n 1 -r
  echo
  [[ ! $REPLY =~ ^[Yy]$ ]] && echo "Skipping config generation" && CONFIG_EXISTS=true
fi

# Generate config if needed
if [[ -z "${CONFIG_EXISTS:-}" ]]; then
  echo "📝 Generating playwright.config.ts..."
  cat > playwright.config.ts << 'EOF'
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Update snapshots with UPDATE_SNAPSHOTS=true
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true' ? 'all' : 'none',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
EOF
  echo "  ✅ Created playwright.config.ts"
fi

# Create e2e directory
mkdir -p e2e

# Detect routing framework
echo
echo "🔍 Detecting routing framework..."
ROUTER_TYPE=""
ROUTE_LIST=""

if grep -q "react-router" package.json 2>/dev/null; then
  ROUTER_TYPE="react-router"
  echo "  ✅ Detected React Router"
  
  # Find React Router routes
  ROUTE_FILES=$(grep -rl "path=" src/ 2>/dev/null | grep -E "\.(tsx?|jsx?)$" || echo "")
  if [[ -n "$ROUTE_FILES" ]]; then
    ROUTE_LIST=$(echo "$ROUTE_FILES" | while read -r file; do
      grep -oE 'path="[^"]*"' "$file" | sed 's/path="//;s/"$//'
    done | grep -v ":" | grep -v "^\*$" | sort -u)
  fi
  
elif grep -q "next" package.json 2>/dev/null; then
  ROUTER_TYPE="nextjs"
  echo "  ✅ Detected Next.js"
  
  # Find Next.js pages (app router)
  if [[ -d "app" ]]; then
    echo "  📁 Using App Router"
    ROUTE_LIST=$(find app -name "page.*" -type f 2>/dev/null | while read -r file; do
      route=$(echo "$file" | sed 's|^app||;s|/page\..*$||')
      [[ -z "$route" ]] && route="/"
      [[ "$route" =~ \[ ]] && continue
      echo "$route"
    done | sort -u)
  fi
  
  # Find Next.js pages (pages router)
  if [[ -d "pages" ]]; then
    echo "  📁 Using Pages Router"
    PAGES_ROUTES=$(find pages -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" \) 2>/dev/null | while read -r file; do
      route=$(echo "$file" | sed 's|^pages||;s|/index\..*$||;s|\..*$||')
      [[ -z "$route" ]] && route="/"
      [[ "$route" =~ \[ ]] && continue
      [[ "$route" =~ ^/api ]] && continue
      echo "$route"
    done | sort -u)
    ROUTE_LIST="${ROUTE_LIST}${ROUTE_LIST:+$'\n'}${PAGES_ROUTES}"
  fi
fi

# Convert to array
if [[ -n "$ROUTE_LIST" ]]; then
  mapfile -t ROUTES <<< "$ROUTE_LIST"
  ROUTES=($(printf '%s\n' "${ROUTES[@]}" | sort -u))
  echo "  📊 Found ${#ROUTES[@]} route(s)"
else
  echo "  ℹ️  No routes detected, using example routes"
  ROUTES=("/" "/about" "/contact")
fi

# Generate test file
echo
echo "📝 Generating e2e/components.spec.ts..."

# Generate route tests dynamically
ROUTE_TESTS=""
for route in "${ROUTES[@]}"; do
  # Sanitize route for test name
  TEST_NAME=$(echo "$route" | sed 's|/|-|g;s|^-||;s|-$||')
  [[ -z "$TEST_NAME" ]] && TEST_NAME="home"
  
  ROUTE_TESTS+="
  test('route: $route', async ({ page }) => {
    await page.goto('$route');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('route-$TEST_NAME.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
"
done

cat > e2e/components.spec.ts << EOF
import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for IDS v6 Migration
 * 
 * Auto-generated based on detected routes ($ROUTER_TYPE)
 * 
 * BEFORE MIGRATION:
 *   Run: UPDATE_SNAPSHOTS=true npx playwright test
 *   This captures baseline screenshots
 * 
 * AFTER MIGRATION:
 *   Run: npx playwright test
 *   This compares new screenshots to baselines
 *   Review diffs: npx playwright show-report
 */

test.describe('Page Routes Visual Regression', () => {$ROUTE_TESTS
});

test.describe('Interactive Components', () => {
  // Add tests for interactive states
  test('button states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find first button
    const button = page.getByRole('button').first();
    if (await button.count() > 0) {
      // Hover state
      await button.hover();
      await expect(page).toHaveScreenshot('button-hover.png', {
        animations: 'disabled',
      });
      
      // Focus state
      await button.focus();
      await expect(page).toHaveScreenshot('button-focus.png', {
        animations: 'disabled',
      });
    }
  });

  test('form validation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find and submit first form
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      const submitButton = form.getByRole('button', { name: /submit/i });
      if (await submitButton.count() > 0) {
        await submitButton.click();
        await page.waitForTimeout(500); // Wait for validation
        await expect(page).toHaveScreenshot('form-validation.png', {
          fullPage: true,
          animations: 'disabled',
        });
      }
    }
  });

  test('modal interaction', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find button that opens modal
    const modalTrigger = page.getByRole('button', { name: /open|show|modal/i }).first();
    if (await modalTrigger.count() > 0) {
      await modalTrigger.click();
      await page.waitForSelector('[role="dialog"]', { state: 'visible' });
      await page.waitForTimeout(300); // Wait for animation
      await expect(page).toHaveScreenshot('modal-open.png', {
        animations: 'disabled',
      });
    }
  });
});

test.describe('Responsive Layout', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
  ];

  for (const viewport of viewports) {
    test(\`\${viewport.name} viewport\`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(\`layout-\${viewport.name}.png\`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
EOF

echo "  ✅ Created e2e/components.spec.ts"
[[ -n "$ROUTER_TYPE" ]] && echo "  📍 Generated tests for ${#ROUTES[@]} route(s)"

# Update package.json scripts
echo
echo "📝 Adding npm scripts..."
if [[ -f "package.json" ]]; then
  if ! grep -q '"test:vrt"' package.json; then
    # Add scripts (simplified - manual edit recommended)
    echo "  ℹ️  Add these scripts to package.json:"
    echo '    "test:vrt": "playwright test",'
    echo '    "test:vrt:update": "UPDATE_SNAPSHOTS=true playwright test",'
    echo '    "test:vrt:ui": "playwright test --ui"'
  else
    echo "  ✅ VRT scripts already exist"
  fi
fi

# Summary
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Playwright VRT setup complete!"
echo
echo "📋 Next steps:"
echo
echo "1. Install Playwright:"
echo "   npm install -D @playwright/test"
echo "   npx playwright install"
echo
echo "2. Customize test routes in e2e/components.spec.ts"
echo
echo "3. BEFORE migration - capture baselines:"
echo "   UPDATE_SNAPSHOTS=true npx playwright test"
echo
echo "4. Perform IDS v6 migration"
echo
echo "5. AFTER migration - run VRT:"
echo "   npx playwright test"
echo
echo "6. Review visual diffs:"
echo "   npx playwright show-report"
echo
echo "📖 Full guide: references/visual-regression-testing.md"

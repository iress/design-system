# Frequently Asked Questions

---

## Which version should I use?

Use **version 6** for all new development. It includes the latest components, tokens, and accessibility improvements. See the [versions page](../get-started/versions.md) for details.

## Do I need to upgrade from v5?

v5 remains maintained for security fixes, but new features and components are only added to v6. We recommend planning your migration. See the [v5 to v6 migration guide](../migration/from-v5-to-v6.md).

## What support is available for migration?

A comprehensive [migration guide](../migration/from-v5-to-v6.md) covers all breaking changes. If you plan to migrate soon, reach out to the design system team — we partner with teams during migration.

## How do I report a bug or request a feature?

Each component page has "Report issue" and "Request feature" links that open pre-filled GitHub issues. You can also [create an issue directly](https://github.com/iress/design-system/issues/new/choose).

## Can I use IDS with AI coding tools?

Yes — IDS ships AI-optimised documentation via the `.ai/` directory in the npm package, and provides [agent skills](../get-started/ai.md) for GitHub Copilot, Kiro CLI, Cursor, and Claude Code.

## Does IDS support server-side rendering (SSR)?

IDS components are client-side React components. For SSR frameworks (Next.js, Remix), ensure you wrap the app in `IressProvider` and follow the [CSP guide](../get-started/content-security-policy.md) for font/style loading.

## How do I customise the theme?

IDS uses design tokens that can be overridden via CSS custom properties. See the [tokens documentation](../tokens/colour.md) for available customisation points.
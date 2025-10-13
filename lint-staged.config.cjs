// Simple fallback configuration
// Main configurations are in:
// - lint-staged.pre-commit.config.cjs (for pre-commit hooks)
// - lint-staged.pre-push.config.cjs (for pre-push hooks)

module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '**/*.{json,md}': ['prettier --write'],
};

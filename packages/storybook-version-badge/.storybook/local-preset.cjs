const { setupLocalPreset } = require('../../../shared/storybook-addon-dev.cjs');

module.exports = setupLocalPreset({
  managerEntries: [
    require.resolve('./manager.ts'),
    require.resolve('../dist/manager.js'),
  ],
});

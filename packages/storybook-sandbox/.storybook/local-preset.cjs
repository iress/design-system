const { setupLocalPreset } = require('../../../shared/storybook-addon-dev.cjs');

module.exports = setupLocalPreset({
  managerEntries: [require.resolve('../dist/manager.js')],
  previewAnnotations: [require.resolve('../dist/preview.js')],
});

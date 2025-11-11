const { setupLocalPreset } = require('../../../shared/storybook-addon-dev.cjs');
const preset = require('../dist/preset.cjs');

module.exports = setupLocalPreset({
  managerEntries: [require.resolve('../dist/manager.js')],
  preset,
  previewAnnotations: [require.resolve('../dist/preview.js')],
});

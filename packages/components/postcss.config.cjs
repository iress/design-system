const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 0,
      browsers: 'last 2 versions',
    }),
  ],
};

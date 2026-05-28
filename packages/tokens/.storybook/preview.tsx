import { getPreview } from '@iress-oss/ids-storybook-config/preview';
const preview = getPreview({
  sandboxConfig: {
    dependencies: {
      '@iress-oss/ids-tokens': 'beta',
    },
  },
});
export default preview;

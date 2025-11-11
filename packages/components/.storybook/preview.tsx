import * as componentMapping from '@/main';
import { getPreview } from '@iress-oss/ids-storybook-config/preview';
import '../src/styled-system/styles.css';

const preview = getPreview({
  docsProps: {
    componentMapping,
    noStyles: true,
  },
});

export default preview;

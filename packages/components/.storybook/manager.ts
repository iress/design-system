import { addons } from 'storybook/manager-api';
import { version } from '../package.json';

addons.setConfig({
  IDS_VersionBadge: {
    environment: () => {
      if (window.location.origin.includes('localhost')) {
        return 'Local';
      }

      if (window.location.origin.includes('staging')) {
        return 'Staging';
      }

      if (window.location.origin.includes('dev')) {
        return 'Dev';
      }

      if (window.location.origin.includes('chromatic')) {
        return 'Chromatic';
      }

      return '';
    },
    version,
  },
});

import { addons } from 'storybook/manager-api';
import packageJson from '../package.json' with { type: 'json' };

addons.setConfig({
  IDS_VersionBadge: {
    environment: () => {
      if (window.location.host.includes('localhost')) {
        return 'Local';
      }

      if (window.location.host.includes('staging')) {
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
    version: packageJson.version,
  },
});

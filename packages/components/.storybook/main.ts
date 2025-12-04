import { getMainConfig } from '@iress-oss/ids-storybook-config/main';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const config = getMainConfig({
  absolutePath: dirname(dirname(fileURLToPath(import.meta.url))),
  tsConfigWithAlias: 'tsconfig.base.json',
});

// TODO: Remove exclusion of addons when Sandbox is no longer using React Live
config.addons = (config.addons ?? []).filter((addon) => {
  if (typeof addon === 'string') {
    return ['sandbox'].every((excluded) => !addon.includes(excluded));
  }

  return true;
});

export default config;

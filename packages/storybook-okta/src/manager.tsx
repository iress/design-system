import { addons } from 'storybook/manager-api';
import { Addon_TypesEnum } from 'storybook/internal/types';
import { ADDON_ID, ADDON_TITLE } from './constants';
import { type AddonConfig } from './types';
import { registerOkta } from './helpers/oktaRegister';
import { OktaGuard } from './components/OktaGuard';

addons.register(ADDON_ID, (api) => {
  const addonConfig = addons.getConfig()[ADDON_ID] as AddonConfig;

  if (!addonConfig) {
    // No addon configuration, so no setup required.
    return;
  }

  registerOkta(addonConfig);

  addons.add(ADDON_ID, {
    type: Addon_TypesEnum.TOOLEXTRA,
    title: ADDON_TITLE,
    render: () => <OktaGuard api={api} config={addonConfig} />,
  });
});

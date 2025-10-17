import { addons } from 'storybook/manager-api';
import { Addon_TypesEnum } from 'storybook/internal/types';
import { ADDON_ID, ADDON_TITLE } from './constants';
import { OktaGuard } from './components/OktaGuard';

addons.register(ADDON_ID, (api) => {
  addons.add(ADDON_ID, {
    type: Addon_TypesEnum.TOOLEXTRA,
    title: ADDON_TITLE,
    render: () => <OktaGuard api={api} />,
  });
});

import { IconButton } from 'storybook/internal/components';
import { BookIcon } from '@storybook/icons';
import { ADDON_ID } from '../constants';
import { type API } from 'storybook/manager-api';
import { isSidebarItemVisible } from '../helpers/isSidebarItemVisible';
import { useState } from 'react';
import type { AddonConfig } from '../types';

interface ToggleStoriesProps extends AddonConfig {
  active?: boolean;
  api: API;
}

export const ToggleStories = ({
  active = true,
  api,
  disable,
}: ToggleStoriesProps) => {
  const [visible, setVisible] = useState(() =>
    Boolean(window.localStorage.getItem(ADDON_ID)),
  );

  if (!active || disable?.()) {
    return null;
  }

  return (
    <IconButton
      active={visible}
      key={ADDON_ID}
      title={visible ? 'Hide stories' : 'Show stories'}
      onClick={() => {
        if (disable?.()) {
          return;
        }

        const toggledVisible = !visible;

        if (toggledVisible) {
          window.localStorage.setItem(ADDON_ID, 'true');
        } else {
          window.localStorage.removeItem(ADDON_ID);
        }

        setVisible(toggledVisible);

        // TODO: In Storybook Composition, toggling the filter does not work as expected
        // because refs are treated differently. For now, we force a remount of Storybook
        // when toggling the visibility of stories if refs are present.
        if (api.getRefs() && Object.keys(api.getRefs()).length > 0) {
          window.location.reload();
        } else {
          void api.experimental_setFilter(ADDON_ID, (item) =>
            isSidebarItemVisible(item, toggledVisible),
          );
        }
      }}
    >
      <BookIcon />
    </IconButton>
  );
};

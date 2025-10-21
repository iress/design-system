import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressPanel,
  IressStack,
  type IressPanelProps,
} from '@iress-oss/ids-components';
import elevation from '../schema/elevation';
import { TokenTag } from '../../docs/components/TokenTag';

type Story = StoryObj<IressPanelProps>;

export default {
  title: 'Elevation',
  component: IressStack,
  args: {
    gap: 'md',
  },
} as Meta<typeof IressPanel>;

export const Elevation: Story = {
  args: {
    children: [
      <IressPanel key="elevation.raised" layerStyle="elevation.raised" stretch>
        <h2>Raised</h2>
        <p>{elevation.raised.$description}</p>
        <p>
          <TokenTag>elevation.raised</TokenTag>
        </p>
      </IressPanel>,
      <IressPanel
        key="elevation.floating"
        layerStyle="elevation.floating"
        stretch
      >
        <h2>Floating</h2>
        <p>{elevation.floating.$description}</p>
        <p>
          <TokenTag>elevation.floating</TokenTag>
        </p>
      </IressPanel>,
      <IressPanel
        key="elevation.overflow"
        layerStyle="elevation.overflow"
        stretch
      >
        <h2>Overflow</h2>
        <p>{elevation.overflow.$description}</p>
        <p>
          <TokenTag>elevation.overflow</TokenTag>
        </p>
      </IressPanel>,
      <IressPanel key="elevation.focus" layerStyle="elevation.focus" stretch>
        <h2>Focus</h2>
        <p>{elevation.focus.$description}</p>
        <p>
          <TokenTag>elevation.focus</TokenTag>
        </p>
      </IressPanel>,
      <IressPanel
        key="elevation.focusCompact"
        layerStyle="elevation.focusCompact"
        stretch
        borderRadius="none"
      >
        <h2>Focus Compact</h2>
        <p>{elevation.focusCompact.$description}</p>
        <p>
          <TokenTag>elevation.focusCompact</TokenTag>
        </p>
      </IressPanel>,
    ],
  },
};

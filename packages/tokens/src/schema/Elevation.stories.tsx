import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressPanel,
  IressStack,
  type IressPanelProps,
} from '@iress-oss/ids-components';
import elevation from '../schema/elevation';
import { TokenTag } from '../../docs/components/TokenTag';
import cssVars from '~/generated/css-vars';

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
      <IressPanel
        key="elevation.raised"
        layerStyle="elevation.raised"
        stretch
        style={{
          border: cssVars.elevation.raised.border,
          boxShadow: cssVars.elevation.raised.shadow,
        }}
      >
        <h2>Raised</h2>
        <p>{elevation.raised.$description}</p>
        <p>
          <TokenTag>elevation.raised</TokenTag>
        </p>
      </IressPanel>,
      <IressPanel
        key="elevation.floating"
        layerStyle="elevation.floating"
        style={{
          border: cssVars.elevation.floating.border,
          boxShadow: cssVars.elevation.floating.shadow,
        }}
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
        style={{
          border: cssVars.elevation.overflow.border,
          boxShadow: cssVars.elevation.overflow.shadow,
        }}
        stretch
      >
        <h2>Overflow</h2>
        <p>{elevation.overflow.$description}</p>
        <p>
          <TokenTag>elevation.overflow</TokenTag>
        </p>
      </IressPanel>,
      <IressPanel
        key="elevation.focus"
        layerStyle="elevation.focus"
        stretch
        style={{
          boxShadow: cssVars.elevation.focus.shadow,
          borderColor: cssVars.elevation.focus.borderColor,
        }}
      >
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
        style={{
          boxShadow: cssVars.elevation.focusCompact.shadow,
          borderColor: cssVars.elevation.focusCompact.borderColor,
        }}
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

import { EXPANDER_MODES, IressExpander } from '.';

import { type Meta, type StoryObj } from '@storybook/react';
import { IressCol } from '../Col';
import { IressRow } from '../Row';
import { IressText } from '../Text';
import { MultipleExpander } from './mocks/MultipleExpander';
import MultipleExpanderSource from './mocks/MultipleExpander.tsx?raw';
import {
  disableArgTypes,
  withCustomSource,
} from '@iress-oss/ids-storybook-config';

export default {
  title: 'Components/Expander',
  component: IressExpander,
} as Meta<typeof IressExpander>;

export const Default: StoryObj<typeof IressExpander> = {
  args: {
    activator: 'Expander activator',
    children:
      'Expander content will go here (it is unformatted by default, use IressText to format the text)',
  },
};

const activator = (
  <div>
    <IressText element="h3">Expander activator</IressText>
  </div>
);

const content = (
  <IressText>
    Okay, so 9:00 you are strolling through the parking lot, you see us
    struggling in the car, you walk up, you open the door and you say, your
    line, George.
  </IressText>
);

export const Mode: StoryObj<typeof IressExpander> = {
  args: {
    ...Default.args,
  },
  argTypes: {
    ...disableArgTypes(['mode', 'activator', 'children']),
  },
  render: (args) => (
    <div className="iress-u-stack iress--gutter--md">
      {EXPANDER_MODES.map((mode) => (
        <div key={mode}>
          <IressText element="h2">{mode} mode</IressText>
          <div className="iress-u-inline iress--gutter--md" key={mode}>
            <IressExpander {...args} mode={mode} activator={activator}>
              <IressRow gutter="md" verticalAlign="stretch">
                <IressCol span={{ sm: 6 }} data-testid="security-infra">
                  {content}
                </IressCol>
              </IressRow>
            </IressExpander>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Open: StoryObj<typeof IressExpander> = {
  args: {
    ...Default.args,
    open: true,
    mode: 'heading',
  },
};

export const Multiple: StoryObj<typeof IressExpander> = {
  argTypes: disableArgTypes([
    'open',
    'mode',
    'activator',
    'onChange',
    'children',
  ]),
  render: () => <MultipleExpander />,
  parameters: {
    ...withCustomSource(MultipleExpanderSource),
  },
};

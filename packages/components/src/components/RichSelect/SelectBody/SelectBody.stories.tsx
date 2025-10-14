import { Meta, StoryObj } from '@storybook/react-vite';
import { IressSelectBody } from './SelectBody';
import { IressSelectCreate } from '../SelectCreate/SelectCreate';
import {
  IressMenuDivider,
  IressPanel,
  IressSelectBodyProps,
  IressSelectMenu,
} from '@/main';
import { MOCK_LARGE_LABEL_VALUES_DATASET } from '../../../mocks/generateLabelValues';
import {
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
  removeArgTypes,
} from '@iress-storybook/helpers';

type Story = StoryObj<typeof IressSelectBody>;

export default {
  title: 'Components/RichSelect/Subcomponents/Body',
  component: IressSelectBody,
  argTypes: {
    ...mergeStorybookConfig(
      removeArgTypes(['style']),
      disableArgTypes(['children', 'footer', 'header']),
      addToStorybookCategory<IressSelectBodyProps>('Text props', [
        'children',
        'noGutter',
      ]),
    ),
  },
} as Meta<typeof IressSelectBody>;

export const Body: Story = {
  args: {
    children: (
      <IressSelectMenu
        aria-label="Available options"
        fluid
        items={MOCK_LARGE_LABEL_VALUES_DATASET}
      />
    ),
    header: (
      <>
        <IressSelectCreate heading="Add custom option" />
        <IressMenuDivider />
      </>
    ),
    footer: <IressPanel>This will always be fixed to the bottom</IressPanel>,
    style: {
      border: '1px solid var(--iress-g-border-color)',
    },
  },
};

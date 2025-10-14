import { Meta, StoryObj } from '@storybook/react';
import { IressSelectSearch } from './SelectSearch';
import { IressSelectCreate } from '../SelectCreate/SelectCreate';
import {
  IressMenuDivider,
  IressPanel,
  IressSelectBody,
  IressSelectMenu,
  IressSelectSearchInput,
  IressSelectSearchProps,
} from '@/main';
import { MOCK_LARGE_LABEL_VALUES_DATASET } from '../../../mocks/generateLabelValues';
import {
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
  removeArgTypes,
} from '@iress-storybook/helpers';

type Story = StoryObj<typeof IressSelectSearch>;

export default {
  title: 'Components/RichSelect/Subcomponents/Search',
  component: IressSelectSearch,
  argTypes: {
    ...mergeStorybookConfig(
      removeArgTypes(['style']),
      disableArgTypes(['activator', 'children']),
      addToStorybookCategory<IressSelectSearchProps>('InputPopover props', [
        'activator',
        'align',
        'autoHighlight',
        'children',
        'container',
        'contentClassName',
        'defaultShow',
        'minLength',
        'onActivated',
        'onDeactivated',
        'onNavigate',
        'type',
      ]),
    ),
  },
} as Meta<typeof IressSelectSearch>;

export const Search: Story = {
  args: {
    activator: <IressSelectSearchInput placeholder="Search and select" />,
    autoHighlight: false,
    children: (
      <IressSelectBody
        header={
          <>
            <IressSelectCreate heading="Add custom option" />
            <IressMenuDivider gutter="none" />
          </>
        }
        footer={
          <IressPanel>This will always be fixed to the bottom</IressPanel>
        }
      >
        <IressSelectMenu fluid items={MOCK_LARGE_LABEL_VALUES_DATASET} />
      </IressSelectBody>
    ),
    style: {
      maxHeight: 400,
      border: '1px solid var(--iress-g-border-color)',
    },
  },
};

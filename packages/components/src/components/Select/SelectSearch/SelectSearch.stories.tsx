import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSelectSearch } from './SelectSearch';
import { IressSelectCreate } from '../SelectCreate/SelectCreate';
import {
  IressMenuDivider,
  IressPanel,
  IressSelectBody,
  IressSelectMenu,
  IressSelectSearchInput,
  type IressSelectSearchProps,
} from '@/main';
import { MOCK_LARGE_LABEL_VALUES_DATASET } from '../../../mocks/generateLabelValues';
import type { TestComponentMeta } from '@iress-oss/ids-storybook-config';
import {
  addToStorybookCategory,
  disableArgTypes,
  mergeStorybookConfig,
  removeArgTypes,
  reactElementArgType,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import { cssVars } from '@iress-oss/ids-tokens';

type Story = StoryObj<typeof IressSelectSearch>;

const testMeta: TestComponentMeta[] = [
  {
    part: 'main',
    description: 'The root element of the select search',
    testId: 'select-search',
  },
];

export default {
  title: 'Components/Select/Subcomponents/Search',
  component: IressSelectSearch,
  argTypes: {
    activator: reactElementArgType,
    children: reactNodeArgType,
    ...stylingProps,
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
  parameters: {
    idsConfig: { testMeta },
  },
} as Meta<typeof IressSelectSearch>;

export const Search: Story = {
  args: {
    activator: (
      <IressSelectSearchInput
        aria-label="Search and select items"
        placeholder="Search and select"
      />
    ),
    autoHighlight: false,
    children: (
      <IressSelectBody
        header={
          <>
            <IressSelectCreate heading="Add custom option" />
            <IressMenuDivider />
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
      border: `1px solid ${cssVars.colour.neutral[30]}`,
    },
  },
};

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTag } from '.';
import { IressPopover } from '../Popover';
import { IressButton } from '../Button';
import { IressIcon } from '../Icon';
import {
  componentStoryMeta,
  withSource,
  withJsxTransformer,
  reactNodeArgType,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

import { TagMode } from './mocks/TagMode';
import TagModeSource from './mocks/TagMode.tsx?raw';
import { TagStatus } from './mocks/TagStatus';
import TagStatusSource from './mocks/TagStatus.tsx?raw';
import { TagBordered } from './mocks/TagBordered';
import TagBorderedSource from './mocks/TagBordered.tsx?raw';
import { TagDeletion } from './mocks/TagDeletion';
import TagDeletionSource from './mocks/TagDeletion.tsx?raw';

type Story = StoryObj<typeof IressTag>;

export default {
  title: 'Components/Tag',
  component: IressTag,
  ...componentStoryMeta(componentMeta, {
    argTypes: {
      children: reactNodeArgType,
      deleteButton: reactNodeArgType,
    },
  }),
} as Meta<typeof IressTag>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const Mode: Story = {
  render: (args) => <TagMode {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TagModeSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Status: Story = {
  render: (args) => <TagStatus {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TagStatusSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Bordered: Story = {
  render: (args) => <TagBordered {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TagBorderedSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const ClickableTag: Story = {
  args: {
    children: 'Tag',
    bordered: true,
    onClick: () => {
      console.log('Tag clicked');
    },
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const LinkTag: Story = {
  args: {
    children: 'Link Tag',
    element: 'a',
    href: '#',
  },
};

export const Compact: Story = {
  args: {
    children: 'Label',
    compact: true,
    onDelete: () => {
      console.log('Tag deleted');
    },
  },
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};

export const DeletingTags: Story = {
  render: (args) => <TagDeletion {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(TagDeletionSource, { stripImports: true }),
  },
};

export const CustomButton: Story = {
  args: {
    children: 'Label',
    deleteButton: (
      <IressPopover
        activator={
          <IressButton mode="muted">
            <IressIcon name="chevron-circle-down" screenreaderText="Actions" />
          </IressButton>
        }
        align="bottom-start"
      >
        Some actions go in here
      </IressPopover>
    ),
  },
};

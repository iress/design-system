import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressTable, Z_INDEX } from '@/main';

type Story = StoryObj<typeof IressTable>;

const zIndexUsage: Record<keyof typeof Z_INDEX, string> = {
  DEFAULT:
    'The default z-index used for most elements. Can be combined with raised and floating elevations.',
  NAVBAR: 'Used for navbars. Can be combined with overflow elevation.',
  POPOVER: 'Used for IressPopover. Can be combined with floating elevation.',
  SLIDEOUT: 'Used for IressSlideout. Can be combined with floating elevation.',
  MODAL: 'Used for IressModal. Can be combined with floating elevation.',
  TOAST: 'Used for IressToast. Can be combined with floating elevation.',
  TOOLTIP: 'Used for IressTooltip. Can be combined with floating elevation.',
};

export default {
  title: 'Foundations/Z-index (stacking)',
  component: IressTable,
  parameters: {
    controls: {
      disable: true,
    },
  },
} as Meta<typeof IressTable>;

export const Reference: Story = {
  args: {
    columns: [
      { label: 'Name', key: 'name', width: '1%', sort: 'asc' },
      { label: 'Usage', key: 'usage' },
      { label: 'Value', key: 'value', width: '200px' },
    ],
    rows: Object.entries(Z_INDEX)
      .filter(([name]) => name !== 'displayName' && name !== '__docgenInfo')
      .map(([name, value]) => ({
        name,
        usage: zIndexUsage[name as keyof typeof Z_INDEX],
        value,
      })),
  },
};

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressButton, IressPanel } from '@/main';
import { DiffViewer } from '@iress-oss/ids-storybook-config';

type Story = StoryObj<typeof IressPanel>;

export default {
  title: 'Styling props/Spacing',
  component: IressPanel,
} as Meta<typeof IressPanel>;

export const padding: Story = {
  args: {
    bg: 'alt',
    children: 'A panel that has extra large padding on all sides.',
    p: 'xl',
  },
  parameters: {
    controls: {
      include: [
        'p',
        'px',
        'py',
        'pt',
        'pl',
        'pr',
        'pb',
        'm',
        'mx',
        'my',
        'mt',
        'ml',
        'mr',
        'mb',
      ],
    },
  },
};

export const button: Story = {
  ...padding,
  args: {
    px: 'xl',
  },
  parameters: {
    controls: {
      include: ['px'],
    },
  },
  render: ({ px }) => (
    <IressButton px={px} mode="primary">
      Submit
    </IressButton>
  ),
};

export const variablePadding: Story = {
  ...padding,
  args: {
    bg: 'alt',
    children: 'A panel that has different padding on each side.',
    pb: 'xl',
    pt: 'spacing.1',
    pl: 'md',
    pr: 'spacing.6',
  },
};

export const responsivePadding: Story = {
  ...padding,
  args: {
    bg: 'alt',
    children:
      'A panel that has extra large padding on small screens and no padding on large screens.',
    p: { base: 'xl', lg: 'none' },
  },
};

export const MigratingPadding: Story = {
  render: () => (
    <DiffViewer
      oldValue={`<IressPanel p={{ t: 'xl', b: 'xl' }} />`}
      newValue={`<IressPanel pt="xl" pb="xl"  />`}
    />
  ),
};

export const responsiveVariablePadding: Story = {
  ...padding,
  args: {
    bg: 'alt',
    children:
      'A panel that has responsive padding on the vertical and horizontal axes.',
    px: { base: 'none', lg: 'xl' },
    py: { base: 'xl', lg: 'none' },
  },
};

export const margin: Story = {
  ...padding,
  args: {
    bg: 'alt',
    children: 'A panel that has the same margin on all sides.',
    m: 'xl',
  },
};

export const variableMargin: Story = {
  ...padding,
  args: {
    bg: 'alt',
    children: 'A panel that has different margin on each side.',
    mb: 'xl',
    mt: 'spacing.1',
    ml: 'md',
    mr: 'spacing.6',
  },
};

export const responsiveMargin: Story = {
  ...padding,
  args: {
    bg: 'alt',
    children:
      'A panel that has extra large margin on small screens and no margin on large screens.',
    m: { base: 'xl', lg: 'none' },
  },
};

export const responsiveVariableMargin: Story = {
  ...padding,
  args: {
    bg: 'alt',
    children:
      'A panel that has responsive margin on the vertical and horizontal axes.',
    mx: { base: 'none', lg: 'xl' },
    my: { base: 'xl', lg: 'none' },
  },
};

export const negativeMargin: Story = {
  ...padding,
  args: {
    bg: 'alt',
    children:
      'A panel that has negative margin and escapes its parent container',
    mx: '-xl',
  },
  render: (args) => (
    <IressPanel layerStyle="elevation.raised" maxWidth="container.sm" mx="auto">
      <IressPanel {...args} />
    </IressPanel>
  ),
};

export const noGutter: Story = {
  ...padding,
  args: {
    bg: 'alt',
    noGutter: true,
  },
  render: ({ children, ...args }) => (
    <IressPanel {...args}>
      {children ?? (
        <ul>
          <li>
            {args.noGutter ? (
              <>
                Margin is removed due to <code>noGutter</code>
              </>
            ) : (
              'Since lists have bottom margin, you can see there is extra white-space.'
            )}
          </li>
        </ul>
      )}
    </IressPanel>
  ),
};

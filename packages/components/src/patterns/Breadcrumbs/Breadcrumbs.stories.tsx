import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressBreadcrumbs, IressStack, IressText } from '@/main';
import { disableArgTypes } from '@iress-oss/ids-storybook-config';
import { IressPanel } from '@/main';

type Story = StoryObj<typeof IressBreadcrumbs>;

export default {
  title: 'Patterns/Breadcrumbs',
  component: IressBreadcrumbs,
  tags: ['beta'],
  args: {
    overflowProps: {
      container: document.body,
    },
  },
  argTypes: {
    ...disableArgTypes(['items']),
  },
} as Meta<typeof IressBreadcrumbs>;

export const Default: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Current Page' }],
  },
};

export const AllConfigurations: Story = {
  argTypes: {
    ...disableArgTypes(['items']),
  },
  render: (args) => (
    <IressPanel>
      <IressStack gap="xl">
        <IressStack>
          <IressText element="h3">2 Breadcrumbs</IressText>
          <IressBreadcrumbs
            {...args}
            items={[{ label: 'Home', href: '/' }, { label: 'Current' }]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">3 Breadcrumbs</IressText>
          <IressBreadcrumbs
            {...args}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Details' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">4 Breadcrumbs</IressText>
          <IressBreadcrumbs
            {...args}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Category', href: '/category' },
              { label: 'Subcategory', href: '/subcategory' },
              { label: 'Details' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">
            5+ Breadcrumbs (with default overflow)
          </IressText>
          <IressBreadcrumbs
            {...args}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Level 1', href: '/l1' },
              { label: 'Level 2', href: '/l2' },
              { label: 'Level 3', href: '/l3' },
              { label: 'Level 4', href: '/l4' },
              { label: 'Current' },
            ]}
          />
        </IressStack>

        <IressStack>
          <IressText element="h3">
            5+ Breadcrumbs (with overflow disabled)
          </IressText>
          <IressBreadcrumbs
            {...args}
            items={[
              { label: 'Home', href: '/' },
              { label: 'Level 1', href: '/l1' },
              { label: 'Level 2', href: '/l2' },
              { label: 'Level 3', href: '/l3' },
              { label: 'Level 4', href: '/l4' },
              { label: 'Current' },
            ]}
            limit={0}
          />
        </IressStack>
      </IressStack>
    </IressPanel>
  ),
};

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressModal, type IressModalProps, IressModalProvider } from '.';
import { IressButton } from '../Button';
import { ModalUsingState } from './mocks/ModalUsingState';
import ModalUsingStateSource from './mocks/ModalUsingState.tsx?raw';
import {
  IressStack,
  IressText,
  IressTabSet,
  IressTab,
  IressInline,
  IressTag,
  IressPlaceholder,
  IressStyled,
} from '../../main';
import { ModalSizes } from './mocks/ModalSizes';
import ModalSizesSource from './mocks/ModalSizes.tsx?raw';
import { ModalStatuses } from './mocks/ModalStatuses';
import ModalStatusesSource from './mocks/ModalStatuses.tsx?raw';
import { ModalWithButton } from './mocks/ModalWithButton';
import ModalWithButtonSource from './mocks/ModalWithButton.tsx?raw';
import { ModalFixedFooter } from './mocks/ModalFixedFooter';
import ModalFixedFooterSource from './mocks/ModalFixedFooter.tsx?raw';
import { ModalResponsiveSize } from './mocks/ModalResponsiveSize';
import ModalResponsiveSizeSource from './mocks/ModalResponsiveSize.tsx?raw';
import { ModalDisableClosing } from './mocks/ModalDisableClosing';
import ModalDisableClosingSource from './mocks/ModalDisableClosing.tsx?raw';
import {
  disableArgTypes,
  withSource,
  reactNodeArgType,
  stylingProps,
  withBreakpointLabel,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

const MODAL_ID = 'storybook-modal';

type Story = StoryObj<IressModalProps>;
type StatusStory = StoryObj<IressModalProps<'danger' | 'success' | 'warning'>>;

export default {
  title: 'Components/Modal',
  component: IressModal,
  tags: ['updated'],
  argTypes: {
    children: reactNodeArgType,
    footer: reactNodeArgType,
    heading: reactNodeArgType,
    ...stylingProps,
  },
  parameters: {
    idsConfig: {
      testMeta: componentMeta.testMeta,
    },
    docs: {
      description: {
        component: componentMeta.description,
      },
    },
  },
} as Meta<typeof IressModal>;

export const Default: Story = {
  args: {
    children: (
      <IressStack gap="sm">
        <IressText element="p">
          Optional contextual information added here, this can be introductory
          text or any other relevant copy.
        </IressText>
        <IressTabSet>
          <IressTab label="John">
            <IressStack gap="md" pt="sm">
              <IressInline
                gap="md"
                horizontalAlign="between"
                verticalAlign="middle"
              >
                <IressInline gap="md">
                  <IressTag onDelete={() => console.log('Deleting...')}>
                    Label
                  </IressTag>
                  <IressTag onDelete={() => console.log('Deleting...')}>
                    Label
                  </IressTag>
                  <IressTag onDelete={() => console.log('Deleting...')}>
                    Label
                  </IressTag>
                </IressInline>
                <IressText
                  textStyle="typography.body.sm"
                  color="colour.neutral.70"
                >
                  3/5 Widgets Selected
                </IressText>
              </IressInline>
              <IressPlaceholder heading="Slot" py="xl">
                <IressStyled maxWidth="input.16" mx="auto" textAlign="center">
                  Swap slot through instance swap, to change into input field of
                  choice.
                </IressStyled>
              </IressPlaceholder>
            </IressStack>
          </IressTab>
          <IressTab label="John" />
          <IressTab label="John" />
        </IressTabSet>
      </IressStack>
    ),
    footer: (
      <IressInline gap="md" horizontalAlign="right">
        <IressButton>Button</IressButton>
        <IressButton mode="primary">Button</IressButton>
      </IressInline>
    ),
    heading: 'Modal Header',
    id: MODAL_ID,
  },
  argTypes: {
    ...disableArgTypes(['show']),
  },
  decorators: [
    (Story) => (
      <IressModalProvider>
        <Story />
      </IressModalProvider>
    ),
  ],
  render: (args) => <ModalWithButton {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalWithButtonSource, {
      stripImports: true,
    }),
  },
};

export const DefaultShow: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'Modal content',
    footer: 'Footer slot',
    id: MODAL_ID,
    defaultShow: true,
  },
};

export const ShowWithState: Story = {
  render: (args) => <ModalUsingState {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalUsingStateSource, {
      stripImports: true,
    }),
  },
};

export const Heading: Story = {
  ...Default,
  args: {
    ...Default.args,
    heading: 'Modal heading',
  },
  argTypes: {
    ...disableArgTypes(['show', 'heading']),
  },
};

export const FooterSlot: Story = {
  ...Default,
  args: {
    children: 'Normal modal content',
    footer: <IressButton>Button in footer</IressButton>,
    heading: 'Modal Header',
    id: MODAL_ID,
  },
  argTypes: {
    ...disableArgTypes(['show', 'footer']),
  },
  render: (args) => <ModalWithButton {...args} />,
};

export const FixedFooter: Story = {
  ...Default,
  render: (args) => <ModalFixedFooter {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalFixedFooterSource, { stripImports: true }),
  },
};

export const Size: Story = {
  ...Default,
  args: {
    footer: 'Size modal footer',
  },
  argTypes: {
    ...disableArgTypes(['children', 'show', 'size', 'id']),
  },
  render: (args) => <ModalSizes {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalSizesSource, {
      stripImports: true,
    }),
  },
};

export const ResponsiveSize: Story = {
  ...Default,
  render: (args) => <ModalResponsiveSize {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalResponsiveSizeSource, { stripImports: true }),
  },
  decorators: [withBreakpointLabel()],
};

export const DisableClosing: Story = {
  ...Default,
  render: (args) => <ModalDisableClosing {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalDisableClosingSource, { stripImports: true }),
  },
};

export const Status: StatusStory = {
  render: (args) => <ModalStatuses {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalStatusesSource, {
      stripImports: true,
    }),
  },
};

export const Static: Story = {
  args: {
    children: 'Modal content',
    footer: 'Footer slot',
    show: true,
    static: true,
  },
};

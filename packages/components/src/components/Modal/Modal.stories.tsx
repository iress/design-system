import {
  type Meta,
  type ReactRenderer,
  type StoryObj,
} from '@storybook/react-vite';
import { type ArgsStoryFn } from 'storybook/internal/types';
import {
  IressModal,
  type IressModalProps,
  IressModalProvider,
  type ModalStatus,
} from '.';
import { IressButton } from '../Button';
import { useModal } from './hooks/useModal';
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
import {
  CurrentBreakpoint,
  DiffViewer,
  disableArgTypes,
  withSource,
  withJsxTransformer,
  withTransformedProviderSource,
  reactNodeArgType,
  stylingProps,
} from '@iress-oss/ids-storybook-config';
import componentMeta from './meta';

const MODAL_ID = 'storybook-modal';

const renderWithButtonFn = <TStatus extends ModalStatus>(
  buttonTitle = 'Show modal',
): ArgsStoryFn<ReactRenderer, IressModalProps<TStatus>> => {
  return (args) => {
    const { showModal } = useModal();

    return (
      <>
        <IressButton onClick={() => showModal(MODAL_ID)}>
          {buttonTitle}
        </IressButton>
        <IressModal {...args} show={false} />
      </>
    );
  };
};

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
  render: renderWithButtonFn(),
  parameters: {
    ...withTransformedProviderSource(
      `<IressModalProvider>
        <Story />
      </IressModalProvider>`,
      `const { showModal } = useModal();

const MODAL_ID = '${MODAL_ID}';

return (
  <Story />
);`,
    ),
    ...withJsxTransformer({
      showFunctions: true,
      useFragmentShortSyntax: true,
    }),
  },
};

export const DefaultShow: Story = {
  args: {
    children: 'Modal content',
    footer: 'Footer slot',
    id: MODAL_ID,
    defaultShow: true,
  },
};

export const ShowWithState: Story = {
  args: {
    children: 'This modal was opened via state',
  },
  argTypes: {
    ...disableArgTypes(['footer', 'show']),
  },
  render: (args) => <ModalUsingState {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalUsingStateSource, { stripImports: true, stripExportFunction: true }),
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
  render: renderWithButtonFn('Footer slot modal'),
};

export const FixedFooter: Story = {
  ...Default,
  args: {
    heading: 'Modal Header',
    id: MODAL_ID,
    children: (
      <>
        <IressText element="h2">
          Next Saturday night, we&apos;re sending you back to the future
        </IressText>
        <IressText>
          <p>
            I still don&apos;t understand, how am I supposed to go to the dance
            with her, if she&apos;s already going to the dance with you.
          </p>
          <p>
            Go. Yeah, it&apos;s in the back. The future, it&apos;s where
            you&apos;re going?
          </p>
        </IressText>
      </>
    ),
    footer: <IressButton>Button in footer</IressButton>,
    fixedFooter: true,
  },
  argTypes: {
    ...disableArgTypes(['show', 'footer', 'children']),
  },
  render: renderWithButtonFn('Fixed footer modal'),
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
    ...withSource(ModalSizesSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const ResponsiveSize: Story = {
  ...Default,
  args: {
    children: <CurrentBreakpoint />,
    footer: '',
    id: MODAL_ID,
    width: {
      xs: 'overlay.sm',
      md: 'overlay.md',
      xxl: 'overlay.lg',
    },
  },
  argTypes: {
    ...disableArgTypes(['show', 'children']),
  },
  render: renderWithButtonFn('Responsive modal'),
};

export const DisableClosing: Story = {
  ...Default,
  argTypes: {
    ...disableArgTypes(['disableBackdropClick', 'noCloseButton', 'show', 'id']),
  },
  render: (args) => {
    const { showModal } = useModal();

    const noCloseButtonModal = (
      <IressModal
        {...args}
        id="no-close-button"
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('no-close-button', false)}>
            Close
          </IressButton>
        }
      />
    );

    const bothModal = (
      <IressModal
        {...args}
        id="both"
        disableBackdropClick
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('both', false)}>
            Close
          </IressButton>
        }
      />
    );

    return (
      <IressStack gap="md">
        <IressButton onClick={() => showModal('disable-backdrop-click')} fluid>
          Disable backdrop click
        </IressButton>
        <IressModal
          {...args}
          id="disable-backdrop-click"
          disableBackdropClick
        />

        <IressButton onClick={() => showModal('no-close-button')} fluid>
          No close button
        </IressButton>
        {noCloseButtonModal}

        <IressButton onClick={() => showModal('both')} fluid>
          Both
        </IressButton>
        {bothModal}
      </IressStack>
    );
  },
};

export const Status: StatusStory = {
  args: {
    children: (
      <IressText element="p">
        Optional contextual information added here, this can be introductory
        text or any other relevant copy.
      </IressText>
    ),
    actions: [{ children: 'Button', mode: 'tertiary' }, { children: 'Button' }],
    heading: 'Modal Header',
    status: 'danger',
  },
  argTypes: {
    ...disableArgTypes(['show', 'status', 'size', 'id']),
  },
  render: (args) => <ModalStatuses {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(ModalStatusesSource, { stripImports: true, stripExportFunction: true }),
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

export const V5ModalDiff: Story = {
  render: () => (
    <DiffViewer
      allowModeChange
      oldValue={`import { render, waitFor, screen } from '@testing-library/react';
import { idsFireEvent, componentLoad } from '@iress/ids-react-test-utils';
  
test('opening and closing a modal', async () => {
  await componentLoad(['modal-trigger', 'modal']);
  const trigger = screen.getByTestId('modal-trigger');
  const modal = screen.getByTestId('modal');
  idsFireEvent.click(trigger);
  await waitFor(() => expect(modal).toBeVisible());
  const closeButton = screen.getByTestId('modal__close-button');
  idsFireEvent.click(closeButton);
  await waitFor(() => expect(modal).not.toBeVisible());
});`}
      newValue={`import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

test('opening and closing a modal', async () => {
  const trigger = screen.getByRole('button', { name: /open modal/i });
  await userEvent.click(trigger);
  const modal = await screen.findByRole('dialog');
  const closeButton = screen.getByRole('button', { name: /close/i });
  await userEvent.click(closeButton);
  await waitForElementToBeRemoved(modal);
});`}
    />
  ),
};

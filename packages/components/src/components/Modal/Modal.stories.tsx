import {
  type Meta,
  type ReactRenderer,
  type StoryObj,
} from '@storybook/react-vite';
import { type ArgsStoryFn } from 'storybook/internal/types';
import { IressModal, type IressModalProps, IressModalProvider } from '.';
import { IressButton } from '../Button';
import { useModal } from './hooks/useModal';
import {
  disableArgTypes,
  withCustomSource,
  withJsxTransformer,
  withTransformedProviderSource,
  withTransformedRawSource,
} from '@iress-storybook/helpers';
import { ModalUsingState } from './mocks/ModalUsingState';
import ModalUsingStateSource from './mocks/ModalUsingState.tsx?raw';
import { IressStack, IressText } from '../../main';
import { CurrentBreakpoint } from '@iress-storybook/components';
import { ModalSizes } from './mocks/ModalSizes';
import ModalSizesSource from './mocks/ModalSizes.tsx?raw';

const MODAL_ID = 'storybook-modal';

const renderWithButtonFn = (
  buttonTitle = 'Show modal',
): ArgsStoryFn<ReactRenderer, IressModalProps> => {
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

type Story = StoryObj<typeof IressModal>;

export default {
  title: 'Components/Modal',
  component: IressModal,
  tags: ['updated'],
} as Meta<typeof IressModal>;

export const Default: Story = {
  args: {
    children: 'Modal content',
    footer: 'Footer slot',
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
    ...withTransformedRawSource(ModalUsingStateSource, 'IressModalProps'),
  },
};

export const FooterSlot: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: 'Normal modal content',
    footer: <IressButton>Button in footer</IressButton>,
  },
  argTypes: {
    ...disableArgTypes(['show', 'footer']),
  },
  render: renderWithButtonFn('Footer slot modal'),
};

export const FixedFooter: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <>
        <IressText element="h2">
          Next Saturday night, we&apos;re sending you back to the future
        </IressText>
        <IressText>
          <p>
            I still don&apos;t understand, how am I supposed to go to the dance
            with her, if she&apos;s already going to the dance with you.
            Alright, okay Jennifer. What if I send in the tape and they
            don&apos;t like it. I mean, what if they say I&apos;m no good. What
            if they say, &apos;Get out of here, kid, you got no future.&apos; I
            mean, I just don&apos;t think I can take that kind of rejection.
            Jesus, I&apos;m beginning to sound like my old man. Ahh. Alright,
            take it up, go. Doc. This is it. This is the answer. It says here
            that a bolt of lightning is gonna strike the clock tower precisely
            at 10:04 p.m. next Saturday night. If we could somehow harness this
            bolt of lightning, channel it into the flux capacitor, it just might
            work. Next Saturday night, we&apos;re sending you back to the
            future.
          </p>
          <p>
            Go. Yeah, it&apos;s in the back. The future, it&apos;s where
            you&apos;re going? Mother, with Marty&apos;s parents out of town,
            don&apos;t you think he oughta spend the night, after all, Dad
            almost killed him with the car. What&apos;s going on? Where have you
            been all week?
          </p>
          <p>
            But I can&apos;t go to the dance, I&apos;ll miss my favorite
            television program, Science Fiction Theater. Well uh, good, fine.
            Ahh. Ahh. Right, okay, so right around 9:00 she&apos;s gonna get
            very angry with me. That&apos;s right.
          </p>
          <h3>I just don&apos;t think I can take that kind of rejection</h3>
          <p>
            I still don&apos;t understand, how am I supposed to go to the dance
            with her, if she&apos;s already going to the dance with you.
            Alright, okay Jennifer. What if I send in the tape and they
            don&apos;t like it. I mean, what if they say I&apos;m no good. What
            if they say, &apos;Get out of here, kid, you got no future.&apos; I
            mean, I just don&apos;t think I can take that kind of rejection.
            Jesus, I&apos;m beginning to sound like my old man. Ahh. Alright,
            take it up, go. Doc. This is it. This is the answer. It says here
            that a bolt of lightning is gonna strike the clock tower precisely
            at 10:04 p.m. next Saturday night. If we could somehow harness this
            bolt of lightning, channel it into the flux capacitor, it just might
            work. Next Saturday night, we&apos;re sending you back to the
            future.
          </p>
          <p>
            Go. Yeah, it&apos;s in the back. The future, it&apos;s where
            you&apos;re going? Mother, with Marty&apos;s parents out of town,
            don&apos;t you think he oughta spend the night, after all, Dad
            almost killed him with the car. What&apos;s going on? Where have you
            been all week?
          </p>
          <p>
            But I can&apos;t go to the dance, I&apos;ll miss my favorite
            television program, Science Fiction Theater. Well uh, good, fine.
            Ahh. Ahh. Right, okay, so right around 9:00 she&apos;s gonna get
            very angry with me. That&apos;s right.
          </p>
          <p>
            I still don&apos;t understand, how am I supposed to go to the dance
            with her, if she&apos;s already going to the dance with you.
            Alright, okay Jennifer. What if I send in the tape and they
            don&apos;t like it. I mean, what if they say I&apos;m no good. What
            if they say, &apos;Get out of here, kid, you got no future.&apos; I
            mean, I just don&apos;t think I can take that kind of rejection.
            Jesus, I&apos;m beginning to sound like my old man. Ahh. Alright,
            take it up, go. Doc. This is it. This is the answer. It says here
            that a bolt of lightning is gonna strike the clock tower precisely
            at 10:04 p.m. next Saturday night. If we could somehow harness this
            bolt of lightning, channel it into the flux capacitor, it just might
            work. Next Saturday night, we&apos;re sending you back to the
            future.
          </p>
          <p>
            Go. Yeah, it&apos;s in the back. The future, it&apos;s where
            you&apos;re going? Mother, with Marty&apos;s parents out of town,
            don&apos;t you think he oughta spend the night, after all, Dad
            almost killed him with the car. What&apos;s going on? Where have you
            been all week?
          </p>
          <p>
            But I can&apos;t go to the dance, I&apos;ll miss my favorite
            television program, Science Fiction Theater. Well uh, good, fine.
            Ahh. Ahh. Right, okay, so right around 9:00 she&apos;s gonna get
            very angry with me. That&apos;s right.
          </p>
          <p>
            I still don&apos;t understand, how am I supposed to go to the dance
            with her, if she&apos;s already going to the dance with you.
            Alright, okay Jennifer. What if I send in the tape and they
            don&apos;t like it. I mean, what if they say I&apos;m no good. What
            if they say, &apos;Get out of here, kid, you got no future.&apos; I
            mean, I just don&apos;t think I can take that kind of rejection.
            Jesus, I&apos;m beginning to sound like my old man. Ahh. Alright,
            take it up, go. Doc. This is it. This is the answer. It says here
            that a bolt of lightning is gonna strike the clock tower precisely
            at 10:04 p.m. next Saturday night. If we could somehow harness this
            bolt of lightning, channel it into the flux capacitor, it just might
            work. Next Saturday night, we&apos;re sending you back to the
            future.
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
    ...withCustomSource(ModalSizesSource),
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
          No close button (please provide one, if you decide to hide the close
          button)
        </IressButton>
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

        <IressButton onClick={() => showModal('both')} fluid>
          Both (If you hide the close button, ensure you provide another way to
          close the modal)
        </IressButton>
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
      </IressStack>
    );
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

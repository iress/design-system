import {
  IressIcon,
  IressPopover,
  IressButton,
  IressPanel,
  IressText,
  IressInline,
  IressBadge,
} from '@/main';

export const supportedCardSlots = {
  prepend: <IressIcon name="star" />,
  media: (
    <img
      src="https://www.iress.com/media/images/media-contact.width-600.png"
      width="250"
      alt="A man in an Iress branded t-shirt smiles at the camera while two female colleagues have a discussion in the foreground"
    />
  ),
  heading: <h2>Welcome to Iress!</h2>,
  topRight: (
    <IressPopover
      align="bottom-end"
      activator={
        <IressButton mode="tertiary" textStyle="typography.body.lg">
          <IressIcon name="ellipsis-v" />
        </IressButton>
      }
    >
      <IressPanel>More actions in here</IressPanel>
    </IressPopover>
  ),
  children: (
    <IressText>
      Find out all the onboarding material you need{' '}
      <a href="https://iress.com">with this easy guide</a>.
    </IressText>
  ),
  footer: (
    <IressInline gap="sm" horizontalAlign="between">
      <IressInline gap="sm">
        <IressBadge pill>#new-starter</IressBadge>
        <IressBadge pill>#first-day</IressBadge>
      </IressInline>
      <IressBadge mode="success">NEW</IressBadge>
    </IressInline>
  ),
};

export const SUPPORTED_CARD_SLOTS = Object.keys(supportedCardSlots);
export type SupportedCardSlots = keyof typeof supportedCardSlots;

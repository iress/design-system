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
  heading: <h3>Welcome to Iress!</h3>,
  topRight: (
    <IressPopover
      align="bottom-end"
      activator={
        <IressButton>
          <IressIcon name="ellipsis-v" size="lg" />
        </IressButton>
      }
    >
      <IressPanel>More actions in here</IressPanel>
    </IressPopover>
  ),
  children: (
    <IressText>
      Find out all the onboarding material you need <br />
      <a href="https://iress.com">with this easy guide</a>.
    </IressText>
  ),
  footer: (
    <IressInline gutter="sm" horizontalAlign="between">
      <IressInline gutter="sm">
        <IressBadge pill mode="background-default">
          #new-starter
        </IressBadge>
        <IressBadge pill mode="background-default">
          #first-day
        </IressBadge>
      </IressInline>
      <IressBadge mode="positive">NEW</IressBadge>
    </IressInline>
  ),
};

export const SUPPORTED_CARD_SLOTS = Object.keys(supportedCardSlots);
export type SupportedCardSlots = keyof typeof supportedCardSlots;

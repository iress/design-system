import {
  IressIcon,
  IressPopover,
  IressButton,
  IressPanel,
  IressText,
  IressInline,
  IressTag,
  IressPill,
  IressContextualMenu,
} from '@/main';

// eslint-disable-next-line react-refresh/only-export-components -- helper function, not component
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
    <IressContextualMenu>
      <IressPanel>More actions in here</IressPanel>
    </IressContextualMenu>
  ),
  children: (
    <IressText>
      Find out all the onboarding material you need{' '}
      <a href="https://iress.com">with this easy guide</a>.
    </IressText>
  ),
  footer: (
    <IressInline gap="sm" horizontalAlign="between" verticalAlign="middle">
      <IressInline gap="sm">
        <IressTag mode="30">#new-starter</IressTag>
        <IressTag mode="60">#first-day</IressTag>
      </IressInline>
      <IressPill mode="70">NEW</IressPill>
    </IressInline>
  ),
};

export const SUPPORTED_CARD_SLOTS = Object.keys(supportedCardSlots);
export type SupportedCardSlots = keyof typeof supportedCardSlots;

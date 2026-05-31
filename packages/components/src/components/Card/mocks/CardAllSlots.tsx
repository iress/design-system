import {
  IressInline,
  IressToggle,
  IressRow,
  IressCol,
  IressDivider,
  IressCard,
  IressStack,
  IressIcon,
  IressText,
  IressTag,
  IressPill,
  IressContextualMenu,
  IressPanel,
} from '@/main';
import { useState } from 'react';

const SLOT_CONTENT = {
  prepend: <IressIcon name="star" />,
  media: (
    <img
      src="https://www.iress.com/media/images/media-contact.width-600.png"
      width="250"
      alt="A man in an Iress branded t-shirt smiles at the camera"
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

const SLOT_NAMES = Object.keys(SLOT_CONTENT) as Array<keyof typeof SLOT_CONTENT>;

export function CardAllSlots() {
  const [show, setShow] = useState({
    children: true,
    prepend: false,
    media: true,
    heading: true,
    topRight: true,
    footer: true,
  });

  const cardProps = Object.fromEntries(
    SLOT_NAMES.filter((slot) => show[slot]).map((slot) => [slot, SLOT_CONTENT[slot]]),
  );

  return (
    <IressStack maxWidth="container.lg" gap="md" mx="auto">
      <IressInline gap="md">
        {SLOT_NAMES.map((slot) => (
          <IressToggle
            key={slot}
            checked={show[slot]}
            onChange={(checked) => setShow({ ...show, [slot]: checked })}
          >
            {slot}
          </IressToggle>
        ))}
      </IressInline>
      <IressDivider />
      <IressRow gutter="md">
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
        <IressCol>
          <IressCard {...cardProps} />
        </IressCol>
      </IressRow>
    </IressStack>
  );
}

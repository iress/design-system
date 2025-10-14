import {
  IressInline,
  IressToggle,
  IressRow,
  IressCol,
  type IressCardProps,
  IressDivider,
  IressCard,
  IressStack,
} from '@/main';
import { useState } from 'react';
import {
  SUPPORTED_CARD_SLOTS,
  type SupportedCardSlots,
} from './supportedCardSlots';

export const CardAllSlots = (args: IressCardProps) => {
  const [show, setShow] = useState({
    children: true,
    prepend: false,
    media: true,
    heading: true,
    topRight: true,
    footer: true,
  });

  const filteredArgs = Object.fromEntries(
    Object.entries(args).filter(
      ([key]) => show[key as SupportedCardSlots] || !(key in show),
    ),
  );

  return (
    <IressStack maxWidth="container.lg" gap="md" mx="auto">
      <IressInline gap="md">
        {SUPPORTED_CARD_SLOTS.map((slot) => (
          <IressToggle
            key={slot}
            checked={show[slot as never]}
            onChange={(checked) => {
              setShow({ ...show, [slot]: checked });
            }}
          >
            {slot}
          </IressToggle>
        ))}
      </IressInline>
      <IressDivider />
      <IressRow gutter="md">
        <IressCol>
          <IressCard {...filteredArgs} />
        </IressCol>
        <IressCol>
          <IressCard {...filteredArgs} />
        </IressCol>
        <IressCol>
          <IressCard {...filteredArgs} />
        </IressCol>
      </IressRow>
    </IressStack>
  );
};

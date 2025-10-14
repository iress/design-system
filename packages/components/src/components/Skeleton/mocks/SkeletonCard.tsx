import { useState } from 'react';
import {
  IressButton,
  IressCard,
  IressSkeleton,
  IressStack,
  IressText,
} from '@/main';

const CARD_LINE_SIZES = ['100%', '91%', '95%', '89%', '83%'];

const CardLoading = () => (
  <IressCard
    heading={<IressSkeleton textVariant="h4" width="75%" />}
    media={<IressSkeleton mode="rect" height="200" />}
    stretch
  >
    <IressStack gutter="md">
      <IressStack gutter="xs">
        {CARD_LINE_SIZES.map((size) => (
          <IressSkeleton key={`${size}-1`} width={size} />
        ))}
      </IressStack>
      <IressStack gutter="xs">
        {CARD_LINE_SIZES.map((size) => (
          <IressSkeleton key={`${size}-2`} width={size} />
        ))}
      </IressStack>
    </IressStack>
  </IressCard>
);

const CardItem = () => (
  <IressCard
    heading={<h4>This is the card heading</h4>}
    media={
      <img
        src="https://www.iress.com/media/images/media-contact.width-600.png"
        alt=""
      />
    }
  >
    <IressText element={IressText.Element.P}>
      Non cupiditate, libero ex, voluptates ea ipsum deleniti sequi sed eveniet
      ab enim sunt itaque qui ullam, adipisci quo expedita laboriosam deserunt?
    </IressText>
    <IressText element={IressText.Element.P}>
      Impedit, quasi voluptas quae quibusdam officiis corporis. Distinctio et
      aspernatur quo atque non enim, recusandae at, eum dicta ullam commodi modi
      debitis.
    </IressText>
  </IressCard>
);

export const SkeletonCard = () => {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gutter="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <CardLoading />}
      {!loading && <CardItem />}
    </IressStack>
  );
};

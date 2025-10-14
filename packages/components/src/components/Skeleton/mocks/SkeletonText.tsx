import { useState } from 'react';
import {
  IressButton,
  IressSkeleton,
  IressSkeletonProps,
  IressStack,
  IressText,
  TEXT_VARIANTS,
} from '@/main';

export const SkeletonText = (args: IressSkeletonProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gutter={IressStack.Gutter.Md}>
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      <IressStack gutter={IressStack.Gutter.Xs}>
        {TEXT_VARIANTS.map((textVariant) => [
          loading && <IressSkeleton {...args} textVariant={textVariant} />,
          !loading && (
            <IressText variant={textVariant}>{textVariant}</IressText>
          ),
        ])}
      </IressStack>
    </IressStack>
  );
};

import { useState } from 'react';
import {
  IressButton,
  IressSkeleton,
  IressSkeletonProps,
  IressStack,
  IressText,
} from '@/main';
import { TEXT_STYLES } from '@theme-preset/tokens/textStyles';

export const SkeletonText = (args: IressSkeletonProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      <IressStack gap="md">
        {TEXT_STYLES.map((textStyle) => [
          loading && <IressSkeleton {...args} textStyle={textStyle} />,
          !loading && <IressText textStyle={textStyle}>{textStyle}</IressText>,
        ])}
      </IressStack>
    </IressStack>
  );
};

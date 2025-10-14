import { useState } from 'react';
import {
  IressButton,
  IressPlaceholder,
  IressSkeleton,
  IressSkeletonProps,
  IressStack,
} from '@/main';

export const SkeletonCircle = (args: IressSkeletonProps<'circle'>) => {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <IressSkeleton {...args} />}
      {!loading && (
        <IressPlaceholder {...args} style={{ borderRadius: '50%' }}>
          Image
        </IressPlaceholder>
      )}
    </IressStack>
  );
};

import { useState } from 'react';
import {
  IressButton,
  IressPlaceholder,
  IressSkeleton,
  type IressSkeletonProps,
  IressStack,
} from '@/main';

export const SkeletonRect = (args: IressSkeletonProps<'rect'>) => {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <IressSkeleton {...args} />}
      {!loading && <IressPlaceholder {...args}>Image</IressPlaceholder>}
    </IressStack>
  );
};

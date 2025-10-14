import { useState } from 'react';
import {
  IressButton,
  IressPlaceholder,
  IressSkeleton,
  IressSkeletonProps,
  IressStack,
} from '@/main';

export const SkeletonRect = (args: IressSkeletonProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gutter={IressStack.Gutter.Md}>
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <IressSkeleton {...args} />}
      {!loading && <IressPlaceholder {...args}>Image</IressPlaceholder>}
    </IressStack>
  );
};

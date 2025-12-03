import { useState } from 'react';
import {
  IressButton,
  IressPlaceholder,
  IressSkeleton,
  type IressSkeletonProps,
  IressStack,
} from '@/main';

export const SkeletonCircle = (args: IressSkeletonProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gutter={IressStack.Gutter.Md}>
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

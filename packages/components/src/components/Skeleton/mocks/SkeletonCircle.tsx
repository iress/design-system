import { useState } from 'react';
import {
  IressButton,
  IressPlaceholder,
  IressSkeleton,
  IressStack,
} from '@/main';

export function SkeletonCircle() {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <IressSkeleton mode="circle" width="150" height="150" />}
      {!loading && (
        <IressPlaceholder width="150" height="150" style={{ borderRadius: '50%' }}>
          Image
        </IressPlaceholder>
      )}
    </IressStack>
  );
}

import { useState } from 'react';
import {
  IressButton,
  IressPlaceholder,
  IressSkeleton,
  IressStack,
} from '@/main';

export function SkeletonRect() {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      {loading && <IressSkeleton mode="rect" width="250" height="150" />}
      {!loading && (
        <IressPlaceholder width="250" height="150">
          Image
        </IressPlaceholder>
      )}
    </IressStack>
  );
}

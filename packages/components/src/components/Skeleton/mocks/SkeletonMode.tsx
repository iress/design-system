import { IressSkeleton, IressStack } from '@/main';

export function SkeletonMode() {
  return (
    <IressStack gap="md">
      <IressSkeleton mode="text" />
      <IressSkeleton mode="rect" height="100px" />
      <IressSkeleton mode="circle" height="100px" width="100px" />
    </IressStack>
  );
}

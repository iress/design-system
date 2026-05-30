import { IressInline, IressSkeleton } from '@/main';

export function SkeletonSize() {
  return (
    <IressInline gap="md">
      <IressSkeleton mode="rect" width="150" height="150" />
      <IressSkeleton mode="circle" width="150" height="150" />
      <IressSkeleton mode="text" width="150" height="150" />
    </IressInline>
  );
}

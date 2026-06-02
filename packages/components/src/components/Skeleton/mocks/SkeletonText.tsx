import { useState } from 'react';
import {
  IressButton,
  IressSkeleton,
  IressStack,
  IressText,
} from '@/main';

const TEXT_STYLES = [
  'typography.heading.1',
  'typography.heading.2',
  'typography.heading.3',
  'typography.body',
  'typography.body.small',
] as const;

export function SkeletonText() {
  const [loading, setLoading] = useState(true);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setLoading(!loading)}>
        Toggle load
      </IressButton>
      <IressStack gap="md">
        {TEXT_STYLES.map((textStyle) => [
          loading && (
            <IressSkeleton
              key={`skeleton-${textStyle}`}
              mode="text"
              textStyle={textStyle}
            />
          ),
          !loading && (
            <IressText key={`text-${textStyle}`} textStyle={textStyle}>
              {textStyle}
            </IressText>
          ),
        ])}
      </IressStack>
    </IressStack>
  );
}

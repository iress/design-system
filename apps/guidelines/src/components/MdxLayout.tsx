import type { ReactNode } from 'react';
import { IressStack, IressText, IressDivider } from '@iress-oss/ids-components';

interface MdxLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function MdxLayout({ children, title, description }: MdxLayoutProps) {
  return (
    <IressStack element="article" gap="lg">
      <IressStack gap="xs">
        <IressText element="h1">{title}</IressText>
        {description && (
          <IressText element="p" color="colour.neutral.70">
            {description}
          </IressText>
        )}
      </IressStack>
      <IressDivider />
      <div>{children}</div>
    </IressStack>
  );
}

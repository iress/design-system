import { type PropsWithChildren } from 'react';
import { FloatingList } from '@floating-ui/react';
import { type FloatingPopoverHookReturn } from '../hooks/useFloatingPopover';

export const NestedPopoverActivator = ({
  children,
  parentPopover,
}: PropsWithChildren & {
  parentPopover?: FloatingPopoverHookReturn;
}) => {
  if (!parentPopover) {
    return children;
  }

  return (
    <FloatingList elementsRef={parentPopover.list}>{children}</FloatingList>
  );
};

NestedPopoverActivator.displayName = 'NestedPopoverActivator';

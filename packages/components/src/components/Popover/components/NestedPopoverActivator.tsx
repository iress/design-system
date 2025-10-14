import { PropsWithChildren } from 'react';
import { FloatingList } from '@floating-ui/react';
import { PopoverHookReturn } from '../hooks/usePopover';

export const NestedPopoverActivator = ({
  children,
  parentPopover,
}: PropsWithChildren & {
  parentPopover?: PopoverHookReturn;
}) => {
  if (!parentPopover) {
    return children;
  }

  return (
    <FloatingList elementsRef={parentPopover.list}>{children}</FloatingList>
  );
};

import { type PropsWithChildren } from 'react';
import { FloatingList } from '@floating-ui/react';
import { type PopoverContextValue } from '../Popover.types';

export const NestedPopoverActivator = ({
  children,
  parentPopover,
}: PropsWithChildren & {
  parentPopover?: PopoverContextValue;
}) => {
  if (!parentPopover) {
    return children;
  }

  return (
    <FloatingList elementsRef={parentPopover.list}>{children}</FloatingList>
  );
};

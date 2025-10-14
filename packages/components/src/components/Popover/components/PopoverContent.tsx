import classNames from 'classnames';
import styles from '../Popover.module.scss';
import { type PopoverContentProps } from '../Popover.types';
import { usePopover } from '../hooks/usePopover';
import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
} from '@floating-ui/react';
import { composePopoverFloatingProps } from '../helpers/composeFloatingProps';

const PopoverContentInner = ({
  children,
  className,
  displayMode,
  style,
  virtualFocus,
  ...restProps
}: PopoverContentProps) => {
  const popover = usePopover();

  if (!popover) return null;

  const floatingProps = composePopoverFloatingProps(
    popover,
    displayMode,
    style,
  );

  return (
    <FloatingList elementsRef={popover.list}>
      <FloatingFocusManager
        context={popover.api.context}
        initialFocus={virtualFocus ? -1 : 0}
        modal={false}
        disabled={!popover?.show}
        returnFocus={!virtualFocus}
      >
        <div
          {...restProps}
          className={classNames(className, styles.content)}
          hidden={!popover?.show}
          ref={popover?.api.refs.setFloating}
          {...floatingProps}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingList>
  );
};

const PopoverContentContainer = ({
  className,
  container,
  ...restProps
}: PopoverContentProps) => {
  const nodeId = useFloatingNodeId();

  if (container) {
    return (
      <FloatingNode id={nodeId}>
        <FloatingPortal root={container} preserveTabOrder>
          <PopoverContentInner
            {...restProps}
            className={classNames(className, styles.portal)}
          />
        </FloatingPortal>
      </FloatingNode>
    );
  }

  return (
    <FloatingNode id={nodeId}>
      <PopoverContentInner {...restProps} className={className} />
    </FloatingNode>
  );
};

export const PopoverContent = (props: PopoverContentProps) => {
  const parentId = useFloatingParentNodeId();

  // This is a root, so we wrap it with the tree
  if (parentId === null) {
    return (
      <FloatingTree>
        <PopoverContentContainer {...props} />
      </FloatingTree>
    );
  }

  return <PopoverContentContainer {...props} />;
};

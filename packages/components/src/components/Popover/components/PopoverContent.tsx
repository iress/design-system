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
import { DisplayModes, FloatingUIContainer, IressStyledProps } from '@/types';
import { useContext, useEffect } from 'react';
import { styled } from '@/styled-system/jsx';
import { PopoverContext } from '../hooks/usePopover';

export interface PopoverContentProps extends IressStyledProps {
  container?: FloatingUIContainer;
  displayMode?: DisplayModes;
  virtualFocus?: boolean;
}

const PopoverContentInner = ({
  children,
  displayMode,
  id,
  style,
  virtualFocus,
  ...restProps
}: Omit<PopoverContentProps, 'container'>) => {
  const popover = useContext(PopoverContext);

  // Fix accessibility issue with floating-ui focus guards
  // See: https://github.com/floating-ui/floating-ui/issues/2823
  useEffect(() => {
    if (popover?.show) {
      const fixFocusGuards = () => {
        const focusGuards = document.querySelectorAll(
          '[data-floating-ui-focus-guard][aria-hidden="true"]',
        );
        focusGuards.forEach((guard) => {
          if (guard instanceof HTMLElement && guard.tabIndex !== -1) {
            guard.tabIndex = -1;
          }
        });
      };

      const handleAddedNode = (node: Node) => {
        if (
          node instanceof HTMLElement &&
          node.hasAttribute('data-floating-ui-focus-guard') &&
          node.getAttribute('aria-hidden') === 'true' &&
          node.tabIndex !== -1
        ) {
          node.tabIndex = -1;
        }
      };

      // Fix focus guards immediately
      const timeoutId = setTimeout(fixFocusGuards, 0);

      // Also observe for dynamically added focus guards
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach(handleAddedNode);
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
  }, [popover?.show]);

  if (!popover) return null;

  const floatingProps = composePopoverFloatingProps(
    popover,
    displayMode,
    style,
    id,
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
        <styled.div
          {...restProps}
          hidden={!popover?.show}
          ref={popover?.api.refs.setFloating}
          {...floatingProps}
        >
          {children}
        </styled.div>
      </FloatingFocusManager>
    </FloatingList>
  );
};

const PopoverContentContainer = ({
  container,
  ...restProps
}: PopoverContentProps) => {
  const nodeId = useFloatingNodeId();

  if (container) {
    return (
      <FloatingNode id={nodeId}>
        <FloatingPortal root={container} preserveTabOrder>
          <PopoverContentInner {...restProps} />
        </FloatingPortal>
      </FloatingNode>
    );
  }

  return (
    <FloatingNode id={nodeId}>
      <PopoverContentInner {...restProps} />
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

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
import { type FloatingUIContainer, type IressStyledProps } from '@/types';
import { useEffect, useMemo, useRef } from 'react';
import { styled } from '@/styled-system/jsx';
import { usePopover } from '../hooks/usePopover';
import { usePopoverContainer } from '../hooks/usePopoverContainer';

export interface PopoverContentProps extends IressStyledProps {
  /**
   * The container element to render the popover into.
   */
  container?: FloatingUIContainer;

  /**
   * Whether the popover is displayed as an inline element or an overlay.
   */
  displayMode?: 'inline' | 'overlay';

  /**
   * Whether to use virtual focus management to prevent focus traps when using nested popovers.
   */
  virtualFocus?: boolean;
}

const PopoverContentInner = ({
  children,
  displayMode,
  id,
  observerTarget = document.body,
  style,
  virtualFocus,
  ...restProps
}: Omit<PopoverContentProps, 'container'> & {
  observerTarget?: Element;
}) => {
  const popover = usePopover();
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Fix accessibility issue with floating-ui focus guards
  // See: https://github.com/floating-ui/floating-ui/issues/2823
  useEffect(() => {
    if (popover?.show) {
      const fixFocusGuards = () => {
        const focusGuards = observerTarget.querySelectorAll(
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

      observer.observe(observerTarget, {
        childList: true,
        subtree: true,
      });

      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
  }, [popover?.show, observerTarget]);

  useEffect(() => {
    if (popover?.show && popover.api.elements.reference) {
      returnFocusRef.current = popover.getFocusableActivator() ?? null;
    }
  }, [popover?.show, popover]);

  const returnFocus = useMemo(
    () => (virtualFocus ? false : returnFocusRef),
    [virtualFocus],
  );

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
        returnFocus={returnFocus}
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

PopoverContentInner.displayName = 'PopoverContentInner';

const PopoverContentContainer = ({
  container,
  ...restProps
}: PopoverContentProps) => {
  const nodeId = useFloatingNodeId();
  const { container: providerContainer } = usePopoverContainer();
  const resolvedContainer =
    container !== undefined ? container : providerContainer;
  const observerTarget =
    resolvedContainer && 'current' in resolvedContainer
      ? (resolvedContainer.current ?? undefined)
      : (resolvedContainer ?? undefined);

  if (resolvedContainer) {
    return (
      <FloatingNode id={nodeId}>
        <FloatingPortal root={resolvedContainer} preserveTabOrder>
          <PopoverContentInner {...restProps} observerTarget={observerTarget} />
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

PopoverContentContainer.displayName = 'PopoverContentContainer';

export const PopoverContent = (props: PopoverContentProps) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <PopoverContentContainer {...props} />
      </FloatingTree>
    );
  }

  return <PopoverContentContainer {...props} />;
};

PopoverContent.displayName = 'PopoverContent';

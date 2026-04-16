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
import { FOCUSABLE_QUERY_SELECTOR } from '@/constants';

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
  hasContainer,
  id,
  style,
  virtualFocus,
  ...restProps
}: Omit<PopoverContentProps, 'container'> & { hasContainer?: boolean }) => {
  const popover = usePopover();
  const returnFocusRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (popover?.show && popover.api.elements.reference) {
      returnFocusRef.current = popover.getFocusableActivator() ?? null;
    }
  }, [popover?.show, popover]);

  // When the popup is portaled into a scrollable container and real (non-virtual)
  // focus is used, FloatingFocusManager's default `initialFocus={0}` would call
  // `focus({ preventScroll: false })` on the first tabbable element. Because the
  // popup is appended as the last DOM child of the container, the browser scrolls
  // the container to bring it into view — even if CSS transforms already position
  // it correctly. We avoid this by setting `initialFocus={-1}` and manually
  // focusing the first tabbable element with `preventScroll: true` instead.
  useEffect(() => {
    if (hasContainer && !virtualFocus && popover?.show) {
      queueMicrotask(() => {
        const floatingEl = popover.api.refs.floating.current;
        if (!floatingEl) return;
        // Fall back to the floating element itself when there are no focusable
        // children, mirroring FloatingFocusManager's own fallback behaviour.
        const firstEl =
          floatingEl.querySelector<HTMLElement>(FOCUSABLE_QUERY_SELECTOR) ??
          floatingEl;
        firstEl.focus({ preventScroll: true });
      });
    }
  }, [popover?.show]); // eslint-disable-line react-hooks/exhaustive-deps

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
        initialFocus={virtualFocus || hasContainer ? -1 : 0}
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

  if (container) {
    return (
      <FloatingNode id={nodeId}>
        <FloatingPortal root={container} preserveTabOrder>
          <PopoverContentInner {...restProps} hasContainer />
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

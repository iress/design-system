import { type IressButtonProps } from '@/main';
import styles from '../Popover.module.scss';
import { type PopoverActivatorProps, PopoverCssClass } from '../Popover.types';

import { usePopover } from '../hooks/usePopover';
import { useEffect, useMemo, useRef } from 'react';
import { focusableElements } from '@helpers/dom/focusableElements';
import { safeClosest } from '@helpers/dom/domUtils';
import { usePopoverActivatorInteractions } from '../hooks/usePopoverActivatorInteractions';
import classNames from 'classnames';

const a11yAttributes = [
  'aria-controls',
  'aria-expanded',
  'aria-haspopup',
  'data-active',
  'id',
  'role',
  'tabindex',
];

const transferPropsToA11yElement = (
  element: HTMLElement,
  a11y: HTMLElement,
) => {
  const elementWithId = element.querySelector('[id]');
  const id = elementWithId?.getAttribute('id');
  elementWithId?.removeAttribute('id');

  a11yAttributes.forEach((attribute) => {
    const value = element.getAttribute(attribute);
    element.removeAttribute(attribute);

    if (value) {
      a11y.setAttribute(attribute, value);
    }
  });

  if (id) {
    a11y.setAttribute('id', id);
  }
};

export const PopoverActivator = ({
  children,
  ...restProps
}: PopoverActivatorProps) => {
  const popover = usePopover();
  const a11yElement = useRef<HTMLElement | null>(null);

  const childrenProps = children?.props as IressButtonProps;
  const activatorInteractions = usePopoverActivatorInteractions(
    popover,
    childrenProps,
  );

  const ariaControls = useMemo(() => {
    if (!popover?.show) return undefined;

    return [
      ...popover.getAriaControls(),
      childrenProps['aria-controls'],
      popover.api.context.floatingId,
    ]
      .join(' ')
      .trim();
  }, [childrenProps, popover]);

  useEffect(() => {
    if (
      !a11yElement.current ||
      !popover?.getVirtualFocus ||
      popover.activeIndex === null
    )
      return;
    setTimeout(() =>
      popover?.api.refs.domReference.current?.removeAttribute(
        'aria-activedescendant',
      ),
    );
    a11yElement.current.setAttribute(
      'aria-activedescendant',
      popover.list.current?.[popover.activeIndex]?.id ?? '',
    );
  }, [popover]);

  return (
    <div
      {...restProps}
      className={classNames(styles.activator, {
        [PopoverCssClass.Active]: popover?.show,
      })}
      {...popover?.interactions.getReferenceProps({
        ...activatorInteractions,
        'aria-controls': ariaControls,
        role: childrenProps.role,
        ref: (element: HTMLElement) => {
          if (!element) return;

          popover?.api.refs.setReference(element);

          const a11y =
            element?.querySelector<HTMLElement>('[role=combobox]') ??
            focusableElements(element)[0];
          if (!a11y) return;

          a11yElement.current = a11y;

          transferPropsToA11yElement(element, a11y);
        },
        onBlur: (e) => {
          // Fixes the issue where the popover triggers a blur event when the focus moves from the activator to inside the popover
          if (
            e.relatedTarget instanceof Element &&
            safeClosest(e.relatedTarget, `.${styles.content}`)
          ) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        onFocus: (e) => {
          if (popover?.disabledAutoToggle) {
            return;
          }

          // Fixes the issue where the popover does not close when focus returns to the activator from inside the popover
          if (
            e.relatedTarget instanceof Element &&
            (e.relatedTarget.hasAttribute('data-floating-ui-focus-guard') ||
              safeClosest(e.relatedTarget, `.${styles.content}`)) &&
            popover.show
          ) {
            // Does not work with queueMicrotask or without timeout (it needs to happen after Floating UI does its thing)
            setTimeout(() => {
              a11yElement.current?.focus();
            });

            // Without the timeout, it makes the popover close and open again
            setTimeout(() => {
              popover.setShowWithReason(false, e.nativeEvent, 'focus');
            }, 300);
          }
        },
      })}
    >
      {children}
    </div>
  );
};

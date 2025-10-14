import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  autoPlacement,
  flip,
  shift,
  offset,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { type IressTooltipProps, type TooltipWithEnums } from './Tooltip.types';
import { FloatingUIAlign } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import styles from './Tooltip.module.scss';
import { idsLogger } from '@/helpers/utility/idsLogger';
import { focusableElements } from '@/helpers/dom/focusableElements';

export const IressTooltip: TooltipWithEnums = ({
  children,
  className,
  align = 'top',
  delay = 500,
  open = false,
  tooltipText,
  'data-testid': testid,
  ...restProps
}: IressTooltipProps) => {
  const classMap = {
    [styles.tooltip]: true,
  };
  const cssClasses = classNames(className, classMap);
  const isAuto = align === 'auto';

  const [isOpen, setIsOpen] = useState(open);
  const { refs, floatingStyles, context } = useFloating({
    placement: isAuto ? undefined : align,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5), isAuto ? autoPlacement() : flip(), shift()],
  });
  const hover = useHover(context, {
    move: false,
    delay: { open: delay, close: 500 },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  useEffect(() => {
    if (!children || !refs.reference.current) return;

    const hasFocusable =
      focusableElements(refs.reference.current as HTMLElement).length > 0;

    if (!hasFocusable) {
      idsLogger(
        `IressTooltip: The content that activates the tooltip is not focusable,
            which is a failure of WCAG Level AA Success Criterion 1.4.13 - Content on Hover or Focus.
            To fix this warning, change the activator to either IressButton, IressMenuItem or another focusable component.`,
        'warn',
      );
    }
  }, [children, refs.reference]);

  return (
    <div className={cssClasses} {...restProps} data-testid={testid}>
      <div
        className={styles.activator}
        data-testid={propagateTestid(testid, 'activator')}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children}
      </div>
      {isOpen && (
        <div
          className={styles.content}
          style={floatingStyles}
          data-testid={propagateTestid(testid, 'tooltip-text')}
          ref={refs.setFloating}
          {...getFloatingProps()}
        >
          {toArray(tooltipText).map((line, index, array) => (
            <Fragment key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

/** @deprecated IressTooltip.Align is now deprecated and will be removed in a future version. Please use the value directly. */
IressTooltip.Align = FloatingUIAlign;

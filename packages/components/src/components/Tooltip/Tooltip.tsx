import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { cx } from '@/styled-system/css';
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
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { idsLogger } from '@/helpers/utility/idsLogger';
import { focusableElements } from '@/helpers/dom/focusableElements';
import { tooltip } from './Tooltip.styles';
import { type FloatingUIAligns, type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

export interface IressTooltipRichContent {
  /** Primary name displayed in the tooltip. */
  name: string;
  /** Badge/indicator label (e.g. "New"). */
  indicator?: string;
  /** Type label (e.g. "Group"). */
  type?: string;
}

export interface IressTooltipProps extends IressStyledProps {
  /**
   * Sets the alignment of the popover relative to the activator element.
   * @default top
   */
  align?: FloatingUIAligns;

  /**
   * The element to add a tooltip to.
   */
  children: ReactNode;

  /**
   * Sets the tooltip display delay in milliseconds.
   * @default 500
   */
  delay?: number;

  /**
   * Only used for internal testing.
   * @default false
   */
  open?: boolean;

  /**
   * Sets the tooltip text. Can accept a string or an array of strings - if given an array, will output each string on a new line.
   */
  tooltipText: string | string[];

  /**
   * Visual variant of the tooltip.
   * - `rich`: Displays structured content with a prominent name and muted metadata.
   */
  variant?: 'rich';
}

export const IressTooltip = ({
  children,
  className,
  align = 'top',
  delay = 500,
  open = false,
  tooltipText,
  variant,
  'data-testid': testid,
  ...restProps
}: IressTooltipProps) => {
  const classes = tooltip({ variant });
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
    restMs: delay,
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
    <styled.div
      className={cx(classes.root, className, GlobalCSSClass.Tooltip)}
      {...restProps}
      data-testid={testid}
    >
      <div
        className={classes.activator}
        data-testid={propagateTestid(testid, 'activator')}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children}
      </div>
      {isOpen && (
        <div
          className={classes.content}
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
    </styled.div>
  );
};
IressTooltip.displayName = 'IressTooltip';

/**
 * Renders rich tooltip content with a name and optional metadata line.
 * Metadata items (indicator, type) are separated by a middle dot.
 */
export const IressTooltipRichContent = ({
  name,
  indicator,
  type,
}: IressTooltipRichContent) => {
  const classes = tooltip({ variant: 'rich' });
  const metaParts = [indicator, type].filter(Boolean);

  return (
    <>
      <span className={classes.richName}>{name}</span>
      {metaParts.length > 0 && (
        <span className={classes.richMeta}>{metaParts.join(' · ')}</span>
      )}
    </>
  );
};

import { type ForwardedRef, forwardRef } from 'react';

import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';

import { PopoverContent } from '../components/PopoverContent';
import {
  InputPopoverActivator,
  type InputPopoverActivatorProps,
} from './InputPopoverActivator';
import { type IressPopoverProps } from '../Popover';
import {
  type PopoverRef,
  usePopoverImperativeHandle,
} from '../hooks/usePopoverImperativeHandle';
import { styled } from '@/styled-system/jsx';
import { cx } from '@/styled-system/css';
import { popover } from '../Popover.styles';
import {
  FloatingPopoverContext,
  useFloatingPopover,
} from '../hooks/useFloatingPopover';

export interface IressInputPopoverProps
  extends
    Omit<
      IressPopoverProps,
      'fluid' | 'offset' | 'matchActivatorWidth' | 'virtualFocus'
    >,
    Omit<InputPopoverActivatorProps, 'children'> {
  /**
   * Content for an activator element, usually an `IressInput`.
   */
  activator: InputPopoverActivatorProps['children'];

  /**
   * If true, the first supported is automatically highlighted.
   * @default true
   */
  autoHighlight?: boolean;

  /**
   * Describes the type of content contained in the popover.
   * If `listbox`, it will add the combobox role to the popover activator.
   * @default listbox
   */
  type?: IressPopoverProps['type'];
}

const InputPopover = (
  {
    activator,
    align = 'auto',
    autoHighlight = true,
    children,
    className,
    container,
    contentClassName,
    contentStyle,
    defaultShow,
    displayMode = 'overlay',
    focusStartIndex,
    minLength,
    onActivated,
    onDeactivated,
    onNavigate,
    show,
    type = 'listbox',
    ...restProps
  }: IressInputPopoverProps,
  ref: ForwardedRef<PopoverRef>,
) => {
  const matchActivatorWidth = displayMode === 'overlay';
  const classes = popover({ hasInputActivator: true, matchActivatorWidth });
  const context = useFloatingPopover({
    align,
    autoHighlight,
    defaultShow,
    focusStartIndex,
    hasInputActivator: true,
    matchActivatorWidth,
    onActivated,
    onDeactivated,
    onNavigate,
    show,
    type,
    virtualFocus: true,
  });

  usePopoverImperativeHandle(ref, context);

  return (
    <FloatingPopoverContext.Provider value={context}>
      <styled.div
        {...restProps}
        className={cx(
          className,
          GlobalCSSClass.FormElement,
          classes.root,
          GlobalCSSClass.Popover,
          GlobalCSSClass.InputPopover,
        )}
      >
        <InputPopoverActivator
          className={cx(classes.activator, GlobalCSSClass.PopoverActivator)}
          data-testid={propagateTestid(restProps['data-testid'], 'activator')}
          minLength={minLength}
        >
          {activator}
        </InputPopoverActivator>
        <PopoverContent
          className={cx(
            contentClassName,
            contentStyle?.className,
            classes.content,
            GlobalCSSClass.PopoverContent,
          )}
          container={container}
          data-testid={propagateTestid(restProps['data-testid'], 'content')}
          displayMode={displayMode}
          virtualFocus
          {...contentStyle}
        >
          {children}
        </PopoverContent>
      </styled.div>
    </FloatingPopoverContext.Provider>
  );
};

export const IressInputPopover = forwardRef(InputPopover);

InputPopover.displayName = 'IressInputPopover';

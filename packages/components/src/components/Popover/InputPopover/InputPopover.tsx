import { type ForwardedRef, forwardRef, useContext } from 'react';

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
import { PopoverContext, usePopover } from '../hooks/usePopover';
import { cx } from '@/styled-system/css';
import { popover } from '../Popover.styles';
import { NestedPopoverActivator } from '../components/NestedPopoverActivator';

export interface IressInputPopoverProps
  extends Omit<
      IressPopoverProps,
      'fluid' | 'matchActivatorWidth' | 'virtualFocus'
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
  const context = usePopover({
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
    <PopoverContext.Provider value={context}>
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
        <NestedPopoverActivator parentPopover={useContext(PopoverContext)}>
          <InputPopoverActivator
            className={classes.activator}
            data-testid={propagateTestid(restProps['data-testid'], 'activator')}
            minLength={minLength}
          >
            {activator}
          </InputPopoverActivator>
        </NestedPopoverActivator>
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
    </PopoverContext.Provider>
  );
};

export const IressInputPopover = forwardRef(InputPopover);

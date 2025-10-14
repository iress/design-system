import { forwardRef } from 'react';
import classNames from 'classnames';

import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';

import styles from '../Popover.module.scss';
import { type IressInputPopoverProps } from './InputPopover.types';
import { type PopoverRef } from '../Popover.types';
import { InputPopoverProvider } from './InputPopoverProvider';
import { PopoverContent } from '../components/PopoverContent';
import { InputPopoverActivator } from './InputPopoverActivator';
import { composePopoverWidth } from '../helpers/composePopoverWidth';
import { NestedPopoverActivator } from '../components/NestedPopoverActivator';
import { usePopover } from '../hooks/usePopover';

const InputPopover = (
  {
    activator,
    align = 'auto',
    autoHighlight = true,
    children,
    className,
    container,
    contentClassName,
    defaultShow,
    disabledAutoToggle,
    displayMode = 'overlay',
    focusStartIndex,
    minLength,
    onActivated,
    onDeactivated,
    onNavigate,
    show,
    type = 'listbox',
    width,
    ...restProps
  }: IressInputPopoverProps,
  ref: React.ForwardedRef<PopoverRef>,
) => (
  <InputPopoverProvider
    align={align}
    autoHighlight={autoHighlight}
    defaultShow={defaultShow}
    disabledAutoToggle={disabledAutoToggle}
    matchActivatorWidth={displayMode === 'overlay'}
    onActivated={onActivated}
    onDeactivated={onDeactivated}
    onNavigate={onNavigate}
    ref={ref}
    type={type}
    show={show}
    focusStartIndex={focusStartIndex}
  >
    <div
      {...restProps}
      className={classNames(
        className,
        GlobalCSSClass.FormElement,
        styles.popover,
        styles.hasInputActivator,
      )}
    >
      <NestedPopoverActivator parentPopover={usePopover()}>
        <InputPopoverActivator
          data-testid={propagateTestid(restProps['data-testid'], 'activator')}
          disabledAutoToggle={disabledAutoToggle}
          minLength={minLength}
        >
          {activator}
        </InputPopoverActivator>
      </NestedPopoverActivator>
      <PopoverContent
        className={classNames(styles.inputActivatorPortal, contentClassName)}
        container={container}
        data-testid={propagateTestid(restProps['data-testid'], 'content')}
        displayMode={displayMode}
        style={composePopoverWidth(width)}
        virtualFocus
      >
        {children}
      </PopoverContent>
    </div>
  </InputPopoverProvider>
);

export const IressInputPopover = forwardRef(InputPopover);

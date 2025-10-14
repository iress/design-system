import { forwardRef, useRef } from 'react';
import classNames from 'classnames';

import {
  type IressPopoverProps,
  type PopoverWithEnums,
  type PopoverRef,
  PopoverType,
} from './Popover.types';
import { GlobalCSSClass } from '@/enums';
import { idsLogger } from '@helpers/utility/idsLogger';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import styles from './Popover.module.scss';
import { PopoverProvider } from './PopoverProvider';
import { FloatingUIAlign } from '@/enums';
import { PopoverActivator } from './components/PopoverActivator';
import { PopoverContent } from './components/PopoverContent';
import { composePopoverWidth } from './helpers/composePopoverWidth';
import { usePopover } from './hooks/usePopover';
import { NestedPopoverActivator } from './components/NestedPopoverActivator';

const Popover = (
  {
    activator,
    align = 'auto',
    children,
    className,
    container,
    contentClassName,
    defaultShow,
    disabledAutoToggle,
    displayMode = 'overlay',
    focusStartIndex,
    matchActivatorWidth: matchActivatorWidthProp,
    onActivated,
    onDeactivated,
    onNavigate,
    type,
    show,
    width,
    virtualFocus,
    ...restProps
  }: IressPopoverProps,
  ref: React.ForwardedRef<PopoverRef>,
) => {
  const element = useRef<HTMLDivElement>(null);
  const matchActivatorWidth =
    matchActivatorWidthProp && displayMode === 'overlay';

  if (width !== undefined) {
    idsLogger(
      `IressPopover: The width prop is deprecated. Please use the --iress-width and --iress-max-width design token instead.`,
    );
  }

  return (
    <PopoverProvider
      align={align}
      defaultShow={defaultShow}
      disabledAutoToggle={disabledAutoToggle}
      focusStartIndex={focusStartIndex}
      matchActivatorWidth={matchActivatorWidth}
      onActivated={onActivated}
      onDeactivated={onDeactivated}
      onNavigate={onNavigate}
      ref={ref}
      show={show}
      type={type}
      virtualFocus={virtualFocus}
    >
      <div
        {...restProps}
        className={classNames(
          className,
          GlobalCSSClass.FormElement,
          styles.popover,
        )}
        ref={element}
      >
        <NestedPopoverActivator parentPopover={usePopover()}>
          <PopoverActivator
            data-testid={propagateTestid(restProps['data-testid'], 'activator')}
          >
            {activator}
          </PopoverActivator>
        </NestedPopoverActivator>
        <PopoverContent
          className={contentClassName}
          container={container}
          data-testid={propagateTestid(restProps['data-testid'], 'content')}
          displayMode={displayMode}
          style={{
            ...composePopoverWidth(width, matchActivatorWidth),
            ...restProps.style,
          }}
          virtualFocus={virtualFocus}
        >
          {children}
        </PopoverContent>
      </div>
    </PopoverProvider>
  );
};

export const IressPopover = forwardRef(Popover) as PopoverWithEnums;

/** @deprecated IressPopover.Align is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressPopover.Align = FloatingUIAlign;

/** @deprecated IressPopover.Type is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressPopover.Type = PopoverType;

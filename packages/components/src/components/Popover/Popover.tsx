import {
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  useContext,
  useRef,
} from 'react';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  PopoverActivator,
  type PopoverActivatorProps,
} from './components/PopoverActivator';
import { PopoverContent } from './components/PopoverContent';
import {
  type DisplayModes,
  type FloatingUIAligns,
  type FloatingUIContainer,
  type IressStyledProps,
} from '@/types';
import { type OpenChangeReason } from '@floating-ui/react';
import { styled } from '@/styled-system/jsx';
import { cx } from '@/styled-system/css';
import {
  type PopoverRef,
  usePopoverImperativeHandle,
} from './hooks/usePopoverImperativeHandle';
import { popover } from './Popover.styles';
import { type IressCustomiseSlot } from '@/interfaces';
import {
  PopoverContext,
  type PopoverHookReturn,
  usePopover,
} from './hooks/usePopover';
import { NestedPopoverActivator } from './components/NestedPopoverActivator';

export interface IressPopoverProps extends IressStyledProps {
  /**
   * Content for an activator element, usually an `IressButton`.
   */
  activator: PopoverActivatorProps['children'];

  /**
   * Sets the alignment of the popover relative to the activator element.
   * @default auto
   */
  align?: FloatingUIAligns;

  /**
   * The content to render within the popover.
   */
  children?: ReactNode;

  /**
   * The container element to render the popover into.
   * By default, the popover will render where its parent is rendered.
   *
   * **Note:** If the `container` doesn’t exist when the popover is mounted, ensure you pass an element directly (not a ref) and specify null as the default value before it is set. This lets it wait for the root to be available. For example, if you reference the parent element of a popover.
   */
  container?: FloatingUIContainer;

  /**
   * Class name of the popover content.
   * @deprecated Use `contentStyle` instead.
   */
  contentClassName?: string;

  /**
   * This allows you to customise the content styling specifically, which is the floating element.
   * It accepts an object with any of the styling properties available on `IressCSSProps`, as well as `className` and `style`.
   */
  contentStyle?: IressCustomiseSlot;

  /**
   * When set to `true` the popover will be visible by default. Use for uncontrolled popovers.
   */
  defaultShow?: boolean;

  /**
   * Sets the display mode of popover.
   * @default overlay
   */
  displayMode?: DisplayModes;

  /**
   * Popovers can be fluid, meaning they will take up the full width of their container.
   */
  fluid?: boolean;

  /**
   * Which index to start the focus on when the popover is opened. Only works with `type` listbox and menu.
   * Note: The index must exist in the list of items, otherwise it will not work.
   * @default 0
   */
  focusStartIndex?: number;

  /**
   * Sets the popover to match the width of the activator.
   * Note: This only works when `displayMode="overlay"`.
   */
  matchActivatorWidth?: boolean;

  /**
   * Is called when popover is activated.
   */
  onActivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;

  /**
   * Is called when popover is deactivated.
   */
  onDeactivated?: (
    e?: Event,
    reason?: OpenChangeReason,
    activeIndex?: number | null,
  ) => void;

  /**
   * Is called when registered popover items are navigated using arrow keys. Only works with `type` listbox and menu.
   */
  onNavigate?: (activeIndex: number | null) => void;

  /**
   * When set to `true` the modal will be visible. Use for controlled popovers.
   */
  show?: boolean;

  /**
   * Describes the type of content contained in the popover.
   */
  type?: PopoverHookReturn['type'];

  /**
   * Whether the focus is virtual (using `aria-activedescendant`).
   * Use this if you need focus to remain on the reference element (such as an input), but allow arrow keys to navigate items.
   * Note: This is only applicable when type is set to: `listbox` or `menu`, and only works out of the box with `IressMenu` and its subcomponents.
   * @default false
   */
  virtualFocus?: boolean;
}

const Popover = (
  {
    activator,
    align = 'auto',
    children,
    className,
    container,
    contentClassName,
    contentStyle,
    defaultShow,
    displayMode = 'overlay',
    fluid,
    focusStartIndex,
    matchActivatorWidth: matchActivatorWidthProp,
    onActivated,
    onDeactivated,
    onNavigate,
    type,
    show,
    virtualFocus,
    ...restProps
  }: IressPopoverProps,
  ref: ForwardedRef<PopoverRef>,
) => {
  const element = useRef<HTMLDivElement>(null);
  const matchActivatorWidth =
    matchActivatorWidthProp && displayMode === 'overlay';
  const classes = popover({ fluid, matchActivatorWidth });

  const context = usePopover({
    align,
    defaultShow,
    focusStartIndex,
    matchActivatorWidth,
    onActivated,
    onDeactivated,
    onNavigate,
    show,
    type,
    virtualFocus,
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
        )}
        ref={element}
      >
        <NestedPopoverActivator parentPopover={useContext(PopoverContext)}>
          <PopoverActivator
            className={classes.activator}
            data-testid={propagateTestid(restProps['data-testid'], 'activator')}
          >
            {activator}
          </PopoverActivator>
        </NestedPopoverActivator>
        <PopoverContent
          {...contentStyle}
          className={cx(
            contentClassName,
            contentStyle?.className,
            GlobalCSSClass.PopoverContent,
            classes.content,
          )}
          container={container}
          data-testid={propagateTestid(restProps['data-testid'], 'content')}
          displayMode={displayMode}
          virtualFocus={virtualFocus}
        >
          {children}
        </PopoverContent>
      </styled.div>
    </PopoverContext.Provider>
  );
};

export const IressPopover = forwardRef(Popover);

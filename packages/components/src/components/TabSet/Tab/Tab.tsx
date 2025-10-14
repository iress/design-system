import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  MouseEvent,
  ReactElement,
  useContext,
} from 'react';
import { useIdIfNeeded } from '@/hooks';
import { createPortal } from 'react-dom';
import {
  FormControlValue,
  IressStyledProps,
  IressUnstyledProps,
} from '@/types';
import { styled } from '@/styled-system/jsx';
import { tab } from './Tab.styles';
import { cx } from '@/styled-system/css';
import { CompositeItem } from '@floating-ui/react';
import { focusableElements } from '@/helpers/dom/focusableElements';
import { GlobalCSSClass } from '@/enums';
import { ButtonElement } from '@/components/Button';
import { idsLogger } from '@/helpers/utility/idsLogger';
import { TabSetContext } from '../TabSetProvider';

export type IressTabProps<THref extends string | undefined = undefined> = Omit<
  IressStyledProps<ButtonElement<undefined, THref>>,
  'value'
> & {
  /**
   * Sets the active styling of the tab.
   */
  active?: boolean;

  /**
   * Text to be displayed inside the tab panel.
   */
  children?: ReactNode;

  /**
   * Contains a URL or a URL fragment that the hyperlink points to.
   * If this property is set, an anchor tag will be rendered.
   *
   * **Note:** This prop should be avoided when using `children`.
   */
  href?: THref;

  /**
   * The label of this tab.
   */
  label: ReactNode;

  /**
   * You can provide your own value to allow you to control its active state when used in `IressTabSet`.
   */
  value?: FormControlValue;
};

interface TabInsideTabSetProps extends IressUnstyledProps {
  activate: () => void;
  selected?: boolean;
}

interface TabSetItemRenderProps extends IressUnstyledProps {
  ref?: (instance: HTMLElement | null) => void;
}

/**
 * This function is used to transfer composite props from Floating UI to the focusable element, in this case usually the button.
 * @param element The element to transfer props from (usually the composite item which is a div).
 * @param focusable The focusable element to transfer props to (usually the button).
 * @param htmlProps The renderProps from the composite item.
 * @param selected Whether the item is selected or not.
 */
const transferCompositePropsToFocusableElement = (
  element: HTMLElement,
  focusable: HTMLElement,
  htmlProps: TabSetItemRenderProps,
  selected?: boolean,
) => {
  const elementWithId = element.querySelector('[id]');
  const id = elementWithId?.getAttribute('id');

  elementWithId?.removeAttribute('id');
  element.removeAttribute('tabindex');
  element.removeAttribute('data-active');
  element.removeAttribute('aria-selected');

  htmlProps.ref?.(focusable);
  focusable.tabIndex = selected ? 0 : -1;

  if (selected) {
    focusable.setAttribute('data-active', '');
  } else {
    focusable.removeAttribute('data-active');
  }

  if (id) {
    focusable.setAttribute('id', id);
  }

  focusable.setAttribute('aria-selected', String(selected));
};

const TabInsideTabSet = ({
  activate,
  children,
  selected,
  ...restProps
}: TabInsideTabSetProps) => (
  <CompositeItem
    render={(htmlProps: TabSetItemRenderProps) => (
      <div
        {...restProps}
        {...htmlProps}
        aria-selected={selected}
        onClick={() => activate()}
        onKeyDown={(e) => ['Space', 'Enter'].includes(e.key) && activate()}
        ref={(element) => {
          if (!element) return;

          const focusable = focusableElements(element)[0];
          if (!focusable) return;

          transferCompositePropsToFocusableElement(
            element,
            focusable,
            htmlProps,
            selected,
          );
        }}
      >
        {children}
      </div>
    )}
  />
);

const Tab = <THref extends string | undefined = undefined>(
  {
    active,
    children,
    className: classNameProp,
    'data-testid': dataTestId,
    href,
    label,
    type = 'button',
    value,
    ...restProps
  }: IressTabProps<THref>,
  ref: Ref<HTMLElementTagNameMap[ButtonElement<undefined, THref>]>,
) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const element =
    useRef<HTMLElementTagNameMap[ButtonElement<undefined, THref>]>(null);
  const tabSet = useContext(TabSetContext);
  const { register, unregister, setHover } = tabSet ?? {};
  const { onMouseEnter, onMouseLeave } = restProps;

  useImperativeHandle(ref, () => element.current!);

  useLayoutEffect(() => {
    const node = element.current;
    if (node) {
      register?.(node, value);
      return () => unregister?.(node);
    }
  }, [register, unregister, value]);

  const isActive = tabSet ? tabSet.isActive(element.current) : active;
  const className = cx(
    classNameProp,
    tab({ active: isActive, insideTabSet: !!tabSet }),
    GlobalCSSClass.Tab,
  );

  const handleMouseEnter = useCallback(
    (
      e: MouseEvent<
        HTMLElementTagNameMap['a'] & HTMLElementTagNameMap['button']
      >,
    ) => {
      onMouseEnter?.(e);
      setHover?.(e.currentTarget);
    },
    [onMouseEnter, setHover],
  );

  const handleMouseLeave = useCallback(
    (
      e: MouseEvent<
        HTMLElementTagNameMap['a'] & HTMLElementTagNameMap['button']
      >,
    ) => {
      onMouseLeave?.(e);
      setHover?.();
    },
    [onMouseLeave, setHover],
  );

  const Component = useMemo(
    () =>
      styled(href ? 'a' : 'button') as unknown as ForwardRefExoticComponent<
        IressStyledProps<ButtonElement<undefined, THref>> &
          RefAttributes<HTMLElementTagNameMap[ButtonElement<undefined, THref>]>
      >,
    [href],
  );

  if (children && href) {
    idsLogger(
      'IressTab: You should not use `children` with `href` prop, as the `children` will be seen before the page navigates.',
    );
  }

  if (tabSet) {
    const showPanel = children && isActive;

    return (
      <>
        <TabInsideTabSet
          activate={() => tabSet.activate(element.current)}
          selected={isActive}
        >
          <Component
            className={className}
            aria-controls={children ? `${id}--panel` : undefined}
            role="tab"
            data-testid={dataTestId}
            {...(restProps as IressStyledProps<
              ButtonElement<undefined, THref>
            >)}
            href={href}
            id={id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={element}
            type={type}
          >
            {label}
          </Component>
        </TabInsideTabSet>
        {tabSet.panel &&
          createPortal(
            <div
              aria-labelledby={id}
              id={`${id}--panel`}
              role="tabpanel"
              onKeyDown={(e) => {
                // Only stop propagation for arrow keys to allow normal keyboard navigation
                if (
                  e.key === 'ArrowLeft' ||
                  e.key === 'ArrowRight' ||
                  e.key === 'ArrowUp' ||
                  e.key === 'ArrowDown'
                ) {
                  e.stopPropagation();
                }
              }}
              hidden={!showPanel}
            >
              {children}
            </div>,
            tabSet.panel,
            `${id}--panel`,
          )}
      </>
    );
  }

  return (
    <Component
      className={className}
      data-testid={dataTestId}
      {...(restProps as IressStyledProps<ButtonElement<undefined, THref>>)}
      href={href}
      id={id}
      ref={element}
      type={type}
    >
      {label}
    </Component>
  );
};

export const IressTab = forwardRef(Tab) as <
  THref extends string | undefined = undefined,
>(
  props: IressTabProps<THref> & {
    ref?: Ref<HTMLElementTagNameMap[ButtonElement<undefined, THref>]>;
  },
) => ReactElement;

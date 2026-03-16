import { Composite } from '@floating-ui/react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  type TabSetChangedEventDetail,
  TabSetContext,
  TabSetProvider,
} from './TabSetProvider';
import {
  type CSSProperties,
  type ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  type FormControlValue,
  type IressStyledProps,
  type IressUnstyledProps,
} from '@/types';
import { styled } from '@/styled-system/jsx';
import { tabSet } from './TabSet.styles';
import { cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { type IressCustomiseSlot } from '@/interfaces';

export interface IressTabSetProps extends Omit<IressStyledProps, 'onChange'> {
  /**
   * Content to be displayed inside the IressTabs, usually multiple `IressTab`.
   */
  children?: ReactNode;

  /**
   * Set the selected tab for uncontrolled tabs.
   * If the `IressTab` does not have a `value` prop, it will match by index.
   */
  defaultSelected?: FormControlValue;

  /**
   * Layout options for the positioning of tabs.
   * @default top-left
   */
  layout?: 'top-left' | 'top-center' | 'top-right';

  /**
   * Emitted when a tab changes.
   */
  onChange?: (event: TabSetChangedEventDetail) => void;

  /**
   * Custom style for the panel (the area that contains the tab content).
   */
  panelStyle?: IressCustomiseSlot;

  /**
   * Set the selected tab for controlled tabs.
   * If the `IressTab` does not have a `value` prop, it will match by index.
   */
  selected?: FormControlValue;

  /**
   * Custom style for the tab holder (the area that contains the tabs).
   */
  tabHolderStyle?: IressCustomiseSlot;

  /**
   * The type of the tabs, which determines their styling.
   * - `primary`: The default tab style, which is more prominent and suitable for main navigation.
   * - `secondary`: A more subdued tab style, suitable for secondary level of tabs (within expanders)
   * @default 'primary'
   */
  type?: 'primary' | 'secondary';
}

const HoverIndicator = (props: IressUnstyledProps) => {
  const [style, setStyle] = useState<CSSProperties>({});
  const previousStyle = useRef<CSSProperties>({});
  const tabSet = useContext(TabSetContext);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const hoverTab = tabSet?.hover;
    if (hoverTab && ref.current) {
      const tabList = ref.current.parentElement;
      if (tabList) {
        const tabListRect = tabList.getBoundingClientRect();
        const tabRect = hoverTab.getBoundingClientRect();
        const left = tabRect.left - tabListRect.left + tabList.scrollLeft;
        const newStyle: CSSProperties = {
          opacity: 1,
          left: `${left}px`,
          width: `${tabRect.width}px`,
        };
        setStyle(newStyle);
        previousStyle.current = newStyle;
      }
    } else {
      setStyle({ ...previousStyle.current, opacity: 0 });
    }
  }, [tabSet?.hover]);

  return <div {...props} ref={ref} style={style} />;
};

const ActiveIndicator = (props: IressUnstyledProps) => {
  const [style, setStyle] = useState<CSSProperties>({});
  const tabSet = useContext(TabSetContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTab = tabSet?.active;

    const updateStyle = () => {
      if (activeTab && ref.current) {
        const tabList = ref.current.parentElement;
        if (tabList) {
          const tabListRect = tabList.getBoundingClientRect();
          const tabRect = activeTab.getBoundingClientRect();
          const left = tabRect.left - tabListRect.left + tabList.scrollLeft;
          setStyle({
            left: `${left}px`,
            width: `${tabRect.width}px`,
          });
        }
      } else {
        setStyle({});
      }
    };

    updateStyle();

    // Observe all tab elements so the indicator recalculates when any tab's
    // content changes size (e.g. badge appears/disappears, label text changes).
    // Also observe the tablist itself so a container resize repositions the
    // indicator correctly for top-center / top-right layouts (justify-content
    // shifts tabs without changing their individual sizes).
    let resizeObserver: ResizeObserver | undefined;
    if (activeTab && ref.current && typeof ResizeObserver !== 'undefined') {
      const tabList = ref.current.parentElement;
      resizeObserver = new ResizeObserver(updateStyle);
      const observer = resizeObserver;
      if (tabList) {
        observer.observe(tabList);
        tabList
          .querySelectorAll('[role="tab"]')
          .forEach((tab) => observer.observe(tab));
      }
    }

    return () => {
      resizeObserver?.disconnect();
    };
  }, [tabSet?.active, tabSet?.layoutVersion]);

  return <div {...props} ref={ref} style={style} />;
};

export const IressTabSet = ({
  children,
  className,
  defaultSelected,
  layout = 'top-left',
  onChange,
  panelStyle,
  selected,
  tabHolderStyle,
  type,
  ...restProps
}: IressTabSetProps) => {
  const [panel, setPanel] = useState<HTMLDivElement | null>(null);
  const [overflowStart, setOverflowStart] = useState(false);
  const [overflowEnd, setOverflowEnd] = useState(false);
  const listHolderRef = useRef<HTMLDivElement>(null);
  const styles = tabSet({ layout, overflowStart, overflowEnd, type });

  useEffect(() => {
    const listElement =
      listHolderRef.current?.querySelector('[role="tablist"]');

    const checkOverflow = () => {
      if (listElement) {
        const { scrollWidth, clientWidth, scrollLeft } = listElement;
        const hasOverflow = scrollWidth > clientWidth;

        if (hasOverflow) {
          // Show left indicator if scrolled right (not at start)
          setOverflowStart(scrollLeft > 1);
          // Show right indicator if not scrolled to end
          setOverflowEnd(scrollLeft < scrollWidth - clientWidth - 1);
        } else {
          setOverflowStart(false);
          setOverflowEnd(false);
        }
      }
    };

    checkOverflow();

    listElement?.addEventListener('scroll', checkOverflow);

    // Use ResizeObserver to detect when the tablist changes size (e.g. window
    // resize, container resize) instead of a global window resize listener.
    // Fall back to the window resize event in environments where ResizeObserver
    // is unavailable (e.g. older browsers or SSR test environments).
    let resizeObserver: ResizeObserver | undefined;
    if (listElement) {
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(listElement);
      } else {
        window.addEventListener('resize', checkOverflow);
      }
    }

    return () => {
      listElement?.removeEventListener('scroll', checkOverflow);
      resizeObserver?.disconnect();
      // No-op if the listener was never added (ResizeObserver path was taken).
      window.removeEventListener('resize', checkOverflow);
    };
  }, [children]);

  return (
    <TabSetProvider
      defaultSelected={defaultSelected}
      onChange={onChange}
      panel={panel}
      selected={selected}
      type={type}
    >
      <styled.div
        className={cx(className, styles.root, GlobalCSSClass.TabSet)}
        {...restProps}
      >
        {children && (
          <>
            <styled.div
              {...tabHolderStyle}
              ref={listHolderRef}
              className={cx(styles.listHolder, tabHolderStyle?.className)}
            >
              {overflowStart && (
                <div className={styles.overflowStartIndicator} />
              )}
              {overflowEnd && <div className={styles.overflowEndIndicator} />}
              <Composite
                render={<div className={styles.list} role="tablist" />}
                loop={false}
              >
                <ActiveIndicator className={styles.activeIndicator} />
                <HoverIndicator className={styles.hoverIndicator} />
                {children}
              </Composite>
            </styled.div>
            <styled.div
              {...panelStyle}
              className={cx(styles.panel, panelStyle?.className)}
              data-testid={
                panelStyle?.['data-testid'] ??
                propagateTestid(restProps['data-testid'], 'panel')
              }
              ref={setPanel}
            />
          </>
        )}
      </styled.div>
    </TabSetProvider>
  );
};

IressTabSet.displayName = 'IressTabSet';

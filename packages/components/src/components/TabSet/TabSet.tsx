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
}

const HoverIndicator = (props: IressUnstyledProps) => {
  const [style, setStyle] = useState<CSSProperties>({});
  const tabSet = useContext(TabSetContext);

  useEffect(() => {
    if (tabSet?.hover) {
      const { offsetLeft, scrollWidth } = tabSet.hover;
      setStyle({
        opacity: 1,
        left: `${offsetLeft}px`,
        width: `${scrollWidth}px`,
      });
    } else {
      setStyle((prevStyle) => ({
        ...prevStyle,
        opacity: 0,
      }));
    }
  }, [tabSet?.hover]);

  return <div {...props} style={style} />;
};

const ActiveIndicator = (props: IressUnstyledProps) => {
  const [style, setStyle] = useState<CSSProperties>({});
  const tabSet = useContext(TabSetContext);

  useEffect(() => {
    const activeTimeout = setTimeout(() => {
      if (tabSet?.active) {
        const { offsetLeft, scrollWidth } = tabSet.active;
        setStyle({
          left: `${offsetLeft}px`,
          width: `${scrollWidth}px`,
        });
      }
    }, 150);
    return () => clearTimeout(activeTimeout);
  }, [tabSet?.active]);

  return <div {...props} style={style} />;
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
  ...restProps
}: IressTabSetProps) => {
  const [panel, setPanel] = useState<HTMLDivElement | null>(null);
  const styles = tabSet({ layout });

  return (
    <TabSetProvider
      defaultSelected={defaultSelected}
      onChange={onChange}
      panel={panel}
      selected={selected}
    >
      <styled.div
        className={cx(className, styles.root, GlobalCSSClass.TabSet)}
        {...restProps}
      >
        {children && (
          <>
            <styled.div
              {...tabHolderStyle}
              className={cx(styles.listHolder, tabHolderStyle?.className)}
            >
              <ActiveIndicator className={styles.activeIndicator} />
              <HoverIndicator className={styles.hoverIndicator} />
              <Composite
                render={<div className={styles.list} role="tablist" />}
                loop={false}
              >
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

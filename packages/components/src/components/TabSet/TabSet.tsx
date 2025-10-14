import classNames from 'classnames';
import styles from './TabSet.module.scss';
import { Composite } from '@floating-ui/react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  type IressTabSetProps,
  TabSetLayout,
  type TabSetWithEnums,
} from './TabSet.types';
import { TabSetProvider } from './TabSetProvider';
import { useState } from 'react';

export const IressTabSet: TabSetWithEnums = ({
  children,
  className,
  defaultSelected,
  layout = 'top-left',
  onChange,
  selected,
  ...restProps
}: IressTabSetProps) => {
  const [panel, setPanel] = useState<HTMLDivElement | null>(null);

  return (
    <TabSetProvider
      onChange={onChange}
      defaultSelected={defaultSelected}
      panel={panel}
      selected={selected}
    >
      <div
        className={classNames(className, styles.tabSet, {
          [styles[`layout--${layout}`]]: !!layout,
        })}
        {...restProps}
      >
        {children && (
          <Composite
            render={<div className={styles.list} role="tablist" />}
            loop={false}
          >
            {children}
          </Composite>
        )}
        {children && (
          <div
            className={styles.panel}
            data-testid={propagateTestid(restProps?.['data-testid'], 'panel')}
            ref={setPanel}
          />
        )}
      </div>
    </TabSetProvider>
  );
};

/** @deprecated IressTabSet.Layout enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressTabSet.Layout = TabSetLayout;

import classNames from 'classnames';
import { type IressTabProps } from './Tab.types';
import styles from './Tab.module.scss';
import { forwardRef, useEffect } from 'react';
import { useIdIfNeeded } from '@/hooks';
import { useTabSetItems } from '../hooks/useTabSetItems';
import { TabSetItem } from '../components/TabSetItem';
import { createPortal } from 'react-dom';
import { type IressButtonHTMLAttributes } from '@/main';

const TabButton = forwardRef(
  (
    { className, type = 'button', ...restProps }: IressButtonHTMLAttributes,
    ref: React.Ref<HTMLButtonElement>,
  ) => (
    <button
      className={classNames(className, styles.tab)}
      {...restProps}
      type={type}
      ref={ref}
    />
  ),
);

const Tab = (
  {
    active,
    children,
    className,
    'data-testid': dataTestId,
    label,
    value,
    ...restProps
  }: IressTabProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const id = useIdIfNeeded(restProps);
  const tabSetItems = useTabSetItems();

  useEffect(() => {
    tabSetItems?.register({
      id,
      value,
    });
  }, [id, tabSetItems, value]);

  const isActive = tabSetItems ? tabSetItems.isActive(id, value) : active;

  if (tabSetItems) {
    const showPanel = children && isActive;

    return (
      <>
        <TabSetItem
          index={tabSetItems.indexOf(id, value)}
          handleSelection={tabSetItems.activate}
          selected={isActive}
          value={value}
        >
          <TabButton
            className={classNames(className, {
              [styles.active]: isActive,
            })}
            aria-controls={children ? `${id}--panel` : undefined}
            role="tab"
            data-testid={dataTestId}
            {...restProps}
            id={id}
            ref={ref}
          >
            {label}
          </TabButton>
        </TabSetItem>
        {tabSetItems.panel &&
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
            tabSetItems.panel,
            `${id}--panel`,
          )}
      </>
    );
  }

  return (
    <TabButton
      className={classNames(className, {
        [styles.active]: isActive,
      })}
      data-testid={dataTestId}
      {...restProps}
      id={id}
      ref={ref}
    >
      {label}
    </TabButton>
  );
};

export const IressTab = forwardRef(Tab);

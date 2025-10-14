import {
  type TabSetItemRenderProps,
  type TabSetItemProps,
} from '../TabSet.types';
import styles from '../TabSet.module.scss';
import { CompositeItem } from '@floating-ui/react';
import { focusableElements } from '@helpers/dom/focusableElements';

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

export const TabSetItem = ({
  children,
  handleSelection,
  index,
  selected,
  value,
  ...restProps
}: TabSetItemProps) => (
  <CompositeItem
    render={(htmlProps: TabSetItemRenderProps) => (
      <div
        {...restProps}
        {...htmlProps}
        aria-selected={selected}
        className={styles.listItem}
        onClick={() => handleSelection(index, value)}
        onKeyDown={(e) =>
          ['Space', 'Enter'].includes(e.key) && handleSelection(index, value)
        }
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

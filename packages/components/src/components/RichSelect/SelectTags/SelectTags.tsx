import classNames from 'classnames';
import {
  ButtonCssClass,
  type ButtonRef,
  GlobalCSSClass,
  IressButton,
  IressIcon,
  IressInline,
  IressMenu,
  IressMenuItem,
  type IressMenuItemProps,
  IressPopover,
  IressTag,
  type IressTagProps,
  IressText,
  type LabelValueMeta,
  type PopoverContextValue,
} from '@/main';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { composeLabelValueDescriptor } from '@helpers/label-value/composeLabelValueDescriptor';
import { type IressSelectTagsProps } from './SelectTags.types';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import { useCallback, useEffect, useState, useMemo } from 'react';
import styles from './SelectTags.module.scss';
import { usePopover } from '@/components/Popover/hooks/usePopover';
import { focusableElements } from '@/helpers/dom/focusableElements';

const adjustFocusOnTagDelete = (
  popover?: PopoverContextValue,
  e?: React.SyntheticEvent<ButtonRef | HTMLDivElement>,
) => {
  if (!popover?.api.elements.reference || !e) {
    return;
  }

  const popoverActivator = popover.getFocusableActivator();
  const focusable = focusableElements(
    popover.api.elements.reference as HTMLElement,
  ).filter((element) => element !== popoverActivator);

  // If there are no focusable elements, focus on the activator
  if (focusable.length < 1) {
    popoverActivator?.focus();
  } else {
    const index = focusable.indexOf(e.currentTarget);
    const focusableWithoutDeleted = focusable.filter(
      (element) => element !== e.currentTarget,
    );
    const prevIndex = Math.max(index - 1, 0);

    if (!focusableWithoutDeleted[prevIndex] && focusableWithoutDeleted[0]) {
      // If there is no previous focusable element, focus on the activator
      focusableWithoutDeleted[0].focus();
    } else if (!focusableWithoutDeleted[0]) {
      // If there are no focusable elements left, focus on the activator
      popoverActivator?.focus();
    } else {
      // Otherwise, focus on the previous focusable element
      focusableWithoutDeleted[prevIndex].focus();
    }
  }
};

const Tags = ({
  'data-testid': dataTestId,
  limit = 5,
  onDelete,
  onDeleteAll,
  onToggleActions,
  selectedArray,
  selectedOptionsText,
}: Pick<
  IressSelectTagsProps,
  | 'data-testid'
  | 'limit'
  | 'onDelete'
  | 'onDeleteAll'
  | 'onToggleActions'
  | 'selectedOptionsText'
> & {
  selectedArray: LabelValueMeta[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const popover = usePopover();

  const onTagDelete: IressTagProps['onDelete'] = useCallback(
    (label: string, e: React.SyntheticEvent<ButtonRef>) => {
      onDelete?.(
        selectedArray.find((item) => item.label === label),
        e,
      );
      e.stopPropagation();

      adjustFocusOnTagDelete(popover, e);
    },
    [onDelete, popover, selectedArray],
  );

  const onTagDeleteAll: IressMenuItemProps['onClick'] = useCallback(
    (e: React.SyntheticEvent<ButtonRef>) => {
      onDeleteAll?.(e);
      popover?.getFocusableActivator()?.focus();
    },
    [onDeleteAll, popover],
  );

  useEffect(() => {
    if (!selectedArray.length) {
      setExpanded(false);
    }
  }, [selectedArray]);

  if (expanded || !limit || selectedArray.length <= limit)
    return selectedArray.map((item) => (
      <IressTag
        className={styles.tag}
        data-testid={propagateTestid(dataTestId, 'tag')}
        deleteButtonText={`Delete ${item.label}`}
        key={getFormControlValueAsStringIfDefined(item.value) ?? item.label}
        onDelete={onTagDelete}
      >
        {item.label}
      </IressTag>
    ));

  return (
    <IressTag
      className={styles.tag}
      data-testid={propagateTestid(dataTestId, 'tag')}
      deleteButton={
        <IressPopover
          activator={
            <IressButton mode="tertiary">
              <IressIcon
                name="chevron-circle-down"
                screenreaderText="Actions"
              />
            </IressButton>
          }
          onActivated={() => onToggleActions?.(true)}
          onClick={(e) => {
            e.stopPropagation();
            adjustFocusOnTagDelete(popover, e);
          }}
          onDeactivated={() => onToggleActions?.(false)}
        >
          <IressMenu>
            <IressMenuItem onClick={() => setExpanded(true)}>
              Expand all
            </IressMenuItem>
            <IressMenuItem onClick={onTagDeleteAll}>Delete all</IressMenuItem>
          </IressMenu>
        </IressPopover>
      }
    >
      {composeLabelValueDescriptor(selectedArray, selectedOptionsText)}
    </IressTag>
  );
};

export const IressSelectTags = ({
  append = (
    <IressButton mode="tertiary" role="combobox" aria-label="Select">
      <IressIcon name="chevron-down" size="xs" />
    </IressButton>
  ),
  className,
  'data-testid': dataTestId,
  limit = 5,
  onDelete,
  onDeleteAll,
  onToggleActions,
  placeholder,
  prepend,
  selected,
  selectedOptionsText = '{{numOptions}} selected',
  ...restProps
}: IressSelectTagsProps) => {
  const selectedArray = useMemo(() => toArray(selected), [selected]);
  const showPlaceholder = !selectedArray.length && placeholder;
  const hasSelected = !!selectedArray.length;

  return (
    <IressText
      {...restProps}
      className={classNames(
        className,
        styles.selectTags,
        ButtonCssClass.Base,
        GlobalCSSClass.FormElementInner,
      )}
    >
      {prepend && <span className={styles.prepend}>{prepend}</span>}
      {showPlaceholder && (
        <span className={classNames(styles.placeholder)}>{placeholder}</span>
      )}
      {hasSelected && (
        <IressInline gutter="sm" className={styles.tagsList}>
          <Tags
            data-testid={dataTestId}
            limit={limit}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
            onToggleActions={onToggleActions}
            selectedArray={selectedArray}
            selectedOptionsText={selectedOptionsText}
          />
        </IressInline>
      )}
      {append && <span className={styles.append}>{append}</span>}
    </IressText>
  );
};

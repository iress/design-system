import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { composeLabelValueDescriptor } from '@helpers/label-value/composeLabelValueDescriptor';
import { getFormControlValueAsStringIfDefined } from '@helpers/form/getFormControlValueAsStringIfDefined';
import {
  useCallback,
  useState,
  useMemo,
  useContext,
  type ReactNode,
} from 'react';
import { focusableElements } from '@/helpers/dom/focusableElements';
import {
  PopoverContext,
  type PopoverHookReturn,
} from '@/components/Popover/hooks/usePopover';
import { IressText, type IressTextProps } from '@/components/Text';
import { type IressSelectActivatorProps } from '../components/SelectActivator';
import { cx } from '@/styled-system/css';
import { selectTags } from './SelectTags.styles';
import { type LabelValueMeta } from '@/interfaces';
import { IressTag, type IressTagProps } from '@/components/Tag';
import {
  IressMenu,
  IressMenuItem,
  type IressMenuItemProps,
} from '@/components/Menu';
import { IressPopover } from '@/components/Popover';
import { IressButton } from '@/components/Button';
import { IressIcon } from '@/components/Icon';
import { GlobalCSSClass } from '@/enums';
import { IressInline } from '@/components/Inline';

export interface IressSelectTagsProps
  extends Omit<IressSelectActivatorProps, 'width'>,
    Omit<IressTextProps, 'element' | 'width'> {
  /**
   * Append content.
   */
  append?: ReactNode;

  /**
   * The id of the select element.
   */
  id?: string;

  /**
   * Emitted when a tag is deleted.
   */
  onDelete?: (
    item?: LabelValueMeta,
    e?: React.SyntheticEvent<HTMLButtonElement>,
  ) => void;

  /**
   * Emitted when the combined tag delete button is clicked.
   */
  onDeleteAll?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;

  /**
   * Emitted when actions are toggled.
   */
  onToggleActions?: (open?: boolean) => void;

  /**
   * Limit of tags to display before shortening to `selectedOptionsText`
   * @default 5
   */
  limit?: number;
}

const adjustFocusOnTagDelete = (
  popover?: PopoverHookReturn,
  e?: React.SyntheticEvent<HTMLButtonElement | HTMLDivElement>,
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
  const popover = useContext(PopoverContext);
  const classes = selectTags();

  const onTagDelete: IressTagProps['onDelete'] = useCallback(
    (label: string, e: React.SyntheticEvent<HTMLButtonElement>) => {
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
    (e: React.SyntheticEvent<HTMLButtonElement>) => {
      onDeleteAll?.(e);
      popover?.getFocusableActivator()?.focus();
    },
    [onDeleteAll, popover],
  );

  if (expanded || !limit || selectedArray.length <= limit)
    return selectedArray.map((item) => (
      <IressTag
        className={classes.tag}
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
      className={classes.tag}
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
  append = '',
  className,
  'data-testid': dataTestId,
  id,
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
  const shouldShowDefaultChevron = append == null || append === '' || !append;
  const classes = selectTags({ showDefaultChevron: shouldShowDefaultChevron });

  return (
    <IressText<'div'>
      {...restProps}
      id={id}
      tabIndex={0}
      className={cx(
        className,
        classes.root,
        GlobalCSSClass.FormElementInner,
        GlobalCSSClass.RichSelectTags,
      )}
    >
      {prepend && <span className={classes.prepend}>{prepend}</span>}
      {showPlaceholder && (
        <IressText className={classes.placeholder}>{placeholder}</IressText>
      )}
      {hasSelected && (
        <IressInline gap="sm" className={classes.tagsList}>
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
      <button
        className={classes.append}
        role="combobox"
        aria-label="Select options"
      >
        {append}
      </button>
    </IressText>
  );
};

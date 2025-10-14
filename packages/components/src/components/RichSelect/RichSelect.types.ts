import { type AutocompleteSearchHookProps } from '../Autocomplete';
import {
  type FloatingUIAligns,
  type FocusableElementRef,
  type FormattedLabelValueMeta,
  type FormElementWidths,
  type IressPopoverProps,
  type LabelValueMeta,
  type PopoverRef,
  type PopoverTypes,
} from '@/main';
import {
  type ChangeEvent,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
} from 'react';

export interface IressRichSelectProps
  extends Omit<AutocompleteSearchHookProps, 'query'>,
    Omit<
      IressPopoverProps,
      | 'activator'
      | 'children'
      | 'contentClassName'
      | 'defaultShow'
      | 'defaultValue'
      | 'disabledAutoToggle'
      | 'onChange'
      | 'show'
    > {
  /**
   * Sets the alignment of the dropdown relative to the activator element.
   * @default bottom-start
   */
  align?: FloatingUIAligns;

  /**
   * By default, the RichSelect will automatically highlight the first option in the list when it is opened.
   * Set this to false to disable that behaviour.
   * @default true
   */
  autoHighlight?: boolean;

  /**
   * Value of selected option for uncontrolled select.
   */
  defaultValue?: LabelValueMeta | LabelValueMeta[];

  /**
   * Set to true if the user can select multiple options.
   */
  multiSelect?: boolean;

  /**
   * Whether the popover should match the width of the activator element.
   * When true, the dropdown will have the same width as the select input.
   * When false, the dropdown will size based on its content.
   * @default true
   */
  matchActivatorWidth?: boolean;

  /**
   * Name of the select. Used to pass data when submitted within a form.
   */
  name?: string;

  /**
   * Callback fired when the user has completely blurred away from the RichSelect. This is to kill the blur event bubbling.
   * (component is no longer in focus and popover is closed).
   */
  onBlur?: (event: Event | React.FocusEvent<HTMLElement>) => void;

  /**
   * Emitted when the value changes.
   */
  onChange?: (
    event?: ChangeEvent<HTMLElement> & {
      currentTarget: { value?: LabelValueMeta | LabelValueMeta[] };
      target: { value?: LabelValueMeta | LabelValueMeta[] };
    },
    value?: LabelValueMeta | LabelValueMeta[],
  ) => void;

  /**
   * The available options that the user can select from.
   */
  options: LabelValueMeta[] | ((query: string) => Promise<LabelValueMeta[]>);

  /**
   * Placeholder, shown when there is nothing selected.
   */
  placeholder?: ReactNode;

  /**
   * Renders the select as read-only.
   */
  readonly?: boolean;

  /**
   * Completely customise the rendering of the hidden input.
   */
  renderHiddenInput?: (props: SelectHiddenInputRenderProps) => ReactNode;

  /**
   * Completely customise the rendering of the select label.
   */
  renderLabel?: (props: SelectLabelRenderProps) => ReactElement;

  /**
   * Completely customise the rendering of the select options.
   */
  renderOptions?: (props: SelectOptionsRenderProps) => ReactNode;

  /**
   * Render a custom footer below the default options display.
   * If using `renderOptions`, this render prop will not be called.
   */
  renderOptionsFooter?: (props: SelectOptionsRenderProps) => ReactNode;

  /**
   * Whether its required. Will be passed to the hidden input.
   */
  required?: boolean;

  /*
   * Describes the type of content contained in the select (for screen readers).
   * By default it will be set based on whether the options are asynchronous (undefined) or not (`listbox`), as asynchronous options passes the `listbox` role inside the component.
   * If you are customising using `renderLabel` or `renderOptions`, you may need to set this manually.
   */
  type?: PopoverTypes;

  /**
   * Value of selected option for controlled select.
   */
  value?: LabelValueMeta | LabelValueMeta[];

  /**
   * The width of the select.
   * @default 100perc
   */
  width?: FormElementWidths;

  /*
   * Whether the focus is virtual (using `aria-activedescendant`, usually for screen readers).
   * By default it will be set based on whether the options are asynchronous (false) or not (true), as asynchronous options passes focus to the search component.
   * If you are customising using `renderOptions`, you may need to set this manually.
   */
  virtualFocus?: boolean;

  /**
   * Header showed in option panel when expanded.
   */
  header?: ReactNode;

  /**
   * Footer showed in option panel when expanded.
   */
  footer?: ReactNode;
}

export interface IressSelectActivatorProps {
  /**
   * Append content.
   * @default <IressIcon name="chevron-down" size="xs" />
   */
  append?: ReactNode;

  /**
   * Placeholder, shown when there is nothing selected.
   */
  placeholder?: ReactNode;

  /**
   * Prepend content.
   */
  prepend?: ReactNode;

  /**
   * Selected items.
   */
  selected?: LabelValueMeta | LabelValueMeta[];

  /**
   * Text displayed next to label when two or more options are selected.
   * @default {{numOptions}} selected
   */
  selectedOptionsText?: string;
}

export interface SelectHiddenInputRenderProps {
  /**
   * Gets the current value as a string, separated by comma. Use this if you are using an uncontrolled select.
   */
  getValuesString: () => string;

  /**
   * Selected items.
   */
  value?: LabelValueMeta | LabelValueMeta[];

  /**
   * Set the reference of the hidden input. Required to be set if needed to work with React Hook Forms.
   */
  ref?: ForwardedRef<HTMLInputElement>;

  /**
   * Whether its required.
   */
  required?: boolean;
}

export interface SelectLabelRenderProps {
  /**
   * Close the popover menu.
   */
  close: () => void;

  /**
   * Whether the select has errored, use this to show an error state.
   * Only applies when options are asynchronous.
   */
  error: boolean | string;

  /**
   * Whether the select is loading, use this to show a loading spinner.
   */
  loading: boolean;

  /**
   * Sets the value (selected items) of the select. Use this if you are using an uncontrolled select.
   */
  setValue: (value?: LabelValueMeta | LabelValueMeta[]) => void;

  /**
   * Whether the select dropdown (popover) is showing.
   */
  show: boolean;

  /**
   * Selected items.
   */
  value?: LabelValueMeta | LabelValueMeta[];
}

export interface SelectOptionsRenderProps extends SelectLabelRenderProps {
  /**
   * The query value that was used to filter the items (may be different from query).
   */
  debouncedQuery: string;

  /**
   * The query value to filter items by and create search results.
   */
  query: string;

  /**
   * The results of the search.
   */
  results: FormattedLabelValueMeta[];

  /**
   * Set the query value to filter the items by.
   */
  setQuery: (query: string) => void;
}

export interface RichSelectRef
  extends Partial<PopoverRef>,
    Partial<FocusableElementRef> {
  hiddenInput?: HTMLInputElement;
}

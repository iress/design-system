import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
  ForwardedRef,
  ReactElement,
  ChangeEvent,
  ReactNode,
} from 'react';
import { cx } from '@/styled-system/css';
import { richSelect } from './RichSelect.styles';
import { useRichSelectState } from '../RichSelect';
import {
  useAutocompleteSearch,
  AutocompleteSearchHookProps,
} from '../Autocomplete';
import {
  SelectActivator,
  IressSelectActivatorProps,
} from './components/SelectActivator';
import { SelectOptions } from './components/SelectOptions';
import {
  SelectHiddenInput,
  SelectHiddenInputRenderProps,
} from './components/SelectHiddenInput';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';
import { GlobalCSSClass } from '@/enums';
import { IressInputProps } from '../Input';
import { ControlledValue } from '@/hooks';
import {
  FormattedLabelValueMeta,
  LabelValueMeta,
  ReactHookFormCompatibleRef,
} from '@/interfaces';
import { FloatingUIAligns } from '@/types';
import { IressPopover, IressPopoverProps, PopoverRef } from '../Popover';
import { IressReadonly } from '../Readonly';

export interface IressRichSelectProps<TMultiple extends boolean = false>
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
      | 'matchActivatorWidth'
      | 'show'
      | 'width'
    >,
    Pick<
      IressSelectActivatorProps,
      'append' | 'prepend' | 'selectedOptionsText'
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
  defaultValue?: ControlledValue<LabelValueMeta, TMultiple>;

  /**
   * Set to true if the user can select multiple options.
   */
  multiSelect?: TMultiple;

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
      currentTarget: { value?: ControlledValue<LabelValueMeta, TMultiple> };
      target: { value?: ControlledValue<LabelValueMeta, TMultiple> };
    },
    value?: ControlledValue<LabelValueMeta, TMultiple>,
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
  readOnly?: boolean;

  /**
   * Completely customise the rendering of the hidden input.
   */
  renderHiddenInput?: (
    props: SelectHiddenInputRenderProps<TMultiple>,
  ) => ReactNode;

  /**
   * Completely customise the rendering of the select label.
   */
  renderLabel?: (props: SelectLabelRenderProps<TMultiple>) => ReactElement;

  /**
   * Completely customise the rendering of the select options.
   */
  renderOptions?: (props: SelectOptionsRenderProps<TMultiple>) => ReactNode;

  /**
   * Whether its required. Will be passed to the hidden input.
   */
  required?: boolean;

  /*
   * Describes the type of content contained in the select (for screen readers).
   * By default it will be set based on whether the options are asynchronous (undefined) or not (`listbox`), as asynchronous options passes the `listbox` role inside the component.
   * If you are customising using `renderLabel` or `renderOptions`, you may need to set this manually.
   */
  type?: IressPopoverProps['type'];

  /**
   * Value of selected option for controlled select.
   */
  value?: ControlledValue<LabelValueMeta, TMultiple>;

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

  /**
   * The width of the select.
   */
  width?: IressInputProps['width'];

  /**
   * Whether the popover should match the width of the activator element.
   * When true, the dropdown will have the same width as the select input.
   * When false, the dropdown will size based on its content.
   * @default true
   */
  matchActivatorWidth?: boolean;
}

export interface SelectLabelRenderProps<TMultiple extends boolean = false> {
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
  setValue: (value?: ControlledValue<LabelValueMeta, TMultiple>) => void;

  /**
   * Whether the select dropdown (popover) is showing.
   */
  show: boolean;

  /**
   * Selected items.
   */
  value?: ControlledValue<LabelValueMeta, TMultiple>;
}

export interface SelectOptionsRenderProps<TMultiple extends boolean = false>
  extends SelectLabelRenderProps<TMultiple> {
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

export type RichSelectRef = Partial<PopoverRef> & ReactHookFormCompatibleRef;

const RichSelect = <TMultiple extends boolean = false>(
  {
    align = 'bottom-start',
    append,
    autoHighlight = true,
    className,
    debounceThreshold,
    defaultValue,
    footer,
    header,
    id,
    initialOptions,
    matchActivatorWidth = true,
    minSearchLength,
    multiSelect,
    name,
    onActivated,
    onDeactivated,
    onChange,
    onBlur,
    options,
    placeholder,
    prepend,
    readOnly,
    renderHiddenInput,
    renderLabel,
    renderOptions,
    required,
    selectedOptionsText,
    type: typeProp,
    value: valueProp,
    virtualFocus: virtualFocusProp,
    width,
    ...restProps
  }: IressRichSelectProps<TMultiple>,
  ref: ForwardedRef<RichSelectRef>,
) => {
  useNoDefaultValueInForms({
    component: 'IressRichSelect',
    defaultValue,
  });

  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const { value, setValue, getValuesString, getLabelsString } =
    useRichSelectState({
      component: 'IressRichSelect',
      defaultValue,
      multiple: multiSelect,
      value: valueProp,
    });
  const popoverRef = useRef<PopoverRef | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const {
    debouncedQuery,
    error,
    results,
    stopSearch,
    loading,
    shouldShowInstructions,
    shouldShowNoResults,
  } = useAutocompleteSearch({
    debounceThreshold,
    initialOptions,
    minSearchLength,
    options,
    query,
  });

  useImperativeHandle(ref, () => {
    if (!popoverRef.current) {
      return {
        hiddenInput: hiddenInputRef.current ?? undefined,
        input: hiddenInputRef.current ?? null,
        focus: () => hiddenInputRef.current?.focus(),
        blur: () => hiddenInputRef.current?.blur(),
      };
    }

    return {
      ...popoverRef.current,
      focus: () => popoverRef.current?.getActivator()?.focus(),
      blur: () => popoverRef.current?.getActivator()?.blur(),
      hiddenInput: hiddenInputRef.current ?? undefined,
      input: hiddenInputRef.current ?? null,
    };
  });

  useEffect(() => {
    if (show) {
      onActivated?.();
    } else {
      onDeactivated?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- others are optional props
  }, [show]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (!onBlur) return;

      // Check if the related target (where focus is moving to) is outside the IressField component
      const currentTarget = event.currentTarget as HTMLElement;
      const relatedTarget = event.relatedTarget as HTMLElement;

      // If there's no related target or it's not contained within the current field component
      if (!show && (!relatedTarget || !currentTarget.contains(relatedTarget))) {
        onBlur(event);
      }
      event.stopPropagation();
    },
    [onBlur, show],
  );

  if (readOnly) {
    return (
      <IressReadonly value={getValuesString()}>
        {getLabelsString(', ')}
      </IressReadonly>
    );
  }

  const isAsync = typeof options === 'function';
  const virtualFocus = virtualFocusProp ?? !isAsync;
  const type = typeProp ?? (isAsync ? undefined : 'listbox');

  const classes = richSelect({ width });

  /**
   * When the popover is activated, open the popover.
   * We control it inside IressRichSelect to allow closing of the popover in selection scenarios.
   */
  const handlePopoverActivated: IressPopoverProps['onActivated'] = () => {
    setShow(true);
  };

  /**
   * When the popover is deactivated, close the popover and stop searching.
   */
  const handlePopoverDeactivated: IressPopoverProps['onDeactivated'] = () => {
    setShow(false);
    stopSearch();
  };

  return (
    <>
      <IressPopover
        {...restProps}
        activator={
          <SelectActivator
            append={append}
            async={isAsync}
            error={error}
            id={id}
            loading={loading}
            multiSelect={multiSelect}
            onChange={onChange}
            placeholder={placeholder}
            prepend={prepend}
            renderLabel={renderLabel}
            selectedOptionsText={selectedOptionsText}
            setValue={setValue}
            setShow={setShow}
            show={show}
            value={value}
          />
        }
        align={align}
        className={cx(className, classes.richSelect, GlobalCSSClass.RichSelect)}
        contentClassName={cx(classes.popoverContent)}
        matchActivatorWidth={matchActivatorWidth}
        onActivated={handlePopoverActivated}
        onDeactivated={handlePopoverDeactivated}
        ref={popoverRef}
        show={show}
        type={type}
        virtualFocus={virtualFocus}
        onBlur={handleBlur}
      >
        <div className={classes.wrapper}>
          {header}
          <SelectOptions
            autoHighlight={autoHighlight}
            debouncedQuery={debouncedQuery}
            error={error}
            initialOptions={initialOptions}
            loading={loading}
            minSearchLength={minSearchLength}
            multiSelect={multiSelect}
            onChange={onChange}
            options={options}
            query={query}
            renderOptions={renderOptions}
            results={results}
            setQuery={setQuery}
            setShow={setShow}
            setValue={setValue}
            shouldShowInstructions={shouldShowInstructions}
            shouldShowNoResults={shouldShowNoResults}
            show={show}
            value={value}
          />
          {footer}
        </div>
      </IressPopover>
      <SelectHiddenInput
        data-testid={restProps['data-testid']}
        getValuesString={getValuesString}
        name={name}
        renderHiddenInput={renderHiddenInput}
        required={required}
        value={value}
        ref={hiddenInputRef}
      />
    </>
  );
};

export const IressRichSelect = forwardRef(RichSelect) as <
  TMultiple extends boolean = false,
>(
  props: IressRichSelectProps<TMultiple> & {
    ref?: ForwardedRef<RichSelectRef>;
  },
) => ReactElement;

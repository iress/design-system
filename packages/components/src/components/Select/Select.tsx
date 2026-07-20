import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ForwardedRef,
  type ReactElement,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { cx } from '@/styled-system/css';
import { select } from './Select.styles';
import { type IressSelectMenuProps } from '.';
import {
  useAutocompleteSearch,
  type AutocompleteSearchHookProps,
} from '../Autocomplete';
import {
  SelectActivator,
  type IressSelectActivatorProps,
} from './components/SelectActivator';
import { SelectOptions } from './components/SelectOptions';
import {
  SelectHiddenInput,
  type SelectHiddenInputRenderProps,
} from './components/SelectHiddenInput';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';
import { GlobalCSSClass } from '@/enums';
import type { IressInputProps } from '../Input';
import { useResponsiveProps, type ControlledValue } from '@/hooks';
import type {
  FormattedLabelValueMeta,
  LabelValueMeta,
  ReactHookFormCompatibleRef,
} from '@/interfaces';
import type {
  FloatingUIAligns,
  Breakpoints,
  FormControlReadOnly,
  FormControlValue,
} from '@/types';
import {
  IressPopover,
  type IressPopoverProps,
  type PopoverRef,
} from '../Popover';
import { IressReadonly } from '../Readonly';
import type { IressButtonProps } from '../Button';
import {
  NativeSelect,
  type NativeSelectProps,
} from './components/NativeSelect';
import { useSelectState } from './hooks/useSelectState';
import { idsLogger } from '@helpers/utility/idsLogger';

type SelectValue<
  TMultiple extends boolean = false,
  TNative extends boolean | Breakpoints = false,
> = TNative extends false
  ?
      | ControlledValue<LabelValueMeta, TMultiple>
      | ControlledValue<FormControlValue, TMultiple>
  : LabelValueMeta | FormControlValue;

type SelectChangeEvent<
  TMultiple extends boolean = false,
  TNative extends boolean | Breakpoints = false,
> = TNative extends false
  ? (
      e: ChangeEvent<HTMLElement> & {
        currentTarget: {
          value?: ControlledValue<FormControlValue, TMultiple>;
        };
        target: { value?: ControlledValue<FormControlValue, TMultiple> };
      },
      value?: ControlledValue<FormControlValue, TMultiple>,
      labelValue?: ControlledValue<LabelValueMeta, TMultiple>,
    ) => void
  : (
      e: ChangeEvent<HTMLSelectElement>,
      value?: ControlledValue<FormControlValue, TMultiple>,
      labelValue?: ControlledValue<LabelValueMeta, TMultiple>,
    ) => void;

export type SelectRef<TNative extends boolean | Breakpoints = false> =
  TNative extends false
    ? Partial<PopoverRef> & ReactHookFormCompatibleRef
    : ReactHookFormCompatibleRef<HTMLSelectElement>;

type SelectProps<TNative extends boolean | Breakpoints = false> =
  TNative extends false
    ? Omit<
        IressPopoverProps,
        | 'activator'
        | 'children'
        | 'contentClassName'
        | 'defaultShow'
        | 'defaultValue'
        | 'onChange'
        | 'matchActivatorWidth'
        | 'show'
        | 'width'
      > &
        Omit<AutocompleteSearchHookProps, 'disabled' | 'query'> &
        Pick<
          IressSelectActivatorProps,
          'append' | 'prepend' | 'selectedOptionsText'
        >
    : Omit<NativeSelectProps, 'value' | 'onChange' | 'options'>;

export type IressSelectProps<
  TMultiple extends boolean = false,
  TNative extends boolean | Breakpoints = false,
> = SelectProps<TNative> & {
  /**
   * Sets the alignment of the dropdown relative to the activator element.
   * @default bottom-start
   */
  align?: FloatingUIAligns;

  /**
   * By default, the Select will automatically highlight the first option in the list when it is opened.
   * Set this to false to disable that behaviour.
   * @default true
   */
  autoHighlight?: boolean;

  disabled?: boolean;

  /**
   * Value of selected option for uncontrolled select.
   */
  defaultValue?: SelectValue<TMultiple, TNative>;

  /**
   * Set to true if the user can select multiple options.
   */
  multiSelect?: TMultiple;

  /**
   * Limits the number of selected value tags shown before the rest are collapsed into a summary tag
   * (e.g. "+3 more"). Only applies when `multiSelect` is `true`. This is not for validation — it
   * only controls how many tags are visibly rendered.
   * @default 5
   */
  multiSelectLimit?: TMultiple extends true ? number : never;

  /**
   * Name of the select. Used to pass data when submitted within a form.
   */
  name?: string;

  /**
   * If `true`, the select will render a native select element instead of the custom select. This is for use in contexts where the select's popover may not work, such as within modals or tables, or when you want to use the native select's features such as optgroups.
   */
  native?: TNative;

  /**
   * Callback fired when the user has completely blurred away from the Select. This is to kill the blur event bubbling.
   * (component is no longer in focus and popover is closed).
   */
  onBlur?: (event: Event | React.FocusEvent<HTMLElement>) => void;

  /**
   * Emitted when the value changes. Required for integration with `IressForm`.
   * When using custom `renderOptions`, pass `handleMenuChange` to your menu's `onChange` to ensure this callback fires.
   */
  onChange?: SelectChangeEvent<TMultiple, TNative>;

  /**
   * The available options that the user can select from.
   */
  options:
    | FormattedLabelValueMeta[]
    | ((query: string) => Promise<LabelValueMeta[]>);

  /**
   * Placeholder, shown when there is nothing selected.
   */
  placeholder?: TNative extends true ? string : ReactNode;

  /**
   * Renders the select as read-only.
   */
  readOnly?: FormControlReadOnly;

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
  value?: SelectValue<TMultiple, TNative>;

  /*
   * Whether the focus is virtual (using `aria-activedescendant`, usually for screen readers).
   * By default it will be set based on whether the options are asynchronous (false) or not (true), as asynchronous options passes focus to the search component.
   * If you are customising using `renderOptions`, you may need to set this manually.
   */
  virtualFocus?: boolean;

  /**
   * Text to be displayed when the options function errors out. It is not used when the options are provided as an array.
   * Can be a ReactNode or a render function that receives the error value.
   * @default <IressAlert status="danger" variant="full-width" mb="none">An unknown error occurred. Please contact support if the error persists.</IressAlert>
   */
  errorText?: ((error: boolean | string) => ReactNode) | ReactNode;

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
};

export interface SelectLabelRenderProps<TMultiple extends boolean = false> {
  /**
   * Close the popover menu.
   */
  close: () => void;

  disabled?: boolean;

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
   * Sets the value (selected items) of the select without triggering the `onChange` callback.
   * Use this for programmatic value updates where you don't need change notification.
   * When using `renderOptions`, prefer `handleMenuChange` if you need `onChange` to fire instead of calling `setValue` directly.
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

export interface SelectOptionsRenderProps<
  TMultiple extends boolean = false,
> extends SelectLabelRenderProps<TMultiple> {
  /**
   * The query value that was used to filter the items (may be different from query).
   */
  debouncedQuery: string;

  /**
   * Clears the current selection in the menu.
   */
  handleClear: IressButtonProps['onClick'] & IressButtonProps['onKeyDown'];

  /**
   * When the menu selection changes, this will set the value, close the menu, and trigger the `onChange` callback.
   * Use this instead of `setValue` inside custom `renderOptions` to ensure `onChange` is called.
   */
  handleMenuChange: IressSelectMenuProps<TMultiple>['onChange'];

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

const isLabelValueMeta = (
  value: FormControlValue | LabelValueMeta,
): value is LabelValueMeta =>
  typeof value === 'object' && value !== null && 'label' in value;

const findOptionByValue = (
  targetValue: FormControlValue,
  options: LabelValueMeta[],
): LabelValueMeta | undefined => {
  for (const option of options) {
    if (option.children) {
      const found = findOptionByValue(targetValue, option.children);
      if (found) return found;
    } else if (option.value !== undefined && option.value === targetValue) {
      return option;
    }
  }
  return undefined;
};

const resolveValueToLabelValueMeta = (
  value: FormControlValue | LabelValueMeta,
  options:
    | FormattedLabelValueMeta[]
    | ((query: string) => Promise<LabelValueMeta[]>),
): LabelValueMeta | undefined => {
  if (isLabelValueMeta(value)) return value;
  if (typeof options === 'function') return undefined;
  return (
    findOptionByValue(value, options) ??
    (typeof value === 'number'
      ? findOptionByValue(String(value), options)
      : undefined)
  );
};

const resolveSelectValueProp = <TMultiple extends boolean = false>(
  value:
    | ControlledValue<LabelValueMeta, TMultiple>
    | ControlledValue<FormControlValue, TMultiple>
    | undefined,
  options:
    | FormattedLabelValueMeta[]
    | ((query: string) => Promise<LabelValueMeta[]>),
): ControlledValue<LabelValueMeta, TMultiple> | undefined => {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) {
    const input = value as (FormControlValue | LabelValueMeta)[];
    const resolved = input
      .map((v) => resolveValueToLabelValueMeta(v, options))
      .filter((v): v is LabelValueMeta => v !== undefined);
    if (resolved.length < input.length && typeof options !== 'function') {
      idsLogger(
        `IressSelect: ${input.length - resolved.length} value(s) could not be resolved to matching options and were dropped.`,
        'warn',
      );
    }
    return resolved as ControlledValue<LabelValueMeta, TMultiple>;
  }
  return resolveValueToLabelValueMeta(value, options) as
    | ControlledValue<LabelValueMeta, TMultiple>
    | undefined;
};

const Select = <
  TMultiple extends boolean = false,
  TNative extends boolean | Breakpoints = false,
>(
  {
    align = 'bottom-start',
    autoHighlight = true,
    className,
    defaultValue,
    disabled,
    errorText,
    footer,
    header,
    id,
    matchActivatorWidth = true,
    multiSelect,
    multiSelectLimit,
    name,
    onChange,
    onBlur,
    options,
    native: nativeProp,
    placeholder,
    readOnly,
    renderHiddenInput,
    renderLabel,
    renderOptions,
    required,
    type: typeProp,
    value: valueProp,
    virtualFocus: virtualFocusProp,
    width,
    ...richSelectProps
  }: IressSelectProps<TMultiple, TNative>,
  ref: ForwardedRef<SelectRef<TNative>>,
) => {
  useNoDefaultValueInForms({
    component: 'IressSelect',
    defaultValue,
  });

  const [show, setShow] = useState(false);
  const showPopover = show && !disabled;
  const [query, setQuery] = useState('');

  const resolvedValueProp = useMemo(
    () => resolveSelectValueProp(valueProp, options),
    [valueProp, options],
  );

  const resolvedDefaultValue = useMemo(
    () => resolveSelectValueProp(defaultValue, options),
    [defaultValue, options],
  );

  useEffect(() => {
    if (
      valueProp !== undefined &&
      !isLabelValueMeta(valueProp as FormControlValue | LabelValueMeta) &&
      resolvedValueProp === undefined &&
      typeof options === 'function'
    ) {
      idsLogger(
        'IressSelect: A primitive value was passed but cannot be resolved because options are asynchronous. Pass a LabelValueMeta object instead when using async options, otherwise the component will behave as uncontrolled.',
        'warn',
      );
    }
  }, [valueProp, resolvedValueProp, options]);

  const { value, setValue, getValuesString, getLabelsString } = useSelectState({
    component: 'IressSelect',
    defaultValue: resolvedDefaultValue as
      | ControlledValue<LabelValueMeta, TMultiple>
      | undefined,
    multiple: multiSelect,
    value: resolvedValueProp as
      | ControlledValue<LabelValueMeta, TMultiple>
      | undefined,
  });
  const popoverRef = useRef<PopoverRef | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const { value: native } = useResponsiveProps(
    typeof nativeProp === 'string'
      ? { xs: true, [nativeProp]: false }
      : { xs: nativeProp },
    {
      disabled: !nativeProp,
    },
  );

  const {
    append,
    debounceThreshold,
    initialOptions,
    minSearchLength,
    onActivated,
    onDeactivated,
    prepend,
    selectedOptionsText,
    ...restProps
  } = richSelectProps as IressSelectProps<false, false>;

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
    disabled: !show || !!native,
    initialOptions,
    minSearchLength,
    options,
    query,
  });

  useImperativeHandle(ref, () => {
    if (native) {
      return {
        focus: () => selectRef.current?.focus(),
        blur: () => selectRef.current?.blur(),
        input: selectRef.current ?? null,
      } as SelectRef<TNative>;
    }

    if (!popoverRef.current) {
      return {
        hiddenInput: hiddenInputRef.current ?? undefined,
        input: hiddenInputRef.current ?? null,
        focus: () => hiddenInputRef.current?.focus(),
        blur: () => hiddenInputRef.current?.blur(),
      } as SelectRef<TNative>;
    }

    return {
      ...popoverRef.current,
      focus: () => popoverRef.current?.getActivator()?.focus(),
      blur: () => popoverRef.current?.getActivator()?.blur(),
      hiddenInput: hiddenInputRef.current ?? undefined,
      input: hiddenInputRef.current ?? null,
    } as SelectRef<TNative>;
  }, [native]);

  useEffect(() => {
    if (show) {
      onActivated?.();
    } else {
      onDeactivated?.();
    }
  }, [onActivated, onDeactivated, show]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (!onBlur) return;

      // Check if the related target (where focus is moving to) is outside the IressField component
      const currentTarget = event.currentTarget;
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
      <IressReadonly
        value={getValuesString()}
        ref={hiddenInputRef}
        variant={readOnly}
        name={name}
        disabled={disabled}
        required={required}
      >
        {getLabelsString(', ')}
      </IressReadonly>
    );
  }

  if (native) {
    if (options instanceof Function) {
      throw new Error(
        '[IressSelect] The native select does not support asynchronous options. Please provide options as an array.',
      );
    }

    if (multiSelect) {
      throw new Error(
        '[IressSelect] The native select does not support multiple selection. Please remove the multiSelect prop or use the non-native select.',
      );
    }

    return (
      <NativeSelect
        className={cx(className, GlobalCSSClass.Select)}
        data-testid={restProps['data-testid']}
        disabled={disabled}
        id={id}
        name={name}
        onChange={(e, value) => {
          (onChange as SelectChangeEvent<false, true>)?.(
            e,
            value?.value ?? null,
            value,
          );
          setValue(
            value as ControlledValue<LabelValueMeta, TMultiple> | undefined,
          );
        }}
        options={options}
        placeholder={
          typeof nativeProp === 'string'
            ? ((placeholder as string) ?? '')
            : (placeholder as string)
        }
        style={restProps.style}
        value={value as LabelValueMeta | undefined}
        width={width}
        ref={selectRef}
      />
    );
  }

  const isAsync = typeof options === 'function';
  const virtualFocus = virtualFocusProp ?? !isAsync;
  const type = typeProp ?? (isAsync ? undefined : 'listbox');

  const classes = select({ width });

  /**
   * When the popover is activated, open the popover.
   * We control it inside IressSelect to allow closing of the popover in selection scenarios.
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
      <SelectHiddenInput
        data-testid={restProps['data-testid']}
        getValuesString={getValuesString}
        name={name}
        renderHiddenInput={renderHiddenInput}
        required={required}
        value={value}
        disabled={disabled}
        ref={hiddenInputRef}
      />
      <IressPopover
        {...(restProps as Omit<
          IressSelectProps<TMultiple, false>,
          'defaultValue' | 'onChange' | 'width'
        >)}
        activator={
          <SelectActivator
            append={append}
            async={isAsync}
            disabled={disabled}
            error={error}
            id={id}
            loading={loading}
            multiSelect={multiSelect}
            multiSelectLimit={multiSelectLimit}
            onChange={onChange as SelectChangeEvent<TMultiple, false>}
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
        className={cx(className, classes.root, GlobalCSSClass.Select)}
        contentClassName={cx(classes.popoverContent)}
        contentStyle={{
          ...restProps.contentStyle,
          p: 'none',
        }}
        matchActivatorWidth={matchActivatorWidth}
        onActivated={handlePopoverActivated}
        onDeactivated={handlePopoverDeactivated}
        ref={popoverRef}
        show={showPopover}
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
            errorText={errorText}
            initialOptions={initialOptions}
            loading={loading}
            minSearchLength={minSearchLength}
            multiSelect={multiSelect}
            onChange={onChange as SelectChangeEvent<TMultiple, false>}
            options={options}
            query={query}
            renderOptions={renderOptions}
            results={results}
            setQuery={setQuery}
            setShow={setShow}
            setValue={setValue}
            shouldShowInstructions={shouldShowInstructions}
            shouldShowNoResults={shouldShowNoResults}
            show={showPopover}
            value={value}
          />
          {footer}
        </div>
      </IressPopover>
    </>
  );
};

export const IressSelect = forwardRef(Select) as (<
  TMultiple extends boolean = false,
  TNative extends boolean | Breakpoints = false,
>(
  props: IressSelectProps<TMultiple, TNative> & {
    ref?: ForwardedRef<SelectRef<TNative>>;
  },
) => ReactElement) & {
  displayName: 'IressSelect';
};

IressSelect.displayName = 'IressSelect';

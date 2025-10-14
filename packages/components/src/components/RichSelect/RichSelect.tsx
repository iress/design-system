import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import styles from './RichSelect.module.scss';
import {
  IressPopover,
  type IressPopoverProps,
  type PopoverRef,
} from '../Popover';
import { useRichSelectState } from '../RichSelect';
import { useAutocompleteSearch } from '../Autocomplete';
import {
  type IressRichSelectProps,
  type RichSelectRef,
} from './RichSelect.types';
import { SelectActivator } from './components/SelectActivator';
import { SelectOptions } from './components/SelectOptions';
import { SelectHiddenInput } from './components/SelectHiddenInput';
import { GlobalCSSClass, IressReadonly } from '@/main';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';

export const IressRichSelect = forwardRef(
  (
    {
      align = 'bottom-start',
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
      name,
      multiSelect,
      onActivated,
      onDeactivated,
      onChange,
      onBlur,
      options,
      placeholder,
      readonly,
      renderHiddenInput,
      renderLabel,
      renderOptions,
      renderOptionsFooter,
      required,
      type: typeProp,
      value: valueProp,
      width = '100perc',
      virtualFocus: virtualFocusProp,
      ...restProps
    }: IressRichSelectProps,
    ref: React.ForwardedRef<RichSelectRef>,
  ) => {
    useNoDefaultValueInForms({
      component: 'IressRichSelect',
      defaultValue,
    });

    const [show, setShow] = useState(false);
    const [query, setQuery] = useState('');
    const [activatorWidth, setActivatorWidth] = useState<number | undefined>(
      undefined,
    );
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
        return { hiddenInput: hiddenInputRef.current ?? undefined };
      }

      return {
        ...popoverRef.current,
        focus: () => popoverRef.current?.getActivator()?.focus(),
        blur: () => popoverRef.current?.getActivator()?.blur(),
        hiddenInput: hiddenInputRef.current ?? undefined,
      };
    });

    useEffect(() => {
      if (show) {
        onActivated?.();

        // Measure activator width when matchActivatorWidth is true (to maintain width)
        if (matchActivatorWidth && popoverRef.current) {
          const activator = popoverRef.current.getActivator();
          if (activator) {
            const rect = activator.getBoundingClientRect();
            setActivatorWidth(rect.width);
          }
        }
      } else {
        onDeactivated?.();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- others are optional props
    }, [show, matchActivatorWidth]);

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        if (!onBlur) return;

        // Check if the related target (where focus is moving to) is outside the IressField component
        const currentTarget = event.currentTarget as HTMLElement;
        const relatedTarget = event.relatedTarget as HTMLElement;

        // If there's no related target or it's not contained within the current field component
        if (
          !show &&
          (!relatedTarget || !currentTarget.contains(relatedTarget))
        ) {
          onBlur(event);
        }
        event.stopPropagation();
      },
      [onBlur, show],
    );

    if (readonly) {
      return (
        <IressReadonly value={getValuesString()}>
          {getLabelsString(', ')}
        </IressReadonly>
      );
    }

    const isAsync = typeof options === 'function';
    const virtualFocus = virtualFocusProp ?? !isAsync;
    const type = typeProp ?? (isAsync ? undefined : 'listbox');

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
              async={isAsync}
              error={error}
              id={id}
              loading={loading}
              multiSelect={multiSelect}
              onChange={onChange}
              placeholder={placeholder}
              renderLabel={renderLabel}
              setValue={setValue}
              setShow={setShow}
              show={show}
              value={value}
            />
          }
          align={align}
          className={classNames(className, styles.richSelect, {
            [GlobalCSSClass.IgnoreStack]: !!width,
            [`${GlobalCSSClass.Width}--${width}`]: !!width,
          })}
          contentClassName={classNames(styles.popoverContent, {
            [styles.autoWidth]: matchActivatorWidth,
          })}
          style={
            matchActivatorWidth && activatorWidth
              ? ({
                  '--activator-width': `${activatorWidth}px`,
                } as React.CSSProperties)
              : undefined
          }
          matchActivatorWidth={true}
          onActivated={handlePopoverActivated}
          onDeactivated={handlePopoverDeactivated}
          ref={popoverRef}
          show={show}
          type={type}
          virtualFocus={virtualFocus}
          onBlur={handleBlur}
        >
          <div className={styles.wrapper}>
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
              renderOptionsFooter={renderOptionsFooter}
              results={results}
              setQuery={setQuery}
              setShow={setShow}
              setValue={setValue}
              show={show}
              value={value}
              shouldShowInstructions={shouldShowInstructions}
              shouldShowNoResults={shouldShowNoResults}
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
  },
);

IressRichSelect.displayName = 'IressRichSelect';

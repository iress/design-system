import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from '../Combobox.module.scss';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { toArray } from '@helpers/formatting/toArray';
import { IressInputPopover, type IressInputPopoverProps } from '../../Popover';
import {
  type IressSelectMenuProps,
  useRichSelectState,
} from '../../RichSelect';
import { type IressInputProps } from '../../Input';
import { IressIcon } from '../../Icon';
import { useAutocompleteSearch } from '../../Autocomplete';
import { useIdIfNeeded } from '@/hooks';
import { ComboboxResultsDescriptor } from '../components/ComboboxResultsDescriptor';
import { useComboboxFlags } from '../hooks/useComboboxFlags';
import { type IressMultiComboboxProps } from './MultiCombobox.types';
import { type FormControlValue, IressReadonly } from '@/main';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { ComboboxResults } from '../components/ComboboxResults';
import { ComboboxHiddenInput } from '../components/ComboboxHiddenInput';
import { type TagListInputProps } from '@/components/Tag/components/TagListInput/TagListInput.types';
import { TagListInput } from '@/components/Tag/components/TagListInput/TagListInput';
import { useNoDefaultValueInForms } from '@/components/Form/hooks/useNoDefaultValueInForms';

/**
 * @deprecated IressMultiCombobox is now deprecated and may be removed in a future version. Please use the new IressRichSelect component instead, with multiSelect set to true.
 * Although still in beta, IressRichSelect is likely the user experience we will be using going forward for rich selects. Please use it in new development, and give feedback to the IDS team.
 */
export const IressMultiCombobox = forwardRef(
  (
    {
      append = <IressIcon name="search" />,
      autoComplete = 'off',
      autoSelect = true,
      className,
      clearable = true,
      'data-testid': dataTestId,
      debounceThreshold,
      defaultValue,
      hiddenInputProps,
      id: idProp,
      initialOptions,
      limitDesktop = 12,
      limitMobile = 6,
      multiOptionTagLimit = 4,
      name,
      noResultsText,
      onChange,
      onClear,
      options,
      popoverProps: {
        autoHighlight = false,
        append: popoverAppend,
        prepend: popoverPrepend,
        ...popoverProps
      } = {},
      readOnly,
      required,
      selectedOptionsTagText = 'options selected',
      type = 'search',
      value: valueProp,
      watermark = true,
      ...restProps
    }: IressMultiComboboxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    useNoDefaultValueInForms({
      component: 'IressMultiCombobox',
      defaultValue,
    });

    const id = useIdIfNeeded({ id: idProp });
    const screenreaderId = `${id}-sr-text`;

    const [show, setShow] = useState(false);
    const {
      value,
      setValue,
      getValuesString,
      getLabelsArray,
      getLabelsString,
    } = useRichSelectState({
      component: 'IressMultiCombobox',
      defaultValue,
      multiple: true,
      value: valueProp,
    });
    const [query, setQuery] = useState('');

    const {
      debouncedQuery,
      loading,
      results,
      stopSearch,
      shouldShowInstructions,
      shouldShowDebounceWaiting,
      shouldShowNoResults,
      displayResults,
    } = useAutocompleteSearch({
      debounceThreshold,
      initialOptions,
      options,
      query,
    });

    const flags = useComboboxFlags({
      debouncedQuery,
      loading,
      results,
      shouldShowInstructions,
      shouldShowDebounceWaiting,
      shouldShowNoResults,
      displayResults,
    });

    if (readOnly) {
      return (
        <IressReadonly value={getValuesString()}>
          {getLabelsString(', ')}
        </IressReadonly>
      );
    }

    const handleQueryChange: IressInputProps['onChange'] = (e) => {
      setQuery(e.target.value);
    };

    const handleQueryClear: IressInputProps['onClear'] = (e) => {
      onClear?.(e);
      setQuery('');
      setValue([]);
    };

    const handleQueryKeyDown: IressInputProps['onKeyDown'] = (e) => {
      if (query) return;

      if (e.key === 'Backspace') {
        const newValue = toArray(value).slice(0, -1);
        onChange?.(getValueAsEvent(newValue), newValue);
        setValue(newValue);
      }
    };

    const handleMenuChange: IressSelectMenuProps['onChange'] = (selected) => {
      const existingValues: FormControlValue[] = [];
      const uniqueSelected = toArray(selected).filter((newItem) => {
        const itemValue = newItem.value ?? newItem.label;
        if (existingValues.includes(itemValue)) return false;
        existingValues.push(itemValue);
        return true;
      });

      onChange?.(getValueAsEvent(uniqueSelected), uniqueSelected);
      setValue(uniqueSelected);
    };

    const handleTagDelete: TagListInputProps['onTagDelete'] = (label) => {
      const newValue = toArray(value).filter((item) => item.label !== label);
      onChange?.(getValueAsEvent(newValue), newValue);
      setValue(newValue);
    };

    const handleTagDeleteAll: TagListInputProps['onTagDeleteAll'] = () => {
      onChange?.(getValueAsEvent([]), []);
      setValue([]);
    };

    const handlePopoverDeactivated: IressInputPopoverProps['onDeactivated'] =
      () => {
        setShow(false);
        stopSearch();
      };

    return (
      <div
        className={classNames(className, styles.combobox)}
        data-testid={dataTestId}
      >
        <IressInputPopover
          {...popoverProps}
          activator={
            <TagListInput
              {...restProps}
              append={append}
              aria-describedby={screenreaderId}
              autoComplete={autoComplete}
              clearable={clearable}
              data-testid={propagateTestid(dataTestId, 'input')}
              id={id}
              loading={loading}
              minLength={initialOptions?.length ? 0 : restProps.minLength}
              onChange={handleQueryChange}
              onClear={handleQueryClear}
              onKeyDown={handleQueryKeyDown}
              onTagDelete={handleTagDelete}
              onTagDeleteAll={handleTagDeleteAll}
              selectedOptionsTagText={selectedOptionsTagText}
              tagLimit={multiOptionTagLimit}
              tags={getLabelsArray()}
              type={type}
              value={query}
              watermark={watermark}
            />
          }
          autoHighlight={autoHighlight}
          className={classNames(className, styles.input)}
          contentClassName={styles.popoverContent}
          onActivated={() => setShow(true)}
          onDeactivated={handlePopoverDeactivated}
          show={show}
          type="listbox"
          data-testid={propagateTestid(dataTestId, 'popover')}
        >
          <ComboboxResults
            append={popoverAppend}
            changeOnBlur={autoSelect}
            dataTestId={dataTestId}
            limitDesktop={limitDesktop}
            limitMobile={limitMobile}
            multiSelect
            noResultsText={noResultsText}
            onChange={handleMenuChange}
            prepend={popoverPrepend}
            items={results}
            selected={value}
            selectedFirst
            showNoResults={flags.showNoResults}
            showResults={flags.showResults}
          />
        </IressInputPopover>
        <ComboboxHiddenInput
          hiddenInputProps={hiddenInputProps}
          dataTestId={dataTestId}
          name={name}
          ref={ref}
          required={required}
          value={getValuesString()}
        />
        <ComboboxResultsDescriptor
          data-testid={propagateTestid(dataTestId, 'results-sr-text')}
          id={screenreaderId}
          loading={loading}
          noResultsText={noResultsText}
          results={results}
        />
      </div>
    );
  },
);

IressMultiCombobox.displayName = 'IressMultiCombobox';

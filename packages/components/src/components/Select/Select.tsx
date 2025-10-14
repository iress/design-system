import * as React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import {
  type IressSelectProps,
  type SelectRef,
  type SelectWithEnums,
} from './Select.types';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { FormElementWidth, GlobalCSSClass } from '@/enums';
import { useIdIfNeeded } from '../../hooks';
import styles from './Select.module.scss';
import {
  mapNodesToSelectOptions,
  findValueFromStringInSelectOptions,
} from './helpers/nodesToSelectOptions';
import { useControlledState } from '@/hooks/useControlledState';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { SelectReadonly } from './components/SelectReadonly';
import { SelectControl } from './components/SelectControl';
import { useNoDefaultValueInForms } from '../Form/hooks/useNoDefaultValueInForms';

const Select = (
  {
    children,
    className,
    'data-testid': dataTestid,
    onChange,
    readonly,
    value: valueProp,
    defaultValue,
    width,
    style,
    ...restProps
  }: IressSelectProps,
  ref: React.Ref<SelectRef>,
) => {
  useNoDefaultValueInForms({
    component: 'IressSelect',
    defaultValue,
  });

  const id = useIdIfNeeded(restProps);
  const elementRef: React.MutableRefObject<SelectRef> = useRef<SelectRef>(null);
  const { value, setValue } = useControlledState({
    component: 'IressSelect',
    defaultValue,
    value: valueProp,
  });

  const getNodeValue = React.useCallback(
    (value: string) => {
      return findValueFromStringInSelectOptions(
        value,
        mapNodesToSelectOptions(children as React.JSX.Element[]),
      );
    },
    [children],
  );

  useImperativeHandle(ref, () => elementRef.current);

  return (
    <div
      data-testid={dataTestid}
      className={classNames(
        className,
        styles.select,
        GlobalCSSClass.FormElement,
        {
          [GlobalCSSClass.IgnoreStack]: !!width,
          [`${GlobalCSSClass.Width}--${width}`]: !!width,
        },
      )}
      style={readonly ? undefined : style}
    >
      {readonly ? (
        <SelectReadonly
          data-testid={propagateTestid(dataTestid, 'select')}
          id={id}
          name={restProps.name}
          ref={(element) => (elementRef.current = element)}
          style={style}
          value={value}
          width={width}
        >
          {children}
        </SelectReadonly>
      ) : (
        <SelectControl
          {...restProps}
          data-testid={propagateTestid(dataTestid, 'select')}
          id={id}
          onChange={(event) => {
            const nodeValue = getNodeValue(event.currentTarget.value);
            setValue(nodeValue);
            onChange?.(event, nodeValue);
          }}
          ref={(element) => {
            elementRef.current = element;

            if (!value && element?.value) {
              const nodeValue = getNodeValue(element.value);
              setValue(nodeValue);
              onChange?.(getValueAsEvent(element.value), nodeValue);
            }
          }}
          value={value}
        >
          {children}
        </SelectControl>
      )}
    </div>
  );
};

export const IressSelect = forwardRef(Select) as SelectWithEnums;

/** @deprecated IressSelect.Width will be removed in future versions of IDS. Please use the value directly. */
IressSelect.Width = FormElementWidth;

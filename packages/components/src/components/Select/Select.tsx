import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { useIdIfNeeded } from '../../hooks';
import {
  mapNodesToSelectOptions,
  findValueFromStringInSelectOptions,
} from './helpers/nodesToSelectOptions';
import { useControlledState } from '@/hooks/useControlledState';
import { getValueAsEvent } from '@helpers/form/getValueAsEvent';
import { SelectReadonly } from './components/SelectReadonly';
import { SelectControl } from './components/SelectControl';
import { FormControlValue, IressStyledProps } from '@/types';
import { IressInputProps } from '../Input';
import { select } from './Select.styles';
import { input } from '../Input/Input.styles';
import { css, cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { splitCssProps } from '@/styled-system/jsx';
import { useNoDefaultValueInForms } from '@/patterns/Form/hooks/useNoDefaultValueInForms';

type SelectElement<TReadonly extends boolean | undefined = undefined> =
  TReadonly extends true ? 'div' : 'select';

export type IressSelectProps<
  T extends FormControlValue = FormControlValue,
  TReadonly extends boolean | undefined = undefined,
> = Omit<
  IressStyledProps<SelectElement<TReadonly>>,
  'defaultValue' | 'value' | 'onChange' | 'width'
> & {
  /**
   * The `option` and `optgroup` elements to render within the select.
   */
  children?: ReactNode | string;

  /**
   * Value of selected option for uncontrolled select.
   */
  defaultValue?: T;

  /**
   * Identifier for select.
   */
  name?: string;

  /**
   * Handles the onChange event of the select input.
   * If you pass in a non-string value, you can access it using the second parameter of the function.
   */
  onChange?: (e: ChangeEvent<HTMLSelectElement>, value?: T) => void;

  /**
   * If `true`, the user cannot modify the value.
   */
  readOnly?: TReadonly;

  /**
   * Mark the select as a required field.
   */
  required?: boolean;

  /**
   * Value of selected option for controlled select.
   */
  value?: T;

  /**
   * Adds an `option` as the first element with the placeholder text and no value.
   */
  placeholder?: string;

  /**
   * The width of the select.
   */
  width?: IressInputProps['width'];
};

const Select = <
  T extends FormControlValue = FormControlValue,
  TReadonly extends boolean | undefined = undefined,
>(
  {
    children,
    className,
    'data-testid': dataTestid,
    defaultValue,
    onChange,
    readOnly,
    style,
    value: valueProp,
    width,
    ...restProps
  }: IressSelectProps<T, TReadonly>,
  ref: ForwardedRef<HTMLElementTagNameMap[SelectElement<TReadonly>]>,
) => {
  useNoDefaultValueInForms({
    component: 'IressSelect',
    defaultValue,
  });

  const id = useIdIfNeeded(restProps as IressStyledProps);
  const elementRef = useRef<
    HTMLElementTagNameMap[SelectElement<TReadonly>] | null
  >(null);
  const { value, setValue } = useControlledState<T, false>({
    component: 'IressSelect',
    defaultValue,
    value: valueProp,
  });
  const rawStyles = select.raw({ width });

  const [styleProps, nonStyleProps] = splitCssProps(restProps);

  const getNodeValue = useCallback(
    (value: string) => {
      return findValueFromStringInSelectOptions<T>(
        value,
        mapNodesToSelectOptions(children as never),
      );
    },
    [children],
  );

  const setElementRef = useCallback((element: HTMLElement | null) => {
    elementRef.current =
      element as HTMLElementTagNameMap[SelectElement<TReadonly>];
  }, []);

  useImperativeHandle(ref, () => elementRef.current!);

  return (
    <div
      data-testid={dataTestid}
      className={cx(
        className,
        css(input.raw({ readOnly }).wrapper, rawStyles.wrapper, styleProps),
        GlobalCSSClass.FormElement,
        GlobalCSSClass.Select,
      )}
      style={readOnly ? undefined : style}
    >
      {readOnly ? (
        <SelectReadonly
          {...(nonStyleProps as IressSelectProps<T, true>)}
          data-testid={propagateTestid(dataTestid, 'select')}
          id={id}
          name={restProps.name}
          ref={setElementRef}
          style={style}
          value={value}
          width={width}
        >
          {children}
        </SelectReadonly>
      ) : (
        <SelectControl
          {...(nonStyleProps as IressSelectProps<T, undefined>)}
          data-testid={propagateTestid(dataTestid, 'select')}
          id={id}
          onChange={(
            event: ChangeEvent<HTMLElementTagNameMap[SelectElement<undefined>]>,
          ) => {
            const nodeValue = getNodeValue(event.currentTarget.value);
            setValue(nodeValue);
            onChange?.(event, nodeValue);
          }}
          ref={(element) => {
            setElementRef(element);

            if (!value && element?.value) {
              const nodeValue = getNodeValue(element.value);
              setValue(nodeValue);
              onChange?.(getValueAsEvent(element.value), nodeValue);
            }
          }}
          value={value}
          width={width}
        >
          {children}
        </SelectControl>
      )}
    </div>
  );
};

export const IressSelect = forwardRef(Select) as <
  T extends FormControlValue = FormControlValue,
  TReadonly extends boolean | undefined = undefined,
>(
  props: IressSelectProps<T, TReadonly> & {
    ref?: ForwardedRef<HTMLElementTagNameMap[SelectElement<TReadonly>]>;
  },
) => ReactElement;

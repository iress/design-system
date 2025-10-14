import { type MouseEvent, forwardRef, useId } from 'react';
import classNames from 'classnames';
import {
  ButtonMode,
  ButtonType,
  type IressButtonProps,
  type ButtonComponent,
  ButtonCssClass,
  type ButtonRef,
} from './Button.types';
import { IressSpinner, type IressSpinnerProps } from '../Spinner';
import { GlobalCSSClass, Breakpoint } from '@/enums';
import { useIDSButtonGroupItem } from '../ButtonGroup/hooks/useIDSButtonGroupItem';

const ButtonSpinner = ({
  loading,
  ...restProps
}: Pick<IressButtonProps, 'loading'> & IressSpinnerProps) => {
  if (!loading) return null;
  return (
    <IressSpinner
      {...restProps}
      fixedWidth
      screenreaderText={loading === true ? 'Loading' : loading}
    />
  );
};

const Button = (
  {
    append,
    attrs,
    children,
    className,
    fluid = false,
    href,
    loading = false,
    mode = 'secondary',
    prepend,
    rel,
    target,
    type = 'button',
    noWrap = false,
    onClick: clickCb,
    value: valueProp,
    ...restProps
  }: IressButtonProps,
  ref: React.Ref<ButtonRef>,
) => {
  const spinnerId = useId();
  const value =
    valueProp ??
    (typeof children === 'string' ||
    typeof children === 'number' ||
    typeof children === 'boolean'
      ? children
      : undefined);
  const buttonGroupItem = useIDSButtonGroupItem({ value });

  const classMap = {
    [ButtonCssClass.Base]: true,
    [ButtonCssClass.Fluid]: fluid === true,
    [`${ButtonCssClass.Mode}--${mode}`]: !buttonGroupItem,
    [ButtonCssClass.NoWrap]: noWrap === true,
    [ButtonCssClass.Loading]: loading,
    [`${ButtonCssClass.Fluid}--${fluid}`]: typeof fluid === 'string',
  };

  const TagType: 'button' | 'a' = href === undefined ? 'button' : 'a';
  const eleAttrs =
    TagType === 'button'
      ? {
          type,
          ['aria-describedby']: loading ? spinnerId : undefined,
        }
      : { href, rel, target };

  const clickHandler = (
    e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (loading) return;
    clickCb?.(e);
    buttonGroupItem?.toggle();
  };

  return (
    <TagType
      className={classNames(
        className,
        buttonGroupItem?.className,
        GlobalCSSClass.FormElement,
        GlobalCSSClass.FormElementInner,
        classMap,
      )}
      {...eleAttrs}
      {...attrs}
      {...buttonGroupItem?.props}
      {...restProps}
      onClick={clickHandler}
      ref={ref as React.Ref<never>}
    >
      {prepend && (
        <span
          className={
            loading === true ? GlobalCSSClass.Hidden : ButtonCssClass.Prepend
          }
        >
          {prepend}
        </span>
      )}
      <ButtonSpinner loading={loading} id={spinnerId} />
      {children}
      {append}
    </TagType>
  );
};

export const IressButton = forwardRef(Button) as ButtonComponent;

/** @deprecated IressButton.Mode enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressButton.Mode = ButtonMode;
/** @deprecated IressButton.Type enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressButton.Type = ButtonType;
/** @deprecated IressButton.Fluid enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressButton.Fluid = Breakpoint;

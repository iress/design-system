import type { IressStyledProps as StyledProps } from '@/types';
import {
  type ReactNode,
  useMemo,
  type ElementType,
  type FC,
  forwardRef,
  type ComponentPropsWithRef,
} from 'react';
import { styled } from '@/styled-system/jsx';

interface IressStyledProps<T extends ElementType = 'div'> extends StyledProps {
  /**
   * Content to be styled.
   */
  children?: ReactNode;

  /**
   * The HTML element or custom component to render.
   */
  element?: T;
}

type IressStyledComponent = (<E extends ElementType = 'div'>(
  props: IressStyledProps<E> & {
    ref?: ComponentPropsWithRef<E>['ref'];
  },
) => ReactNode) & { displayName?: 'IressStyled' };

export const IressStyled = forwardRef(
  <E extends ElementType = 'div'>(
    props: IressStyledProps<E>,
    ref: ComponentPropsWithRef<E>['ref'],
  ) => {
    const Component = useMemo(
      () =>
        styled(props.element ?? 'div') as FC<
          IressStyledProps<E> & Pick<ComponentPropsWithRef<E>, 'ref'>
        >,
      [props.element],
    );

    return <Component {...props} ref={ref} />;
  },
) as IressStyledComponent;

IressStyled.displayName = 'IressStyled';

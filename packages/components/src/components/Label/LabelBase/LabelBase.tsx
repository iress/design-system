import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { type ReactNode, useState, useMemo, type FC } from 'react';
import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { label } from '../Label.styles';
import { cx } from '@/styled-system/css';

export type LabelBaseProps<E extends 'label' | 'strong' | 'legend' = 'label'> =
  IressStyledProps<E> & {
    /**
     * Content to be appended to the label.
     * This is not affected by the `hiddenLabel` prop.
     */
    append?: ReactNode;

    /**
     * Content to be displayed in the label.
     * This can also include error messages to make sure it makes sense in this context.
     */
    children: ReactNode;

    /**
     * The base tag of the label.
     * @default label
     */
    element?: E;

    /**
     * Visually hides the label text, but still available to screen readers.
     */
    hiddenLabel?: boolean;

    /**
     * When set to true, the 'required asterisk (*)' is displayed next to the label text.
     */
    required?: boolean;
  };

export const LabelBase = <E extends 'label' | 'strong' | 'legend' = 'label'>({
  append,
  children,
  className,
  'data-testid': dataTestId,
  element,
  hiddenLabel = false,
  required,
  ...restProps
}: LabelBaseProps<E>) => {
  const [name, setName] = useState<string | undefined>();
  const classes = label({ hasAppend: !!append, hiddenLabel });

  // Update the name state when the text content of the label changes
  // This allows other components to access the label text without the noise of the required/optional text and appended content
  const updateName = (element: HTMLElement | null) => {
    const newName = element?.textContent;

    if (newName && newName !== name) {
      setName(newName);
    }
  };

  const Tag = useMemo(
    () => styled(element ?? 'label') as FC<typeof restProps>,
    [element],
  );

  return (
    <Tag
      className={cx(
        className,
        GlobalCSSClass.FormLabel,
        GlobalCSSClass.Label,
        classes.root,
      )}
      data-testid={dataTestId}
      {...restProps}
      data-name={name}
    >
      {required && (
        <>
          {!hiddenLabel && (
            <span className={classes.required} aria-hidden>
              *
            </span>
          )}
          <styled.span srOnly>Required</styled.span>
        </>
      )}
      <styled.span
        className={classes.text}
        data-testid={propagateTestid(dataTestId, 'text')}
        ref={updateName}
        srOnly={hiddenLabel}
      >
        {children}
      </styled.span>
      {append}
    </Tag>
  );
};

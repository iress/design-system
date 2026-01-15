import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import {
  type ReactNode,
  useState,
  useMemo,
  type FC,
  type SVGProps,
} from 'react';
import { type IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { label } from '../Label.styles';
import { cx } from '@/styled-system/css';

/**
 * Material Symbols Lock icon (filled, weight 300, rounded, grade 24, optical size 24dp)
 */
export const LockIcon = ({
  title,
  ...props
}: SVGProps<SVGSVGElement> & {
  title: ReactNode;
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    {...props}
  >
    <title>{title}</title>
    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
  </svg>
);

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
     * When set to true, displays a lock icon before the label text to indicate
     * the field is locked due to permission restrictions.
     */
    locked?: boolean;

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
  locked,
  required,
  ...restProps
}: LabelBaseProps<E>) => {
  const [name, setName] = useState<string | undefined>();
  const classes = label({ hasAppend: !!append, hiddenLabel, locked });

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
      {locked && (
        <LockIcon
          className={classes.lock}
          title="(Locked)"
          data-testid={propagateTestid(dataTestId, 'lock-icon')}
        />
      )}
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

LabelBase.displayName = 'LabelBase';

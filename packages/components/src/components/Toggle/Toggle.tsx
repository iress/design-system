import {
  type MouseEventHandler,
  type MouseEvent,
  useEffect,
  useId,
  type ReactNode,
  useRef,
} from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCheckboxMark } from '../CheckboxMark';
import { type IressStyledProps, type IressUnstyledProps } from '@/types';
import { toggle } from './Toggle.styles';
import { css, cx } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';
import { styled } from '@/styled-system/jsx';
import { useControlledState } from '@/hooks';

export interface IressToggleProps extends Omit<IressStyledProps, 'onChange'> {
  /**
   * If true, the toggle on.
   * Please use this when are rendering the toggle in controlled mode,
   * meaning it will not change unless you explicitly set the value using `onChange` and `checked`.
   */
  checked?: boolean;

  /**
   * Provides the label for the Toggle.
   */
  children: ReactNode;

  /**
   * If true, the toggle will be initially rendered as off.
   * Please use this when are rendering the toggle in uncontrolled mode,
   * meaning the value will change automatically when the user interacts with the toggle.
   */
  defaultChecked?: boolean;

  /**
   * Hides the label if true (label will still be read out by screen readers).
   */
  hiddenLabel?: boolean;

  /**
   * Determines the layout of the label with respect to the control.
   */
  layout?: 'inline' | 'inline-between' | 'inline-reverse' | 'stack';

  /**
   * Emitted when the checked state changes.
   */
  onChange?: (checked: boolean, event: MouseEvent<HTMLButtonElement>) => void;
}

interface ToggleLabelProps extends IressUnstyledProps {
  hiddenLabel?: IressToggleProps['hiddenLabel'];
  layout?: IressToggleProps['layout'];
}

const ToggleLabel = ({
  hiddenLabel,
  layout,
  children,
  'data-testid': testid,
  ...restProps
}: ToggleLabelProps) => {
  const classes = toggle({ hiddenLabel, layout });
  return (
    <span
      {...restProps}
      className={classes.label}
      data-testid={propagateTestid(testid, 'label')}
    >
      {children}
    </span>
  );
};

export const IressToggle = ({
  checked: checkedProp,
  hiddenLabel,
  defaultChecked,
  children,
  layout = 'inline',
  className,
  onChange,
  'data-testid': testid,
  ...restProps
}: IressToggleProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ariaId = useId();
  const toggleId = `toggleLabel--${ariaId}`;
  const labelProps = {
    hiddenLabel,
    id: toggleId,
    'data-testid': testid,
  };

  const { value: isChecked, setValue: setChecked } =
    useControlledState<boolean>({
      component: 'IressToggle',
      propName: 'checked',
      defaultValue: defaultChecked,
      value: checkedProp,
    });

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setChecked(!isChecked);
    onChange?.(!isChecked, e);
  };

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }

    buttonRef.current.classList.remove(
      css({ _before: { animationStyle: 'toggle-active' } }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- Trigger reflow
    buttonRef.current.offsetHeight;

    buttonRef.current.classList.add(
      css({ _before: { animationStyle: 'toggle-active' } }),
    );
  }, [isChecked]);

  const classes = toggle({ layout, checked: !!isChecked });

  return (
    <styled.div
      data-testid={testid}
      {...restProps}
      className={cx(className, classes.toggleBase, GlobalCSSClass.Toggle)}
    >
      <ToggleLabel {...labelProps} layout={layout}>
        {children}
      </ToggleLabel>
      <div className={classes.toggleButtonContainer}>
        <button
          className={cx(classes.toggleButton)}
          role="switch"
          type="button"
          aria-checked={!!isChecked}
          onClick={handleButtonClick}
          aria-labelledby={toggleId}
          data-testid={propagateTestid(testid, 'button__button')}
          ref={buttonRef}
        >
          <IressCheckboxMark
            className={classes.checkboxMark}
            bg="transparent"
            checked={!!isChecked}
            size="sm"
          />
        </button>
      </div>
    </styled.div>
  );
};

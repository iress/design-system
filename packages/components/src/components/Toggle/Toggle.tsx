import classNames from 'classnames';
import {
  type MouseEventHandler,
  forwardRef,
  useEffect,
  useId,
  useState,
} from 'react';
import { GlobalCSSClass } from '@/enums';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressCheckboxMark } from '../CheckboxMark';
import styles from './Toggle.module.scss';
import { ButtonCssClass } from '../Button/Button.types';
import {
  type ToggleWithEnums,
  type ToggleLabelProps,
  ToggleLayout,
  type ToggleProps,
} from './Toggle.types';

const ToggleLabel = ({
  hiddenLabel,
  children,
  'data-testid': testid,
  ...restProps
}: ToggleLabelProps) => {
  return (
    <span
      {...restProps}
      className={classNames(styles.label, {
        [GlobalCSSClass.SROnly]: hiddenLabel,
      })}
      data-testid={propagateTestid(testid, 'label')}
    >
      {children}
    </span>
  );
};

export const IressToggle = forwardRef(
  (
    {
      checked: checkedProp = false,
      hiddenLabel,
      children,
      layout = 'inline',
      className,
      onChange,
      'data-testid': testid,
      ...restProps
    }: ToggleProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const [checked, setChecked] = useState(checkedProp);
    const ariaId = useId();
    const toggleId = `toggleLabel--${ariaId}`;
    const labelProps = {
      hiddenLabel,
      id: toggleId,
      'data-testid': testid,
    };

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      setChecked(!checked);
      onChange?.(!checked, e);
    };

    useEffect(() => {
      setChecked(checkedProp);
    }, [checkedProp, onChange]);

    return (
      <div
        data-testid={testid}
        {...restProps}
        className={classNames(
          className,
          styles.toggleBase,
          styles[`layout__${layout}`],
        )}
        ref={ref}
      >
        <ToggleLabel {...labelProps}>{children}</ToggleLabel>
        <div className={styles.toggleButtonContainer}>
          <button
            className={classNames(ButtonCssClass.Base, styles.toggleButton, {
              [styles.buttonChecked]: checked,
            })}
            role="switch"
            type="button"
            aria-checked={checked}
            onClick={handleButtonClick}
            aria-labelledby={toggleId}
            data-testid={propagateTestid(testid, 'button__button')}
          >
            <IressCheckboxMark
              className={classNames(styles.checkboxMark, {
                'visibility-hidden': !checked,
              })}
              checked={checked}
            />
          </button>
        </div>
      </div>
    );
  },
) as ToggleWithEnums;

IressToggle.displayName = 'IressToggle';

/** @deprecated The IressToggle.Layout enum will be removed in future versions of IDS. Please use the value directly instead. */
IressToggle.Layout = ToggleLayout;

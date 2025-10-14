import classNames from 'classnames';
import { GlobalCSSClass } from '@/enums';
import { type IressSelectMenuItemProps } from './SelectMenu.types';
import { IressMenuDivider, IressMenuItem } from '@/components/Menu';

export const IressSelectMenuItem = ({
  className,
  divider,
  formattedLabel,
  formattedMeta,
  hiddenOnMobile,
  label,
  meta,
  value,
  append,
  canToggle,
  onClick,
  onKeyDown,
  prepend,
  role,
  selected,
  'data-testid': dataTestId,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  id,
  // Extended LabelValueMeta properties are automatically ignored
}: IressSelectMenuItemProps) => {
  if (divider) {
    return <IressMenuDivider />;
  }

  const displayMeta = formattedMeta !== undefined ? formattedMeta : meta;

  return (
    <IressMenuItem
      append={append}
      canToggle={canToggle}
      className={classNames(className, {
        [GlobalCSSClass.HiddenMobile]: hiddenOnMobile,
      })}
      onClick={onClick}
      onKeyDown={onKeyDown}
      prepend={prepend}
      role={role}
      selected={selected}
      value={value ?? label}
      data-testid={dataTestId}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
    >
      {formattedLabel ?? label}
      {displayMeta && (
        <span className="iress-display--block">{displayMeta}</span>
      )}
    </IressMenuItem>
  );
};

import { GlobalCSSClass } from '@/enums';
import { type IressSelectMenuItemProps } from './SelectMenu';
import { IressMenuDivider, IressMenuItem } from '@/components/Menu';
import { cx } from '@/styled-system/css';
import { IressText } from '@/components/Text';

/**
 * An individual item within a select menu, supporting formatted labels, meta text, and dividers.
 *
 * @example
 * ```tsx
 * import { IressSelectMenuItem } from '@iress-oss/ids-components';
 *
 * <IressSelectMenuItem label="Option 1" value="1" />
 * ```
 */
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
  // Only the explicitly listed properties are passed through; any extended LabelValueMeta properties are excluded by explicit filtering
}: IressSelectMenuItemProps) => {
  if (divider) {
    return <IressMenuDivider />;
  }

  const displayMeta = formattedMeta ?? meta;

  return (
    <IressMenuItem
      append={append}
      canToggle={canToggle}
      className={cx(className, GlobalCSSClass.SelectMenuItem)}
      hideBelow={hiddenOnMobile ? 'md' : undefined}
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
        <IressText textStyle="typography.body.sm" color="colour.neutral.70">
          {displayMeta}
        </IressText>
      )}
    </IressMenuItem>
  );
};

IressSelectMenuItem.displayName = 'IressSelectMenuItem';

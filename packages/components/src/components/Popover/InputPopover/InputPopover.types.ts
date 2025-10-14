import { type IressPopoverProps, type PopoverActivatorProps } from '@/main';

export interface IressInputPopoverProps
  extends Omit<IressPopoverProps, 'matchActivatorWidth' | 'virtualFocus'>,
    Pick<InputPopoverActivatorProps, 'minLength'> {
  /**
   * Content for an activator element, usually an `IressInput`.
   */
  activator: PopoverActivatorProps['children'];

  /**
   * If true, the first supported is automatically highlighted.
   * @default true
   */
  autoHighlight?: boolean;

  /**
   * Describes the type of content contained in the popover.
   * If `listbox`, it will add the combobox role to the popover.
   * @default listbox
   */
  type?: IressPopoverProps['type'];
}

export interface InputPopoverActivatorProps extends PopoverActivatorProps {
  disabledAutoToggle?: boolean;

  /**
   * Min length of input activator before popover is shown, if input activator has minLength
   * prop it will use that as a fallback. Defaults to 1 if not provided and not found in activator.
   */
  minLength?: number;
}

import { type IressInputPopoverProps } from '@/main';

export type IressSelectSearchProps = Omit<
  IressInputPopoverProps,
  'disabledAutoToggle' | 'displayMode' | 'show' | 'width'
>;

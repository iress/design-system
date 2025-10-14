import { type IressInputProps } from '@/main';

export interface IressSelectSearchInputProps
  extends Omit<IressInputProps, 'rows' | 'width'> {
  /**
   * Content to place inside the input when it has no value.
   * @default Search
   **/
  placeholder?: string;

  /**
   * Content to prepended to the input field, usually an icon.
   * @default <IressIcon name="search" />
   **/
  prepend?: React.ReactNode;

  /**
   * When set to `true` add ons will render with a different style. Will be ignored if `prepend` or `append` props are not being used.
   * @default true
   */
  watermark?: boolean;
}

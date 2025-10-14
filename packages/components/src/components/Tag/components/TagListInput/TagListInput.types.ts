import { type IressInputProps } from '@/components/Input';

export interface TagListInputProps extends IressInputProps<string> {
  /**
   * You can completely replace the delete button to provide your own functionality
   * When this is provided, `onTagDelete`, `onTagDeleteAll` and `onTagDeleteButtonBlur` will not be called.
   */
  deleteButton?: React.ReactNode;

  /**
   * Emitted when a tag is deleted
   */
  onTagDelete?: (label: string) => void;

  /**
   * Emitted when the combined tag delete button is clicked
   */
  onTagDeleteAll?: (label: string) => void;

  /**
   * Emitted when a tag's delete button is blurred
   */
  onTagDeleteButtonBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;

  /**
   * Text displayed next to tag count in tag when tag limit is exceeded
   * @default options selected
   */
  selectedOptionsTagText?: string;

  /**
   * If you would like to override the styles for the tag list input,
   * you can pass in a CSS module here with the following keys.
   */
  styles?: {
    tagListInput?: string;
    tagListInput__element?: string;
    tagListInput__items?: string;
    tagListInput__itemsInner?: string;
  };

  /**
   * Tags to display in the tag list input
   * This is usually the label key in an array of `LabelValue[]` pairs
   */
  tags?: string[];

  /**
   * Limit of tags to display before shortening to `selectedOptionsTagText`
   * @default 5
   */
  tagLimit?: number;
}

import { cx } from '@/styled-system/css';
import { selectSearch } from './SelectSearch.styles';
import { handlePopoverTabKey } from '@/components/Popover/helpers/handlePopoverTabKey';
import { GlobalCSSClass } from '@/enums';
import {
  IressInputPopover,
  usePopover,
  type IressInputPopoverProps,
} from '@/components/Popover';

export type IressSelectSearchProps = Omit<
  IressInputPopoverProps,
  'displayMode' | 'show' | 'width'
>;

export const IressSelectSearch = ({
  className,
  contentClassName,
  contentStyle,
  onKeyDown,
  ...restProps
}: IressSelectSearchProps) => {
  const parentPopover = usePopover();
  const searchClasses = selectSearch();

  return (
    <IressInputPopover
      {...restProps}
      className={cx(searchClasses.root, className, GlobalCSSClass.SelectSearch)}
      contentStyle={{
        ...contentStyle,
        className: cx(
          searchClasses.content,
          contentClassName,
          GlobalCSSClass.SelectSearchContent,
          contentStyle?.className,
        ),
      }}
      displayMode="inline"
      onKeyDown={(e) => {
        onKeyDown?.(e);

        if (parentPopover) {
          void handlePopoverTabKey(parentPopover, e);
        }
      }}
      show
    />
  );
};

IressSelectSearch.displayName = 'IressSelectSearch';

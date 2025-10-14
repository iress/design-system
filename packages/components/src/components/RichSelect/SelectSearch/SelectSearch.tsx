import { cx } from '@/styled-system/css';
import { selectSearch } from './SelectSearch.styles';
import { handlePopoverTabKey } from '@/components/Popover/helpers/handlePopoverTabKey';
import { useContext } from 'react';
import { PopoverContext } from '@/components/Popover/hooks/usePopover';
import { GlobalCSSClass } from '@/enums';
import {
  IressInputPopover,
  type IressInputPopoverProps,
} from '@/components/Popover';

export type IressSelectSearchProps = Omit<
  IressInputPopoverProps,
  'disabledAutoToggle' | 'displayMode' | 'show' | 'width'
>;

export const IressSelectSearch = ({
  className,
  contentClassName,
  contentStyle,
  onKeyDown,
  ...restProps
}: IressSelectSearchProps) => {
  const parentPopover = useContext(PopoverContext);
  const searchClasses = selectSearch();

  return (
    <IressInputPopover
      {...restProps}
      className={cx(
        searchClasses.root,
        className,
        GlobalCSSClass.RichSelectSearch,
      )}
      contentStyle={{
        ...contentStyle,
        className: cx(
          searchClasses.content,
          contentClassName,
          GlobalCSSClass.RichSelectSearchContent,
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

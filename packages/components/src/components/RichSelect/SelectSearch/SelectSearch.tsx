import { IressInputPopover } from '@/main';
import { type IressSelectSearchProps } from './SelectSearch.types';
import classNames from 'classnames';

import styles from './SelectSearch.module.scss';
import bodyStyles from '../SelectBody/SelectBody.module.scss';
import { usePopover } from '@/components/Popover/hooks/usePopover';
import { handlePopoverTabKey } from '@/components/Popover/helpers/handlePopoverTabKey';

export const IressSelectSearch = ({
  className,
  contentClassName,
  onKeyDown,
  ...restProps
}: IressSelectSearchProps) => {
  const parentPopover = usePopover();

  return (
    <IressInputPopover
      {...restProps}
      className={classNames(
        styles.selectSearch,
        bodyStyles.selectBody,
        className,
      )}
      contentClassName={classNames(
        styles.content,
        bodyStyles.children,
        contentClassName,
      )}
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

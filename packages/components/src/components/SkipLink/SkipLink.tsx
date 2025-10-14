import { forwardRef } from 'react';
import classNames from 'classnames';
import { type IressSkipLinkProps } from './SkipLink.types';
import styles from './SkipLink.module.scss';
import { idsLogger } from '@helpers/utility/idsLogger';

export const IressSkipLink = forwardRef(
  (
    {
      targetId,
      href,
      children = 'Skip to content',
      className,
      ...restProps
    }: IressSkipLinkProps,
    ref: React.Ref<HTMLAnchorElement>,
  ) => {
    if (!targetId && !href) {
      idsLogger(
        'SkipLink: You must define other a targetId or href prop to display a skip link.',
      );
      return null;
    }

    return (
      <a
        {...restProps}
        className={classNames(className, styles.skipLink)}
        href={targetId ? `#${targetId}` : href}
        ref={ref}
      >
        {children}
      </a>
    );
  },
);

IressSkipLink.displayName = 'IressSkipLink';

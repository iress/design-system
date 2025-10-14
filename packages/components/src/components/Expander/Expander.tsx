import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import styles from './Expander.module.scss';
import {
  ExpanderMode,
  type ExpanderWithEnums,
  type IressExpanderProps,
} from './Expander.types';
import { useIdIfNeeded } from '@/hooks';

export const IressExpander: ExpanderWithEnums = ({
  activator,
  children,
  className,
  'data-testid': testid,
  onChange,
  id: idProp,
  mode = 'section',
  open = false,
  ...restProps
}: IressExpanderProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const id = useIdIfNeeded({ id: idProp });

  const parentClassNames = classNames(
    className,
    styles.expander,
    styles[mode],
    {
      [styles.open]: isOpen,
    },
  );

  const containerClassNames = classNames(styles.container, {
    [styles.open]: isOpen,
  });

  useEffect((): void => {
    setIsOpen(open);
  }, [open]);

  const handleActivatorClick = (): void => {
    setIsOpen(!isOpen);
    onChange?.({ open: !isOpen });
  };

  return (
    <div
      className={parentClassNames}
      {...restProps}
      data-testid={testid}
      id={id}
    >
      <button
        className={styles.activator}
        aria-expanded={isOpen}
        aria-controls={`${id}__container`}
        onClick={handleActivatorClick}
        type="button"
        data-testid={propagateTestid(testid, 'activator')}
      >
        {activator}
      </button>
      <div
        id={`${id}__container`}
        className={containerClassNames}
        data-testid={propagateTestid(testid, 'container')}
      >
        <div className={styles.containerInner}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

/** @deprecated IressExpander.Mode is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressExpander.Mode = ExpanderMode;

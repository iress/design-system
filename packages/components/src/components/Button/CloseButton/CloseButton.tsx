import classNames from 'classnames';
import { type IressCloseButtonProps } from './CloseButton.types';
import styles from './CloseButton.module.scss';
import { IressButton } from '../Button';
import { IressIcon } from '../../Icon';
import React, { forwardRef } from 'react';
import { type ButtonRef } from '..';

export const IressCloseButton = forwardRef(
  (
    {
      screenreaderText = 'Close button',
      className,
      ...restProps
    }: IressCloseButtonProps,
    ref: React.Ref<ButtonRef>,
  ) => (
    <IressButton
      className={classNames(className, styles.closeButton)}
      mode="tertiary"
      {...restProps}
      ref={ref}
    >
      <IressIcon name="times" screenreaderText={screenreaderText} />
    </IressButton>
  ),
);

IressCloseButton.displayName = 'IressCloseButton';

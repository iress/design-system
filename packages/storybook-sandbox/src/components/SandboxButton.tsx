import React from 'react';
import { type ReactNode, useState } from 'react';
import { IconButton, WithTooltip } from 'storybook/internal/components';

interface SandboxButtonProps {
  label: string;
  icon?: string;
  menu?: ReactNode;
  onClick?: () => void;
}

export const SandboxButton = ({
  label,
  icon,
  menu,
  onClick,
}: SandboxButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const button = (
    <IconButton title={label} onClick={onClick} active={isOpen}>
      {icon ? <span className="material-symbols-outlined">{icon}</span> : label}
    </IconButton>
  );

  if (!menu) {
    return button;
  }

  return (
    <WithTooltip
      placement="left-start"
      trigger="click"
      offset={[-10, 0]}
      tooltip={<div className="sandbox-button__menu">{menu}</div>}
      onVisibleChange={setIsOpen}
    >
      {button}
    </WithTooltip>
  );
};

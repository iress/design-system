import { IressInput, IressReadonly, type IressReadonlyProps } from '@/main';
import { useState } from 'react';

export const ReadonlyEditToggle = (props: IressReadonlyProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(String(props.value ?? ''));

  if (isEditing) {
    return (
      <IressInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        actions={[
          {
            icon: 'check',
            children: 'Save',
            onClick: () => setIsEditing(false),
          },
        ]}
        autoFocus
      />
    );
  }

  return (
    <IressReadonly
      {...props}
      value={value}
      actions={[
        {
          icon: 'edit',
          children: 'Edit',
          onClick: () => setIsEditing(true),
        },
      ]}
    />
  );
};

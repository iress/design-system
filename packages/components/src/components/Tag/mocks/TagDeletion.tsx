import {
  IressButton,
  IressButtonProps,
  IressIcon,
  IressInline,
  IressTag,
  IressTagProps,
} from '@/main';
import { useState } from 'react';

export const TagDeletion = (args: IressTagProps) => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);

  const handleAdd: IressButtonProps['onClick'] = () => {
    setTags([...tags, `Tag ${tags.length + 1}`]);
  };

  const handleDelete: IressTagProps['onDelete'] = (tag) => {
    setTags((existingTags) =>
      existingTags.filter((existingTag) => existingTag !== tag),
    );
  };

  return (
    <IressInline gap="sm" verticalAlign="middle">
      {tags.map((tag) => (
        <IressTag
          {...args}
          key={tag}
          deleteButtonText={args.deleteButtonText ?? `Delete ${tag}`}
          onDelete={handleDelete}
        >
          {tag}
        </IressTag>
      ))}
      <IressButton onClick={handleAdd}>
        <IressIcon name="plus" />
      </IressButton>
    </IressInline>
  );
};

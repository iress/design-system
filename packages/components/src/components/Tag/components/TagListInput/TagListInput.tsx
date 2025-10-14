import classNames from 'classnames';
import { forwardRef } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { IressTag } from '../../Tag';
import { type TagListInputProps } from './TagListInput.types';

import inputStyles from '../../../Input/Input.module.scss';
import styles from './TagListInput.module.scss';
import { IressInput } from '@/components/Input';
import { IressInline } from '@/components/Inline';
import { type InputRef } from '@/components/Input/InputBase/InputBase.types';

const Tags = ({
  'data-testid': dataTestId,
  deleteButton,
  onTagDelete,
  onTagDeleteAll,
  onTagDeleteButtonBlur,
  selectedOptionsTagText,
  tags = [],
  tagLimit = 5,
}: Pick<
  TagListInputProps,
  | 'data-testid'
  | 'deleteButton'
  | 'onTagDelete'
  | 'onTagDeleteAll'
  | 'onTagDeleteButtonBlur'
  | 'selectedOptionsTagText'
  | 'tags'
  | 'tagLimit'
>) => {
  if (tags.length <= tagLimit)
    return tags.map((tag: string) => (
      <IressTag
        key={tag}
        deleteButton={deleteButton}
        deleteButtonText={`Delete ${tag}`}
        onDelete={onTagDelete}
        onDeleteButtonBlur={onTagDeleteButtonBlur}
        data-testid={propagateTestid(dataTestId, 'tag')}
      >
        {tag}
      </IressTag>
    ));

  return (
    <IressTag
      deleteButton={deleteButton}
      onDelete={onTagDeleteAll}
      onDeleteButtonBlur={onTagDeleteButtonBlur}
      data-testid={propagateTestid(dataTestId, 'tag')}
    >
      {String(tags.length) || '0'} {selectedOptionsTagText}
    </IressTag>
  );
};

export const TagListInput = forwardRef(
  (
    {
      append,
      children,
      className,
      'data-testid': dataTestId,
      deleteButton,
      onTagDelete,
      onTagDeleteAll,
      onTagDeleteButtonBlur,
      prepend,
      selectedOptionsTagText = 'selected',
      styles: customStyles,
      tags = [],
      tagLimit = 5,
      watermark,
      ...restProps
    }: TagListInputProps,
    ref: React.Ref<InputRef>,
  ) => {
    const getStyle = (
      prop: keyof Exclude<TagListInputProps['styles'], undefined>,
    ) => {
      return customStyles?.[prop] ?? styles[prop];
    };

    return (
      <div
        className={classNames(className, getStyle('tagListInput'))}
        data-testid={dataTestId}
      >
        <div
          className={classNames(getStyle('tagListInput__items'), {
            [inputStyles.watermark]: watermark,
          })}
          data-testid={propagateTestid(dataTestId, 'items')}
        >
          {prepend && (
            <div
              className={classNames({
                [inputStyles.addon]: true,
              })}
            >
              {prepend}
            </div>
          )}
          <div className={getStyle('tagListInput__itemsInner')}>
            <IressInline gutter="xs" verticalAlign="middle">
              <Tags
                data-testid={dataTestId}
                deleteButton={deleteButton}
                onTagDelete={onTagDelete}
                onTagDeleteAll={onTagDeleteAll}
                onTagDeleteButtonBlur={onTagDeleteButtonBlur}
                selectedOptionsTagText={selectedOptionsTagText}
                tags={tags}
                tagLimit={tagLimit}
              />
              {children}
              <IressInput
                {...restProps}
                className={getStyle('tagListInput__element')}
                autoComplete="off"
                data-testid={propagateTestid(dataTestId, 'input')}
                ref={ref}
              />
            </IressInline>
          </div>
          {append && (
            <div
              className={classNames({
                [inputStyles.addon]: true,
                [inputStyles.append]: true,
              })}
            >
              {append}
            </div>
          )}
        </div>
      </div>
    );
  },
);

TagListInput.displayName = 'TagListInput';

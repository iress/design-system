import {
  ArgTypes,
  Controls,
  type SortType,
} from '@storybook/addon-docs/blocks';
import { type StoryObj } from '@storybook/react';
import { type ComponentProps, type ReactNode } from 'react';
import {
  ComponentApiHeading,
  type ComponentApiHeadingProps,
} from './ComponentApiHeading';

export interface ComponentApiProps
  extends Omit<ComponentProps<typeof Controls>, 'children'>,
    Omit<ComponentApiHeadingProps, 'children'> {
  details?: ReactNode;
  exclude?: string[];
  heading?: ComponentApiHeadingProps['children'];
  readOnly?: boolean;
  sort?: SortType;
  story: StoryObj;
}

export const ComponentApi = ({
  details,
  exclude,
  heading,
  headingId,
  headingLevel = 2,
  readOnly,
  sort = 'alpha',
  story,
  ...restProps
}: ComponentApiProps) => {
  const closeCategories = (element: HTMLDivElement) => {
    const categories =
      element.querySelectorAll<HTMLButtonElement>('tr[title] button');
    categories.forEach((category) => {
      category.click();
    });
  };

  const Table = readOnly ? ArgTypes : Controls;

  return (
    <div
      ref={(element) => {
        if (element) {
          closeCategories(element);
        }
      }}
    >
      <ComponentApiHeading headingId={headingId} headingLevel={headingLevel}>
        {heading}
      </ComponentApiHeading>
      {details}
      <Table
        of={story}
        exclude={['data-testid', 'data-value', ...(exclude ?? [])]}
        sort={sort}
        {...restProps}
      />
    </div>
  );
};

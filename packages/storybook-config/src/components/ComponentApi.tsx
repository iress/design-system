import { ArgTypes, Controls } from '@storybook/addon-docs/blocks';
import { type ComponentProps, type ReactNode } from 'react';
import {
  ComponentApiHeading,
  type ComponentApiHeadingProps,
} from './ComponentApiHeading';
import {
  type StoryAnnotations,
  type ModuleExport,
} from 'storybook/internal/types';

export interface ComponentApiProps
  extends Omit<ComponentProps<typeof Controls>, 'children'>,
    Omit<ComponentApiHeadingProps, 'children'> {
  /**
   * Additional details to display above the API table.
   */
  details?: ReactNode;

  /**
   * Heading for the API section.
   */
  heading?: ComponentApiHeadingProps['children'];

  /**
   * Whether the API table is read-only.
   */
  readOnly?: boolean;

  /**
   * The story to extract the component API from.
   */
  of: ModuleExport;
}

/**
 * Component to display the API of a component, including controls or arg types.
 * It is a wrapper around Storybook's Controls and ArgTypes components with added functionality.
 */
export const ComponentApi = ({
  details,
  exclude,
  heading,
  headingId,
  headingLevel = 2,
  readOnly,
  sort = 'alpha',
  of,
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

  let excludedArgs = exclude ?? [];

  if (Array.isArray(excludedArgs)) {
    excludedArgs = [...excludedArgs, 'data-testid', 'data-value'];
  }

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
        of={of as StoryAnnotations}
        exclude={excludedArgs}
        sort={sort}
        {...restProps}
      />
    </div>
  );
};

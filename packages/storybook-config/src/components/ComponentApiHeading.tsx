import { Markdown } from '@storybook/addon-docs/blocks';
import {
  type ForwardedRef,
  forwardRef,
  type PropsWithChildren,
  use,
} from 'react';
import { IressStorybookContext } from './IressStorybookContext';

export interface ComponentApiHeadingProps extends PropsWithChildren {
  /**
   * The ID of the heading element, needs to be unique on the page so it can be linked to via the table of contents.
   */
  headingId?: string;

  /**
   * The heading level to use for the API section heading (2, 3, or 4). Controls where it shows in the table of contents.
   */
  headingLevel?: 2 | 3 | 4;
}

export const ComponentApiHeading = forwardRef(
  (
    {
      children: headingProp,
      headingId,
      headingLevel = 2,
    }: ComponentApiHeadingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { IressText } = use(IressStorybookContext);

    const markdownSettings = headingId
      ? { slugify: () => headingId }
      : undefined;

    if (headingProp && typeof headingProp === 'string') {
      return (
        <div ref={ref}>
          <IressText mb="-sm">
            <Markdown
              options={markdownSettings}
            >{`${'#'.repeat(headingLevel)} ${headingProp}`}</Markdown>
          </IressText>
        </div>
      );
    }

    return (
      <div ref={ref}>
        <IressText mb="-sm">
          {headingProp ?? (
            <Markdown
              options={markdownSettings}
            >{`${'#'.repeat(headingLevel)} Props`}</Markdown>
          )}
        </IressText>
      </div>
    );
  },
);

ComponentApiHeading.displayName = 'ComponentApiHeading';

import { Markdown } from '@storybook/addon-docs/blocks';
import {
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
  type PropsWithChildren,
  use,
  useMemo,
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

    const markdownSettings = useMemo(() => {
      const options: ComponentProps<typeof Markdown>['options'] = {
        overrides: {
          h2: (props) => (
            <IressText
              element="h2"
              textStyle="typography.heading.4"
              {...props}
            />
          ),
          h3: (props) => (
            <IressText
              element="h3"
              textStyle="typography.heading.4"
              {...props}
            />
          ),
          h4: (props) => (
            <IressText
              element="h4"
              textStyle="typography.heading.4"
              {...props}
            />
          ),
        },
      };

      if (headingId) {
        options.slugify = () => headingId;
      }

      return options;
    }, [headingId, IressText]);

    if (headingProp && typeof headingProp === 'string') {
      return (
        <div ref={ref}>
          <Markdown
            options={markdownSettings}
          >{`${'#'.repeat(headingLevel)} ${headingProp}`}</Markdown>
        </div>
      );
    }

    return (
      <div ref={ref}>
        {headingProp ?? (
          <Markdown
            options={markdownSettings}
          >{`${'#'.repeat(headingLevel)} Props`}</Markdown>
        )}
      </div>
    );
  },
);

ComponentApiHeading.displayName = 'ComponentApiHeading';

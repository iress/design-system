import { type ReactNode } from 'react';
import { idsLogger } from '@helpers/utility/idsLogger';
import { type WithDataAttributes } from '@/interfaces';

interface HeadingWithDeprecatedFallbackProps extends WithDataAttributes {
  component: string;
  heading?: ReactNode;
  headingText?: string;
  HeadingTag?: keyof HTMLElementTagNameMap;
}

export const HeadingWithDeprecatedFallback = ({
  component,
  'data-testid': dataTestId,
  heading,
  headingText,
  HeadingTag = 'h2',
}: HeadingWithDeprecatedFallbackProps) => {
  if (typeof heading === 'string' && heading)
    return <HeadingTag data-testid={dataTestId}>{heading}</HeadingTag>;

  if (headingText) {
    idsLogger(
      `${component}: 'headingLevel' and 'headingText' are deprecated and will be removed in a future version. Please use the new 'heading' prop instead.`,
    );

    return <HeadingTag data-testid={dataTestId}>{headingText}</HeadingTag>;
  }

  return heading;
};

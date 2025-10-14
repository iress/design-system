import { type CardWithEnums, type IressCardProps } from './Card.types';
import { HeadingLevel, PaddingSize } from '@/enums';
import { composeIDSCard } from './helpers/composeIDSCard';
import { composeIDSCardSlots } from './helpers/composeIDSCardSlots';
import { HeadingWithDeprecatedFallback } from '@/components/HeadingWithDeprecatedFallback/HeadingWithDeprecatedFallback';

export const IressCard: CardWithEnums = ({
  className,
  padding = PaddingSize.Md,
  selected,
  stretch,
  children,
  footer,
  heading: headingProp,
  headingLevel = HeadingLevel.H2,
  headingText,
  media,
  prepend,
  topRight,
  ...restProps
}: IressCardProps) => {
  const heading =
    headingProp || headingText ? (
      <HeadingWithDeprecatedFallback
        component="IressCard"
        heading={headingProp}
        headingText={headingText}
        HeadingTag={headingLevel}
      />
    ) : undefined;

  const wrapperProps = composeIDSCard({
    className,
    clickable: !!restProps.onClick,
    padding,
    selected,
    stretch,
  });

  const slots = composeIDSCardSlots({
    children,
    'data-testid': restProps['data-testid'],
    footer,
    heading,
    media,
    prepend,
    topRight,
  });

  return (
    <div {...restProps} {...wrapperProps}>
      {slots}
    </div>
  );
};

/** @deprecated IressCard.HeadingLevel enum is now deprecated and will be removed in a future version. Please use the HeadingLevels type instead. */
IressCard.HeadingLevel = HeadingLevel;

/** @deprecated IressCard.Padding enum is now deprecated and will be removed in a future version. Please use the PaddingSizes type instead. */
IressCard.Padding = PaddingSize;

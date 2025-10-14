import { PaddingSize } from '@/enums';
import { type IressLinkCardProps } from '../Card.types';
import { composeIDSCard } from '../helpers/composeIDSCard';
import { composeIDSCardSlots } from '../helpers/composeIDSCardSlots';

export const IressLinkCard = ({
  className,
  padding = PaddingSize.Md,
  selected,
  stretch,
  children,
  footer,
  heading,
  media,
  prepend,
  topRight,
  ...restProps
}: IressLinkCardProps) => {
  const wrapperProps = composeIDSCard<HTMLAnchorElement>({
    className,
    clickable: true,
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
    <a {...restProps} {...wrapperProps}>
      {slots}
    </a>
  );
};

import { PaddingSize } from '@/enums';
import { type IressButtonCardProps } from '../Card.types';
import { composeIDSCard } from '../helpers/composeIDSCard';
import { composeIDSCardSlots } from '../helpers/composeIDSCardSlots';

export const IressButtonCard = ({
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
  type = 'button',
  ...restProps
}: IressButtonCardProps) => {
  const wrapperProps = composeIDSCard<HTMLButtonElement>({
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
    <button {...restProps} {...wrapperProps} type={type}>
      {slots}
    </button>
  );
};

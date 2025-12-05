import { IressBadge, type IressBadgeProps } from '@iress-oss/ids-components';
import { cssVars } from '../../src/generated/css-vars';

export const TokenTag = (props: IressBadgeProps) => (
  <IressBadge
    pill
    mode="info"
    px="spacing.3"
    bg="colour.neutral.80"
    color="colour.neutral.10"
    style={{
      border: `1px solid color-mix(in srgb, ${cssVars.colour.neutral[70]}, transparent 60%)`,
    }}
    {...props}
  />
);

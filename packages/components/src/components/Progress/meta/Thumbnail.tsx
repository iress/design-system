import { image } from '@/components/Image';
import { cssVars } from '@iress-oss/ids-tokens';

const Thumbnail = () => (
  <svg
    viewBox="0 0 751 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={image()}
  >
    <rect
      width="751"
      height="467"
      style={{ fill: cssVars.colour.neutral[20] }}
    />
    <rect
      x="110"
      y="208"
      width="483"
      height="51"
      rx="25.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="110"
      y="208"
      width="287"
      height="51"
      rx="25.5"
      style={{ fill: cssVars.colour.primary.text }}
    />
  </svg>
);

export default Thumbnail;

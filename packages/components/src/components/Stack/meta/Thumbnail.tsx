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
      x="122"
      y="123"
      width="508"
      height="93"
      rx="16"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="122"
      y="252"
      width="508"
      height="93"
      rx="16"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
  </svg>
);

export default Thumbnail;

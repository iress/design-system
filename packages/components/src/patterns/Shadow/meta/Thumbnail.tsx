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
      x="103"
      y="55"
      width="546"
      height="341"
      rx="12"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    <rect
      x="449"
      y="83"
      width="178"
      height="280"
      rx="16"
      style={{ fill: cssVars.colour.primary.surface }}
    />
  </svg>
);

export default Thumbnail;

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
      x="114"
      y="147"
      width="515"
      height="127"
      rx="15"
      style={{ stroke: cssVars.colour.neutral[50] }}
      strokeWidth="2"
      strokeDasharray="10 10"
    />
    <rect
      x="144"
      y="197"
      width="456"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[30] }}
    />
  </svg>
);

export default Thumbnail;

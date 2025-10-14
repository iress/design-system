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
      y="92"
      width="515"
      height="275"
      rx="15"
      style={{ fill: cssVars.colour.neutral[10] }}
      stroke={cssVars.colour.primary.text}
      strokeWidth="2"
      strokeDasharray="10 10"
    />
  </svg>
);

export default Thumbnail;

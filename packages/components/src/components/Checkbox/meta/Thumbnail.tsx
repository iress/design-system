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
      x="326"
      y="184"
      width="100"
      height="100"
      rx="25"
      style={{ fill: cssVars.colour.primary.fill }}
    />
    <path
      d="M351 234.704L367.529 251L401 218"
      style={{ stroke: cssVars.colour.primary.onFill }}
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Thumbnail;

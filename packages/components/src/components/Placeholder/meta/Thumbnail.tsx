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
    <path
      d="M175.875 109L577.711 358.877"
      style={{ stroke: cssVars.colour.neutral[50] }}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M575.836 109L173.999 358.877"
      style={{ stroke: cssVars.colour.neutral[50] }}
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

export default Thumbnail;

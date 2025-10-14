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
      x="282"
      y="177"
      width="187"
      height="88"
      rx="44"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <rect
      x="385"
      y="181"
      width="80"
      height="80"
      rx="40"
      style={{
        fill: cssVars.colour.neutral[10],
        stroke: cssVars.colour.primary.text,
      }}
      strokeWidth="8"
    />
    <path
      d="M313 221.185L327.876 236L358 206"
      style={{ stroke: cssVars.colour.neutral[10] }}
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Thumbnail;

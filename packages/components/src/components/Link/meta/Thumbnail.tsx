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
      x="113"
      y="152"
      width="502"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="113"
      y="220"
      width="502"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="113"
      y="288"
      width="216"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="364.5"
      y="220.5"
      width="108"
      height="26"
      rx="13"
      style={{ fill: cssVars.colour.primary.text, stroke: 'black' }}
    />
    <path
      d="M369 259H473"
      style={{ stroke: cssVars.colour.primary.text }}
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

export default Thumbnail;

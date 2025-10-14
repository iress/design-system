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
      x="321"
      y="205"
      width="109"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="466"
      y="205"
      width="109"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="176.5"
      y="205.5"
      width="108"
      height="26"
      rx="13"
      style={{
        fill: cssVars.colour.primary.text,
        stroke: cssVars.colour.primary.text,
      }}
    />
    <path
      d="M167 259L585 259"
      style={{ stroke: cssVars.colour.neutral[50] }}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M181 259H285"
      style={{ stroke: cssVars.colour.primary.text }}
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);

export default Thumbnail;

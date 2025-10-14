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
      x="146"
      y="151"
      width="73"
      height="73"
      rx="25"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <path
      d="M164 188.148L176.231 200L201 176"
      style={{ stroke: cssVars.colour.neutral[10] }}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="248"
      y="173"
      width="357"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="146"
      y="243"
      width="73"
      height="73"
      rx="25"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <path
      d="M164 280.148L176.231 292L201 268"
      style={{ stroke: cssVars.colour.neutral[10] }}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="248"
      y="265"
      width="357"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
  </svg>
);

export default Thumbnail;

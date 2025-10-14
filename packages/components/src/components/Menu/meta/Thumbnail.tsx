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
      d="M554 217C554 208.163 546.837 201 538 201H199V267H538C546.837 267 554 259.837 554 251V217Z"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    <rect
      x="216"
      y="152"
      width="318"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="216"
      y="220"
      width="318"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <path
      d="M203 205C203 202.791 201.209 201 199 201V201V267V267C201.209 267 203 265.209 203 263V205Z"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <rect
      x="216"
      y="288"
      width="318"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
  </svg>
);

export default Thumbnail;

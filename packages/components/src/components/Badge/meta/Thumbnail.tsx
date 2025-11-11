import { image } from '@/components/Image';
import { cssVars } from '@iress-oss/ids-tokens';

const Thumbnail = () => (
  <svg
    viewBox="0 0 751 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={image()}
  >
    <g clipPath="url(#clip0_1008_2302)">
      <rect
        width="751"
        height="467"
        style={{ fill: cssVars.colour.neutral[10] }}
      />
      <path
        d="M749.941 234.381L1.19067 234.689C0.874886 234.689 0.572035 234.563 0.34874 234.34C0.125444 234.117 0 233.814 0 233.498C0 233.182 0.125444 232.879 0.34874 232.656C0.572035 232.433 0.874886 232.307 1.19067 232.307L749.941 232C750.256 232 750.559 232.125 750.783 232.349C751.006 232.572 751.131 232.875 751.131 233.191C751.131 233.507 751.006 233.809 750.783 234.033C750.559 234.256 750.256 234.381 749.941 234.381Z"
        fill="#CACACA"
      />
      <rect
        width="751"
        height="467"
        style={{ fill: cssVars.colour.neutral[20] }}
      />
      <rect
        x="291"
        y="188"
        width="149"
        height="92"
        rx="25"
        style={{ fill: cssVars.colour.neutral[40] }}
      />
      <rect
        x="414.5"
        y="168.5"
        width="45"
        height="45"
        rx="22.5"
        style={{
          stroke: cssVars.colour.neutral[20],
          fill: cssVars.colour.primary.text,
        }}
        strokeWidth="3"
      />
    </g>
    <defs>
      <clipPath id="clip0_1008_2302">
        <rect
          width="751"
          height="467"
          style={{ fill: cssVars.colour.neutral[10] }}
        />
      </clipPath>
    </defs>
  </svg>
);

export default Thumbnail;

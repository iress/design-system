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
    <g filter="url(#filter0_d_1016_2599)">
      <rect
        x="46"
        y="188"
        width="660"
        height="91"
        rx="12"
        style={{ fill: cssVars.colour.neutral[10] }}
      />
      <rect
        x="47"
        y="189"
        width="658"
        height="89"
        rx="11"
        style={{ stroke: cssVars.colour.neutral[70] }}
        strokeWidth="2"
      />
    </g>
    <rect
      x="76"
      y="220"
      width="385"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <defs>
      <filter
        id="filter0_d_1016_2599"
        x="44"
        y="187"
        width="664"
        height="95"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.615686 0 0 0 0 0.639216 0 0 0 0 0.686275 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1016_2599"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1016_2599"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Thumbnail;

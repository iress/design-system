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
    <g filter="url(#filter0_d_1008_2331)">
      <rect
        x="236"
        y="101"
        width="266"
        height="237"
        rx="25"
        style={{ fill: cssVars.colour.neutral[10] }}
      />
      <rect
        x="236.25"
        y="101.25"
        width="265.5"
        height="236.5"
        rx="24.75"
        stroke="#091E42"
        strokeOpacity="0.15"
        strokeWidth="0.5"
      />
    </g>
    <rect
      x="257"
      y="282"
      width="150"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <path
      d="M236.5 126C236.5 112.745 247.245 102 260.5 102H477C490.255 102 501 112.745 501 126V257H236.5V126Z"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    <defs>
      <filter
        id="filter0_d_1008_2331"
        x="231"
        y="99"
        width="276"
        height="247"
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
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="2.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0352941 0 0 0 0 0.117647 0 0 0 0 0.258824 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1008_2331"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1008_2331"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Thumbnail;

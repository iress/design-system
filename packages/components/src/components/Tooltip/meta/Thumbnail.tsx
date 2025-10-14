import { image } from '@/components/Image';
import { cssVars } from '@iress-oss/ids-tokens';

const Thumbnail = () => (
  <svg
    viewBox="0 0 751 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={image()}
  >
    <g clipPath="url(#clip0_1016_2941)">
      <rect
        width="751"
        height="467"
        style={{ fill: cssVars.colour.neutral[10] }}
      />
      <path
        d="M749.941 228.213L1.19067 228.52C0.874886 228.52 0.572035 228.395 0.34874 228.172C0.125444 227.948 0 227.645 0 227.33C0 227.014 0.125444 226.711 0.34874 226.488C0.572035 226.264 0.874886 226.139 1.19067 226.139L749.941 225.832C750.256 225.832 750.559 225.957 750.783 226.18C751.006 226.404 751.131 226.706 751.131 227.022C751.131 227.338 751.006 227.641 750.783 227.864C750.559 228.087 750.256 228.213 749.941 228.213Z"
        fill="#CACACA"
      />
      <rect
        width="751"
        height="472"
        style={{ fill: cssVars.colour.neutral[20] }}
      />
      <g filter="url(#filter0_d_1016_2941)">
        <rect
          x="380"
          y="183"
          width="267"
          height="102"
          rx="25"
          style={{ fill: cssVars.colour.primary.text }}
        />
        <rect
          x="380.25"
          y="183.25"
          width="266.5"
          height="101.5"
          rx="24.75"
          style={{ stroke: cssVars.colour.primary.text }}
          strokeOpacity="0.15"
          strokeWidth="0.5"
        />
      </g>
      <rect
        x="151"
        y="220"
        width="217"
        height="27"
        rx="13.5"
        style={{ fill: cssVars.colour.neutral[50] }}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1016_2941"
        x="362"
        y="175"
        width="303"
        height="138"
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
        <feOffset dy="10" />
        <feGaussianBlur stdDeviation="9" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0352941 0 0 0 0 0.117647 0 0 0 0 0.258824 0 0 0 0.15 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1016_2941"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1016_2941"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_1016_2941">
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

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
    <g filter="url(#filter0_d_1016_2460)">
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
      x="46"
      y="138"
      width="394"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="87"
      y="302"
      width="328"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <path
      d="M59.3966 303.461C60.751 301.111 64.2219 301.111 65.5762 303.461L77.4903 323.788L77.6173 324.015C78.8282 326.377 77.0048 329.116 74.4327 329.116H50.5889C47.858 329.116 46.109 326.191 47.4678 323.812L47.4737 323.801L59.3966 303.461ZM51.2862 325.167H73.6866L62.4854 306.06L51.2862 325.167Z"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <defs>
      <filter
        id="filter0_d_1016_2460"
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
          result="effect1_dropShadow_1016_2460"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1016_2460"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Thumbnail;

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
    <g filter="url(#filter0_d_1016_2621)">
      <rect
        x="47"
        y="189"
        width="658"
        height="89"
        rx="11"
        style={{ stroke: cssVars.colour.neutral[50] }}
        strokeWidth="2"
        shapeRendering="crispEdges"
      />
    </g>
    <rect
      x="80"
      y="138"
      width="394"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <path
      d="M57.4205 160.364L57.6477 154.114L52.3636 157.466L51 155.08L56.5682 152.182L51 149.284L52.3636 146.898L57.6477 150.25L57.4205 144H60.1477L59.9205 150.25L65.2045 146.898L66.5682 149.284L61 152.182L66.5682 155.08L65.2045 157.466L59.9205 154.114L60.1477 160.364H57.4205Z"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <defs>
      <filter
        id="filter0_d_1016_2621"
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
          result="effect1_dropShadow_1016_2621"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1016_2621"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Thumbnail;

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
      x="103"
      y="133"
      width="546"
      height="263"
      rx="12"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    <rect
      x="103"
      y="80"
      width="264"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="519"
      y="71"
      width="130"
      height="46"
      rx="12"
      style={{ fill: cssVars.colour.primary.fill }}
    />
    <g filter="url(#filter0_d_1018_2973)">
      <rect
        x="123"
        y="187"
        width="504"
        height="41"
        rx="8"
        style={{ fill: cssVars.colour.neutral[10] }}
      />
      <rect
        x="124"
        y="188"
        width="502"
        height="39"
        rx="7"
        style={{ stroke: cssVars.colour.neutral[70] }}
        stroke-width="2"
      />
    </g>
    <rect
      x="123"
      y="160"
      width="237"
      height="16"
      rx="8"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="123"
      y="239"
      width="178"
      height="12"
      rx="6"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    <g filter="url(#filter1_d_1018_2973)">
      <rect
        x="123"
        y="299"
        width="504"
        height="41"
        rx="8"
        style={{ fill: cssVars.colour.neutral[10] }}
      />
      <rect
        x="124"
        y="300"
        width="502"
        height="39"
        rx="7"
        style={{ stroke: cssVars.colour.neutral[70] }}
        stroke-width="2"
      />
    </g>
    <rect
      x="123"
      y="272"
      width="156"
      height="16"
      rx="8"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="123"
      y="351"
      width="259"
      height="12"
      rx="6"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    <defs>
      <filter
        id="filter0_d_1018_2973"
        x="121"
        y="186"
        width="508"
        height="45"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
          result="effect1_dropShadow_1018_2973"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1018_2973"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_1018_2973"
        x="121"
        y="298"
        width="508"
        height="45"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
          result="effect1_dropShadow_1018_2973"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1018_2973"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Thumbnail;

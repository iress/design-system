import { image } from '@/components/Image';
import { cssVars } from '@iress-oss/ids-tokens';

const Thumbnail = () => (
  <svg
    viewBox="0 0 751 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={image()}
  >
    <g clipPath="url(#clip0_1016_2784)">
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
        height="229"
        style={{ fill: cssVars.colour.neutral[20] }}
      />
      <g filter="url(#filter0_d_1016_2784)">
        <rect
          x="50"
          y="74"
          width="660"
          height="96"
          rx="12"
          style={{ fill: cssVars.colour.neutral[10] }}
        />
        <rect
          x="51"
          y="75"
          width="658"
          height="94"
          rx="11"
          style={{ stroke: cssVars.colour.neutral[70] }}
          strokeWidth="2"
        />
      </g>
      <g filter="url(#filter1_d_1016_2784)">
        <rect
          x="50"
          y="199"
          width="660"
          height="230"
          rx="25"
          style={{ fill: cssVars.colour.neutral[10] }}
        />
        <rect
          x="50.25"
          y="199.25"
          width="659.5"
          height="229.5"
          rx="24.75"
          style={{ stroke: cssVars.colour.primary.text }}
          strokeOpacity="0.15"
          strokeWidth="0.5"
        />
      </g>
      <path
        d="M675.622 110.064C676.126 110.559 676.126 111.252 675.622 111.746L654.357 132.629C653.853 133.124 653.147 133.124 652.643 132.629L631.378 111.746C630.874 111.252 630.874 110.559 631.378 110.064L632.083 109.371C632.587 108.876 633.293 108.876 633.797 109.371L653.55 128.67L673.203 109.371C673.707 108.876 674.413 108.876 674.917 109.371L675.622 110.064Z"
        style={{ fill: cssVars.colour.primary.text }}
      />
      <rect
        x="86"
        y="259"
        width="582"
        height="27"
        rx="13.5"
        style={{ fill: cssVars.colour.neutral[50] }}
      />
      <rect
        x="86"
        y="342"
        width="582"
        height="27"
        rx="13.5"
        style={{ fill: cssVars.colour.neutral[50] }}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1016_2784"
        x="48"
        y="73"
        width="664"
        height="100"
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
          result="effect1_dropShadow_1016_2784"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1016_2784"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_1016_2784"
        x="32"
        y="191"
        width="696"
        height="266"
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
          result="effect1_dropShadow_1016_2784"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1016_2784"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_1016_2784">
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

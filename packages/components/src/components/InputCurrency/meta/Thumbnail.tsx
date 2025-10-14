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
    <g filter="url(#filter0_d_1016_2609)">
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
      width="228"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <path
      d="M662.179 249H653.202V219.909H662.577C665.399 219.909 667.814 220.491 669.821 221.656C671.829 222.812 673.368 224.473 674.438 226.642C675.508 228.801 676.043 231.386 676.043 234.398C676.043 237.428 675.503 240.037 674.424 242.224C673.344 244.402 671.772 246.079 669.708 247.253C667.643 248.418 665.134 249 662.179 249ZM656.725 245.875H661.952C664.357 245.875 666.351 245.411 667.932 244.483C669.514 243.555 670.693 242.234 671.469 240.52C672.246 238.806 672.634 236.765 672.634 234.398C672.634 232.049 672.25 230.027 671.483 228.332C670.716 226.628 669.571 225.321 668.046 224.412C666.521 223.493 664.623 223.034 662.35 223.034H656.725V245.875Z"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <path
      d="M642.645 219.909H646.167V239.17C646.167 241.159 645.699 242.935 644.761 244.497C643.833 246.05 642.522 247.277 640.826 248.176C639.131 249.066 637.143 249.511 634.861 249.511C632.578 249.511 630.59 249.066 628.895 248.176C627.2 247.277 625.883 246.05 624.946 244.497C624.018 242.935 623.554 241.159 623.554 239.17V219.909H627.076V238.886C627.076 240.307 627.389 241.571 628.014 242.679C628.639 243.777 629.529 244.644 630.684 245.278C631.849 245.903 633.241 246.216 634.861 246.216C636.48 246.216 637.872 245.903 639.037 245.278C640.201 244.644 641.092 243.777 641.707 242.679C642.332 241.571 642.645 240.307 642.645 238.886V219.909Z"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <path
      d="M597.716 249H594.022L604.704 219.909H608.341L619.022 249H615.329L606.636 224.511H606.409L597.716 249ZM599.079 237.636H613.966V240.761H599.079V237.636Z"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <defs>
      <filter
        id="filter0_d_1016_2609"
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
          result="effect1_dropShadow_1016_2609"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1016_2609"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Thumbnail;

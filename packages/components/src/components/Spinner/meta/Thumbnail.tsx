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
      x="191.346"
      y="221.305"
      width="419"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <path
      d="M165.287 242.524L164.74 242.212C164.271 241.977 164.115 241.43 164.35 240.962C166.928 235.962 166.771 229.868 163.959 224.868C161.068 219.946 155.834 216.821 150.209 216.509C149.662 216.43 149.35 216.04 149.35 215.571V214.946C149.35 214.399 149.74 213.93 150.287 214.009C156.85 214.321 162.787 217.993 166.068 223.618C169.35 229.321 169.506 236.352 166.537 242.134C166.303 242.602 165.756 242.837 165.287 242.524Z"
      fill="url(#paint0_linear_1016_2847)"
    />
    <path
      d="M140.148 249.254L140.46 248.707C140.694 248.238 141.241 248.081 141.71 248.316C146.711 250.892 152.805 250.733 157.804 247.919C162.724 245.026 165.847 239.791 166.158 234.166C166.236 233.619 166.626 233.306 167.095 233.306L167.72 233.306C168.267 233.306 168.736 233.696 168.658 234.243C168.348 240.806 164.678 246.744 159.054 250.028C153.353 253.311 146.321 253.47 140.539 250.504C140.07 250.269 139.836 249.723 140.148 249.254Z"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <defs>
      <linearGradient
        id="paint0_linear_1016_2847"
        x1="157.35"
        y1="217.305"
        x2="171.85"
        y2="229.805"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.149038" stopColor={cssVars.colour.neutral[20]} />
        <stop offset="1" stopColor={cssVars.colour.primary.text} />
      </linearGradient>
    </defs>
  </svg>
);

export default Thumbnail;

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
      x="122"
      y="135"
      width="522"
      height="203"
      rx="16"
      fill="url(#paint0_linear_1016_2798)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1016_2798"
        x1="644"
        y1="135"
        x2="122"
        y2="338"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={cssVars.colour.neutral[30]} />
        <stop offset="0.5" stopColor={cssVars.colour.neutral[20]} />
        <stop offset="1" stopColor={cssVars.colour.neutral[30]} />
      </linearGradient>
    </defs>
  </svg>
);

export default Thumbnail;

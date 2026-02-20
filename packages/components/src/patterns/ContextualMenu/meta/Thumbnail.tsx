import { image } from '@/components/Image';
import { cssVars } from '@iress-oss/ids-tokens';

const Thumbnail = () => (
  <svg
    className={image()}
    fill="none"
    viewBox="0 0 751 467"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      fill={cssVars.colour.neutral[20]}
      height="467"
      width="751"
      x="0"
      y="0"
    />
    <rect
      fill={cssVars.colour.neutral[10]}
      height="240"
      rx="12"
      width="350"
      x="200"
      y="113"
    />
    <rect
      fill={cssVars.colour.neutral[10]}
      height="34"
      rx="8"
      stroke={cssVars.colour.neutral[40]}
      width="34"
      x="470"
      y="160"
    />
    <circle cx="487" cy="170" fill={cssVars.colour.neutral[70]} r="2" />
    <circle cx="487" cy="177" fill={cssVars.colour.neutral[70]} r="2" />
    <circle cx="487" cy="184" fill={cssVars.colour.neutral[70]} r="2" />
    <rect
      fill={cssVars.colour.neutral[10]}
      height="92"
      rx="8"
      stroke={cssVars.colour.neutral[40]}
      width="112"
      x="430"
      y="188"
    />
    <rect
      fill={cssVars.colour.neutral[10]}
      height="24"
      width="112"
      x="430"
      y="196"
    />
    <rect
      fill={cssVars.colour.neutral[10]}
      height="24"
      width="112"
      x="430"
      y="220"
    />
    <rect
      fill={cssVars.colour.neutral[10]}
      height="24"
      width="112"
      x="430"
      y="244"
    />
    <rect
      fill={cssVars.colour.neutral[60]}
      height="6"
      rx="3"
      width="32"
      x="462"
      y="205"
    />
    <rect
      fill={cssVars.colour.neutral[60]}
      height="6"
      rx="3"
      width="32"
      x="462"
      y="229"
    />
    <rect
      fill={cssVars.colour.neutral[60]}
      height="6"
      rx="3"
      width="38"
      x="462"
      y="253"
    />
  </svg>
);

export default Thumbnail;

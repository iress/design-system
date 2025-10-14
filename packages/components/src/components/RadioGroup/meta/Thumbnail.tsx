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
      x="248"
      y="173"
      width="357"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="248"
      y="265"
      width="357"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="160"
      y="159"
      width="55"
      height="55"
      rx="27.5"
      style={{
        fill: cssVars.colour.neutral[10],
        stroke: cssVars.colour.primary.text,
      }}
      strokeWidth="8"
    />
    <rect
      x="160"
      y="251"
      width="55"
      height="55"
      rx="27.5"
      style={{
        fill: cssVars.colour.neutral[10],
        stroke: cssVars.colour.primary.text,
      }}
      strokeWidth="8"
    />
    <rect
      x="172"
      y="171"
      width="31"
      height="31"
      rx="15.5"
      style={{ fill: cssVars.colour.primary.text }}
    />
  </svg>
);

export default Thumbnail;

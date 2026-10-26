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
    {/* Legend */}
    <rect
      x="46"
      y="80"
      width="300"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Field 1 label */}
    <rect
      x="46"
      y="130"
      width="200"
      height="20"
      rx="10"
      style={{ fill: cssVars.colour.neutral[40] }}
    />
    {/* Field 1 input */}
    <rect
      x="46"
      y="160"
      width="660"
      height="60"
      rx="12"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    <rect
      x="47"
      y="161"
      width="658"
      height="58"
      rx="11"
      style={{ stroke: cssVars.colour.neutral[70] }}
      strokeWidth="2"
    />
    {/* Field 2 label */}
    <rect
      x="46"
      y="245"
      width="180"
      height="20"
      rx="10"
      style={{ fill: cssVars.colour.neutral[40] }}
    />
    {/* Field 2 input */}
    <rect
      x="46"
      y="275"
      width="660"
      height="60"
      rx="12"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    <rect
      x="47"
      y="276"
      width="658"
      height="58"
      rx="11"
      style={{ stroke: cssVars.colour.neutral[70] }}
      strokeWidth="2"
    />
    {/* Grouping border */}
    <rect
      x="26"
      y="65"
      width="700"
      height="295"
      rx="16"
      style={{ stroke: cssVars.colour.neutral[40] }}
      strokeWidth="2"
      strokeDasharray="8 4"
    />
  </svg>
);

export default Thumbnail;

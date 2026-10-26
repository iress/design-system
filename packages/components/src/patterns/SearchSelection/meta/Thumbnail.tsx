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
    {/* Search input */}
    <rect
      x="100"
      y="80"
      width="551"
      height="60"
      rx="12"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    <rect
      x="101"
      y="81"
      width="549"
      height="58"
      rx="11"
      style={{ stroke: cssVars.colour.neutral[70] }}
      strokeWidth="2"
    />
    {/* Search icon */}
    <circle
      cx="135"
      cy="110"
      r="12"
      style={{ stroke: cssVars.colour.neutral[50] }}
      strokeWidth="3"
    />
    <line
      x1="144"
      y1="119"
      x2="152"
      y2="127"
      style={{ stroke: cssVars.colour.neutral[50] }}
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Input text placeholder */}
    <rect
      x="165"
      y="102"
      width="200"
      height="16"
      rx="8"
      style={{ fill: cssVars.colour.neutral[40] }}
    />
    {/* Dropdown panel */}
    <rect
      x="100"
      y="150"
      width="551"
      height="240"
      rx="12"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    <rect
      x="101"
      y="151"
      width="549"
      height="238"
      rx="11"
      style={{ stroke: cssVars.colour.neutral[30] }}
      strokeWidth="2"
    />
    {/* Result item 1 (highlighted) */}
    <rect
      x="112"
      y="162"
      width="527"
      height="48"
      rx="8"
      style={{ fill: cssVars.colour.neutral[30] }}
    />
    <rect
      x="128"
      y="176"
      width="180"
      height="14"
      rx="7"
      style={{ fill: cssVars.colour.neutral[70] }}
    />
    {/* Result item 2 */}
    <rect
      x="128"
      y="228"
      width="220"
      height="14"
      rx="7"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Result item 3 */}
    <rect
      x="128"
      y="262"
      width="160"
      height="14"
      rx="7"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Result item 4 */}
    <rect
      x="128"
      y="296"
      width="200"
      height="14"
      rx="7"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Result item 5 */}
    <rect
      x="128"
      y="330"
      width="140"
      height="14"
      rx="7"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Decision arrows at bottom */}
    <rect
      x="100"
      y="420"
      width="160"
      height="30"
      rx="15"
      style={{ fill: cssVars.colour.neutral[40] }}
    />
    <rect
      x="280"
      y="420"
      width="160"
      height="30"
      rx="15"
      style={{ fill: cssVars.colour.neutral[40] }}
    />
    <rect
      x="460"
      y="420"
      width="160"
      height="30"
      rx="15"
      style={{ fill: cssVars.colour.neutral[40] }}
    />
  </svg>
);

export default Thumbnail;

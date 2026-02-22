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
    {/* Breadcrumb container */}
    <rect
      x="90"
      y="155"
      width="571"
      height="158"
      rx="16"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    {/* First breadcrumb link */}
    <rect
      x="120"
      y="220"
      width="80"
      height="18"
      rx="4"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Separator 1 */}
    <rect
      x="210"
      y="224"
      width="10"
      height="10"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Second breadcrumb link */}
    <rect
      x="230"
      y="220"
      width="100"
      height="18"
      rx="4"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Separator 2 */}
    <rect
      x="340"
      y="224"
      width="10"
      height="10"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Third breadcrumb link */}
    <rect
      x="360"
      y="220"
      width="110"
      height="18"
      rx="4"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Separator 3 */}
    <rect
      x="480"
      y="224"
      width="10"
      height="10"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Current page (darker) */}
    <rect
      x="500"
      y="220"
      width="130"
      height="18"
      rx="4"
      style={{ fill: cssVars.colour.primary.text }}
    />
  </svg>
);

export default Thumbnail;

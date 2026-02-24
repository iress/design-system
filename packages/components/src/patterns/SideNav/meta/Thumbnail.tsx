import { image } from '@/components/Image';
import { cssVars } from '@iress-oss/ids-tokens';

const Thumbnail = () => (
  <svg
    viewBox="0 0 751 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={image()}
  >
    {/* Background */}
    <rect
      width="751"
      height="467"
      style={{ fill: cssVars.colour.neutral[20] }}
    />
    {/* Container card */}
    <rect
      x="103"
      y="75"
      width="546"
      height="317"
      rx="12"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    {/* Rail */}
    <rect
      x="103"
      y="75"
      width="50"
      height="317"
      rx="12"
      style={{ fill: cssVars.colour.primary.fill }}
    />
    {/* Square off inner rail corners */}
    <rect
      x="141"
      y="75"
      width="12"
      height="317"
      style={{ fill: cssVars.colour.primary.fill }}
    />
    {/* Rail icon 1 */}
    <rect
      x="115"
      y="100"
      width="26"
      height="26"
      rx="6"
      style={{ fill: cssVars.colour.neutral[10], opacity: 0.25 }}
    />
    {/* Rail icon 2 – active */}
    <rect
      x="115"
      y="140"
      width="26"
      height="26"
      rx="6"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    {/* Rail icon 3 */}
    <rect
      x="115"
      y="180"
      width="26"
      height="26"
      rx="6"
      style={{ fill: cssVars.colour.neutral[10], opacity: 0.25 }}
    />
    {/* Rail icon 4 */}
    <rect
      x="115"
      y="220"
      width="26"
      height="26"
      rx="6"
      style={{ fill: cssVars.colour.neutral[10], opacity: 0.25 }}
    />
    {/* Panel divider */}
    <line
      x1="153"
      y1="75"
      x2="153"
      y2="392"
      style={{ stroke: cssVars.colour.neutral[40], strokeWidth: 1 }}
    />
    {/* Group header 1 */}
    <rect
      x="172"
      y="100"
      width="72"
      height="8"
      rx="4"
      style={{ fill: cssVars.colour.neutral[60] }}
    />
    {/* Sub-item 1a */}
    <rect
      x="182"
      y="126"
      width="100"
      height="6"
      rx="3"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Sub-item 1b */}
    <rect
      x="182"
      y="148"
      width="80"
      height="6"
      rx="3"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Sub-item 1c */}
    <rect
      x="182"
      y="170"
      width="90"
      height="6"
      rx="3"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Group header 2 */}
    <rect
      x="172"
      y="206"
      width="60"
      height="8"
      rx="4"
      style={{ fill: cssVars.colour.neutral[60] }}
    />
    {/* Sub-item 2a */}
    <rect
      x="182"
      y="232"
      width="86"
      height="6"
      rx="3"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Sub-item 2b */}
    <rect
      x="182"
      y="254"
      width="70"
      height="6"
      rx="3"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
  </svg>
);

export default Thumbnail;

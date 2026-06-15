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
    {/* Input container */}
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
    {/* Tag 1 */}
    <rect
      x="66"
      y="214"
      width="120"
      height="40"
      rx="20"
      style={{ fill: cssVars.colour.neutral[30] }}
    />
    <rect
      x="76"
      y="226"
      width="70"
      height="16"
      rx="8"
      style={{ fill: cssVars.colour.neutral[60] }}
    />
    {/* Tag 1 close */}
    <circle cx="162" cy="234" r="10" style={{ fill: cssVars.colour.neutral[50] }} />
    {/* Tag 2 */}
    <rect
      x="200"
      y="214"
      width="140"
      height="40"
      rx="20"
      style={{ fill: cssVars.colour.neutral[30] }}
    />
    <rect
      x="210"
      y="226"
      width="90"
      height="16"
      rx="8"
      style={{ fill: cssVars.colour.neutral[60] }}
    />
    {/* Tag 2 close */}
    <circle cx="316" cy="234" r="10" style={{ fill: cssVars.colour.neutral[50] }} />
    {/* Tag 3 */}
    <rect
      x="354"
      y="214"
      width="100"
      height="40"
      rx="20"
      style={{ fill: cssVars.colour.neutral[30] }}
    />
    <rect
      x="364"
      y="226"
      width="50"
      height="16"
      rx="8"
      style={{ fill: cssVars.colour.neutral[60] }}
    />
    {/* Tag 3 close */}
    <circle cx="430" cy="234" r="10" style={{ fill: cssVars.colour.neutral[50] }} />
    {/* Cursor line */}
    <rect
      x="474"
      y="216"
      width="2"
      height="36"
      style={{ fill: cssVars.colour.neutral[70] }}
    />
  </svg>
);

export default Thumbnail;

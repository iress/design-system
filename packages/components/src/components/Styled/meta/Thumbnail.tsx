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
      x="200"
      y="133"
      width="351"
      height="201"
      rx="12"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    <rect
      x="220"
      y="153"
      width="311"
      height="161"
      rx="8"
      style={{ fill: cssVars.colour.neutral[10] }}
      stroke={cssVars.colour.primary.text}
      strokeWidth="2"
      strokeDasharray="6 4"
    />
    <rect
      x="240"
      y="173"
      width="80"
      height="12"
      rx="6"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="240"
      y="197"
      width="200"
      height="12"
      rx="6"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="240"
      y="221"
      width="140"
      height="12"
      rx="6"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
  </svg>
);

export default Thumbnail;

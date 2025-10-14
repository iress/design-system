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
      x="331"
      y="189"
      width="90"
      height="90"
      rx="45"
      style={{
        fill: cssVars.colour.neutral[10],
        stroke: cssVars.colour.primary.text,
      }}
      strokeWidth="10"
    />
    <rect
      x="351"
      y="209"
      width="50"
      height="50"
      rx="25"
      style={{ fill: cssVars.colour.primary.text }}
    />
  </svg>
);

export default Thumbnail;

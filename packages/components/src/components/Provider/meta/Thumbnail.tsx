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
    {/* Outer wrapper (Provider) */}
    <rect
      x="100"
      y="100"
      width="551"
      height="267"
      rx="20"
      stroke={cssVars.colour.primary.fill}
      strokeWidth="3"
      strokeDasharray="12 6"
      fill="none"
    />
    {/* Inner components */}
    <rect
      x="150"
      y="150"
      width="180"
      height="80"
      rx="12"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    <rect
      x="370"
      y="150"
      width="230"
      height="80"
      rx="12"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    <rect
      x="150"
      y="270"
      width="450"
      height="60"
      rx="12"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    {/* Label */}
    <text
      x="375"
      y="85"
      textAnchor="middle"
      style={{ fill: cssVars.colour.primary.text, fontSize: '24px', fontFamily: 'sans-serif' }}
    >
      IressProvider
    </text>
  </svg>
);

export default Thumbnail;

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
    <circle
      cx="375"
      cy="233"
      r="120"
      style={{ fill: cssVars.colour.primary.surface }}
      stroke={cssVars.colour.neutral[10]}
      strokeWidth="4"
    />
    <text
      x="375"
      y="253"
      textAnchor="middle"
      style={{
        fill: cssVars.colour.primary.text,
        fontSize: '72px',
        fontFamily: cssVars.typography.base.headingFont,
        fontWeight: 500,
      }}
    >
      BC
    </text>
    <circle
      cx="462"
      cy="150"
      r="24"
      style={{ fill: cssVars.colour.primary.fill }}
      stroke={cssVars.colour.neutral[20]}
      strokeWidth="10"
    />
  </svg>
);

export default Thumbnail;

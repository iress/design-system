import { image } from '@/components/Image';
import { cssVars } from '@iress-oss/ids-tokens';

const Thumbnail = () => (
  <svg
    viewBox="0 0 751 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={image()}
  >
    <g clip-path="url(#clip0_1008_2310)">
      <rect
        width="751"
        height="467"
        style={{ fill: cssVars.colour.neutral[10] }}
      />
      <rect
        width="751"
        height="467"
        style={{ fill: cssVars.colour.neutral[20] }}
      />
      <rect
        x="152"
        y="174"
        width="447"
        height="121"
        rx="25"
        style={{ fill: cssVars.colour.primary.fill }}
      />
      <rect
        x="243"
        y="221"
        width="259"
        height="27"
        rx="13.5"
        style={{ fill: cssVars.colour.primary.onFill }}
      />
    </g>
    <defs>
      <clipPath id="clip0_1008_2310">
        <rect
          width="751"
          height="467"
          style={{ fill: cssVars.colour.neutral[10] }}
        />
      </clipPath>
    </defs>
  </svg>
);

export default Thumbnail;

import { image } from '@/components/Image';
import { cssVars } from '@iress-oss/ids-tokens';

const Thumbnail = () => (
  <svg
    viewBox="0 0 751 467"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={image()}
  >
    <g clip-path="url(#clip0_1008_2321)">
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
        x="191"
        y="174"
        width="370"
        height="119"
        rx="24"
        style={{ fill: cssVars.colour.neutral[30] }}
        stroke="#D7D8DA"
        stroke-width="2"
      />
      <rect
        x="232"
        y="220"
        width="107"
        height="26"
        rx="13"
        style={{ fill: cssVars.colour.neutral[50] }}
      />
      <rect
        x="387"
        y="189"
        width="154"
        height="89"
        rx="25"
        style={{ fill: cssVars.colour.primary.fill }}
      />
      <rect
        x="413"
        y="220"
        width="102"
        height="26"
        rx="13"
        style={{ fill: cssVars.colour.primary.onFill }}
      />
    </g>
    <defs>
      <clipPath id="clip0_1008_2321">
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

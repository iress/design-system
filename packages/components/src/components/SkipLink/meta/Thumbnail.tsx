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
      x="284"
      y="23"
      width="184"
      height="49.8076"
      rx="16"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <rect
      x="323"
      y="42.3468"
      width="106.613"
      height="11.1141"
      rx="5.55705"
      style={{ fill: cssVars.colour.primary.surface }}
    />
    <rect
      x="219"
      y="218"
      width="442"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="219"
      y="286"
      width="442"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="219"
      y="155"
      width="191"
      height="27"
      rx="13.5"
      style={{ fill: cssVars.colour.primary.text }}
    />
    <rect
      x="90"
      y="155"
      width="93"
      height="158"
      rx="16"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
  </svg>
);

export default Thumbnail;

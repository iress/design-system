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
    {/* Alert - inline banner */}
    <rect
      x="90"
      y="60"
      width="571"
      height="60"
      rx="8"
      style={{ fill: cssVars.colour.system.info.surface }}
    />
    <rect
      x="120"
      y="82"
      width="16"
      height="16"
      rx="8"
      style={{ fill: cssVars.colour.system.info.text }}
    />
    <rect
      x="148"
      y="82"
      width="200"
      height="16"
      rx="4"
      style={{ fill: cssVars.colour.system.info.text }}
    />
    {/* Toast - floating card */}
    <rect
      x="431"
      y="350"
      width="230"
      height="56"
      rx="8"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    <rect
      x="451"
      y="370"
      width="16"
      height="16"
      rx="8"
      style={{ fill: cssVars.colour.system.success.text }}
    />
    <rect
      x="479"
      y="370"
      width="140"
      height="16"
      rx="4"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    {/* Modal - centred overlay */}
    <rect
      x="175"
      y="170"
      width="400"
      height="200"
      rx="12"
      style={{ fill: cssVars.colour.neutral[10] }}
    />
    <rect
      x="205"
      y="200"
      width="160"
      height="18"
      rx="4"
      style={{ fill: cssVars.colour.neutral[80] }}
    />
    <rect
      x="205"
      y="235"
      width="340"
      height="12"
      rx="4"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="205"
      y="255"
      width="280"
      height="12"
      rx="4"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <rect
      x="440"
      y="320"
      width="100"
      height="32"
      rx="6"
      style={{ fill: cssVars.colour.primary.text }}
    />
  </svg>
);

export default Thumbnail;

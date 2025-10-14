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
    <path
      d="M536 306H358L392.491 256.487L394.973 252.92L439.919 188.392C440.714 187.404 441.711 186.594 442.843 186.012C443.976 185.43 445.22 185.091 446.495 185.016C447.769 184.941 449.045 185.132 450.24 185.576C451.435 186.02 452.521 186.709 453.429 187.595C453.662 187.847 453.878 188.113 454.076 188.392L536 306Z"
      style={{ fill: cssVars.colour.neutral[50] }}
    />
    <path
      d="M421 306H216.762C216.507 306.002 216.252 305.982 216 305.938L312.599 138.438C313.188 137.395 314.044 136.527 315.078 135.923C316.112 135.318 317.288 135 318.485 135C319.683 135 320.859 135.318 321.893 135.923C322.927 136.527 323.783 137.395 324.372 138.438L389.199 250.844L392.306 256.222L421 306Z"
      style={{ fill: cssVars.colour.primary.text }}
    />
  </svg>
);

export default Thumbnail;

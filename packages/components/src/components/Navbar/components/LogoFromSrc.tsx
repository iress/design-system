import { propagateTestid } from '@helpers/utility/propagateTestid';

import styles from '../Navbar.module.scss';

export const LogoFromSrc = ({
  logoSrc,
  logoAltText,
  onError,
  dataTestid,
}: {
  logoSrc: string;
  logoAltText: string;
  onError: () => void;
  dataTestid?: string;
}) => (
  <img
    src={logoSrc}
    className={styles.logoImage}
    data-testid={propagateTestid(dataTestid, 'logo')}
    alt={logoAltText}
    onError={onError}
  />
);

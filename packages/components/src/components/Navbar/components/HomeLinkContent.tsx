import { IressIcon } from '../../Icon';

import { LogoFromSrc } from './LogoFromSrc';

import styles from '../Navbar.module.scss';

export const HomeLinkContent = ({
  logoSrc,
  logoFound,
  logoAltText,
  onError,
  dataTestid,
}: {
  logoSrc: string;
  logoFound: boolean;
  logoAltText: string;
  onError: () => void;
  dataTestid?: string;
}) => {
  if (logoSrc === '') {
    return null;
  }
  if (logoFound) {
    return (
      <LogoFromSrc
        logoSrc={logoSrc}
        logoAltText={logoAltText}
        onError={onError}
        dataTestid={dataTestid}
      />
    );
  }
  return (
    <IressIcon
      name="home"
      screenreaderText={logoAltText}
      size="2x"
      className={styles.logoIcon}
    />
  );
};

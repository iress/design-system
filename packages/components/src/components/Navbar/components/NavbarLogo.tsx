import classNames from 'classnames';
import { propagateTestid } from '@helpers/utility/propagateTestid';

import { HomeLinkContent } from './HomeLinkContent';
import { LogoFromSrc } from './LogoFromSrc';

import styles from '../Navbar.module.scss';

export const NavbarLogo = ({
  homeUrl,
  logoSrc,
  logoFound,
  logoAltText,
  onError,
  dataTestid,
}: {
  homeUrl: string;
  logoSrc: string;
  logoFound: boolean;
  logoAltText: string;
  onError: () => void;
  dataTestid?: string;
}) => {
  if (homeUrl !== '') {
    return (
      <a
        href={homeUrl}
        className={classNames(styles.logoLink, styles.slot)}
        data-testid={propagateTestid(dataTestid, 'logo-link')}
      >
        <HomeLinkContent
          logoSrc={logoSrc}
          logoFound={logoFound}
          logoAltText={logoAltText}
          onError={onError}
          dataTestid={dataTestid}
        />
      </a>
    );
  }
  if (logoSrc !== '') {
    return (
      <LogoFromSrc
        logoSrc={logoSrc}
        logoAltText={logoAltText}
        onError={onError}
        dataTestid={dataTestid}
      />
    );
  }
  return null;
};

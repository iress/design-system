import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import {
  type IressNavbarProps,
  NavbarHorizontalAlign,
  type NavbarWithEnums,
} from './Navbar.types';
import { Breakpoint } from '@/enums';
import { IressIcon } from '../Icon';
import { IressPanel } from '../Panel';
import { IressHide } from '../Hide';
import { IressButton } from '../Button';

import styles from './Navbar.module.scss';
import { idsLogger } from '@helpers/utility/idsLogger';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { NavbarLogo } from './components/NavbarLogo';
import { type Breakpoints, type ResponsiveSizing } from '@/main';

export const IressNavbar: NavbarWithEnums = ({
  logo,
  nav,
  className,
  children,
  breakpoint,
  fixed = false,
  handledFocus = false,
  homeUrl = '',
  horizontalAlign,
  logoAltText = '',
  logoSrc = '',
  navLabel = 'Main navigation',
  'data-testid': dataTestid,
  ...restProps
}: IressNavbarProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [hasNavSlotContent, setHasNavSlotContent] = useState(false);
  const [logoFound, setLogoFound] = useState(true);
  const [hideNavigation, setHideNavigation] = useState(true);
  const [navBreakpoints, setNavBreakpoints] = useState({});

  const updateNavBreakpoints = useCallback((): void => {
    const hidden = hideNavigation;
    const breakpointValues = {
      xs: hidden,
      sm: hidden,
      md: hidden,
      lg: hidden,
      xl: hidden,
      xxl: hidden,
    };

    let foundBreakpoint = false;
    let availableBreakpoint: Breakpoints;

    for (availableBreakpoint in breakpointValues) {
      if (foundBreakpoint) {
        breakpointValues[availableBreakpoint] = false;
      }

      if (availableBreakpoint === breakpoint) {
        foundBreakpoint = true;
      }
    }
    setNavBreakpoints(breakpointValues);
  }, [breakpoint, hideNavigation]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateNavBreakpoints();
      if (nav) {
        setHasNavSlotContent(true);
      }
    }, 0);
    if (logoSrc !== '' && logoAltText === '') {
      idsLogger(
        `IressNavbar: You've supplied a logo but no alt text, which is a failure of WCAG Level A Success Criterion 1.1.1 - Non-text content. Set the logoAltText prop to add alt text to the logo.`,
        'warn',
      );
    }
    return () => clearTimeout(timeout);
  }, [updateNavBreakpoints, nav, logoSrc, logoAltText]);

  const applyStickyMargin = useCallback(() => {
    if (!elementRef.current?.classList.contains(styles.fixed)) {
      return;
    }

    const { top, height } = elementRef.current.getBoundingClientRect();
    const adjustedTop = `${top + height}px`;

    const navbarElement = document.querySelector('[data-component="navbar"]');
    if (navbarElement) {
      navbarElement.setAttribute('data-sticky-margin', adjustedTop);
    }
  }, []);

  const initHandleFocus = useCallback(() => {
    const observer = new ResizeObserver(applyStickyMargin.bind(elementRef));
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    document.addEventListener(
      'focus',
      applyStickyMargin.bind(elementRef),
      true,
    );
  }, [applyStickyMargin]);

  useEffect(() => {
    if (fixed && handledFocus) {
      initHandleFocus();
    }
    return () => {
      document.removeEventListener(
        'focus',
        applyStickyMargin.bind(elementRef),
        true,
      );
    };
  }, [fixed, handledFocus, initHandleFocus, applyStickyMargin]);

  const toggleNavigation = () => {
    setHideNavigation(!hideNavigation);
    updateNavBreakpoints();
  };

  const setToggleButtonHideProp = (): ResponsiveSizing<boolean> => {
    const breakpoints: Breakpoints[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    const thisBreakpointIndex = (breakpoints as string[]).indexOf(breakpoint as string);
    const nextBreakpointIndex = thisBreakpointIndex + 1;

    if (nextBreakpointIndex >= breakpoints.length) {
      return {};
    }

    return {
      [breakpoints[nextBreakpointIndex]]: true,
    };
  };

  const hideHiddenOnProp = setToggleButtonHideProp();

  return (
    <div
      className={classNames(className, {
        [styles.navbar]: true,
        [styles.fixed]: fixed,
        [styles[`breakpoint--${breakpoint}`]]: breakpoint !== undefined,
      })}
      data-testid={dataTestid}
      ref={elementRef}
      {...restProps}
    >
      <header>
        <IressPanel
          padding="none"
          background="transparent"
          noBorderRadius
          className={styles.panel}
        >
          {!!(breakpoint !== undefined) && (
            <IressHide hiddenOn={hideHiddenOnProp}>
              <IressButton
                onClick={() => toggleNavigation()}
                mode="tertiary"
                className={styles.toggleButton}
                data-testid={propagateTestid(
                  dataTestid,
                  'toggle-button__button',
                )}
                aria-label="Toggle navigation"
                aria-controls="iress-navbar__nav-slot"
                aria-expanded={!hideNavigation}
              >
                <IressIcon name="bars" size="2x" />
              </IressButton>
            </IressHide>
          )}
          {logo ? (
            <div className={styles.logoSlot}>{logo}</div>
          ) : (
            <NavbarLogo
              homeUrl={homeUrl}
              logoSrc={logoSrc}
              logoFound={logoFound}
              logoAltText={logoAltText}
              dataTestid={dataTestid}
              onError={() => setLogoFound(false)}
            />
          )}
          <div
            className={classNames({
              [styles.content]: true,
              [styles.contentBetween]: horizontalAlign === 'between',
              [styles.contentEnd]: horizontalAlign === 'end',
              [styles.contentStart]: horizontalAlign === 'start',
              [styles.slot]: true,
            })}
          >
            {children}
            {!!hasNavSlotContent &&
              (breakpoint !== undefined ? (
                <IressHide hiddenOn={navBreakpoints} className={styles.navHide}>
                  <nav
                    aria-label={navLabel}
                    className={styles.navSlot}
                    data-testid={propagateTestid(dataTestid, 'nav')}
                    id="iress-navbar__nav-slot"
                  >
                    {nav}
                  </nav>
                </IressHide>
              ) : (
                <nav
                  aria-label={navLabel}
                  className={styles.navSlot}
                  data-testid={propagateTestid(dataTestid, 'nav')}
                >
                  {nav}
                </nav>
              ))}
          </div>
        </IressPanel>
      </header>
    </div>
  );
};

/** @deprecated IressNavbar.HorizontalAlign enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressNavbar.HorizontalAlign = NavbarHorizontalAlign;

/** @deprecated IressNavbar.Breakpoint enum is now deprecated and will be removed in a future version. Please use the value directly instead. **/
IressNavbar.Breakpoint = Breakpoint;

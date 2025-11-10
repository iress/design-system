import { type FloatingUIContainer } from '@/types';
import { useMemo, type ReactNode } from 'react';
import { IressModalProvider } from '../Modal';
import {
  IressToasterProvider,
  type IressToasterProviderProps,
} from '../Toaster';
import {
  IressSlideoutProvider,
  type IressSlideoutProviderProps,
} from '../Slideout';
import { createPortal } from 'react-dom';
import { defaultFonts } from '@iress-oss/ids-tokens';

export interface IressProviderProps
  extends IressSlideoutProviderProps,
    Pick<IressToasterProviderProps, 'position'> {
  /**
   * The contents of your application, and/or the components which will be calling slideouts, modals and toasts.
   */
  children?: ReactNode;

  /**
   * Container to render modal, slideouts and toasts into.
   * If not provided, will render into the body of the document.
   */
  container?: FloatingUIContainer;

  /**
   * If you don't want to load the default Iress font from the CDN, set this to true.
   */
  noDefaultFont?: boolean;

  /**
   * If you don't want to load the Iress Icon CSS from the CDN, set this to true.
   */
  noIcons?: boolean;
}

export const IressProvider = ({
  children,
  container,
  noDefaultFont,
  noIcons,
  position,
  ...restProps
}: IressProviderProps) => {
  const includeDefaultFont = useMemo(() => {
    if (noDefaultFont) {
      return false;
    }

    return !document.head.querySelector('link[data-iress-design-system-font]');
  }, [noDefaultFont]);

  const includeIcons = useMemo(() => {
    if (noIcons) {
      return false;
    }

    return !document.head.querySelector('link[data-iress-design-system-icons]');
  }, [noIcons]);

  return (
    <IressModalProvider container={container}>
      <IressToasterProvider container={container} position={position}>
        <IressSlideoutProvider container={container} {...restProps}>
          {children}
        </IressSlideoutProvider>
      </IressToasterProvider>
      {includeDefaultFont &&
        createPortal(
          defaultFonts.map((font) => (
            <link
              key={font}
              rel="stylesheet"
              href={font}
              data-iress-design-system-font
            />
          )),
          document.head,
          'design-system-font',
        )}
      {includeIcons &&
        createPortal(
          <link
            rel="stylesheet"
            href="https://cdn.iress.com/icons/5.15.4/css/combined.min.css"
            data-iress-design-system-icons
          />,
          document.head,
          'design-system-icons',
        )}
    </IressModalProvider>
  );
};

import { type FloatingUIContainer } from '@/types';
import { type ReactNode } from 'react';
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

export interface IressProviderProps
  extends Pick<IressSlideoutProviderProps, 'injectPushStyles'>,
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
   * If you don't want to load the Iress Icon CSS from the CDN, set this to true.
   */
  noIcons?: boolean;
}

export const IressProvider = ({
  children,
  container,
  injectPushStyles,
  noIcons,
  position,
  ...restProps
}: IressProviderProps) => (
  <IressModalProvider container={container}>
    <IressToasterProvider container={container} position={position}>
      <IressSlideoutProvider
        container={container}
        injectPushStyles={injectPushStyles}
        {...restProps}
      >
        {children}
      </IressSlideoutProvider>
    </IressToasterProvider>
    {!noIcons &&
      createPortal(
        <link
          rel="stylesheet"
          href="https://cdn.iress.com/icons/5.15.4/css/combined.min.css"
        />,
        document.head,
        'design-system-icons',
      )}
  </IressModalProvider>
);

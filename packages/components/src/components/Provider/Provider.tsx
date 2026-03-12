import type { FloatingUIContainer } from '@/types';
import type { ReactNode } from 'react';
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
import { IressIconProvider, type IressIconProviderProps } from '../Icon';

export interface IressProviderProps
  extends
    IressSlideoutProviderProps,
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
   * Disable the built-in IconProvider.
   * When true, no IconProvider is rendered, allowing you to provide your own
   * icon loading mechanism (e.g. hiding the app until the Material Symbols font is fully loaded).
   * @default false
   */
  noIconProvider?: boolean;

  /**
   * Disable automatic font subsetting via Google Fonts CDN
   * When false, only icons actually used in the component tree are loaded
   * When true, the full Material Symbols font is loaded
   * Ignored when `noIconProvider` is true.
   * @default false
   */
  noSubsetting?: IressIconProviderProps['noSubsetting'];

  /**
   * If you don't want to load the default Iress font from the CDN, set this to true.
   */
  noDefaultFont?: boolean;
}

export const IressProvider = ({
  children,
  container,
  noDefaultFont,
  noIconProvider,
  noSubsetting,
  position,
  ...restProps
}: IressProviderProps) => {
  const content = noIconProvider ? (
    children
  ) : (
    <IressIconProvider container={container} noSubsetting={noSubsetting}>
      {children}
    </IressIconProvider>
  );

  return (
    <IressModalProvider container={container}>
      <IressToasterProvider container={container} position={position}>
        <IressSlideoutProvider container={container} {...restProps}>
          {content}
        </IressSlideoutProvider>
      </IressToasterProvider>
      {!noDefaultFont &&
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
    </IressModalProvider>
  );
};

IressProvider.displayName = 'IressProvider';

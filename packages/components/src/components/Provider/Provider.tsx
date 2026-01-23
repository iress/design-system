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
   * Disable automatic font subsetting via Google Fonts CDN
   * When false, only icons actually used in the component tree are loaded
   * When true, the full Material Symbols font is loaded
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
  position,
  ...restProps
}: IressProviderProps) => {
  return (
    <IressModalProvider container={container}>
      <IressToasterProvider container={container} position={position}>
        <IressSlideoutProvider container={container} {...restProps}>
          <IressIconProvider container={container} noSubsetting>
            {children}
          </IressIconProvider>
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

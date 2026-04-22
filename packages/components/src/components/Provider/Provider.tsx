import type { FloatingUIContainer } from '@/types';
import { type ReactNode, useEffect } from 'react';
import { IressModalProvider } from '../Modal';
import {
  IressToasterProvider,
  type IressToasterProviderProps,
} from '../Toaster';
import {
  IressSlideoutProvider,
  type IressSlideoutProviderProps,
} from '../Slideout';
import { IressPopoverProvider } from '../Popover';
import { createPortal } from 'react-dom';
import { defaultFonts } from '@iress-oss/ids-tokens';
import { IressIconProvider, type IressIconProviderProps } from '../Icon';
import { Z_INDEX_OFFSET_VAR, TOASTER_OFFSET_VAR } from '@/constants';

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

  /**
   * A value added to every IDS z-index layer via `calc()`.
   * Use this when your application has a navigation element with a high z-index
   * and IDS overlays (modal, slideout, toast) appear behind it.
   *
   * @example
   * // Navbar sits at z-index 995 — shift IDS layers above it:
   * <IressProvider zIndexOffset={1000}>...</IressProvider>
   * // Modal → 1400, Toast → 1500, Tooltip → 1600
   */
  zIndexOffset?: number;

  /**
   * Offsets the toaster from the viewport edge (block axis).
   * Useful when a fixed navbar would overlap the toaster.
   * Accepts any valid CSS length value (e.g. `'60px'`, `'4rem'`).
   *
   * @example
   * <IressProvider toasterOffset="60px">...</IressProvider>
   */
  toasterOffset?: string;
}

export const IressProvider = ({
  children,
  container,
  noDefaultFont,
  noIconProvider,
  noSubsetting,
  position,
  zIndexOffset,
  toasterOffset,
  ...restProps
}: IressProviderProps) => {
  useEffect(() => {
    if (zIndexOffset === undefined) {
      return;
    }

    const root = document.documentElement;
    const previousInlineValue = root.style.getPropertyValue(Z_INDEX_OFFSET_VAR);
    const nextValue = String(zIndexOffset);

    root.style.setProperty(Z_INDEX_OFFSET_VAR, nextValue);

    return () => {
      const currentInlineValue =
        root.style.getPropertyValue(Z_INDEX_OFFSET_VAR);

      if (currentInlineValue !== nextValue) {
        return;
      }

      if (previousInlineValue) {
        root.style.setProperty(Z_INDEX_OFFSET_VAR, previousInlineValue);
      } else {
        root.style.removeProperty(Z_INDEX_OFFSET_VAR);
      }
    };
  }, [zIndexOffset]);

  useEffect(() => {
    if (toasterOffset === undefined) {
      return;
    }

    const root = document.documentElement;
    const previousInlineValue = root.style.getPropertyValue(TOASTER_OFFSET_VAR);

    root.style.setProperty(TOASTER_OFFSET_VAR, toasterOffset);

    return () => {
      const currentInlineValue =
        root.style.getPropertyValue(TOASTER_OFFSET_VAR);

      if (currentInlineValue !== toasterOffset) {
        return;
      }

      if (previousInlineValue) {
        root.style.setProperty(TOASTER_OFFSET_VAR, previousInlineValue);
      } else {
        root.style.removeProperty(TOASTER_OFFSET_VAR);
      }
    };
  }, [toasterOffset]);

  const providers = (
    <IressPopoverProvider container={container}>
      <IressModalProvider container={container}>
        <IressToasterProvider container={container} position={position}>
          <IressSlideoutProvider container={container} {...restProps}>
            {children}
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
    </IressPopoverProvider>
  );

  if (noIconProvider) {
    return providers;
  }

  return (
    <IressIconProvider container={container} noSubsetting={noSubsetting}>
      {providers}
    </IressIconProvider>
  );
};

IressProvider.displayName = 'IressProvider';

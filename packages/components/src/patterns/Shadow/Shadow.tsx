import {
  forwardRef,
  type ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import idsCss from '../../styled-system/styles.css?raw';
import { defaultFonts } from '@iress-oss/ids-tokens';
import { type IressUnstyledProps } from '@/types';
import { IressProvider } from '@/components/Provider';

export interface IressShadowProps extends IressUnstyledProps {
  /**
   * Children to be rendered inside the shadow DOM
   */
  children?: ReactNode;

  /**
   * Optional array of font URLs to be included in the parent document head.
   * By default it will include the default fonts from `@iress-oss/ids-tokens`
   * (e.g., ['https://fonts.googleapis.com/css?family=Roboto']
   */
  fontFaceUrls?: string[];

  /**
   * If true, the Iress icon stylesheet will not be included in the shadow DOM and the head.
   */
  noIcons?: boolean;

  /**
   * Optional array of stylesheet contents to be included in the shadow DOM
   * (e.g. { styleId: '.my-class { color: red; }' })
   */
  stylesheetContents?: Record<string, string>;

  /**
   * Optional array of stylesheet URLs to be included in the shadow DOM
   * (e.g., ['https://example.com/style.css'])
   */
  stylesheetUrls?: string[];
}

/**
 * This component allows you to encapsulate its children within a Shadow DOM.
 * It automatically includes the IDS CSS and allows for additional stylesheets
 * and font faces to be added either to the shadow DOM or the parent document head.
 */
export const IressShadow = forwardRef<ShadowRoot | null, IressShadowProps>(
  (
    {
      children,
      fontFaceUrls = [...defaultFonts],
      noIcons,
      stylesheetContents = {},
      stylesheetUrls = [],
      ...restProps
    },
    ref,
  ) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

    useEffect(() => {
      if (!hostRef.current) return;

      if (!hostRef.current.shadowRoot) {
        const shadow = hostRef.current.attachShadow({ mode: 'open' });

        const idsStyle = document.createElement('style');
        const nonce = document
          .querySelector("meta[name='csp-nonce']")
          ?.getAttribute('content');
        if (nonce) idsStyle.setAttribute('nonce', nonce);

        idsStyle.textContent = idsCss;
        shadow.appendChild(idsStyle);

        const container = document.createElement('div');
        shadow.appendChild(container);
        containerRef.current = container;

        setShadowRoot(shadow);
      } else {
        setShadowRoot(hostRef.current.shadowRoot);
      }
    }, []);

    useEffect(() => {
      fontFaceUrls.forEach((font) => {
        if (document.head.querySelector(`link[href="${font}"]`)) {
          return;
        }

        const link = document.createElement('link');
        link.href = font;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      });
    }, [fontFaceUrls]);

    useEffect(() => {
      if (noIcons || !shadowRoot) return;

      const icons = document.createElement('link');
      icons.href = 'https://cdn.iress.com/icons/5.15.4/css/combined.min.css';
      icons.rel = 'stylesheet';
      shadowRoot.appendChild(icons);

      if (!document.head.querySelector(`link[href="${icons.href}"]`)) {
        document.head.appendChild(icons.cloneNode());
      }
    }, [noIcons, shadowRoot]);

    useEffect(() => {
      if (!shadowRoot) return;
      stylesheetUrls.forEach((url) => {
        if (shadowRoot.querySelector(`link[href="${url}"]`)) {
          return;
        }

        const link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        shadowRoot.appendChild(link);
      });
    }, [shadowRoot, stylesheetUrls]);

    useEffect(() => {
      if (!shadowRoot) return;
      Object.entries(stylesheetContents).forEach(([key, contents]) => {
        if (shadowRoot.querySelector(`style[id="${key}"]`)) {
          return;
        }
        const style = document.createElement('style');
        const nonce = document
          .querySelector("meta[name='csp-nonce']")
          ?.getAttribute('content');
        if (nonce) style.setAttribute('nonce', nonce);
        style.setAttribute('id', key);
        style.textContent = contents;
        shadowRoot.appendChild(style);
      });
    }, [shadowRoot, stylesheetContents]);

    useImperativeHandle<ShadowRoot | null, ShadowRoot | null>(
      ref,
      () => shadowRoot ?? null,
    );

    return (
      <div ref={hostRef} {...restProps}>
        <IressProvider container={containerRef} noDefaultFont noIcons>
          {shadowRoot && createPortal(children, shadowRoot)}
        </IressProvider>
      </div>
    );
  },
);

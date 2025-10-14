import { createElement, ElementType, Fragment, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import IDS_CSS from '@iress-oss/ids-components/dist/style.css?raw';
import {
  IressButton,
  IressForm,
  IressFormField,
  IressIcon,
  IressInline,
  IressPanel,
  IressRichSelect,
  IressSlideout,
  IressSlideoutProvider,
  IressStack,
  IressText,
  IressToggle,
} from '@/main';
import { searchStarWarsCharacters } from '@/mocks/starWars';

/**
 * This section creates a custom element that can be used in a microfrontend context.
 * It is copied from the Frontrunner scaffolder, please use that instead.
 */
interface AppStyleProp {
  uri?: string;
  styleContent?: string;
  importType?: 'link' | 'style';
}

class IressCustomElement extends HTMLElement {
  protected AppContent: ElementType;
  private rootId = '';
  private appCssUrls: AppStyleProp[];

  private appRootElement: HTMLElement | null = null;
  private reactRoot: Root | null = null;

  // Static property to hold shared styles
  static readonly sharedStyles: HTMLStyleElement[] = [];

  // Instance property to hold styles specific to this instance
  private instanceStyles: HTMLStyleElement[] = [];

  constructor() {
    super();
    this.AppContent = () => <Fragment />;
    this.appCssUrls = [];
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Define the React component and associated CSS URLs.
   * @param AppContent - The React component to render.
   * @param id - The id of the element where the React root will be attached
   * @param appCssUrls - Array of CSS configurations.
   */
  defineElement(
    AppContent: ElementType,
    rootId: string,
    appCssUrls?: AppStyleProp[],
  ) {
    this.AppContent = AppContent;
    this.rootId = rootId;
    this.appCssUrls = appCssUrls ?? [];
    void this.loadStyles();
  }

  /**
   * Lifecycle method called when the element is added to the DOM.
   */
  connectedCallback() {
    this.renderComponent();
  }

  /**
   * Lifecycle method called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    if (this.reactRoot && this.appRootElement) {
      this.reactRoot.unmount();
    }
  }

  /**
   * Load and inject remote and local CSS into the Shadow DOM.
   */
  private async loadStyles(): Promise<void> {
    try {
      const styles = [
        ...this.appCssUrls.map((style) =>
          style.uri
            ? this.createLinkElement(style.uri)
            : this.createStyleElement(style.styleContent ?? ''),
        ),
      ];

      for (const style of styles) {
        await this.injectStyle(style);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error loading styles: ${errorMessage}`);
    }
  }

  importCssFile(url: string): AppStyleProp {
    return {
      uri: new URL(url, import.meta.url).href,
      importType: 'link',
    };
  }

  importCssStyle(styleContent: string): AppStyleProp {
    return {
      styleContent,
      importType: 'style',
    };
  }

  /**
   * Create a link element for external CSS.
   * @param href - The URL of the CSS file.
   * @returns The created HTMLLinkElement.
   */
  private createLinkElement(href: string): HTMLLinkElement {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    return link;
  }

  /**
   * Create a style element for inline CSS.
   * @param cssContent - The CSS content.
   * @returns The created HTMLStyleElement.
   */
  private createStyleElement(cssContent: string): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = cssContent;
    return style;
  }

  /**
   * Inject a style element into the Shadow DOM.
   * @param style - The style element to inject.
   */
  private async injectStyle(
    style: HTMLLinkElement | HTMLStyleElement,
  ): Promise<void> {
    if (style.tagName.toLowerCase() === 'link') {
      // Wait for the stylesheet to load
      await new Promise<void>((resolve, reject) => {
        style.onload = () => resolve();
        style.onerror = () =>
          reject(
            new Error(`Failed to load CSS: ${style.getAttribute('href')}`),
          );
        this.shadowRoot?.appendChild(style);
      });
    } else {
      this.shadowRoot?.appendChild(style);
    }

    // Manage shared and instance-specific styles
    if (!IressCustomElement.sharedStyles.includes(style as HTMLStyleElement)) {
      IressCustomElement.sharedStyles.push(style as HTMLStyleElement);
      this.instanceStyles.push(style as HTMLStyleElement);
    }
  }

  /**
   * Attach the Shadow DOM and render the React application.
   */
  private renderComponent() {
    this.appRootElement = document.createElement('div');
    this.appRootElement.setAttribute('id', this.rootId);
    this.shadowRoot?.appendChild(this.appRootElement);
    this.renderReactApp();
  }

  /**
   * Render the React application within the Shadow DOM.
   */
  private renderReactApp() {
    const props = {
      ...this.getProps(this.attributes),
    };

    if (this.appRootElement) {
      this.reactRoot = createRoot(this.appRootElement);
      this.reactRoot.render(<this.AppContent {...props} />);
    }
  }

  /**
   * Extract props from the element's attributes.
   * @param attributes - The attributes of the custom element.
   * @returns An object containing the props.
   */
  private getProps(attributes: NamedNodeMap): Record<string, string> {
    return Array.from(attributes)
      .filter((attr) => attr.name !== 'style')
      .reduce(
        (props, attr) => {
          const propName = attr.name.replace(/-([a-z])/g, (_, char: string) =>
            char.toUpperCase(),
          );
          props[propName] = attr.value;
          return props;
        },
        {} as Record<string, string>,
      );
  }
}

class MicrofrontendElement extends IressCustomElement {
  constructor() {
    super();
    this.defineElement(MicrofrontendApp, 'microfrontend-app', [
      this.importCssStyle(IDS_CSS),
    ]);
  }
}

/**
 * This creates a parent custom element that has no style, essentially mocking
 * a situation where the the microfrontend is rendered inside a parent application without IDS loaded.
 */
class ParentElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'parent-app');
    wrapper.style.backgroundColor = 'lightgrey';
    wrapper.style.padding = '20px';

    const microfrontend = document.createElement('iress-microfrontend');

    shadow.appendChild(wrapper);
    wrapper.appendChild(microfrontend);
  }
}

class GrandparentElement extends IressCustomElement {
  constructor() {
    super();
    this.defineElement(GrandparentApp, 'grandparent-app', [
      this.importCssStyle(IDS_CSS),
    ]);
  }
}

if (!customElements.get('iress-microfrontend')) {
  customElements.define('iress-microfrontend', MicrofrontendElement);
  customElements.define('iress-parent', ParentElement);
  customElements.define('iress-grandparent', GrandparentElement);
}

/**
 * Actual application component that will be rendered inside the custom element.
 */
const MicrofrontendApp = () => {
  return (
    <IressPanel>
      <h3>Microfrontend form</h3>
      <p>
        This form is inside a microfrontend what is another microfrontend's
        slideout.
      </p>
      <IressForm>
        <IressStack gap="md">
          <IressFormField
            hint="Type to copy an existing character's name"
            label="Asynchronous options"
            name="star_wars_name"
            render={(controlledProps) => (
              <IressRichSelect
                {...controlledProps}
                options={searchStarWarsCharacters}
              />
            )}
          />

          <IressFormField
            label="Static options"
            name="gender"
            render={(controlledProps) => (
              <IressRichSelect
                {...controlledProps}
                options={[
                  {
                    label: 'Male',
                    value: 'male',
                    prepend: <IressIcon name="mars" />,
                  },
                  {
                    label: 'Female',
                    value: 'female',
                    prepend: <IressIcon name="venus" />,
                  },
                  {
                    label: 'Other',
                    value: 'other',
                    prepend: <IressIcon name="otter" />,
                  },
                ]}
              />
            )}
          />

          <IressButton mode="primary" type="submit">
            Sign up
          </IressButton>
        </IressStack>
      </IressForm>
    </IressPanel>
  );
};

/**
 * Grandparent that has the slideout
 */
const GrandparentApp = () => {
  const [show, setShow] = useState(true);
  const [md, setMd] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <IressSlideoutProvider container={container}>
      <div ref={container} />
      <IressPanel className="iress-m--lg">
        <IressInline gap="sm" verticalAlign="middle">
          <IressButton onClick={() => setShow(!show)}>
            Toggle Slideout
          </IressButton>
          <IressToggle onChange={setMd}>Medium size</IressToggle>
        </IressInline>
      </IressPanel>
      <IressSlideout
        show={show}
        onShowChange={setShow}
        eleToPush="#grandparent-app"
        mode="push"
        size={md ? 'md' : 'sm'}
      >
        <IressText>
          <h2>Microfrontend slideout</h2>
          <p>
            This is a slideout that is inside a microfrontend, and its contents
            are another microfrontend.
          </p>
        </IressText>
        {createElement('iress-parent')}
      </IressSlideout>
    </IressSlideoutProvider>
  );
};

export const SlideoutMicrofrontend = () => {
  // To avoid typescript issues, we have done it this way
  // But in your html it should be used as `<iress-microfrontend></iress-microfrontend>`
  return createElement('iress-grandparent');
};

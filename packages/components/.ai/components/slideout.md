# Slideout

> Displays supplementary content in a panel that slides in from the edge of the viewport.

## Import

```tsx
import { IressSlideout } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Slideout)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=slideout&title=[Slideout]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=slideout,enhancement&title=[Slideout]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | — | Content to be displayed within the slideout. |
| closeText | `string` | `Close` | Screenreader text for close button. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the slideout into. By default, the slideout will render at the end of the document body. |
| defaultShow | `boolean` | `false` | When set to `true` the slideout will be visible. Use for uncontrolled slideouts. |
| eleToPush | `string , HTMLElement , MutableRefObject<HTMLElement | null>` | — | The element that needs to be pushed relative to the slideout. This can be a string selector to match an existing element in the DOM, a html element, or a React reference. Will be ignored if `mode` is not set to `push` or if element does not exist. |
| footer | `ReactNode` | — | Panel to place slideout controls. |
| heading | `ReactElement>, string ` | — | Sets the heading for the slideout. If passed an element, it will render the element with an id, to ensure its connection to the slideout. |
| id | `string` | — | Unique ID for the slideout. Use if you would like to open this slideout from anywhere in your app using the `useSlideout` hook. |
| mode | `overlay`, `push`  | `overlay` | Sets how the Slideout interacts with the content of the page. `overlay` overlays the page content, obscuring the content below. `push` will push the element (specified by `eleToPush`) across the page. `push` will revert back to `overlay` if `eleToPush` is not specified or if the screen size < 1200px. |
| onShowChange | `((show: boolean, reason?: OpenChangeReason) => void)` | — | Emitted when the slideout has opened or closed internally. Use for controlled slideouts. |
| onStatus | ((status: `close` , `initial` , `open` , `unmounted`) => void) | — | Emitted when the slideout has mounted, unmounted, opened or closed. Open and close occur before animation begins. |
| onEntered | `(() => void)` | — | Emitted when the slideout has opened. |
| onExited | `(() => void)` | — | Emitted when the slideout has closed. |
| position | `left` , `right` | `right` | Position of the slideout relative to the page. `left` or `right`. |
| show | `boolean` | — | When set to `true` the slideout will be visible. Use for controlled slideouts. |
| size | `md`, `sm`  | `sm` | Accepts a single `SlideoutSize`. Slideouts will display at 100% for mobile screens (<576px). |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Slideout/Slideout.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../../tokens/.ai/tokens-reference.md)).

Slideouts are used to show additional information or to allow users to perform secondary tasks without leaving their normal workflow.

```tsx
import { IressButton, IressSlideout } from '@iress-oss/ids-components';
import { useState } from 'react';

export function SlideoutUsingState() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show slideout using state
      </IressButton>
      <IressSlideout
        show={show}
        onShowChange={setShow}
        heading="Slideout"
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      >
        This slideout was opened via state
      </IressSlideout>
    </>
  );
}
```

## Design

### When to use

- **Secondary tasks**: Editing details, viewing records, or completing sub-workflows alongside the main page
- **Supplemental information**: Showing additional context without navigating away
- **Multi-step flows**: Guided processes that don't warrant a full page change
- **Settings or filters**: Configuring options that apply to the current view

### When not to use

- **Blocking decisions** that require full attention — use a [Modal](../components/modal.md) instead
- **Brief status messages** — use [Alert](../components/alert.md) or [Toaster](../components/toaster.md)
- **Primary navigation** — use standard page routing

#### Use a page instead of a slideout when:

- **The content is the primary task** — if the user's entire focus shifts to the slideout, it should be a page
- **The user doesn't need to see the underlying page** — slideouts are for tasks where the parent context is useful; if not, a page is simpler
- **The form has many fields or complex validation** — large forms are harder to use in a narrow panel
- **The content needs a permalink** — slideouts don't have URLs; use a page for bookmarkable/shareable content
- **Mobile experience is critical** — slideouts on small screens overlay the full viewport anyway, making them effectively a page but with worse navigation

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use overlay mode when space is at a premium | Use slideouts for brief confirmations |
| Use push mode when users need to see page content alongside | Nest multiple slideouts |
| Provide a clear heading describing the slideout's purpose | Open a slideout from within another slideout |
| Include a close button and/or cancel action in the footer | Use slideouts for content that should be a separate page |

### Content guidelines

- **Heading**: Use sentence case, describe the task (e.g. "Edit profile", "Filter results")
- **Body**: Keep focused on a single task or information set
- **Footer**: Place primary action on the right, cancel/close on the left
- **Size**: Use `sm` for simple content, `md` for forms or detailed information

### Related patterns

- [Modal](../components/modal.md) — for blocking decisions requiring full attention
- [Popover](../components/popover.md) — for small contextual overlays
- [Feedback](../patterns/feedback.md) — decision tree for choosing the right feedback component

## Develop

### Quick Start

```tsx
import { IressSlideout } from '@iress-oss/ids-components';

<IressSlideout footer="Footer slot">Slideout content</IressSlideout>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs#api-props)

### Usage

#### Using the `show` property

Control the slideout with state via `show` and `onShowChange`.

```tsx
import { IressButton, IressSlideout } from '@iress-oss/ids-components';
import { useState } from 'react';

export function SlideoutUsingState() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show slideout using state
      </IressButton>
      <IressSlideout
        show={show}
        onShowChange={setShow}
        heading="Slideout"
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      >
        This slideout was opened via state
      </IressSlideout>
    </>
  );
}
```

#### Using the `IressSlideoutProvider`

Use `IressSlideoutProvider` to open/close slideouts from anywhere via a unique `id` and the `useSlideout` hook.

> **Note:** If using `IressProvider` or `IressShadow`, the slideout provider is already included.

```tsx
import {
  IressButton,
  IressSlideout,
  type IressSlideoutProps,
  IressSlideoutProvider,
  useSlideout,
} from '@iress-oss/ids-components';

const SLIDEOUT_ID = 'storybook-slideout';

export function AppWithSlideoutProvider(
  props: Partial<IressSlideoutProps> = {},
) {
  return (
    <IressSlideoutProvider>
      <SlideoutWithTrigger {...props} />
    </IressSlideoutProvider>
  );
}

function SlideoutWithTrigger({
  id = SLIDEOUT_ID,
  ...slideoutProps
}: Partial<IressSlideoutProps>) {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(id)}>
        Show slideout using provider
      </IressButton>
      <IressSlideout
        id={id}
        heading="Provider slideout"
        footer={
          <IressButton onClick={() => showSlideout(id, false)}>
            Close slideout
          </IressButton>
        }
        {...slideoutProps}
      >
        This slideout was opened via IressSlideoutProvider and the useSlideout
        hook.
      </IressSlideout>
    </>
  );
}
```

#### Modes

Slideouts support `overlay` (default, sits on top of content) and `push` (pushes page content aside).

```tsx
import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  IressText,
  useSlideout,
} from '@iress-oss/ids-components';

function SlideoutModeExample() {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gap="md">
      <IressButton onClick={() => showSlideout('overlay-example')}>
        Overlay slideout
      </IressButton>
      <IressSlideout id="overlay-example" heading="Overlay mode" mode="overlay">
        <IressText>
          The default mode. The slideout sits on top of page content.
        </IressText>
      </IressSlideout>

      <IressButton onClick={() => showSlideout('push-example')}>
        Push slideout
      </IressButton>
      <IressSlideout
        id="push-example"
        heading="Push mode"
        mode="push"
        eleToPush="#storybook-docs, html"
      >
        <IressText>
          Pushes page content aside. Requires the `eleToPush` prop with the ID
          of the element to push. Falls back to overlay on smaller screens.
        </IressText>
      </IressSlideout>
    </IressInline>
  );
}

export function SlideoutModes() {
  return (
    <IressSlideoutProvider>
      <SlideoutModeExample />
    </IressSlideoutProvider>
  );
}
```

#### Position

Use the `position` prop to slide in from `left` or `right` (default).

```tsx
import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  useSlideout,
} from '@iress-oss/ids-components';

const Slideouts = () => {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gap="md" horizontalAlign="between">
      <IressButton onClick={() => showSlideout('right')}>right</IressButton>
      <IressSlideout id="right" position="right">
        Slideout opened on the right
      </IressSlideout>
      <IressButton onClick={() => showSlideout('left')}>left</IressButton>
      <IressSlideout id="left" position="left">
        Slideout opened on the left
      </IressSlideout>
    </IressInline>
  );
};

export function SlideoutPositions() {
  return (
    <IressSlideoutProvider>
      <Slideouts />
    </IressSlideoutProvider>
  );
}
```

#### Size

The `size` prop sets the width: `sm` (default) or `md`.

```tsx
import {
  IressButton,
  IressInline,
  IressSlideout,
  IressSlideoutProvider,
  useSlideout,
} from '@iress-oss/ids-components';

const Slideouts = () => {
  const { showSlideout } = useSlideout();

  return (
    <IressInline gap="spacing.4">
      <IressButton onClick={() => showSlideout('sm')}>sm</IressButton>
      <IressSlideout id="sm" size="sm">
        Small slideout
      </IressSlideout>
      <IressButton onClick={() => showSlideout('md')}>md</IressButton>
      <IressSlideout id="md" size="md">
        Medium slideout
      </IressSlideout>
    </IressInline>
  );
};

export function SlideoutSizes() {
  return (
    <IressSlideoutProvider>
      <Slideouts />
    </IressSlideoutProvider>
  );
}
```

#### Footer

The `footer` prop adds content below the main content, typically buttons.

```tsx
import {
  IressButton,
  IressInline,
  IressSlideout,
  useSlideout,
} from '@iress-oss/ids-components';

const SLIDEOUT_ID = 'slideout-footer';

export function SlideoutWithFooter() {
  const { showSlideout } = useSlideout();

  return (
    <>
      <IressButton onClick={() => showSlideout(SLIDEOUT_ID)}>
        Open slideout with footer
      </IressButton>
      <IressSlideout
        id={SLIDEOUT_ID}
        heading="Slideout with footer"
        footer={
          <IressInline gap="sm">
            <IressButton mode="primary">Save</IressButton>
            <IressButton onClick={() => showSlideout(SLIDEOUT_ID, false)}>
              Cancel
            </IressButton>
          </IressInline>
        }
      >
        The footer stays fixed at the bottom of the slideout.
      </IressSlideout>
    </>
  );
}
```

#### Absolute position slideouts

Set `position: 'absolute'` in inline style to appear from the edge of a relative container instead of the browser window. Use the `container` prop to reference the container.

```tsx
import {
  IressStack,
  IressButton,
  IressText,
  IressSlideout,
} from '@iress-oss/ids-components';
import { useRef, useState } from 'react';
import { cssVars } from '@iress-oss/ids-tokens';

export function AbsolutePositionSlideout() {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <IressStack gap="md">
      <IressButton onClick={() => setShow(true)}>Show slideout</IressButton>
      <div
        ref={containerRef}
        style={{
          height: '300px',
          border: `1px solid ${cssVars.colour.neutral[30]}`,
          padding: '1rem',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <IressText id="contents">
          <h3>Absolute slideout</h3>
          <p>
            Almost before was mighty present had him time. But scorching counsel
            if mine dote men have or, one yet from pangs and for and despair
            there. If below nor but the name these deemed oh..
          </p>
        </IressText>
        <IressSlideout
          container={containerRef}
          show={show}
          onShowChange={setShow}
          eleToPush="#contents"
          position="left"
          mode="push"
          heading="Absolute slideout"
          style={{
            position: 'absolute',
          }}
        >
          Slideout content
        </IressSlideout>
      </div>
    </IressStack>
  );
}
```

### Testing

Query the slideout by its role:

```tsx
await user.click(screen.getByRole('button', { name: 'Open slideout' }));
const slideout = screen.findByRole('dialog', { name: 'Slideout heading' });

await user.click(screen.getByRole('button', { name: 'Close slideout' }));
await waitForElementToBeRemoved(slideout);
```

**Gotchas:**

- **Conditional rendering**: Use `findByRole` (async) — content isn't in the DOM until shown
- **Animation timing**: Animations can affect test timing — disable in test environments if needed

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| main | The root element of the slideout | `findByRole('dialog')` by default, or `findByRole('complementary')` if role is set to "complementary" | `slideout` |
| heading | The slideout heading | `getByRole('heading', { name: '...' })` | `slideout__heading` |
| close button | The close button | `findByRole('button', { name: 'Close' })` | `slideout__close-button__button` |
| content | The slideout content area | — | `slideout__content` |
| footer | The slideout footer | `getByText('...')` | `slideout__footer` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Slideout is hidden until `show` is `true` or opened via `useSlideout` |
| Overlay mode | Slides over page content with a backdrop |
| Push mode | Pushes page content aside, all content remains visible |
| Dismissed | Clicking close button, pressing Escape, or clicking backdrop closes it |
| Absolute position | Positioned relative to nearest relative container instead of viewport |

### Accessibility

**WCAG compliance:**

- **2.1.2 No Keyboard Trap** — Focus is trapped within slideout but can be dismissed via Escape
- **4.1.2 Name, Role, Value** — Uses `role="dialog"` with `aria-labelledby` pointing to heading
- **2.4.3 Focus Order** — Focus moves into slideout on open, returns to trigger on close

**ARIA roles:**

| Element | Role | Description |
|---------|------|-------------|
| Slideout container | `dialog` | Identifies the slideout as a dialog |
| Heading | referenced via `aria-labelledby` | Provides accessible name |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Escape` | Closes the slideout |
| `Tab` | Moves focus to next focusable element within the slideout |
| `Shift+Tab` | Moves focus to previous focusable element within the slideout |
| `Enter` / `Space` | Activates focused button |

### Edge cases

- **Conditional rendering**: Slideout content not in DOM until shown — use async queries in tests
- **Animation timing**: Animations can interfere with test assertions — disable in test environments
- **Push mode on small screens**: Ensure page content remains usable when pushed aside
- **Focus restore**: Focus returns to trigger element when slideout closes

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-slideout--docs)

## Recipes

### Microfrontend

```tsx
import {
  createElement,
  type ElementType,
  Fragment,
  useRef,
  useState,
} from 'react';
import { createRoot, type Root } from 'react-dom/client';
import IDS_CSS from '@iress-oss/ids-components/dist/style.css?raw';
import {
  IressButton,
  IressForm,
  IressFormField,
  IressIcon,
  IressInline,
  IressPanel,
  IressSelect,
  IressSlideout,
  IressSlideoutProvider,
  IressStack,
  IressText,
  IressToggle,
} from '@iress-oss/ids-components';
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
    if (!IressCustomElement.sharedStyles.includes(style)) {
      IressCustomElement.sharedStyles.push(style);
      this.instanceStyles.push(style);
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
              <IressSelect
                {...controlledProps}
                options={searchStarWarsCharacters}
              />
            )}
          />

          <IressFormField
            label="Static options"
            name="gender"
            render={(controlledProps) => (
              <IressSelect
                {...controlledProps}
                options={[
                  {
                    label: 'Male',
                    value: 'male',
                    prepend: <IressIcon name="male" />,
                  },
                  {
                    label: 'Female',
                    value: 'female',
                    prepend: <IressIcon name="female" />,
                  },
                  {
                    label: 'Other',
                    value: 'other',
                    prepend: <IressIcon name="agender" />,
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

export function SlideoutMicrofrontend() {
  // To avoid typescript issues, we have done it this way
  // But in your html it should be used as `<iress-microfrontend></iress-microfrontend>`
  return createElement('iress-grandparent');
}
```

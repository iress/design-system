# Modal

> Displays content in a focused overlay dialog that requires user interaction.

## Import

```tsx
import { IressModal } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/components/Modal)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=modal&title=[Modal]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=modal,enhancement&title=[Modal]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| actions | `[IressAlertButtonProps](../../dist/components/Modal/Modal.d.ts)[]` | — | Opinionated action buttons rendered in the modal footer. Each action is rendered as an `IressButton` with the modal's status automatically applied. |
| children | `ReactNode` | — | Text to be displayed inside the modal. |
| closeText | `string` | `Close` | Screenreader text for close button. |
| container | `[FloatingUIContainer](../../dist/types.d.ts)` | — | The container element to render the modal into. By default, the modal will render at the end of the document body. |
| defaultShow | `boolean` | `false` | When set to `true` the modal will be visible by default. Use for uncontrolled modals. |
| disableBackdropClick | `boolean` | — | When set to `true`, users cannot exit the modal by clicking the backdrop or using the escape key. |
| fixedFooter | `boolean` | — | When set to `true` the modal's footer will always be visible and fixed to the bottom of the modal. |
| footer | `ReactNode` | — | Content to be rendered in the modal footer. If `actions` are also provided, this content will be rendered below the actions. |
| heading | `ReactElement>, string ` | — | Sets the heading for the modal. If passed an element, it will render the element with an id, to ensure its connection to the modal. |
| id | `string` | — | Unique ID for the modal. Use if you would like to open this modal from anywhere in your app using the `useModal` hook. |
| noCloseButton | `boolean` | — | When set to `true`, no close button will be rendered. You must add your own closing mechanism to ensure accessibility. |
| onShowChange | `((show: boolean) => void)` | — | Emitted when the modal has opened or closed internally. Use for controlled modals. |
| onStatus | ((status: `close` , `initial` , `open` , `unmounted`) => void) | — | Emitted when the modal has mounted, unmounted, opened or closed. Open and close occur before animation begins. |
| onEntered | `(() => void)` | — | Emitted when the modal has opened. |
| onExited | `(() => void)` | — | Emitted when the modal has closed. |
| show | `boolean` | — | When set to `true` the modal will be visible. Use for controlled modals. |
| size | `lg`, `md` , `sm`  | — | Size of the modal: - `sm`: Small modals communicate the outcome of an irreversible action. They should be concise and straightforward, containing a single action and, in some cases, a single input field. - `md`: Medium modals provide optional supporting information to help users understand the context of a word or screen. They may contain a single action and, in some cases, a larger input such as a textarea. - `lg`: Large modals are used for more complex tasks that require multiple steps or a lot of information as well as media such as video and PDF documents. They can contain multiple actions, inputs, and supporting information.  If status is set, size can only be `sm` or `md`, and will default to `sm`. If status is not set, size can be `sm`, `md` or `lg`, and will default to `md`. |
| static | `boolean` | — | When set to `true`, the modal will act like a static element when open. This means it will not lock scroll or focus within the modal. Note: This is used internally to display modals in Styler. It is not recommended to use this prop in your own applications. |
| status | `ModalStatus` | — | Sets the status style of the modal with an accompanying status icon. Use status modals for communicating outcomes of actions. - `danger`: Communicates destructive or critical action outcomes. - `success`: Communicates successful completions. - `warning`: Communicates important cautions before proceeding. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |

📄 [Full type definition](../../dist/components/Modal/Modal.d.ts)

Also accepts all [styling props](../styling-props/overview.md) ([type definition](../../dist/interfaces.d.ts), [token values](../tokens/tokens-reference.md)).

Modals gather information, complete a subtask, or provide additional information without losing the context of an underlying page.

```tsx
<IressModal footer="Footer slot" show static>
  Modal content
</IressModal>;
```

## Design

### When to use

- **Subtasks**: Gathering information required by the underlying page (e.g. form inputs)
- **Confirmations**: Requiring explicit user acknowledgement before a destructive action
- **Supplemental content**: Providing non-essential information related to the underlying page
- **Full attention**: Content that requires the user's undivided focus

Use modals sparingly — only when the task has a **direct relationship** to the underlying screen and requires the user's full attention.

#### Choosing a size

| Size | Use case | Example |
|------|----------|---------|
| **Small** | Communicate the outcome of an irreversible action. Concise, single action, optionally one input field. | Terms acceptance, delete confirmation, simple acknowledgement |
| **Medium** | Provide optional supporting information or context. May contain a single action and larger inputs like a textarea. | Help content, detailed descriptions, feedback forms |
| **Large** | Facilitate sub-flows within a primary flow. Used when the action impacts the underlying screen but doesn't warrant a separate page. | CSV upload wizard, multi-step forms, bulk operations |

### When not to use

- **Brief status messages** — use [Alert](../components/alert.md) or [Toaster](../components/toaster.md) instead
- **Content that can be inline** — incorporate into the page without complicating its intent
- **Secondary workflows** — use a [Slideout](../components/slideout.md) for tasks that don't require blocking the page

#### Use a page instead of a modal when:

- **The task is complex or multi-step** — if it takes more than 2-3 steps or has branching logic, it deserves its own page with a proper URL
- **The user needs to reference other content** — modals block the underlying page; if users need to cross-reference data, use a page or slideout
- **The content is long or scrollable** — if the modal would need significant scrolling, the content is too complex for a modal
- **The task can be bookmarked or shared** — modals don't have URLs; if the task needs a permalink, use a page
- **The user may need to leave and return** — modals lose state when closed; for tasks that take time or need saving as draft, use a page
- **It contains a full form with many fields** — forms with more than 5-6 fields should be a dedicated page, not crammed into a modal

> **Rule of thumb:** If you're reaching for `size="lg"` and `fixedFooter`, ask whether a dedicated page would be more appropriate. Large modals should be the exception, not the norm.

For a full comparison of feedback components, see the [Feedback pattern](../patterns/feedback.md).

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Provide a clear way to dismiss the modal (close button, cancel action) | Remove all dismissal methods without providing an alternative |
| Use status modals for confirmations and alerts | Use modals for transient success messages |
| Keep modal content focused on a single task | Nest modals inside other modals |
| Use appropriate size for the content | Use large modals for short confirmation messages |

### Content guidelines

- **Heading**: Use sentence case, describe the task or question
- **Body**: Keep content focused — if it's too long, consider a Slideout or separate page
- **Actions**: Place primary action on the right, cancel/secondary on the left
- **Status modals**: Use `danger` for destructive confirmations, `warning` for caution, `success` for completion

### Related patterns

- [Feedback](../patterns/feedback.md) — decision tree for choosing the right feedback component
- [Slideout](../components/slideout.md) — for longer secondary workflows
- [Alert](../components/alert.md) — for inline persistent messages
- [Toaster](../components/toaster.md) — for transient confirmations

## Develop

### Quick Start

```tsx
import { IressModal } from '@iress-oss/ids-components';

<IressModal heading="Modal Header">
  <p>Modal content goes here.</p>
</IressModal>;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs#api-props)

### Usage

#### Using the `show` property

You can use state to control the modal by setting the `show` property to `true` or `false`. To sync your state with the modal, use the `onShowChange` prop.

```tsx
import { IressButton, IressModal } from '@iress-oss/ids-components';
import { useState } from 'react';

export function ModalUsingState() {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressButton onClick={() => setShow(true)}>
        Show modal using state
      </IressButton>
      <IressModal
        heading="Modal heading"
        show={show}
        onShowChange={setShow}
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
      >
        Modal content goes here.
      </IressModal>
    </>
  );
}
```

#### Using the `IressModalProvider`

Use `IressModalProvider` to open and close modals from anywhere in your application via a unique `id` and the `useModal` hook.

> **Note:** If you are already using `IressProvider` or `IressShadow`, you do not need to add `IressModalProvider` separately — it is already included.

```tsx
import {
  IressButton,
  IressModal,
  type IressModalProps,
  IressModalProvider,
  useModal,
} from '@iress-oss/ids-components';

const MODAL_ID = 'storybook-modal';

export const App = (modalProps: IressModalProps) => (
  <IressModalProvider>
    <ModalWithTrigger {...modalProps} />
  </IressModalProvider>
);

const ModalWithTrigger = ({
  id = MODAL_ID,
  ...modalProps
}: IressModalProps) => {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(id)}>
        Show modal using provider
      </IressButton>
      <IressModal
        {...modalProps}
        id={id}
        footer={
          <IressButton onClick={() => showModal(id, false)}>Close</IressButton>
        }
      >
        {modalProps.children ?? 'Modal content'}
      </IressModal>
    </>
  );
};
```

#### Heading

The `heading` prop sets a heading for the modal, rendered in the header and announced by screen readers when opened.

```tsx
<IressModal heading="Modal heading" id={MODAL_ID}>
  Modal content goes here.
</IressModal>;
```

#### Footer

Use the `footer` prop to place content underneath the main content, usually for buttons.

```tsx
import { IressButton, IressModal, useModal } from '@iress-oss/ids-components';

const MODAL_ID = 'storybook-modal';

export function ModalWithButton() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>Show modal</IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Modal heading"
        footer={<IressButton>Close</IressButton>}
      >
        Modal content goes here.
      </IressModal>
    </>
  );
}
```

#### Fixed footer

The `fixedFooter` prop fixes the footer to the bottom of the modal, useful when main content scrolls.

> **Using with popovers and tooltips**
>
> The fixed footer variant prevents content from overflowing the modal. This can
> cause layout issues with components that use popovers (e.g. Select). Try using
> a modal without a fixed footer if you encounter these issues.

```tsx
import {
  IressButton,
  IressModal,
  IressText,
  useModal,
} from '@iress-oss/ids-components';

const MODAL_ID = 'fixed-footer-modal';

export function ModalFixedFooter() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>
        Show scrollable modal
      </IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Terms and Conditions"
        footer={<IressButton mode="primary">I agree</IressButton>}
        fixedFooter
      >
        <IressText>
          <p>
            Please read the following terms carefully. The footer below remains
            fixed while you scroll through the content.
          </p>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using this service, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>
          <h3>2. Use of Service</h3>
          <p>
            You agree to use the service only for purposes that are permitted by
            these Terms and any applicable law, regulation or generally accepted
            practices or guidelines.
          </p>
          <h3>3. Privacy Policy</h3>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we
            collect, use, and protect your personal information when you use our
            services.
          </p>
          <h3>4. Account Security</h3>
          <p>
            You are responsible for safeguarding the password that you use to
            access the service and for any activities or actions under your
            account.
          </p>
          <h3>5. Intellectual Property</h3>
          <p>
            The service and its original content, features and functionality are
            owned by the company and are protected by international copyright,
            trademark and other intellectual property laws.
          </p>
          <h3>6. Termination</h3>
          <p>
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </p>
        </IressText>
      </IressModal>
    </>
  );
}
```

#### Size

The `size` prop can be set to `sm`, `md` or `lg`. Defaults to `md`.

```tsx
import {
  IressButton,
  IressCard,
  IressCheckbox,
  IressCol,
  IressDivider,
  IressExpander,
  IressField,
  IressInline,
  IressInput,
  IressModal,
  IressProgress,
  IressSelect,
  IressRow,
  IressStack,
  IressTable,
} from '@iress-oss/ids-components';
import { useState } from 'react';
import modalIsDone from './modal-is-done.svg';

const SmallModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressCard
        heading="Small modal"
        stretch
        footer={
          <IressButton onClick={() => setShow(true)}>
            View small modal example
          </IressButton>
        }
      >
        <p>
          Small modals communicate the outcome of an irreversible action. They
          should be concise and straightforward, containing a single action and,
          in some cases, a single input field.
        </p>
      </IressCard>

      <IressModal
        size="sm"
        heading="Terms of service update"
        footer={
          <IressButton mode="primary" onClick={() => setShow(false)}>
            Accept
          </IressButton>
        }
        disableBackdropClick
        show={show}
        onShowChange={setShow}
      >
        <p>
          A change in our <a href="#">terms of service</a> takes effect on July
          1st, 2024. Please read and accept the terms.
        </p>
        <IressCheckbox>I accept the terms of service</IressCheckbox>
      </IressModal>
    </>
  );
};

const MediumModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <IressCard
        stretch
        heading="Medium modal"
        footer={
          <IressButton onClick={() => setShow(true)}>
            View medium modal example
          </IressButton>
        }
      >
        <p>
          Medium modals provide optional supporting information to help users
          understand the context of a word or screen. They may contain a single
          action and, in some cases, a larger input such as a textarea.
        </p>
      </IressCard>

      <IressModal
        size="md"
        heading="History of Iress"
        footer={<IressButton onClick={() => setShow(false)}>Close</IressButton>}
        fixedFooter
        show={show}
        onShowChange={setShow}
      >
        <h3>Founding and Early Years (1993 - 2000)</h3>
        <p>
          Iress Limited (ASX: IRE) was founded in 1993 in Melbourne, Australia,
          as a provider of financial market data and trading software.
          Initially, the company focused on delivering technology solutions for
          stockbrokers and traders, providing real-time market data, order
          management, and trading execution tools.
        </p>
        <h3>Expansion and IPO (2001 - 2010)</h3>
        <p>
          In 2001, Iress went public, listing on the Australian Securities
          Exchange (ASX). This move provided the company with capital to expand
          its operations and invest in new technologies. During this period,
          Iress expanded its services beyond trading platforms to include
          financial planning software, portfolio management, and wealth
          management solutions. The company also started expanding
          internationally, entering markets such as the UK, Canada, New Zealand,
          and South Africa, through organic growth and acquisitions.
        </p>
        <h3>Global Growth and Acquisitions (2011 - 2020)</h3>
        <p>
          Between 2011 and 2020, Iress continued its global expansion through
          acquisitions and product diversification. Key acquisitions included:
        </p>
        <ul>
          <li>
            Avelo (2013): Strengthened its presence in the UK financial services
            market.
          </li>
          <li>
            Pulse Software (2014): Added financial advice solutions to its
            portfolio.
          </li>
          <li>
            INET BFA (2016): Expanded its reach into South Africa’s financial
            market.
          </li>
          <li>
            OneVue (2020): Enhanced its superannuation and investment
            administration capabilities.
          </li>
        </ul>
        <p>
          During this period, Iress also expanded into mortgage lending
          technology and digital financial services, adapting to the increasing
          demand for automation and efficiency in financial markets.
        </p>
        <h3>Recent Developments (2021 - Present)</h3>
        <p>
          In 2021, Iress announced a strategic review of its business, focusing
          on streamlining operations and improving profitability. The company
          also experienced leadership changes, including new CEO appointments to
          drive digital transformation.{' '}
        </p>
        <p>
          Iress has continued to innovate with cloud-based solutions, artificial
          intelligence (AI), and data analytics, catering to financial
          institutions, brokers, and wealth management firms globally.
        </p>
        <IressExpander activator="Was this helpful?">
          <IressStack gap="sm">
            <IressInput rows={2} placeholder="Enter your feedback" />
            <IressButton>Provide feedback</IressButton>
          </IressStack>
        </IressExpander>
      </IressModal>
    </>
  );
};

interface LargeModalActionsProps {
  isStart: boolean;
  isFinal: boolean;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  onFinish: () => void;
}

const LargeModalActions = ({
  isStart,
  isFinal,
  onBack,
  onNext,
  onCancel,
  onFinish,
}: LargeModalActionsProps) => (
  <IressInline gap="sm" horizontalAlign={isFinal ? 'center' : 'left'}>
    {isFinal && (
      <IressButton mode="primary" onClick={onFinish}>
        Finish
      </IressButton>
    )}
    {!isFinal && (
      <IressButton mode="primary" onClick={onNext}>
        Next
      </IressButton>
    )}
    {!isStart && !isFinal && (
      <IressButton onClick={onBack}>Previous</IressButton>
    )}
    {!isFinal && (
      <IressInline ml="auto">
        <IressButton onClick={onCancel} mode="tertiary">
          Cancel
        </IressButton>
      </IressInline>
    )}
  </IressInline>
);

const LargeModal = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  return (
    <>
      <IressCard
        heading="Large modal"
        stretch
        footer={
          <IressButton onClick={() => setShow(true)}>
            View large modal example
          </IressButton>
        }
      >
        <p>
          Large modals facilitate sub-flows within a primary flow, allowing
          users to focus on tasks that will impact the underlying screen once
          the modal is closed (e.g., adding an item to a table or bulk uploading
          items). They should be used sparingly and only when there is a direct
          relationship to the underlying screen, where the action wouldn't
          warrant a separate dedicated screen.
        </p>
      </IressCard>

      <IressModal
        size="lg"
        heading="Upload from CSV"
        footer={
          <LargeModalActions
            isStart={step === 0}
            isFinal={step === 2}
            onBack={() => setStep(step - 1)}
            onNext={() => setStep(step + 1)}
            onFinish={() => setShow(false)}
            onCancel={() => setShow(false)}
          />
        }
        disableBackdropClick
        show={show}
        onShowChange={setShow}
        fixedFooter
      >
        <IressStack gap="lg" mb="md">
          <IressProgress max={3} value={step + 1} />
          {step === 0 && (
            <IressStack gap="md">
              <IressField label="Select a file to upload">
                <IressInput type="file" accept=".csv" />
              </IressField>
              <IressDivider />
              <IressField label="Type of data">
                <IressSelect
                  options={[
                    { label: 'Clients' },
                    { label: 'Products' },
                    { label: 'Transactions' },
                  ]}
                />
              </IressField>
              <IressCheckbox>Overwrite existing data</IressCheckbox>
            </IressStack>
          )}
          {step === 1 && (
            <IressTable
              caption="Preview of data to be uploaded"
              columns={[
                { key: 'import', label: 'Upload', width: '1%' },
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
              ]}
              rows={[
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Luke Skywalker',
                  email: 'luke.skywalker@iress.com',
                },
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Leia Skywalker',
                  email: 'leia.skywalker@iress.com',
                },
                {
                  import: <IressCheckbox defaultChecked />,
                  name: 'Han Solo',
                  email: 'han.solo@iress.com',
                },
              ]}
            />
          )}
          {step === 2 && (
            <IressStack gap="md" horizontalAlign="center">
              <img
                src={modalIsDone}
                alt=""
                style={{ maxWidth: '200px', height: 'auto' }}
              />
              <h3>3 items have been uploaded</h3>
              <IressCheckbox>Send a copy to yourself</IressCheckbox>
            </IressStack>
          )}
        </IressStack>
      </IressModal>
    </>
  );
};

export const ModalSizes = () => (
  <IressRow gutter="spacing.7" verticalAlign="stretch">
    <IressCol>
      <SmallModal />
    </IressCol>
    <IressCol>
      <MediumModal />
    </IressCol>
    <IressCol>
      <LargeModal />
    </IressCol>
  </IressRow>
);
```

#### Responsive size

Use the `width` styling prop for responsive sizes. The modal becomes full width on screens smaller than the specified value.

```tsx
import { IressButton, IressModal, useModal } from '@iress-oss/ids-components';

const MODAL_ID = 'responsive-modal';

export function ModalResponsiveSize() {
  const { showModal } = useModal();

  return (
    <>
      <IressButton onClick={() => showModal(MODAL_ID)}>
        Show responsive modal
      </IressButton>
      <IressModal
        id={MODAL_ID}
        show={false}
        heading="Responsive modal"
        width={{ xs: 'overlay.sm', md: 'overlay.md', xxl: 'overlay.lg' }}
        footer={<IressButton>Close</IressButton>}
      >
        Resize your screen to see the modal width change between sm, md, and lg.
      </IressModal>
    </>
  );
}
```

#### Status

The `status` prop (`danger`, `success`, `warning`) displays a contextual status icon. When set, size is restricted to `sm` or `md` and the `actions` prop is enabled.

```tsx
import { useState } from 'react';
import { IressButton, IressModal, IressStack } from '@iress-oss/ids-components';

const STATUSES = ['danger', 'success', 'warning'] as const;

export function ModalStatuses() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <IressStack gap="md" horizontalAlign="left">
      {STATUSES.map((status) => (
        <IressStack gap="sm" key={status}>
          <IressButton onClick={() => setActiveModal(`status-${status}`)}>
            {status} status modal
          </IressButton>
          <IressModal
            id={`status-${status}`}
            heading={`${status} modal`}
            status={status}
            show={activeModal === `status-${status}`}
            onShowChange={(show) => !show && setActiveModal(null)}
          >
            This is a {status} status modal.
          </IressModal>
        </IressStack>
      ))}
      <IressButton onClick={() => setActiveModal('status-md')}>
        Medium danger status modal
      </IressButton>
      <IressModal
        id="status-md"
        heading="Danger modal"
        status="danger"
        size="md"
        actions={[
          { children: 'Button', fluid: true, mode: 'tertiary' },
          { children: 'Button', fluid: true },
        ]}
        show={activeModal === 'status-md'}
        onShowChange={(show) => !show && setActiveModal(null)}
      >
        This is a medium danger status modal with actions.
      </IressModal>
    </IressStack>
  );
}
```

#### Disable closing

Use `disableBackdropClick` and/or `noCloseButton` when you require the user to complete the task before closing. Ensure you provide an alternative way to close.

```tsx
import {
  IressButton,
  IressModal,
  IressStack,
  useModal,
} from '@iress-oss/ids-components';

export function ModalDisableClosing() {
  const { showModal } = useModal();

  return (
    <IressStack gap="md">
      <IressButton onClick={() => showModal('disable-backdrop-click')} fluid>
        Disable backdrop click
      </IressButton>
      <IressModal
        id="disable-backdrop-click"
        show={false}
        heading="Backdrop click disabled"
        disableBackdropClick
        footer={<IressButton>Close</IressButton>}
      >
        Clicking the backdrop will not close this modal. Use the close button or
        footer button instead.
      </IressModal>

      <IressButton onClick={() => showModal('no-close-button')} fluid>
        No close button
      </IressButton>
      <IressModal
        id="no-close-button"
        show={false}
        heading="No close button"
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('no-close-button', false)}>
            Close
          </IressButton>
        }
      >
        This modal has no close button in the header. Use the footer button to
        close.
      </IressModal>

      <IressButton onClick={() => showModal('both')} fluid>
        Both
      </IressButton>
      <IressModal
        id="both"
        show={false}
        heading="Fully controlled closing"
        disableBackdropClick
        noCloseButton
        footer={
          <IressButton onClick={() => showModal('both', false)}>
            Close
          </IressButton>
        }
      >
        This modal can only be closed via the footer button.
      </IressModal>
    </IressStack>
  );
}
```

### Testing

Query the modal dialog by its role:

```tsx
await user.click(screen.getByRole('button', { name: 'Open modal' }));
const modal = await screen.findByRole('dialog', { name: 'Modal heading' });

await user.click(screen.getByRole('button', { name: 'Close modal' }));
await waitForElementToBeRemoved(modal);
```

**Note:** In version 5, modals are rendered conditionally — they are not in the
DOM until shown. Use `findByRole` when waiting for a modal to appear.

**Gotchas:**

- **Conditional rendering**: Use `findByRole` (async) instead of `getByRole` — content isn't in the DOM until `show` is `true`
- **Backdrop click closes modal**: Use `disableBackdropClick` if your test needs to prevent this
- **Focus management**: Focus moves inside on open, returns to trigger on close

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs#testing)


#### Test selectors

| Part | Description | Recommended Query | Test ID |
|------|-------------|-------------------|---------|
| backdrop | The overlay backdrop (outermost element) | — | `modal__backdrop` |
| main | The dialog element (nested inside backdrop) | `findByRole('dialog', { name: '...' })` | `modal` |
| heading | The modal heading | `getByRole('heading', { name: '...' })` | `modal__heading` |
| close button | The close button | `findByRole('button', { name: 'Close' })` | `modal__close-button__button` |
| content | The modal content area | — | `modal__content` |
| status header | The status icon header (when status is set) | — | `modal__status-header` |
| status icon | The status icon (when status is set) | — | `modal__status-icon` |
| footer | The modal footer | `getByText('...')` | `modal__footer` |

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations, more complex recipes, all prop details, and accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Default | Modal is hidden until `show` is `true` or opened via `useModal` |
| Active | Backdrop covers page, body scroll is disabled, focus is trapped inside |
| Dismissed | Clicking backdrop, pressing Escape, or clicking close button hides the modal |
| Fixed footer | Footer stays pinned to bottom, content scrolls above it |
| Status | Shows contextual icon in header, restricts size to `sm`/`md` |

### Accessibility

**WCAG compliance:**

- **2.1.2 No Keyboard Trap** — Focus is trapped within modal but can be dismissed via Escape
- **4.1.2 Name, Role, Value** — Uses `role="dialog"` with `aria-labelledby` pointing to heading
- **2.4.3 Focus Order** — Focus moves into modal on open, returns to trigger on close

**ARIA roles:**

| Element | Role | Description |
|---------|------|-------------|
| Modal container | `dialog` | Identifies the modal as a dialog |
| Heading | referenced via `aria-labelledby` | Provides accessible name |

### Keyboard interaction

| Key | Action |
|-----|--------|
| `Escape` | Closes the modal (unless disabled) |
| `Tab` | Moves focus to next focusable element within the modal |
| `Shift+Tab` | Moves focus to previous focusable element within the modal |
| `Enter` / `Space` | Activates focused button |

### Edge cases

- **Conditional rendering**: Modal and its contents are not in the DOM until shown — use async queries in tests
- **Nested popovers**: Fixed footer modals may clip popover content — use non-fixed footer when needed
- **Multiple modals**: Only one modal should be active at a time
- **Focus restore**: If the trigger element is removed while modal is open, focus moves to document body

---

### Storybook

Storybook provides an interactive playground for testing different prop combinations and viewing accessibility attributes.

[View in Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/components-modal--docs)
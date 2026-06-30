# Loading

> Displays a loading state to indicate content is being fetched or processed.

## Import

```tsx
import { IressLoading } from '@iress-oss/ids-components';
```

- [Storybook](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs)
- [Source](https://github.com/iress/design-system/tree/main/packages/components/src/patterns/Loading)
- [Report issue](https://github.com/iress/design-system/issues/new?template=bug_report.md&labels=loading&title=[Loading]+Bug:+)
- [Request feature](https://github.com/iress/design-system/issues/new?template=feature_request.md&labels=loading,enhancement&title=[Loading]+Feature:+)

## Props

> Required props are **bold**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| estimatedFinishTime | `number` | `3000 10000` | Estimated time in milliseconds for the loading to finish. |
| loaded | `boolean` | — | If set to `true`, will start hiding the loading indicator. It is recommended to use this prop if you are using the `IressLoading.shouldRender` hook to achieve a smooth loading experience. If set to `true`, will hide the skeleton and display the chart. |
| messageList | `Record<number, ReactNode>` | — | A message list to display while loading. The key is the time when you want the message to change to this message. If using a message list, the `children` will not be displayed. A checklist to display while loading. The key is the time when you want the item to be checked. |
| pattern | `component` , `default` , `long` , `page` , `start-up`, `validate`  | — | Use `pattern="start-up"` for the following use cases: - Loading an application for the first time - Switching from a different application to a new application - Switching from a client's website to an Iress application - Switching themes Use `pattern="validate"` for the following use cases: - Submitting a form - Saving a record Use `pattern="page"` for the following use cases: - Detail page for a record - Form page - Article page Use `pattern="component"` for the following use cases: - Component that is expected to be slow to load, such as a chart, table or large graphic. - Component that can be refreshed/updated with new data. The long loading pattern will display a checklist of items that are being loaded.  Use `pattern="long"` for the following use cases: - Calling multiple slow APIs to load data - Loading results from AI - Processing a large amount of data as a queue (eg. bulk uploading or large media file uploads) Do not set the `pattern` prop when no other pattern can be applied. It will only show the loading message after a delay, and is intended for use when loading is not expected to take a long time. Example use cases: - Navigating between different routes - Calling an API within the page that does not require a loading state |
| progress | `number` | — | If provided, will use this to set the `value` of the progress bar. If not provided, will use the `estimatedFinishTime` to calculate the progress. |
| renderProgress | `((props: Pick<[IressProgressProps](../../dist/components/Progress/Progress.d.ts)<number>, "max" | "min" | "value" | "sectionTitle">) => ReactNode) | ((props: Pick<[IressProgressProps](../../dist/components/Progress/Progress.d.ts), "max" , ... 1 more ... , "sectionTitle">) => ReactNode)` | — | This is a render prop that allows you to override the default progress rendering. This is useful if you want to use a different progress component or if you want to add additional props to the progress bar. |
| screenReaderText | `ReactNode` | `'Loading...' 'Loading...' 'Loading...' 'Loading...'` | Only screen readers will see this message, it is changed to the `children` message after the delay. Only screen readers will see this message. Only screen readers will see this message, it is changed to the `message` after the delay. |
| startFrom | `number` | `0` | Set the start from timer, useful when stringing multiple loading patterns across different pages (eg. logging via a third-party authentication provider) |
| timeout | `{ loaded?: number , { loaded?: number; message?: number; progress?: number , { skeleton?: number , number , undefined, undefined; } , undefined; } , undefined; } , undefined; message?: number , undefined; update?: number ` | `2500 500 3000` | Set the timeouts for showing the progress bar and message. The time in milliseconds before the loading message is displayed. Delay in milliseconds before the skeleton is displayed. Set the timeouts for showing the skeleton and update messages. Delay in milliseconds before the message is displayed. |
| data-testid | `string` | — | The data-testid attribute is used to target elements in automated tests if no identifier is available. In some components it is propagated to child elements.  Notes: - Please use this prop sparingly and only when no other identifier is available, as per the guiding principles of Testing Library. - Only use this prop for your tests @see https://testing-library.com/docs/queries/bytestid |
| loading | `boolean, string ` | — | When true, button is in loading state. If provided a string, will be used as the loading text for screen readers. |
| message | `ReactNode` | `'This is taking longer than expected...'` | Set the message to be displayed when the button is in the loading state. |
| position | `bottom`, `right` , `top`  | — | This sets where the loading message will be displayed. - `bottom` - The loading message will be displayed below the button. It will be absolute positioned. - `top` - The loading message will be displayed above the button. It will be absolute positioned. - `right` - The loading message will be displayed to the right of the button. It will be inline positioned. |
| renderButton | `((props: Pick<[IressButtonProps](../../dist/components/Button/Button.d.ts), "loading">) => ReactNode)` | — | This is a render prop that allows you to override the default button rendering. This is useful if you want to use a different button component or if you want to add additional props to the button. |
| critical | `ReactNode` | — | If provided, will switch the skeleton to this template. Use when you have critical content that can be displayed while loading to allow the user to see some content while the rest is loading. |
| error | `ReactNode` | — | An error to display if the loading fails. This will override the skeleton. An error to display if the loading fails. This will override the `messageList` and show an error message instead. |
| template | `ReactNode` | `'page' 'chart'` | Which template to use as the skeleton, or you can use a ReactNode to customise the skeleton completely. |
| update | `ReactNode` | — | Set the chart to be updated. If a `ReactNode` is provided, it will be displayed as the message. If set to `true`, will display the default message `Updating...`. |

📄 [Full type definition](../../dist/patterns/Loading/Loading.d.ts)

Also accepts all [styling props](../styling-props/overview.md) (spacing, colour, layout, typography, radius).

The loading pattern is used to indicate that content is being loaded or processed consistently across Iress products.

```tsx
import {
  IressButton,
  IressContainer,
  IressForm,
  IressFormField,
  IressInputCurrency,
  IressLoading,
  IressPanel,
  IressText,
} from '@iress-oss/ids-components';
import { useDeferredValue, useEffect, useState } from 'react';
import retirementGraph from './retirement-graph.png';

interface PageProps {
  setPage: (page: number) => void;
}

interface ChartProps {
  money: number | null;
}

const API = {
  initialise: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 3000);
    }),
  data: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
  chart: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
  chartUpdate: async () =>
    new Promise<boolean>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(true);
      }, 2000);
    }),
};

const Graph = () => (
  <img
    src={retirementGraph}
    alt=""
    style={{ maxWidth: '100%', height: 'auto' }}
  />
);

const Chart = () => {
  const [chart, setChart] = useState(false);
  const [money, setMoney] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const safeLoaded = IressLoading.shouldRender(loaded);
  const deferredMoney = useDeferredValue(money);

  useEffect(() => {
    const initialise = async () => {
      const newChart = await API.chart();
      setChart(newChart);
      setLoaded(() => true);
    };

    void initialise();
  }, []);

  useEffect(() => {
    if (deferredMoney === null) {
      return;
    }

    const update = async () => {
      setUpdating(() => true);
      const newChart = await API.chartUpdate();
      setChart(newChart);
      setUpdating(() => false);
    };

    void update();
  }, [deferredMoney]);

  return (
    <IressLoading pattern="component" loaded={!safeLoaded} update={updating}>
      {chart && <Graph />}
      <IressPanel mt="spacing.4">
        <IressForm<ChartProps>
          onSubmit={(projectionData) => setMoney(projectionData.money)}
          heading="Update projection"
        >
          <IressFormField
            name="money"
            label="My money"
            render={(controlledProps) => (
              <IressInputCurrency {...controlledProps} />
            )}
          />
          <IressButton type="submit">Update projection</IressButton>
        </IressForm>
      </IressPanel>
    </IressLoading>
  );
};

const StartPage = ({ setPage }: PageProps) => (
  <IressText>
    <h2>Maximise your retirement</h2>
    <p>
      Maximize your retirement in Australia by contributing to your super early
      and making voluntary top-ups to benefit from compounding. Take advantage
      of employer contributions, government co-contributions, and tax benefits.
      Diversify your investments and review your strategy regularly to stay on
      track. Consider additional income streams and seek professional advice for
      a secure future.
    </p>
    <hr />
    <IressButton onClick={() => setPage(2)}>Next</IressButton>
  </IressText>
);

const RetirementIncomeProjectionPage = () => {
  const [data, setData] = useState(false);
  const loaded = data !== false;
  const renderLoading = IressLoading.shouldRender(loaded);

  useEffect(() => {
    const initialise = async () => {
      const newData = await API.data();
      setData(newData);
    };

    void initialise();
  }, []);

  if (renderLoading) {
    return <IressLoading pattern="page" template="form" loaded={loaded} />;
  }

  return (
    <IressText>
      <h2>Retirement Income Projection</h2>
      <p>
        We've got enough information to provide you with a retirement income
        projection. This will help you understand how much you can expect to
        receive in retirement based on your current super balance, your
        contributions, and your investment strategy.
      </p>
      <Chart />
    </IressText>
  );
};

export const LoadingWizard = () => {
  const [page, setPage] = useState(0);
  const loaded = page > 0;
  const renderLoading = IressLoading.shouldRender(loaded);

  useEffect(() => {
    const initialise = async () => {
      await API.initialise();
      setPage(1);
    };

    void initialise();
  }, []);

  if (renderLoading) {
    return <IressLoading pattern="start-up" loaded={loaded} />;
  }

  return (
    <IressContainer style={{ maxWidth: '600px', paddingBlock: '3rem' }}>
      {page === 1 && <StartPage setPage={setPage} />}
      {page === 2 && <RetirementIncomeProjectionPage />}
    </IressContainer>
  );
};
```

## Design

### When to use

Choose the pattern based on the type of content loading:

| Pattern | Use case | Examples |
|---------|----------|----------|
| `component` | A specific component is loading | Table with many rows, chart loading data |
| `default` | Long loading times are not expected | Navigation transitions |
| `long` | Expected to take 10+ seconds | Multiple API calls, AI generation, bulk uploads |
| `page` | An entire page is loading | Detail pages, forms, dashboards |
| `start-up` | Application is loading | First launch, switching applications, theme changes |
| `validate` | Server-side validation in progress | Form submission, saving a record |

### When not to use

- **Instant operations** (< 500ms) — no indicator needed; the system should feel instant
- **Background tasks** that don't block the UI — don't show a loading indicator; let the user continue working
- **Individual skeleton elements** — use [Skeleton](../components/skeleton.md) directly for custom layouts

### Do's and Don'ts

| ✅ Do | ❌ Don't |
|-------|----------|
| Use one loading pattern per user action | Mix multiple loading patterns for the same task |
| Match the loading pattern across app transitions | Show a different indicator on each page |
| Set `estimatedFinishTime` based on real metrics | Guess at loading times |
| Use `IressLoading.shouldRender` for smooth transitions | Unmount loading abruptly without fade-out |

### Content guidelines

- **Messages**: Keep short and informative (e.g. "Processing transcript", not "Please wait while we process your data")
- **Message lists** (long pattern): Use action verbs describing what the system is doing
- **Screen reader text**: Always provide via `screenReaderText` prop

### Related patterns

- [Skeleton](../components/skeleton.md) — building blocks for custom loading templates
- [Spinner](../components/spinner.md) — low-level spinner for custom uses
- [Progress](../components/progress.md) — standalone progress bar

## Develop

### Quick Start

```tsx
import { IressLoading } from '@iress-oss/ids-components';

<IressLoading pattern="page" />;
```

[View all props](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs#api-props)

### Behaviour timing

The default behaviour follows UX best practices:

- **0–500ms**: No indicator shown (assumes content loaded)
- **500ms–2s**: Loading indicator animates in (skeleton or progress bar)
- **2–5s**: Loading message animates in
- **5–10s**: Additional messages rotate to show progress
- **10s+**: Checklist of items being completed

### Usage

#### Page loading

```tsx
import {
  IressCard,
  IressCol,
  IressContainer,
  IressDivider,
  IressInline,
  IressLoading,
  IressRow,
  IressSkeleton,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';
import { type ReactNode, useEffect, useState } from 'react';

const API = {
  criticalContent: async () =>
    new Promise<ReactNode>((resolve) => {
      // Simulate a slow network request.
      setTimeout(() => {
        resolve(
          <IressContainer>
            <IressStack gap="lg">
              <IressRow horizontalAlign="between" verticalAlign="middle">
                <IressText element="h1" mb="none">
                  Dashboard
                </IressText>
                <IressInline gap="lg">
                  <IressSkeleton
                    textStyle="typography.heading.4"
                    width="200px"
                  />
                  <IressSkeleton
                    textStyle="typography.heading.4"
                    width="200px"
                  />
                </IressInline>
              </IressRow>
              <IressDivider />
              <IressRow gutter="lg">
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="Financial update 2025"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="The ASX update"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
                <IressCol span="4">
                  <IressCard
                    stretch
                    heading="In the news"
                    media={<IressSkeleton mode="rect" height="300px" />}
                  >
                    <IressSkeleton textStyle="typography.body.md" width="50%" />
                  </IressCard>
                </IressCol>
              </IressRow>
            </IressStack>
          </IressContainer>,
        );
      }, 3000);
    }),
};

export const LoadingDashboard = () => {
  const [critical, setCritical] = useState<ReactNode | undefined>();

  useEffect(() => {
    const initialise = async () => {
      setCritical(await API.criticalContent());
    };

    void initialise();
  }, []);

  return (
    <IressLoading pattern="page" critical={critical} template="dashboard" />
  );
};
```

#### Start-up

```tsx
<IressLoading
  pattern="start-up"
  messageList={{
    0: 'Switching applications...',
    4500: 'This is taking longer than expected...',
  }}
/>;
```

#### Long running tasks

```tsx
<IressLoading
  pattern="long"
  messageList={{
    3000: 'Processing transcript',
    5000: 'Noting key information',
    7000: 'Generating summary',
  }}
/>;
```

#### Validate (form submission)

```tsx
<IressInline gap="sm">
  <IressLoading pattern="validate" loading />
  <IressButton mode="quaternary">Cancel</IressButton>
</IressInline>;
```

### Suspense

Use `IressLoadingSuspense` with React 19's `use` hook for automatic loading state management:

```tsx
import { IressLoadingSuspense } from '@iress-oss/ids-components';
import { use, useRef } from 'react';

const HomePage = () => {
  const dataRef = useRef(API.fetchPage('home'));
  const data = use(dataRef.current);
  return <h2>{data.title}</h2>;
};

export const App = () => (
  <IressLoadingSuspense pattern="page">
    <HomePage />
  </IressLoadingSuspense>
);
```

### Testing

The loading component uses `aria-live` regions for accessibility. Query by the message text:

```tsx
const message = screen.getByText('Loading...');
```

[View test IDs](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs#testing)

## Specifications

### Behaviour

| State | Behaviour |
|-------|-----------|
| Not loaded | Shows skeleton/progress after timeout (default 500ms) |
| Message timeout | Message appears after 2.5s (configurable) |
| Loaded | Fades out smoothly (use `IressLoading.shouldRender` hook) |
| Error (long pattern) | Displays error state, overriding progress |

### Accessibility

- Uses `aria-live` regions to announce loading state changes to screen readers
- `screenReaderText` prop provides immediate announcement
- Progress bar announces percentage loaded
- Message changes are announced via polite live region

### Edge cases

- **Fast loads (< 500ms)**: No indicator shown — prevents flash of loading content
- **Nested loading**: `IressLoadingSuspense` nests — only the outermost shows an indicator
- **Multiple patterns on one page**: Use `component` pattern for slower elements within an already-loaded page
- **Stale content during update**: `component` pattern fades content and shows "Updating..." message

---

[View in Storybook →](https://main--691abcc79dfa560a36d0a74f.chromatic.com/?path=/docs/patterns-loading--docs)